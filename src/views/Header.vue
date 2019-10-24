<template>

<div class='header-wrap' >


  <H1 class='headerText' style="color: white; margin-left: 30px;">Seating Map System</H1>
  
<el-dropdown v-if=isLogin class='setting' size="default" split-button type="primary"  @command="handleCommand">
  <span icon='el-icon-setting'>설정</span>
  <el-dropdown-menu slot="dropdown" >
   <el-dropdown-item icon="el-icon-plus" command="loginRegister">소셜 로그인 등록</el-dropdown-item>
  </el-dropdown-menu>
  
</el-dropdown>
<el-button v-if=isLogin class='logout' type="text"  v-on:click="logout()">로그아웃</el-button>


</div>
  
</template>

<script>
export default {  
  name: 'HeaderSeat',
  data: () => (
      {
  
  }),
    methods: {
      logout(){
      this.$store.dispatch('logOut')
    },
      handleCommand(action){
      this.$router.push('/'+action)
      },

      },

    computed: {
     isLogin(){
      // return true;
     return this.$store.getters.getIsLogin;
     },
    }
   
};
</script>

<style>
.header-wrap {
  width: 100%;
  height: 80px;
  background: rgb(90, 135, 202);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  margin-bottom: 10px;
  line-height: 38px
}
.headerText{
    display: inline-block;
}
.logout {
  float: right;
line-height: 38px;
color: white
}
.setting{
  float: right;
    margin-right: 13px;
    vertical-align: middle;
    margin-top: 10px;
  
}


</style>