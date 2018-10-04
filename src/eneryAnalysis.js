
// import Vue from 'vue';

// import echarts from 'echarts';
import qs from 'qs';
// import axios from 'axios';
import router from './router/enAnalysisRouter.js';
import energyAnalysis from './energyAnalysis.vue';
import store from './bus/store.js';
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import './css/style.css';
import http from './ajax.js';
import './css/energyanalysis.scss';
// axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
// Vue.use(iView);
Vue.prototype.$qs = qs;
Vue.prototype.$echarts = echarts;
Vue.prototype.axios = axios;
Vue.prototype.$http = http;
new Vue({
    el: '#energy',
    router,
    store,
    render: h => h(energyAnalysis)
});
