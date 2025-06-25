import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserFromToken, removeToken } from '../utils';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        ExpenseTracker
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/profile" className="hover:underline">
              {user.name || user.email || 'Profile'}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
