import { faSpinner, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import './TaskList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import data from '../../data.json';



function DisplayTask() {
  const [ task, setTask ] = useState('')
  const [ tasks, getTasks ] = useState([data])
  const [ formAdd, setFormAdd] = useState(false)

  useEffect(() => {
    getTasks(data)
  }, [])

  const handleSubmit = () => {
    getTasks(prev => [...prev, { name: task}])
    setTask('')
    setFormAdd(false)
  }
  const handleAddClick = () => {
    setFormAdd(true)
  }

  const Schema = Yup.object({
    taska: 
    Yup.string()
    .required('Hãy nhập tasks')
    .min(10, 'Vui lòng nhập tên task nhỏ hơn 30 kí tự'),
  })
  return (
    <div className="container">
      <div className="container-task">
        <div className="header">
          <h2>Task List</h2>
          <button onClick={ handleAddClick }> + Add Task</button>
        </div>
        <ul>
          {tasks.map( (task) => (
            <li key={ task.id }>
              <div className="Task column"> <b>Task</b> <span>{task.name}</span></div>
              <div className="Priority column"> <b>Priority</b> <span>{task.priority}</span> </div>
              <div className="Status"><span>{task.status}</span></div>
              <div className="Icon">
              <FontAwesomeIcon icon={faSpinner} />
              <FontAwesomeIcon icon={faWrench} />
              <FontAwesomeIcon icon={faTrash} />
              </div>
          </li>
          ))}
        </ul>
        <button className='DELETE-ALL' onClick={ () => getTasks([])}> DELETE ALL </button>
      </div>
  {formAdd && 
    <Formik
        validationSchema={Schema}
        initialValues={{ taska: '' }}
        onSubmit={handleSubmit}
      >
      <div className='contain-add-list'> 
        <div className="header">
            <h2>Add Tasks</h2>
            <button onClick={ () => setFormAdd(false) }>x</button>
        </div>

        <p>Task</p>
        
        <Form>
          <Field
          name='taska'
          value={task}
          className="input-add-task"
          placeholder="Type your task here..."
          onChange = {(event) => setTask(event.target.value)} 
          />
          <ErrorMessage name="taska" component="div" className="error-message" />
          <p>Priority</p>
        <div className="priority-btn">
          <button className='high'>High</button>
          <button className='medium'>Medium</button>
          <button className='low'>Low</button>
        </div>
        <button className='addBtn' onClick={handleSubmit}> Add</button>
        </Form>
      </div>
    </Formik>
  }
    </div>
  )
}

export default DisplayTask