import { Button } from "@mui/material";
import { useQuestionsData } from "../../hooks/use-questions-data";
import { useQuestionsStore } from "../../store/questions";

export const Footer = () => {
  //* with one change re-render everithing in the 'state'
  //   const reset = useQuestionsStore();
  const reset = useQuestionsStore((state) => state.reset);
  const { correct, incorrect, unanswered } = useQuestionsData();

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: "16px" }}>
        <Button onClick={() => reset()}>Resetear juego</Button>
      </div>
    </footer>
  );
};
