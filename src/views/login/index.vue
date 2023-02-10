<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">以太坊产品溯源系统</h3>
      <el-form-item prop="username">
        <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            prefix-icon="el-icon-user"
            clearable placeholder="账号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          show-password
          clearable
          prefix-icon="el-icon-lock"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          clearable
          prefix-icon="el-icon-picture-outline"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>ETH © 2022-2023 write something.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";

export default {
  name: "login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        const data = res.data
        this.codeUrl = "data:image/gif;base64," + data.img;
        this.loginForm.uuid = data.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", this.loginForm.password, { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push("/");

            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/image/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  /* 为其整体设置接近透明的效果*/
  background-color: rgba(255,255,255,0.1);
  /* 设置box-shadow使其有立体感 */
  box-shadow: 5px 5px 0 0  rgba(0,0,0,0.2);
  border-radius: 26px;
  //background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  //.el-input {
  //  height: 38px;
  //  input {
  //    height: 38px;
  //  }
  //}
  .el-form-item__label{
    /* 给el-form组件的label标签颜色修改 */
    color: #FFFFFF;
  }

  .el-input__inner{
    /* 使input框的背景变透明 */
    //background-color: transparent;
    /* 使边框也变透明 */
    border-color: transparent;
    /* 给边框加阴影能够使其有立体感 */
    box-shadow: 2px 2px 0 0 rgba(0,0,0,0.2);
    ///* 改变获取焦点后的竖线颜色 */
    //caret-color: rgba(0, 255, 255,0.8);
    color:black;
  }

  .el-input__inner:hover{
    border-color: rgb(0, 255, 255);
  }

  .el-input__inner:focus{
    border-color: aqua;
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
