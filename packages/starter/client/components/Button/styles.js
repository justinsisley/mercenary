import jss from '../../utils/jss';

const styles = {
  button: {
    padding: '12px 34px',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#777',
    textTransform: 'uppercase',
    background: '#fff',
    border: '3px solid #888',
    borderRadius: 2,
    transition: 'all .1s ease-in-out',
    cursor: 'pointer',

    '&:hover': {
      color: '#222',
      borderColor: '#444',
    },

    '&.blue': {
      color: 'HSLA(230, 76%, 62%, 1.00)',
      borderColor: 'HSLA(230, 76%, 62%, 1.00)',

      '&:hover': {
        color: 'HSLA(230, 76%, 38%, 1.00)',
        borderColor: 'HSLA(230, 76%, 42%, 1.00)',
      },
    },

    '&.green': {
      color: 'HSLA(155, 72%, 42%, 1.00)',
      borderColor: 'HSLA(155, 72%, 42%, 1.00)',

      '&:hover': {
        color: 'HSLA(155, 72%, 35%, 1.00)',
        borderColor: 'HSLA(155, 72%, 38%, 1.00)',
      },
    },
  },
};

export default jss.createStyleSheet(styles).attach().classes;
