import { StyleSheet } from 'aphrodite-jss';

const styles = {
  menu: {
    position: 'fixed',
    zIndex: 1,
    height: '100vh',

    '&.ui.vertical.menu': {
      borderTop: 'none',
      borderRight: '1px solid #ddd',
      borderBottom: 'none',
      borderLeft: 'none',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
};

export default StyleSheet.create(styles);
