import jss from 'jss';
import { appNavWidth } from '../../constants/styles';

const styles = {
  menu: {
    position: 'fixed',
    zIndex: 1,
    height: '100vh',

    '&.ui.vertical.menu': {
      width: appNavWidth,
      borderTop: 'none',
      borderRight: '1px solid #eee',
      borderBottom: 'none',
      borderLeft: 'none',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
};

export default jss.createStyleSheet(styles).attach().classes;
