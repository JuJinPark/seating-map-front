<template>
      
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data: () => ({
   hiworksLoginURL: axios.defaults.baseURL+'/login/hiworks',
   googleLoginURL: axios.defaults.baseURL+'/login/google',
   githubLoginURL: axios.defaults.baseURL+'/login/github',
  }),
 mounted() {
 this.$store.commit("setLoginFlag", false);

  }
}
</script>

<style>

</style>