import axios from 'axios';

export const createUserAccount = ({ email, name }) => {
  return axios.post('/api/account/create', { email, name });
};

export const verifyUserAccount = (token) => {
  return axios.post('/api/account/verify', { token });
};
