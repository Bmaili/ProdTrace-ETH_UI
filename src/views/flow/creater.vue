<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24">

        <el-descriptions title="生产流程记录" direction="vertical" :column="4" border>
          <el-descriptions-item label="用户名">{{msg.名字}}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{msg.phone}}</el-descriptions-item>
          <el-descriptions-item label="居住地" :span="2">{{msg.jzd}}</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small">{{msg.notes}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">{{msg.address}}</el-descriptions-item>
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
  name: "creater",
  props:['msg'],
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
