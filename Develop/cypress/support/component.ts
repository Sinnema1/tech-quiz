// ***********************************************************
// This file sets up global configuration and behaviors
// for component testing in Cypress.
// ***********************************************************

// Import custom commands
import "./commands";

// Import Cypress's React18 mount function
import { mount } from "cypress/react18";

// Extend the Cypress namespace to include the mount command
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React component for testing
       * @param component - The React component to mount
       */
      mount: typeof mount;
    }
  }
}

// Add the mount command to Cypress
Cypress.Commands.add("mount", mount);

// Example usage:
// cy.mount(<MyComponent />);