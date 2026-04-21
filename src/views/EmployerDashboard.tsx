import React from 'react';

const EmployerDashboard: React.FC = () => {
    const stats = [
        { label: 'Tin đã đăng', value: 12, icon: 'bi-file-earmark-text', color: 'primary' },
        { label: 'Ứng viên mới', value: 45, icon: 'bi-people', color: 'success' },
        { label: 'Lượt xem tin', value: '1.2k', icon: 'bi-eye', color: 'info' },
        { label: 'Điểm uy tín', value: 98, icon: 'bi-star', color: 'warning' },
    ];

    return (
        <div className="container-fluid">
            <h3 className="fw-bold mb-4">Tổng quan tuyển dụng</h3>

            <div className="row g-3 mb-4">
                {stats.map((stat, index) => (
                    <div className="col-md-3" key={index}>
                        <div className="card border-0 shadow-sm p-3">
                            <div className="d-flex align-items-center">
                                <div className={`bg-${stat.color}-subtle text-${stat.color} p-3 rounded-3 me-3`}>
                                    <i className={`bi ${stat.icon} fs-4`}></i>
                                </div>
                                <div>
                                    <small className="text-muted d-block">{stat.label}</small>
                                    <span className="fs-4 fw-bold">{stat.value}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4 mb-4" style={{ minHeight: '300px' }}>
                        <h5 className="fw-bold mb-3">Biểu đồ ứng tuyển (Gần đây)</h5>
                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                            [Biểu đồ sẽ hiển thị ở đây]
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm p-4">
                        <h5 className="fw-bold mb-3">Thông báo mới</h5>
                        <ul className="list-unstyled">
                            <li className="mb-3 pb-3 border-bottom">
                                <small className="text-primary d-block">Vừa xong</small>
                                <strong>Nguyễn Văn A</strong> đã ứng tuyển vào vị trí Kế toán.
                            </li>
                            <li>
                                <small className="text-muted d-block">2 giờ trước</small>
                                Tin đăng "Kế toán tổng hợp" của bạn đã được duyệt.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;