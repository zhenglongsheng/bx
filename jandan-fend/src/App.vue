<template lang="pug">
  #app
    navbar(v-if="IsShow")  
    footer_b(v-if="IsfShow")
    router-view

</template>

<script>
import NavComponents from './components/tpl/navbar.vue'
import footer from './components/tpl/footer.vue'
// import theme from 'muse-ui/lib/theme';

// theme.use('dark');
// export default {
//   name: 'App'
// }
export default {
    data(){
      return{
        IsShow:true,
        IsfShow:true
      }
      
    },
    components:{
      navbar:NavComponents,
      footer_b:footer
    }
}
</script>

<style>

</style>
