import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import {type PostItem } from '../views/post/MyPosts'; // Import interface đã export từ file MyPosts

// Định nghĩa interface cho PostDetail (có thêm trường contact và author)
interface PostDetail extends PostItem {
    content: string;
    is_negotiable: boolean;
    salary_min: number;
    salary_max: number;
    contact: {
        name: string;
        phone: string;
        email: string;
    };
    author: {
        id: number;
        is_owner: boolean;
    };
    views: number;
}

export const usePostDetailController = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPostDetail = async () => {
            if (!id) return;

            setLoading(true);
            try {
                // Ép kiểu cho api.get để TypeScript không báo lỗi
                const response = await api.get<{ data: PostDetail }>(`/posts/${id}`);

                // CỰC KỲ QUAN TRỌNG:
                // Theo JSON bạn gửi, dữ liệu thật nằm trong response.data.data
                setPost(response.data.data);

            } catch (error) {
                console.error("Lỗi khi lấy chi tiết bài đăng:", error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetail();
    }, [id]);

    return { post, loading };
};