<template>
  <el-upload
      action
      :http-request="uploadFile"
      list-type="picture-card"
      :file-list="alreadyFileList"
      :on-preview="handlePictureCardPreview"
      :limit="4"
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
import {getDept, updateDept, upPic} from "@/api/dept";
import user from "@/store/modules/user";

export default {
  props: ['deptId'],
  data() {
    return {
      // deptId: '',
      dialogImageUrl: '',
      dialogVisible: false,
      alreadyFileList: [],
      fileList: [],
      fileStr: ''
    };
  },
  created() {
    if (this.deptId === '') {
      this.deptId = user.state.deptId
    }
    getDept(this.deptId).then(res => {
      let str = res.data.picture;
      let list = str.split(',');
      if (list[0] !== '') {
        for (let i = 0; i < list.length; i++) {
          let file = {name: "", url: ""}
          file.url = list[i]
          this.fileList.push(file)
          this.alreadyFileList.push(file)
        }
      }
    })
  },
  methods: {
    //上传文件的事件
    uploadFile(item) {
      console.log("item是：")
      console.log(item)
      this.msgInfo('文件上传中........');
      let FormDatas = new FormData()
      FormDatas.append('file', item.file);
      upPic(FormDatas).then(res => {
        let newPic = {
          name: "",
          url: "",
          uid: item.file.uid
        }
        newPic.url = res.data.picPath
        this.fileList.push(newPic)
        this.updatePicStr()
      }).then(() => {
        return updateDept({deptId: this.deptId, picture: this.fileStr})
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
      this.updatePicStr()
      updateDept({deptId: this.deptId, picture: this.fileStr})
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    updatePicStr() {
      this.fileStr = ''
      for (let i = 0; i < this.fileList.length; i++) {
        let str = this.fileList[i].url
        this.fileStr += ',' + str
      }
      if (this.fileStr !== '') {
        this.fileStr = this.fileStr.slice(1)
      }
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
