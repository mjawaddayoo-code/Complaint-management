import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const passwordsFilled = values.password && values.confirmPassword;
    const passwordsMatch = values.password === values.confirmPassword;

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        try {
            await register(values);
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
                        <h1>Create your account</h1>
                        <p className="text-muted mb-0">Register to submit and track complaints.</p>
                    </div>

                    {errors.general && <div className="alert alert-error">{errors.general}</div>}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text" id="name" name="name" autoComplete="name"
                                value={values.name} onChange={handleChange}
                                className={errors.name ? 'has-error' : ''}
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

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
                                type="password" id="password" name="password" autoComplete="new-password"
                                value={values.password} onChange={handleChange}
                                className={errors.password ? 'has-error' : ''}
                            />
                            {errors.password
                                ? <span className="error-text">{errors.password}</span>
                                : <span className="field-hint">At least 6 characters.</span>}
                        </div>

                        <div className="field">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password" id="confirmPassword" name="confirmPassword" autoComplete="new-password"
                                value={values.confirmPassword} onChange={handleChange}
                                className={errors.confirmPassword ? 'has-error' : ''}
                            />
                            {errors.confirmPassword
                                ? <span className="error-text">{errors.confirmPassword}</span>
                                : passwordsFilled && (
                                    <span className="field-hint" style={{ color: passwordsMatch ? 'var(--success)' : 'var(--text-muted)' }}>
                                        {passwordsMatch ? 'Passwords match.' : 'Passwords do not match yet.'}
                                    </span>
                                )}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                            {submitting ? 'Creating account…' : 'Register'}
                        </button>
                    </form>

                    <p className="form-footer">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </main>
        </>
    );
}
