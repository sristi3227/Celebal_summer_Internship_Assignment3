import { Paper, Typography, Box } from '@mui/material';

const Summary = ({ title, value, description }) => (
  <Paper sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4" color="blue">{value}</Typography>
    <Typography variant="body2" color="text.secondary">{description}</Typography>
  </Paper>
);

export default Summary;