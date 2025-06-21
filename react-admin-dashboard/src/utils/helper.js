import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useTheme } from './hooks/useTheme';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import Tables from './pages/Tables';
import { toggleMode } from './features/theme/themeSlice';

function App() {
  const { theme } = useTheme();

  const handleToggleMode = () => {
    toggleMode();
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <button onClick={handleToggleMode}>Toggle Mode</button>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/tables" element={<Tables />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;