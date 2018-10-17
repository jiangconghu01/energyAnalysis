<template>
        <div :class="$style.content">
            <div :class="$style['left-top']">
              
                <div :class="[$style.databar,$style.first]">
                     <ratio-comp3 :initdata="initdatas[0]" id="r1"></ratio-comp3>
                </div>
                <!-- <div :class="[$style.databar,$style.second]"> <ratio-comp2></ratio-comp2></div> -->
                <div :class="[$style.databar,$style.second]">
                     <ratio-comp3 :initdata="initdatas[1]" id="r2"></ratio-comp3>
                </div>
            </div>
            <div :class="$style['left-bottom']">
                <!-- <div :class="[$style.databar,$style.first]"><ratio-comp2></ratio-comp2></div>
                <div :class="[$style.databar,$style.second]"><ratio-comp2></ratio-comp2></div>                 -->
                <div :class="[$style.databar,$style.first]">
                     <ratio-comp3 :initdata="initdatas[2]" id="r3"></ratio-comp3>
                </div>
                <div :class="[$style.databar,$style.second]">
                     <ratio-comp3 :initdata="initdatas[3]" id="r4"></ratio-comp3>
                </div>
            </div>
            <div :class="$style['right-top']">
                <div :class="$style['right-top-map']" id="right-top-map">
                </div>
                <div v-show="mapMoudle==='city'" :class="$style['right-top-back']">
                    <i-button type="primary" @click="goBack()" :style="{borderColor: 'rgba(255, 255, 255, 0.8)'}">
                        <Icon type="chevron-left"></Icon>
                        返回
                    </i-button>
                </div>
            </div>
            <div :class="$style['right-bottom']">
                <!-- <div :class="[$style['right-bottom-bar']]"><ratio-comp2></ratio-comp2></div> -->
                <div :class="[$style['right-bottom-bar']]">
                    <ratio-comp3 :initdata="initdatas[4]" id="r5"></ratio-comp3>
                </div>
            </div>
        </div>
</template>

<script>
import ratioComp2 from './ratiocomp2.vue';
import ratioComp3 from './ratiocomp3.vue';
import { provinceMap, cityMap } from '../chartconfig/generyMap.js';
import { topImpData } from '../chartconfig/staticData.js';
import zjMap from '../chartconfig/zjMap.js';
import 'echarts/map/js/province/zhejiang.js';
export default {
    data () {
        return {
            home: true,
            czxtData: null,
            initdatas: topImpData,
            mapMoudle: 'province',
            currentCity: 'A33',
        };
    },
    computed: {
        currentMonth() {
            return this.$store.getters.month;
        },

    },
    components: {
        ratioComp2,
        ratioComp3
    },
    methods: {
        goBack() {

        },
        setMap(code) {
            let map = this.$echarts.init(document.getElementById('right-top-map'));
            // map.setOption(provinceMap);
            if (this.mapMoudle !== 'city') {
                provinceMap.series[0].data = zjMap.arrName.map(item => {
                    return {
                        name: item,
                        value: 200
                    };
                });
                map.setOption(provinceMap);
            } else {
                let name = zjMap.mapName[code];
                this.$echarts.registerMap(name, zjMap.mapJson[name]);
                const mapconfig = JSON.parse(JSON.stringify(cityMap));
                // mapconfig.series[0].data=[]；
                map.setOption(mapconfig);
            }
            map.on('click', (param) => {
                if (this.mapMoudle === 'city') {
                    return;
                }

                this.mapMoudle = 'city';
                let clickCode = zjMap.mapCode[param.name];
                this.currentCity = clickCode;
            });
        }
    },
    mounted() {
        this.setMap(this.currentCity);
    },
    watch: {
        currentCity: function(val, oldVal) {
            // this.getAxiosData(this.currentMonth);
            this.setMap(this.currentCity);
        }
    }

};
</script>

<style lang="scss" module>
    .content{
        position: relative;
        height: 100%;
        &>div{

            background-color: rgba(16,162,249,0.1);
            position: absolute;
             border: 0.08rem solid rgba(16,162,249,0.5);
             border-radius: 0.6rem;
        }
        .databar{
            position: absolute; 
            width:49%;
            height: 98%;
            top:2%;
        }
        .left-top{
            top: 3%;
            left: 3%;
            width:55%;
            height: 45%;
            .second{
                left:50%;
            }
        }
        .left-bottom{
            left: 3%;
            top:53%;
            width:55%;
            height: 45%;
            .second{
                left:50%;
            }
        }
        .right-top{
            height: 45%;
            right: 3%;
            width:37%;
            top: 3%;
            .right-top-map{
                width: 100%;
                height: 100%;
            }
            .right-top-back{
                position: absolute;
                top: 20px;
                right: 10px;
            }
        }
        .right-bottom{
            top:53%;
            height: 45%;
            right: 3%;
            width:37%;
            .right-bottom-bar{
                position: absolute;
                width:85%;
                left: 5%;
                height: 98%;
                top:2%;
            }
        }
    }
  
</style>
