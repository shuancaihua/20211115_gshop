/*
路由对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
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

export default new VueRouter({
    routes: [
        {
            path: '/msite',
            component: MSite,
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