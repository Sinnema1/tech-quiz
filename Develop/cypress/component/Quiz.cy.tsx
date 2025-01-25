import React from "react";
import Quiz from "../../client/src/components/Quiz.js";
import { mount } from "cypress/react18";
import { Question } from "../../client/src/models/Question.js";
import "@testing-library/cypress/add-commands";

// Mock questions data
const mockQuestions: Question[] = [
  {
    _id: "1",
    question: "What is React?",
    answers: [
      { text: "A library", isCorrect: true },
      { text: "A framework", isCorrect: false },
    ],
  },
  {
    _id: "2",
    question: "What is Node.js?",
    answers: [
      { text: "A runtime", isCorrect: true },
      { text: "A database", isCorrect: false },
    ],
  },
];

describe("<Quiz />", () => {
  beforeEach(() => {
    // Mock API call
    cy.intercept("GET", "/api/questions", {
      statusCode: 200,
      body: mockQuestions,
    }).as("getQuestions");
  });

  it("renders the start button and starts the quiz", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("be.visible").click();
    cy.wait("@getQuestions");
    cy.get("h2").should("contain", mockQuestions[0].question);
  });

  it("displays the next question when an answer is selected", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");

    // Answer the first question
    cy.get(".btn-primary").first().click(); // Click the first answer button
    cy.get("h2").should("contain", mockQuestions[1].question); // Verify the next question
  });

  it("shows the score when the quiz is completed", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");

    // Answer all questions using a for loop
    for (let i = 0; i < mockQuestions.length; i++) {
      cy.get("h2").should("contain", mockQuestions[i].question);
      cy.get(".btn-primary").first().click(); // Select the first answer
    }

    // Verify the score
    cy.contains("Your score:").should("be.visible");
    cy.contains(`Your score: 2/${mockQuestions.length}`).should("be.visible");
  });

  it("allows restarting the quiz after completion", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");

    // Complete the quiz
    for (let i = 0; i < mockQuestions.length; i++) {
      cy.get(".btn-primary").first().click();
    }

    // Restart the quiz
    cy.contains("Take New Quiz").click();
    cy.contains("Start Quiz").should("be.visible"); // Ensure quiz resets
  });
});
