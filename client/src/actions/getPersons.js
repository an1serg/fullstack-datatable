import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/persons`;

const getPersons = async () => {
  const persons = await axios.get(URL);

  return persons;
};

export default getPersons;
