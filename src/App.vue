<template>
<div id="app">

<Header>
 
</Header>

  <router-view class="container"/>

    
</div>
</template>

<script>
import Header from "./views/Header";
export default {
  name: "app",
  components: {
    Header
  },

//   computed: {
//     loading (){
//       return this.$store.getters.getLoading;
//     }
//   },
 created(){
    // this.$store.commit("setLoadingStatus", true);
  },

};
</script>

<style>
.container {
  margin-top: 83px;
}
</style>

