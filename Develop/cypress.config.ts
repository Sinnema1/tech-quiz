import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: customViteConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: "cypress/support/component.ts",
  },

  e2e: {
    baseUrl: 'http://127.0.0.1:3001',
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}", 
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
