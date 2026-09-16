import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/admin/me')
            .then((data) => setIsAdmin(Boolean(data.isAdmin)))
            .catch(() => setIsAdmin(false))
            .finally(() => setLoading(false));
    }, []);

    async function login(password) {
        await api.post('/api/admin/login', { password });
        setIsAdmin(true);
    }

    async function logout() {
        await api.post('/api/admin/logout');
        setIsAdmin(false);
    }

    return (
        <AdminAuthContext.Provider value={{ isAdmin, loading, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    return useContext(AdminAuthContext);
}
