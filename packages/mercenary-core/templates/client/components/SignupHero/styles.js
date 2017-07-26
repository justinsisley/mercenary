import jss from '../../utils/jss';

const styles = {
  hero: {
    padding: '1em 0em',
    height: 'calc(100vh - 175px)',
    minHeight: 700,
  },
};

export default jss.createStyleSheet(styles).attach().classes;
