import { create } from "zustand";
import confetti from "canvas-confetti";
import { type Question } from "./type";
import { persist, devtools } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fecthQuestion: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerId: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,
          fecthQuestion: async (limit: number) => {
            const res = await fetch("http://localhost:5100/data.json");
            const json = await res?.json();

            // Create random order for elements
            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);

            set({ questions }, false, "FETCH_QUESTIONS");
          },
          selectAnswer: (questionId: number, answerId: number) => {
            const { questions } = get();
            // Deep clone the questions array using structuredClone for a different reference
            const newQuestions = structuredClone(questions);
            // Find the index of the question with the matching id

            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId
            );
            if (questionIndex === -1) return; // Exit if the question is not found

            const questionInfo = newQuestions[questionIndex];

            // Determine if the user's answer is correct
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerId;
            // Update the question with the user's selected answer and correctness status
            if (isCorrectUserAnswer) {
              confetti();
            }

            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerId,
            };

            // Update the state with the new questions array
            set({
              questions: newQuestions,
            });
          },
          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, "GO_NEXT_QUESTION");
            }
          },
          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;

            if (previousQuestion >= 0) {
              set(
                { currentQuestion: previousQuestion },
                false
                // ,  "GO_PREVIOUS_QUESTION"
              );
            }
          },

          reset: () => {
            set(
              { currentQuestion: 0, questions: [] },
              false //"RESET"
            );
          },
        };
      },
      {
        name: "questions",
        // getStorage: () => localStorage // default
      }
    )
  )
);

// Selector for avoid rerender
export const useQuestionsSelectors = (): Pick<
  State,
  "questions" | "goNextQuestion" | "goPreviousQuestion" | "reset"
> => {
  return {
    questions: useQuestionsStore((state) => state.questions),
    goNextQuestion: useQuestionsStore((state) => state.goNextQuestion),
    goPreviousQuestion: useQuestionsStore((state) => state.goPreviousQuestion),
    reset: useQuestionsStore((state) => state.reset),
  };
};
