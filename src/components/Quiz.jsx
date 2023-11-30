import React, { useEffect, useState } from 'react';
import '../css/Quiz.css';
import Header from './Layout/Header';

const Quiz = () => {
    const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const [quizHistory, setQuizHistory] = useState([]);

    useEffect(() => {
        // Load quiz history from local storage when component mounts
        const savedQuizHistory = localStorage.getItem('quizHistory');
        if (savedQuizHistory) {
            setQuizHistory(JSON.parse(savedQuizHistory));
        }
    }, []);

    useEffect(() => {
        // Save quiz history to local storage whenever it changes
        localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
    }, [quizHistory]);


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

    // eslint-disable-next-line no-shadow
    const score = selectedAnswers.reduce((score, selectedAnswer, index) => score + (questions[index].answerOptions[selectedAnswer]?.isCorrect ? 1 : 0), 0);

    const handleSubmit = () => {
        setSubmitted(true);
        const updatedQuizHistory = [...quizHistory, { score, total: questions.length }];
        console.log(updatedQuizHistory);  // Log the updatedQuizHistory
        setQuizHistory(updatedQuizHistory);
        localStorage.setItem('quizHistory', JSON.stringify(updatedQuizHistory));
    };


    const handleRestart = () => {
        setSelectedAnswers(Array(5).fill(null)); // reset the selected answers
        setSubmitted(false); // allow the quiz to be taken again
    };

    // const score = selectedAnswers.reduce((score, selectedAnswer, index) => {
    //     return score + (questions[index].answerOptions[selectedAnswer]?.isCorrect ? 1 : 0);
    // }, 0);

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
                        <button onClick={handleRestart}>Take Quiz Again</button>
                    </div>
                )}
            </div >
            <div className='quiz-history'>
                <h2>Quiz History:</h2>
                {quizHistory.map((quizResult, index) => (
                    <p key={index}>Quiz {index + 1}: {quizResult.score} / {quizResult.total}</p>
                ))}

            </div>
        </>
    );

};

export default Quiz;