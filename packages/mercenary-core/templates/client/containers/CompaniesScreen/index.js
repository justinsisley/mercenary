import { connect } from 'react-redux';
import CompaniesScreen from '../../screens/CompaniesScreen';

// Map application state to component props
function mapStateToProps(state) {
  return {
    companies: state.entities.companies,
  };
}

// Connect component to store
export default connect(
  mapStateToProps,
)(CompaniesScreen);
