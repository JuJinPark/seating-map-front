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
  name: 'info',
  data: () => (
      {
   dialogVisible: true,
   status:'',
   message:'',
   jobName:'',
   routerPath:{
     login:{
       200:'/',
       400:'/login',
       500:'/login'
     },
     register:{
       200:'/',
       400:'/',
       403:'/login',
       500:'/'
     }
   }
  


  }),
   computed: {
    statusInKorean() {
       if(this.status==200){
          return this.jobName+'성공';
        }else{
          return this.jobName+'실패';
        }
    },
   },
  methods: {
     handleClose(done) {
       let path=this.routerPath[this.jobName][this.status]
       this.$router.push(path)
      },
      setStatus(num){
       
          this.status=num;
        
      },
      setMessage(msg){
      
          this.message=msg;
      
      },
       setJobName(jobName){
      
          this.jobName=jobName;
      
      },
      login(jobname,status){
        
        if(jobname=='login'&&status==200){
           this.$store.commit("setLoginFlag", true);
        }
        
      }
  },

  mounted() {
     this.setStatus(this.$route.query.STATUS)
     this.setMessage(this.$route.query.MSG)
     this.setJobName(this.$route.query.JOBNAME)
     this.login(this.$route.query.JOBNAME,this.$route.query.STATUS)


  }

}
</script>

