import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
 
function EmployeeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
 
  const [form, setForm] = useState({
    name: '', email: '', phone: '', position: '', department: '', salary: ''
  });
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    if (isEdit) {
      api.get(`/employees/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);
 
  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.phone) newErrors.phone = 'Phone is required';
    if (!form.position) newErrors.position = 'Position is required';
    if (!form.department) newErrors.department = 'Department is required';
    if (!form.salary || isNaN(form.salary)) newErrors.salary = 'Valid salary required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (isEdit) {
        await api.put(`/employees/${id}`, form);
      } else {
        await api.post('/employees', form);
      }
      navigate('/employees');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };
 
  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit' : 'Add'} Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <input name="position" placeholder="Position" value={form.position} onChange={handleChange} />
        {errors.position && <p className="error">{errors.position}</p>}
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        {errors.department && <p className="error">{errors.department}</p>}
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />
        {errors.salary && <p className="error">{errors.salary}</p>}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
 
export default EmployeeForm;
