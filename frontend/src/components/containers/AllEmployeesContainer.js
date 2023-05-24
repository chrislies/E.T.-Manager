import { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchAllEmployeesThunk,
  deleteEmployeeThunk
} from '../../store/thunks';

import AllEmployeesView from '../views/AllEmployeesView';

class AllEmployeesContainer extends Component {
  componentDidMount() {
    this.props.fetchAllEmployees();
  }
  render() {
    return (
      <div>
        <AllEmployeesView
          allEmployees={this.props.allEmployees}
          deleteEmployee={this.props.deleteEmployee}
        />
      </div>
    )
  }
}

// Map state to props;
const mapState = (state) => {
  return {
    allEmployees: state.allEmployees,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    fetchAllEmployees: () => dispatch(fetchAllEmployeesThunk()),
    deleteEmployee: (employeeId) => dispatch(deleteEmployeeThunk(employeeId)),
  };
};

export default connect(mapState, mapDispatch)(AllEmployeesContainer);
