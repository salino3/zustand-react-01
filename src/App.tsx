import { Container, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { LogoJS } from "./icons";
import { Game, Start } from "./components";
import "./App.scss";

function App() {
  // const questions = useQuestionsStore((state) => state?.questions);
  const { questions } = useQuestionsStore();
  console.log(questions);
  return (
    <main className="root">
      <Container>
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <LogoJS />
          <Typography className="titleWeb" variant="h2" component={"h1"}>
            Jascript Quiz
          </Typography>
        </Stack>
        {questions && questions?.length === 0 ? <Start /> : <Game />}
      </Container>
    </main>
  );
}

export default App;
