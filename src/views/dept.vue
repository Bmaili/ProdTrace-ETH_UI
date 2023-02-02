<template>
  <div id="app-container" class="app-container">
    <el-row :gutter="20">
      <!--企业数据-->
      <el-col :xs="24">
        <el-form :inline="true" label-width="68px">
          <el-form-item label="编号">
            <el-input
                v-model="queryParams.deptId"
                placeholder="请输入企业编号"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="名称">
            <el-input
                v-model="queryParams.deptName"
                placeholder="请输入企业名称，支持模糊搜索"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="地址">
            <el-input
                v-model="queryParams.address"
                placeholder="请输入企业地址，支持模糊搜索"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="角色">
            <el-select
                v-model="queryParams.role"
                placeholder="企业角色"
                clearable
                size="small"
                style="width: 240px"
            >
              <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
                @input="handleDate"
                v-model="dateRange"
                size="small"
                style="width: 240px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd"
            >新增
            </el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="deptList" stripe
                  style="width: 100%">
          <el-table-column label="企业编号" align="center" prop="deptId" fixed="left" show-overflow-tooltip/>
          <el-table-column label="企业名称" align="center" prop="deptName" width="180" show-overflow-tooltip/>
          <el-table-column label="角色" align="center">
            <el-tag size="small" slot-scope="scope">{{ roleOptions[scope.row.role - 1].dictLabel }}</el-tag>
          </el-table-column>
          <el-table-column label="地址" align="center" prop="address" width="180" show-overflow-tooltip/>
          <el-table-column label="联系人" align="center" prop="linkman" width="100"/>
          <el-table-column label="联系电话" align="center" prop="linkphone" width="120" show-overflow-tooltip/>
          <el-table-column label="创建时间" align="center" prop="createTime" width="160">
            <template slot-scope="scope">
              <span>{{ dateFormat(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="180"
              class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-info"
                  @click="handleUpdate(scope.row)"
              >详细
              </el-button>
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="全称" prop="deptName">
              <el-input v-model="form.deptName" placeholder="请输入企业全称"/>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="简称" prop="shortName">
                <el-input v-model="form.shortName" placeholder="请输入企业简称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人" prop="linkman">
                <el-input v-model="form.linkman" placeholder="请输入企业联系人"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="联系电话" prop="linkphone">
              <el-input v-model="form.linkphone" placeholder="请输入企业联系电话"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执照号" prop="license">
              <el-input v-model="form.license" placeholder="请输入营业执照号"/>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="角色" prop="role">
                <el-select v-model="form.role" placeholder="请选择">
                  <el-option
                      v-for="dict in roleOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          <el-col>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入企业地址"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.notes" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="this.type!=='add'">
            <el-form-item label="资料上传">
              <upfile :deptId="this.form.deptId"></upfile>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {listDept, treeselect, getDept, delDept, addDept, updateDept} from "@/api/dept";
import Upfile from "@/components/upfile.vue";

export default {
  name: 'dept',
  components:{
    Upfile
  },

  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 企业表格数据
      deptList: null,
      title: "",
      // 是否显示弹出层
      open: false,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [{dictLabel: "生产商", dictValue: "1"}, {
        dictLabel: "加工商",
        dictValue: "2"
      }, {dictLabel: "物流运输", dictValue: "3"}, {dictLabel: "销售终端", dictValue: "4"}],
      // 性别状态字典
      sexOptions: [{dictLabel: "女", dictValue: "0"}, {dictLabel: "男", dictValue: "1"}],
      // 角色选项
      roleOptions: [{dictLabel: "生产商", dictValue: "1"},
        {dictLabel: "加工商", dictValue: "2"}, {dictLabel: "物流运输", dictValue: "3"},
        {dictLabel: "销售终端", dictValue: "4"}],
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 8,
        address: undefined,
        deptName: undefined,
        deptId: undefined,
        role: undefined
      },
      type:'',
      // 表单校验
      rules: {
        deptName: [
          {required: true, message: "企业名称不能为空", trigger: "blur"}
        ],
        license: [
          {required: true, message: "企业营业执照号不能为空", trigger: "blur"}
        ],
        address: [
          {required: true, message: "企业地址不能为空", trigger: "blur"}
        ],
        linkman: [
          {required: true, message: "企业联系人不能为空", trigger: "blur"}
        ],
        linkphone: [
          {
            required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询企业列表 */
    getList() {
      this.loading = true;
      listDept(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.deptList = response.rows;
            this.total = response.total;
            this.loading = false;
          }
      );
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    // 日期清空
    handleDate(e) {
      if (e == null) {
        this.dateRange = []
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.type='add'
      this.form = {deptId: "平台自动生成"};
      this.open = true;
      this.title = "添加企业";
    },
    handleUpdate(row) {
      this.type='update'
      this.form = {};
      getDept(row.deptId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改企业";
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认删除名称为"' + row.deptName + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delDept(row.deptId);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.deptId !== "平台自动生成") {
            updateDept(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addDept(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.form = {};
    },
  }
}
</script>

<style>
</style>
