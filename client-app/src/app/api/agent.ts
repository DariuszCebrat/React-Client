import axios, { AxiosError, AxiosResponse } from 'axios'
import { Activity, ActivityFormValues } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../store/store';
import { User, UserFormValues } from '../models/users';

// const sleep=(delay:number)=>{
//     return new Promise((resolve)=>{
//         setTimeout(resolve,delay);
//     })
// }
axios.interceptors.request.use(config=>{
    const token = store.commonStore.token;
    if(token && config.headers)config.headers.Authorization = `Bearer ${token}`;
    return config;
})
axios.interceptors.response.use(async response=>{
    //await sleep(1000);
    return response;
},(error:AxiosError)=>{
    const {data,status,config} = error.response as AxiosResponse;
    switch(status){
        case 400:
            if(config.method ==="get" && Object.prototype.hasOwnProperty.call(data.errors,"id"))
            {
                router.navigate("/not-found");
            }
            if(data.errors){
                const modalStateErrors=[];
                for(const key in data.errors)
                {
                    if(data.errors[key])
                    {
                        modalStateErrors.push(data.errors[key]);
                    }
                    throw modalStateErrors.flat();
                }
            } else{
                toast.error("this is bad request")
            }
            break;
        case 401:
            toast.error("unauthorized")
            break;
        case 403:
            toast.error("forbidden")
            break;
        case 404:
            router.navigate("/not-found");
            break;
        case 500:
            store.commonStore.setServerError({message:data,statusCode:status});
            router.navigate("/server-error");
            break;
    }
    return Promise.reject(error);
})
axios.defaults.baseURL='http://localhost:5182';
const responseBody = <T> (response:AxiosResponse<T>)=>response.data;
const requests = {
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:<T>(url:string,body:object)=>axios.post<T>(url,body).then(responseBody),
    put:<T>(url:string,body:object)=>axios.put<T>(url,body).then(responseBody),
    delete:<T>(url:string)=>axios.delete<T>(url).then(responseBody)
}
const Activities={
    list:()=>requests.get<Activity[]>('/Activities'),
    details:(id:string)=>requests.get<Activity>(`/Activities/${id}`),
    create:(activity:ActivityFormValues)=>requests.post<string>(`/Activities`,activity),
    update:(activity:ActivityFormValues)=>requests.put<void>(`/Activities/${activity.id}`,activity),
    delete:(id:string)=>requests.delete<void>(`/Activities/${id}`),
    attend:(id:string)=>requests.post<void>(`Activities/${id}/attend`,{})
}
const Account ={
    current:()=>requests.get<User>("/account"),
    login:(user:UserFormValues)=>requests.post<User>("/account/login",user),
    register:(user:UserFormValues)=>requests.post<User>("/account/register",user)
}
export const agent = {
    Activities,
    Account
}