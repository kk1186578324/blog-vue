<template>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="180"
          :formatter="formatter"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="option"
          label="操作">
          <template scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
         :current-page="currentPage"
         @current-change = "handleCurrentChange"
         :page-size = "pageSize"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        data(){
          return{
            tableData: [],
            total:0,
            currentPage:1,
            pageSize:5

          }

        },
      created(){

       this.initData();

      },
      methods:{
          //初始化列表
          initData(){
            axios.get("/article/list?status=all").then((res)=>{
              if(res.data.status==="1"){
                console.log(res)
                 this.total = res.data.content;
                 this.initPage();
              }
            })
          },
        handleCurrentChange(val){
          this.currentPage = val;
          this.initPage()

        },
        formatter(row, column){
            return row.tag.join(',')
        },
        //分页
         initPage(){
           var param = {
             page:this.currentPage,
             pageSize:this.pageSize,
             tag:"all"
           };
           axios.get("/article/page",{params:param}).then((res)=>{
             if(res.data.status==="1"){
               this.tableData = res.data.content;
             }
           })
         },
        handleEdit(index,row){
            this.$router.push({path:"addarticle",query:{articleId:row._id}})
        },
        handleDelete(index, row){
          this.$confirm('确认删除此数据？')
            .then(()=> {
              axios.get("/article/del?id="+row._id).then((res)=>{
                if(res.data.status==="1"){
                  this.initData()
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                }else if(res.data.status="1001"){
                  this.$message('暂无权限,请登录！');

                }
              })
            })

            .catch(()=> {

            });

        }





      }
    }
</script>

<style scoped>

</style>
