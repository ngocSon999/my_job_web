import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export interface PostItem {
    id: number;
    title: string;
    salary_formatted: string;
    created_at: string;
    human_time: string;
    status: string;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
}

const MyPosts: React.FC = () => {
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchMyPosts = async (page: number = 1) => {
        setLoading(true);
        try {
            // Laravel Resource trả về { data: [], meta: {}, links: {} }
            const response = await api.get<{ data: PostItem[], meta: PaginationMeta }>(`/posts/my-posts?page=${page}`);
            setPosts(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Lỗi fetch:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchMyPosts().then(r => console.log(r));
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;
        try {
            await api.delete(`/posts/${id}`);
            setPosts((prev) => prev.filter((p) => p.id !== id));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert("Lỗi xóa tin");
        }
    };

    if (loading && posts.length === 0) return <div className="p-5 text-center text-primary"><div className="spinner-border"></div></div>;

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark">Quản lý tin đăng</h3>
                <Link to="/post/create" className="btn btn-primary shadow-sm px-4">
                    <i className="bi bi-plus-circle me-2"></i>Đăng tin mới
                </Link>
            </div>

            <div className="card shadow-sm border-0 rounded-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light text-secondary">
                        <tr>
                            <th className="ps-4">Tiêu đề</th>
                            <th>Lương</th>
                            <th>Ngày đăng</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="ps-4">
                                    <div className="fw-bold text-dark">{post.title}</div>
                                    <div className="text-muted small"><i
                                        className="bi bi-clock me-1"></i>{post.human_time}</div>
                                </td>
                                <td className="text-primary fw-bold">{post.salary_formatted}</td>
                                <td className="text-muted">{post.created_at}</td>
                                <td className="text-end pe-4">
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link
                                            to={`/posts/${post.id}`}
                                            className="btn btn-sm btn-outline-info rounded-pill"
                                            title="Xem chi tiết"
                                        >
                                            <i className="bi bi-eye"></i>
                                        </Link>

                                        <Link
                                            to={`/posts/${post.id}/edit`}
                                            className="btn btn-sm btn-outline-primary rounded-pill"
                                            title="Sửa"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="btn btn-sm btn-outline-danger rounded-pill"
                                            title="Xóa"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {meta && meta.last_page > 1 && (
                <nav className="mt-4 d-flex justify-content-center">
                    <ul className="pagination shadow-sm">
                        {meta.links.map((link, index) => (
                            <li key={index}
                                className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => link.url && fetchMyPosts(Number(link.label) || meta.current_page)}
                                    dangerouslySetInnerHTML={{__html: link.label}}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default MyPosts;