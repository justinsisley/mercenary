import { StyleSheet } from 'aphrodite-jss';

const styles = {
  stripe: {
    '&.ui.vertical': {
      padding: '8em 0em',

      '& h3': {
        fontSize: '1.9em',
      },

      '& .button + h3, & p + h3': {
        marginTop: '3em',
      },

      '& .floated.image': {
        clear: 'both',
      },

      '& p': {
        fontSize: '1.33em',
      },

      '& .horizontal.divider': {
        margin: '3em 0em',
      },
    },
  },

  quote: {
    '&.ui.vertical.segment': {
      padding: '0em',

      '& .grid .column': {
        paddingTop: '5em',
        paddingBottom: '5em',
      },
    },
  },
};

export default StyleSheet.create(styles);
