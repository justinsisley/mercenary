import { StyleSheet } from 'aphrodite-jss';

const styles = {
  nav: {
    position: 'relative',
    zIndex: 1,

    '& .ui.secondary.pointing.menu, & .ui.secondary.inverted.pointing.menu': {
      border: 'none',
    },

    '& .ui.menu .ui.button': {
      marginLeft: '.5em',
    },
  },
};

export default StyleSheet.create(styles);
