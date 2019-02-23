import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    collapsed: false,
    isActive: true,
    isShow: 1
}

const mutations = {
    collapse: function () {
        state.collapsed = !state.collapsed;
    },
    collapseToTrue: function () {
        state.collapsed = true;
    },
    collapseToFalse: function () {
        state.collapsed = false;
    },
    isActiveToTrue: function () {
        state.isActive = true;
    },
    isActiveToFalse: function () {
        state.isActive = false;
    },
    isShowModify: function (state, show) {
        state.isShow = show;
    }
}

export default new Vuex.Store({
    state, mutations
})