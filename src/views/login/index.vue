<template>
  <!-- 最外层的大盒子 -->
  <div class="bigBox">
    <div class="box" ref="box">
      <!-- 滑动盒子 -->
      <div class="pre-box">
        <h3 class="title">以太坊产品溯源系统</h3>
        <p>依托以太坊技术为产品流通各环节赋能</p>
        <p>过程记录、责任追溯、流向追踪、隐患识别...</p>
        <p>JOIN US!</p>

        <div class="img-box">
          <img src="../../assets/imgs/loginLogo.png" alt="" id="avatar"/>
        </div>
        <el-button
            class="pre-button"
            size="big"
            @click="MySwitch"
            round
        >
          <span id="buttonText">我是消费者，免登录溯源！</span>
        </el-button>

      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">消费者功能</h3>
        <el-form-item style="width:100%;"/>
        <el-form-item style="width:100%;"/>
        <el-form-item prop="username">
          <el-input
              type="text"
              auto-complete="off"
              prefix-icon="el-icon-search"
              clearable
              v-model:form="traceId"
              placeholder="请输入溯源码"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              round
              @click="handleQuery"
          >
            <span>溯 源</span>
          </el-button>
        </el-form-item>

        <el-form-item style="width:100%;"/>
        <el-form-item style="width:100%;"/>
        <el-form-item style="width:100%;"/>

        <el-form-item style="width:100%;">
          <el-button class="button-active"
                     :loading="loading"
                     size="medium"
                     style="width:48%; background-color: #c9e8c5; border: none;"
                     @click="feedback"
                     round
          >
            <span>反 馈</span>
          </el-button>
          <el-button class="button-active"
                     :loading="loading"
                     size="medium"
                     style="width:49%; background-color: #c9e8c5;border: none"
                     round
                     @click="help"
          >
            <span>帮 助</span>
          </el-button>
        </el-form-item>

      </el-form>

      <!-- 登录盒子 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">平台登录</h3>
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              prefix-icon="el-icon-user"
              clearable
              placeholder="账号"
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
            <img :src="codeUrl" @click="getCode"/>
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              round
              @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>

    </div>
    <div class="el-login-footer">
      <span>©2022-2023 NEU BGQ.</span>
    </div>
  </div>
</template>

<script>
import {getCodeImg} from "@/api/login";
import Cookies from "js-cookie";
import MySwitch from "@/utils/mySwitch";

export default {
  name: "login",
  data() {
    return {
      traceId:"",
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
          {required: true, trigger: "blur", message: "账号不能为空"}
        ],
        password: [
          {required: true, trigger: "blur", message: "密码不能为空"}
        ],
        code: [{required: true, trigger: "change", message: "验证码不能为空"}]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
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
    feedback(){
      this.$router.push({name:'userFeedback'}).catch(error => error);
    },
    help(){
      this.$router.push({name:'help'}).catch(error => error);
    },
    handleQuery() {
      this.$router.push({name:'trace',params:{traceId:this.traceId}}).catch(error => error);
    },
    MySwitch,
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
            Cookies.set("username", this.loginForm.username, {expires: 30});
            Cookies.set("password", this.loginForm.password, {expires: 30});
            Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
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
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
  user-select: none;
}

.login-form {
  /* 为其整体设置接近透明的效果*/
  background-color: rgba(255, 255, 255, 0.1);
  /* 设置box-shadow使其有立体感 */
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.2);
  border-radius: 26px;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-form-item__label {
    /* 给el-form组件的label标签颜色修改 */
    color: #FFFFFF;
  }

  .el-input__inner {
    /* 使input框的背景变透明 */
    background-color: transparent;
    /* 使边框也变透明 */
    border-color: transparent;
    /* 给边框加阴影能够使其有立体感 */
    box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.2);
    ///* 改变获取焦点后的竖线颜色 */
    //caret-color: rgba(0, 255, 255,0.8);
    color: #707070;
  }

  .el-input__inner:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }

  .el-input__inner:focus {
    border-color: rgba(0, 0, 0, 0.2);
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

/* 去除input的轮廓 */
input {
  outline: none;
}

.bigBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;

  overflow-x: hidden;
  ///* 渐变方向从左到右 */
  background: linear-gradient(to right, rgb(201, 232, 197), rgb(191, 227, 241));
}

/* 最外层的大盒子 */
.box {
  width: 800px;
  height: 400px;
  display: flex;
  /* 相对定位 */
  position: relative;
  z-index: 2;
  margin: auto;
  /* 设置圆角 */
  border-radius: 8px;
}

/* 滑动的盒子 */
.pre-box {
  /* 宽度为大盒子的一半 */
  width: 50%;
  height: 100%;
  /* 绝对定位 */
  position: absolute;
  /* 距离大盒子左侧为0 */
  left: 0;
  /* 距离大盒子顶部为0 */
  top: 0;
  z-index: 99;
  background-color: #c9e8c5;
  /* 动画过渡，先加速再减速 */
  transition: 0.5s ease-in-out;
  border-radius: 26px;
  padding: 25px 25px 5px 25px;
}

/* 滑动盒子的标题 */
.pre-box h1 {
  margin-top: 150px;
  text-align: center;
  /* 文字间距 */
  letter-spacing: 5px;
  color: white;
  /* 禁止选中 */
  user-select: none;
  /* 文字阴影 */
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 滑动盒子的文字 */
.pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 8px 0;
  /* 禁止选中 */
  user-select: none;
  font-weight: bold;
  color: #bfbfbf;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片盒子 */
.img-box {
  width: 100px;
  height: 100px;
  margin: 20px auto;
  /* 设置为圆形 */
  border-radius: 50%;
  /* 设置用户禁止选中 */
  user-select: none;
  overflow: hidden;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片 */
.img-box img {
  width: 100%;
  transition: 0.5s;
}

/* 登录和注册盒子 */
.login-form,
.register-form {
  flex: 1;
  height: 100%;
}

.pre-button {
  background: linear-gradient(to right, rgb(201, 232, 197), rgb(191, 227, 241));
  width: 100%;
  border: none
}
</style>
