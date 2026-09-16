import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function Nav({ adminContext = false }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { isAdmin, logout: adminLogout } = useAdminAuth();

    async function handleUserLogout() {
        await logout();
        navigate('/');
    }

    async function handleAdminLogout() {
        await adminLogout();
        navigate('/admin/login');
    }

    return (
        <header className="site-header">
            <div className="bar">
                <Link className="brand" to={adminContext ? '/admin' : '/'}>
                    <span className="brand-mark">CM</span>
                    Complaint System
                </Link>

                <nav className="nav">
                    {adminContext && isAdmin ? (
                        <>
                            <Link to="/admin">Dashboard</Link>
                            <Link to="/admin/complaints">Complaints</Link>
                            <button type="button" className="link" onClick={handleAdminLogout}>Logout</button>
                        </>
                    ) : user ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <span className="nav-user">{user.name}</span>
                            <button type="button" className="btn btn-ghost btn-sm" onClick={handleUserLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
