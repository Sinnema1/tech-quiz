/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
        startQuiz(): Chainable<void>;
        answerQuestion(index: number): Chainable<void>;
        restartQuiz(): Chainable<void>;
        }
    }
}

/**
 * Represents an answer to a quiz question
 */
interface Answer {
  text: string;
  isCorrect: boolean;
}

/**
 * Represents a single quiz question
 */
interface Question {
  _id: string; // Assuming ObjectId is serialized as a string
  question: string;
  answers: Answer[];
}

/**
 * Represents the state of the quiz during runtime
 */
interface QuizState {
  currentQuestionIndex: number;
  score: number;
  isComplete: boolean;
  questions: Question[];
}

export type { Answer, Question, QuizState };
