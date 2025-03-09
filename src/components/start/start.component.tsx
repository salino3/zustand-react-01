import React from "react";
import { Button } from "@mui/material";
import {
  useQuestionsSelectors,
  useQuestionsStore,
} from "../../store/questions";

const LIMIT_QUESTIONS = 10;

export const Start: React.FC = () => {
  // const fetchQuestions = useQuestionsStore(
  //   (state: any) => state.fetchQuestions
  // );
  const { fecthQuestion } = useQuestionsStore();
  // Selector for avoid rerender
  const { questions } = useQuestionsSelectors();
  console.log(questions);

  //   const handleClick = () => {
  //     fetchQuestions(LIMIT_QUESTIONS);
  //   };

  return (
    <div style={{ marginTop: "16px" }}>
      <Button
        onClick={() => fecthQuestion(LIMIT_QUESTIONS)}
        variant="contained"
      >
        ¡Empezar el juego!
      </Button>
    </div>
  );
};
