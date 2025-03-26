import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import NavBar from './components/NavBar/NavBar';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<NavBar />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
