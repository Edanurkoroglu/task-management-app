import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { RootState } from './store';
import type { AuthState } from './types';
import { fetchTasks } from './store/slices/taskSlice';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth as AuthState);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTasks() as any);
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/" replace />
              } 
            />
            <Route 
              path="/register" 
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/" replace />
              } 
            />
            <Route 
              path="/" 
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <TaskList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-task" 
              element={
                <ProtectedRoute>
                  <CreateTask />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
