<template>
  <div class="aside">
    <el-aside width="auto" class="header-logo tap">
      <img class="logo" src="@/assets/imgs/logo.png" alt="Logo" width="auto" height="auto"/>
    </el-aside>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :unique-opened="true" mode="vertical">
        <el-menu-item index="0" @click="goPage('index')">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item  v-if="role==='0'" index="1" @click="goPage('operator')">
          <i class="el-icon-user-solid"></i>
          <span slot="title">操作员管理</span>
        </el-menu-item>
        <el-menu-item  v-if="role==='0'" index="2" @click="goPage('dept')">
          <i class="el-icon-s-home"></i>
          <span slot="title">企业管理</span>
        </el-menu-item>
        <el-menu-item  v-if="role==='0'" index="3" @click="goPage('product')">
          <i class="el-icon-s-goods"></i>
          <span slot="title">产品管理</span>
        </el-menu-item>
        <el-menu-item v-if="role==='0'" index="10" @click="goPage('batch/admin')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">溯源管理</span>
        </el-menu-item>
        <el-menu-item v-if="role==='1'" index="11" @click="goPage('batch/create')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">产品生产</span>
        </el-menu-item>
        <el-menu-item v-if="role==='2'" index="12" @click="goPage('batch/process')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">产品加工</span>
        </el-menu-item>
        <el-menu-item v-if="role==='3'" index="13" @click="goPage('batch/transport')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">产品运输</span>
        </el-menu-item>
        <el-menu-item v-if="role==='4'" index="14" @click="goPage('batch/sale')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">产品销售</span>
        </el-menu-item>
        <el-menu-item  index="20" @click="goPage('QueryTrace')">
          <i class="el-icon-search"></i>
          <span slot="title">溯源查询</span>
        </el-menu-item>
        <el-menu-item v-if="role==='0'" index="21" @click="goPage('QueryTrace')">
          <i class="el-icon-chat-dot-square"></i>
          <span slot="title">用户反馈</span>
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
