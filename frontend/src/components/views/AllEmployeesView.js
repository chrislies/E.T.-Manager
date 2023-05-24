import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { addEmployee } from "../../store/actions/actionCreators";

const AllEmployeesView = (props) => {
  let { deleteEmployee } = props;
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
    <div>
      {props.allEmployees.map((employee) => {
        let name = employee.firstname + " " + employee.lastname;
        return (
          <div key={employee.id} style={{ marginTop: 15 }}>
            <Link to={`/employees/${employee.id}`}>
              <h1 style={{ margin: 0, marginRight: 15 }}>{name}</h1>
            </Link>
            <p style={{ margin: 0, marginRight: 15 }}>{employee.department}</p>
            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
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
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
};

export default AllEmployeesView;