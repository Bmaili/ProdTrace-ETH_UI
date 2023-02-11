<template>
  <div class="app-container">
    <el-form :inline="true" class="query">
      <el-form-item>
        <el-input
            v-model="traceId"
            placeholder="请输入溯源码"
            prefix-icon="el-icon-search"
            clearable
            size="small"
            style="width: 440px"
        />

      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>

export default {
  name: "QueryTrace",
  data() {
    return {
      traceId: ''
    }
  },
  methods: {
    handleQuery() {
      this.$router.push({name:'flow',params:{traceId:this.traceId}}).catch(error => error);
    }
  }
}
</script>

<style scoped>
.query {
  width: 50%;
  height: 50%;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
