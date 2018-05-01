import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rest-api-one.firebaseio.com/'
});

export default instance;