import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ui from '../../store/ui/actions';
import PublicHomeHero from '../../components/PublicHomeHero';

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ui }, dispatch);
}

// Connect component to store
export default connect(
  null,
  mapDispatchToProps,
)(PublicHomeHero);
