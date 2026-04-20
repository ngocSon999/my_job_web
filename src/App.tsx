import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Login from './views/auth/Login';
import Register from './views/auth/Register';

export default function App() {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route
                    index
                    element={isAuthenticated ? <Dashboard /> : <Home />}
                />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
}