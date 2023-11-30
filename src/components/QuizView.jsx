// Purpose of this component:  to fetch and display quizzes created by the user

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/UserQuiz.css";
import { getPrefix } from "../lib/Bandung";

const useStyles = makeStyles({
  spinner: {
    color: "teal",
  },
});

const UserQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]); 
  const [page, setPage] = useState(0); 
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const sessionObject = useMemo(
    () => JSON.parse(localStorage.getItem("bandung")),
    []
  );
  const sessionToken = useMemo(
    () => sessionObject?.sessionToken,
    [sessionObject]
  );
  const userId = useMemo(() => sessionObject?.userEntityId, [sessionObject]);

  // This is the useEffect hook for fetching quizzes
  // Gets triggered when the 'page' state variable changes
  // Page state variable is changed when user scrolls to the bottom of the page

  useEffect(() => {
    setLoading(true); 
    setTimeout(async () => {
      try {
        const response = await Axios.get(
          `${getPrefix()}/app/quiz/listbyuser?userEntityId=${userId}&page=${page}`,
          { headers: { Authorization: `Bearer ${sessionToken}` } }
        );

        console.log(
          `Page: ${page}, Quizzes fetched:`,
          response.data.length,
          JSON.stringify(response.data, null, 2)
        );

        // No more quizzes to load
        if (response.data.length === 0) {
          setLoading(false); 
          setHasMore(false); 
        } else {
          // If there are more quizzes, they are appended to the quizzes state variable
          // Appends quizzes that have already been fetched to the new quizzes that have just been fetched from the server

          setQuizzes((prevQuizzes) => {
            const newData = response.data.filter(
              (dataItem) =>
                !prevQuizzes.find(
                  (quizItem) => quizItem.quizEntityId === dataItem.quizEntityId
                )
            );

            return [...prevQuizzes, ...newData]; 
          });

          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
        setLoading(false);
        setError("Failed to load quizzes. Please try again later.");
      }
    }, 1100);
  }, [page]); 

  const observer = useRef();

  // Creating a function that sets up the IntersectionObserver
  // IntersectionObserver is a browser API that allows us to determine when an element comes into view
  // node is the last quiz element in the list (i.e.last quiz item of a page that is currently rendered on the scree)
  // It is the element that the Intersection Observer observes to implement the infinite scroll feature

  const lastQuizElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore] 
  );

  const handleOpen = (quiz, isShortDescription) => {
    setEditQuiz({ ...quiz, isShortDescription });
    setNewDescription(
      isShortDescription ? quiz.shortDescription : quiz.longDescription
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditQuiz(null);
  };

  const handleSave = () => {
    const endpoint = editQuiz.isShortDescription
      ? `${getPrefix()}/app/quiz/updateshortdescription`
      : `${getPrefix()}/app/quiz/updatelongdescription`;

    const endpointWithParams = `${endpoint}?quizEntityId=${editQuiz.quizEntityId}&sessionToken=${sessionToken}&`;

    Axios.post(endpointWithParams, {
      description: newDescription,
    })
      .then((response) => {
        console.log("Response:", response.data);
        setQuizzes(
          quizzes.map((quiz) =>
            quiz.quizEntityId === editQuiz.quizEntityId
              ? { ...quiz, description: newDescription }
              : quiz
          )
        );
      })
      .catch((error) => {
        console.error("Failed to update description:", error);
      });

    handleClose();
  };

  const deleteQuiz = (quizId) => {
    console.log("quizId", quizId);

    Axios.post(
      `${getPrefix()}/app/quiz/delete?quizEntityId=${quizId}&sessionToken=${sessionToken}`
    )

      .then((response) => {
        setQuizzes(quizzes.filter((quiz) => quiz.quizEntityId !== quizId));
      })
      .catch((error) => {
        console.error("Failed to delete quiz:", error);
      });
  };

  return (
    <div className="quiz-list">
      <h1>Your Quizzes - </h1>
      {quizzes.map((quiz, index) => (
        <div
          key={`${quiz.quizEntityId}-${quiz.name}`}
          className="quiz-item"
          // We set the ref of quiz element to the lastQuizElementRef only if it is the last quiz in the array
          // lastQuizElementRef is called with the last quiz item when it is rendered as a callback ref
          ref={index === quizzes.length - 1 ? lastQuizElementRef : null}
        >
          <h2>
            <strong>Quiz No: {index + 1}</strong>
          </h2>
          <h2>{quiz.label}</h2>
          <h3>{quiz.name}</h3>
          <p>{quiz.shortDescription}</p>

          <Link to={`/display-quiz/${quiz.quizEntityId}`}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "skyblue",
                color: "white",
                marginRight: "10px",
              }}
            >
              Add a question
            </Button>
          </Link>

          <Link to={`/quizquestions/${quiz.quizEntityId}`}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "skyblue",
                color: "white",
                marginRight: "10px",
              }}
            >
              View Quiz Questions
            </Button>
          </Link>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteQuiz(quiz.quizEntityId)}
          >
            Delete Quiz
          </Button>
        </div>
      ))}
      {loading && <CircularProgress className={classes.spinner} />}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new description below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserQuizzes;
