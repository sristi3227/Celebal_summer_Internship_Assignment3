import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <Box sx={{ flex: 1 }}>
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

       
        <Box
          component="main"
          
          sx={{
            p: 3,
            mt: '64px', 
            minHeight: 'calc(100vh - 64px)', 
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
