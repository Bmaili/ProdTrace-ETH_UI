<!--<template>-->
<!--  <el-container>-->
<!--    &lt;!&ndash; header部分 &ndash;&gt;-->
<!--    <el-header>-->
<!--      <Navbar></Navbar>-->
<!--    </el-header>-->
<!--    <el-container>-->
<!--      &lt;!&ndash; aside部分 &ndash;&gt;-->
<!--      <Sidebar></Sidebar>-->
<!--      <el-main>-->
<!--        &lt;!&ndash; main部分 &ndash;&gt;-->
<!--        <router-view/>-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--  </el-container>-->
<!--</template>-->

<template>
  <el-container>
    <Sidebar></Sidebar>
    <el-container>
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <el-main>
        <AppMain/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppMain from "@/layout/components/AppMain.vue";
import Navbar from "@/layout/components/Navbar.vue";
import Sidebar from "@/layout/components/Sidebar.vue";

export default {
  components: {
    AppMain,
    Navbar,
    Sidebar,
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.el-main {
  background-color: #f5f7f9;
}

.el-header,
.el-footer {
  background-color: white;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f1f1;
}

.el-container {
  height: 100%;
}
</style>
