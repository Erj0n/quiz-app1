import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

export async function fetchQuiz(categoryId, amount) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        amount,
        category: categoryId,
        type: 'multiple',
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
}