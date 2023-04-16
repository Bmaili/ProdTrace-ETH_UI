<template>
  <el-descriptions class="margin-top" descriptions="vertical" :column="1" border :label-style="LS">
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-cloudy"></i>
        备注
      </template>
      {{ (notes === undefined || notes === "") ? "无" : notes }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-cloudy"></i>
        辅助验证文件
      </template>
      <ul id="box">
        <li v-for="url in urls">
          <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :preview-src-list="urls">
          </el-image>
        </li>
      </ul>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-cloudy"></i>
        文件SHA256摘要
      </template>
      <p v-for="sha in SHA256List" class="sha256">
        <el-tag size="medium">{{ sha }}</el-tag>
      </p>
    </el-descriptions-item>
  </el-descriptions>
</template>


<script>
export default {
  name: "PicList",
  props: ["fileList", "notes"],
  data() {
    return {
      urls: [],
      SHA256List: [],
      LS: {
        'text-align': 'center',
        'width': '206px',
      }
    };
  },
  created() {
    this.getPictureUrl()
  },
  methods: {
    getPictureUrl() {
      for (let i = 0; i < this.fileList.length; i++) {
        this.urls.push(Object.values(this.fileList[i])[1]);
        this.SHA256List.push(Object.values(this.fileList[i])[0]);
      }
    }
  }
};
</script>

<style scoped>
#box li {
  text-decoration: none; /*去掉前面的圆点*/
  list-style: none;
  float: left;
  padding: 3px;
  margin-right: 15px;
  border: 1px solid #eee;
}
.sha256{
  margin:4px auto;
}
.el-tag{
  white-space: normal;
  height:auto;
}
</style>
