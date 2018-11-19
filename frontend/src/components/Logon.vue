<template>
  <div class="Logon">
    <el-form :model="LogonAccount" :rules="rules" ref="LogonAccount" label-position="left" label-width="0px" class="demo-ruleForm logon-container">
      <h3 class="title">账号注册</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="LogonAccount.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="LogonAccount.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="LogonAccount.email" auto-complete="off" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input type="phone" v-model="LogonAccount.phone" auto-complete="off" placeholder="手机"></el-input>
      </el-form-item>

      <el-row type="flex" class="row-bg" :gutter="0">
        <el-col :span="24">
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="logonSubmit" :loading="logoning">注册</el-button>
            <!--<el-button @click="resetForm('LogonAccount')">重置</el-button>-->
          </el-form-item>
          <span v-on:click="loginSubmit">已有账号？马上<el-button type="text" abled>登录</el-button></span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>


<script>
  import { requestLogon } from '@/assets/js/api';
  export default {
    data() {
      return {
        logoning: false,
        LogonAccount: {
          username: '',
          password: '',
          email: '',
          phone: ''
        },
        rules: {
          username: [
            { required: true, message: "Please input your username:", trigger: 'blur' },
          ],
          password: [
            { required: true, message: "Please input your password:", trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      loginSubmit(event) {
        this.$router.push({ path: '/login' });
      },
      logonSubmit(event) {
        this.$refs.LogonAccount.validate((valid) => {
          if (valid) {
            this.logoning = true;
            var UserParams = { username: this.LogonAccount.username, password: this.LogonAccount.password, email: this.LogonAccount.email, phone: this.LogonAccount.phone };
            this.$store.dispatch('UserLogout');
            requestLogon(UserParams).then(res => {
              this.logoning = false;
              if (res.status === 200) {
                console.log(res.message);
                this.$router.push({ path: '/login' });
              } else {
                alert(res.message);
              }
            });
          } else {
            console.log('Error: invalid submit!');
            return false;
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
