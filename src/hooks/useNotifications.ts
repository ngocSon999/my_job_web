import { useEffect } from 'react';
import { echo } from '../utils/echo';

export const useNotifications = (userId: number) => {
    useEffect(() => {
        // Lắng nghe kênh riêng tư của User
        const channel = echo.private(`App.Models.User.${userId}`)
            .notification((notification: any) => {
                console.log('Thông báo mới:', notification.message);
                // Ở đây bạn có thể dùng React Toastify để hiện popup
                alert(notification.message);
            });

        return () => {
            channel.stopListening('.notification');
        };
    }, [userId]);
};