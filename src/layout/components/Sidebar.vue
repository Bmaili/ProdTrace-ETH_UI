<template>
  <div class="aside">
    <el-aside width="auto" class="header-logo tap">
      <img class="logo" src="@/assets/imgs/logo.png" alt="Logo" width="auto" height="auto"/>
    </el-aside>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :unique-opened="true" mode="vertical">
        <el-menu-item index="1" @click="goPage('index')">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="3" @click="goPage('operator')">
          <i class="el-icon-user-solid"></i>
          <span slot="title">操作员管理</span>
        </el-menu-item>
        <el-menu-item index="6" @click="goPage('dept')">
          <i class="el-icon-s-home"></i>
          <span slot="title">企业管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="goPage('product')">
          <i class="el-icon-s-goods"></i>
          <span slot="title">产品管理</span>
        </el-menu-item>
        <el-menu-item index="7" @click="goPage('deptInfo')">
          <i class="el-icon-s-home"></i>
          <span slot="title">企业详情</span>
        </el-menu-item>
        <el-menu-item  index="2" @click="goPage('order')">
          <i class="el-icon-s-order"></i>
          <span slot="title">订单列表</span>
        </el-menu-item>
        <el-menu-item  index="8" @click="goPage('profile')">
          <i class="el-icon-s-order"></i>
          <span slot="title">个人</span>
        </el-menu-item>
        <el-menu-item index="10" @click="goPage('logininfor')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">登录日志</span>
        </el-menu-item>
        <el-menu-item v-if="role==='0'" index="11" @click="goPage('operlog')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">操作日志</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "Sidebar",
  computed: {
    ...mapGetters([
      'role',
    ]),
  },
  data() {
    return {

    };
  },

  methods: {
    //跳转到某个导航页
    goPage(link) {
      this.$router.push("/" + link).catch(error => error);
    }
  }
};
</script>

<style scoped>
.el-row {
  height: 100%;
}
.el-aside{
  background-color: #f9f6f4;
}
.el-menu {
  border-right: none;
  background-color: #f9f6f4;
}
.aside{
  background-color: #f9f6f4;
}
.el-aside {
  border-right: 1px solid #f5f1f1;
}
</style>
