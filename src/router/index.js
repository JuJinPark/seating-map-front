import VueRouter   from 'vue-router'
import Vue from 'vue'

import Home from '../components/Batch'
import Login from '../components/Login'
// import RegisterInfo from '../components/RegisterInfo'
import Info from '../components/Info'
import LoginRegister from '../components/LoginRegister'
// import popup from '../components/'

Vue.use(VueRouter)


const router =  new VueRouter ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component : Home
        
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/loginRegister',
            name: 'LoginRegister',
            component: LoginRegister
        },
        {
            path: '/info',
            name: 'Info',
            component: Info
        },
        // {
        //     path: '/loginInfo',
        //     name: 'LoginInfo',
        //     component: LoginInfo
        // }


    ]

})  

export default router