<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user"/>
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <i class="el-icon-paperclip"></i>平台账号
                <div class="pull-right">{{ user.userId }}</div>
              </li>
              <li class="list-group-item">
                <i class="el-icon-user"></i>用户姓名
                <div class="pull-right">{{ user.name }}</div>
              </li>
              <li class="list-group-item">
                <i class="el-icon-postcard"></i>身份证号
                <div class="pull-right">{{ user.chineseId }}</div>
              </li>
              <li class="list-group-item">
                <i class="el-icon-office-building"></i>所属企业
                <a style="float: right !important; font-size: 1px ;color: dodgerblue" href="/deptInfo">{{
                    user.deptName
                  }}</a>
              </li>
              <li class="list-group-item">
                <i class="el-icon-location-information"></i>所属角色
                <el-tag size="small" class="pull-right">{{ roleOptions[user.role].dictLabel }}
                </el-tag>
              </li>
              <li class="list-group-item">
                <i class="el-icon-mobile-phone"></i>手机号码
                <div class="pull-right">{{ user.phone }}</div>
              </li>
              <li class="list-group-item">
                <i class="el-icon-message"></i>电子邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                <i class="el-icon-male"></i>性别
                <div class="pull-right">{{ user.sex === "0" ? "女" : "男" }}</div>
              </li>
              <li class="list-group-item">
                <i class="el-icon-date"></i>更新时间
                <div class="pull-right">{{ dateFormat(user.createTime) }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo  />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd  />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import user from "@/store/modules/user";

export default {
  name: "Profile",
  components: {userAvatar, userInfo, resetPwd},
  data() {
    return {
      user: {},
      activeTab: "userinfo",
      // 角色选项
      roleOptions: [{dictLabel: "管理员", dictValue: "0"}, {dictLabel: "生产商", dictValue: "1"},
        {dictLabel: "加工商", dictValue: "2"}, {dictLabel: "物流运输", dictValue: "3"},
        {dictLabel: "销售终端", dictValue: "4"}],
    };
  },
  created() {
    this.user = user.state
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.avatar-uploader-icon {
  font-size: 28px;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
</style>
