import { Link } from "react-router-dom";

const EmployeeView = (props) => {
  const { employee, editTask, allTasks } = props;
  let assignedTasks = allTasks.filter(task => task.employeeId === employee.id);
  let availableTasks = allTasks.filter(task => task.employeeId !== employee.id);

  return (
    <div>
      <div class="employeeInfo">
        <h1>{`${employee.firstname} ${employee.lastname}`}</h1>
        <h3>{employee.department}</h3>
      </div>
      <Link to={`/editEmployee/${employee.id}`}>
        <button>Edit Employee Info</button>
      </Link>
      <br />
      <Link to={`/`}>
        <button>Home</button>
      </Link>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <div>Assigned tasks:
          {assignedTasks.map(task => {
            return (
              <div class="tasks" key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4 class="taskText">{task.description}</h4>
                </Link>
                <button onClick={() => editTask({ id: task.id, employeeId: null })}>x</button>
              </div>
            );
          })}</div>
        <div>Available tasks:
          {availableTasks.map(task => {
            return (
              <div class="tasks" key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4 class="taskText">{task.description}</h4>
                </Link>
                <button onClick={() => editTask({ id: task.id, employeeId: employee.id })}>+</button>
              </div>
            );
          })}</div>
      </div>
    </div>
  );
};

export default EmployeeView;