import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const useLoginController = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false); // Thêm state ghi nhớ
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/login', {
                email,
                password
            });

            const { access_token, user } = response.data;

            if (access_token) {
                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user));

                if (remember) {
                    localStorage.setItem('remember_email', email);
                }

                navigate('/');
                window.location.reload();
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || "Đăng nhập thất bại!";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        remember, setRemember,
        loading, error, handleSubmit
    };
};