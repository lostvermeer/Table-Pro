import axious from 'axios';

const apiClient = axious.create({
    baseURL: 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs',
    headers: {
        'Content-Type': 'application/json' 
    }
});


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if(token) {
            config.headers['x-auth'] = token;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);

export const login = async (username: string, password: string) => {
    const responce = await apiClient.post('/login', {username, password});
    return responce.data;
}

export const getDataPage = async () => {
    const responce = await apiClient.get('/userdocs/get');
    return responce.data;
}