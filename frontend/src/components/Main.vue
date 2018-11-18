<template>
	<section>
		<span @click="userInfo">
			Check User <el-button type="text" abled>Info</el-button>
		</span>
		<p>Username: {{ username }}</p>
		<p>Phone: {{ phone }}</p>
		<p>Email: {{ email }}</p>
	</section>
</template>


<script>
	import { requestInfo } from '@/assets/js/api';
	export default {
		data() {
			return {
				username: '',
				phone: '',
				email: ''
			}
		},
		methods: {
			userInfo(event) {
				this.username = sessionStorage.getItem('username');
				var TokenParams = { token: sessionStorage.getItem('token'), username: sessionStorage.getItem('username') };
				requestInfo(TokenParams).then(res => {
					console.log(res);
				});
			}
		}
	}
</script>


<style scoped>
	
</style>
