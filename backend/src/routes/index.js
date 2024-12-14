const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const employeeRoutes = require('./employee.routes');
const attendanceRoutes = require('./attendance.routes');
const planningRoutes = require('./planning.routes');

router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/planning', planningRoutes);

module.exports = router; 