import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.my_jobs.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

export default instance;