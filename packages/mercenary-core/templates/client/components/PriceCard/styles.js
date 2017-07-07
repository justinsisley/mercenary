import { StyleSheet } from 'aphrodite-jss';

const styles = {
  card: {
    '&.ui.card': {
      border: 'none',
      borderRadius: 3,
      boxShadow: '0 0 15px rgba(0, 0, 0, .15)',

      '& > .content': {
        textAlign: 'center',
        borderTop: 'none',
      },

      '& > .content > .header:not(.ui)': {
        marginTop: 40,
        fontSize: 16,
        fontWeight: 'normal',
        textTransform: 'uppercase',
      },

      '& > .content > .meta + .description': {
        padding: '0 25px',
        marginBottom: 30,
      },

      '& .meta': {
        color: '#000',
        fontWeight: 'bold',
      },
    },

    '& .ui.statistic': {
      position: 'relative',

      '& > .label': {
        fontWeight: 'normal',
        textTransform: 'none',
      },
    },

    '& .ui.divider': {
      width: 50,
      margin: '20px auto 0',
    },
  },

  currency: {
    position: 'absolute',
    top: -10,
    left: -15,
    fontSize: 24,
  },
};

export default StyleSheet.create(styles);
