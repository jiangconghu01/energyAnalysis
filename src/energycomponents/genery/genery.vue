<template>
        <div :class="$style.content">
            <div  :class="$style['left-top']" ref="all-left-top">
                <div id="genery-left-top" :class="$style['left-top-content']" ref="echarts"></div>
                <div :class="$style['left-top-tip']" :style="getSize">
                    <span>总能源费(万元)</span>
                    <span :class="$style['left-top-tipval']">{{leftTop.allCost}}</span>
                    <span>总耗能量(吨标煤)</span>
                    <span :class="$style['left-top-tipval']">{{leftTop.allCount}}</span>
                </div>
                <div :class="$style['left-top-tip-exception']" v-if="negativeList.length">
                    <ul>
                        <li v-for="(item,index) in negativeList" :key="index">{{item.name}}:{{item.val}}</li>
                    </ul>
                </div>
            </div>
            <!-- <div :class="$style['left-bottom']" @mouseenter="houverBox()" @mouseleave="houverBox()">  -->
            <div :class="$style['left-bottom']" @mouseleave="houverBox()"> 
                <div id="genery-left-bottom" :class="$style['left-bottom-content']" ref="echarts"></div>
                <div :class="$style['left-bottom-tip']">
                    <div :class="$style['table-title']">
                        <ul>
                            <li> 大网综合能耗（万度）</li>
                            <li>&nbsp;IDC电耗（万度）</li>
                        </ul>
                    </div>
                    <table>
                        <tbody>
                            <tr>        
                                <td v-for="(ele,index) in leftBottom.listNetCost" :key="index">{{parseInt(ele)}}</td>
                                <td :class="$style.last"></td>
                            </tr>
                            <tr>
                                <td v-for="(ele,index ) in leftBottom.listIDCCost" :key="index">{{parseInt(ele)}}</td>
                                <td :class="$style.last"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="genery-right-all" :class="$style['right-all']">
                <div id="genery-right-top" :class="$style['right-top']" ref="echarts"></div>
                <div v-show="mapMoudle==='city' || mapMoudle==='country'" id="genery-right-topcity" :class="[$style['right-top-back']]">
                        <i-button type="primary" @click="goBack()" :style="{borderColor: '#fff'}">
                            <Icon type="chevron-left"></Icon>
                            返回
                        </i-button>
                </div>
                <div id="genery-right-bottom" :class="$style['right-bottom']">
                    <div :class="$style['table-item']">
                        <table-bar2 v-if="rightBottom.station" :data="rightBottom.station" itemid="bar-1">
                        </table-bar2>
                    </div>
                    <div :class="$style['table-item']">
                        <table-bar2 v-if="rightBottom.vehicle" :data="rightBottom.vehicle" type='normal' itemid="bar-2"></table-bar2>
                    </div>
                    <div :class="$style['table-item']">
                        <table-bar2 v-if="rightBottom.energy" :data="rightBottom.energy"  type='normal' itemid="bar-3"></table-bar2>
                    </div>
                    <div :class="$style['table-item']">
                        <table-bar2 v-if="rightBottom.electric" :data="rightBottom.electric" type="normal" itemid="bar-4"></table-bar2>
                    </div>
                </div>
                <div :class="$style['right-tip']">
                </div>
            </div>
        </div>
</template>

<script>
import ConfigPie from '../chartconfig/generyPie.js';
import ConfigLine from '../chartconfig/generyLine.js';
import {provinceMap, cityMap} from '../chartconfig/generyMap.js';
import jzMap from '../chartconfig/zjMap.js';
import tableBar from './tablebarcomp.vue';
import tableBar2 from './tablebarcomp2.vue';
import { cityDataArr } from '../cityMapCode.js';
import 'echarts/map/js/province/zhejiang.js';
import {
    getProvinceParam,
    getCityParam,
    searchVal,
    searchValArr,
    generyRBData,
    searchMapData
}
    from '../dataUtil.js';
import {
    generyAllProvince,
    cityEncodeArr,
    cityCodeArr,
    cityNameArr,
    countyEncodeArr,
    getCountyCode,
    getCountyName,
    getCountyCodeOne
}
    from './origindata.js';
export default {
    data () {
        return {
            sourceData: {},
            sourceCountryData: {},
            leftTop: {},
            leftBottom: {},
            rightTop: {},
            rightBottom: {
                // station: [],
                // vehicle: [],
                // energy: [],
                // electric: []
            },
            table1: [],
            negativeList: [],
            currentCity: 'A33',
            currentCityArr: cityNameArr,
            mapMoudle: 'province',
            hoverLine: '',
            tipHtCon: 280,
            countryNameOne:'',
            countryParentName:''

        };
    },
    computed: {
        currentMonth() {
            return this.$store.getters.month;
        },
        getSize() {
            const ht = this.tipHtCon;
            let tran = {};
            if (ht >= 280) {
                tran = {
                    transform: 'translateY(-57%) translateX(-50%)'
                };
            } else if (280 > ht > 240) {
                tran = {
                    //    transform: translateY(-57%) translateX(-50%) scale(.9);
                    transform: 'translateY(-57%) translateX(-50%) scale(.9)'
                };
            } else {
                tran = {
                    //    transform: translateY(-57%) translateX(-50%) scale(.9);
                    transform: 'translateY(-57%) translateX(-50%) scale(.8)'
                };
            }
            return tran;
        },

    },
    components: {
        tableBar,
        tableBar2,
    },
    methods: {
        // wheel() {
        //     // let a = this.maptest.getOption();
        //     // console.log(a.series[0].zoom);
        //     return '';
        // },
        goBack() {
            this.mapMoudle = 'province';
            this.currentCity = 'A33';
            this.currentCityArr = cityNameArr; 
            //this.$router.push({name: 'All'});
        },
        houverBox() {
            setTimeout(() => {
                this.hoverLine && this.hoverLine.resize();
            }, 500);
        },
        getAxiosData(date) {
            let param1 = getProvinceParam(date, this.currentCity, generyAllProvince);
            let param2;
            if (this.mapMoudle=== 'province') { // 省级总览
                param2 = getCityParam(date, cityCodeArr, cityEncodeArr);
            } else if(this.mapMoudle=== 'city') {
                let countryCodeArr = getCountyCode(cityDataArr, this.currentCity);
                param2 = getCityParam(date, countryCodeArr, countyEncodeArr);
            }else{
                let countryCodeArr =[this.currentCity];
           // console.log(a);
                param2 = getCityParam(date, countryCodeArr, countyEncodeArr);
            }

            let data = param1 + ',' + param2;
            // let postData = this.$qs.stringify({
            //     paramArrs: data
            // });
            let postData = this.$store.getters.module === 'dev' ? {paramArrs: data} : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                
                if(this.mapMoudle === 'country'){
                    this.sourceCountryData = response.data;
                     this.setLeftTop(this.sourceCountryData, this.currentCity);
                    this.setLeftBottom(this.sourceCountryData, this.currentCity);
                    this.setRightBottom(this.sourceCountryData, this.currentCity);
                    this.setMap(this.sourceCountryData, this.currentCity);
                    return;
                }
                this.sourceData = response.data;
                this.setLeftTop(this.sourceData, this.currentCity);
                this.setLeftBottom(this.sourceData, this.currentCity);
                this.setRightBottom(this.sourceData, this.currentCity);
                this.setMap(this.sourceData, this.currentCity);
            }).catch((error) => {
                console.warn(error);
            });
        },
        getAxiosDataToCountryMap(date,cityName) {
            const code=jzMap.mapCode[cityName];
            let param1 = getProvinceParam(date, code , generyAllProvince);
            let countryCodeArr = getCountyCode(cityDataArr, code);
            let param2 = getCityParam(date, countryCodeArr, countyEncodeArr);
            let data = param1 + ',' + param2;
            // let postData = this.$qs.stringify({
            //     paramArrs: data
            // });
            let postData = this.$store.getters.module === 'dev' ? {paramArrs: data} : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                const countryToUpdateCityMap=true;
                this.sourceData = response.data;
                this.setMap(this.sourceData, code,countryToUpdateCityMap);
            }).catch((error) => {
                console.warn(error);
            });
        },
        setLeftTop(arr, code) {
            this.leftTop = {
                allCount: searchVal(code, 'NHDP0006', arr),
                allCost: searchVal(code, 'NHDP0005', arr),
                eleCost: searchVal(code, 'NHDP0001', arr),
                eleCount: searchVal(code, 'NHDP0002', arr),
                oilCost: searchVal(code, 'NHDP0004', arr),
                oilCount: searchVal(code, 'NHDP0003', arr),
                // waterCount: searchVal(code, 'NHDP0124', arr),
                // waterCost: searchVal(code, 'NHDP0125', arr),
                // gasCost: searchVal(code, 'NHDP0007', arr),
                // gasCount: searchVal(code, 'NHDP0008', arr),
                otherCost: searchVal(code, 'NHDP0007', arr),
                otherCount: searchVal(code, 'NHDP0008', arr),
            };
            let eleCu = this.leftTop.eleCount;
            let eleCo = this.leftTop.eleCost;
            let oilCu = this.leftTop.oilCount;
            let oilCo = this.leftTop.oilCost;
            // let waterCu = this.leftTop.waterCount;
            // let waterCo = this.leftTop.waterCost;
            // let gasCu = this.leftTop.gasCount;
            // let gasCo = this.leftTop.gasCost;
            let otherCo = this.leftTop.otherCost;
            let otherCu = this.leftTop.otherCount;
            const listVal = [eleCo, oilCo, otherCo, eleCu, oilCu, otherCu];
            ConfigPie.series[0].data[0].value = eleCo > 0 ? eleCo : 0;
            ConfigPie.series[0].data[1].value = oilCo > 0 ? oilCo : 0;
            ConfigPie.series[0].data[2] = {value: (otherCo > 0 ? otherCo : 0), name: '其他', label: {show: true}, labelLine: {show: true}};
            // ConfigPie.series[0].data[2] = {value: (waterCo > 0 ? waterCo : 0), name: '水费'};
            // ConfigPie.series[0].data[3] = {value: (gasCo > 0 ? gasCo : 0), name: '燃气费'};

            ConfigPie.series[1].data[0].value = eleCu > 0 ? eleCu : 0;
            ConfigPie.series[1].data[1].value = oilCu > 0 ? oilCu : 0;
            ConfigPie.series[1].data[2] = {value: (otherCu > 0 ? otherCu : 0), name: '其他', label: {show: true}, labelLine: {show: true}};
            // ConfigPie.series[1].data[2] = {value: (waterCu > 0 ? waterCu : 0), name: '水量'};
            // ConfigPie.series[1].data[3] = {value: (gasCu > 0 ? gasCo : 0), name: '燃气耗量'};
            // const legendList = ['电费', '油费', '水费', '燃气费', '电量', '油耗', '水量', '燃气耗量'];
            ConfigPie.series[0].data.forEach((ele, index) => {
                if (ele.value <= 0) {
                    ele.label.show = false;
                    ele.labelLine.show = false;
                } else {
                    ele.label.show = true;
                    ele.labelLine.show = true;
                }
            });
            ConfigPie.series[1].data.forEach((ele, index) => {
                if (ele.value <= 0) {
                    ele.label.show = false;
                    ele.labelLine.show = false;
                } else {
                    ele.label.show = true;
                    ele.labelLine.show = true;
                }
            });
            // const legendList = ['电费', '油费', '其他费用', '电量', '油耗', '其他耗量'];
            const legendList = ['电', '油', '其他'];
            this.negativeList = getNagetiveList(legendList, listVal);
            ConfigPie.legend.data = legendList;
            let pie = this.$echarts.init(document.getElementById('genery-left-top'));
            this.$store.commit('setCharts', {name: 'chart1', val: pie});
            pie.setOption(ConfigPie);
        },
        setLeftBottom(arr, code) {
            this.leftBottom = {
                listNetCost: searchValArr('NHDP0009', arr),
                listIDCCost: searchValArr('NHDP0010', arr),
                listCity: this.currentCityArr,
                listPersentNet: searchValArr('NHDP0015', arr),
                listPersentIDC: searchValArr('NHDP0016', arr),
                guideVal: searchVal(code, 'NHDP0011', arr),
                warnVal: searchVal(code, 'NHDP0012', arr)
            };
            let line = this.$echarts.init(document.getElementById('genery-left-bottom'));
            this.$store.commit('setCharts', {name: 'chart2', val: line});
            this.hoverLine = line;
            const option = JSON.parse(JSON.stringify(ConfigLine));
            // option.yAxis[0].min = 0;
            // option.yAxis[0].max = 1.2;
            // option.yAxis[0].splitNumber = 6;
            option.yAxis[0].axisLabel = {
                color: '#fff',
                fontSize: 12,
                fontWeight: 200,
                formatter: (val) => {
                    return parseFloat(val * 100).toFixed(2) + '%';
                }
            };
            if (this.mapMoudle === 'country'){
                option.xAxis[0].data=[this.countryNameOne];
            }else{
                 option.xAxis[0].data = this.currentCityArr;
            }
            option.series[0].data = this.leftBottom.listPersentNet;
            option.series[1].data = this.leftBottom.listPersentIDC;
            const max = Math.max(Math.max.apply(null, this.leftBottom.listPersentNet), Math.max.apply(null, this.leftBottom.listPersentIDC));
            const min = Math.min(Math.min.apply(null, this.leftBottom.listPersentNet), Math.min.apply(null, this.leftBottom.listPersentIDC));
            let guid = this.leftBottom.guideVal;
            let warn = this.leftBottom.warnVal;
            let len = this.currentCityArr.length - 1;
            option.yAxis[0].min=this.mapMoudle === 'country'? 0:min;
            option.yAxis[0].max = max > warn ? max : warn;
            option.series[1].markLine = {
                symbol: ['none'],
                // silent: true,
                data: [{
                    yAxis: guid,
                },
                {
                    yAxis: warn,
                    // yAxis: 0.9,
                    lineStyle: {
                        color: '#ffa354'
                    },
                }]
            };
            line.setOption(option);
        },
        setRightBottom(arr, code) {
            this.rightBottom = generyRBData(arr, code);
        },
        setMap(arr, code,countryToUpdateCityMap) {
                let map={};
            if (this.mapMoudle === 'province') {
                map = this.$echarts.init(document.getElementById('genery-right-top'));
                map.clear();
                this.$store.commit('setCharts', {name: 'chart3', val: map});
                let codes = jzMap.arrCode;
                const encodes = ['NHDP0005', 'NHDP0006'];
                let data = searchMapData(codes, encodes, arr, 'city');
                let mapconfig = JSON.parse(JSON.stringify(provinceMap));
                mapconfig.tooltip.formatter = function(params) {
                    return `<div>${params.data.name}</div><div>总能耗量：${params.data.value}</div> <div>总能耗费：${params.data.value1}</div>`;
                };
                mapconfig.series[0].data = data;
                //mapconfig.roam=false;
                map.setOption(mapconfig);
            } else if(this.mapMoudle === 'city'){
                map = this.$echarts.init(document.getElementById('genery-right-top'));
                map.clear();
                this.$store.commit('setCharts', {name: 'chart3', val: map});
                let name = jzMap.mapName[code];
                this.$echarts.registerMap(name, jzMap.mapJson[name]);
                let mapconfig = JSON.parse(JSON.stringify(cityMap));

                let clickCode = jzMap.mapCode[name];
                let subCodeCount = jzMap.countryCodeCount[clickCode];
                let subCodes = addCodes(clickCode, subCodeCount);
                // const encodes = ['NHDP0005', 'NHDP0006'];
                let data2 = searchMapData(subCodes, ['NHDP0005', 'NHDP0006'], arr, 'country');
                mapconfig.tooltip.formatter = function(params) {
                    return `<div>${params.data.name}</div><div>总能耗量：${params.data.value}</div> <div>总能耗费：${params.data.value1}</div>`;
                };
                
                mapconfig.series[0].map = name;
                mapconfig.series[0].data = data2;

               // mapconfig.roam=true;
                map.setOption(mapconfig);
            }else{
                if(this.countryParentName && countryToUpdateCityMap){
                   
                map = this.$echarts.init(document.getElementById('genery-right-top'));
                map.clear();
                this.$store.commit('setCharts', {name: 'chart3', val: map});
                let name = this.countryParentName;
                this.$echarts.registerMap(name, jzMap.mapJson[name]);
                let mapconfig = JSON.parse(JSON.stringify(cityMap));

                let clickCode = jzMap.mapCode[name];
                let subCodeCount = jzMap.countryCodeCount[clickCode];
                let subCodes = addCodes(clickCode, subCodeCount);
                let data2 = searchMapData(subCodes, ['NHDP0005', 'NHDP0006'], this.sourceData2, 'country');
                mapconfig.tooltip.formatter = function(params) {
                    return `<div>${params.data.name}</div><div>总能耗量：${params.data.value}</div> <div>总能耗费：${params.data.value1}</div>`;
                };
                
                mapconfig.series[0].map = name;
                mapconfig.series[0].data = data2;

                map.setOption(mapconfig);
                }

            }
            map.off('click');
            map.on('click', (param) => {
                if( this.mapMoudle === 'country'){
                     this.currentCity = getCountyCodeOne(cityDataArr,param.name);
                     this.currentCityArr=[param.name];
                     this.countryNameOne=param.name;
                     return;
                }
                if (this.mapMoudle === 'city') {
                    this.mapMoudle = 'country';
                     this.countryNameOne=param.name;
                    //console.log(param.name);
                   this.currentCity = getCountyCodeOne(cityDataArr,param.name);
                    return;
                }
                this.mapMoudle = 'city';
                this.currentCityArr = getCountyName(cityDataArr, jzMap.mapCode[param.name]);

                let clickCode = jzMap.mapCode[param.name];
                this.countryParentName=param.name;
                this.currentCity = clickCode;
            });
        }
    },
    created() {
        this.getAxiosData(this.currentMonth);
    },
    beforeDestroy() {

    },
    mounted() {
        // let map = this.$echarts.init(document.getElementById('genery-right-top'));
        // const ltpie=

        // this.$echarts.registerMap(this.mapName, zjMapjson);
        // map.setOption(provinceMap);
        // console.log(this.$refs['all-left-top'].clientHeight);
        // this.tipHtCon = this.$refs['all-left-top'].clientHeight;
        // window.onresize = () => {
        //     this.tipHtCon = this.$refs['all-left-top'].clientHeight;
        // };
    },
    watch: {
        currentMonth: function(val, oldVal) {
            
            this.mapMoudle === 'country' && this.getAxiosDataToCountryMap(val,this.countryParentName);
            this.getAxiosData(val);
        },
        currentCity: function(val, oldVal) {
            this.getAxiosData(this.currentMonth);
        }
    }

};
function getNagetiveList(names, vals) {
    const list = [];
    for (let index = 0, len = vals.length; index < len; index++) {
        const element = vals[index];
        if (element < 0) {
            let item = index < len / 2 ? {name: names[index], val: element + '万元'} : {name: names[index], val: element + '吨标煤'};
            list.push(item);
        }
    }
    return list;
}
function addCodes(code, count) {
    let arr = [];
    for (let index = 1; index <= count; index++) {
        index > 9 ? arr.push(`${code}${index}`) : arr.push(`${code}0${index}`);
    }
    return arr;
}
</script>

<style lang="scss" module>
    .content{
        position: relative;
        height: 96%;
        margin-top: 20px;
        &>div{
            background-color: rgba(16,162,249,0.1);
            position: absolute;
            border: 0.08rem solid rgba(16,162,249,0.5);
            border-radius: 0.6rem;
        }
        .left-top{
            left: 3%;
            width:52%;
            height: 40%;
            .left-top-content{
                width: 100%;
                height:100%;
            }
            .left-top-tip{
                position: absolute;
                left: 45%;
                top: 51%;
                transform: translateY(-57%) translateX(-50%);
                width: 100px;
                height: 120px;
                padding-top: 40px;
                color: #fff;
                span{
                    width: 100px;
                    display: inline-block;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 200;
                }
                .left-top-tipval{
                color: #ffea00;
                font-size: 16px;
                display: block;
                font-weight: normal;
            }
            }
            .left-top-tip-exception{
                position: absolute;
                right: 2%;
                bottom: 5%;
                width: 150px;
               // height: 80px;
                background-color: rgba(16,162,249,0.8);
                border-radius: 0.3em;
                color:#fff;
                padding: 5px 0;
                ul{
                    li{
                        list-style:none;
                        padding-left: 3px;
                        //text-align: center;
                    }
                }

            }

        }
        .left-bottom{
            left: 3%;
            top:45%;
            width:52%;
            height: 50%;
            transition: all 0.5s ease 0.1s;
            &:hover{
                width:70%; 
                transform: scale(1.04);
               // background-color: rgba(16,162,249,0.8);
                background-color: rgba(0,0,0,0.7);
                z-index: 1000;
                top:43%;
                height: 52%;
            }
            .left-bottom-content{
                width: 100%;
                height:72%;
                position: absolute;
            }
            .left-bottom-tip{
                color:#fff;
                width: 100%;
                height:20%;
                font-weight: bold;
                position: absolute;
                top:73%;
                .table-title{
                    width: 100px;
                    height: 100%;
                    float: left;
                    
                    ul{
                        list-style: none;
                    }
                    
                }
                table{
                    float: left;
                    
                    width: calc(100% - 100px);
                    height: 100%;
                    text-align: center; 
                   table-layout: fixed;
                    tbody{
                    height: 100%;    
                    }
                    tr{
                        height: 50%;
                    }
                    .first{
                        width: 100px;
                        //overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        border: none;
                        background-color: rgba(16,162,249,0);
                    }
                    .last{
                        width: 40px;
                        border: none;
                        background-color: rgba(16,162,249,0);
                    }
                }
                table tr td { 
                    border:1px solid #0094ff;
                 //background-color: rgba(26, 89, 162, 0.2); 
                 }
            }
        }
        .right-all{
            height: 95%;
            right: 3%;
            width:40%;
            &>div{
                position: absolute;
                //background-color: #ffea00;
            }
            .right-top{
                width: 100%;
                height:50%;               
            }
            .right-top-back{
                top:20px;
                right: 10px;
            }
            .right-bottom{
                width: 100%;
                height:48%;
                top:50%;
                .table-item{
                    margin-left: 5%;
                    width: 95%;
                    height: 20%;
                    margin-top: 5px;
                }
            }
        }
    }
  
</style>
