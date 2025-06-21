import { Paper, Box, Typography, Avatar, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LineChart, Line, ResponsiveContainer } from 'recharts';


const iconComponents = {
  trending_up: TrendingUpIcon,
  person: PersonIcon,
  attach_money: AttachMoneyIcon,
  shopping_cart: ShoppingCartIcon,
};

const StatCard = ({
  title,
  value,
  increase,
  icon,
  color = 'primary',
  person,
  subtitle,
  progress,
  chartData,
}) => {
  const IconComponent = iconComponents[icon];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: 220,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box sx={{ color: `${color}.main` }}>
          {IconComponent && <IconComponent sx={{ fontSize: 40 }} />}
        </Box>
        <Typography
          variant="subtitle2"
          sx={{
            color: increase.startsWith('+') ? 'success.main' : 'error.main',
            fontWeight: 'bold',
          }}
        >
          {increase}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      {person && (
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{person[0]}</Avatar>
          <Typography variant="caption" color="text.secondary">
            {person}
          </Typography>
        </Box>
      )}
      {progress !== undefined && (
        <Box sx={{ width: '100%', mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={color}
            sx={{ height: 8, borderRadius: 5 }}
          />
        </Box>
      )}
      {chartData && (
        <Box sx={{ width: '100%', height: 40 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
};

export default StatCard;


