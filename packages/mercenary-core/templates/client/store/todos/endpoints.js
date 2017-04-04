import axios from 'axios';

export const getTodos = () => {
  return axios.get('/proxy/todos');
};
