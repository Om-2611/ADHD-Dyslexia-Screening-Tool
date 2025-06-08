import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ADHDTests from './pages/tests/ADHDTests';
import DyslexiaTests from './pages/tests/DyslexiaTests';
import TestEngine from './pages/tests/TestEngine';

// Temporarily adding a comment to trigger refresh
import FakeTestResults from './pages/tests/FakeTestResults';
import UserProfile from './pages/profile/UserProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import TestResults from './pages/tests/FakeTestResults';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-align-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return currentUser ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  const { currentUser } = useAuth();

  return (
    <AuthProvider>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/adhd" element={
            <ProtectedRoute>
              <ADHDTests />
            </ProtectedRoute>
          } />
          <Route path="/dyslexia" element={
            <ProtectedRoute>
              <DyslexiaTests />
            </ProtectedRoute>
          } />
          <Route path="/test/:testType/:testId" element={
            <ProtectedRoute>
              <TestEngine />
            </ProtectedRoute>
          } />
          <Route path="/fake-results/:testType/:testId" element={
            <ProtectedRoute>
              <FakeTestResults />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <TestResults />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Default Route - Redirect to login if not authenticated, home if authenticated */}
          <Route path="/" element={
            currentUser ? <Navigate to="/home" /> : <Navigate to="/login" />
          } />
          
          {/* Catch all unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;