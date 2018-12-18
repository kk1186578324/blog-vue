<template>
    <div>
      <el-card class="box-card">
        <div class="text item" @click="routerIndex(id)">
          <h2>{{title}}</h2>
          <b class="fa  fa-tags">{{tag.join(',')}}</b>
          <span class="fa  fa-clock-o date-box" >{{date}}</span>
        </div>
      </el-card>
    </div>
</template>

<script>
    export default {
      props:["title","tag","date","id"],
      data(){
        return{



        }
      },
      created(){
        // this.initData();
      },
      methods:{
        routerIndex(id){
          this.$router.push({path:"/detail",query:{id:id}})
        }

      }

    }
</script>

<style scoped>
  .text {
    cursor:pointer;
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 800px;
  }
  .date-box{
    margin-left:10px;
    font-size: 10px;
  }

</style>
