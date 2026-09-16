import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminLoginPage() {
    const { login } = useAdminAuth();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            await login(password);
            navigate('/admin');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Nav adminContext />
            <main className="page-narrow">
                <div className="panel">
                    <div className="panel-header">
                        <h1>Admin Login</h1>
                        <p className="text-muted mb-0">Enter the admin password to continue.</p>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label htmlFor="password">Admin Password</label>
                            <input
                                type="password" id="password" autoComplete="current-password" autoFocus
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                            {submitting ? 'Verifying…' : 'Login'}
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
