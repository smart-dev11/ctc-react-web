import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    'https://secret-earth-00275.herokuapp.com/',
});
