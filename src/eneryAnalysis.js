import router from './router/enAnalysisRouter.js';
import Vue from 'vue';

import echarts from 'echarts';
import qs from 'qs';
import axios from 'axios';
import energyAnalysis from './energyAnalysis.vue';
// import VueBus from './bus/vue-bus.js';
import store from './bus/store.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './css/style.css';
// Vue.use(VueBus);
// axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.use(iView);
Vue.prototype.$qs = qs;
Vue.prototype.$echarts = echarts;
Vue.prototype.axios = axios;
new Vue({
    el: '#energy',
    router,
    store,
    // components: { energyAnalysis },
    // template: '<energyAnalysis/>'
    render: h => h(energyAnalysis)
});