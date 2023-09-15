import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/books`;

const updateBook = async (bookData) => {
  const book = await axios.put(URL, bookData);

  return book;
};

export default updateBook;
