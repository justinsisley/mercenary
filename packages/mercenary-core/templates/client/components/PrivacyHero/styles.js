import { StyleSheet } from 'aphrodite-jss';

const styles = {
  hero: {
    padding: '1em 0em',

    '& h1.ui.header': {
      marginTop: 100,
      marginBottom: 0,
      fontSize: 40,
      fontWeight: 'normal',
      lineHeight: '60px',
    },
  },

  content: {
    '& h2': {
      marginTop: 80,
      marginBottom: 20,
      fontWeight: 'normal',
      textAlign: 'center',
    },

    '& h3': {
      fontWeight: 'normal',
      textAlign: 'center',
    },

    '& p, & li': {
      fontSize: 16,
      lineHeight: 1.75,
    },

    '& p:last-child': {
      marginBottom: 100,
    },
  },
};

export default StyleSheet.create(styles);
