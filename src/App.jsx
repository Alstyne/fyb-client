import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import CarouselPage from './pages/Carousel';
import Feed      from './pages/Feed';
import Wall      from './pages/Wall';


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/feed" element={
          <ProtectedRoute><Feed /></ProtectedRoute>
        } />
        <Route path="/finalist" element={
          <ProtectedRoute><CarouselPage /></ProtectedRoute>
        } />
        <Route path="/profile/:id" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly><Admin /></ProtectedRoute>
        } />
        <Route path="/wall" element={
          <ProtectedRoute><Wall /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
      
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              background: '#1A1A2E',
              color: '#F5F0E8',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '12px',
            },
            success: {
              iconTheme: { primary: '#C9A84C', secondary: '#1A1A2E' },
            },
          }}
        />
        <Navbar />
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;