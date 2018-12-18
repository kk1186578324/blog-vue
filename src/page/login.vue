<template>
    <div>

      <head-top></head-top>

      <el-card class="box-card">
        <el-form ref="loginForm"  :rules="rules" :model="loginForm" label-width="80px">
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="loginForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button  style="width:280px" type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>

        </el-form>
      </el-card>

    </div>
</template>

<script>
  import headTop from "@/components/headTop"
  import axios from 'axios'
    export default {
      data(){
        return{
          loginForm:{
             name:'',
             password:''


           },
          rules: {
            name: [
              {required: true, message: '请输入用户名', trigger: 'blur'},

            ],
            password: [
              {required: true, message: '请输入密码', trigger: 'blur'}
            ],
          }


        }


      },



      components:{
        headTop


      },
      methods:{

        submitForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var param = this.loginForm

              axios.post("/user/login",param).then((res)=>{

                if(res.data.status==="1"){

                  this.$router.push({path:"/manage"})

                }
              })

            } else {
              console.log('error submit!!');
              return false;
            }
          });

        }
      }
    }
</script>

<style scoped>
 .box-card{
   width: 400px;
   height: 200px;
   position: absolute;
   top:50%;
   left: 50%;
   margin-top:-100px;
   margin-left:-200px;
 }
</style>
