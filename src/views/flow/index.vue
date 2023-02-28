<template>
  <div id='app'>
    <h2 v-if="Nothing">查询不到任何信息！</h2>
    <el-timeline v-for='(item,index) in compoList' :key='index'>
      <el-timeline-item :timestamp="flowDataList[index].vueTime" placement="top" type="success">
        <el-card>
          <p v-if="flowDataList[index].vueTime!==undefined">{{ flowDataList[index].操作人 }} 提交于
            {{ flowDataList[index].vueTime }}</p>
          <p v-else>系统自动生成</p>
          <component :is="item" :info="flowDataList[index]"></component>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>


<script>
import BaseInfo from "@/views/flow/baseInfo.vue";
import Create from "@/views/flow/create.vue";
import Process from "@/views/flow/process.vue";
import Transport from "@/views/flow/transport.vue";
import Sale from "@/views/flow/sale.vue";
import {getFlowTrace} from "@/api/flow";

export default {
  name: 'flow',
  components: {
    BaseInfo,
    Create,
    Process,
    Transport,
    Sale
  },
  data() {
    return {
      traceId: undefined,
      compoList: [],
      flowDataList: [],
      Nothing: false,
    }
  },
  methods: {
    clearList() {
      this.traceId = undefined
      this.compoList = []
      this.flowDataList = []
      this.Nothing = false
    },
    getFlowTraceInfo() {
      this.clearList()
      this.traceId = this.$route.params.traceId
      getFlowTrace(this.traceId).then(res => {
        let flowListStr = res.data;
        if (flowListStr.length === 0) {
          this.Nothing = true;
          return
        }
        for (let i = 0; i < flowListStr.length; i++) {
          let everyFlowObj = {};
          everyFlowObj = eval("(" + flowListStr[i] + ")");

          let key = Object.keys(everyFlowObj)[0];
          let value = Object.values(everyFlowObj)[0];
          if (key === "基本信息") {
            this.compoList.push(BaseInfo)
          } else if (key === "产品生产") {
            this.compoList.push(Create)
            value.vueTime = value.生产时间
          } else if (key === "产品加工") {
            this.compoList.push(Process)
            value.vueTime = value.加工时间
          } else if (key === "产品运输") {
            this.compoList.push(Transport)
            value.vueTime = value.登记时间
          } else if (key === "产品销售") {
            this.compoList.push(Sale)
            value.vueTime = value.上架时间
          }

          this.flowDataList.push(value);
        }
      })
    }
  },
  created() {
    this.getFlowTraceInfo()
  },
  watch: {
    $route(to, from) {
      if(to.path==="/flow"){
        this.getFlowTraceInfo()
      }
    }
  }
}
</script>

<style>
</style>
