<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24">

        <el-descriptions class="margin-top" title="运输流程记录" :column="2" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              运输商编号
            </template>
            {{ info.运输商编号 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              运输商全称
            </template>
            {{ info.运输商全称 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              操作人
            </template>
            {{ info.操作人 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              联系电话
            </template>
            {{ info.联系电话 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              身份证号
            </template>
            {{ info.身份证号 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              始发地
            </template>
            {{ info.始发地 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              目的地
            </template>
            {{ info.目的地 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              登记时间
            </template>
            {{ info.登记时间 }}
          </el-descriptions-item>
        </el-descriptions>
        <PicList :fileList="info.文件摘要列表" :notes="info.备注"></PicList>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24">
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PicList from "@/views/flow/picList.vue";

export default {
  name: "Transport",
  props: ['info'],
  components: {PicList},

  data() {
    return {};
  },
};
</script>

<style>
#box li {
  text-decoration: none; /*去掉前面的圆点*/
  list-style: none;
  float: left;
  padding: 3px;
  margin-right: 15px;
  border: 1px solid #eee;
}
</style>
