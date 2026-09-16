import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export default function SuccessPage() {
    const { id } = useParams();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [complaint, setComplaint] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/api/complaints/${id}`)
            .then((data) => setComplaint(data.complaint))
            .catch(() => setError('That complaint could not be found.'));
    }, [id]);

    async function handleLogout() {
        await logout();
        navigate('/');
    }

    return (
        <>
            <Nav />
            <main className="page-narrow">
                {error ? (
                    <div className="panel">
                        <div className="alert alert-error">{error}</div>
                        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
                    </div>
                ) : !complaint ? null : (
                    <div className="panel" style={{ textAlign: 'center' }}>
                        <div className="confirm-icon" style={{ marginLeft: 'auto', marginRight: 'auto' }}>&#10003;</div>
                        <h1>Complaint Received</h1>
                        <p className="text-muted">Your complaint has been successfully submitted. Our team has been notified and will review it.</p>

                        <div className="receipt" style={{ textAlign: 'left' }}>
                            <dl>
                                <dt>Complaint ID</dt>
                                <dd className="mono">{complaint._id}</dd>

                                <dt>Submitted</dt>
                                <dd>{new Date(complaint.createdAt).toLocaleString()}</dd>

                                <dt>Subject</dt>
                                <dd>{complaint.subject}</dd>
                            </dl>
                        </div>

                        <div className="row" style={{ justifyContent: 'center', marginTop: 24 }}>
                            <Link to="/dashboard" className="btn btn-primary">Submit Another Complaint</Link>
                            <Link to="/dashboard" className="btn btn-secondary">Go to Dashboard</Link>
                            <button type="button" className="btn btn-ghost" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
