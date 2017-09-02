import axios from 'axios';

export default {
  getUsers() {
    return axios.get('https://jsonplaceholder.typicode.com/users');
  },

  getUser(userId) {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  },
};
