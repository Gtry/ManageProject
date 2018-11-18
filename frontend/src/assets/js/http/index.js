// 倒入所有接口
import apiList from './interface'

const http = Vue => {
    if (http.installed) 
        return;
    http.installed = true;

    Object.defineProperties(Vue.prototype, {
        // 注意哦，此处挂载在 Vue 原型的 $api 对象上
        $api: {
            get() {
                return apiList
            }
        }
    })
};

export default http;
