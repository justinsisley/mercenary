import { StyleSheet } from 'aphrodite-jss';

const styles = {
  hero: {
    padding: '1em 0em',
    minHeight: 700,

    '& h1.ui.header': {
      marginTop: 160,
      marginBottom: 0,
      fontSize: 60,
      fontWeight: 'normal',
      lineHeight: '60px',
    },

    '& h2': {
      marginBottom: 25,
      fontSize: 24,
      fontWeight: 'normal',
    },
  },
};

export default StyleSheet.create(styles);
