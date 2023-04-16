<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24">

        <el-descriptions class="margin-top" title="企业详细信息" :column="2" border>
<!--          <template slot="extra">-->
<!--            <el-button type="primary" size="small">操作</el-button>-->
<!--          </template>-->
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              企业编号
            </template>
            {{ dept.deptId }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              角色
            </template>
            <el-tag size="small">{{ roleOptions[dept.role].dictLabel }}</el-tag>

          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              企业全称
            </template>
            {{ dept.deptName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              联系人
            </template>
            {{ dept.linkman }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              简称
            </template>
            {{ dept.shortName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              联系电话
            </template>
            {{ dept.linkphone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              营业执照号
            </template>
            {{ dept.license }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              税务登记证号
            </template>
            /
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              联系地址
            </template>
            {{ dept.address }}
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions class="margin-top" descriptions="vertical" :column="1" border :label-style="LS">
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
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

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              备注
            </template>
            {{ dept.notes }}
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
import {getDept} from "@/api/dept";
import user from "@/store/modules/user";

export default {
  name: "deptInfo",

  data() {
    return {
      dept: {},
      activeTab: 'deptInfo',
      // 角色选项
      roleOptions: [{dictLabel: "管理员", dictValue: "0"}, {dictLabel: "生产商", dictValue: "1"},
        {dictLabel: "加工商", dictValue: "2"}, {dictLabel: "物流运输", dictValue: "3"},
        {dictLabel: "销售终端", dictValue: "4"}],
      urls: [],
      LS: {
        'text-align': 'center',
        'width': '233px',
      }
    };
  },
  created() {
    let deptInfo = window.location.pathname.split('/')[2];
    if (deptInfo === undefined) {
      deptInfo = user.state.deptId
    }
    getDept(deptInfo).then(res => {
      this.dept = res.data
    },).then(() => {
      this.getPictureUrl()
    })
  },
  methods: {
    getPictureUrl() {
      let str = this.dept.picture;
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
