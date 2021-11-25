/*
    通过mutation间接更新state的多个方法对象
*/
import {
    reqAddress,
    reqFoodCategory,
    reqShops,
    reqUserinfo,
    reqLogout,
    reShopgGoods,
    regShopRatings,
    regShopInfo,
    reqSearchShops
} from '../api/index'
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
    async getAddress({ commit, state }) {
        // 异步发送请求
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqAddress(geohash);
        // 异步提交mutation
        if (result.code === 0) {
            const address = result.data;
            commit(RECEIVE_ADDRESS, { address })
        }
    },
    async getCategorys({ commit }) {
        // 异步发送请求
        const result = await reqFoodCategory();
        console.log('result', result);
        // 异步提交mutation
        if (result.code === 0) {
            const categorys = result.data;
            commit(RECEIVE_CATEGORYS, { categorys })
        }
    },
    async getShops({ commit, state }) {
        // 异步发送请求
        const { latitude, longitude } = state
        const result = await reqShops(longitude, latitude);
        // 异步提交mutation
        if (result.code === 0) {
            const shops = result.data;
            commit(RECEIVE_SHOPS, { shops })
        }
    },
    // 同步接收用户信息
    recUserInfo({ commit }, { userInfo }) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },
    // 异步获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUserinfo();
        if (result.code === 0) {
            const userInfo = result.data;
            commit(RECEIVE_USER_INFO, { userInfo })
        }
    },
    // 同步重置用户信息
    async resetUserInfo({ commit }) {
        const result = await reqLogout();
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }

    },
    // 获取商品信息
    async getShopGoods({ commit }, callback) {
        const result = await reShopgGoods();
        if (result.code === 0) {
            commit(RECEIVE_GOODS, { goods: result.data })
            callback && callback();
        }
    },
    // 获取评论信息
    async getShopRatings({ commit }, callBack) {
        const result = await regShopRatings();
        console.log('result', result);
        if (result.code === 0) {
            commit(RECEIVE_RATINGS, { ratings: result.data })
            callBack && callBack();
        }
    },
    // 获取商家信息
    async getShopInfo({ commit }, callBack) {
        const result = await regShopInfo();
        if (result.code === 0) {
            commit(RECEIVE_INFO, { info: result.data })
            callBack && callBack();
        }
    },

    // 更新food中的count
    updateFoodCount({ commit }, { isAdd, food }) {
        // 如果isAdd为true，表示增加，否则减少
        if (isAdd) {
            commit(INCREMENT_FOOD_COUNT, { food })
        } else {
            commit(DECREMENT_FOOD_COUNT, { food })
        }
    },

    // 同步清除购物车里面所有的数据
    clearCart({ commit }) {
        commit(CLEAR_CART)
    },

    // 异步获取搜索列表

    async getSearchShops({ commit, state }, keyword) {
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqSearchShops(geohash, keyword);
        if (result.code === 0) {
            const searchShops = result.data;
            console.log('searchShops', searchShops);
            commit(RECEIVE_SEARCH_SHOPS, { searchShops })
        }
    }
}