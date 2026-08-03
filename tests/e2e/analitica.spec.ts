import { test, expect, Page } from '@playwright/test';

/**
 * Verificación desechable: los eventos de GA4 llegan de verdad a `dataLayer`.
 *
 * Se lee `dataLayer` y no un `window.gtag` falso porque el script inline del
 * layout redefine `gtag` al cargar y se llevaría por delante cualquier espía
 * puesto antes. `dataLayer` es donde acaba todo, así que mide el camino real.
 */
async function eventos(page: Page) {
  return page.evaluate(() =>
    ((window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []).map((a) =>
      Array.from(a as ArrayLike<unknown>),
    ),
  );
}

test.beforeEach(async ({ page }) => {
  // Sin red hacia Google: el script inline que define gtag es local y basta.
  await page.route('**://www.googletagmanager.com/**', (route) => route.abort());
});

test('generate_lead al enviar el formulario de contacto', async ({ page }) => {
  await page.route('**/api/contact', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
  );

  await page.goto('/contact');
  await page.fill('#name', 'Prueba Analitica');
  await page.fill('#email', 'prueba@ejemplo.com');
  await page.selectOption('#subject', 'Consulta General');
  await page.fill('#message', 'Mensaje de prueba para verificar el evento de GA4.');
  await page.click('button[type="submit"]');

  await expect
    .poll(() => eventos(page))
    .toContainEqual(['event', 'generate_lead', { form_name: 'contacto', subject: 'Consulta General' }]);
});

test('whatsapp_open y generate_lead desde el chat flotante', async ({ page }) => {
  await page.route('**/api/contact', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
  );

  await page.goto('/');
  // El botón flotante solo aparece pasados 160px de scroll.
  await page.evaluate(() => window.scrollTo(0, 600));
  const boton = page.locator('button[aria-label="Chatear con CILC"]');
  await expect(boton).toBeVisible();
  await boton.click();

  await expect.poll(() => eventos(page)).toContainEqual(['event', 'whatsapp_open', undefined]);

  await page.fill('input[placeholder="Tu nombre *"]', 'Prueba WA');
  await page.fill('input[placeholder="Tu WhatsApp / Teléfono *"]', '5512345678');
  await page.click('button:has-text("Quiero que me contacten")');

  await expect
    .poll(() => eventos(page))
    .toContainEqual(['event', 'generate_lead', { form_name: 'whatsapp' }]);
});
