import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  FileDownload as ExportIcon,
} from '@mui/icons-material';

const timeSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const weekDays = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
];

function ShiftDialog({ open, handleClose, shift = {} }) {
  const [employee, setEmployee] = useState(shift.employee || '');
  const [day, setDay] = useState(shift.day || 'Lundi');
  const [startTime, setStartTime] = useState(shift.startTime || '09:00');
  const [endTime, setEndTime] = useState(shift.endTime || '17:00');

  const handleSubmit = () => {
    // À implémenter : Enregistrement du shift
    console.log({ employee, day, startTime, endTime });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {shift.id ? 'Modifier un horaire' : 'Ajouter un horaire'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Employé"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
              >
                <MenuItem value="1">Jean Dupont</MenuItem>
                <MenuItem value="2">Marie Martin</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Jour"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                {weekDays.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Heure de début"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Heure de fin"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Planning() {
  const [department, setDepartment] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  // Données de test
  const shifts = [
    {
      id: 1,
      employee: 'Jean Dupont',
      department: 'IT',
      day: 'Lundi',
      startTime: '09:00',
      endTime: '17:00',
    },
    {
      id: 2,
      employee: 'Marie Martin',
      department: 'RH',
      day: 'Mardi',
      startTime: '08:00',
      endTime: '16:00',
    },
  ];

  const handleAddShift = () => {
    setSelectedShift(null);
    setDialogOpen(true);
  };

  const handleEditShift = (shift) => {
    setSelectedShift(shift);
    setDialogOpen(true);
  };

  const handleExport = () => {
    // À implémenter : Export du planning
    console.log('Exporting planning...');
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Planning</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ExportIcon />}
            onClick={handleExport}
            sx={{ mr: 2 }}
          >
            Exporter
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddShift}
          >
            Ajouter un horaire
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Département</InputLabel>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="all">Tous les départements</MenuItem>
                <MenuItem value="it">IT</MenuItem>
                <MenuItem value="rh">Ressources Humaines</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employé</TableCell>
              <TableCell>Département</TableCell>
              <TableCell>Jour</TableCell>
              <TableCell>Début</TableCell>
              <TableCell>Fin</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell>{shift.employee}</TableCell>
                <TableCell>{shift.department}</TableCell>
                <TableCell>{shift.day}</TableCell>
                <TableCell>{shift.startTime}</TableCell>
                <TableCell>{shift.endTime}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleEditShift(shift)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ShiftDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        shift={selectedShift}
      />
    </Box>
  );
}

export default Planning; 