import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

export default function HomePage() {
    return (
        <>
            <Nav />
            <main className="page">
                <section className="hero">
                    <h1>Complaint Management System</h1>
                    <p className="lede">
                        Submit a complaint and keep track of what you reported. Administrators
                        receive each submission the moment it's saved and can review every
                        complaint in one place.
                    </p>
                    <div className="actions">
                        <Link to="/register" className="btn btn-primary">Submit a Complaint</Link>
                        <Link to="/login" className="btn btn-secondary">Login</Link>
                        <Link to="/register" className="btn btn-ghost">Register</Link>
                    </div>

                    <ol className="how-it-works">
                        <li><strong>Create your account</strong><br /><span className="text-muted">Register with your name, email, and a password.</span></li>
                        <li><strong>Submit your complaint</strong><br /><span className="text-muted">Describe the subject and details of your issue.</span></li>
                        <li><strong>Complaint is recorded</strong><br /><span className="text-muted">Your submission is saved securely right away.</span></li>
                        <li><strong>Administrator is notified</strong><br /><span className="text-muted">The admin team receives an email about it.</span></li>
                        <li><strong>Your complaint is reviewed</strong><br /><span className="text-muted">It appears in the admin queue for follow-up.</span></li>
                    </ol>
                </section>

                <section className="feature-grid">
                    <div className="feature-card">
                        <h3>Secure Authentication</h3>
                        <p>Passwords are hashed and every session is protected — your account details stay yours.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Easy Complaint Submission</h3>
                        <p>A short, focused form. Add a subject and description and you're done.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Instant Admin Notification</h3>
                        <p>Every submission triggers an email to the admin team so nothing sits unnoticed.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Secure Data Storage</h3>
                        <p>Your complaint is saved to the database first — reliably, before anything else happens.</p>
                    </div>
                </section>
            </main>
        </>
    );
}
