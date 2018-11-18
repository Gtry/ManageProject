import Vue from 'vue'
import Router from 'vue-router'
import store from '@/assets/js/store'

import Admittance from '@/components/Admittance'
import NotFound from '@/components/404'
import Logon from '@/components/Logon'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Main from '@/components/Main'
import PersonalSVN from '@/components/nav1/PersonalSVN'
import ModuleSVN from '@/components/nav1/ModuleSVN'
import AllSVN from '@/components/nav1/AllSVN'
import requestForPermissions from '@/components/nav2/requestForPermissions'
import about from '@/components/nav3/about'
import analysis from '@/components/analysis/analysis'

Vue.use(Router)

//export default new Router({
const router = new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      component: Admittance,
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '/logon',
      component: Logon,
      name: '',
      hidden: true
    },
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name: '权限查看',
      // 图标样式
      iconCls: 'el-icon-message',
      children: [
      	{ path: '/main', component: Main, name: '主页', hidden: true, meta: { requiresAuth: true } },
      	{ path: '/personal-svn', component: PersonalSVN, name: 'PersonalSVN', meta: { requiresAuth: true } },
      	{ path: '/module-svn', component: ModuleSVN, name: 'ModuleSVN', meta: { requiresAuth: true } },
      	{ path: '/all-svn', component: AllSVN, name: 'AllSVN', meta: { requiresAuth: true } },
      ],
      meta: {
      	requiresAuth: true
      }
    },
    {
      path: '/',
      component: Home,
      name: '权限申请',
      // 图标样式
      iconCls: 'fa fa-id-card-o',
      // 只有一个节点
      leaf: true,
      children: [
      	{ path: '/request-for-permissions', component: requestForPermissions, name: '', meta: { requiresAuth: true } },
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'analysis',
      // 图标样式
      iconCls: 'fa fa-id-card-o',
      // 只有一个节点
      leaf: true,
      children: [
      	{ path: '/analysis', component: analysis, name: '', meta: { requiresAuth: true } },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '关于',
      // 图标样式
      iconCls: 'fa fa-id-card-o',
      // 只有一个节点
      leaf: true,
      children: [
      	{ path: '/about', component: about, name: '' },
      ]
    },
    {
      path: '*',
      hidden: true,
    	redirect: { path: '/404' }
    }
  ]
});

router.beforeEach((to, from, next) => {
	// get token from store
	let token = store.state.token;
	if (to.meta.requiresAuth) {
		if (token) {
			next();
		} else {
			next({
				// after login, enter path of you wanted
				path: '/',
				query: { redirect: to.fullPath }
			});
		}
	} else {
    next();
  }
});

export default router;
