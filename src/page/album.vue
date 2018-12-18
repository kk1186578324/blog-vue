<template>
	<div>
    <!-- 操作按钮 -->
  <div id="all_user">
  <el-row :gutter="20">
  <el-col :span="2"><div class="grid-content bg-purple">
  	  <el-button type="primary" class="fa fa-image"  @click="dialogVisible = true">上传照片</el-button>
  </div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple"> <el-button type="primary" class="fa fa-address-book"  @click="addAlbumVisible = true">创建相册</el-button></div></el-col>  
</el-row>
  </div>
<!-- 相册卡片 -->
<div>
  <el-card class="box-card" v-for="item in listImage">

    <router-link :to="'imgList?imgId='+item._id"> 
    <div class="img-box">
      <img :src="require('../assets/img/'+(item.images[0]||'noImg.jpg'))"  alt="">
    </div>
    <div class="img-desc">
      <!-- {{item.images[0]}} -->
      {{item.albumName}}
     
    </div>
  </router-link>
  </el-card>
</div>

<!-- 上传图片 -->
<el-dialog
  title="上传图片"
  :visible.sync="dialogVisible"
  width="50%"
  height="60%"
  :before-close="handleClose">
  <el-row>
  <el-col :span="24">
  	<div class="grid-content bg-purple-dark">
  <el-select v-model="selectValue" size="mini" placeholder="选择相册">
    <el-option
      v-for="item in listImage"
      :key="item._id"
      :label="item.albumName"
      :value="item._id"
      size="mini"
      >
    </el-option>
  </el-select>

  </div>
  </el-col>
  </el-row>
  <el-row :gutter="20">
  <el-col :span="12" :offset="6"><div class="grid-content bg-purple">
  	  <el-upload
	    action="/album/upload"
      :http-request="httpRequest" 
	  list-type="picture-card"
	  :on-preview="handlePictureCardPreview"
	  :on-remove="handleRemove">
	  <i class="el-icon-plus"></i>
	  </el-upload>
	<el-dialog :visible.sync="dialogImgVisible">
	  <img width="100%" :src="dialogImageUrl" alt="">
	</el-dialog>  
  </div>
  </el-col>
</el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmUpload()">确 定</el-button>
  </span>
</el-dialog>

<!-- 创建相册-->
<el-dialog
  title="创建相册"
  :visible.sync="addAlbumVisible"
  width="40%"
  height="60%"
  :before-close="handleClose">
<el-form ref="albumForm" :model="albumForm" :rules="rules" label-width="80px">
  <el-form-item label="相册名称" prop="name">
    <el-input v-model="albumForm.name"></el-input>
  </el-form-item>
  <el-form-item label="相册描述" prop="desc">
    <el-input type="textarea" v-model="albumForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="addAlbumVisible = false">取 消</el-button>
    <el-button type="primary" @click="addAlbum('albumForm')">确 定</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogImageUrl: '',
        dialogImgVisible: false,
        addAlbumVisible:false,
        fileReader:'',
        fileList:[],
        listImage:[],
        albumForm:{
          name:"",
          desc:""
        },
       rules: {
        name: [
          {required: true, message: '请输入相册名', trigger: 'blur'},
        ]
      },
      selectValue:""

      };
    },
    created(){
     this.listAlbum()
     console.log()

      //  axios.post("/album/upload",{params:"hhh"}).then((res)=>{
      //   if(res.data.status==="1"){
      //     this.total = res.data.content;
      //     console.log(this.total)
      //   }else {
      //     this.$message.error(res.data.msg)
      //   }
      // })
    },
    methods: {
     httpRequest (options) {
      if(this.selectValue==="请选择相册"){
        return this.$message("请选择相册")
      }else{
        var albumId = this.selectValue
      }
      console.log(this.selectValue)
      let file = options.file
      let filename = file.name
      this.fileReader= new FileReader();
      if (file) {
        this.fileReader.readAsDataURL(file)
      }
     this.fileReader.onload = () => {
        let base64Str = this.fileReader.result
        let config = {
          url: '/albumList/upload',
          method: 'post',
          data: {
            base64Str: base64Str.split(',')[1],
            name: filename,
            albumId:albumId
          },
          onUploadProgress: function (progressEvent) {
          /*  console.log(progressEvent)
            progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
            options.onProgress(progressEvent, file)*/
          },
        }
        axios(config)
          .then(res => {
            options.onSuccess(res, file)
          })
          .catch(err => {
            options.onError(err)
          })
      }
    },
    //确认上传后刷新列表
    confirmUpload(){

         this.listAlbum()
         this.dialogVisible = false;

    },
    handleClose(done) {
       done()
    },

    listAlbum(){
      axios.get("/albumList/listAlbum").then((res)=>{
            if(res.data.status==="1"){
              this.listImage = res.data.content;
              console.log(res.data.content)
          }
      })
    },
      //创建相册
    addAlbum(formName){
      this.$refs[formName].validate((valid) => {
            if (valid) {
              var param = this.albumForm
              console.log(param)
              axios.post("/albumList/addAlbum",param).then((res)=>{
                if(res.data.status==="1"){
                  this.$refs["albumForm"].resetFields()
                      this.addAlbumVisible = false;
                      this.listAlbum()
                }else if(res.data.status==="2"){
                   this.$message(res.data.msg);
                }else{
                  this.$message(res.data.msg);
                }
              })

            } else {
              console.log('error submit!!');
              return false;
            }
          });

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  };
</script>


<style scoped>
  img{
    width: 100%;
    height: 100%
  }
  .dialog{
  	height: 60%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    margin:10px;
    width: 200px;
    height: 200px;
    display: inline-block;
  }
  .box-card .el-card__body{
    padding: 10px!important;
  }
  .img-box{
    width: 100%;
    height:90px;
  }
  .img-desc{
   position: relative;
   overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap;
   bottom: -60px;
   text-decoration:none!important; 
   color: black;
  }

</style>
