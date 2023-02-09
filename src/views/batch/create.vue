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
        <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
        >新增批次
        </el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="batchList" stripe>
      <el-table-column label="溯源码(批次号)" prop="batchId" align="center" width="120"/>
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
      <el-table-column label="首个区块号" prop="headBlock" align="center" :show-overflow-tooltip="true" width="120"/>
      <el-table-column label="最新流程" align="center">
        <template slot-scope="scope">{{ statusOptions[Number(scope.row.status)].dictLabel }}</template>
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
            <el-form-item label="选择产品" prop="prodId">
              <el-select v-model="form.prodId" placeholder="请选择新增批次的产品" @change="selectProduct">
                <el-option
                    v-for="dict in productOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品编号" prop="prodId">
              <el-input v-model="form.prodId" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="prodName">
              <el-input v-model="form.prodName" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品类别" prop="category">
              <el-input v-model="categoryOptions[Number(form.category)].dictLabel" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="厂商编号" prop="deptId">
              <el-input v-model="form.deptId" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产商" prop="deptName">
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
            <el-form-item label="计算单位" prop="unit">
              <el-input v-model="form.unit" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量" prop="num">
              <el-input v-model="form.num" placeholder="请输入数量" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保质期" prop="quality">
              <el-input v-model="form.quality" placeholder="请输入保质期" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="源产地" prop="origin">
              <el-input v-model="form.origin" placeholder="请输入源产地" maxlength="11"/>
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
import {addCreateFlow} from "@/api/flow";
import user from "@/store/modules/user";
import {listProd} from "@/api/products";
import UpFlowFile from "@/views/batch/upFlowFile.vue";

export default {
  components: {
    UpFlowFile
  },
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
      // 可生产产品列表选项
      productOptions: [],
      // 可生产产品列表
      productList: [],
      // 最新状态数据字典
      statusOptions: [{dictLabel: "刚生产", dictValue: "0"}, {
        dictLabel: "供应链中",
        dictValue: "1"
      }, {dictLabel: "在售", dictValue: "2"}],
      // 产品类别数据字典
      categoryOptions: [
        {dictLabel: "其它", dictValue: "0"}, {dictLabel: "食品", dictValue: "1"}, {dictLabel: "家电", dictValue: "2"},
        {dictLabel: "电子用品", dictValue: "3"}, {dictLabel: "宠物用品", dictValue: "4"},
        {dictLabel: "玩具，游戏", dictValue: "5"}, {dictLabel: "运动，户外用品", dictValue: "6"},
        {dictLabel: "美容，个人护理", dictValue: "7"}, {dictLabel: "工具，家居，厨房用具", dictValue: "8"},
        {dictLabel: "服装，鞋子，珠宝", dictValue: "9"}, {dictLabel: "保健，家庭，婴儿护理", dictValue: "10"}],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 8,
        deptId: user.state.deptId,
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
        num: [
          {required: true, message: "数量不能为空", trigger: "blur"}
        ],
        origin: [
          {required: true, message: "源产地不能为空", trigger: "blur"}
        ],
        quality: [
          {required: true, message: "保质期不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList()
    this.getEnableCreateProds()
  },
  methods: {
    //查看流程溯源
    getTrace(traceId) {
      this.$router.push("/flow/" + traceId).catch(error => error);
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
      this.queryParams.deptId = user.state.deptId
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
    handleAdd() {
      this.selectProduct(0)
      this.open = true;
      this.title = "添加产品批次";
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.fileList = this.$refs.childFiliList.getFileList()
          addCreateFlow(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            } else {
              this.msgError(response.msg);
            }
          });
        }
      });
    },

    // 获取具有生产权利的产品列表
    getEnableCreateProds() {
      listProd({deptId: user.state.deptId, status: "0"}).then(res => {
        this.productList = res.rows
        for (let i = 0; i < this.productList.length; i++) {
          let op = {dictLabel: '', dictValue: ''}
          op.dictLabel = this.productList[i].prodName
          op.dictValue = this.productList[i].prodId
          this.productOptions.push(op)
        }
        this.selectProduct(0)
      })
    },

    selectProduct(value) {
      this.form = {}
      let prodInfo = this.productList[0];
      for (let i = 0; i < this.productList.length; i++) {
        if (value === this.productList[i].prodId) {
          prodInfo = this.productList[i];
          break;
        }
      }
      this.form.prodId = prodInfo.prodId
      this.form.prodName = prodInfo.prodName
      this.form.category = prodInfo.category
      this.form.unit = prodInfo.unit
      this.form.operatorId = user.state.userId
      this.form.operatorName = user.state.name
      this.form.phone = user.state.phone
      this.form.deptId = user.state.deptId
      this.form.deptName = user.state.deptName
      this.form.chineseId = user.state.chineseId.substring(0, 14) + "****"
    }
  },

};
</script>
