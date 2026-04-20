import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginController } from '../../hooks/useLoginController';

const Login: React.FC = () => {
    const {
        email, setEmail,
        password, setPassword,
        remember, setRemember,
        loading, error, handleSubmit
    } = useLoginController();

    return (
        <div className="container">
            {/* Căn giữa form trong layout */}
            <div className="row justify-content-center align-items-center py-5" style={{ minHeight: '75vh' }}>
                <div className="col-md-5 col-lg-4">
                    <div className="card shadow-sm border-0 p-4">
                        <div className="card-body">
                            <h3 className="fw-bold text-center mb-4 text-primary">ĐĂNG NHẬP</h3>

                            {error && (
                                <div className="alert alert-danger py-2 small text-center" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                        />
                                        <label className="form-check-label small" htmlFor="rememberMe">
                                            Ghi nhớ
                                        </label>
                                    </div>
                                    <a href="/forgot-password" title="Quên mật khẩu" className="small text-decoration-none fw-medium text-primary">
                                        Quên mật khẩu?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 fw-bold py-2 shadow-sm"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Đang xác thực...
                                        </>
                                    ) : 'Đăng nhập'}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <span className="small text-muted">Chưa có tài khoản? </span>
                                <Link to="/register" className="small fw-bold text-decoration-none">
                                    Đăng ký ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;