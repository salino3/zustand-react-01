import React from "react";
// import { IconButton, Stack } from '@mui/material'
import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useQuestionsStore } from "../../store/questions";
import { type Question as QuestionType } from "../../store/type";

const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "#222",
        p: 2,
        textAlign: "left",
      }}
    >
      <Typography variant="h5">{info?.question}</Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info?.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              //   onClick={createHandleClick(index)}
              //   sx={{
              //     backgroundColor: getBackgroundColor(info, index),
              //   }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game: React.FC = () => {
  const { questions, currentQuestion } = useQuestionsStore();

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Question info={questionInfo} />
    </>
  );
};
