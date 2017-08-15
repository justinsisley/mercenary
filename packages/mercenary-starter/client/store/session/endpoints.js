import axios from 'axios';

export default {
  requestLoginEmail(email) {
    return axios.post('/api/session', { email });
  },

  verifyLoginToken(token) {
    return axios.post('/api/session/token', { token });
  },

  // NOTE: For example only
  verifySessionToken() {
    return axios.get('/api/session/verify');
  },
};
