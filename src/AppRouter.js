import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ControlPanel from './pages/ControlPanel/ControlPanel';
import ExamCenter from './pages/ExamCenter/ExamCenter';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/exam" element={<ControlPanel />} />
      <Route path="/panel" element={<ExamCenter />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
