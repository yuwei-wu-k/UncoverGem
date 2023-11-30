import styled from '@emotion/styled';
import { Button } from "@material-ui/core";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrefix } from "../lib/Bandung";
import Layout from './Layout';

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const QuestionDiv = styled.div`
  margin-bottom: 30px;
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
`;

const AlternativesContainer = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-top: 10px;
`;

const OptionLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  padding: 5px;
  cursor: pointer;

  input {
    margin-right: 10px;
  }
`;

const TakeQuiz = () => {
  const { quizEntityId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [alternatives, setAlternatives] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sessionToken = JSON.parse(localStorage.getItem("bandung"))?.sessionToken;
  const userEntityId = JSON.parse(localStorage.getItem("bandung"))?.userEntityId;

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        const response = await Axios.get(
          `${getPrefix()}/app/quizquestion/listbyquizshoworder?quizEntityId=${quizEntityId}&sessionToken=${sessionToken}&page=-1`
        );
        setQuestions(response.data);
        setLoading(false);

        // Fetch alternatives for each question
        const allAlternatives = await Promise.all(
          response.data.map(async (question) => {
            const altResponse = await Axios.get(
              `${getPrefix()}/app/quizquestionalternative/listbyquizquestionshoworder?quizQuestionEntityId=${question.quizQuestionEntityId}&sessionToken=${sessionToken}`
            );
            return { [question.quizQuestionEntityId]: altResponse.data };
          })
        );

        // Store the alternatives in the state
        const alternativesObj = Object.assign({}, ...allAlternatives);
        setAlternatives(alternativesObj);
      } catch (err) {
        console.error("Failed to fetch quiz details:", err);
        setError("Failed to load quiz. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [quizEntityId, sessionToken]);

  const handleOptionChange = (questionId, alternativeId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: alternativeId,
    });
  };

  const handleSubmitQuiz = () => {
    console.log("Selected options:", selectedOptions);
    // Placeholder API call for quiz submission
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
    <Container>
      <h1>Take Quiz</h1>
      {questions.map((question, index) => (
        <QuestionDiv key={question.quizQuestionEntityId}>
          <h3>{question.name}</h3>
          <AlternativesContainer>
            {alternatives[question.quizQuestionEntityId]?.map((alternative) => (
              <OptionLabel key={alternative.quizQuestionAlternativeEntityId}>
                <input
                  type="radio"
                  value={alternative.quizQuestionAlternativeEntityId}
                  name={question.quizQuestionEntityId}
                  onChange={() => handleOptionChange(question.quizQuestionEntityId, alternative.quizQuestionAlternativeEntityId)}
                />
                {alternative.label}
              </OptionLabel>
            ))}
          </AlternativesContainer>
        </QuestionDiv>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmitQuiz}>
        Submit Quiz
      </Button>
    </Container>
    </Layout>
  );
};

export default TakeQuiz;
