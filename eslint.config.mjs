import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    /**
     * Herramientas del asistente, no código del sitio.
     *
     * Son scripts CommonJS (`.cjs`) que usan `require()` legítimamente, pero la
     * configuración de Next los juzga con las reglas de un módulo ES y los
     * marcaba con 15 errores de `no-require-imports`. Eran casi la mitad del
     * total y no hay nada que arreglar en ellos: no se despliegan, no entran en
     * el bundle y no son nuestros.
     */
    ".claude/**",
    /**
     * Salida de Playwright. Ya está en .gitignore, pero el linter no lo lee: si
     * se pasaba `npm run lint` después de `npm run test:e2e`, el informe HTML
     * con su JavaScript empaquetado disparaba más de 3.000 avisos y enterraba
     * los del proyecto.
     */
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
