import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Grid
} from '@mui/material';
import { useState, useEffect } from 'react';

const repeatOptions = ['never', 'daily', 'weekly'];

const AddEventModal = ({ open, onClose, onSubmit, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [repeat, setRepeat] = useState('never');

  useEffect(() => {
    if (selectedDate) {
      setStart(selectedDate.start);
      setEnd(selectedDate.end || selectedDate.start);
    }
  }, [selectedDate]);

  const handleSubmit = () => {
  if (!title || !start || !end) return;

  const formattedStart = new Date(start).toISOString();
  const formattedEnd = new Date(end).toISOString();

  onSubmit({
    title,
    location,
    start: formattedStart,
    end: formattedEnd,
    repeat,
    allDay: true,
  });

  setTitle('');
  setLocation('');
  setRepeat('never');
};


  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Location" fullWidth value={location} onChange={(e) => setLocation(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Start Date/Time" type="datetime-local" fullWidth
              value={start} onChange={(e) => setStart(e.target.value)} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="End Date/Time" type="datetime-local" fullWidth
              value={end} onChange={(e) => setEnd(e.target.value)} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Repeat"
              select
              fullWidth
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
            >
              {repeatOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;
