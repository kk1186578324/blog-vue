<template>
  <el-row class="tac" >
    <el-col :span="24" style="height:800px; background: white">
      <p style="border-bottom: 1px dashed #ccc;padding: 10px;">文章分类</p>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect">
        <el-menu-item index="all">
            <i class="el-icon-location"></i>
            <span slot="title">全部分类</span>
        </el-menu-item>
        <el-menu-item index="js">
          <img src="../assets/img/3997397795-5a6edc1c3167f_small.png" alt="" style="width: 20px;">
          <span slot="title">JavaScript</span>
        </el-menu-item>
        <el-menu-item index="html">
          <img src="../assets/img/html.png" alt="" style="width: 30px;">
          <span slot="title">Html</span>
        </el-menu-item>
        <el-menu-item index="css">
          <img src="../assets/img/css.png" alt="" style="width: 30px;">
        <span slot="title">Css</span>
      </el-menu-item>
        <el-menu-item index="node.js">
          <img src="../assets/img/node.png" alt="" style="width: 30px;">
          <span slot="title">Node.js</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>


</template>

<script>
  import {mapMutations} from 'vuex';
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // ...mapMutations(["onSubmit"])

      handleSelect(value) {

        this.$store.commit('onSubmit',{key:"tag",value})

        this.$emit('initData')

      }
    }
  }
</script>

<style scoped>

</style>
