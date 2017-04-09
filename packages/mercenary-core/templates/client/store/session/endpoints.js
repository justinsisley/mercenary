import axios from 'axios';

export const logIn = (email) => {
  return axios.post('/api/auth/login', { email });
};
