<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="反馈ID">
        <el-input
            v-model="queryParams.feedbackId"
            placeholder="请输入反馈ID"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="满意度">
        <el-select
            v-model="queryParams.eval"
            placeholder="选择用户满意度"
            clearable
            size="small"
            style="width: 240px"
        >
          <el-option
              v-for="dict in evalOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="反馈时间">
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
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="feedbackList" stripe>
      <el-table-column label="反馈ID" prop="feedbackId" align="center" width="140"/>
      <el-table-column label="反馈人姓名" prop="name" align="center" width="120"/>
      <el-table-column label="反馈人电话" prop="phone" align="center" width="140"/>
      <el-table-column label="标题" prop="title" align="center"  />
      <el-table-column label="反馈时间" align="center" prop="createTime" width="160">
        <template slot-scope="scope">
          <span>{{ dateFormat(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="满意度" align="center" width="100">
        <el-tag size="small" slot-scope="scope" :type="scope.row.eval==='2'?'danger':'success'">{{ evalOptions[Number(scope.row.eval)].dictLabel }}
        </el-tag>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-info"
              @click="getFeedback(scope.row.feedbackId)"
          >详细
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
import {delFeedback, listFeedback} from "@/api/feedback";

export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 表格数据
      feedbackList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 满意度选项字典
      evalOptions: [{dictLabel: "满意", dictValue: "0"}, {
        dictLabel: "良好",
        dictValue: "1"
      }, {dictLabel: "不满意", dictValue: "2"}],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 8,
        feedbackId: undefined,
        createTime: undefined,
        eval: undefined
      },
    };
  },
  created() {
    this.getList()
  },
  methods: {
    //查看反馈详情
    getFeedback(feedbackId) {
      this.$router.push("/feedbackInfo/" + feedbackId).catch(error => error);
    },
    // 日期清空
    handleDate(e) {
      if (e == null) {
        this.dateRange = []
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认删除反馈ID为"' + row.feedbackId + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delFeedback(row.feedbackId);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 查询反馈列表 */
    getList() {
      this.loading = true;
      listFeedback(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.feedbackList = response.rows;
            this.total = response.total;
            this.loading = false;
          }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
  },

};
</script>
