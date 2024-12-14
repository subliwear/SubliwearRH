const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    default: '',
  },
  startDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['actif', 'inactif'],
    default: 'actif',
  },
  presence: [{
    date: Date,
    status: {
      type: String,
      enum: ['présent', 'absent', 'congé', 'maladie'],
    },
    note: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Employee', employeeSchema); 