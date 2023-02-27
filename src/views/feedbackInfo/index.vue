<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24">

        <el-descriptions class="margin-top" title="用户反馈详细信息" :column="2" border>
<!--          <template slot="extra">-->
<!--            <el-button type="primary" size="small">操作</el-button>-->
<!--          </template>-->
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              反馈ID
            </template>
            {{ feedback.feedbackId }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              满意度
            </template>
            <el-tag size="small"  :type="feedback.eval==='2'?'danger':'success'">{{ evalOptions[Number(feedback.eval)].dictLabel }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              反馈人姓名
            </template>
            {{ feedback.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              反馈人电话
            </template>
            {{ feedback.phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              反馈人邮箱
            </template>
            {{ feedback.email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              反馈时间
            </template>
            {{ feedback.createTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              反馈人地址
            </template>
            {{ feedback.address }}
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions class="margin-top" descriptions="vertical" :column="1" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              反馈标题
            </template>
            {{ feedback.title }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              反馈内容
            </template>
            {{ feedback.info }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              资料上传
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
import {getFeedback} from "@/api/feedback";

export default {
  name: "feedbackInfo",

  data() {
    return {
      feedback: {},
      activeTab: 'feedbackInfo',
      // 满意度选项字典
      evalOptions: [{dictLabel: "满意", dictValue: "0"}, {
        dictLabel: "良好",
        dictValue: "1"
      }, {dictLabel: "不满意", dictValue: "2"}],
      urls: []
    };
  },
  created() {
    let feedbackId = window.location.pathname.split('/')[2];
    getFeedback(feedbackId).then(res => {
      this.feedback = res.data
    },).then(() => {
      this.getPictureUrl()
    })
  },
  methods: {
    getPictureUrl() {
      let str = this.feedback.picture;
      this.urls = str.split(',');
    }
  }
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
