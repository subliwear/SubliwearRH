import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Avatar,
  Chip,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  BeachAccess as VacationIcon,
  LocalHospital as SickIcon,
} from '@mui/icons-material';

const statusIcons = {
  présent: <PresentIcon sx={{ color: '#4caf50' }} />,
  absent: <AbsentIcon sx={{ color: '#f44336' }} />,
  congé: <VacationIcon sx={{ color: '#ff9800' }} />,
  maladie: <SickIcon sx={{ color: '#2196f3' }} />,
};

const statusColors = {
  présent: '#4caf50',
  absent: '#f44336',
  congé: '#ff9800',
  maladie: '#2196f3',
};

function EmployeeAttendanceCard({ employee, onStatusChange }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={employee.photoUrl}
            alt={`${employee.firstName} ${employee.lastName}`}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">
              {employee.firstName} {employee.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {employee.position}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {Object.entries(statusIcons).map(([status, icon]) => (
            <IconButton
              key={status}
              onClick={() => onStatusChange(employee.id, status)}
              sx={{
                p: 1,
                backgroundColor:
                  employee.status === status
                    ? `${statusColors[status]}20`
                    : 'transparent',
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>
        {employee.status && (
          <Chip
            label={employee.status}
            size="small"
            sx={{
              mt: 1,
              backgroundColor: `${statusColors[employee.status]}20`,
              color: statusColors[employee.status],
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

function Attendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [department, setDepartment] = useState('all');

  // Données de test
  const employees = [
    {
      id: 1,
      firstName: 'Jean',
      lastName: 'Dupont',
      position: 'Développeur',
      department: 'IT',
      status: 'présent',
    },
    {
      id: 2,
      firstName: 'Marie',
      lastName: 'Martin',
      position: 'RH Manager',
      department: 'Ressources Humaines',
      status: 'congé',
    },
    // Ajoutez plus d'employés ici
  ];

  const handleStatusChange = (employeeId, newStatus) => {
    // À implémenter : Mise à jour du statut dans la base de données
    console.log(`Status changed for employee ${employeeId} to ${newStatus}`);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pointage
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel shrink>Date</InputLabel>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                style={{
                  width: '100%',
                  padding: '16.5px 14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Département</InputLabel>
              <Select value={department} onChange={handleDepartmentChange}>
                <MenuItem value="all">Tous les départements</MenuItem>
                <MenuItem value="it">IT</MenuItem>
                <MenuItem value="rh">Ressources Humaines</MenuItem>
                {/* Ajoutez plus de départements ici */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth>
              Valider le pointage
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item key={employee.id} xs={12} sm={6} md={4}>
            <EmployeeAttendanceCard
              employee={employee}
              onStatusChange={handleStatusChange}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Attendance; 