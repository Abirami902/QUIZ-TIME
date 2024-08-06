import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const Quiz = () => {
  const initialQuestions = [
    {
      question: "What is India’s national anthem",
      options: ["Jana Gana Mana", "Jana", "Gana", "Mana"],
      correctOptionIndex: 0,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctOptionIndex: 1,
    },
    {
      question: "What is India’s national flower",
      options: ["lavender", "rose", "jasmine", "Lotus"],
      correctOptionIndex: 3,
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Gold", "Silver", "Iron"],
      correctOptionIndex: 0,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [lastScoreChange, setLastScoreChange] = useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [timer, setTimer] = useState(60); 

  useEffect(() => {
    let timerInterval;
    if (!isQuizEnd && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!isQuizEnd && timer === 0) {
      setIsQuizEnd(true);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, isQuizEnd]);

  const handleOptionClick = (optionIndex) => {
    let scoreChange;
    if (optionIndex === initialQuestions[currentQuestionIndex].correctOptionIndex) {
      scoreChange = 4;
    } else {
      scoreChange = -4;
    }
    const newScore = Math.max(score + scoreChange, 0);
    setScore(newScore);
    setLastScoreChange(scoreChange);
    setAnswerSelected(true);
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < initialQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setAnswerSelected(false);
      setLastScoreChange(null);
    } else {
      setIsQuizEnd(true);
    }
  };

  return (
    <div className="container">
      <h1>Quiz Time</h1>
      {!isQuizEnd ? (
        <div>
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{initialQuestions[currentQuestionIndex].question}</h5>
              {initialQuestions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className="btn btn-primary m-2"
                  disabled={answerSelected}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          {answerSelected && (
            <div className="mt-3">
              {lastScoreChange !== null && (
                <p>
                  {lastScoreChange > 0
                    ? ` ${lastScoreChange} points!`
                    : ` ${Math.abs(lastScoreChange)} points.`}
                </p>
              )}
              <button onClick={handleNextQuestion} className="btn btn-secondary mt-2">
                Next Question
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-3">
          <h5>Your final score is: {score}</h5>
        </div>
      )}
      <div className="score-display">
        <h5>Time remaining: {timer} seconds</h5>
        <h5>Current Score: {score}</h5>
      </div>
    </div>
  );
};

export default Quiz;
