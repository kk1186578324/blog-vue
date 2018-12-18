<template>
  <div>
    <head-top></head-top>
    <el-card class="box-card">
      <div class="head-box">
        <h2>{{tableData.title}}</h2>
        <b class="fa  fa-tags">{{tags.join(',')}}</b>
        <span class="fa  fa-clock-o date-box" style="margin-left: 10px">{{tableData.date}}</span>

      </div>
      <div class="content">

        <p v-html="tableData.content"></p>
      </div>


    </el-card>

    <div class="comment clearfloat">
      <div class="comment-head">
        <b>默认评论</b>
         <span style="color: red">({{tableData.comment.length}})</span>
        <div class="btn">
          <el-button size="mini" type="info" round>默认排序</el-button>
          <el-button size="mini" type="info" round>时间排序</el-button>
        </div>
      </div>
      <el-form ref="commentForm" :model="commentForm" :rules="rules" label-width="10px" style="margin-top: 10px;">
        <div class="man-img">
          <p class="man-head-wrap">
            <img src="../assets/img/man.png" alt="">
          </p>
        </div>
        <div class="comment-content clearfloat">
          <el-form-item prop="content">
            <el-input type="textarea" v-model="commentForm.content"
                      :autosize="{minRows: 4, maxRows: 6}"
            ></el-input>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain size="small" style="float: right"
                       @click="onSubmit('commentForm')">发布评论
            </el-button>
          </el-form-item>
        </div>


      </el-form>
      <div class="comment-man clearfloat" v-for="item in tableData.comment">

        <div class="man-img">
          <p class="man-head-wrap">
            <img src="../assets/img/man.png" alt="">
          </p>
        </div>
        <div class="comment-content">
          <p class="comment-time"><b>匿名</b></p>
          <div class="fmt"><p>{{item.content}}</p></div>
          <p class="content-back"><span>{{item.date}}</span><a href="javaScript:;">回复</a></p>
        </div>

      </div>


    </div>

    <div class="foot">
      <foot-component></foot-component>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import headTop from "@/components/headTop"
  import footComponent from "@/components/footComponent"

  export default {
    data() {
      return {

        tableData: {
          comment:""
        },
        tags: [],
        commentForm: {
          content:""
        },
        rules: {
          content: [
            {required: true, message: '请输入评论内容', trigger: 'blur'}
          ]
        }

      }

    },
    components: {
      headTop,
      footComponent
    },
    created() {
      this.initGetData()
    },
    methods: {
      initGetData() {
        var id = this.$route.query.id
        axios.get("/article/detail?id=" + id).then((res) => {
          if (res.data.status === "1") {
            this.tableData = res.data.content
            this.tags = this.tableData.tag
          }
        })
      },
      onSubmit(formName) {
        var id = this.$route.query.id;

        var param = {
          id:id,
          content :this.commentForm.content
        }
        this.$refs[formName].validate(async (valid) => {
          console.log(valid)
          if (valid) {
            axios.post('/article/comment', param).then((res) => {
              if (res.data.status === "1") {
                this.$message('评论成功！');
                this.initGetData()
              }
            })
          }

        })


      },
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    min-height: 800px;
    margin-left: 20%;
    width: 1000px;

  }

  .head-box {
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
  }
  .foot {
    margin-left: 20%;

  }

  .comment {
    margin-left: 20%;
    width: 1000px;
    margin-top: 10px;
  }

  .comment-head {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }

  .comment-head .btn {
    float: right;
  }

  .comment-man {
    margin-top: 10px;
  }

  .man-img {

    float: left;

  }

  .fmt {
    line-height: 1.6;
    font-size: 14px;
    color: gray;
    word-wrap: break-word;
  }

  .man-head-wrap {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
  }

  .comment-content {
    padding-left: 50px;
    border-bottom: 1px dashed #ccc;
  }

  .man-head-wrap img {
    width: 40px;
  }

  .comment-time b {
    color: #3abcff;
    font-size: 14px;
    vertical-align: middle;
  }

  .comment-time span {
    color: #ccc;
    font-size: 14px;
    margin-left: 10px;
    vertical-align: middle;
  }

  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }

  .clearfloat {
    zoom: 1
  }

  .content-back {
    font-size: 12px;
    color: #ccc;

  }

  .content-back span {
    margin-left: 10px;
  }

  .content-back a {
    font-size: 12px;
    color: #ccc;
    margin-left: 10px;
  }

</style>
