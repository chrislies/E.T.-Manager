import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk } from '../../store/thunks';

/*
IMPORTANT: comments regarding implementation details!!
=====================================================
You'll see that we have two ways of interacting with the UI
in order to change the task's instructor

The dropdown menu is straighforward, it's pretty much the same 
as having the input field for the instructorId but allows us
to actually see the available insutrctors as well as their names, 
not just their IDs. We did have to connect to the allInstructors state
from the Redux store, as well as fetchAllInstructors in componentDidMount().
This was done so we could get the other instructors in the database.
We filter out the current instructor from the array at the beginning of 
the render function, and use this array to populate the dropdown menu
options. Because it's part of the form, we don't need to modify the 
handleSubmit function. On redirect to the taskView we will see the 
updates.

You will see below the form there is another part of the UI that is
also changing the current task's instructor. This structure is similar
to how changing assigned tasks is done in the InstrutcorView. There is
a slight drawback to using this approach in this context. When we perform
an EDIT_TASK action (initiated by calling the editTaskThunk), this action
is sent to the allTasks reducer, not the task reducer. For that reason, 
we will not see the updates in the single task view unless there is another 
call to the fetchTaskThunk. This is done once when we redirect after form
submission, which is why the data is shown without needing to refresh. 
If we want that same functionality within the container, we need to make
a call to fetchTask after each editTask. We see that in the onClick
functionality of the buttons controlling that portion of the UI. 

*/

class EditTaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      priority: "",
      isComplete: false,
      employeeId: null,
      redirect: false,
      redirectId: null,
      error: ""
    };
  }

  componentDidMount() {
    //Getting task ID from URL
    this.props.fetchTask(this.props.match.params.id);
    this.props.fetchEmployees();
  }

  componentDidUpdate(prevProps) {
    //Check if the task has been updated
    if (prevProps.task !== this.props.task) {
      const { task } = this.props;
      this.setState({
        description: task.description,
        priority: task.priority,
        isComplete: task.isComplete,
        employeeId: task.employeeId
      });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    const newValue = name === 'isComplete' ? value === 'true' : value;

    this.setState({
      [name]: newValue
    });
  }

  handleSelectChange = event => {
    //handle change for the dropdown menu
    //want to set the instructorId based on the selected choice
    //when the form gets submitted, this is how we can change
    //assigned instructor without having to manually enter in the 
    //instructorId like before
    const { value } = event.target;
    const employeeId = value === "unassigned" ? null : value;

    this.setState({ employeeId });
  }

  handleSubmit = event => {
    event.preventDefault();
    //implementing form validation
    if (this.state.description === "") {
      this.setState({ error: "Error: description cannot be empty" });
      return;
    }

    //get new info for task from form input
    let task = {
      id: this.props.task.id,
      description: this.state.description,
      priority: this.state.priority,
      isComplete: this.state.isComplete,
      employeeId: this.state.employeeId
    };

    this.props.editTask(task)
      .then(() => {
        // Update component state with new task data
        this.setState({
          description: task.description,
          priority: task.priority,
          isComplete: task.isComplete,
          employeeId: task.employeeId,
          redirect: true,
          redirectId: task.id
        });
      })
      .catch((error) => {
        // Handle error if necessary
      });
  }

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });

  }

  render() {
    let { task, allEmployees, editTask, fetchTask } = this.props;
    let assignedEmployee = task.employeeId;

    let otherEmployees = allEmployees.filter(employee => employee.id !== assignedEmployee);

    //go to single task view of the edited task
    if (this.state.redirect) {
      return (<Redirect to={`/task/${this.state.redirectId}`} />)
    }

    return (
      <div className="editTaskContainerParent">
        <div className="editTaskContainer">
          <form style={{ textAlign: 'center' }} onSubmit={(e) => this.handleSubmit(e)}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Description: </label>
            <input type="text" name="description" value={this.state.description || ''} placeholder={task.description} onChange={(e) => this.handleChange(e)} />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Priority: </label>
            {/* <input type="text" name="priority" value={this.state.priority || ''} placeholder={task.priority} onChange={(e) => this.handleChange(e)} /> */}
            <select name="priority" value={this.state.priority || ''} onChange={(e) => this.handleChange(e)}>
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Completed? </label>
            <select name="isComplete" value={this.state.isComplete || false} onChange={(e) => this.handleChange(e)}>
              <option value="">Select option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <br />

            <select onChange={(e) => this.handleSelectChange(e)}>
              {task.employee !== null ?
                <option value={task.employeeId}>{task.employee.firstname + " (current)"}</option>
                : <option value="unassigned">Unassigned</option>
              }
              {otherEmployees.map(employee => {
                return (
                  <option value={employee.id} key={employee.id}>{employee.firstname}</option>
                )
              })}
              {task.employee !== null && <option value="unassigned">Unassigned</option>}
            </select>

            <button type="submit">
              Submit
            </button>

          </form>
          {this.state.error !== "" && <p>{this.state.error}</p>}

          {task.employeeId !== null ?
            <div> {`Current employee: `}
              <Link to={`/employees/${task.employeeId}`}>{task.employee.firstname}</Link> {``}
              <button onClick={async () => { await editTask({ id: task.id, employeeId: null }); fetchTask(task.id) }}>Unassign</button>
            </div>
            : <div> No employee currently assigned </div>
          }

          <div> Other employees
            {otherEmployees.map(employee => {
              return (
                <div class="assignEmployee" key={employee.id}>
                  <Link to={`/employees/${employee.id}`}>
                    <h4>{employee.firstname}</h4>
                  </Link>
                  {/* <button onClick={async () => { await editTask({ id: task.id, employeeId: employee.id }); fetchTask(task.id) }}>Assign this employee</button> */}
                  <button onClick={async () => { await editTask({ id: task.id, employeeId: employee.id }); fetchTask(task.id) }}>Assign this employee</button>
                </div>
              )
            })
            }
          </div>
          <div>
            <Link to={`/`}>Home</Link>
          </div>

        </div>
      </div>
    )
  }
}

// map state to props
const mapState = (state) => {
  return {
    task: state.task,
    allEmployees: state.allEmployees
  };
};

const mapDispatch = (dispatch) => {
  return ({
    editTask: (task) => dispatch(editTaskThunk(task)),
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
    fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),

  })
}

export default connect(mapState, mapDispatch)(EditTaskContainer);