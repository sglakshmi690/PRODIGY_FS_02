import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={
          <ProtectedRoute><EmployeeList /></ProtectedRoute>
        } />
        <Route path="/employees/add" element={
          <ProtectedRoute><EmployeeForm /></ProtectedRoute>
        } />
        <Route path="/employees/edit/:id" element={
          <ProtectedRoute><EmployeeForm /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
