import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchEmployeeThunk, editEmployeeThunk } from '../../store/thunks';

class EditEmployeeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      department: "",
      redirect: false,
      redirectId: null,
      error: ""
    };
  }

  componentDidMount() {
    //getting employee ID from url
    this.props.fetchEmployee(this.props.match.params.id);
    this.setState({
      firstname: this.props.employee.firstname,
      lastname: this.props.employee.lastname,
      department: this.props.employee.department,
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    //implementing form validation
    if (this.state.firstname === "" || this.state.lastname === "") {
      this.setState({ error: "Error: first and last name cannot be empty" });
      return;
    } else if (this.state.department === "") {
      this.setState({ error: "Error: department field cannot be empty" });
      return;
    }

    //get new info for employee from form input
    let employee = {
      id: this.props.employee.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      department: this.state.department,
    };

    this.props.editEmployee(employee)
      .then(() => {
        // Update component state with new employee data
        this.setState({
          firstname: employee.firstname,
          lastname: employee.lastname,
          department: employee.department,
          redirect: true,
          redirectId: employee.id
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
    let { employee } = this.props;

    //go to single employee view of the edited employee
    if (this.state.redirect) {
      return (<Redirect to={`/employees/${this.state.redirectId}`} />)
    }

    return (
      <div class="editEmployeeCcontainerParent">
        <div class="editEmployeeCcontainer">
          <form style={{ textAlign: 'center' }} onSubmit={(e) => this.handleSubmit(e)}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>First name: </label>
            <input type="text" name="firstname" value={this.state.firstname || ''} placeholder={employee.fristname} onChange={(e) => this.handleChange(e)} />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last name: </label>
            <input type="text" name="lastname" value={this.state.lastname || ''} placeholder={employee.lastname} onChange={(e) => this.handleChange(e)} />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Department: </label>
            <input type="text" name="department" value={this.state.department || ''} placeholder={employee.department} onChange={(e) => this.handleChange(e)} />
            <br />

            <button type="submit">
              Submit
            </button>

          </form>
          {this.state.error !== "" && <p>{this.state.error}</p>}
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
    employee: state.employee,
  };
};

const mapDispatch = (dispatch) => {
  return ({
    editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
    fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
  })
}

export default connect(mapState, mapDispatch)(EditEmployeeContainer);