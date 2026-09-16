import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

export default function NotFoundPage() {
    return (
        <>
            <Nav />
            <main className="page">
                <div className="error-page">
                    <div className="error-code">404</div>
                    <h1>Page Not Found</h1>
                    <p className="text-muted">The page you're looking for doesn't exist or may have moved.</p>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
            </main>
        </>
    );
}
