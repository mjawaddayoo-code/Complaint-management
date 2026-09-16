import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminRoute({ children }) {
    const { isAdmin, loading } = useAdminAuth();

    if (loading) return null;
    if (!isAdmin) return <Navigate to="/admin/login" replace />;
    return children;
}
