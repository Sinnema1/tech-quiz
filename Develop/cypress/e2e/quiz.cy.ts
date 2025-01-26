import { mockGetQuestions, loadQuestions } from "../support/utils/helpers";

describe("Tech Quiz Application", () => {
  context("Quiz Start", () => {
    beforeEach(() => {
      // Mock the API request for fetching questions
      mockGetQuestions();

      // Visit the application
      cy.visit("/");
    });

    it('should display the "Start Quiz" button and load the first question on click', () => {
      // Verify the "Start Quiz" button is visible
      cy.contains("Start Quiz").should("be.visible").click();

      // Wait for the API call to complete
      cy.wait("@getQuestions").its("response.statusCode").should("eq", 200);

      // Verify the first question is displayed
      loadQuestions().then((questions) => {
        cy.get("h2").should("contain", questions[0].question);
      });
    });
  });

  context("Quiz Interaction", () => {
    beforeEach(() => {
      // Mock the API request for fetching questions
      mockGetQuestions();

      // Visit the application and start the quiz
      cy.visit("/");
      cy.contains("Start Quiz").click();
      cy.wait("@getQuestions");
    });

    it("should display the next question after answering the current question", () => {
      loadQuestions().then((questions) => {
        questions.forEach((question, index) => {
          // Verify the current question is displayed
          cy.get("h2").should("contain", question.question);

          // Select the first answer and click
          cy.get(".btn-primary").first().click();

          // Verify the next question is displayed if it exists
          if (index < questions.length - 1) {
            cy.get("h2").should("contain", questions[index + 1].question);
          }
        });
      });
    });

    it("should display the score after completing all questions", () => {
      let correctAnswers = 0;

      loadQuestions().then((questions) => {
        questions.forEach((question) => {
          // Verify the current question
          cy.get("h2").should("contain", question.question);

          // Check if the first answer is correct and increment the score
          if (question.answers[0].isCorrect) {
            correctAnswers++;
          }

          // Select the first answer
          cy.get(".btn-primary").first().click();
        });

        // Verify the score is displayed correctly
        cy.contains("Quiz Completed").should("be.visible");
        cy.contains(`Your score: ${correctAnswers}/${questions.length}`).should("be.visible");
      });
    });
  });

  context("Quiz Restart", () => {
    beforeEach(() => {
      // Mock the API request for fetching questions
      mockGetQuestions();

      // Visit the application and start the quiz
      cy.visit("/");
      cy.contains("Start Quiz").click();
      cy.wait("@getQuestions");

      // Complete the quiz
      loadQuestions().then((questions) => {
        questions.forEach(() => {
          cy.get(".btn-primary").first().click();
        });
      });
    });

    it("should restart the quiz and load the first question again", () => {
      // Click the "Take New Quiz" button
      cy.contains("Take New Quiz").click();

      // Wait for the new quiz to load
      cy.wait("@getQuestions");

      // Verify the first question is displayed again
      loadQuestions().then((questions) => {
        cy.get("h2").should("contain", questions[0].question);
      });
    });
  });
});