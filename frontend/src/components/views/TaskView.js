import { Link } from "react-router-dom";

const TaskView = (props) => {
  const { task } = props;
  return (
    <div class="taskViewContainerParent">
      <div class="taskViewContainer">
        <h1>{task.description}</h1>
        <h3>Task Priority: {task.priority}</h3>
        <div style={{ backgroundColor: task.isComplete ? "#43e06b" : "#e02222" }}>
          {task.isComplete ? <h3>Completed</h3> : <h3>Incomplete</h3>}
        </div>
        {task.employee ? <Link to={`/employees/${task.employeeId}`}><h3 class="employeeInfo">{task.employee.firstname + " " + task.employee.lastname}</h3></Link> : <h3>Unassigned</h3>}
        <Link to={`/editTask/${task.id}`}>Edit task information</Link>
        <br />
        <Link to={`/tasks`}>View all tasks</Link>
        <br />
        <Link to={`/`}>Home</Link>
      </div>
    </div>
  );

};

export default TaskView;