import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
 
function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
 
  const fetchEmployees = async () => {
    const res = await api.get('/employees');
    setEmployees(res.data);
  };
 
  useEffect(() => { fetchEmployees(); }, []);
 
  const handleDelete = async (id) => {
    if (window.confirm('Delete this employee?')) {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    }
  };
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
 
  return (
    <div className="container">
      <div className="header-row">
        <h2>Employee Management System</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Link to="/employees/add"><button>+ Add Employee</button></Link>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Position</th>
            <th>Department</th><th>Salary</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>
                <Link to={`/employees/edit/${emp._id}`}>Edit</Link>{' | '}
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default EmployeeList;
