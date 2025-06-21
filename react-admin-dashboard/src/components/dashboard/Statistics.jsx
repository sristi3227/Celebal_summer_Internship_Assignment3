import { Paper, Typography, Box } from '@mui/material';

const Statistics = ({ stats }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Statistics</Typography>
    <Box display="flex" gap={4}>
      {stats.map((stat, idx) => (
        <Box key={idx}>
          <Typography variant="subtitle2">{stat.label}</Typography>
          <Typography variant="h5" color="primary">{stat.value}</Typography>
        </Box>
      ))}
    </Box>
  </Paper>
);

export default Statistics;