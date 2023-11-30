import Axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a Context object
const QuizContext = createContext();

// Create a Provider component
export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const sessionObject = JSON.parse(localStorage.getItem("bandung"));
    const userId = sessionObject ? sessionObject.userEntityId : null;

    Axios.get(
      `http://localhost:5000/https://www.uncovergem.com/app/quiz/listbyuser?userEntityId=${userId}&page=-1`
    )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setQuizzes(response.data);
        } else {
          console.error("Unexpected server response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch quizzes:", error);
      });
  }, []);

  return (
    <QuizContext.Provider value={quizzes}>{children}</QuizContext.Provider>
  );
};

// Create a custom hook that allows easy access to the quizzes
export const useQuizzes = () => useContext(QuizContext);
