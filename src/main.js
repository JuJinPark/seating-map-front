import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ko'

import 'normalize.css/normalize.css'
import '@/styles/index.scss'

import App from './App.vue';
import router from './router';
import axios from 'axios'
import store from './store';


import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css"


delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.prototype.$http = axios;
// const baseURL = 'http://103.55.190.20:8080';
 const baseURL = 'http://seat.gabia.com:8080';
if (typeof baseURL !== 'undefined') {
  axios.defaults.baseURL = baseURL;
}
axios.defaults.withCredentials = true
axios.interceptors.response.use(
  function(response) { return response;}, 
  function(error) {
      // handle error
      if (error.response.status==403) {
        store.commit("setLoginFlag", false);
        router.push({name : 'Login' })
        
      }
  });

Vue.use(ElementUI,{locale})
Vue.config.productionTip = false


// global.router = new VueRouter({
//   routes
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

