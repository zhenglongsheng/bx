<template lang="pug">
    mu-bottom-nav
        mu-bottom-nav-item(title='首页', icon='restore' href="#/index/jx")
        mu-bottom-nav-item(title='小说', icon='favorite' href="#/index/xs")
        mu-bottom-nav-item(title='我的', icon='location_on' href="#/index/me")

</template>
<script>
export default {
     
}
</script>
<style lang="less" scoped>
    .mu-bottom-nav{
        width: 100%;
        position: fixed;
        bottom: 0 ;
        left: 0;
        z-index: 19;
    }
</style>


