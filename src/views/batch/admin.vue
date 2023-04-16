<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="批次号">
        <el-input
            v-model="queryParams.batchId"
            placeholder="请输入批次号"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="流程状态">
        <el-select
            v-model="queryParams.status"
            placeholder="最新流程状态"
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
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="batchList" stripe>
      <el-table-column label="溯源码(批次号)" prop="batchId" align="center"  />
      <el-table-column label="产品编号" prop="prodId" align="center" width="120"/>
      <el-table-column label="产品名称" prop="prodName" align="center" :show-overflow-tooltip="true" width="120"/>
      <el-table-column label="所属生产商" align="center" prop="deptName" width="230" show-overflow-tooltip>
        <a slot-scope="scope" style="color: dodgerblue" href="/index">{{ scope.row.deptName }}</a>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="createTime" width="160">
        <template slot-scope="scope">
          <span>{{ dateFormat(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最新流程" align="center" width="100">
        <el-tag size="small" slot-scope="scope" :type="scope.row.status==='0'?'success':scope.row.status==='2'?'info':'warning'">
          {{ statusOptions[Number(scope.row.status)].dictLabel }}
        </el-tag>
<!--        <template slot-scope="scope">{{ statusOptions[Number(scope.row.status)].dictLabel }}</template>-->
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-info"
              @click="getTrace(scope.row.batchId)"
          >详细
          </el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-picture-outline"
              @click="prShow(scope.row.batchId)"
          >扫码
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

    <el-dialog :title="prConfig.title" :visible.sync="prConfig.isShow" width="380px">
      <vue-qr :text="prConfig.text" :logoScale="40" :size="300" :logoSrc="prConfig.logo" >
      </vue-qr>
    </el-dialog>

  </div>
</template>
<script>
import {listBatch} from "@/api/batch";
import VueQr from 'vue-qr';

export default {
  components: {
    VueQr
  },
  data() {
    return {
      //二维码展示
      prConfig: {
        logo:require("@/assets/imgs/loginLogo.png"),//默认二维码中间图片
        text: undefined, //二维码内容,编码格式默认使用base64
        isShow: false,
        title:undefined
      },
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 产品批次表格数据
      batchList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 最新状态数据字典
      statusOptions: [{dictLabel: "刚生产", dictValue: "0"}, {
        dictLabel: "供应链中",
        dictValue: "1"
      }, {dictLabel: "在售", dictValue: "2"}],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 8,
        origin: undefined,
        destination: undefined,
        batchId: undefined,
        prodId: undefined,
        prodName: undefined,
        headBlock: undefined,
        createTime: undefined,
        status: undefined
      },
      // 表单参数
      form: {
        prodId: undefined,
        prodName: undefined,
        category: undefined,
        deptName: undefined,
        unit: undefined,
        operatorId: undefined,
        phone: undefined,
        operatorName: undefined,
        notes: undefined,
        fileList: []
      },
    };
  },
  created() {
    this.getList()
  },
  methods: {
    //展示二维码
    prShow(traceId){
      this.prConfig.text=process.env.VUE_APP_UI_URL + "/trace?traceId=" + traceId,
          this.prConfig.title="对应溯源码： "+ traceId;
      this.prConfig.isShow=true;
    },
    //查看流程溯源
    getTrace(traceId) {
      this.$router.push({name:'flow',params:{traceId:traceId}}).catch(error => error);
    },
    // 日期清空
    handleDate(e) {
      if (e == null) {
        this.dateRange = []
      }
    },
    /** 查询批次列表 */
    getList() {
      this.loading = true;
      listBatch(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.batchList = response.rows;
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
