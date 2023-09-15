import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/books`;

const getBooks = async () => {
  const books = await axios.get(URL);

  return books;
};

export default getBooks;
