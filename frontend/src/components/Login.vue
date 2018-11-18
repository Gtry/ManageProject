<template>
<div class="Login" >
  <el-form :model="LoginAccount" :rules="rules" ref="LoginAccount" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="LoginAccount.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="LoginAccount.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>

    <el-row type="flex" class="row-bg" :gutter="20">
      <el-col :span="24">
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="loginSubmit" :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="resetForm">重置</el-button>-->
        </el-form-item>
        <span @click="logonSubmit">
          没有账号？马上<el-button type="text" abled>注册</el-button>
        </span>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>

<script>
  import { requestLogin } from '@/assets/js/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        LoginAccount: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      resetForm() {
        this.$refs.LoginAccount.resetFields();
      },
      loginSubmit(event) {
        this.$store.dispatch('UserLogout');
        this.$refs.LoginAccount.validate((valid) => {
          if (valid) {
            this.logining = true;
            var UserParams = { username: this.LoginAccount.username, password: this.LoginAccount.password };
            requestLogin(UserParams).then(res => {
              //NProgress.done();
              this.logining = false;
              if (res.status == 200) {
                this.$store.dispatch('UserLogin', res.token);
                this.$store.dispatch('UserName', res.username);
                this.$router.push({ path: '/main' });
              } else {
              }
            });
          } else {
            console.log('Error: invalid submit!');
            return false;
          }
        });
      },
      logonSubmit() {
        this.$router.push({ path: '/logon' });
      }
    }
  }

</script>

<style lang="scss" scoped>
.Login {
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>