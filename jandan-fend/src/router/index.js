import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Welcome from '@/components/welcome'
import Jingxuan from '@/components/index_children/jx'
import Video from '@/components/index_children/video'
import Photo from '@/components/index_children/photo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'jx',
          name: 'jx',
          component: Jingxuan
        },
        {
          path: 'video',
          name: 'video',
          component: Video
        },
        {
          path: 'photo',
          name: 'photo',
          component: Photo
        }
      ]
    }
  ]
})
