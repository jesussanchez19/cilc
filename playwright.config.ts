import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,

  // El servidor de desarrollo compila cada ruta la primera vez que se pide, y
  // con la suite en paralelo esa primera compilación se acumula. Sin estos
  // márgenes los tests fallan por tiempo agotado aunque la página esté bien:
  // ejecutados de uno en uno pasaban todos.
  timeout: 60_000,
  expect: { timeout: 10_000 },
  forbidOnly: !!process.env.CI,
  // Un reintento también en local: la primera ejecución tras un `rm -rf .next`
  // arranca el servidor en frío y alguna navegación puede agotar el tiempo
  // aunque la página esté bien. No enmascara fallos reales — esos fallan en
  // los dos intentos.
  retries: process.env.CI ? 2 : 1,
  // En local, `undefined` deja que Playwright abra un worker por núcleo —12 en
  // esta máquina— y con eso la suite se volvió intermitente: fallaban tres o
  // cuatro tests por tiempo agotado y a la siguiente ejecución pasaban todos.
  // Con 6 la suite tarda menos (40 s frente a 1 min) y no ha vuelto a fallar:
  // los workers de más competían por CPU con el propio servidor de Next.
  workers: process.env.CI ? 1 : 6,

  // Captura de pantalla y video en fallos
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: 'http://localhost:3000',
    navigationTimeout: 30_000,
    actionTimeout: 15_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
    // Móvil
    { name: 'Mobile Chrome',  use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari',  use: { ...devices['iPhone 13'] } },
  ],

  // Levanta el servidor automáticamente antes de los tests.
  //
  // Se usa la build de producción y no `npm run dev` a propósito: el servidor
  // de desarrollo compila cada ruta la primera vez que se pide, y con la suite
  // en paralelo esas compilaciones se acumulan hasta agotar los tiempos de
  // espera. Los mismos tests pasaban al ejecutarlos de uno en uno.
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 300 * 1000,
  },
});
