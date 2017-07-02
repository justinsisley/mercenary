import { StyleSheet } from 'aphrodite-jss';

const styles = {
  hero: {
    padding: '1em 0em',
    minHeight: 700,

    '& h1.ui.header': {
      marginTop: '3em',
      marginBottom: '0em',
      fontSize: '4em',
      fontWeight: 'normal',
    },

    '& h2': {
      fontSize: '1.7em',
      fontWeight: 'normal',
    },
  },
};

export default StyleSheet.create(styles);
