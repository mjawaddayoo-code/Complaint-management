import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import { api } from '../../api/client';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/api/admin/stats')
            .then(setStats)
            .catch((err) => setError(err.message));
    }, []);

    return (
        <>
            <Nav adminContext />
            <main className="page">
                <div className="page-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p className="text-muted mb-0">Overview of complaints received so far.</p>
                    </div>
                    <Link to="/admin/complaints" className="btn btn-primary">View All Complaints</Link>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                {stats && (
                    <>
                        <div className="stat-grid">
                            <div className="stat">
                                <div className="stat-label">Total Complaints</div>
                                <div className="stat-value">{stats.totalComplaints}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-label">Complaints Today</div>
                                <div className="stat-value">{stats.complaintsToday}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-label">Complaints This Week</div>
                                <div className="stat-value">{stats.complaintsThisWeek}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-label">Latest Complaint</div>
                                {stats.latestComplaint ? (
                                    <>
                                        <div className="stat-value" style={{ fontSize: '1.1rem' }}>{stats.latestComplaint.subject}</div>
                                        <div className="stat-sub">{new Date(stats.latestComplaint.createdAt).toLocaleString()}</div>
                                    </>
                                ) : (
                                    <div className="stat-value" style={{ fontSize: '1.1rem' }}>—</div>
                                )}
                            </div>
                        </div>

                        {stats.totalComplaints === 0 && (
                            <div className="table-wrap">
                                <div className="empty-state">
                                    <div className="icon">&#9993;</div>
                                    <p className="mb-0">No complaints received yet.</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
}
