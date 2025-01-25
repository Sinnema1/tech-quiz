/// <reference path="./types.d.ts" />

// Import Testing Library commands
import "@testing-library/cypress/add-commands";

// Custom commands for Tech Quiz
Cypress.Commands.add("startQuiz", () => {
  cy.contains("Start Quiz").should("be.visible").click();
  cy.wait("@getQuestions"); // Ensure the GET request for questions completes
});

Cypress.Commands.add("answerQuestion", (index: number) => {
  cy.get(".btn-primary").eq(index).click(); // Select answer at the specified index
});

Cypress.Commands.add("restartQuiz", () => {
  cy.contains("Take New Quiz").should("be.visible").click(); // Restart the quiz
});

// Add any additional custom commands here