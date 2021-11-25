/*
    入口文件
*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload';
import './filters'

import './mock/mockServer.js' // 加载mockServer.js即可
Vue.component(Button.name, Button);
Vue.use('http://at.alicdn.com/t/font_518606_6676bmcalnrhehfr.css')
Vue.use(VueLazyload, { //内部自动生成一个v-lazy指令
    loading: './dist/loading.gif'
})
new Vue({
    el: "#app",
    render: h => h(App),
    router,
    store
})