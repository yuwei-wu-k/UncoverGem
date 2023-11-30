import { EditorState } from 'draft-js';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import QuizEntityComponent from '../QuizEntityComponent';


class QuizCreate extends QuizEntityComponent {
    constructor(props) {
        super(props);
        this.state = {
            quizEntity: {},
            shortDescription: '',
            longDescriptionEditorState: EditorState.createEmpty()
        };
        this.getSession = this.getSession.bind(this);
        this.getPrefix = this.getPrefix.bind(this);
        this.menu = this.menu.bind(this);
        this.command = this.command.bind(this);
        this.zoomin = this.zoomin.bind(this);
        this.zoomout = this.zoomout.bind(this);
        this.executeQuizCreate = this.executeQuizCreate.bind(this);
        this.executeQuizUpdate = this.executeQuizUpdate.bind(this);
        this.executeQuizUpdateShortDescription = this.executeQuizUpdateShortDescription.bind(this);
        this.executeQuizUpdateLongDescription = this.executeQuizUpdateLongDescription.bind(this);
        this.executeQuizUpdateImage = this.executeQuizUpdateImage.bind(this);
        this.executeQuizUploadImage = this.executeQuizUploadImage.bind(this);
        this.executeQuizDelete = this.executeQuizDelete.bind(this);
        this.executeQuizApprove = this.executeQuizApprove.bind(this);
        this.executeQuizUnapprove = this.executeQuizUnapprove.bind(this);
    }



    render() {
        return (
            <div className='update-wrapper' >
                {this.menu()}
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
                    <div className="editor_field fields"><Editor id="QuizEntityLongDescription" name="longDescription" onEditorStateChange={(editorState) => { this.longDescriptionEditorState = editorState }} wrapperClassName="wrapper-class" editorClassName="editor-class editor" toolbarClassName="toolbar-class toolbar" placeholder="Enter longDescription..." /></div>
                    <div className='action-area flex space-x-4 items-center'>
                        <button onClick={(event) => { this.command(null); }} className='text-sm text-qred font-semibold'>Cancel</button>
                        <button className='w-[164px] h-[50px] bg-qblack text-white text-sm'>Saved</button>
                    </div>
                </form>
            </div >
        );
    }
}

export default QuizCreate;