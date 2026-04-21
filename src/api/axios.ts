import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api.my_jobs.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Phiên đăng nhập hết hạn hoặc không hợp lệ.");

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('user_role');

            window.dispatchEvent(new Event("roleChange"));

            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
export default api;