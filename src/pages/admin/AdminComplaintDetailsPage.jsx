import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import { api } from '../../api/client';

export default function AdminComplaintDetailsPage() {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/api/admin/complaints/${id}`)
            .then((data) => setComplaint(data.complaint))
            .catch((err) => setError(err.message));
    }, [id]);

    return (
        <>
            <Nav adminContext />
            <main className="page">
                <div className="page-header">
                    <div>
                        <h1>Complaint Details</h1>
                        {complaint && <p className="text-muted mb-0 mono">{complaint._id}</p>}
                    </div>
                    <Link to="/admin/complaints" className="btn btn-secondary">Back to All Complaints</Link>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                {complaint && (
                    <div className="row" style={{ alignItems: 'flex-start', gap: 20 }}>
                        <div className="panel" style={{ flex: 2, minWidth: 280 }}>
                            <div className="panel-header"><h2>Complaint</h2></div>
                            <dl className="receipt" style={{ border: 'none', padding: 0, margin: 0 }}>
                                <dt>Complaint ID</dt>
                                <dd className="mono">{complaint._id}</dd>

                                <dt>Subject</dt>
                                <dd>{complaint.subject}</dd>

                                <dt>Created</dt>
                                <dd>{new Date(complaint.createdAt).toLocaleString()}</dd>
                            </dl>

                            <h3 style={{ marginTop: 24 }}>Description</h3>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{complaint.description}</p>
                        </div>

                        <div className="panel" style={{ flex: 1, minWidth: 240 }}>
                            <div className="panel-header"><h2>Submitted By</h2></div>
                            <dl className="receipt" style={{ border: 'none', padding: 0, margin: '0 0 20px' }}>
                                <dt>Name</dt>
                                <dd>{complaint.userName}</dd>
                                <dt>Email</dt>
                                <dd>{complaint.userEmail}</dd>
                                <dt>User ID</dt>
                                <dd className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{complaint.userId}</dd>
                            </dl>

                            <h3>Timeline</h3>
                            <ul className="timeline">
                                <li>
                                    <div className="step-title">Complaint Submitted</div>
                                    <div className="step-meta">{new Date(complaint.createdAt).toLocaleString()}</div>
                                </li>
                                <li>
                                    <div className="step-title">Stored in Database</div>
                                    <div className="step-meta">Saved successfully</div>
                                </li>
                                <li className={complaint.emailSent ? '' : 'failed'}>
                                    <div className="step-title">
                                        Admin Notification{' '}
                                        {complaint.emailSent
                                            ? <span className="badge badge-success">Sent</span>
                                            : <span className="badge badge-danger">Failed</span>}
                                    </div>
                                    {!complaint.emailSent && complaint.emailError && (
                                        <div className="step-meta">The complaint was saved regardless — error: {complaint.emailError}</div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
