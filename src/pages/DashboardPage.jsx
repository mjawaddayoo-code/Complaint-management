import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export default function DashboardPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [values, setValues] = useState({ subject: '', description: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        try {
            const data = await api.post('/api/complaints', values);
            // Navigating to a dedicated GET route (instead of leaving the
            // result on this page) means a refresh just re-fetches the
            // complaint — it can never resubmit the form.
            navigate(`/complaint/success/${data.complaint._id}`, { replace: true });
        } catch (err) {
            setErrors(err.errors || { general: err.message });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Nav />
            <main className="page-narrow">
                <div className="page-header" style={{ borderBottom: 'none', marginBottom: 20, paddingBottom: 0 }}>
                    <div>
                        <h1>Hello, {user?.name}</h1>
                        <p className="text-muted mb-0">Submit a complaint below — we'll take it from there.</p>
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-header">
                        <h2>Submit a Complaint</h2>
                        <p className="text-muted mb-0">Tell us what happened. Every submission is reviewed by our team.</p>
                    </div>

                    {errors.general && <div className="alert alert-error">{errors.general}</div>}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text" id="subject" name="subject"
                                placeholder="Brief summary of your complaint"
                                value={values.subject} onChange={handleChange}
                                className={errors.subject ? 'has-error' : ''}
                            />
                            {errors.subject && <span className="error-text">{errors.subject}</span>}
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description" name="description"
                                placeholder="Describe what happened in detail"
                                value={values.description} onChange={handleChange}
                                className={errors.description ? 'has-error' : ''}
                            />
                            {errors.description && <span className="error-text">{errors.description}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                            {submitting ? 'Submitting…' : 'Submit Complaint'}
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
