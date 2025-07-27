// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/authSlice';

// Pages & Components
import Login from './pages/Login';
import Register from './pages/Register';
import FileUploader from './components/FileUploader';
import ChartVisualizer from './components/ChartVisualizer';
import History from './components/History';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// ProtectedRoute component for route protection
function ProtectedRoute({ children, adminOnly = false }) {
  const auth = useSelector((state) => state.auth);
  if (!auth.token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && auth.user?.role !== 'admin') {
    // Not admin
    return <Navigate to="/" replace />;
  }
  return children;
}


function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
       <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <FileUploader />
              </ProtectedRoute>
            }
          />

          {/* 
            Note: For ChartVisualizer, you should pass data as props or manage through redux/context 
            depending on your app's state design.
            Here we place a placeholder route for visualization if you connect it later.
          */}
          <Route
            path="/visualize"
            element={
              <ProtectedRoute>
                {/* Replace `data` prop below with actual data */}
                <ChartVisualizer data={[]} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback route for 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}