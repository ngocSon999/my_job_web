import React from 'react';
import { Link } from 'react-router-dom';
import { usePostController } from '../../hooks/usePostController';

const PostList: React.FC = () => {
    const { posts, loading, pagination, fetchPosts } = usePostController();

    // Hàm xử lý khi người dùng nhấn chuyển trang
    const handlePageChange = (url: string | null) => {
        if (!url) return;
        // Trích xuất số page từ URL trả về của Laravel
        const urlParams = new URLSearchParams(new URL(url).search);
        const page = urlParams.get('page');
        if (page) {
            fetchPosts(parseInt(page));
            // Cuộn lên đầu trang khi chuyển trang
            window.scrollTo(0, 0);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Đang tìm kiếm việc làm tốt nhất cho bạn...</p>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="fw-bold text-dark">Việc làm mới nhất</h2>
                    <p className="text-muted mb-0">Tìm thấy {pagination?.total || 0} bài đăng phù hợp</p>
                </div>
            </div>

            <div className="row g-4">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div className="col-md-6 col-lg-4" key={post.id}>
                            <div className="card h-100 border-0 shadow-sm border-top border-primary border-3">
                                <div className="card-body p-4">
                                    <div className="mb-2">
                                        <span className="badge bg-primary-subtle text-primary small">
                                            {post.job_type}
                                        </span>
                                    </div>

                                    <h5 className="card-title fw-bold mb-3 text-truncate-2" style={{height: '3rem'}}>
                                        {post.title}
                                    </h5>

                                    <p className="text-muted small mb-4 text-truncate-3" style={{height: '4.5rem'}}>
                                        {post.content}
                                    </p>

                                    <div className="d-flex flex-column gap-2 mb-4">
                                        <div className="small text-dark">
                                            <i className="bi bi-cash-stack me-2 text-success"></i>
                                            <strong>Lương:</strong> {post.salary ? `${post.salary.toLocaleString()}đ` : 'Thỏa thuận'}
                                        </div>
                                        <div className="small text-muted text-truncate">
                                            <i className="bi bi-geo-alt me-2"></i>
                                            {post.contact_name}
                                        </div>
                                    </div>

                                    <Link to={`/posts/${post.id}`} className="btn btn-outline-primary w-100 fw-bold">
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <i className="bi bi-search fs-1 text-muted"></i>
                        <p className="mt-3">Không tìm thấy bài đăng nào.</p>
                    </div>
                )}
            </div>

            {pagination && pagination.last_page > 1 && (
                <nav className="mt-5">
                    <ul className="pagination justify-content-center">
                        {pagination.links.map((link: any, index: number) => (
                            <li key={index} className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}>
                                <button
                                    className="page-link shadow-none"
                                    onClick={() => handlePageChange(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default PostList;