import pythonQuestions from '../../server/src/seeds/pythonQuestions.json';

describe('Tech Quiz Application', () => {
  context('Quiz Start', () => {
    beforeEach(() => {
      // Intercept API request for fetching questions
      cy.intercept('GET', '/api/questions', {
        statusCode: 200,
        body: pythonQuestions,
      }).as('getQuestions');

      cy.visit('/');
    });

    it('should display the "Start Quiz" button and load questions on click', () => {
      // Ensure the start button is visible
      cy.contains('Start Quiz').should('be.visible').click();

      // Wait for the API call to complete
      cy.wait('@getQuestions').its('response.statusCode').should('eq', 200);

      // Verify the first question is displayed
      cy.get('h2').should('contain', pythonQuestions[0].question);
    });
  });

  context('Quiz Interaction', () => {
    beforeEach(() => {
      // Mock API and visit page
      cy.intercept('GET', '/api/questions', {
        statusCode: 200,
        body: pythonQuestions,
      }).as('getQuestions');

      cy.visit('/');
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');
    });

    it('should display the next question after answering the current question', () => {
      // Answer the first question
      cy.get('.btn-primary').first().click();

      // Verify the next question is displayed
      cy.get('h2').should('contain', pythonQuestions[1].question);
    });

    it('should display the score after completing all questions', () => {
      // Answer all questions
      for (let i = 0; i < pythonQuestions.length; i++) {
        cy.get('h2').should('contain', pythonQuestions[i].question);
        cy.get('.btn-primary').first().click();
      }

      // Verify the score is displayed
      cy.contains('Your score:').should('be.visible');
      cy.contains(`Your score: ${pythonQuestions.length}/${pythonQuestions.length}`).should('be.visible');
    });
  });

  context('Quiz Restart', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/questions', {
        statusCode: 200,
        body: pythonQuestions,
      }).as('getQuestions');

      cy.visit('/');
      cy.contains('Start Quiz').click();
      cy.wait('@getQuestions');

      // Complete the quiz
      for (let i = 0; i < pythonQuestions.length; i++) {
        cy.get('.btn-primary').first().click();
      }
    });

    it('should allow restarting the quiz', () => {
      // Click the "Take New Quiz" button
      cy.contains('Take New Quiz').click();

      // Verify the quiz resets
      cy.contains('Start Quiz').should('be.visible');
    });
  });
});