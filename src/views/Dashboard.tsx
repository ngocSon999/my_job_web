import React from 'react';

const Dashboard: React.FC = () => {
    // Lấy thông tin user đã lưu từ localStorage lúc đăng nhập
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="container py-4">
            {/* Header: Lời chào và Điểm uy tín */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark">Bảng điều khiển</h2>
                    <p className="text-muted">Chào mừng trở lại, <span className="text-primary fw-bold">{user.name}</span></p>
                </div>
                <div className="text-end">
                    <div className="badge bg-primary-subtle text-primary p-2 px-3 rounded-pill shadow-sm">
                        <i className="bi bi-star-fill me-2"></i>
                        Điểm uy tín: <strong>{user.credit_score || 0}</strong>
                    </div>
                </div>
            </div>

            {/* Hàng chứa các thẻ thống kê (Cards) */}
            <div className="row g-4 mb-5">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 h-100 border-bottom border-primary border-3">
                        <div className="d-flex align-items-center mb-2">
                            <div className="bg-primary-subtle text-primary rounded-3 p-2 me-3">
                                <i className="bi bi-briefcase-fill fs-4"></i>
                            </div>
                            <span className="text-muted small fw-bold">VIỆC ĐÃ LƯU</span>
                        </div>
                        <div className="h3 fw-bold mb-0">12</div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 h-100 border-bottom border-success border-3">
                        <div className="d-flex align-items-center mb-2">
                            <div className="bg-success-subtle text-success rounded-3 p-2 me-3">
                                <i className="bi bi-send-check-fill fs-4"></i>
                            </div>
                            <span className="text-muted small fw-bold">ĐÃ ỨNG TUYỂN</span>
                        </div>
                        <div className="h3 fw-bold mb-0">08</div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 h-100 border-bottom border-info border-3">
                        <div className="d-flex align-items-center mb-2">
                            <div className="bg-info-subtle text-info rounded-3 p-2 me-3">
                                <i className="bi bi-eye-fill fs-4"></i>
                            </div>
                            <span className="text-muted small fw-bold">LƯỢT XEM CV</span>
                        </div>
                        <div className="h3 fw-bold mb-0">156</div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 h-100 border-bottom border-warning border-3">
                        <div className="d-flex align-items-center mb-2">
                            <div className="bg-warning-subtle text-warning rounded-3 p-2 me-3">
                                <i className="bi bi-chat-dots-fill fs-4"></i>
                            </div>
                            <span className="text-muted small fw-bold">PHỎNG VẤN</span>
                        </div>
                        <div className="h3 fw-bold mb-0">03</div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Bảng danh sách ứng tuyển */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white py-3 border-0">
                            <h5 className="fw-bold mb-0 text-secondary">Hoạt động ứng tuyển</h5>
                        </div>
                        <div className="table-responsive p-3">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                <tr className="small text-uppercase">
                                    <th>Vị trí / Công ty</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày nộp</th>
                                    <th className="text-end">Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <div className="fw-bold">Lập trình viên Laravel</div>
                                        <small className="text-muted">Công ty ABC Tech</small>
                                    </td>
                                    <td><span className="badge bg-warning text-dark">Đang chờ</span></td>
                                    <td className="text-muted small">20/04/2026</td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-light border">Xem</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="fw-bold">Frontend (React)</div>
                                        <small className="text-muted">Tập đoàn XYZ</small>
                                    </td>
                                    <td><span className="badge bg-success">Đã xem CV</span></td>
                                    <td className="text-muted small">18/04/2026</td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-light border">Xem</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar bên phải */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm bg-primary text-white p-4 mb-4">
                        <h5 className="fw-bold">Nâng cấp CV</h5>
                        <p className="small mb-3">Tăng khả năng được gọi phỏng vấn lên 300% với gói CV chuyên nghiệp.</p>
                        <button className="btn btn-light btn-sm fw-bold w-100">Tìm hiểu ngay</button>
                    </div>

                    <div className="card border-0 shadow-sm p-3">
                        <h6 className="fw-bold border-bottom pb-2 mb-3">Thông báo mới</h6>
                        <div className="mb-3 d-flex">
                            <div className="text-primary me-2"><i className="bi bi-circle-fill" style={{fontSize: '8px'}}></i></div>
                            <small>Công ty ABC vừa xem hồ sơ của bạn cách đây 5 phút.</small>
                        </div>
                        <div className="d-flex">
                            <div className="text-primary me-2"><i className="bi bi-circle-fill" style={{fontSize: '8px'}}></i></div>
                            <small>Có 5 công việc mới phù hợp với kỹ năng Laravel của bạn.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;