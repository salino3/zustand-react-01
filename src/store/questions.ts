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
      const res = await fetch("http://localhost:5100/data.json");
      const json = await res?.json();

      // Create random order for elements
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);

      set({ questions });
    },
  };
});
