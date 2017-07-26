import jss from 'jss';

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

export default jss.createStyleSheet(styles).attach().classes;
