import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Calendar from '../pages/Calendar';
import Kanban from '../pages/Kanban';
import Tables from '../pages/Tables';
import Profile from '../pages/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/kanban" element={<Kanban />} />
      <Route path="/tables" element={<Tables />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;