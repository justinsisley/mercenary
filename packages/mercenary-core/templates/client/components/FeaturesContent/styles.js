import { StyleSheet } from 'aphrodite-jss';

const styles = {
  stripe: {
    '&.ui.vertical': {
      padding: '8em 0em',

      '& h3': {
        fontSize: '1.9em',
      },

      '& .floated.image': {
        clear: 'both',
      },

      '& p': {
        fontSize: '1.33em',
      },
    },
  },
};

export default StyleSheet.create(styles);
