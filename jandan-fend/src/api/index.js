import Vue from 'vue'
import axios from 'axios'
import Toast from 'muse-ui-toast'

import Loading from 'muse-ui-loading'
import 'muse-ui-loading/dist/muse-ui-loading.css'
Vue.use(Loading)
Vue.use(Toast)


axios.defaults.baseURL = 'http://127.0.0.1';
axios.defaults.timeout = 3000;
// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // loading
//   // 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   switch (response,status) {
//     case 200:
//       // loading.close();
//       return response;
//       break;
  
//     default:
//       break;
//   }

//   return response
  
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

  export default{
      Get(params,callback){
        axios.get(params.url, {
            params:params.par
          })
          .then( (success) =>{
            callback(success)
            // console.log(success);
          })
          .catch( (error)=> {
            console.log(error);
          });
      },

      Post(params,callback){
        axios.post(params.url,params.par)
        .then(success => {
          callback(success);
          console.log(success);
        })
        .catch(error => {
          console.log(error);
        });
      }


  }