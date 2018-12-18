<template>
<div class="share">
  <social-sharing inline-template>
    <div>
      <network network="weibo">
        <i class="fa fa-weibo"></i> 微博
      </network>
      <network network="whatsapp">
        <i class="fa fa-whatsapp"></i> 微信
      </network>
    </div>
  </social-sharing>
</div>
</template>

<script>
  import SocialSharing from 'vue-social-sharing';
    export default {
      data(){
        return{
          config:{
            url                 : '', // 网址，默认使用 window.location.href
            source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
            title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
            description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
            image               : '', // 图片, 默认取网页中第一个img标签
            sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
            disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
            wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
            wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
          }

        }
      },
      components:{
        SocialSharing
      },
      created(){
        this.share();
        // Vue.$root.$on('social_shares_open', function (network, url) {
        //   // your event code
        // });
      },
      methods:{

        share(){
          window._bd_share_config={
            "common":{
              "bdSnsKey":{},
              "bdText":"",
              "bdMini":"2",
              "bdPic":"",
              "bdStyle":"0",
              "bdSize":"16"
            },
            "share":{},
            "image":{
              "viewList": ["qzone","tsina","tqq","renren","weixin"],
              "viewText":"分享到：","viewSize":"16"
            },
            "selectShare":{
              "bdContainerClass":null,
              "bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]
            }
          };
        }

      }
    }
</script>

<style scoped>


</style>
