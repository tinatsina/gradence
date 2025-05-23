import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUp/SignUp';
import NavBar from './components/NavBar/NavBar';
import ExamPage from './pages/ExamPage/ExamPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<NavBar />} />
      <Route path="/exam" element={<ExamPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
