import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Result() {
  const { id } = useParams();
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=8&category=${id}&type=multiple`);
        const question = response.data.results[0];
        setTotalQuestions(1);
        setScore(question.difficulty === 'hard' ? 3 : question.difficulty === 'medium' ? 2 : 1);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    }

    fetchQuiz();
  }, [id]);

 ;
}

export default Result;