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
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="getTrace(scope.row.batchId)"
          >查看
          </el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleAdd(scope.row)"
          >运输该批次
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

    <!-- 添加参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="厂商编号" prop="deptId">
              <el-input v-model="form.deptId" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运输商" prop="deptName">
              <el-input v-model="form.deptName" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作人" prop="operatorName">
              <el-input v-model="form.operatorName" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="chineseId">
              <el-input v-model="form.chineseId" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="form.phone" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登记时间">
              <el-input v-text="dateFormat(Date())" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="始发地" prop="origin">
              <el-input v-model="form.origin" placeholder="请输入始发地"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目的地" prop="destination">
              <el-input v-model="form.destination" placeholder="请输入目的地"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="notes">
              <el-input
                  type="textarea"
                  :rows="2"
                  maxlength="200"
                  placeholder="请输入内容(不超过200字符)"
                  v-model="form.notes">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="资料上传">
              <UpFlowFile ref="childFiliList"></UpFlowFile>
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
import {listBatch} from "@/api/batch";
import {addTransportFlow} from "@/api/flow";
import user from "@/store/modules/user";
import UpFlowFile from "@/views/batch/upFlowFile.vue";

export default {
  components:{UpFlowFile},
  data() {
    return {
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
      // 表单校验
      rules: {
        origin: [
          {required: true, message: "始发地不能为空", trigger: "blur"}
        ],
        destination: [
          {required: true, message: "目的地不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList()
  },
  methods: {
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
    /** 新增按钮操作 */
    handleAdd(row) {
      this.open = true;
      this.title = "添加物流运输流程";
      this.form.batchId = row.batchId
      this.form.prodId = row.prodId
      this.form.prodName = row.prodName
      this.form.operatorId = user.state.userId
      this.form.operatorName = user.state.name
      this.form.phone = user.state.phone
      this.form.deptId = user.state.deptId
      this.form.deptName = user.state.deptName
      this.form.chineseId = user.state.chineseId.substring(0, 14) + "****"
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.fileList = this.$refs.childFiliList.getFileList()
          const loading = this.$loading({
            lock: true,
            text: '数据上链中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          addTransportFlow(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            } else {
              this.msgError(response.msg);
            }
            loading.close();
          });
        }
      });
    },
  },

};
</script>
