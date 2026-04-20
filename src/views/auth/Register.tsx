import React from 'react';
import { Link } from 'react-router-dom';
import { useRegisterController } from '../../hooks/useRegisterController';

const Register: React.FC = () => {
    const {
        name, setName,
        email, setEmail,
        phone, setPhone,
        password, setPassword,
        passwordConfirmation, setPasswordConfirmation,
        loading, error, handleSubmit
    } = useRegisterController();

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center py-5" style={{ minHeight: '80vh' }}>
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 p-4">
                        <div className="card-body">
                            <h3 className="fw-bold text-center mb-4 text-primary">ĐĂNG KÝ TÀI KHOẢN</h3>

                            {error && (
                                <div className="alert alert-danger py-2 small text-center" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Họ và tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập họ và tên"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Email */}
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

                                {/* Số điện thoại */}
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="0839xxxxxx"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="row">
                                    {/* Mật khẩu */}
                                    <div className="col-md-6 mb-3">
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

                                    {/* Xác nhận mật khẩu */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label small fw-bold">Xác nhận</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="••••••••"
                                            value={passwordConfirmation}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="terms" required />
                                        <label className="form-check-label small" htmlFor="terms">
                                            Tôi đồng ý với <a href="#" className="text-decoration-none">điều khoản sử dụng</a>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 fw-bold py-2 shadow-sm"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Đang xử lý...
                                        </>
                                    ) : 'Đăng ký ngay'}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <span className="small text-muted">Đã có tài khoản? </span>
                                <Link to="/login" className="small fw-bold text-decoration-none">Đăng nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;