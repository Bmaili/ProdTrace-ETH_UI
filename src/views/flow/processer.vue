<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24">

        <el-descriptions title="加工流程记录" direction="vertical" :column="4" border>
          <el-descriptions-item label="设备锁">三生三世</el-descriptions-item>
          <el-descriptions-item label="谁说的">235日35</el-descriptions-item>
          <el-descriptions-item label="居住我v给我地" :span="2">苏VS是多少州市</el-descriptions-item>
          <el-descriptions-item label="速速">
            <el-tag size="small">是SV</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">桂林市工程院自治区</el-descriptions-item>
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
  name: "processer",

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
