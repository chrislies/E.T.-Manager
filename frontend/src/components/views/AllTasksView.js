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
            <div key={task.id} style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 15 }}>
              <Link to={`/task/${task.id}`}>
                <h1 class="tasks" style={{ margin: 0, marginRight: 15 }}>{description}</h1>
              </Link>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
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