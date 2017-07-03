import { connect } from 'react-redux';
import PublicNav from '../../components/PublicNav';

// Map application state to component props
function mapStateToProps(state) {
  return {
    showPublicStickyNav: state.ui.showPublicStickyNav,
  };
}

// Connect component to store
export default connect(
  mapStateToProps,
)(PublicNav);
