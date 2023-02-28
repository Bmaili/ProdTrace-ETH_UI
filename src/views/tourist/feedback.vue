<template>
  <div class="trace2">
    <div class="inner">
      <h1 style=" text-align: center;"> 反馈须知 </h1>
      <h3>一、该产品溯源网站设计目的： </h3>
      <p> 1.对溯源系统进行分析和研究，构建出符合我国国情的可溯源系统，实现全程信息的跟踪。 </p>
      <P> 2.快速提高产品质量安全监督及管理的效率。</P>
      <P> 3.让消费者随时随地的了解到所购买产品的信息，增长消费者的购买信心。</P>
      <h3>二、该信息反馈模块提供的服务：</h3>
      <p> 1.用户若在购买产品中发现产品质量安全问题或产品溯源信息错乱不匹配问题，可在此处投诉反馈。</p>
      <p> 2.用户若对平台发展建设有建议，或是对平台有其他评价，可在此处反馈。</p>
      <h3>三、产品信息反馈注意事项：</h3>
      <p> 1.用户应实事求是地反映问题。对捏造事实，进行诬告陷害的，依照有关规定严肃处理；构成犯罪的，移交司法机关处理。</p>
      <p> 2.提倡实名反馈，反馈人应当如实填写个人信息，以方便之后查验。</p>

      <el-button size="medium"
                 type="primary"
                 style="width:20%;" round
                 @click="agree()"
      >同意并继续
      </el-button>
      <el-button size="medium"
                 type="info"
                 style="width:20%;float: right" round
                 @click="toIndex()"
      >返回
      </el-button>
    </div>

    <!-- 添加参数配置对话框 -->
    <el-dialog title="用户反馈" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" maxlength="10"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="form.email" maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="居住地址" prop="address">
              <el-input v-model="form.address" maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="满意度" prop="eval">
              <el-radio v-model="form.eval" label="0">满意</el-radio>
              <el-radio v-model="form.eval" label="1">良好</el-radio>
              <el-radio v-model="form.eval" label="2">不满意</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="反馈信息" prop="info">
              <el-input
                  type="textarea"
                  :rows="4"
                  maxlength="800"
                  placeholder="请输入内容(不超过800字符)"
                  v-model="form.info">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="资料上传">
              <el-upload
                  action
                  :http-request="uploadFile"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :limit="4"
                  drag
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :on-exceed="limitMsg"
                  :on-remove="handleRemove"
                  accept=".png, .jpg, .jpeg">

                <i class="el-icon-plus"></i>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">确 定</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>

import {addFeedback, upPic} from "@/api/feedback";

export default {
  name: 'userFeedback',
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        eval: "2",
        name: undefined,
        phone: undefined,
        address: undefined,
        email: undefined,
        title: undefined,
        info: undefined,
        picture: undefined
      },
      open: false,
      // 表单校验
      rules: {
        eval: [
          {required: true, message: "满意度不能为空", trigger: "blur"}
        ],
        name: [
          {required: true, message: "姓名不能为空", trigger: "blur"}
        ],
        phone: [
          {
            required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        title: [
          {required: true, message: "标题不能为空", trigger: "blur"}
        ],
        info: [
          {required: true, message: "反馈内容不能为空", trigger: "blur"}
        ]
      },
    }
  },
  methods: {
    cancel() {
      this.open = false;
      this.clearForm();
    },
    clearForm() {
      this.form.eval = "2";
      this.form.name = undefined;
      this.form.phone = undefined;
      this.form.address = undefined;
      this.form.email = undefined;
      this.form.title = undefined;
      this.form.info = undefined;
      this.form.picture = undefined;
      this.fileList = [];
    },
    getPictureStr() {
      this.form.picture = ''
      for (let i = 0; i < this.fileList.length; i++) {
        let str = this.fileList[i].url
        this.form.picture += ',' + str
      }
      if (this.form.picture !== '') {
        this.form.picture = this.form.picture.slice(1)
      }
    },
    agree() {
      this.open = true
    },
    toIndex() {
      this.$router.push("/").catch(error => error);
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.getPictureStr()
          addFeedback(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            } else {
              this.msgError(response.msg);
            }
          });
        }
        this.clearForm()
      });
    },
    //上传文件的事件
    uploadFile(item) {
      this.msgInfo('文件上传中........');
      let FormDatas = new FormData()
      FormDatas.append('file', item.file);
      upPic(FormDatas).then(res => {
        let newFile = {
          url: "",
          uid: item.file.uid
        }
        newFile.url = res.data.picPath
        this.fileList.push(newFile)
      }).then(() => {
        this.msgSuccess("上传完成！");
      }).catch(() => {
        this.msgError("上传失败！")
      });
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter(function (item) {
        return item.uid !== file.uid
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    limitMsg() {
      this.msgError("最多不超过4个文件!")
    },
    beforeUpload(file) {
      // 定义能上传的文件格式
      var ext = file.name.substring(file.name.lastIndexOf('.') + 1);
      const isLtSize = file.size / 1024 / 1024 < 10;
      const extension = ext === 'jpg';
      const extension2 = ext === 'png';
      const extension3 = ext === 'jpeg';

      if (!extension && !extension2 && !extension3) {
        this.msgError('上传文件只能是 jpg/png/jpeg 格式!')
      }
      if (!isLtSize) {
        this.msgError('上传文件大小不能超过 10MB!')
      }
      return isLtSize && (extension || extension2 || extension3);
    }
  },
  created() {
  }
}
</script>

<style scoped>
.trace2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
  overflow-x: hidden;
  background: linear-gradient(to right, rgb(201, 232, 197), rgb(191, 227, 241));
}

p {
  margin: 20px auto
}

.inner {
  width: 60%;
  margin: 0px auto;
  /*min-height: 800px;*/

}
</style>
