import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const MainLayout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const [role, setRole] = useState(localStorage.getItem('user_role') || 'candidate');

    const isLoggedIn = !!localStorage.getItem('token');

    const toggleRole = () => {
        const newRole = role === 'candidate' ? 'employer' : 'candidate';
        setRole(newRole);
        localStorage.setItem('user_role', newRole);
        window.dispatchEvent(new Event("roleChange"));

        navigate('/');
    };

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error("Lỗi khi gọi API logout:", error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('user_role');
            navigate('/login');
            window.location.reload();
        }
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh', position: 'relative' }}>
            {isLoggedIn && (
                <>
                    {isSidebarOpen && (
                        <div
                            className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
                            style={{zIndex: 1040}}
                            onClick={() => setSidebarOpen(false)}
                        ></div>
                    )}

                    <aside className={`bg-white border-end shadow-sm transition-all sidebar-container 
                        ${isSidebarOpen ? 'sidebar-show' : 'sidebar-hide'}`}>
                        <div className="d-flex flex-column h-100 p-3">

                            <div className="flex-grow-1">
                                <div className="fw-bold text-primary mb-4 fs-4 px-2">MY JOBS</div>
                                <ul className="nav flex-column gap-1">
                                    <li className="nav-item">
                                        <Link className="nav-link text-dark rounded py-2" to="/">
                                            <i className="bi bi-speedometer2 me-2"></i> Bảng điều khiển
                                        </Link>
                                    </li>

                                    {role === 'candidate' ? (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link text-dark rounded py-2" to="/post">
                                                    <i className="bi bi-briefcase me-2"></i> Tìm việc làm
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link text-dark rounded py-2" to="/applications">
                                                    <i className="bi bi-journal-check me-2"></i> Việc đã ứng tuyển
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link text-dark rounded py-2" to="/my-posts">
                                                    <i className="bi bi-file-earmark-text me-2"></i> Quản lý tin đăng
                                                </Link>
                                            </li>
                                        </>
                                    )}

                                    <li className="nav-item">
                                        <Link className="nav-link text-dark rounded py-2" to="/messages">
                                            <i className="bi bi-chat-left-text me-2"></i> Tin nhắn
                                            <span className="badge bg-danger rounded-pill float-end">3</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-auto border-top pt-3">
                                <div className="bg-light rounded p-3">
                                    <div className="small text-muted mb-2 fw-bold text-uppercase"
                                         style={{fontSize: '0.7rem'}}>
                                        Chế độ hiện tại: <span className="text-primary">{role === 'candidate' ? 'Ứng viên' : 'Tuyển dụng'}</span>
                                    </div>
                                    <button
                                        onClick={toggleRole}
                                        className={`btn w-100 btn-sm fw-bold shadow-sm py-2 ${role === 'candidate' ? 'btn-primary' : 'btn-success'}`}
                                    >
                                        <i className="bi bi-arrow-left-right me-2"></i>
                                        Chuyển sang {role === 'candidate' ? 'Tuyển dụng' : 'Ứng viên'}
                                    </button>
                                    <p className="small text-muted mt-2 mb-0" style={{fontSize: '0.75rem'}}>
                                        {role === 'candidate' ? 'Đăng tin và quản lý ứng viên ngay.' : 'Tìm kiếm việc làm phù hợp ngay.'}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </aside>
                </>
            )}

            <div className="flex-grow-1 d-flex flex-column bg-light" style={{minWidth: 0}}>
                <nav className="navbar navbar-light bg-white border-bottom sticky-top px-3">
                    <div className="container-fluid p-0">
                        <div className="d-flex align-items-center">
                            {isLoggedIn && (
                                <button className="btn btn-light border me-2 d-md-none"
                                        onClick={() => setSidebarOpen(!isSidebarOpen)}>
                                    <i className="bi bi-list fs-5"></i>
                                </button>
                            )}
                            <Link className="navbar-brand fw-bold text-primary d-md-none" to="/">MY JOBS</Link>
                        </div>

                        <div className="ms-auto">
                            {!isLoggedIn ? (
                                <Link to="/login" className="btn btn-primary btn-sm fw-bold px-3">Đăng nhập</Link>
                            ) : (
                                <div className="dropdown">
                                    <button className="btn btn-light btn-sm dropdown-toggle fw-bold border px-3"
                                            type="button" data-bs-toggle="dropdown">
                                        {JSON.parse(localStorage.getItem('user') || '{}').name || 'Tài khoản'}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                                        <li><Link className="dropdown-item py-2" to="/profile">Hồ sơ cá nhân</Link></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li>
                                            <button className="dropdown-item text-danger py-2" onClick={handleLogout}>
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                <main className="p-3 p-md-4">
                    <Outlet context={{ role }} />
                </main>

                <footer className="py-4 bg-white border-top text-center mt-auto">
                    <div className="container-fluid">
                        <small className="text-muted">&copy; 2026 My Jobs Business Platform. Phát triển bởi NT</small>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default MainLayout;