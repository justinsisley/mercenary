import jss from 'jss';

const styles = {
  footer: {
    '&.segment': {
      padding: '3em 0em',
    },
  },
};

export default jss.createStyleSheet(styles).attach().classes;
