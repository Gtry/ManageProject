import axios from 'axios'
import store from '@/assets/js/store/index'
import router from '@/router'

// create axios object
var instance = axios.create({
    timeout: 60000,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
});

instance.defaults.withCredentials = true;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//Vue.prototype.$axios = axios;
/*
var instance = axios.create();
instance.defaults.timeout = 10000;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
*/

// request拦截器
instance.interceptors.request.use(
    config => {
        // if token exist, the http header need add token
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    }
    /*
    (err) => {
        return Promise.reject(err);
    }
    */
);

//响应拦截器即异常处理
instance.interceptors.response.use(
    response => {
        return response;
    }, 
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求'
                    break;
                case 401:
                    error.message = '未授权，请重新登录'
                    break;
                case 403:
                    error.message = '拒绝访问'
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源'
                    break;
                case 405:
                    error.message = '请求方法未允许'
                    break;
                case 408:
                    error.message = '请求超时'
                    break;
                case 500:
                    error.message = '服务器端出错'
                    break;
                case 501:
                    error.message = '网络未实现'
                    break;
                case 502:
                    error.message = '网络错误'
                    break;
                case 503:
                    error.message = '服务不可用'
                    break;
                case 504:
                    error.message = '网络超时'
                    break;
                case 505:
                    error.message = 'http版本不支持该请求'
                    break;
                default:
                    error.message = `连接错误${error.response.status}`
            }
            router.replace({
                path: "login",
                query: { redirect: route.currentRoute.fullPath }
            });
        } else {
            error.message = "连接到服务器失败"
        }
        message.error(error);
        return Promise.resolve(error.response);
    }
);

export const requestLogon = data => {
    return axios.post(`/user/userLogon`, data).then(res => res.data).catch(err => console.log(err));
};

export const requestLogin = data => {
    return axios.post(`/user/userLogin`, data).then(res => res.data);
};

export const requestInfo = data => {
    return axios.post(`/user/userInfo`, data).then(res => res.data).catch(err => console.log(err));
};

export const getSVNPathList = data => {
    return axios.post(`/svn/getSVNPathList`, data).then(res => res.data).catch(err => console.log(err));
};

