import Axios from "axios";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPrefix } from "./lib/Bandung";



const sessionObject = JSON.parse(localStorage.getItem("bandung"));

const useQuiz = () => {
  const [sessionToken, setSessionToken] = useState(
    sessionObject?.sessionToken ?? null
  );
  const [loading, setLoading] = useState(true);

  const initialState = {
    quizEntity: {},
    quizUserEntity: {},
    shortDescription: "",
    longDescriptionEditorState: EditorState.createEmpty(),
  };

  function quizReducer(state, action) {
    switch (action.type) {
      case "SET_QUIZ_ENTITY":
        return { ...state, quizEntity: action.payload };
      case "SET_QUIZ_USER_ENTITY":
        return { ...state, quizUserEntity: action.payload };
      case "SET_SHORT_DESCRIPTION":
        return { ...state, shortDescription: action.payload };
      case "SET_LONG_DESCRIPTION_EDITOR_STATE":
        return { ...state, longDescriptionEditorState: action.payload };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(quizReducer, initialState);

  const handleEditorStateChange = (newState) => {
    dispatch({ type: "SET_LONG_DESCRIPTION_EDITOR_STATE", payload: newState });
  };

  useEffect(() => {
    try {
      const sToken = sessionObject ? sessionObject.sessionToken : null;

      console.log("Retrieved session token:", sToken);
      if (sToken) {
        setSessionToken(sToken);
      } else {
        console.log("No token found in local storage.");
      }
    } catch (error) {
      console.error(
        "An error occurred while retrieving the session token:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const zoomin = (quizEntityId) => {
    if (!quizEntityId) quizEntityId = state.quizEntity.quizEntityId;
    const userId = sessionObject ? sessionObject.userEntityId : null;

    Axios.get(
      `${getPrefix()}/app/quiz/view?sessionToken=${sessionToken}&quizEntityId=${quizEntityId}`
    ).then((response) => {
      dispatch({
        type: "SET_QUIZ_ENTITY",
        payload: { command: "View", quizEntity: response.data },
      });
    });

    Axios.get(
      `${getPrefix()}/app/quizuser/view?sessionToken=${sessionToken}&quizEntityId=${quizEntityId}&userEntityId=${userId}`
    ).then((response) => {
      dispatch({ type: "SET_QUIZ_USER_ENTITY", payload: response.data });
    });

    Axios.get(
      `${getPrefix()}/app/quiz/textshortdescription?sessionToken=${sessionToken}&quizEntityId=${quizEntityId}`
    ).then((response) => {
      dispatch({ type: "SET_SHORT_DESCRIPTION", payload: response.data });
    });

    Axios.get(
      `${getPrefix()}/app/quiz/textlongdescription?sessionToken=${sessionToken}&quizEntityId=${quizEntityId}`
    ).then((response) => {
      const blocksFromHtml = htmlToDraft(response.data);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      dispatch({
        type: "SET_LONG_DESCRIPTION_EDITOR_STATE",
        payload: editorState,
      });
    });
  };

  const executeQuizCreate = (event) => {
    event.preventDefault();
    const label = document.getElementById("QuizEntityLabel").value;
    const name = document.getElementById("QuizEntityName").value;
    const showOrder = document.getElementById("QuizEntityShowOrder").value;
   // const count = document.getElementById("QuizEntityCount").value;
    const shortDescription = document.getElementById(
      "QuizEntityShortDescription"
    ).value;
    const longDescription = draftToHtml(
      convertToRaw(state.longDescriptionEditorState.getCurrentContent())
    );
  
  
    if (label.trim() === '' || name.trim() === '' || showOrder.trim() === '' || shortDescription.trim() === '' || longDescription.trim() === '') {
      // Show error message using alert
     toast.error("Please fill all the fields");
      return;
    }
    
    const form = new FormData();
    form.append("sessionToken", sessionToken);
    form.append("label", document.getElementById("QuizEntityLabel").value);
    form.append("name", document.getElementById("QuizEntityName").value);
    form.append(
      "showOrder",
      document.getElementById("QuizEntityShowOrder").value
    );
    // form.append("count", document.getElementById("QuizEntityCount").value);
    form.append(
      "shortDescription",
      document.getElementById("QuizEntityShortDescription").value
    );
    form.append(
      "longDescription",
      draftToHtml(
        convertToRaw(state.longDescriptionEditorState.getCurrentContent())
      )
    );

    const userId = sessionObject ? sessionObject.userEntityId : null;
    form.append("userId", userId);

    Axios.post(`${getPrefix()}/app/quiz/create`, form)
      .then((response) => {
        console.log("Server response", response);
        if (response.data.error) {
          console.log(response);
          toast.error(response.data.error);
        } else if (response.data.quizEntityId) {
          console.log(response);
          zoomin(response.data.quizEntityId);
          toast.success("Quiz successfully created!");
        } else {
          console.log("quizEntityId is not defined in the response");
        }
      })
      .catch((error) => {
        console.log("Request failed", error);
        toast.error("Failed to create quiz.");
      });
  };

  return {
    sessionToken,
    loading,
    quizEntity: state.quizEntity,
    quizUserEntity: state.quizUserEntity,
    shortDescription: state.shortDescription,
    longDescriptionEditorState: state.longDescriptionEditorState,
    handleEditorStateChange,
    zoomin,
    executeQuizCreate,
  };
};

export default useQuiz;
