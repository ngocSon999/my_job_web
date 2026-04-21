import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Gộp chung Link vào đây
import { usePostDetailController } from '../../hooks/usePostDetailController';

interface PostDetailData {
    id: number;
    title: string;
    content: string;
    location?: string;
    job_type: string;
    working_time?: string;
    salary_formatted: string;
    is_negotiable: boolean;
    status: string;
    views: number;
    created_at: string;
    contact?: {
        name: string;
        phone: string;
        email: string;
    };
    author?: {
        id: number;
        is_owner: boolean;
    };
}

const PostDetail: React.FC = () => {
    const controller = usePostDetailController();
    const post = controller.post as PostDetailData | null;
    const loading = controller.loading;

    const navigate = useNavigate();

    if (loading) return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
            <p className="mt-2 text-muted">Đang tải chi tiết bài đăng...</p>
        </div>
    );

    if (!post) return (
        <div className="container py-5 text-center">
            <h5 className="text-muted">Không tìm thấy bài viết này.</h5>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/posts')}>Quay lại danh sách</button>
        </div>
    );

    return (
        <div className="container py-4">
            <button className="btn btn-sm btn-light mb-4 border shadow-sm px-3" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left me-2"></i> Quay lại
            </button>

            <div className="row">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: '16px' }}>
                        <div className="mb-3">
                            <span className={`badge ${post.status === 'active' ? 'bg-success' : 'bg-warning text-dark'} mb-2 px-3`}>
                                {post.status === 'active' ? 'Đang hiển thị' : 'Chờ duyệt'}
                            </span>
                            <h2 className="fw-bold text-dark mb-3" style={{ lineHeight: '1.4' }}>{post.title}</h2>
                        </div>

                        // Trong file PostDetail.tsx
                        <div className="d-flex flex-wrap gap-4 mb-4 text-muted small border-bottom pb-3">
                            <span><i className="bi bi-calendar3 me-2"></i>Ngày đăng: {post.created_at}</span>
                            <span><i className="bi bi-briefcase me-2"></i>{post.job_type}</span>

                            {/* Hiển thị lượt xem với màu sắc nổi bật một chút */}
                            <span className="text-primary fw-medium">
                                <i className="bi bi-eye-fill me-2"></i>
                                    {post.views.toLocaleString()} lượt xem
                            </span>

                            {post.location && <span><i className="bi bi-geo-alt me-2"></i>{post.location}</span>}
                        </div>

                        <h5 className="fw-bold mb-3">Mô tả công việc / Năng lực</h5>
                        <p className="text-dark mb-4" style={{ whiteSpace: 'pre-line', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            {post.content}
                        </p>

                        <div className="bg-light p-3 rounded-3 border-start border-primary border-4">
                            <h6 className="fw-bold mb-2">Thời gian làm việc:</h6>
                            <p className="mb-0 text-secondary">{post.working_time || 'Thỏa thuận trực tiếp'}</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm p-4 sticky-top" style={{top: '20px', borderRadius: '16px'}}>
                        <div
                            className="mb-4 text-center p-3 bg-danger-subtle rounded-3 border border-danger border-opacity-10">
                            <label className="small text-danger d-block fw-bold text-uppercase mb-1"
                                   style={{letterSpacing: '1px'}}>
                                Mức lương dự kiến
                            </label>
                            <h3 className="text-danger fw-bold mb-0">
                                {post.is_negotiable ? "Thỏa thuận" : post.salary_formatted}
                            </h3>
                        </div>

                        <h5 className="fw-bold mb-4 border-bottom pb-2">Thông tin liên hệ</h5>

                        <div className="d-flex flex-column gap-3 mb-4">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary-subtle text-primary p-2 rounded-3 me-3">
                                    <i className="bi bi-person-badge fs-5"></i>
                                </div>
                                <div>
                                    <small className="text-muted d-block">Người liên hệ</small>
                                    <span className="fw-bold">{post.contact?.name || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center">
                                <div className="bg-success-subtle text-success p-2 rounded-3 me-3">
                                    <i className="bi bi-telephone-fill fs-5"></i>
                                </div>
                                <div>
                                    <small className="text-muted d-block">Số điện thoại</small>
                                    <span className="fw-bold text-dark">{post.contact?.phone}</span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center">
                                <div className="bg-info-subtle text-info p-2 rounded-3 me-3">
                                    <i className="bi bi-envelope-fill fs-5"></i>
                                </div>
                                <div className="text-truncate">
                                    <small className="text-muted d-block">Email nhận hồ sơ</small>
                                    <span className="fw-bold text-break">{post.contact?.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-grid gap-2">
                            {post.author?.is_owner ? (
                                <>
                                    <Link
                                        to={`/posts/${post.id}/edit`}
                                        className="btn btn-primary fw-bold py-2 shadow-sm border-0"
                                        style={{background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)'}}
                                    >
                                        <i className="bi bi-pencil-square me-2"></i>Chỉnh sửa bài viết
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger fw-bold py-2"
                                        onClick={() => {
                                            if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
                                                // Gọi hàm xóa
                                            }
                                        }}
                                    >
                                        <i className="bi bi-trash me-2"></i>Xóa bài đăng
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-primary fw-bold py-2 shadow-sm border-0"
                                            style={{background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)'}}>
                                        <i className="bi bi-chat-dots me-2"></i>Gửi yêu cầu kết nối
                                    </button>
                                    <button className="btn btn-outline-secondary fw-bold py-2">
                                        <i className="bi bi-bookmark me-2"></i>Lưu tin đăng
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;