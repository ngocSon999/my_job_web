import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export const usePostController = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<any>(null);

    // Sử dụng useCallback để hàm không bị tạo lại mỗi lần component re-render
    const fetchPosts = useCallback(async (page: number = 1) => {
        setLoading(true);
        try {
            const response = await api.get(`/posts?page=${page}`);

            setPosts(response.data.data);
            setPagination(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return {
        posts,
        loading,
        pagination,
        fetchPosts
    };
};