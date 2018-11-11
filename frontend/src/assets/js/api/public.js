import axios from 'axios';
import qs from 'qs'
import router from '@/router'

// 注意点,按照以下写
var instance = axios.create();
instance.defaults.timeout = 10000;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    fetchGet(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, params).then(res => {
                if(res.data.code === 302) {
                	router.push('/');
                }
                resolve(res.data);
            }).catch(error => {
                reject(error);
            })
        })
    },
    fetchPost(url, params = {}) {
        /*  
        axios post请求后端接收不到参数问题：
        */
        
        // 解决方案二：使用qs模块(axios中自带),使用qs.stringify()序列化params
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params)).then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error);
            })
        })
    }
}