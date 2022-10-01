import axios from 'axios';

const _instance = null;

const getInstance = () => {
  if (_instance !== null) return _instance;

  const newInstance = axios.create({
    baseURL: 'https://meta-agil-backend.herokuapp.com/meta/',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  newInstance.defaults.timeout = 1000 * 20;

  return newInstance;
};

export default getInstance();
