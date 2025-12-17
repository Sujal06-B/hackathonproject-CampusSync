import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import Materials from './pages/Materials';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Department from './pages/Department';
import LiveClass from './pages/LiveClass';
import Doubts from './pages/Doubts';
import Help from './pages/Help';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />

          {/* Protected Routes */}
          <Route path="/onboarding" element={
            <RequireAuth>
              <Onboarding />
            </RequireAuth>
          } />
          
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />

          {/* Core academic journey */}
          <Route path="/assignments" element={
            <RequireAuth>
              <Assignments />
            </RequireAuth>
          } />
          
          <Route path="/materials" element={
            <RequireAuth>
              <Materials />
            </RequireAuth>
          } />
          
          <Route path="/department" element={
            <RequireAuth>
              <Department />
            </RequireAuth>
          } />
          
          <Route path="/live-class" element={
            <RequireAuth>
              <LiveClass />
            </RequireAuth>
          } />
          
          <Route path="/doubts" element={
            <RequireAuth>
              <Doubts />
            </RequireAuth>
          } />
          
          <Route path="/help" element={
            <RequireAuth>
              <Help />
            </RequireAuth>
          } />

          <Route path="/settings" element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          } />

          <Route path="/profile" element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;