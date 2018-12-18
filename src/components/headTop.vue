<template>
    <div class="head">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  router>
        <div class="head-image"><img src="../assets/img/head.jpg" alt=""></div>
        <el-menu-item index="index">博客</el-menu-item>
        <el-menu-item index="album">个人相册</el-menu-item>
        <el-menu-item index="message">留言</el-menu-item>
        <el-menu-item index="aboutme">关于我</el-menu-item>
        <div class="search-input">
          <el-select v-model="form.key" placeholder="搜索项" size="small" style="width: 100px;">
            <el-option label="标题" value="title"></el-option>
            <el-option label="标签" value="tag"></el-option>
          </el-select>
          <el-input v-model="form.value" size="small" style="width: 200px;"></el-input>
          <el-button size="small" @click="handleSelect({key:form.key,value:form.value})"  type="success">搜索</el-button>
        </div>
      </el-menu>

    </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';
  // import VueCropper from 'vue-cropper';
    export default {
      data() {
        return {
          crap: false,
          previews: {},
          activeIndex:'index',
          form:{
            key:"",
            value:""
          },


        }
      },
      created(){
        console.log(this.$store.state.key)
        console.log(this.$store.state.value)
      },
 /*     components:{
        // VueCropper
      },*/
      methods: {

        /*  ...mapMutations([
            'add',
            'reduce'
          ]),
          ...mapActions(['addAction','reduceAction']),*/



        handleSelect(value) {
          this.$store.commit('onSubmit',value)
          this.$emit('initData')
        }

    /*    onSubmit() {
          console.log(this.$store.state.key)
          console.log(this.$store.state.value)



             this.$emit("initData",this.form.value);

              console.log(this.form.key,this.form.value)
        }*/
      },

    }
</script>

<style scoped>
  .head-image img{
    width: 50px;
  }
  .head-image{
    display: inline-block;
    float: left;
    margin-top: 10px;
  }
 .search-input{
   margin-top: 15px;
 }
</style>
