<template>
  <div id="all_user">
    <vueWaterfallEasy :imgsArr="imgsArr" @scrollLoadImg="fetchImgsData">
    </vueWaterfallEasy>
  </div>
</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
 import getQueryString from 'getquerystring';
  import axios from 'axios';
export default {
  name: 'app',
  data() {
    return {
      imgsArr: [],
      fetchImgsArr: [],
      listImage:[]
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    // 假数据
    initImgsArr(n, m) { //num 图片数量

       let imgId =getQueryString()
       var arr = []
       console.log(imgId)

        axios.post("/albumList/imgList",imgId).then((res)=>{
            if(res.data.status==="1"){
              this.listImage = res.data.content.images;
              var imgArr =  res.data.content.images;
               for (var i = 0; i < this.listImage.length; i++) {
              arr.push({ id:i,src:require(`../assets/img/${imgArr[i]}`), link: 'https://www.baidu.com', info: '一些图片描述文字' })
            }
          }
      })

      return arr
    },

    fetchImgsData() {
      this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)
    },

    upLoadTicket(index){ //投票按钮
      console.log(index);
    }
  },
  created() {
    this.imgsArr = this.initImgsArr(0, 5)
    this.fetchImgsArr = this.initImgsArr(5, 10) // 模拟每次请求的新的图片的数据数据
  },

}

</script>
<style scoped>
#all_user{
  height: 800px;
}
</style>