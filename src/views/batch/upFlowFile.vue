<template>
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
</template>

<script>
import user from "@/store/modules/user";
import {upFlowFile} from "@/api/flow";

export default {
  nane: "upFlowFile",
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      fileStr: ''
    };
  },
  created() {
    if (this.deptId === '') {
      this.deptId = user.state.deptId
    }
  },
  methods: {
    getFileList() {
      let formFileList = []
      for (let i = 0; i < this.fileList.length; i++) {
        let file = {url: "", SHA256: ""}
        file.url = this.fileList[i].url
        file.SHA256 = this.fileList[i].SHA256
        formFileList.push(file)
      }
      this.fileList = []
      return formFileList
    },
    //上传文件的事件
    uploadFile(item) {
      this.msgInfo('文件上传中........');
      let FormDatas = new FormData()
      FormDatas.append('file', item.file);
      upFlowFile(FormDatas).then(res => {
        let newFile = {
          // name: "",
          url: "",
          SHA256: "",
          uid: item.file.uid
        }
        newFile.url = res.data.filePath
        newFile.SHA256 = res.data.SHA256
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

  }
}
</script>

<style>
</style>
