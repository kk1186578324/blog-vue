<template>

  <div class="fill">
    <head-top></head-top>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-menu
        default-active="listArticle"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="listArticle">
          <i class="el-icon-location"></i>
          <span>文章列表</span>
        </el-menu-item>
        <el-menu-item index="addArticle">
          <i class="el-icon-document"></i>
          <span>添加文章</span>
        </el-menu-item>
        <el-menu-item index="draft">
          <i class="el-icon-menu"></i>
          <span>草稿</span>
        </el-menu-item>

        <el-menu-item index="account">
          <i class="el-icon-setting"></i>
          <span>账户</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" style="margin-top: 20px;">

      <router-view></router-view>

    </el-col>
  </el-row>


    <div class="foot">
      <foot-component></foot-component>
    </div>

  </div>



</template>

<script>
  import headTop from "@/components/headTop"
  import footComponent from "@/components/footComponent"
    export default {
      data(){
          return{

          }
      },
      components: {
        headTop,
        footComponent
      },
      computed: {
        defaultActive(){
          return this.$route.path.replace('/', '');
        }
      },
      methods:{
        handleClose(){

        },
        handleOpen(){

        }
      }
    }
</script>

<style scoped>
.fill{
  width: 100%;
  height:100%;
}
.foot{
  position: absolute;
  bottom: 0;
  left: 30%;
  text-align: center;
}
</style>
