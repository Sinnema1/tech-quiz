import { Question } from "../types";

/**
 * Loads and returns the questions from the fixture file.
 * @returns A Cypress chainable that resolves to an array of questions.
 */
export const loadQuestions = (): Cypress.Chainable<Question[]> => {
  return cy.fixture("questions.json");
};

/**
 * Loads and returns the answers from the fixture file.
 * @returns A Cypress chainable that resolves to an array of answers.
 */
export const loadAnswers = (): Cypress.Chainable<any[]> => {
  return cy.fixture("answers.json");
};

/**
 * Mock API for intercepting requests to `/api/questions/random`.
 * It uses the questions from the `questions.json` fixture.
 * @param alias - The alias to assign to the intercepted route (default: "getQuestions").
 */
export const mockGetQuestions = (alias: string = "getQuestions"): void => {
  cy.fixture("questions.json").then((questions) => {
    cy.intercept("GET", "/api/questions/random", {
      statusCode: 200,
      body: questions,
    }).as(alias);
  });
};