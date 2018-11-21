import axios from 'axios'
import store from '@/assets/js/store/index'
import router from '@/router'

// create axios object
var instance = axios.create({
    timeout: 60000,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
});

instance.defaults.withCredentials = true;
// instance.defaults.maxRedirects = 0;

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


/**
 * Created by Schon on 2018/9/13 0013.
 */
//设置cookie
/*
export function setCookie(key,value) {
  var exdate = new Date(); //获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 36500); //保存的天数，我这里写的是100年
  //字符串拼接cookie
  window.document.cookie = key + "=" + value + ";path=/;expires=" + exdate.toGMTString();
};
*/
//读取cookie
/*
export function getCookie(param) {
  var c_param = '';
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //再次切割
      //判断查找相对应的值
      if (arr2[0] == param) {
        c_param = arr2[1];
        //保存到保存数据的地方
      }
    }
    return c_param;
  }
};

export function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}
*/

//获取cookie
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 if (arr = document.cookie.match(reg))
  return (arr[2]);
 else
  return null;
}
 
//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + expiredays);
 document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
 
//删除cookie
export function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

export const requestLogon = data => {
    return axios.post(`/user/userLogon`, data).then(res => res.data).catch(err => console.log(err));
};

export const requestLogin = params => {
    return axios.get('/user/userLogin', { params: params }).then(res => res.data);
};

export const requestInfo = params => {
    return axios.post('/user/userInfo', { params: params }).then(res => res.data);
};

export const getSVNPathList = params => {
    return axios.get('/svn/getSVNPathList', { params: params }).then(res => res.data);
};

export const getSVNPathDetail = params => {
    return axios.get('/svn/getSVNPathDetail', { params: params }).then(res => res.data);
};
