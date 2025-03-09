import { create } from "zustand";
import { type Question } from "./type";

interface State {
  questions: Question[];
  currentQuestion: number;
  fecthQuestion: (limit: number) => Promise<void>;
}

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fecthQuestion: async (limit: number) => {
      console.log("Result: ");
      set({
        questions: [
          {
            id: 1,
            question: "¿Cuál es la salida de este código?",
            code: "console.log(typeof NaN)",
            answers: ["undefined", "NaN", "string", "number"],
            correctAnswer: 3,
          },
        ],
      });
    },
  };
});
