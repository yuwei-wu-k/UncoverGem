import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { ToastContainer } from 'react-toastify';
import useQuiz from '../useQuiz';
import Layout from "./Layout";
import "../css/CreateQuiz.css";


const QuizCreate = () => {
    // const { sessionToken, loading, quizEntity, longDescriptionEditorState, setLongDescriptionEditorState, zoomin, executeQuizCreate } = useQuiz();
    const {sessionToken,
        loading,
        quizEntity,
        quizUserEntity,
        shortDescription,
        longDescriptionEditorState,
        setLongDescriptionEditorState,
        handleEditorStateChange,
        zoomin,
        executeQuizCreate} = useQuiz();

    if (loading) {
        return <div>Loading...</div>;
    }
   // const longDescription = draftToHtml(convertToRaw(longDescriptionEditorState.getCurrentContent()));

    function handleCancelClick(){
        //clear all fields on cancel
        document.getElementById('QuizEntityLabel').value = '';
        document.getElementById('QuizEntityName').value = '';
        document.getElementById('QuizEntityShowOrder').value = '';
        document.getElementById('QuizEntityShortDescription').value = '';
  
    }
    function clearField(QuizEntityLongDescription) {
        const element = document.getElementById(QuizEntityLongDescription);
        if (element) {
            element.value != '';
            setLongDescriptionEditorState(EditorState.createEmpty());
        }
    }

    return (
        <Layout>
        <div className='update-wrapper'>
            <div className='update-title'>Create Quiz</div>
            <form className= "quizform"onSubmit={executeQuizCreate}>
                <div className='update-block w-full h-full'>
                    <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>label</label>
                    <input type='text' id='QuizEntityLabel' name='label' className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' placeholder='Enter label...' />
                </div>
                <div className='update-block w-full h-full'>
                    <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>name</label>
                    <input type='text' id='QuizEntityName' name='name' className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' placeholder='Enter name...' />
                </div>
                 <div className='update-block w-full h-full'>
                    <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>showOrder</label>
                    <input type='text' id='QuizEntityShowOrder' name='showOrder' className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' placeholder='Enter showOrder...' />
                </div> 
                {/* <div className='update-block w-full h-full'>
                    <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>count</label>
                    <input type='text' id='QuizEntityCount' name='count' className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' placeholder='Enter count...' />
                </div>  */}
                <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>Short Description</label>
              <textarea id="QuizEntityShortDescription" name="shortDescription" className="text_area placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none" placeholder="Enter Short Description..." rows="4" cols="50" ></textarea>
                <div className="editor_field fields">
                <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>Long Description</label>

                    <Editor
                        id="QuizEntityLongDescription"
                        name="longDescription"
                        className="editor"
                        editorState={longDescriptionEditorState}
                        // onEditorStateChange={setLongDescriptionEditorState}
                        onEditorStateChange={handleEditorStateChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class editor"
                        toolbarClassName="toolbar-class toolbar"
                        placeholder="Enter Long Description..."
                    />
                </div>
                <div className='action-area flex space-x-4 items-center'>
                    <div className='text-sm text-qred font-semibold' onClick={handleCancelClick}>Cancel</div>
                    <button className='w-[164px] h-[50px] bg-qblack text-white text-sm'>Save</button>
                </div>
            </form>
            
        </div>
        </Layout>
    );
};

export default QuizCreate;
