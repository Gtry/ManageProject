// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/index'

import Vuex from 'vuex'
// import store from '@/assets/js/store/index'
import store from '@/store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/assets/css/theme-green/index.css'
import '../static/css/iconfont/1.0.0/index.css' /* icofont*/
// icon
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  //components: { App },
  //template: '<App/>'
})
