import { Question } from "../types";

/**
 * Randomly selects a subset of questions from a given array.
 * @param questions - Array of all available questions.
 * @param count - Number of questions to select.
 * @returns A randomized array of questions.
 */
export const getRandomQuestions = (questions: Question[], count: number): Question[] => {
  return questions.sort(() => 0.5 - Math.random()).slice(0, count);
};

/**
 * Initializes the quiz state with default values.
 * @param questions - Array of questions for the quiz.
 * @returns The initialized quiz state.
 */
export const initializeQuizState = (questions: Question[]) => {
  return {
    currentQuestionIndex: 0,
    score: 0,
    isComplete: false,
    questions,
  };
};