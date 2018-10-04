// import Vue from 'vue';
// import VueRouter from 'vue-router';
import Introduce from '../energycomponents/introduce.vue';
import Electric from '../energycomponents/electric/electric.vue';
import ElectricDetail from '../energycomponents/electric/electricdetail.vue';
import ElectricExc from '../energycomponents/electric/electricexception.vue';
import Genery from '../energycomponents/genery/genery.vue';
import TopImp from '../energycomponents/genery/topImportant.vue';
import TopRank from '../energycomponents/genery/topRank.vue';
// Vue.use(VueRouter);
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/genery/all'
        },
        {
            path: '/genery',
            name: 'Genery',
            component: Introduce,
            children: [
                {
                    path: '/genery/all',
                    name: 'All',
                    component: Genery
                },
                {
                    path: '/genery/topimp',
                    name: 'TopImp',
                    component: TopImp
                },
                {
                    path: '/genery/toprank/:pageType',
                    name: 'TopRank',
                    component: TopRank
                }
            ],
            redirect: '/all'
        },
        {
            path: '/electric',
            name: 'Electric',
            component: Electric,
        },
        {
            path: '/electricdetail',
            name: 'ElectricDetail',
            component: ElectricDetail,
        },
        {
            path: '/electricexception',
            name: 'ElectricExc',
            component: ElectricExc,
        },
    ],
})
;
