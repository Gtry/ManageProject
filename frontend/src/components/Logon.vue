<template>
  <p class="logon">
    <el-form :model="logonAccount" :rules="rules" ref="logonAccount" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">账号登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="logonAccount.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="logonAccount.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="logonAccount.email" auto-complete="off" placeholder="邮箱"></el-input>
      </el-form-item>

      <el-row type="flex" class="row-bg" :gutter="0">
        <el-col :span="24">
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="logonSubmit" :loading="logoning">注册</el-button>
            <!--<el-button @click="resetForm('logonAccount')">重置</el-button>-->
          </el-form-item>
          <span v-on:click="loginSubmit">已有账号？马上<el-button type="text" abled>登录</el-button></span>
        </el-col>
      </el-row>
    </el-form>
  </p>
</template>


<script>
  import { requestLogon } from '@/assets/js/api';
  export default {
    data() {
      return {
        logoning: false,
        note: {
          position:"absolute",
          top:"0px",
          left:"0px",
          width: "100%",
          height:"100%",
          backgroundImage: "url(" + require("@/assets/logo.png") + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        },
        logonAccount: {
          username: '',
          password: '',
          email: ''
        },
        rules: {
          username: [
            {
              required: true,
              message: "Please input your username:",
              trigger: 'blur'
            },
            {
              required: true,
              message: "Please input your username:",
              trigger: 'blur'
            },
          ]
        },
        checked: false
      };
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      loginSubmit(event) {
        return false;
      },
      logonSubmit(event) {
        this.$refs.logonAccount.validate((valid) => {
          if (valid) {
            this.logoning = true;
            var UserParams = {
              username: this.logonAccount.username,
              password: this.logonAccount.password,
              email: this.logonAccount.email
            };
            requestLogon(UserParams).then(res => {
              if (res.code === 200) {
                this.logoning = false;
                this.$router.push({ path: '/' });
              } else {
                console.log(res.message);
              }
            });
          } else {
            sessionStorage.setItem('user', JSON.stringify(user));
            this.$router.push({ path: '/' });
          }
        });
      }
    }
  }
</script>


<style lang="scss" scoped>
  .logon-container {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
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
