import Vue from 'vue';
import Router from 'vue-router';
import Introduce from '../components/introduce.vue';
import Data from '../components/datascreen.vue';
Vue.use(Router);
export default new Router({
    routes: [{
            path: '/',
            name: 'Introduce',
            component: Introduce,
        },
        {
            path: '/data',
            name: 'Data',
            component: Data,
        },
    ],
});