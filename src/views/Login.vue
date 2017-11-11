<template>
    <div class="login-body">
        <el-form :model="loginForm" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input name="username" type="text" v-model="loginForm.username" auto-complete="on" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" type="password" v-model="loginForm.password" auto-complete="on" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
   export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loading: false,
        showDialog: false
      }
    },
    created() {
    },
    methods: {
      handleLogin() {
        if(this.loginForm.username == '') {
          this.$message({
            message: '请输入账号',
            duration: '2000',
            type: 'error'
          });
          return;
        }
        if(this.loginForm.password == '') {
          this.$message({
            message: '请输入密码',
            duration: '2000',
            type: 'error'
          });
          return;
        }
        requestLogin({
          'name': this.loginForm.username,
          'password': this.loginForm.password
        }).then(data => {
          if (!data.token) {
            return
          }
          window.sessionStorage.setItem('token', data.token)
          window.localStorage.setItem('token', data.token)
          window.localStorage.setItem('userName', data.name)
          this.$router.push({ path: '/main' })
        //   console.log(window.localStorage.token)
        });
      }
    },
    destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan);
    }
  }

</script>

<style lang="scss" scoped>
.login-body{
    width: 100%;
    height: 100%;
    background: #2d3a4b;
    overflow: hidden;
}
  .login-container {
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #eee;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>