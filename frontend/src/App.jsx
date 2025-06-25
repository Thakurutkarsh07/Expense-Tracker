import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { saveTokenFromURL } from './utils';
import OAuthSuccess from './pages/OAuthSuccess';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';

const TokenHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = saveTokenFromURL(location.search);
    if (token) navigate('/');
  }, [location, navigate]);

  return null;
};

// Layout with Navbar
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

const App = () => (
  <Router>
    <TokenHandler />
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      {/* Protected/User Routes with Navbar */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
    </Routes>
  </Router>
);

export default App;
