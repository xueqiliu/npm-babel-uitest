import axios from 'axios'
import apiPath from './api'

axios.defaults.baseURL = '/';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 40000;   //  在超时前，所有请求都会等待 40 秒

//配置请求拦截
axios.interceptors.request.use(config =>{
    return config
},err =>{
    alert('请求失败，请稍后再试');
    return Promise.reject(err);
});
// 配置响应拦截
axios.interceptors.response.use(response =>{    
    return response;
},error=>{   
    let message =  error.response ? (error.response.data.message ? error.response.data.message : error.message)  : '请求响应超时，请稍后再试';
    alert(message)
    return Promise.reject(error);
})

export default{
    get(url,obj){
        return axios.get(apiPath[url],{params:obj})
    },
    post(url,obj){
        return axios.post(apiPath[url],obj)
    }
}





