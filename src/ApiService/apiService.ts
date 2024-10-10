import axious from 'axios';
import { TableRecord } from '../Types/types';

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

export const getAllTableRecords = async () => {
    const responce = await apiClient.get('/userdocs/get');    
    return responce;
}

export const createNewRecord = async (item: TableRecord) => {
    const responce = await apiClient.post('/userdocs/create', item);
    return responce;
}

export const deleteRecordById = async (id: string) => {
    const response = await apiClient.post(`/userdocs/delete/${id}`);    
    return response;
}

export const updateRecordById = async (item: TableRecord) => {
    const response = await apiClient.post(`userdocs/set/${item.id}`, item);    
    return response;
}