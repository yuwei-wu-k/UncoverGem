import Axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { Component } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { getPrefix } from "../Bandung";


class QuizCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            longDescriptionEditorState: EditorState.createEmpty(),
        };
    }

    // zoomin method

    zoomin(quizUserEntityId) {
        if (!quizUserEntityId) quizUserEntityId = this.state.quizUserEntity.quizUserEntityId;
        Axios.get(getPrefix() + "/app/quizuser/view?sessionToken=" + getSessionToken() + "&quizUserEntityId=" + quizUserEntityId, null)
            .then(response => { this.setState({ command: "View", quizUserEntity: response.data }); });
        Axios.get(getPrefix() + "/app/quizuser/textlongdescription?sessionToken=" + getSessionToken() + "&quizUserEntityId=" + quizUserEntityId, null)
            .then(response => { this.setState({ longDescription: response.data }); });
    }

    executeQuizCreate = (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append('sessionToken', this.props.sessionToken);
        form.append('label', document.getElementById("QuizEntityLabel").value);
        form.append('name', document.getElementById("QuizEntityName").value);
        form.append('showOrder', document.getElementById("QuizEntityShowOrder").value);
        form.append('count', document.getElementById("QuizEntityCount").value);
        form.append('shortDescription', document.getElementById("QuizEntityShortDescription").value);
        form.append('longDescription', draftToHtml(convertToRaw(this.state.longDescriptionEditorState.getCurrentContent())));

        Axios.post('/app/quiz/create', form)
            // Axios.post('http://localhost:5000/app/quiz/create', form)
            .then(response => {
                console.log('Server response', response);
                this.zoomin(response.data.quizEntityId)
            })
            .catch(error => {
                // Handle error here
                console.log('Request failed', error);
                // alert('An error occurred while creating the quiz. Please try again.');
            });
    }

    handleEditorChange = (editorState) => {
        this.setState({
            longDescriptionEditorState: editorState,
        });
    }

    render() {
        return (
            <div className='update-wrapper' >
                {/* {this.menu()} */}
                < div className='update-title' > Create Quiz</div>
                <form onSubmit={(event) => { this.executeQuizCreate(event); }}>
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
                    <div className='update-block w-full h-full'>
                        <label className='update-field-label capitalize block mb-2 text-qgray text-[13px] font-normal'>count</label>
                        <input type='text' id='QuizEntityCount' name='count' className='update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none' placeholder='Enter count...' />
                    </div>
                    <textarea id="QuizEntityShortDescription" name="shortDescription" className="text_area fields" placeholder="Enter shortDescription..." rows="4" cols="50"></textarea>
                    {/* <div className="editor_field fields"><Editor id="QuizEntityLongDescription" name="longDescription" onEditorStateChange={(editorState) => { this.longDescriptionEditorState = editorState }} wrapperClassName="wrapper-class" editorClassName="editor-class editor" toolbarClassName="toolbar-class toolbar" placeholder="Enter longDescription..." /></div> */}
                    <div className="editor_field fields"><Editor id="QuizEntityLongDescription" name="longDescription" onEditorStateChange={this.handleEditorChange} wrapperClassName="wrapper-class" editorClassName="editor-class editor" toolbarClassName="toolbar-class toolbar" placeholder="Enter long description..." /></div>
                    <div className='action-area flex space-x-4 items-center'>
                        <button onClick={(event) => { this.command(null); }} className='text-sm text-qred font-semibold'>Cancel</button>
                        <button className='w-[164px] h-[50px] bg-qblack text-white text-sm'>Save</button>
                    </div>
                </form>
            </div >
        );
    }
}

export default QuizCreate;