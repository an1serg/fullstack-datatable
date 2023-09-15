import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/books`;

const addBook = async (bookData) => {
  const book = await axios.post(URL, bookData);

  return book;
};

export default addBook;
