<template lang="pug">
//- mu-appbar(style="width: 100%;", color="primary")
//-   mu-button(icon="", slot="left")
//-     mu-icon(value="menu")
//-        Title  
//-   mu-button(flat="", slot="right") LOGIN
.var-bar-menu
    .scorll
        ul
            li
                 router-link(to="/index/jx") 精选
            li
                 router-link(to="/index/video")  视频
            li
                 router-link(to="/index/photo")  纯图
</template>
<script>
export default {
    
}
</script>
<style lang="less">
@import "../../assets/css/main.less";
@import "../../assets/css/page/navbar.less";
</style>
