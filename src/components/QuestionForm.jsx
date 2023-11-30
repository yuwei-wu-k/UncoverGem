/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Axios from "axios";
import { useMemo, useState } from "react";
import { getPrefix } from "../lib/Bandung";
import QuizTemplateSelector from "./QuizTemplateSelector";

const Container = styled.div`
  margin: 1rem;
`;

const StyledButton = styled(Button)`
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #283593;
  }
`;

const QuestionForm = () => {
  const [questionType, setQuestionType] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [quiz, setQuiz] = useState({ questions: [] });
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const quizTemplates = [
    {
      id: 1,
      title: "Product Knowledge Quiz",
      questions: [
        "What is our top-selling product?",
        "Who is our target customer?",
      ],
    },
    {
      id: 2,
      title: "Customer Satisfaction Survey",
      questions: [
        "How would you rate your overall experience?",
        "Would you recommend us to a friend?",
      ],
    },
  ];

  const sessionObject = useMemo(
    () => JSON.parse(localStorage.getItem("bandung")),
    []
  );

  const sessionToken = useMemo(
    () => sessionObject?.sessionToken,
    [sessionObject]
  );

  const userEntityId = useMemo(
    () => sessionObject?.userEntityId,
    [sessionObject]
  );

  const handleTemplateSelect = (templateQuestions) => {
    handleAddTemplateQuestions(templateQuestions);
    setIsTemplateDialogOpen(false);
  };

  const handleAddTemplateQuestions = (templateQuestions) => {
    const questionsToAdd = templateQuestions.map((question) => ({
      type: "text",
      text: question,
      choices: null,
    }));

    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, ...questionsToAdd],
    }));
  };

  const handleChoiceChange = (index, event) => {
    const newChoices = [...choices];
    newChoices[index] = event.target.value;
    setChoices(newChoices);
  };

  const handleAddQuestion = async () => {
    if (questionText === "") {
      alert("Please enter a question.");
      return;
    }

    if (questionType === "mcq" && choices.some((choice) => choice === "")) {
      alert("Please fill in all choices for the MCQ.");
      return;
    }

    const newQuestion = {
      type: questionType,
      text: questionText,
      choices: questionType === "mcq" ? choices : null,
      userEntityId,
    };

    try {
      // const response = await Axios.post(
      //   // add quizentityid as a parameter to specify which quiz the question belongs to
      //   `${getPrefix()}/app/quizquestion/create?sessionToken=${sessionToken}`,
      //   newQuestion
      // );

      const response = await Axios.post(
        `${getPrefix()}/app/quizquestion/create?sessionToken=${sessionToken}`,
        newQuestion,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        questions: [...prevQuiz.questions, newQuestion],
      }));

      alert("Question added successfully!");
    } catch (error) {
      console.error("Error adding question:", error);
      alert("An error occurred while adding the question. Please try again.");
    }

    setQuestionType("");
    setQuestionText("");
    setChoices(["", "", "", ""]);
  };

  const saveQuiz = async () => {
    if (quiz.questions.length === 0) {
      alert("Please complete all fields before saving the quiz.");
      return;
    }

    try {
      await Axios.post();
      alert("Quiz saved successfully!");
      setQuiz({ questions: [] });
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("An error occurred while saving the quiz. Please try again.");
    }
  };

  return (
    <Container>
      <Box
        css={css`
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        `}
      >
        <StyledButton
          variant="contained"
          onClick={() => setIsTemplateDialogOpen(true)}
        >
          Choose from pre-existing templates
        </StyledButton>
      </Box>

      {/* <Dialog
        open={isTemplateDialogOpen}
        onClose={() => setIsTemplateDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Select a Template
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setIsTemplateDialogOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <QuizTemplateSelector
            onTemplateSelect={handleTemplateSelect}
            quizTemplates={quizTemplates}
          />
        </DialogContent>
      </Dialog> */}

      <Dialog
        open={isTemplateDialogOpen}
        onClose={() => setIsTemplateDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="16px 24px"
        >
          <Typography variant="h6">Select a Template</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setIsTemplateDialogOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <QuizTemplateSelector
            onTemplateSelect={handleTemplateSelect}
            quizTemplates={quizTemplates}
          />
        </DialogContent>
      </Dialog>

      <Box
        css={css`
          margin: 2rem;
        `}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <MenuItem value="text">Text Entry</MenuItem>
            <MenuItem value="mcq">Multiple Choice</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        {questionType === "mcq" &&
          choices.map((choice, index) => (
            <TextField
              key={index}
              fullWidth
              margin="normal"
              label={`Choice ${index + 1}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e)}
            />
          ))}

        <Box
          css={css`
            display: flex;
            justify-content: space-between;
            margin-top: 2rem;
          `}
        >
          <StyledButton variant="contained" onClick={handleAddQuestion}>
            Add Question
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={saveQuiz}
          >
            Done
          </StyledButton>
        </Box>

        <List>
          {quiz.questions.map((question, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Question${index + 1}: ${question.text}`}
                secondary={
                  question.type === "mcq"
                    ? `Choices: ${question.choices.join(", ")}`
                    : "Text Entry"
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default QuestionForm;
