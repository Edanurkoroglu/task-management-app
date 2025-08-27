import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';
import type { AuthState } from '../types';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth as AuthState);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-white text-2xl font-bold hover:text-blue-200 transition-colors"
          >
            📝 Task Manager
          </Link>
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📋 My Tasks
                </Link>
                <Link 
                  to="/create-task" 
                  className="text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ➕ Create Task
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  🔑 Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📝 Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
