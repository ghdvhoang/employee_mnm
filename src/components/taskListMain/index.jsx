import { faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import data from '../../data.json';
import './TaskList.css'

function Employees_info() {
  const [ employee, getEmployee ] = useState({ name: '', email: '', address: '', number: '' })
  const [ employees, setEmployees ] = useState([])
  const [ formAdd, setFormAdd] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)
  const [ editingEmployee, setEditingEmployee ] = useState(null)
  const [ error, setError ] = useState('')

  useEffect(() => {
    setEmployees(data)
  }, [])

  const handleSubmit = () => {
    if (!employee.name || !employee.email || !employee.address || !employee.number  || employee.length > 100) {
      setError("Please fill in all fields.");
      return;
    }

    if( !employee || employee.length > 100){
      setError(" Ko cho nhập haha ")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9}$/; 
    if (!emailRegex.test(employee.email)) {
      setError("Email không hợp lệ");
      return;
    }
    if (!phoneRegex.test(employee.number)) {
      setError("Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số");
      return;
    }
    setError('')
    if(isEditing) {
      const updatedEmployees = employees.map(emp =>
        emp.id === editingEmployee.id ? {
          ...emp,
          name: employee.name,
          email: employee.email,
          address: employee.address, 
          number: employee.number
        } : emp
      );
      setEmployees(updatedEmployees)
      handleCloseForm();
    }
    else {
      setEmployees(prev => [...prev, {
        id: Date.now(),
        name: employee.name,
        email: employee.email,
        address: employee.address,
        number: employee.number 
      }])
      handleCloseForm();
    }
  }
  const handleEditClick = (emp) => {
    setEditingEmployee(emp) 
    setIsEditing(true)
    getEmployee(emp)
    setFormAdd(true)
  }
  const handleAddClick = () => {
    setFormAdd(true)
    console.log(formAdd);
  }

  const handleDelete = (id) => {
    setEmployees(prevEmployees => prevEmployees.filter(employees => employees.id !== id))
  }
  const handleInputChange = (event) => {
    const {name, value} = event.target
    getEmployee(prev => ({...prev, [name]: value}))
  }
  const handleCloseForm = () => {
    setFormAdd(false)
    setIsEditing(false)
    setEditingEmployee(null)
    getEmployee('')
  }

  return (
    <div className="container">
      <div className="container-task">
        <div className="header">
          <h1>Manage <b>Employees</b></h1>
          <div className="button-wrap">
            <button className='DELETE-ALL' onClick={ () => setEmployees([])}> Delete all </button>
            <button className='addButton' onClick={ handleAddClick }> 
              Add new employees
            </button>
          </div>
        </div>
        <div className="employee-Data"></div>
        <table className="employee-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td><input type="checkbox" /></td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td> 
                <td>{employee.number}</td> 
                <td>
                  <button className='edit-btn' onClick={() => handleEditClick(employee)}>
                    <FontAwesomeIcon icon={faWrench} />
                  </button>
                  <button className='delete-btn' onClick={() => handleDelete(employee.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formAdd &&
        <div className="addF-wrapper">
          <div className='contain-add-list'> 
            <div className="header-formAddEdit">
                <h1> { isEditing ? 'Edit Task' : 'Add Task' }</h1>
                <button 
                  className='closeAddEditForm'
                  onClick={ handleCloseForm }
                >
                    x
                </button>
            </div>
            <div className="employees_data column">
              <div className="input-name column">
                <span className='Task-title'>Name</span>
                <input
                  name='name'
                  value={employee.name || ''}
                  className="input-add-task"
                  placeholder="Type your name here..."
                  onChange = {handleInputChange}
                />
              </div>
              <div className="input-name column">
                <span className='Task-title'>Email</span>
                <input
                name='email'
                value={employee.email || ''}
                className="input-add-task"
                placeholder="Type your email here..."
                onChange = {handleInputChange} 
              />
              </div>
              <div className="input-name column">
                <span className='Task-title'>Address</span>
                <input
                  name='address'
                  value={employee.address || ''}
                  className="input-add-task"
                  placeholder="Type your address here..."
                  onChange = {handleInputChange}
                />
              </div>
              <div className="input-name column">
                <span className='Task-title'>Phone Number</span>
                <input
                  name='number'
                  value={employee.number || ''}
                  className="input-add-task"
                  placeholder="Type your phone here..."
                  onChange = {handleInputChange}
                />
              </div>
            </div>
            {!!error && <span style= {{ color: 'red' }}>{ error } </span>}
            <button className='addBtn' onClick={handleSubmit}> { isEditing ? 'Save' : 'Add' }</button>
          </div>
        </div>
      }
      <footer>
      </footer>
    </div>
  )
}

export default Employees_info




