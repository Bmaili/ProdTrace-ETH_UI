<template>
  <div id="app-container" class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-alert
              title="其所属的企业或角色"
              type="info"
              :closable="false">
          </el-alert>
        </div>
        <el-scrollbar>
          <el-tree class="my-tree"
                   :data="deptTreeOptions"
                   node-key="deptId"
                   :props="defaultProps"
                   :filter-node-method="filterNode"
                   default-expand-all
                   @node-click="handleNodeClick"
                   highlight-current
          />
        </el-scrollbar>
      </el-col>
      <!--操作员数据-->
      <el-col :span="20" :xs="24">
        <el-form :inline="true" label-width="68px">
          <el-form-item label="平台账号">
            <el-input
                v-model="queryParams.operatorId"
                placeholder="请输入平台账号"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="名称">
            <el-input
                v-model="queryParams.operatorName"
                placeholder="请输入操作员名称，支持模糊搜索"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select
                v-model="queryParams.status"
                placeholder="操作员状态"
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
          <el-form-item label="手机号码">
            <el-input
                v-model="queryParams.phone"
                placeholder="请输入手机号码，支持模糊搜索"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>

          <el-form-item label="更新时间">
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

        <el-table v-loading="loading" :data="operatorList" stripe
                  style="width: 100%">
          <el-table-column label="平台账号" align="center" prop="operatorId" width="100" fixed="left"/>
          <el-table-column label="姓名" align="center" prop="operatorName" width="100"/>
          <el-table-column label="角色" align="center">
            <el-tag size="small" slot-scope="scope">{{ roleOptions[scope.row.role - 1].dictLabel }}</el-tag>
          </el-table-column>
          <el-table-column label="所属企业" align="center" prop="deptName" width="180" show-overflow-tooltip>
            <a slot-scope="scope" style="color: dodgerblue" :href="'/deptInfo\/'+scope.row.deptId">{{ scope.row.deptName }}</a>
          </el-table-column>
          <el-table-column label="身份证号" align="center" prop="chineseId" width="180" show-overflow-tooltip/>
          <el-table-column label="性别" align="center">
            <template slot-scope="scope">{{ scope.row.sex == "0" ? "女" : "男" }}</template>
          </el-table-column>
          <el-table-column label="手机号码" align="center" prop="phone" width="130" show-overflow-tooltip/>
          <el-table-column label="电子邮箱" align="center" prop="email" width="170" show-overflow-tooltip/>
          <el-table-column label="更新时间" align="center" prop="createTime" width="160">
            <template slot-scope="scope">
              <span>{{ dateFormat(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="启用状态" align="center" fixed="right">
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.status"
                  active-value="0"
                  inactive-value="1"
                  @change="handleStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="150"
              class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                  v-if="scope.row.operatorId !== 1"
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
            <el-form-item label="平台账号" prop="operatorId">
              <el-input v-model="form.operatorId" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="operatorName">
              <el-input v-model="form.operatorName" placeholder="请输入操作员姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="chineseId">
              <el-input v-model="form.chineseId" placeholder="请输入身份证号" maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入操作员电子邮箱"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option
                    v-for="dict in sexOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                ></el-option>
              </el-select>
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
          <el-col :span="12">
            <el-form-item label="所属企业" prop="deptId">
              <el-select v-model="form.deptId" placeholder="请选择">
                <el-option
                    v-for="dict in deptOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                ></el-option>
              </el-select>
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
import {
  changeOperatorStatus,
  listOperator,
  getOperator,
  updateOperator,
  addOperator,
  delOperator
} from "@/api/operator";
import {treeselect,getOptionsList} from "@/api/dept";

export default {
  name: 'operator',

  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 操作员表格数据
      operatorList: null,
      title: "",
      // 部门树选项
      deptTreeOptions: [],
      // 是否显示弹出层
      open: false,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [{dictLabel: "正常", dictValue: "0"}, {dictLabel: "停用", dictValue: "1"}],
      // 性别状态字典
      sexOptions: [{dictLabel: "女", dictValue: "0"}, {dictLabel: "男", dictValue: "1"}],
      // 角色选项
      roleOptions: [{dictLabel: "生产商", dictValue: "1"},
        {dictLabel: "加工商", dictValue: "2"}, {dictLabel: "物流运输", dictValue: "3"},
        {dictLabel: "销售终端", dictValue: "4"}],
      //部门选项
      deptOptions: undefined,
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 8,
        operatorId: undefined,
        operatorName: undefined,
        phone: undefined,
        status: undefined,
        deptId: undefined,
        role: undefined,
        chineseId: undefined,
        sex: undefined,
        email: undefined
      },
      // 表单校验
      rules: {
        operatorName: [
          {required: true, message: "操作员姓名不能为空", trigger: "blur"}
        ],
        deptId: [
          {required: true, message: "归属部门不能为空", trigger: "blur"}
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        chineseId: [
          {
            required: true,
            pattern: /^[0-9]{18}$/,
            message: "请输入正确的身份证号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getTreeselect();
    this.getListselect();
  },
  methods: {
    // 查询部门选项
    getListselect() {
      getOptionsList({}).then(res => {
        this.deptOptions = res.data
      })
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(res => {
        this.deptTreeOptions = res.data
      })
    },
    // 日期清空
    handleDate(e) {
      if (e == null) {
        this.dateRange = []
      }
    },
    /** 查询操作员列表 */
    getList() {
      this.loading = true;
      listOperator(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.operatorList = response.rows;
            this.total = response.total;
            this.loading = false;
          }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.form = {};
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.form = {operatorId: "平台自动生成"};
      this.open = true;
      this.title = "添加用户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.form = {};
      getOperator(row.operatorId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.operatorId !== "平台自动生成") {
            updateOperator(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addOperator(this.form).then(response => {
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
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认删除名称为"' + row.operatorName + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delOperator(row.operatorId);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },

    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.deptId;
      this.queryParams.role = data.role;
      this.getList();
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 操作员状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.operatorName + '"操作员吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return changeOperatorStatus(row.operatorId, row.status);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function () {
        row.status = row.status === "0" ? "1" : "0";
      });
    }
  },
  /** 搜索按钮操作 */
  handleQuery() {
    this.queryParams.page = 1;
    this.getList();
  },


}
</script>

<style lang="scss">
.my-tree {
  max-height: 618px;
  display: inline-block;
  overflow: auto;
}
</style>
