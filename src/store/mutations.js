/*
    直接给鞥新state的多个方法的对象
*/
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'
export default {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },
    [INCREMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) {
            Vue.set(food, 'count', 1)
            // 初始化的时候把数据添加进去
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state, { food }) {
        if (food.count) {
            food.count--;
            // 将food从cartFoods中移除
            if (food.count === 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [CLEAR_CART](state) {
        // 清除food中的count或者delete food.count
        state.cartFoods.forEach(food => food.count = 0);
        // 移除购物车中所有的购物项
        state.cartFoods = []
    },
    [RECEIVE_SEARCH_SHOPS](state,{ searchShops }) {
        state.searchShops = searchShops
    }
}