/*
    入口文件
*/ 

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.use('http://at.alicdn.com/t/font_518606_6676bmcalnrhehfr.css')
new Vue({
    el:"#app",
    render:h => h(App),
    router,
    store
})