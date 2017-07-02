import { StyleSheet } from 'aphrodite-jss';
import { navMenuWidth } from '../../constants/styles';

const styles = {
  menu: {
    position: 'fixed',
    zIndex: 1,
    height: '100vh',

    '&.ui.vertical.menu': {
      width: navMenuWidth,
      borderTop: 'none',
      borderRight: '1px solid #eee',
      borderBottom: 'none',
      borderLeft: 'none',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
};

export default StyleSheet.create(styles);
