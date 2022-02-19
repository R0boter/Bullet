import http from './http';

export const LoginApi = (model) => http.post('/login', model);

export const RegisterApi = (model) => http.post('/register', model);

export const DataListApi = (params) => http.get('/data', { params });

export const DataDelApi = (params) => http.delete('/data', { params });

export const DataEditApi = (model) => http.put('/data', model);

export const DataSearchApi = (model) => http.post('/data', model);
