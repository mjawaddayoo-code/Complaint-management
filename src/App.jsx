import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SuccessPage from './pages/SuccessPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminComplaintsPage from './pages/admin/AdminComplaintsPage';
import AdminComplaintDetailsPage from './pages/admin/AdminComplaintDetailsPage';

export default function App() {
    return (
        <AuthProvider>
            <AdminAuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />

                        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        <Route path="/complaint/success/:id" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />

                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
                        <Route path="/admin/complaints" element={<AdminRoute><AdminComplaintsPage /></AdminRoute>} />
                        <Route path="/admin/complaints/:id" element={<AdminRoute><AdminComplaintDetailsPage /></AdminRoute>} />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </AdminAuthProvider>
        </AuthProvider>
    );
}
