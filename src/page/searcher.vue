<template>
  <div class="bg">
    <head-top></head-top>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="4">
        <div class="grid-content bg-purple-light">

      </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content" style="height: 800px;">
          <article-component v-for="item in tableData"
                             :title = item.title
                             :tag = item.tag
                             :date = item.date
                             :id = item._id

          ></article-component>
        </div>
        <el-pagination
          style="margin-top: 10px;"
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change = "handleCurrentChange"
          :page-size = "pageSize"
          :total="total">
        </el-pagination>
        <div class="foot">
          <foot-component></foot-component>
        </div>

      </el-col>
      <el-col :span="4">
        <div class="grid-content">



        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
    export default {
        name: "searcher.vue"
    }
</script>

<style scoped>

</style>
