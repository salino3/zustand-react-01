import { create } from "zustand";
import { type Question } from "./type";

interface State {
  questions: Question[];
  currentQuestion: number;
  fecthQuestion: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerId: number) => void;
}

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fecthQuestion: async (limit: number) => {
      const res = await fetch("http://localhost:5100/data.json");
      const json = await res?.json();

      // Create random order for elements
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);

      set({ questions });
    },
    selectAnswer: (questionId: number, answerId: number) => {
      const { questions } = get();
      // Deep clone the questions array using structuredClone for a different reference
      const newQuestions = structuredClone(questions);
      // Find the index of the question with the matching id

      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
      if (questionIndex === -1) return; // Exit if the question is not found

      const questionInfo = newQuestions[questionIndex];

      // Determine if the user's answer is correct
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerId;
      // Update the question with the user's selected answer and correctness status

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
  };
});
