import axios from 'axios';

const _instance = null;

const getInstance = () => {
  if (_instance !== null) return _instance;

  const newInstance = axios.create({
    baseURL: 'http://54.233.107.70:5000/alvo',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  newInstance.defaults.timeout = 1000 * 20;

  return newInstance;
};

export default getInstance();
