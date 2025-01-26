import React from "react";
import Quiz from "../../client/src/components/Quiz.js";
import { mount } from "cypress/react18";
import "@testing-library/cypress/add-commands";
import { mockGetQuestions, loadQuestions } from "../support/utils/helpers";

describe("<Quiz />", () => {
  const startQuiz = () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");
  };

  beforeEach(() => {
    // Mock API call using helpers
    mockGetQuestions();
  });

  it("renders the initial state with only the Start Quiz button", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("be.visible");
    cy.get("h2").should("not.exist");
    cy.contains("Your score:").should("not.exist");
  });

  it("renders the start button and starts the quiz", () => {
    startQuiz();
    loadQuestions().then((questions) => {
      cy.get("h2").should("contain", questions[0].question);
    });
  });

  it("displays the next question when an answer is selected", () => {
    startQuiz();

    loadQuestions().then((questions) => {
      questions.forEach((question, index) => {
        // Verify the current question
        cy.get("h2").should("contain", question.question);

        // Click the first answer
        cy.get("button").contains("1").click();

        // Verify the next question (if exists)
        if (index < questions.length - 1) {
          cy.get("h2").should("contain", questions[index + 1].question);
        }
      });
    });
  });

  it("shows the score when the quiz is completed", () => {
    startQuiz();
    let score = 0;

    loadQuestions().then((questions) => {
      questions.forEach((question) => {
        cy.get("h2").should("contain", question.question);

        // Select the first answer and increment the score if correct
        if (question.answers[0].isCorrect) score++;
        cy.get("button").contains("1").click();
      });

      // Verify the score display
      cy.contains("Quiz Completed").should("be.visible");
      cy.contains(`Your score: ${score}/${questions.length}`).should("be.visible");
    });
  });

  it("allows restarting the quiz after completion", () => {
    startQuiz();

    loadQuestions().then((questions) => {
      // Complete the quiz
      questions.forEach(() => {
        cy.get("button").contains("1").click();
      });

      // Restart the quiz
      cy.contains("Take New Quiz").click();

      // Verify the quiz resets
      cy.get("h2").should("contain", questions[0].question); // First question reloaded
      cy.contains("Your score:").should("not.exist"); // Score reset
    });
  });
});