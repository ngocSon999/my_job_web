import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const useRegisterController = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setError("Mật khẩu xác nhận không khớp!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await api.post('/register', {
                name,
                email,
                phone,
                password,
                password_confirmation: passwordConfirmation
            });

            // Thường sau khi đăng ký sẽ tự động đăng nhập hoặc chuyển về Login
            alert("Đăng ký thành công vui long xac thuc email!");
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || "Đăng ký không thành công!");
        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName,
        email, setEmail,
        phone, setPhone,
        password, setPassword,
        passwordConfirmation, setPasswordConfirmation,
        loading, error, handleSubmit
    };
};