const mongoose = require('mongoose');
 
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  position: {
    type: String,
    required: [true, 'Position is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative']
  },
  dateOfJoining: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });
 
module.exports = mongoose.model('Employee', employeeSchema);
