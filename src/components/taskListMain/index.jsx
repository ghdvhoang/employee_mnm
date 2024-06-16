import { faSpinner, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import data from '../../data.json';
import './TaskList.css'

function DisplayTask() {
  const [ task, setTask ] = useState('')
  const [ tasks, getTasks ] = useState([])
  const [ formAdd, setFormAdd] = useState(false)
  const [ priority, setPriority ] = useState('Medium')
  const [ isEditing, setIsEditing ] = useState(false)
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    getTasks(data)
  }, [])

  
  
  const handleSubmit = () => {
    if(isEditing) {
      const updatedTasks = tasks.map(t =>
        t.id === editingTask.id ? { ...t, name: task, priority: priority } : t
      );
      getTasks(updatedTasks);
      setEditingTask(null);
      setIsEditing(false);
    }
    else {
      getTasks(prev => [...prev, { id: Date.now(), name: task, priority: priority} ])
    }
    setTask('')
    setFormAdd(false)
    setPriority('Medium')
  }
  const handleEditClick = (task) => {
    setFormAdd(true)
    setIsEditing(true)
    setEditingTask(task)
    setTask(task.name)
    setPriority(task.priority)
  }
  const handlePriorityClick = (newPriority) => {
    setPriority(newPriority)
  }
  const handleAddClick = () => {
    setFormAdd(true)
  }
  // 1

  const handleDelete = (id) => {
    // getTasks(prevTasks => prevTasks.filter((_, i) => i!== index ))
    getTasks(prevTasks => prevTasks.filter(tasks => tasks.id !== id))
  }

  return (
    <div className="container">
      <div className="container-task">
        <div className="header">
          <h2>Task List</h2>
          <button className='addButton' onClick={ handleAddClick }> 
            + Add Task
          </button>
        </div>
        <ul>
          {tasks.map( (task) => (
            <li key={ task.id }>
              <div className="Task column"> 
                <b>Task</b> 
                <span>{task.name}</span>
              </div>
              <div className="Priority column ">
                <b>Priority</b> 
                <span className='priority-text'
                  style={{ color: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'gold' : 'green' }}>
                    {task.priority}
                </span>
              </div>
              <div className="Status">
                <span></span>
              </div>
              <div className="Icon">
                <FontAwesomeIcon icon={faSpinner} />
                <button
                  className='edit-btn '
                  onClick={ () => handleEditClick(task)}
                > 
                  <FontAwesomeIcon icon={faWrench} />
                </button>
                <button
                  className='delete-btn '
                  onClick={ () => handleDelete(task.id) }
                  > 
                    <FontAwesomeIcon icon={faTrash} /> 
                </button>
              </div>
          </li>
          ))}
        </ul>
        <button className='DELETE-ALL' onClick={ () => getTasks([])}> DELETE ALL </button>
      </div>
  {formAdd &&
    <div className="addF-wrapper">
      <div className='contain-add-list'> 
        <div className="header">
            <h2> { isEditing ? 'Edit Task' : 'Add Task' }</h2>
            <button onClick={ () => setFormAdd(false) }>x</button>
        </div>
        <span className='Task-title'>Task</span>
          <input
          value={task}
          className="input-add-task"
          placeholder="Type your task here..."
          onChange = {(event) => setTask(event.target.value)} 
          />
          <span className='Priority-title'>Priority</span>
        <div className="priority-btn">
          <button 
            className={ priority === 'High' ? 'high active' : 'high' } 
            onClick={ () => handlePriorityClick('High')}
            >
              High
          </button>
          <button 
            className={ priority === 'Medium' ? 'medium active' : 'medium' } 
            onClick={ () => handlePriorityClick('Medium')}>
              Medium
          </button>
          <button 
            className={ priority === 'Low' ? 'low active' : 'low' } 
            onClick={ () => handlePriorityClick('Low')}>
              Low
          </button>
        </div>
        <button className='addBtn' onClick={handleSubmit}> { isEditing ? 'Edit' : 'Add' }</button>
      </div>
    </div>
  }
    </div>
  )
}

export default DisplayTask