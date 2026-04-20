import { Link, Outlet, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const MainLayout = () => {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error("Lỗi khi gọi API logout:", error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            navigate('/login');

            window.location.reload();
        }
    };

    return (
        <div className="main-layout">
            <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold text-primary" to="/">MY JOBS</Link>

                    <div className="d-flex gap-2">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="btn btn-outline-primary btn-sm px-3 fw-bold">
                                    Đăng nhập
                                </Link>
                                <button className="btn btn-primary btn-sm px-3 fw-bold">Tham gia ngay</button>
                            </>
                        ) : (
                            <div className="dropdown">
                                <button
                                    className="btn btn-light btn-sm dropdown-toggle fw-bold"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    {JSON.parse(localStorage.getItem('user') || '{}').name || 'Tài khoản'}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item" to="/profile">Trang cá nhân</Link></li>
                                    <li>
                                        <hr className="dropdown-item-divider"/>
                                    </li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="content-wrapper">
                <main className="py-4">
                    <Outlet/>
                </main>
            </div>

            <footer className="py-4 bg-dark text-white text-center mt-auto">
                <div className="container-fluid">
                    <small>&copy; 2026 My Jobs Business Platform. Phát triển bởi NT</small>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;