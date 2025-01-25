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
    supportFile: "cypress/support/components.ts",
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}", 
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
