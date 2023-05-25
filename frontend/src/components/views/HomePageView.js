import { Link } from 'react-router-dom';

const HomePageView = () => {
  return (
    <div className="homePageViewContainerParent">
      <div className="homePageViewContainer">
        <h1 className="appHeader">E.T. Manager</h1>
        <Link to={'/employees'}><button>All Employees</button></Link>
        <Link to={'/tasks'}><button>All Tasks</button></Link>
      </div>
    </div>
  );
}

export default HomePageView;
