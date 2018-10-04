import Vue from 'vue';
import Vuex from 'vuex';
import charts from './echartsarr.js';
Vue.use(Vuex);
const state = {
    month: beforeMonth(),
    chartsArr: charts,
    systemType: validataOS(),
    module: process.env.NODE_ENV === 'development' ? 'dev' : 'devno'

};
const getters = {
    month(state) {
        return state.month;
    },
    chartsArr() {
        return state.chartsArr;
    },
    module(state) {
        return state.module;
    },
    systemType() {
        return state.systemType;
    }
};
const mutations = {
    setMonth(state, param) {
        state.month = param;
    },
    setCharts(state, param) {
        state.chartsArr[param.name] = param.val;
    }
};
const actions = {
    monthAction(context, param) {
        context.commit('setMonth', param);
    }
};
var vuexStore = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
// 判断当前操作系统类型
function validataOS() {
    if (navigator.userAgent.indexOf('Window') > 0) {
        return 'Windows';
    } else if (navigator.userAgent.indexOf('Mac OS X') > 0) {
        return 'Mac';
    } else if (navigator.userAgent.indexOf('Linux') > 0) {
        return 'Linux';
    } else {
        return 'NUll';
    }
}

function beforeMonth() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 3) {
        year -= 1;
        month = 10 + month;
    } else {
        month = month - 2;
    }
    return month < 10 ? `${year}0${month}` : `${year}${month}`;
}
export default vuexStore;
