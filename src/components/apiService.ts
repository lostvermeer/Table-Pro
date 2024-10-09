import axious from 'axios';

interface TableRecord {
    id: string;
    employeeSignatureName: string;
    employeeSigDate: string;
    employeeNumber: string;
    documentType: string;
    documentStatus: string;
    documentName: string;
    companySignatureName: string;
    companySigDate: string;
  }

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