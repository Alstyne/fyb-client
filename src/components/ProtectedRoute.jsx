import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#050505',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ color: '#dc2626', fontFamily: 'monospace', fontSize: 14 }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;