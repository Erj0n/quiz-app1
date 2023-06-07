import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css'

function Home() {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        const sportsCategory = response.data.trivia_categories.find(
          (category) => category.name === 'Sports'
        );
        setCategory(sportsCategory);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Sport Quiz</h1>
      {category && (
        <ul>
          <li key={category.id}>
            <Link to={`/quiz/${category.id}`}>{category.name}</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Home;
