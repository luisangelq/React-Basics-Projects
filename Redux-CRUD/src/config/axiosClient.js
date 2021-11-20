import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/luisangelq/React-Basics-Projects/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;