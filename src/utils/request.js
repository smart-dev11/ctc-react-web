import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    'https://fathomless-atoll-80551.herokuapp.com/',
});
