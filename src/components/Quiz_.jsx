import React, { useState } from 'react';
import '../css/Quiz.css';
import Header from './Layout/Header';

const Quiz = () => {
    const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(null));
    const [submitted, setSubmitted] = useState(false);

    const questions = [
        {
            questionText: "What is the capital of France?",
            answerOptions: [
                { answerText: "New York", isCorrect: false },
                { answerText: "London", isCorrect: false },
                { answerText: "Paris", isCorrect: true },
                { answerText: "Dubai", isCorrect: false },
            ],
        },

        {
            questionText: "What is the capital of France?",
            answerOptions: [
                { answerText: "New York", isCorrect: false },
                { answerText: "London", isCorrect: false },
                { answerText: "Paris", isCorrect: true },
                { answerText: "Dubai", isCorrect: false },
            ],
        },

        {
            questionText: "What is the capital of France?",
            answerOptions: [
                { answerText: "New York", isCorrect: false },
                { answerText: "London", isCorrect: false },
                { answerText: "Paris", isCorrect: true },
                { answerText: "Dubai", isCorrect: false },
            ],
        },

        {
            questionText: "What is the capital of France?",
            answerOptions: [
                { answerText: "New York", isCorrect: false },
                { answerText: "London", isCorrect: false },
                { answerText: "Paris", isCorrect: true },
                { answerText: "Dubai", isCorrect: false },
            ],
        },

        {
            questionText: "What is the capital of France?",
            answerOptions: [
                { answerText: "New York", isCorrect: false },
                { answerText: "London", isCorrect: false },
                { answerText: "Paris", isCorrect: true },
                { answerText: "Dubai", isCorrect: false },
            ],
        },
    ];

    const handleAnswerOptionClick = (questionIndex, selectedAnswerIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = selectedAnswerIndex;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const score = selectedAnswers.reduce((score, selectedAnswer, index) => {
        return score + (questions[index].answerOptions[selectedAnswer]?.isCorrect ? 1 : 0);
    }, 0);

    return (
        <>
            <Header />
            <div className='app'>

                {!submitted ? (
                    <>
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex}>
                                <div className='question-section'>
                                    <div className='question-count'>
                                        <span>Question {questionIndex + 1}</span>/{questions.length}
                                    </div>
                                    <div className='question-text'>{question.questionText}</div>
                                </div>

                                <div className='answer-section'>
                                    {question.answerOptions.map((answerOption, answerIndex) => (
                                        <button
                                            key={answerIndex}
                                            onClick={() => handleAnswerOptionClick(questionIndex, answerIndex)}
                                            className={selectedAnswers[questionIndex] === answerIndex ? 'selected' : ''}
                                        >
                                            {answerOption.answerText}
                                        </button>
                                    ))}
                                </div>

                                {questionIndex !== questions.length - 1 && <hr />} {/* Adding a horizontal line between each question except the last one */}
                            </div>
                        ))}
                        <button className="submit-button" onClick={handleSubmit}>Submit Quiz</button>
                    </>
                ) : (
                    <div className='score-section'>
                        You scored {score} out of {questions.length}
                    </div>
                )}
            </div >
        </>
    );

};

export default Quiz;