import { fetchUserById } from './user/endpoints';

export default {
  checkStatus(dispatch) {
    return (response) => {
      console.log('dispatch', dispatch);
      console.log('response', response);
    };
  },
  //
  // errorHandler(dispatch) {
  //   console.log('errorHandler', dispatch);
  // },

  fetchUserById,
};
