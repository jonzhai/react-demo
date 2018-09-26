import axios from 'axios';
import {store} from 'src/index';
// let state = store.getState();


const API_ROOT =  process.env.NODE_ENV === "development" ? "/api/carProject" : "/carProject"
console.log(store, API_ROOT)
const http = axios.create({
    baseURL: API_ROOT,
    crossDomain: true,
    withCredentials: true
})

// http.interceptors.request.use(
//     config => {
//         if (state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.Authorization = `${state.token}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// )
// http.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 返回 401 清除token信息并跳转到登录页面
//                     store.dispatch('LOGOUT');
//                     router.replace({ path: '/login' });
//                     alert('登录失效，请重新登录！');
//                     break;
//                     // case 500:
//                     //     alert(`服务器发生错误！即将跳转到首页`);
//                     //     router.replace({ path: '/home' });
//             }
//         }
//         return Promise.reject(error.response.data) // 返回接口返回的错误信息
//     });

    export default http;