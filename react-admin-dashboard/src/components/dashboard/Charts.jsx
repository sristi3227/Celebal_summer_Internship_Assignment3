import { Paper, Typography, Button } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const downloadCSV = (data) => {
  const csv = ["name,value"];
  data.forEach(row => csv.push(`${row.name},${row.value}`));
  const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "user_distribution.csv";
  a.click();
};

const Charts = ({ data }) => (
  <Paper sx={{ p: 2, height: 420, minWidth: 400 }}> {/* Increased height & width */}
    <Typography variant="h6" sx={{ mb: 2 }}>User Distribution</Typography>
    <Button variant="outlined" size="small" sx={{ mb: 2 }} onClick={() => downloadCSV(data)}>
      Export CSV
    </Button>
    <ResponsiveContainer width="100%" height={300}> {/* Set fixed height */}
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100} // Slightly increased radius
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Paper>
);

export default Charts;
