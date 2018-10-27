<template lang="pug">
    .photo
        mu-container
            mu-flex(justify-content='center')
                mu-paper(:z-depth='1')
                mu-grid-list.gridlist-demo
                    mu-grid-tile(v-for="(item,index) in Listphoto" :key="index",cell-height='180')
                        img(:src='"http://img.hb.aicdn.com/"+item.file.key+"_fw658"')
        .mask dfsdfdfds

</template>
<script>
export default {
    mounted() {
        this.GetIndexData()
    },
    data(){
        return{
            Listphoto:[]
        }
    },
    methods:{
     GetIndexData(){
        this.$http.Get({
        url:"/picture"
        },(res)=>{
          this.Listphoto=res.data.pins
        //   console.log(this.Listphoto)
        //   console.log(this.Listphoto[5].file.key)
        })
      }
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/main.less";
.gridlist-demo{
    height: 100%;
    overflow-y: auto;
    margin-top: 33px !important;
}
.mu-grid-tile-titlebar-color{
    background: #ffff !important;
}
.mu-grid-tile img{
    width: 100%;
    z-index:15;
}

.mu-grid-list {   
   margin: 0px !important; 
}
.mask{
    width: 100%;
    height: 100%;
    background: #fff;
    z-index:999;
}
</style>


