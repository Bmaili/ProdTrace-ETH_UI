<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24">

        <el-descriptions class="margin-top" title="基本信息记录" :column="2" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-cloudy"></i>
              溯源码
            </template>
            {{ info.溯源码 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-cloudy"></i>
              产品编号
            </template>
            {{ info.产品编号 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-cloudy"></i>
              产品名称
            </template>
            {{ info.产品名称 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-cloudy"></i>
              产品类别
            </template>
            {{ info.产品类别 }}
          </el-descriptions-item>
        </el-descriptions>

      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24">
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  name: "BaseInfo",
  props:['info'],
  data() {
    return {
    };
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
