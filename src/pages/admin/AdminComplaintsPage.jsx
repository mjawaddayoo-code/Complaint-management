import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import { api } from '../../api/client';

export default function AdminComplaintsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    const page = searchParams.get('page') || '1';

    const [formValues, setFormValues] = useState({ search, from, to });
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setFormValues({ search, from, to });
        const qs = new URLSearchParams({ search, from, to, page }).toString();
        api.get(`/api/admin/complaints?${qs}`)
            .then(setResult)
            .catch((err) => setError(err.message));
    }, [search, from, to, page]);

    function handleFilterSubmit(e) {
        e.preventDefault();
        setSearchParams({ search: formValues.search, from: formValues.from, to: formValues.to, page: '1' });
    }

    function goToPage(p) {
        setSearchParams({ search, from, to, page: String(p) });
    }

    const hasFilters = search || from || to;

    return (
        <>
            <Nav adminContext />
            <main className="page">
                <div className="page-header">
                    <div>
                        <h1>All Complaints</h1>
                        <p className="text-muted mb-0">{result ? `${result.totalCount} total — newest first` : '\u00A0'}</p>
                    </div>
                </div>

                <form className="filter-bar" onSubmit={handleFilterSubmit}>
                    <div className="field grow-2">
                        <label htmlFor="search">Search</label>
                        <input
                            type="text" id="search" placeholder="Name, email, or subject"
                            value={formValues.search}
                            onChange={(e) => setFormValues({ ...formValues, search: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="from">From</label>
                        <input
                            type="date" id="from" value={formValues.from}
                            onChange={(e) => setFormValues({ ...formValues, from: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="to">To</label>
                        <input
                            type="date" id="to" value={formValues.to}
                            onChange={(e) => setFormValues({ ...formValues, to: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary">Filter</button>
                    {hasFilters && (
                        <button
                            type="button" className="btn btn-ghost"
                            onClick={() => { setFormValues({ search: '', from: '', to: '' }); setSearchParams({}); }}
                        >
                            Clear
                        </button>
                    )}
                </form>

                {error && <div className="alert alert-error">{error}</div>}

                {result && (result.complaints.length === 0 ? (
                    <div className="table-wrap">
                        <div className="empty-state">
                            <div className="icon">&#128269;</div>
                            <p className="mb-0">{result.totalCount === 0 ? 'No complaints received yet.' : 'No complaints match your filters.'}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="table-wrap">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Complaint ID</th>
                                        <th>User</th>
                                        <th>Subject</th>
                                        <th>Description</th>
                                        <th>Submitted</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.complaints.map((c) => (
                                        <tr key={c._id}>
                                            <td className="id-cell" data-label="Complaint ID">{c._id}</td>
                                            <td data-label="User">
                                                {c.userName}<br />
                                                <span className="text-muted" style={{ fontSize: '0.82rem' }}>{c.userEmail}</span>
                                            </td>
                                            <td className="truncate" data-label="Subject">{c.subject}</td>
                                            <td className="truncate" data-label="Description">{c.description}</td>
                                            <td data-label="Submitted">
                                                {new Date(c.createdAt).toLocaleDateString()}<br />
                                                <span className="text-muted" style={{ fontSize: '0.82rem' }}>{new Date(c.createdAt).toLocaleTimeString()}</span>
                                            </td>
                                            <td data-label="Actions">
                                                <Link to={`/admin/complaints/${c._id}`} className="btn btn-secondary btn-sm">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">
                            <span>Page {result.currentPage} of {result.totalPages}</span>
                            <div className="controls">
                                {result.currentPage > 1 && (
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => goToPage(result.currentPage - 1)}>Previous</button>
                                )}
                                {result.currentPage < result.totalPages && (
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => goToPage(result.currentPage + 1)}>Next</button>
                                )}
                            </div>
                        </div>
                    </>
                ))}
            </main>
        </>
    );
}
