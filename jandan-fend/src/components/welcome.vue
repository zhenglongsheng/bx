<template lang="pug">
 .welcome 
    .welcome-top
        swiper(:options='swiperOption', ref='mySwiper')
            //- slides
            swiper-slide 
                img(src='../assets/img/qd1.png')
            swiper-slide
                 img(src='../assets/img/qd2.png')
            swiper-slide 
                img(src='../assets/img/qd3.png')
            //- Optional controls
            .swiper-pagination(slot='pagination')
    .welcome-bottom
         mu-flex.flex-demo(justify-content='center',align-items='center' direction='column') 煎蛋
            mu-button(flat='', color='secondary' @click="GoIndex") Secondary 

</template>
<script>
export default {
    mounted() {
        this.$parent.$data.IsShow=false,
        this.$parent.$data.IsfShow=false
    }, beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
     this.$parent.$data.IsShow=true,
     this.$parent.$data.IsfShow=true,
     next()
  },
    data(){
        return{
        message:"欢迎来到第一个爬虫",
        swiperOption: {
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods:{
        GoIndex(){
            this.$router.replace({path:'/index/jx'})
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/main.less";
@import "./../assets/css/page/welcome.less";
.swiper-container{
    height: 100%;
}
.swiper-wrapper{
    height: 100%;
}
</style>
