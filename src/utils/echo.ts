import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Khai báo thêm Pusher vào Window interface
declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

export const echo = new Echo({
    broadcaster: 'reverb',
    key: 'your-app-key',
    wsHost: 'localhost',
    wsPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});