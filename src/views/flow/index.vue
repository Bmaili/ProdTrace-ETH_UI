<template>
  <div id='app'>
  <el-timeline v-for='item in compoList'>
      <el-timeline-item timestamp="2018/4/12" placement="top" type="success">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <component :is="compoMap[item-1].comp" :msg="dataInfo[item-1]"></component>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>


<script>
import Creater from "@/views/flow/creater.vue";
import Processer from "@/views/flow/processer.vue";

export default {
  name: 'flow',
  components: {
    Creater,
    Processer
  },
  data() {
    return {
      compoList: [],
      compoMap: [ {id: "1", comp: Creater}, {id: "2", comp: Processer}],
      dataInfo:[],
    }
  },
  methods: {

  },
  created() {
    this.compoList = ["1", "2", "1"];
    this.dataInfo=[{name:"周杰伦",phone:"18778324978",jzd:"广西桂林",notes:"学校",address:"广西省桂林市恭城瑶族自治区西岭想"},{}]
  }
}
</script>

<style>
</style>
