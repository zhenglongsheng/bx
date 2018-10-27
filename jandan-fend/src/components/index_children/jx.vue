<template lang="pug">
    .index_duanzi
        .duanzi(v-for="(item,index) in ListData" :key="index")
            .duanzi_header
                img(:src="item.photo")
                span {{item.author}}
            .duanzi_content
                |{{item.content}}
            .duanzi_action
                .action_left  
                    mu-button(color='blue', icon='',@click="SetLike('like',index,item.postid)")  {{item.like}}
                        mu-icon(value='thumb_up')
                    mu-button(color='red', icon='',@click="SetLike('unlike',index,item.postid)") {{item.unlike}}
                        mu-icon(value='thumb_down')

                .action_right   
                        mu-icon(value='view_headline'  @click="GetComment(index,item.postid)")
            .comment-list(v-if="isShowComment && index == clickSaveId")
                p --评论--
                .list(v-for="(items,indexs) in commentList")
                    h3 {{indexs+1}}:{{items.comment_author}}
                    span(v-html="items.comment_content")
                .hiddent_list
                    a(@click="GetComment()") 折叠
                mu-text-field(v-model='validateForm.usercomment', placeholder='最多不超过10个字符', :max-length='10' full-width='true' @change="SetComment(item.postid)" )

</template>

<script>
export default {
    mounted() {
    localStorage.setItem("name","zls"),
    localStorage.setItem("email","18855555@qq.com")
    this.GetIndexData()
  },
  data () {
    return {
      ListData:[],
      isShowComment: false,
       clickSaveId: null,
      HiddenOrShow: false ,//false 展现评论列表，true 收起列表
        validateForm: {
          usercomment: '',
        }
    }
  },
  methods:{
    SetComment(posid){
      if(localStorage.getItem("name") != null && localStorage.getItem("email") != null && this.validateForm.usercomment.length != 0) {
        this.$http.Post({
            url: '/SetPostcomment',
            par: {
              author:localStorage.getItem("name"),
              email:localStorage.getItem("email"),
              comment:this.validateForm.usercomment,
              postid:posid
            }
          }, (res) =>{
            if(res.data.status == 200){
              this.$toast.success({
                position: 'top',
                message: "评论发送成功!",
                
              })
            }
            this.validateForm.usercomment=null
          })
      }else{
        this.$toast.error({
            position: 'top',
            message: "未登录&信息不能为空!"
          })
      }
    },
  GetIndexData(){
    this.$http.Get({
      url:"/index",
      par:{
        page: 54
      }
    },(res)=>{
         this.ListData=res.data
    //   console.log(res)
    })
   }
   ,
  GetComment(id,postid){
      this.clickSaveId=id;
      if(this.HiddenOrShow){
          this.HiddenOrShow=false;
          this.isShowComment=false;
      }else{
          this.$http.Get({
            url: '/tucao',
            par: {
              postid: postid
            }
          }, (res) =>{
            this.commentList = res.data.tucao
            this.isShowComment = true
            this.HiddenOrShow = true
            console.log(commentList)
          })
      }
  
  
  },
  SetLike(action,id,pid){
          this.$http.Post({
            url: "/like",
            par: {
              postid: pid,
              type: action
            }
          },res =>{
          
            var status = JSON.parse(res.data.postid)
            if(status.error == 0){
              if(action == 'like'){
                this.ListData[id].like = parseInt(this.ListData[id].like) + 1
                this.$toast.success('点赞成功')
              }else {
                this.ListData[id].unlike = parseInt(this.ListData[id].unlike) + 1
                this.$toast.success('吐槽成功')
              }

            }else {
              this.$toast.error('你已经投过票了');
            }
          })
      }

      
  }
  
}
</script>

<style lang="less" scoped>
@import "../../assets/css/main.less";
@import "../../assets/css/page/jx.less";
</style>
