import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ControlPanel from './pages/ControlPanel/ControlPanel';
import ExamCenter from './pages/ExamCenter/ExamCenter';
import HomePage from './pages/home/HomePage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/exam" element={<ControlPanel />} />
      <Route path="/panel" element={<ExamCenter />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
