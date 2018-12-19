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
            <div :class="$style['left-bottom']" @mouseenter="houverBox()" @mouseleave="houverBox()"> 
            <!-- <div :class="$style['left-bottom']" @mouseleave="houverBox()">  -->
                <div id="genery-left-bottom" :class="$style['left-bottom-content']" ref="echarts"></div>
                <div :class="$style['left-bottom-tip']">
                    <div :class="$style['table-title']">
                        <ul>
                            <li> <span>大网综合能耗</span></li>
                            <li><span>IDC电耗</span></li>
                        </ul>
                    </div>
                    <table>
                        <tbody>
                            <tr>        
                                <td v-for="(ele,index) in leftBottom.listNetCost" :key="index">{{parseInt(ele)}}</td>
                                <td :class="$style.last">吨标煤</td>
                            </tr>
                            <tr>
                                <td v-for="(ele,index ) in leftBottom.listIDCCost" :key="index">{{parseInt(ele)}}</td>
                                <td :class="$style.last">万度</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="genery-right-all" :class="$style['right-all']">
                <div id="genery-right-top" :class="$style['right-top']"></div>
                <!-- <div id="genery-right-top2" :class="$style['right-top']" style="z-index:1000;width:50%;"></div> -->
                <div  id="genery-right-topcity" :class="[$style['right-top-back']]">
                        <i-button 
                        type="primary"
                        v-show="mapMoudle==='city' || mapMoudle==='country'" 
                        @click="goBack()" :style="{borderColor: 'rgba(255, 255, 255, 0.8)'}">
                            <Icon type="chevron-left"></Icon>
                            返回
                        </i-button>
                        <i-button 
                        type="primary"
                        v-show="mapMoudle==='company'" 
                        @click="goBack()" :style="{borderColor: 'rgba(255, 255, 255, 0.8)'}">
                            <Icon type="chevron-left"></Icon>
                            返回省级数据
                        </i-button>
                </div>
                <div  :class="[$style['right-top-company']]">
                    <ul>
                        <li 
                        v-show="mapMoudle==='province' || mapMoudle==='company'" 
                        :class="$style['company-name']" 
                         @click="goCompany('省本部')">省本部</li>
                        <li 
                        v-show="mapMoudle==='province' || mapMoudle==='company'" 
                        :class="$style['company-name']" 
                         @click="goCompany('省传输局')">省传输局</li>
                        <li 
                        v-show="mapMoudle==='province' || mapMoudle==='company'" 
                        :class="$style['company-name']" 
                        @click="goCompany('信产公司')">信产公司</li>
                        <li 
                        v-show="mapMoudle==='city' || mapMoudle==='country'" 
                        :class="$style['company-name']" 
                        @click="gocityCenter()">市本级</li>
                    </ul>
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
import { provinceMap, cityMap } from '../chartconfig/generyMap.js';
import jzMap from '../chartconfig/zjMap.js';
import tableBar from './tablebarcomp.vue';
import tableBar2 from './tablebarcomp2.vue';
import { cityDataArr } from '../cityMapCode.js';
import 'echarts/map/js/province/zhejiang.js';
import { centerCityPart } from '../chartconfig/staticData.js';
import {
    getProvinceParam,
    getCityParam,
    searchVal,
    searchValArr,
    generyRBData,
    searchMapData,
    controlMapLabel,
    getSortMapArr,
    formatNumberRgx,
    searchValsArr
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
            currentCityName: '',
            currentCity: 'A33',
            currentCityArr: cityNameArr,
            mapMoudle: 'province',
            hoverLine: '',
            tipHtCon: 280,
            countryNameOne: '',
            countryParentName: ''

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
                    transform: 'translateY(-57%) translateX(-50%) scale(.9)'
                };
            } else {
                tran = {
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
            // this.$router.push({name: 'All'});
        },
        gocityCenter() {
            this.mapMoudle = 'country';
            const name = this.currentCityName;
            if (!name) return;
            this.currentCity = jzMap.mapCode[name] + '00';
            this.countryNameOne = '市本级';
        },
        goCompany(name) {
            this.mapMoudle = 'company';
            this.currentCity = jzMap.mapCode[name];
            this.currentCityArr = [name];
        },
        houverBox() {
            setTimeout(() => {
                this.hoverLine && this.hoverLine.resize();
            }, 500);
        },
        getAxiosData(date) {
            let param1 = getProvinceParam(date, this.currentCity, generyAllProvince);
            let param2;
            if (this.mapMoudle === 'province') { // 省级总览
                param2 = getCityParam(date, cityCodeArr, cityEncodeArr);
            } else if (this.mapMoudle === 'city') {
                let countryCodeArr = getCountyCode(cityDataArr, this.currentCity);
                param2 = getCityParam(date, countryCodeArr, countyEncodeArr);
            } else if (this.mapMoudle === 'company') {
                let countryCodeArr = [this.currentCity];
                param2 = getCityParam(date, countryCodeArr, countyEncodeArr);
            } else {
                const name = this.currentCityName;
                const cityCenterCode = jzMap.mapCode[name] + '00';
                let countryCodeArr = [this.currentCity, cityCenterCode];
                param2 = getCityParam(date, countryCodeArr, countyEncodeArr);
            }

            let data = param1 + ',' + param2;
            // let postData = this.$qs.stringify({
            //     paramArrs: data
            // });
            let postData = this.$store.getters.module === 'dev' ? { paramArrs: data } : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                if (this.mapMoudle === 'country') {
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
        getAxiosDataToCountryMap(date, cityName) {
            const code = jzMap.mapCode[cityName];
            let param1 = getProvinceParam(date, code, generyAllProvince);
            let countryCodeArr = getCountyCode(cityDataArr, code);
            let param2 = getCityParam(date, countryCodeArr, countyEncodeArr);
            let data = param1 + ',' + param2;
            // let postData = this.$qs.stringify({
            //     paramArrs: data
            // });
            let postData = this.$store.getters.module === 'dev' ? { paramArrs: data } : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                const countryToUpdateCityMap = true;
                this.sourceData = response.data;
                this.setMap(this.sourceData, code, countryToUpdateCityMap);
            }).catch((error) => {
                console.warn(error);
            });
        },
        setLeftTop(arr, code) {
            this.leftTop = {
                allCount: formatNumberRgx(searchVal(code, 'NHDP0006', arr)),
                allCost: formatNumberRgx(searchVal(code, 'NHDP0005', arr)),
                eleCost: searchVal(code, 'NHDP0001', arr),
                eleCount: searchVal(code, 'NHDP0002', arr),
                oilCost: searchVal(code, 'NHDP0004', arr),
                oilCount: searchVal(code, 'NHDP0003', arr),
                otherCost: searchVal(code, 'NHDP0007', arr),
                otherCount: searchVal(code, 'NHDP0008', arr),
            };
            let eleCu = this.leftTop.eleCount;
            let eleCo = this.leftTop.eleCost;
            let oilCu = this.leftTop.oilCount;
            let oilCo = this.leftTop.oilCost;
            let otherCo = this.leftTop.otherCost;
            let otherCu = this.leftTop.otherCount;
            const listVal = [eleCo, oilCo, otherCo, eleCu, oilCu, otherCu];
            ConfigPie.series[0].data[0].value = eleCo > 0 ? eleCo : 0;
            ConfigPie.series[0].data[1].value = oilCo > 0 ? oilCo : 0;
            ConfigPie.series[0].data[2] = { value: (otherCo > 0 ? otherCo : 0), name: '其他', label: { show: true, color: '#ffefb4' }, labelLine: { show: true } };

            ConfigPie.series[1].data[0].value = eleCu > 0 ? eleCu : 0;
            ConfigPie.series[1].data[1].value = oilCu > 0 ? oilCu : 0;
            ConfigPie.series[1].data[2] = { value: (otherCu > 0 ? otherCu : 0), name: '其他', label: { show: true, color: '#ffefb4' }, labelLine: { show: true } };
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
            ConfigPie.series[0].itemStyle.normal.label.formatter = params => {
                return `总${params.data.name}费(万元)\n${formatNumberRgx(params.data.value)}`;
            };
            ConfigPie.series[1].itemStyle.normal.label.formatter = params => {
                return `总${params.data.name}量(吨标煤)\n${formatNumberRgx(params.data.value)}`;
            };
            // const legendList = ['电费', '油费', '其他费用', '电量', '油耗', '其他耗量'];
            const legendList = ['电', '油', '其他'];
            this.negativeList = getNagetiveList(legendList, listVal);
            ConfigPie.legend.data = legendList;
            let pie = this.$echarts.init(document.getElementById('genery-left-top'));
            this.$store.commit('setCharts', { name: 'chart1', val: pie });
            pie.setOption(ConfigPie);
        },
        setLeftBottom(arr, code) {
            // 先对柱状图表和下边表格做数据关系对应映射centerCityPart
            let list = this.currentCityArr;
            let cityCode = '';

            if (this.mapMoudle === 'country') {
                const targetAerr = (this.currentCityName ? centerCityPart[this.currentCityName] : []);
                if (targetAerr.length && targetAerr.includes(list[0])) {
                    const name = this.currentCityName;
                    cityCode = jzMap.mapCode[name] + '00';
                    list = ['市本级'];
                } else {
                    cityCode = code;
                }
            }
            let sortArr = getSortMapArr('drop',
                searchValArr('NHDP0015', arr, cityCode),
                list,
                searchValArr('NHDP0016', arr, cityCode),
                searchValArr('NHDP0009', arr, cityCode),
                searchValArr('NHDP0010', arr, cityCode));

            // 去掉开头的市字
            // sortArr[1] = sortArr[1].map(ele => {
            //     return ele.replace(/市/, '');
            // });
            // 查找属于市本级的区县数据不再city级显示
            if (this.mapMoudle === 'city') {
                const deleteIndexList = [];
                const targetAerr = (this.currentCityName ? centerCityPart[this.currentCityName] : []);
                // 过滤掉市本级重合得区县，不再显示
                if (targetAerr && targetAerr.length) {
                    sortArr[1].forEach((ele, index) => {
                        if (targetAerr.includes(ele)) deleteIndexList.push(index);
                    });
                    const result = [];
                    sortArr.forEach(ele => {
                        const a = ele.filter((item, index) => !deleteIndexList.includes(index));
                        result.push(a);
                    });
                    sortArr = result;
                }
            }
            if (this.mapMoudle === 'country') {
                // const switchIndexList = [];
                // const targetAerr = (this.currentCityName ? centerCityPart[this.currentCityName] : []);

                // if (targetAerr.length) {
                //     let cityCenterIndex = '';
                //     sortArr[1].forEach((ele, index) => {
                //         if (targetAerr.includes(ele)) switchIndexList.push(index);
                //         if (ele === '市本级') cityCenterIndex = index;
                //     });
                //     const cityCenterData = [];
                //     sortArr.forEach(ele => {
                //         cityCenterData.push(ele[cityCenterIndex]);
                //     });
                //     console.log(cityCenterIndex, cityCenterData);
                //     const result = [];
                //     sortArr.forEach((ele, index) => {
                //         const a = ele.map((item, i) => {
                //             if (switchIndexList.includes(i)) {
                //                 return cityCenterData[index];
                //             } else {
                //                 return ele;
                //             }
                //         });
                //         result.push(a);
                //     });
                // }
            }

            this.leftBottom = {
                listNetCost: sortArr[3],
                listIDCCost: sortArr[4],
                listCity: sortArr[1],
                listPersentNet: sortArr[0],
                listPersentIDC: sortArr[2],
                guideVal: searchVal(code, 'NHDP0011', arr),
                warnVal: searchVal(code, 'NHDP0012', arr)
            };
            let line = this.$echarts.init(document.getElementById('genery-left-bottom'));
            this.$store.commit('setCharts', { name: 'chart2', val: line });
            this.hoverLine = line;
            const option = JSON.parse(JSON.stringify(ConfigLine));
            // option.yAxis[0].min = 0;
            // option.yAxis[0].max = 1.2;
            // option.yAxis[0].splitNumber = 6;
            option.label.formatter = function(params) {
                return Number(params.value) === 0 ? '0' : params.value;
            };
            option.series[0].label.formatter = function(params) {
                return Number(params.value) === 0 ? '0' : params.value;
            };
            option.yAxis[0].axisLabel = {
                color: '#F1F7FC',
                fontSize: 12,
                fontWeight: 200,
                // rotate:30,
                formatter: (val) => {
                    return parseInt(val * 100) + '%';
                }
            };
            if (this.mapMoudle === 'province' || this.mapMoudle === 'city') {
                option.xAxis[0].axisLabel.rotate = 35;
            }
            // 查找属于市本级的区县数据替换为市本级显示
            if (this.mapMoudle === 'country') {
                let name = this.countryNameOne;
                const targetAerr = (this.currentCityName ? centerCityPart[this.currentCityName] : []);
                if (targetAerr.length && targetAerr.includes(name)) {
                    name = '市本级';
                }
                option.xAxis[0].data = [name];
            } else {
                option.xAxis[0].data = sortArr[1];
            }
            option.series[0].data = sortArr[2];
            option.series[1].data = sortArr[0];
            // 临时调整代码，省本部数据300000%度太大，屏蔽掉保证其他正常显示
            if (sortArr[0][0] >= 3) {
                sortArr[0][0] = 0;
            }
            const max = Math.max(Math.max.apply(null, this.leftBottom.listPersentNet), Math.max.apply(null, this.leftBottom.listPersentIDC));
            const min = Math.min(Math.min.apply(null, this.leftBottom.listPersentNet), Math.min.apply(null, this.leftBottom.listPersentIDC));
            let guid = this.leftBottom.guideVal;
            let warn = this.leftBottom.warnVal;
            let len = this.currentCityArr.length - 1;
            option.yAxis[0].min = this.mapMoudle === 'country' || this.mapMoudle === 'company' ? 0 : min;
            option.yAxis[0].max = max > warn ? max : warn;
            option.series[0].label.formatter = params => {
                return `${parseInt(params.value * 100)}%`;
            };
            option.series[1].label.formatter = params => {
                return `${parseInt(params.value * 100)}%`;
            };
            option.series[2].markLine = {
                symbol: ['none'],
                // silent: true,
                label: {
                    color: '#7bfcfd',
                    // position:'middle',
                    formatter: params => {
                        return `\n${parseInt(params.value * 100)}%`;
                    }
                },
                data: [{
                    yAxis: guid,
                    lineStyle: {
                        color: '#7bfcfd'
                    },
                }
                ]
            };
            option.series[3].markLine = {
                symbol: ['none'],
                label: {
                    color: '#ffa354',
                    formatter: params => {
                        return `${parseInt(params.value * 100)}%\n`;
                    }
                },
                data: [
                    {
                        yAxis: warn,
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
        setMap(arr, code, countryToUpdateCityMap) {
            if (this.mapMoudle === 'company') {
                return;
            }
            const map = this.$echarts.init(document.getElementById('genery-right-top'));
            const boxWidth = map ? map.getWidth() : 0;
            const boxHeight = map ? map.getHeight() : 0;
            const baseRect = Math.min(boxWidth, boxHeight);
            if (this.mapMoudle === 'province') {
                map.clear();
                this.$store.commit('setCharts', { name: 'chart3', val: map });
                let codes = jzMap.arrCode;
                const encodes = ['NHDP0006', 'NHDP0005'];
                let data = searchMapData(codes, encodes, arr, 'city');
                let mapconfig = JSON.parse(JSON.stringify(provinceMap));
                mapconfig.tooltip.formatter = function(params) {
                    return `<div>${params.data.name}</div><div>总能耗量：${params.data.value}(吨标煤)</div> <div>总能耗费：${params.data.value1}(万元)</div>`;
                };
                // console.log(data);
                let max = 0;
                data.forEach(ele => {
                    if (parseFloat(ele.value) > max) {
                        max = Math.ceil(parseFloat(ele.value));
                    }
                });
                mapconfig.dataRange.max = max;
                mapconfig.series[0].data = data;
                // mapconfig.roam=false;
                map.setOption(mapconfig);
            } else if (this.mapMoudle === 'city') {
                map.clear();
                this.$store.commit('setCharts', { name: 'chart3', val: map });
                let name = jzMap.mapName[code];
                this.$echarts.registerMap(name, jzMap.mapJson[name]);
                // const features = jzMap.mapJson[name].features;
                // console.log(features);
                let mapconfig = JSON.parse(JSON.stringify(cityMap));

                let clickCode = jzMap.mapCode[name];
                let subCodeCount = jzMap.countryCodeCount[clickCode];
                let subCodes = addCodes(clickCode, subCodeCount);
                // const encodes = ['NHDP0005', 'NHDP0006'];
                let data2 = searchMapData(subCodes, ['NHDP0006', 'NHDP0005'], arr, 'country');
                mapconfig.tooltip.formatter = function(params) {
                    return `<div>${params.data.name}</div><div>总能耗量：${params.data.value}(吨标煤)</div> <div>总能耗费：${params.data.value1}(万元)</div>`;
                };
                let max = 0;
                data2.forEach(ele => {
                    if (parseFloat(ele.value) > max) {
                        max = Math.ceil(parseFloat(ele.value));
                    }
                });
                mapconfig.dataRange.max = max;
                mapconfig.series[0].map = name;
                mapconfig.series[0].data = data2;

                // mapconfig.roam=true;
                map.setOption(mapconfig);
            } else {
                const initmap = cityMap;
                const datajzMap = jzMap;
                const searchMapData2 = searchMapData;
                if (this.countryParentName && countryToUpdateCityMap) {
                    map.clear();
                    this.$store.commit('setCharts', { name: 'chart3', val: map });
                    const cityName = this.countryParentName;
                    this.$echarts.registerMap(cityName, datajzMap.mapJson[cityName]);
                    // console.log(datajzMap.mapJson[cityName]);
                    const mapconfig2 = JSON.parse(JSON.stringify(initmap));

                    const clickCode2 = datajzMap.mapCode[cityName];
                    const subCodeCount2 = datajzMap.countryCodeCount[clickCode2];
                    const subCodes2 = addCodes(clickCode2, subCodeCount2);
                    const data2 = searchMapData2(subCodes2, ['NHDP0006', 'NHDP0005'], arr, 'country');
                    mapconfig2.tooltip.formatter = function(params) {
                        return `<div>${params.data.name}</div><div>总能耗量：${params.data.value}(吨标煤)</div> <div>总能耗费：${params.data.value1}(万元)</div>`;
                    };
                    let max = 0;
                    data2.forEach(ele => {
                        if (parseFloat(ele.value) > max) {
                            max = Math.ceil(parseFloat(ele.value));
                        }
                    });
                    mapconfig2.dataRange.max = max;
                    mapconfig2.series[0].map = name;
                    mapconfig2.series[0].data = data2;

                    map.setOption(mapconfig2);
                }
            }
            // 地图缩放显示label控制130-1000
            controlMapLabel(map);
            map && map.off('click');
            map && map.on('click', (param) => {
                if (this.mapMoudle === 'country') {
                    let name = param.name;
                    // const targetAerr = (this.currentCityName ? centerCityPart[this.currentCityName] : []);
                    // if (targetAerr.length && targetAerr.includes(name)) {
                    //     const city = this.currentCityName;
                    //     name = '市本级';
                    //     this.currentCity = jzMap.mapCode[city] + '00';
                    // } else {
                    //     this.currentCity = getCountyCodeOne(cityDataArr, name);
                    // }
                    this.currentCity = getCountyCodeOne(cityDataArr, name);
                    this.currentCityArr = [name];
                    this.countryNameOne = name;
                    return;
                }
                if (this.mapMoudle === 'city') {
                    let name = param.name;
                    this.mapMoudle = 'country';
                    this.countryNameOne = name;
                    // console.log(param.name);
                    // const targetAerr = (this.currentCityName ? centerCityPart[this.currentCityName] : []);
                    // if (targetAerr.length && targetAerr.includes(name)) {
                    //     const city = this.currentCityName;
                    //     name = '市本级';
                    //     this.currentCity = jzMap.mapCode[city] + '00';
                    // } else {
                    //     this.currentCity = getCountyCodeOne(cityDataArr, name);
                    // }
                    this.currentCity = getCountyCodeOne(cityDataArr, name);
                    return;
                }
                this.mapMoudle = 'city';
                this.currentCityName = param.name;
                this.currentCityArr = getCountyName(cityDataArr, jzMap.mapCode[param.name]);

                let clickCode = jzMap.mapCode[param.name];
                this.countryParentName = param.name;
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
            this.mapMoudle === 'country' && this.getAxiosDataToCountryMap(val, this.countryParentName);
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
            let item = index < len / 2 ? { name: names[index], val: element + '万元' } : { name: names[index], val: element + '吨标煤' };
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
//@import '../../css/energyanalysis.scss';
    .content{
        position: relative;
        height: 100%;
        &>div{
            background-color: rgba(16,162,249,0);
            position: absolute;
            border: 0.08rem solid rgba(16,162,249,0.5);
            border-radius: 0.6rem;
        }
        .left-top{
            top:3%;
            left: 3%;
            width:52%;
            height: 42%;
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
                color:rgba(255, 255, 255, 0.8);
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
                color:#F1F7FC;
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
            top:48%;
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
                color:#F1F7FC;
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
                        height: 100%;
                        li{
                            position: relative;
                            padding-left: 15%;
                            height: 50%;
                            span{
                                display: inline-block;
                                position: absolute;
                                top:50%;
                                transform: translateY(-50%);
                            }
                        }
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
                   // border:1px solid #0094ff;
                  background-color: rgba(134, 167, 204, 0.2); 
                 }
            }
        }
        .right-all{
            height: 95%;
            right: 3%;
            width:40%;
            top:3%;
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
                right: 25px;
            }
            .right-top-company{
                position: absolute;
                right: 5%;
                bottom: 55%;
                ul li{
                    list-style: none;
                    color:#F1F7FC;
                    width:60px;
                    height: 30px;
                    line-height: 30px;
                    background-color: rgba(16, 162, 249, 0.7);
                    padding-left:5px;
                    margin-top: 5px;
                    border: 1px solid rgba(16, 162, 249, 0.5);
                    border-radius: 4px;
                    cursor: pointer;
                }
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
