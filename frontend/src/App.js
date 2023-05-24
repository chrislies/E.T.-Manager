import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  EmployeeContainer,
  TaskContainer,
  AllEmployeesContainer,
  AllTasksContainer,
  NewTaskContainer,
  EditTaskContainer,
  NewEmployeeContainer
} from './components/containers';

// if you create separate components for adding/editing 
// a student or instructor, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/employees" component={AllEmployeesContainer} />
        <Route exact path="/newEmployee" component={NewEmployeeContainer} />
        <Route exact path="/employees/:id" component={EmployeeContainer} />
        <Route exact path="/tasks" component={AllTasksContainer} />
        <Route exact path="/newTask" component={NewTaskContainer} />
        <Route exact path="/task/:id" component={TaskContainer} />
        <Route exact path="/editTask/:id" component={EditTaskContainer} />
      </Switch>
    </div>
  );
}

export default App;

