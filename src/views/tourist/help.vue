<template>
  <div class="trace2">
    <div class="inner">
      <h1 style=" text-align: center;"> 帮助 </h1>
      <h3>待定： </h3>
      <p> 1.待定文本。 </p>

      <el-button size="medium"
                 type="info"
                 style="width:20%;float: right" round
                 @click="toIndex()"
      >返回
      </el-button>
    </div>

  </div>
</template>


<script>

export default {
  name: 'help',
  data() {
    return{

    }
  },
  methods: {
    toIndex() {
      this.$router.push("/").catch(error => error);
    },
  }
}
</script>

<style scoped>
.trace2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
  overflow-x: hidden;
  background: linear-gradient(to right, rgb(201, 232, 197), rgb(191, 227, 241));
}

p {
  margin: 20px auto
}

.inner {
  width: 60%;
  margin: 0px auto;
  /*min-height: 800px;*/

}
</style>
