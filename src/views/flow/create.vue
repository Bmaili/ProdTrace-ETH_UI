<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24">

        <el-descriptions class="margin-top" title="生产流程记录" :column="2" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              生产商编号
            </template>
            {{ info.生产商编号 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              生产商全称
            </template>
            {{ info.生产商全称 }}
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
              计量单位
            </template>
            {{ info.计量单位 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              数量
            </template>
            {{ info.数量 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              源产地
            </template>
            {{ info.源产地 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              保质期
            </template>
            {{ info.保质期 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              生产时间
            </template>
            {{ info.生产时间 }}
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
  name: "Create",
  props: ['info'],
  components: {
    PicList
  },
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
