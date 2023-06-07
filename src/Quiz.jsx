import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function loadQuiz() {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=3&category=${id}&type=multiple`
        );
        const questionsData = response.data.results.map((question) => {
          const imageIndex = Math.floor(Math.random() * 7) + 1;
          const options = [
            ...question.incorrect_answers,
            question.correct_answer
          ]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((option, index) => ({
              id: `${currentQuestionIndex}-${index}`,
              value: option
            }));
          return {
            ...question,
            image: `/images/quiz${imageIndex}.jpg`,
            options
          };
        });
        setQuizQuestions(questionsData);
      } catch (error) {
        console.error('Error loading quiz:', error);
      }
    }

    loadQuiz();
  }, [id]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const selectedOptionObj = currentQuestion.options.find(
      (option) => option.id === selectedOption
    );
    if (
      selectedOptionObj &&
      selectedOptionObj.value === currentQuestion.correct_answer
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    if (selectedOption !== '') {
      setSelectedOption('');
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleRetry = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    window.location.reload(); // Reload the page
  };

  const handleBackToCategories = () => {
    navigate('/');
  };

  if (quizQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex >= quizQuestions.length) {
    return (
      <div>
        <h1>Quiz Finished!</h1>
        <p className='score'>Your score: {score}</p>
        <button className="Retrybtn" onClick={handleRetry}>
          Retry
        </button>
        <button className="Backbtn" onClick={handleBackToCategories}>
          Home page
        </button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const backgroundImage = {
    backgroundImage: `url(${currentQuestion.image})`
  };

  return (
    <div style={backgroundImage} className="quiz-container">
      <h1>Quiz</h1>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></p>
      <ul>
        {currentQuestion.options.map((option) => (
          <li key={option.id}>
            <label>
              <input
                type="radio"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionSelect(option.id)}
              />
              {option.value}
            </label>
          </li>
        ))}
      </ul>
      <button className="qButton" onClick={handleNextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default Quiz;
