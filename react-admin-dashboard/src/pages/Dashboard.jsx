import { Box, Grid, Paper, Typography, useTheme, Button, Stack } from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import StatCard from '../components/dashboard/StatCard';
import Summary from '../components/dashboard/Summary';


const data = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
];


const exportToCSV = (chartData, filename) => {
  const headers = Object.keys(chartData[0]).join(',');
  const rows = chartData.map(row => Object.values(row).join(',')).join('\n');
  const csvContent = [headers, rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, p: 3, height: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Sales" value="$23,456" increase="+14%" icon="trending_up" color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Users" value="1,234" increase="+7%" icon="person" color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Revenue" value="$12,345" increase="+18%" icon="attach_money" color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Orders" value="456" increase="+24%" icon="shopping_cart" color="info" />
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Summary
                title="Total Users"
                value={120}
                description="Number of registered users"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Summary
                title="Active Projects"
                value={8}
                description="Projects currently in progress"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Summary
                title="Tasks Completed"
                value={245}
                description="Total tasks completed this month"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: 420,
              backgroundColor: theme.palette.background.paper,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="medium">
                Sales Overview
              </Typography>
              <Button variant="outlined" size="small" onClick={() => exportToCSV(data, 'sales_overview.csv')}>
                Export CSV
              </Button>
            </Stack>

            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke={theme.palette.primary.main}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={theme.palette.secondary.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: 420,
              backgroundColor: theme.palette.background.paper,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="medium">
                Revenue Distribution
              </Typography>
              <Button variant="outlined" size="small" onClick={() => exportToCSV(data, 'revenue_distribution.csv')}>
                Export CSV
              </Button>
            </Stack>

            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
