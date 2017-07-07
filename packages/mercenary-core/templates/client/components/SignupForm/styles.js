import { StyleSheet } from 'aphrodite-jss';

const styles = {
  content: {
    '&.ui.grid > .row': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },

  titles: {
    '&.ui.segment': {
      paddingBottom: 0,
      marginTop: '15%',

      '& h2': {
        marginBottom: 10,
        fontSize: 32,
      },

      '& h3': {
        marginTop: 10,
        marginBottom: 30,
      },
    },
  },

  form: {
    '& .ui.message': {
      padding: 0,
      fontSize: 18,
      background: 'none',
      boxShadow: 'none',
    },
  },
};

export default StyleSheet.create(styles);
