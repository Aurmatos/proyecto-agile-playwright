import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // ... otras configuraciones que ya tengas ...

  use: {
    /* 1. OBLIGA A QUE EL NAVEGADOR SE MUESTRE EN PANTALLA */
    headless: false, 

    /* Configuración compartida para todos los proyectos */
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        /* 2. AGREGA CÁMARA LENTA (ej. 1500 milisegundos = 1.5 segundos entre cada acción) */
        launchOptions: {
          slowMo: 1500, 
        }
      },
    },
    // Puedes replicar el launchOptions en firefox o webkit si los usas
  ],
});