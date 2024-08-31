import axios, { AxiosResponse } from 'axios'
import { Activity } from '../models/activity';

const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay);
    })
}
axios.interceptors.response.use(async response=>{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
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
    create:(activity:Activity)=>requests.post<string>(`/Activities`,activity),
    update:(activity:Activity)=>requests.put<void>(`/Activities/${activity.id}`,activity),
    delete:(id:string)=>requests.delete<void>(`/Activities/${id}`)
}
export const agent = {
    Activities
}