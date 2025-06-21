import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Calendar from '../pages/Calendar';
import Kanban from '../pages/Kanban';
import Tables from '../pages/Tables';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/kanban" element={<Kanban />} />
      <Route path="/tables" element={<Tables />} />
    </Routes>
  );
};

export default AppRoutes;