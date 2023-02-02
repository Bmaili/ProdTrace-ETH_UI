<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="产品编号">
        <el-input
            v-model="queryParams.prodId"
            placeholder="请输入产品编号"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品名称">
        <el-input
            v-model="queryParams.prodName"
            placeholder="请输入产品名称，支持模糊搜索"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
            v-model="queryParams.status"
            placeholder="产品状态"
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
      <el-form-item label="类别">
        <el-select
            v-model="queryParams.category"
            placeholder="产品类别"
            clearable
            size="small"
            style="width: 240px"
        >
          <el-option
              v-for="dict in categoryOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
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
        <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
        >新增
        </el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="prodList">
      <el-table-column label="产品编号" prop="prodId"  align="center" width="120"/>
      <el-table-column label="产品名称" prop="prodName"  align="center" :show-overflow-tooltip="true" width="120"/>
      <el-table-column label="所属生产商" align="center" prop="deptName" width="230" show-overflow-tooltip>
        <a slot-scope="scope" style="color: dodgerblue" href="/index">{{ scope.row.deptName }}</a>
      </el-table-column>
      <el-table-column label="计量单位"  align="center" prop="unit" width="100"/>
      <el-table-column label="产品类别"  align="center" prop="category" :show-overflow-tooltip="true" width="160">
      <el-tag size="small" slot-scope="scope">{{categoryOptions[scope.row.category].dictLabel}}
      </el-tag>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="160">
        <template slot-scope="scope">
          <span>{{ dateFormat(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
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
  </div>
</template>

<script>
import {treeselect} from "@/api/dept";
import {changeProdStatus, listProd} from "@/api/products";

export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 产品表格数据
      prodList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [{dictLabel: "正常", dictValue: "0"}, {dictLabel: "停用", dictValue: "1"}],
      // 产品类别数据字典
      categoryOptions: [
        {dictLabel: "其它", dictValue: "0"},{dictLabel: "食品", dictValue: "1"}, {dictLabel: "家电", dictValue: "2"},
        {dictLabel: "电子用品", dictValue: "3"}, {dictLabel: "宠物用品", dictValue: "4"},
        {dictLabel: "玩具，游戏", dictValue: "5"}, {dictLabel: "运动，户外用品", dictValue: "6"},
        {dictLabel: "美容，个人护理", dictValue: "7"}, {dictLabel: "工具，家居，厨房用具", dictValue: "8"},
        {dictLabel: "服装，鞋子，珠宝", dictValue: "9"}, {dictLabel: "保健，家庭，婴儿护理", dictValue: "10"}],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prodName: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        prodName: [
          {required: true, message: "产品名称不能为空", trigger: "blur"}
        ],
        prodKey: [
          {required: true, message: "权限字符不能为空", trigger: "blur"}
        ],
        prodSort: [
          {required: true, message: "产品顺序不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(res => {
        this.deptOptions = res.data
        console.log(this.deptOptions)
      })
    },
    // 日期清空
    handleDate(e) {
      if (e == null) {
        this.dateRange = []
      }
    },
    /** 查询产品列表 */
    getList() {
      this.loading = true;
      listProd(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.prodList = response.rows;
            this.total = response.total;
            this.loading = false;
          }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {

    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd() {
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // getUser(row.userId).then(response => {
      //   this.form = response.data;
      //   this.form.postIds = response.postIds;
      //   this.form.roleIds = response.roleIds;
      this.open = true;
      this.title = "修改用户";
      //   this.form.password = "";
      // });
    },
    /** 提交按钮 */
    submitForm: function () {

    },
    /** 删除按钮操作 */
    handleDelete() {

    },
    // 节点单击事件s
    handleNodeClick(data) {
      this.queryParams.deptId = data.deptId;
      this.queryParams.role = data.role;
      console.log(data.deptId)
      console.log(data.role)
      this.getList();
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 产品状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.prodName + '"产品吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return changeProdStatus(row.prodId, row.status);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function () {
        row.status = row.status === "0" ? "1" : "0";
      });
    }
  },

};
</script>
