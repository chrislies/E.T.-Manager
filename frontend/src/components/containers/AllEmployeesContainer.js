import { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchAllEmployeesThunk,
  // deleteEmployeesThunk
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
        // deleteEmployees={this.props.deleteEmployees}
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
    // deleteEmployees: (taskId) => dispatch(deleteEmployeesThunk(taskId)),
  };
};

export default connect(mapState, mapDispatch)(AllEmployeesContainer);
//---------------------------------------------------------------------------
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllEmployeesThunk } from "../../store/thunks";
// import { AllEmployeesView } from "../views";

// function AllEmployeesContainer() {
//   const allEmployees = useSelector((state) => state.allEmployees);
//   const dispatch = useDispatch();

//   //replaces componentDidMount
//   useEffect(() => {
//     dispatch(fetchAllEmployeesThunk());
//   }, [dispatch]);

//   return <AllEmployeesView allEmployees={allEmployees} />;
// }

// export default AllEmployeesContainer;
