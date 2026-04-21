import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import EmployerDashboard from './views/EmployerDashboard';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import PostList from './views/post/PostList';
import MyPosts from './views/post/MyPosts';
import PostDetail from "./views/post/PostDetail.tsx";

// Mock Components
const TaxReports = () => <div className="p-4"><h3>Trang báo cáo thuế</h3></div>;

export default function App() {
    const isAuthenticated = !!localStorage.getItem('token');
    const [role, setRole] = useState(localStorage.getItem('user_role') || 'candidate');

    useEffect(() => {
        const syncRole = () => setRole(localStorage.getItem('user_role') || 'candidate');
        window.addEventListener('roleChange', syncRole);

        return () => {
            window.removeEventListener('roleChange', syncRole);
        };
    }, []);

    return (
        <Routes key={role}>
            <Route path="/" element={<MainLayout />}>
                <Route index element={isAuthenticated ? (role === 'employer' ? <EmployerDashboard /> : <Dashboard />) : <Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="post" element={<PostList />} />
                <Route path="my-posts" element={<MyPosts />} />
                <Route path="posts/:id" element={<PostDetail />} />

                <Route path="my-posts" element={role === 'employer' ? <MyPosts /> : <Navigate to="/" />} />
                <Route path="tax-reports" element={role === 'employer' ? <TaxReports /> : <Navigate to="/" />} />
            </Route>
        </Routes>
    );
}