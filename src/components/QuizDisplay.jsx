//import { css } from "@emotion/react";
import { Button, TextField } from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";
import Axios from "axios";
import { Editor, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrefix, getSessionToken } from "../lib/Bandung";
import "../css/AddQuestion.css";
import Layout from "./Layout";
import { toast } from 'react-toastify';

const QuizDisplay = () => {
  const { quizEntityId } = useParams();
  const quizEnt = { quizEntityId: quizEntityId };
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [sessionToken, setSessionToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [showOrder, setShowOrder] = useState("");
  const [conditional, setConditional] = useState("");
  const [type, setType] = useState("");
  const [longDescriptionEditorState, setLongDescriptionEditorState] = useState(
    () => EditorState.createEmpty()
  );
  const [feedbackDescriptionEditorState, setFeedbackDescriptionEditorState] =
    useState(() => EditorState.createEmpty());

  const fetchQuizQuestions = async () => {
    try {
      const response = await Axios.get(
        `${getPrefix()}/app/quizquestionalternative/listquizquestionbyshoworder`,
        null, // Passing null as the second parameter
        {
          params: {
            questionEntityId: quizEntityId,
            page: -1,
          },
        }
      );
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch quiz questions:", error);
    }
  };
  function GotoQuizes() {
    window.location.href = "../view-created-quizzes";
  }

  useEffect(() => {
    // const sessionObject = JSON.parse(localStorage.getItem("bandung"));
    // setSessionToken(sessionObject?.sessionToken);

    const sessionToken = getSessionToken();
    setSessionToken(sessionToken);
    console.log(sessionToken);
    console.log(quizEntityId);

    // Fetch quiz details
    Axios.post(
      `${getPrefix()}/app/quiz/view?quizEntityId=${quizEntityId}&sessionToken=${getSessionToken()}`,
      {
        headers: { Authorization: `Bearer ${sessionToken}` },
      }
    )
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch quiz details:", error);
      });

    // Fetch quiz questions
    fetchQuizQuestions();
  }, [quizEntityId]);

  const handleAddQuestion = async (event) => {
    event.preventDefault();
    const name = document.getElementById('QuizEntityLabel').value;
    const priority = document.getElementById('QuizPriorityLabel').value;
    const showOrder = document.getElementById('QuizOrderLabel').value;
    const conditional = document.getElementById('QuizConditionalLabel').value;
    const type = document.getElementById('QuizTypeLabel').value;
    const longDescription = draftToHtml(convertToRaw(longDescriptionEditorState.getCurrentContent()));
    const feedbackDescription = draftToHtml(convertToRaw(feedbackDescriptionEditorState.getCurrentContent()));
  
    // Check if any of the required fields is empty
    if (
      name.trim() === '' ||
      priority.trim() === '' ||
      showOrder.trim() === '' ||
      conditional.trim() === '' ||
      type.trim() === '' ||
      longDescription.trim() === '' ||
      feedbackDescription.trim() === '' ||
      choices.some(choice => choice.trim() === '')
    ) {
      toast.error('Please fill all the required fields!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return; // Return statement to stop execution if fields are empty
    }
  
    console.log("handleAddQuestion called");
    const form = new FormData();
    form.append("sessionToken", getSessionToken());
    form.append("name", name);
    form.append("priority", priority);
    form.append("showOrder", showOrder);
    form.append("conditional", conditional);
    form.append("type", type);
    form.append(
      "longDescription",
      draftToHtml(convertToRaw(longDescriptionEditorState.getCurrentContent()))
    );
    form.append(
      "feedbackDescription",
      draftToHtml(
        convertToRaw(feedbackDescriptionEditorState.getCurrentContent())
      )
    );
    form.append("quizEntityId", quizEntityId);
  
    try {
      const response = await Axios.post(
        `${getPrefix()}/app/quizquestion/create`,
        form
      );
      toast.success('Question added successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      // Extract the quizQuestionEntityId from the response
      const questionId = response.data.quizQuestionEntityId;
  
      // Iterate through the choices and make individual API calls for each choice
      for (const choice of choices) {
        const alternativeForm = new FormData();
        alternativeForm.append("sessionToken", getSessionToken());
        alternativeForm.append("quizQuestionEntityId", questionId);
        alternativeForm.append("label", choice); // Add the choice as label
  
        // Making API call to create quiz question alternative
        await Axios.post(
          `${getPrefix()}/app/quizquestionalternative/create`,
          alternativeForm
        );
      }
  
    } catch (error) {
      console.error("Axios call failed:", error);
    }
  
    // Fetch quiz questions after a new question is added
    //fetchQuizQuestions();
  };
   
  

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className='update-wrapper'>
      <div className='update-title'>Add Questions to your Quiz</div>
      <div className="add-question-container">
      <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>Label</label>
        {/* <TextField
          label="Quiz Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="quiz-label"
        /> */}
        <input 
        type='text'
         id='QuizEntityLabel' 
         name='label' 
         className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' 
         placeholder='Enter label...' />

      <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>Priority</label>

        {/* <TextField
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-input"
        /> */}
         <input 
        type='text'
         id='QuizPriorityLabel' 
         name='priority' 
         className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' 
         placeholder='Enter Priority...' />



        <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>Show Order</label>

        {/* <TextField
          label="Show Order"
          value={showOrder}
          onChange={(e) => setShowOrder(e.target.value)}
          className="show-order-input"
        /> */}
         <input 
        type='text'
         id='QuizOrderLabel' 
         name='order' 
         className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' 
         placeholder='Enter Show Order...' />

      <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>Conditional</label>
        {/* <TextField
          label="Conditional"
          value={conditional}
          onChange={(e) => setConditional(e.target.value)}
          className="conditional-input"
        /> */}
         <input 
        type='text'
         id='QuizConditionalLabel' 
         name='conditional' 
         className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' 
         placeholder='Enter Conditional...' />

        <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>Type</label>

        <input 
        type='text'
         id='QuizTypeLabel' 
         name='type' 
         className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' 
         placeholder='Enter Type of Quiz...' />

        <div className="long-description-input">
        <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>Long Description</label>
          <div className="editor-container">
            <Editor
              id="QuizEntityLongDescription"
              name="longDescription"
              className="editor"
              editorState={longDescriptionEditorState}
              onChange={setLongDescriptionEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class editor"
              toolbarClassName="toolbar-class toolbar"
              placeholder="Enter Long Description..."
            />
          </div>
        </div>

        <div className="feedback-description-input">
        <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>Feedback Description</label>
          <div className="editor-container">
            <Editor
              className="editor"
              editorState={feedbackDescriptionEditorState}
              onChange={setFeedbackDescriptionEditorState}
              placeholder="Enter feedback description..."
            />
          </div>
        </div>

        {choices.map((choice, index) => (
          <TextField
            key={index}
            value={choice}
            onChange={(e) => {
              const newChoices = [...choices];
              newChoices[index] = e.target.value;
              setChoices(newChoices);
            }}
            label={`Choice ${index + 1}`}
            className="choice-input"
          />
        ))}
        <div className="action_buttons">
        <Button
          variant="contained"
          className="add-question-button"
          style={{
            backgroundColor: "teal",
            color: "white",
            width:"164px",
            marginTop: "15px",
            textAlign:"center",
            marginLeft: "200px",
          }}
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>

        <Button
          variant="contained"
          className="add-question-button"
          style={{
            backgroundColor: "orange",
            color: "white",
            width:"164px",
            marginTop: "15px",
            textAlign:"center",
            marginLeft: "30px",
          }}
          onClick={GotoQuizes}
        >
          Go to Quiz
        </Button>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default QuizDisplay;
