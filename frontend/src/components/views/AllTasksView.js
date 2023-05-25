import { Link } from "react-router-dom";

const AllTasksView = (props) => {
  let { tasks, deleteTask } = props;
  if (!tasks.length) {
    return (
      <div>
        <p>There are no tasks.</p>
        <Link to={`/newTask`}>
          <button>Add New Task</button>
        </Link>
      </div>
    );
  }

  return (
    <div class="allTasksViewContainerParent">
      <div class="allTasksViewContainer">
        {tasks.map((task) => {
          let description = task.description;
          return (
            <div class="allTaskViewContents" key={task.id} style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 15 }}>
              <p className="completionStatusText" style={{ backgroundColor: task.isComplete ? "#43e06b" : "#e02222" }}>
                {task.isComplete ? "Completed" : "Incomplete"}
              </p>
              <Link to={`/task/${task.id}`}>
                <h1 class="tasks" style={{ margin: 0, marginLeft: 15, marginRight: 15 }}>{description}</h1>
              </Link>
              <button class="deleteButton" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          );
        }
        )}
        <Link to={`/newTask`}>
          <button style={{ marginRight: 15 }}>Add New Task</button>
        </Link>
        <Link to={`/`}>
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};


export default AllTasksView;