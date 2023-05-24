import { Link } from 'react-router-dom';

const NewTaskView = (props) => {
  const { handleChange, handleSubmit, error } = props;

  return (
    <div className="root">
      <div className="formContainer">
        <div className="formdescription">
          <h2 style={{ fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e' }}>
            New Task
          </h2>
        </div>
        <form style={{ textAlign: 'center' }} onSubmit={(e) => handleSubmit(e)}>
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Description: </label>
          <input type="text" name="description" onChange={(e) => handleChange(e)} />
          <br />
          <br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Priority: </label>
          {/* <input type="text" name="priority" onChange={(e) => handleChange(e)} /> */}
          <select name="priority" onChange={(e) => handleChange(e)}>
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
          <br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Employee Id: </label>
          <input type="text" name="employeeId" onChange={(e) => handleChange(e)} />
          <br />
          <br />

          <button type="submit">
            Submit
          </button>
          <br />
          <br />

          <Link to={`/`}>Home</Link>
        </form>
        {error !== "" && <p>{error}</p>}
      </div>
    </div>

  )
}

export default NewTaskView;