import { AppBar, Toolbar, IconButton, Typography, Box, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '../../features/theme/themeSlice';
import Logo from '../../assets/logo.png'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <AppBar
      position="fixed"
      sx={{ height: 64, zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton edge="start" color="inherit" onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
       
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <img src={Logo} alt="Logo" style={{ height: 36, marginRight: 8 ,borderRadius: "50%" }} />
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          InsightDash
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <LightModeIcon color={mode === 'light' ? 'warning' : 'disabled'} />
          <Switch
            checked={mode === 'dark'}
            onChange={() => dispatch(toggleMode())}
            color="default"
            inputProps={{ 'aria-label': 'theme switch' }}
          />
          <DarkModeIcon color={mode === 'dark' ? 'primary' : 'disabled'} />
        </Box>
        <IconButton color="inherit" component={Link} to="/profile">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
