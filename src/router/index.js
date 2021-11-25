/*
路由对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

// import MSite from '../pages/MSite/MSite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'

const MSite = () => import('../pages/MSite/MSite.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Search = () => import('../pages/Search/Search.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/shop/shop.vue'
import shopGoods from '../pages/shop/shopGoods/shopGoods.vue'
import shopRating from '../pages/shop/shopRating/shopRating.vue'
import shopInfo from '../pages/shop/shopInfo/shopInfo.vue'

// 声明使用插件
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


/**
 *  缓存路由组件对象和路由懒加载的区别
 *      - 缓存路由组件对象：是在浏览器端的内存里面，把组件对象缓存起来
 *      - 路由懒加载：是需要的时候才去后台请求这个路由组件的代码
 * */
export default new VueRouter({
    routes: [
        {
            path: '/msite',
            component: MSite,// 返回路由组件的函数，只有执行此函数才会加载路由组件，这个函数在请求对应的路由路径是才会执行
            meta: {
                showFooter: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/shop',
            component: Shop,
            children: [
                {
                    path: '/shop/goods',
                    component: shopGoods
                },
                {
                    path: '/shop/rating',
                    component: shopRating
                },
                {
                    path: '/shop/info',
                    component: shopInfo
                },
                {
                    path: '',
                    redirect: '/shop/goods'
                },

            ]
        },
        {
            path: '/',
            redirect: '/msite'
        }
    ]
})