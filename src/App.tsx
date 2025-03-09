import { Container, Stack, Typography } from "@mui/material";
import { LogoJS } from "./icons";
import "./App.scss";

function App() {
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
      </Container>
    </main>
  );
}

export default App;
