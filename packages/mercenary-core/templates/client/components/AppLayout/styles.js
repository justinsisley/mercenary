import { StyleSheet } from 'aphrodite-jss';
import { navMenuWidth } from '../../constants/styles';

const contentSidePadding = 20;

const styles = {
  content: {
    position: 'fixed',
    top: 0,
    paddingTop: 10,
    paddingRight: contentSidePadding,
    paddingBottom: 50,
    paddingLeft: navMenuWidth + contentSidePadding,
    width: '100%',
    height: '100vh',
    overflow: 'scroll',
  },
};

export default StyleSheet.create(styles);
