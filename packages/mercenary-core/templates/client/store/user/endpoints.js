import axios from 'axios';

export const fetchUserById = (userId) => {
  return axios.get(`/proxy/users/${userId}`);
};
