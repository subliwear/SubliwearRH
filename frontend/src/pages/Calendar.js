import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Composant pour afficher une journée dans le calendrier
function CalendarDay({ date, events }) {
  const isToday = new Date().toDateString() === date.toDateString();
  const dayEvents = events?.filter(
    (event) =>
      new Date(event.startDate).toDateString() === date.toDateString()
  ) || [];

  return (
    <Paper
      sx={{
        p: 1,
        height: '120px',
        backgroundColor: isToday ? '#e3f2fd' : 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: isToday ? 'bold' : 'normal',
          color: isToday ? 'primary.main' : 'text.secondary',
        }}
      >
        {date.getDate()}
      </Typography>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {dayEvents.map((event, index) => (
          <Typography
            key={index}
            variant="caption"
            sx={{
              display: 'block',
              backgroundColor: event.type === 'congé' ? '#fff3e0' : '#e8f5e9',
              p: 0.5,
              borderRadius: 1,
              mb: 0.5,
              fontSize: '0.7rem',
            }}
          >
            {event.employee}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}

function AbsenceDialog({ open, handleClose }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('congé');
  const [employee, setEmployee] = useState('');

  const handleSubmit = () => {
    // À implémenter : Enregistrement de l'absence
    console.log({ startDate, endDate, type, employee });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ajouter une absence</DialogTitle>
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date de début"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date de fin"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Type d'absence"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="congé">Congé</MenuItem>
                <MenuItem value="maladie">Maladie</MenuItem>
                <MenuItem value="autre">Autre</MenuItem>
              </TextField>
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

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);

  // Données de test
  const events = [
    {
      employee: 'Jean Dupont',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      type: 'congé',
    },
    {
      employee: 'Marie Martin',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      type: 'maladie',
    },
  ];

  // Génération des jours du mois
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Ajouter les jours du mois précédent pour compléter la première semaine
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(
        new Date(year, month, 1 - (i + 1))
      );
    }

    // Ajouter tous les jours du mois
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth();

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Calendrier des absences</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Ajouter une absence
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={1}>
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
            <Grid item xs key={day}>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{ fontWeight: 'bold' }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          {days.map((date, index) => (
            <Grid item xs key={index}>
              <CalendarDay date={date} events={events} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <AbsenceDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />
    </Box>
  );
}

export default Calendar; 