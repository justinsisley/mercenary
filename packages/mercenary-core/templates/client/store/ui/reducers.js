import { handleActions } from 'redux-actions';
import { showPublicStickyNav, hidePublicStickyNav } from './actions';

const initialState = {
  showPublicStickyNav: false,
};

export default handleActions({
  [showPublicStickyNav]: (state) => {
    return {
      ...state,
      showPublicStickyNav: true,
    };
  },

  [hidePublicStickyNav]: (state) => {
    return {
      ...state,
      showPublicStickyNav: false,
    };
  },
}, initialState);
