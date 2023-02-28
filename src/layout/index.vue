<template>
  <el-container class="allBack">
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

.el-header,
.el-footer {
  box-sizing: border-box;
}

.el-container {
  height: 100%;
}
.allBack{
  background: linear-gradient(to right, rgb(201, 232, 197), rgb(191, 227, 241));

}
</style>
