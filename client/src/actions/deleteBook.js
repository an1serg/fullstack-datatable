import axios from 'axios';

const deleteBook = async (id) => {
  const URL = `${process.env.REACT_APP_API_URL}/books/${id}`;
  const book = await axios.delete(URL);

  return book;
};

export default deleteBook;
