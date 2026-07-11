import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────────────────────────────────────
//  TEST 1: Flujo completo — Homepage → Programa → Modal de cotización
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Flujo principal CILC', () => {

  test('Homepage carga correctamente', async ({ page }) => {
    await page.goto('/');

    // Título de la página
    await expect(page).toHaveTitle(/CILC/);

    // Header visible
    await expect(page.locator('header')).toBeVisible();

    // Logo
    await expect(page.locator('img[alt="CILC Logo"]')).toBeVisible();

    // Navbar con links principales
    await expect(page.getByRole('link', { name: 'Inicio' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Idiomas' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Destinos' })).toBeVisible();

    // HeroBanner presente
    await expect(page.locator('section').first()).toBeVisible();

    // Botón WhatsApp flotante
    await expect(page.locator('a[aria-label="Contactar por WhatsApp"]')).toBeVisible();
  });

  test('Navegar de Homepage a página de Idiomas', async ({ page }) => {
    await page.goto('/');

    // Hacer clic en el link de Idiomas en la navbar
    await page.getByRole('link', { name: 'Idiomas' }).first().click();

    // Verificar que navegó correctamente
    await expect(page).toHaveURL('/idiomas');
    await expect(page).toHaveTitle(/Idiomas/);

    // Hero de la página de programa visible
    await expect(page.locator('h1')).toContainText('Idiomas');
  });

  test('Abrir modal de cotización desde página de programa', async ({ page }) => {
    await page.goto('/idiomas');

    // Clic en "Obtén tu cotización gratis" (puede estar en hero o CTA final)
    const btnCotizar = page.getByRole('button', { name: /cotización/i }).first();
    await expect(btnCotizar).toBeVisible();
    await btnCotizar.click();

    // Modal debe aparecer
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // El programa debe estar preseleccionado en el select
    const selectPrograma = modal.locator('select').first();
    await expect(selectPrograma).toHaveValue('Idiomas');
  });

  test('Cerrar modal con tecla Escape', async ({ page }) => {
    await page.goto('/idiomas');
    await page.getByRole('button', { name: /cotización/i }).first().click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Enviar formulario del modal (mock)', async ({ page }) => {
    // Interceptamos la petición para no depender del servidor real
    await page.route('/api/contact', async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });

    await page.goto('/idiomas');
    await page.getByRole('button', { name: /cotización/i }).first().click();

    const modal = page.locator('[role="dialog"]');

    // Rellenar el formulario
    await modal.locator('select').first().selectOption('Idiomas');
    await modal.locator('input[type="text"]').fill('Juan Pérez');
    await modal.locator('input[type="email"]').fill('juan@test.com');

    // Enviar
    await modal.getByRole('button', { name: /solicitar/i }).click();

    // Debe aparecer el mensaje de éxito
    await expect(modal.locator('text=¡Solicitud enviada!')).toBeVisible({ timeout: 5000 });
  });

});

// ─────────────────────────────────────────────────────────────────────────────
//  TEST 2: Navegación completa
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Navegación del sitio', () => {

  test('Todos los links de la navbar navegan correctamente', async ({ page }) => {
    await page.goto('/');

    const links = [
      { nombre: 'Au Pair',              url: '/au-pair' },
      { nombre: 'Contacto',             url: '/contact' },
      { nombre: 'Destinos',             url: '/destinos' },
    ];

    for (const link of links) {
      await page.goto('/');
      await page.getByRole('link', { name: link.nombre }).first().click();
      await expect(page).toHaveURL(link.url);
      // No debe mostrar 404
      await expect(page.locator('text=404')).not.toBeVisible();
    }
  });

  test('/destinos carga con filtros', async ({ page }) => {
    await page.goto('/destinos');
    await expect(page.locator('h1')).toContainText('destino');
    // Chips de filtro visibles
    await expect(page.getByRole('button', { name: 'Todas' }).first()).toBeVisible();
  });

  test('/destinos/canada carga página de país', async ({ page }) => {
    await page.goto('/destinos/canada');
    await expect(page.locator('h1')).toContainText('Canadá');
    await expect(page.locator('text=404')).not.toBeVisible();
  });

  test('/blog carga listado de artículos', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1')).toBeVisible();
    // Al menos un artículo visible
    await expect(page.locator('article').first()).toBeVisible();
  });

  test('/sobre-nosotros carga sin 404', async ({ page }) => {
    await page.goto('/sobre-nosotros');
    await expect(page.locator('text=404')).not.toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

});

// ─────────────────────────────────────────────────────────────────────────────
//  TEST 3: Formulario de contacto
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Formulario de contacto', () => {

  test('Muestra spinner al enviar', async ({ page }) => {
    // Retrasamos la respuesta para ver el spinner
    await page.route('/api/contact', async (route) => {
      await new Promise((r) => setTimeout(r, 1000));
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });

    await page.goto('/contact');

    await page.locator('#name').fill('María López');
    await page.locator('#email').fill('maria@test.com');
    await page.locator('#subject').selectOption('Consulta General');
    await page.locator('#message').fill('Hola, me interesa un programa de idiomas.');

    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();

    // Spinner visible mientras espera
    await expect(page.locator('text=Enviando...')).toBeVisible();
  });

  test('Muestra confirmación después del envío', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });

    await page.goto('/contact');

    await page.locator('#name').fill('Carlos Ruiz');
    await page.locator('#email').fill('carlos@test.com');
    await page.locator('#subject').selectOption('Programas Académicos');
    await page.locator('#message').fill('Quiero información sobre años académicos en Canadá.');

    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();

    await expect(page.locator('text=¡Mensaje enviado!')).toBeVisible({ timeout: 5000 });
  });

  test('Muestra error si el servidor falla', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({ status: 500, body: JSON.stringify({ error: 'Error del servidor' }) });
    });

    await page.goto('/contact');

    await page.locator('#name').fill('Test Error');
    await page.locator('#email').fill('error@test.com');
    await page.locator('#subject').selectOption('Otro');
    await page.locator('#message').fill('Test de error.');

    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();

    await expect(page.locator('text=Error del servidor')).toBeVisible({ timeout: 5000 });
  });

});

// ─────────────────────────────────────────────────────────────────────────────
//  TEST 4: Búsqueda global
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Búsqueda global', () => {

  test('SearchBar muestra resultados al escribir', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('input[placeholder*="Buscar"]');
    await searchInput.fill('canada');

    // Dropdown de resultados visible
    await expect(page.locator('text=Canadá')).toBeVisible({ timeout: 2000 });
  });

  test('Escape cierra el dropdown', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('input[placeholder*="Buscar"]');
    await searchInput.fill('idiomas');
    await page.keyboard.press('Escape');

    // El dropdown debe desaparecer
    await expect(page.locator('text=Ver todos los resultados')).not.toBeVisible();
  });

  test('/buscar muestra resultados agrupados', async ({ page }) => {
    await page.goto('/buscar?q=ingles');
    await expect(page.locator('text=inglés').first()).toBeVisible();
  });

  test('/buscar sin parámetro muestra invitación', async ({ page }) => {
    await page.goto('/buscar');
    await expect(page.locator('text=¿Qué quieres encontrar?')).toBeVisible();
  });

});

// ─────────────────────────────────────────────────────────────────────────────
//  TEST 5: Accesibilidad básica
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Accesibilidad', () => {

  test('Todas las imágenes tienen atributo alt', async ({ page }) => {
    await page.goto('/');
    const imgsWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imgsWithoutAlt).toBe(0);
  });

  test('El botón WhatsApp tiene aria-label', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[aria-label="Contactar por WhatsApp"]')).toBeVisible();
  });

  test('La navegación tiene links con texto visible', async ({ page }) => {
    await page.goto('/');
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(5);
  });

});
