import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [values, setValues] = useState({ email: '', password: '' });
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
            await login(values);
            navigate('/dashboard');
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
                <div className="panel">
                    <div className="panel-header">
                        <h1>Welcome back</h1>
                        <p className="text-muted mb-0">Login to continue to your dashboard.</p>
                    </div>

                    {errors.general && <div className="alert alert-error">{errors.general}</div>}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email" id="email" name="email" autoComplete="email"
                                value={values.email} onChange={handleChange}
                                className={errors.email ? 'has-error' : ''}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password" id="password" name="password" autoComplete="current-password"
                                value={values.password} onChange={handleChange}
                                className={errors.password ? 'has-error' : ''}
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                            {submitting ? 'Logging in…' : 'Login'}
                        </button>
                    </form>

                    <p className="form-footer">Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </main>
        </>
    );
}
