/*
    通过mutation间接更新state的多个方法对象
*/
import {
    reqAddress,
    reqFoodCategory,
    reqShops,
    reqUserinfo
} from '../api/index'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO
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
    resetUserInfo({commit}){
        commit(RESET_USER_INFO)
    }   
}