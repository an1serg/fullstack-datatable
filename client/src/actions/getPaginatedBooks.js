import axios from 'axios';

const getPaginatedBooks = async (start, end) => {
  const URL = `${process.env.REACT_APP_API_URL}/books?start=${start}&end=${end}`;

  const books = await axios.get(URL);

  return books;
};

export default getPaginatedBooks;
