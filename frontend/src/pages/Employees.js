import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const departments = [
  'Direction',
  'Ressources Humaines',
  'Comptabilité',
  'Production',
  'Commercial',
  'IT',
];

function EmployeeDialog({ open, handleClose, employee = {} }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {employee.id ? 'Modifier un employé' : 'Ajouter un employé'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prénom"
                defaultValue={employee.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom"
                defaultValue={employee.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={employee.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Poste"
                defaultValue={employee.position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Département"
                defaultValue={employee.department || departments[0]}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date de début"
                defaultValue={employee.startDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button variant="contained" onClick={handleClose}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EmployeeCard({ employee }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={employee.photoUrl || 'https://via.placeholder.com/200'}
        alt={`${employee.firstName} ${employee.lastName}`}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {employee.firstName} {employee.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {employee.position}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {employee.department}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

function Employees() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Données de test
  const employees = [
    {
      id: 1,
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      position: 'Développeur',
      department: 'IT',
      startDate: '2023-01-15',
    },
    // Ajoutez plus d'employés ici
  ];

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setDialogOpen(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Employés</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
        >
          Ajouter un employé
        </Button>
      </Box>

      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item key={employee.id} xs={12} sm={6} md={4}>
            <EmployeeCard employee={employee} />
          </Grid>
        ))}
      </Grid>

      <EmployeeDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        employee={selectedEmployee}
      />
    </Box>
  );
}

export default Employees; 