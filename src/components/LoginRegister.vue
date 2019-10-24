<template>
<div class="app-body">
            <div class="login-container">
                <div class="login-content">
                    <h1 class="login-title">소셜 로그인 등록하기</h1>
                    <div class="social-login">
                    <a class="btn btn-block social-btn google" v-bind:href="googleLoginURL">
                     <img src="../assets/google_logo.png" alt="Google" />구글 등록하기</a>
                    <a class="btn btn-block social-btn github" v-bind:href="githubLoginURL">
                      <img src="../assets/github_logo.png" alt="Github" />Github 등록하기</a>
                   </div>
                   </div>
             </div>
 </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginRegister',
  data: () => ({
   googleLoginURL: axios.defaults.baseURL+'/register/google',
   githubLoginURL: axios.defaults.baseURL+'/register/github',
  }),

 
}
</script>

<style>
.login-container {
    text-align: center;
}


.login-content {
    background: #fff;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    border-radius: 2px;
    width: 500px;
    display: inline-block;
    margin-top: 30px;
    vertical-align: middle;
    position: relative;    
    padding: 35px;
    
}

.social-btn {
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 16px;
}

.social-btn img {
    height: 32px;
    float: left;
    margin-top: 10px;
}

.social-btn.google {
    margin-top: 7px;
}

.social-btn.facebook img {
    height: 24px;
    margin-left: 3px;
}

.social-btn.github img {
    height: 24px;
    margin-left: 3px;
}

.signup-link {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
}

.login-title {
    font-size: 1.5em;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 30px;
    color: rgba(0, 0, 0, 0.65);
}


.or-separator {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    position: relative;
    display: block;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 1em;
}

.or-text {
    position: absolute;
    left: 46%;
    top: 0;
    background: #fff;
    padding: 10px;
    color: rgba(0,0,0,.45);
}

.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 0 20px;
    font-size: 14px;
    border-radius: 4px;
    height: 45px;
    line-height: 45px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    -o-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    position: relative;
    color: rgba(0,0,0,.65);
    background-color: transparent;
    border-color: #e8e8e8;
    outline: none;
}
.btn-block {
    display: block;
    width: 100%;
}
body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 400;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: rgba(0,0,0,.80);
}
a {
    color: #2098f3;
    text-decoration: none;
    word-wrap: break-word;
    cursor: pointer;
}
</style>