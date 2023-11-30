import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrefix, getSessionToken } from "../lib/Bandung";

const QuizQuestions = () => {
  const { quizEntityId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const sessionToken = getSessionToken();

    Axios.post(
      `${getPrefix()}/app/quizquestion/listbyquizshoworder?quizEntityId=${quizEntityId}&sessionToken=${sessionToken}`
    )
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch questions:", error);
      });
  }, [quizEntityId]);

  if (!questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Quiz Questions:</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            Question ID: {question.quizQuestionEntityId}, Created on: {question.createDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestions;
