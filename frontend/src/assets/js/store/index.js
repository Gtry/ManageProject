import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// initialize use sessionStorage.getItem('token'),
// and that is not login after F5
const state = {
	token: window.sessionStorage.getItem('token'),
	username: ''
};

const mutations = {
	LOGOUT: (state) => {
		// clean token when logout
		state.token = null;
		window.sessionStorage.removeItem('token');
	},
	LOGIN: (state, data) => {
		state.token = data;
		window.sessionStorage.setItem('token', data);
	},
	USERNAME: (state, data) => {
		state.username = data;
		window.sessionStorage.setItem('username', data);
	}
};

const actions = {
	UserLogout({ commit }) {
		commit('LOGOUT');
	},
	UserLogin({ commit }, data) {
		commit('LOGIN', data);
	},
	UserName({ commit }, data) {
		commit('USERNAME', data);
	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions
});
