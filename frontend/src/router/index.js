import Vue from 'vue'
import Router from 'vue-router'
import Logon from '@/components/Logon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Logon',
      component: Logon
    }
  ]
})
