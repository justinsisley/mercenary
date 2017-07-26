import jss from '../../utils/jss';

const styles = {
  form: {
    '&.ui.segment': {
      marginTop: '50%',

      '& h2': {
        marginBottom: 30,
        fontSize: 32,
      },
    },

    '& .ui.message': {
      padding: 0,
      fontSize: 18,
      background: 'none',
      boxShadow: 'none',
    },
  },
};

export default jss.createStyleSheet(styles).attach().classes;
