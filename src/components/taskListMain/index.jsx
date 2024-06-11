import { faSpinner, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import './TaskList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';

const Schema = Yup.object({
  task : 
  Yup.string()
  .required('Vui lòng nhập task')
  .max(30, 'Vui lòng nhập tên task nhỏ hơn 30 kí tự')
  // priority: Yup.string()
  // .required('Vui lòng chọn mức độ ưu tiên')
  // .oneOf(['High', 'Medium', 'Low'], 'Độ ưu tiên không hợp lệ')
})

// function AddLists() {
//   return (
//     <Formik
//     validationSchema={Schema}
//     initialValues={{task : ''}}
//     // onSubmit={() =>{
//     //   toast('Thêm task thành công')
//     // }}
//     >
//       <div className='contain-add-list'> 
//         <div className="header">
//             <h2>Add Tasks</h2>
//             <button>X</button>
//         </div>
//         <p>Task</p>
//         <Form>
//         <Field name='task' className="input-add-task" placeholder="Type your task here..." />
//         <ErrorMessage name="task" component="div" className="error-message" />
//         </Form>
//         <p>Priority</p>
//         <div className="priority-btn">
//           <button className='high'>High</button>
//           <button className='medium'>Medium</button>
//           <button className='low'>Low</button>
//         </div>
//         <button type= "submit" className='addBtn'> Add</button>
//       </div>
//     </Formik>
//   )
// }

function DisplayTask() {
  const [ task, getTask ] = useState('')
  const [ tasks, getTasks ] = useState([])
  
  const handleSubmit = () => {
    getTasks(prev => [...prev, task])
    getTask('')
  }
  return (
    <div className="container">
      <div className="container-task">
        <div className="header">
          <h2>Task List</h2>
          <button> + Add Task</button>
        </div>
        <ul>
          {tasks.map( (task, index) => (
            <li key={index}>
              <div className="Task column">Task <span>{task}</span></div>
              <div className="Priority">Priority</div>
              <div className="Status">Status</div>
              <div className="Icon">
              <FontAwesomeIcon icon={faSpinner} />
              <FontAwesomeIcon icon={faWrench} />
              <FontAwesomeIcon icon={faTrash} />
              </div>
          </li>
          ))}
        </ul>
      </div>
      <Formik
        validationSchema={Schema}
        initialValues={{task : ''}}
      >
      <div className='contain-add-list'> 
        <div className="header">
            <h2>Add Tasks</h2>
            <button>x</button>
        </div>
        <p>Task</p>
        <Form>
          <Field
          name='task'
          value={task}
          className="input-add-task"
          placeholder="Type your task here..."
          onChange = {(e) => getTask(e.target.value)} 
          />
          <ErrorMessage name="task" component="div" className="error-message" />
        </Form>
        <p>Priority</p>
        <div className="priority-btn">
          <button className='high'>High</button>
          <button className='medium'>Medium</button>
          <button className='low'>Low</button>
        </div>
        <button className='addBtn' onClick={handleSubmit}> Add</button>
        </div>
      </Formik>
    </div>
  )
}

export default DisplayTask