<template>
<el-dialog
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span slot="title"><el-icon-info></el-icon-info>{{statusInKorean}}</span>
  <span>{{message}}</span>
</el-dialog>
</template>

<script>
export default {
  name: 'RegisterFail',
 data: () => (
      {
   dialogVisible: true,
   status:'',
   message:''


  }),
   computed: {
    statusInKorean() {
       if(this.status==200){
          return '성공';
        }else{
          return '실패';
        }
    },
   },
  methods: {
     handleClose(done) {
       if(this.status==403){
        this.$router.push('/login')
       }else{
         this.$router.push('/')
       }
        
      },
      setStatus(num){
       
          this.status=num;
        
      },
      setMessage(msg){
      
          this.message=msg;
      
      }
  },

  mounted() {
     this.setStatus(this.$route.query.STATUS)
     this.setMessage(this.$route.query.MSG)


  }
}
</script>

