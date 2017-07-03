import { StyleSheet } from 'aphrodite-jss';

const styles = {
  stickyNav: {
    animationDuration: '.2s',
  },

  hidden: {
    '&.menu': {
      display: 'none',
    },
  },

  nav: {
    '& .ui.menu .ui.button': {
      marginLeft: '.5em',
    },
  },
};

export default StyleSheet.create(styles);
