import axios, { AxiosError, AxiosResponse } from "axios";
import { config } from "process";
import { toast } from "react-toastify";
import { Post } from "../models/post";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { history } from './../../index';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config
})

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400: 
        if (typeof data === 'string') {
            toast.error(data)
        }
         if(config.method === 'get' && data.errors.hasOwnProperty('id')){
             history.push('/not-found')
         }
             if(data.errors){
                 const modalStateErrors = [];
                 for(const key in data.errors){
                     if(data.errors[key]){
                         modalStateErrors.push(data.errors[key])
                     }
                 } 
                 throw modalStateErrors.flat();
             } 
             break;
        case 401: 
            toast.error('Unauthorized');
            break;
        case 404: 
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('server-error');
            break;           
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests ={
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete(url).then(responseBody),
    publish: (url: string) => axios.put(url).then(responseBody), //do edycji

}

const Posts = {
    list: () => requests.get<Post[]>('/posts'),
    details: (id: string) => requests.get<Post>(`/posts/${id}`),
    create: (post: Post) => requests.post<void>('/posts', post),
    update: (post: Post) => requests.put<void>(`/posts/${post.id}`, post),
    delete: (id: string) => requests.del<void>(`/posts/${id}`),
    publish: (id: string) => requests.publish(`/posts/publish/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user) 
}



const agent = {
    Posts, 
    Account
}

export default agent;