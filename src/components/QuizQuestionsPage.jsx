// QuizQuestionsPage.jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPrefix, getSessionToken } from "../lib/Bandung";
import Layout from './Layout';

const QuizQuestionsPage = () => {
    const { quizEntityId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [alternatives, setAlternatives] = useState({}); // Store alternatives here
    const [loading, setLoading] = useState(true);
    const quizName = "Your Quiz Name";
  
    useEffect(() => {
      const fetchQuizQuestions = async () => {
        setLoading(true);
        try {
          const url = `${getPrefix()}/app/quizquestion/listbyquizshoworder?quizEntityId=${quizEntityId}&sessionToken=${getSessionToken()}&page=-1`;
          const response = await Axios.get(url);
          setQuestions(Array.isArray(response.data) ? response.data : []);
  
          // Fetch alternatives for each question
          const fetchedAlternatives = {};
          for (const question of response.data) {
            const alternativeResponse = await Axios.get(
              `${getPrefix()}/app/quizquestionalternative/listbyquizquestionshoworder?quizQuestionEntityId=${question.quizQuestionEntityId}&sessionToken=${getSessionToken()}`
            );
            fetchedAlternatives[question.quizQuestionEntityId] = alternativeResponse.data;
          }
          setAlternatives(fetchedAlternatives);
        } catch (error) {
          console.error("Failed to fetch quiz questions:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchQuizQuestions();
    }, [quizEntityId]);

    const handleChoiceChange = (questionId, choice) => {
        // to handle the choice selection logic here
      };
  
    if (loading) return <p>Loading...</p>;
  
    return (
        <Layout>
        <div
          css={css`
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 8px;
            width: 80%;
            margin: 20px auto;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          `}
        >
          <h1
            css={css`
              color: #333;
            `}
          >
            Quiz Number: {quizEntityId}
          </h1>
          <h2
            css={css`
              color: #666;
            `}
          >
            Quiz Name: {quizName}
          </h2>
          {questions.length === 0 ? (
            <p>No Questions</p>
          ) : (
            <ol>
              {questions.map((question, index) => (
                <li
                  key={index}
                  css={css`
                    padding: 10px;
                    margin: 10px 0;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                  `}
                >
                  {question.name || 'Unnamed Question'}
                  <div>
                    {alternatives[question.quizQuestionEntityId]?.map((alternative, altIndex) => (
                      <div key={altIndex}>
                        <input
                          type="radio"
                          id={`choice-${question.quizQuestionEntityId}-${altIndex}`}
                          name={`choice-${question.quizQuestionEntityId}`}
                          value={alternative.label}
                          onChange={() => handleChoiceChange(question.quizQuestionEntityId, alternative.label)}
                        />
                        <label
                          htmlFor={`choice-${question.quizQuestionEntityId}-${altIndex}`}
                          css={css`
                            margin-left: 5px;
                          `}
                        >
                          {alternative.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
        </Layout>
      );
    };
  
  export default QuizQuestionsPage;
  
  