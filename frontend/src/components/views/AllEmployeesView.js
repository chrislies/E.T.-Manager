import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { addEmployee } from "../../store/actions/actionCreators";

const AllEmployeesView = (props) => {
  let { allEmployees, deleteEmployee } = props;
  if (!props.allEmployees.length) {
    return (
      <div>
        There are no employees.
        <Link to={`/newEmployee`}>
          <button>Add Employee</button>
        </Link>
      </div>
    );
  }

  return (
    <div class="allEmployeesViewContainerParent">
      <div class="allEmployeesViewContainer">
        {allEmployees.map((employee) => {
          let name = employee.firstname + " " + employee.lastname;
          return (
            <div class="employeeInfo" key={employee.id}>
              <Link to={`/employees/${employee.id}`}>
                <h2>{name}</h2>
              </Link>
              <p>{employee.department}</p>
              <button class="deleteButton" onClick={() => deleteEmployee(employee.id)}>Delete</button>
            </div>
          );
        })}
        <br />
        <Link to={`/`}>
          <button style={{ marginRight: 15 }}>Home</button>
        </Link>
        <Link to={`/newEmployee`}>
          <button>Add Employee</button>
        </Link>
      </div>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
};

export default AllEmployeesView;