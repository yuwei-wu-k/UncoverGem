import {
    Button,
    CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/UserQuiz.css";
import { getPrefix } from "../lib/Bandung";
  
  const useStyles = makeStyles({
    spinner: {
      color: "teal",
    },
  });
  
  const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const classes = useStyles();
    const observer = useRef();
  
    const sessionObject = JSON.parse(localStorage.getItem("bandung"));
    const sessionToken = sessionObject?.sessionToken;
    const userId = sessionObject?.userEntityId;
  
    useEffect(() => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await Axios.get(
            `${getPrefix()}/app/quiz/listbyuser?userEntityId=${userId}&page=${page}`,
            { headers: { Authorization: `Bearer ${sessionToken}` } }
          );
  
          if (response.data.length === 0) {
            setLoading(false);
            setHasMore(false);
          } else {
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
        }
      }, 1100);
    }, [page]);
  
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
  
    return (
      <div className="quiz-list">
        <h1>Your Quizzes - </h1>
        {quizzes.map((quiz, index) => (
          <div
            key={`${quiz.quizEntityId}-${quiz.name}`}
            className="quiz-item"
            ref={index === quizzes.length - 1 ? lastQuizElementRef : null}
          >
            <h2>
              <strong>Quiz No: {index + 1}</strong>
            </h2>
            <h2>{quiz.label}</h2>
            <h3>{quiz.name}</h3>
            <p>{quiz.shortDescription}</p>
  
            <Link to={`/take-quiz/${quiz.quizEntityId}`}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "skyblue",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                Take Quiz
              </Button>
            </Link>
          </div>
        ))}
        {loading && <CircularProgress className={classes.spinner} />}
      </div>
    );
  };
  
  export default QuizList;
  