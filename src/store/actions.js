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
    regShopInfo
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
    DECREMENT_FOOD_COUNT
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
    async getShopRatings({ commit }) {
        const result = await regShopRatings();
        if (result.code === 0) {
            commit(RECEIVE_RATINGS, { ratings: result.data })
        }
    },
    // 获取商家信息
    async getShopInfo({ commit }) {
        const result = await regShopInfo();
        if (result.code === 0) {
            commit(RECEIVE_INFO, { info: result.data })
        }
    },


    // 获取商家信息
    addIncrementFoodCount({ commit }, { isAdd, food }) {
        // 如果isAdd为true，表示增加，否则减少
        if (isAdd) {
            commit(INCREMENT_FOOD_COUNT, { food })
        } else {
            commit(DECREMENT_FOOD_COUNT, { food })
        }
    },
}