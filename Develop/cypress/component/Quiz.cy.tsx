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
  const startQuiz = () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");
  };

  beforeEach(() => {
    // Mock API call
    cy.intercept("GET", "/api/questions/random", {
      statusCode: 200,
      body: mockQuestions,
    }).as("getQuestions");
  });

  it("renders the initial state with only the Start Quiz button", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("be.visible");
    cy.get("h2").should("not.exist");
    cy.contains("Your score:").should("not.exist");
  });

  it("renders the start button and starts the quiz", () => {
    startQuiz();
    cy.get("h2").should("contain", mockQuestions[0].question);
  });

  it("displays the next question when an answer is selected", () => {
    startQuiz();

    mockQuestions.forEach((question, index) => {
      // Verify the current question
      cy.get("h2").should("contain", question.question);

      // Click the first answer
      cy.get("button").contains("1").click();

      // Verify the next question (if exists)
      if (index < mockQuestions.length - 1) {
        cy.get("h2").should("contain", mockQuestions[index + 1].question);
      }
    });
  });

  it("shows the score when the quiz is completed", () => {
    startQuiz();
    let score = 0;

    mockQuestions.forEach((question, index) => {
      cy.get("h2").should("contain", question.question);

      // Select the first answer and increment the score if correct
      if (question.answers[0].isCorrect) score++;
      cy.get("button").contains("1").click();
    });

    // Verify the score display
    cy.contains("Quiz Completed").should("be.visible");
    cy.contains(`Your score: ${score}/${mockQuestions.length}`).should("be.visible");
  });

  it("allows restarting the quiz after completion", () => {
    startQuiz();

    // Complete the quiz
    mockQuestions.forEach(() => {
      cy.get("button").contains("1").click();
    });

    // Restart the quiz
    cy.contains("Take New Quiz").click();

    // Verify the quiz resets
    cy.get("h2").should("contain", mockQuestions[0].question); // First question reloaded
    cy.contains("Your score:").should("not.exist"); // Score reset
  });
});