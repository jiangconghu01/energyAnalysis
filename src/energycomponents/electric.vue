<template>
        <div :class="$style.content">
            <div  :class="$style['left-top']">
                <div :class="$style['left-top-l']">
                    <card-text type='dl' :topage="goElectricQuantity" :number="allCount" :ratio="allCountRa"></card-text>
                </div>
                <div :class="$style['left-top-m']">
                    <card-text type='df' :topage="goElectricPrice" :number="allCost" :ratio="allCostRa"></card-text>
                </div>
                <div :class="$style['left-top-r']">
                    <card-text type='yc' :topage="goExceptionPage" :number="allException"></card-text>
                </div>
            </div>
            <div :class="$style['left-bottom']">
                <div :class="$style['left-bottom-t']">
                    <div id="electric-all-lt" ref="echarts-4"></div>
                </div>
                <div :class="$style['left-bottom-m']">
                    <Button-group>
                        <i-button type="ghost" 
                        @click="leftViewNumber()" 
                        :style="[leftCurrent==1?buttonStyle:{}]">电量</i-button>
                        <i-button type="ghost" 
                        @click="leftViewMoney()" 
                        :style="[leftCurrent==2?buttonStyle:{}]">电费</i-button>
                    </Button-group>
                </div>
                <div :class="$style['left-bottom-b']">
                    <div id="electric-all-lb"></div>
                </div>
            </div>
            <div id="electric-right-all" :class="$style['right-all']">
                <div id="electric-right-top" :class="$style['right-top']"></div>
                <div id="electric-right-topcity" :class="[$style['right-top-back']]">
                        <i-button 
                        type="primary" 
                        v-show="mapMoudle==='city' || mapMoudle==='country'"
                        @click="goBack()" 
                        :style="{borderColor: 'rgba(255, 255, 255, 0.8)'}">
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
                <div :class="[$style['right-top-company']]">
                    <ul>
                        <li  v-show="mapMoudle==='province' || mapMoudle==='company'" 
                        :class="$style['company-name']"  
                        @click="goCompany('省本部')">省本部</li>
                        <li  v-show="mapMoudle==='province' || mapMoudle==='company'" 
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
                <div  :class="$style['right-mid']">
                    <Button-group>
                        <i-button type="ghost" 
                        @click="rightViewPointNum()" 
                        :style="[rightCurrent==1?buttonStyle:{}]">局站数</i-button>
                        <i-button type="ghost" 
                        @click="rightViewNumber()" 
                        :style="[rightCurrent==2?buttonStyle:{}]">电量</i-button>
                        <i-button type="ghost" 
                        @click="rightViewMoney()"
                        :style="[rightCurrent==3?buttonStyle:{}]">电费</i-button>
                        <i-button type="ghost" 
                        @click="rightViewPrice()"
                        :style="[rightCurrent==4?buttonStyle:{}]">电价</i-button>
                    </Button-group>                    
                </div>
                <div :class="$style['right-bottom']" v-show="rightCurrent!==4">   
                    <div id="electric-right-bottom" :class="$style.pie" style="z-index: 100;"></div>
                    <div id="electric-right-bottompie2" :class="$style.pie" style="position: absolute;"></div>
                    <!-- <div id="electric-right-bottompie3" :class="$style.pie" style="position: absolute;"></div> -->
                    <!-- <div :class="$style.tablebar">
                        <div :class="[$style.bar,$style.top]">
                        <table-bar v-if="rightBottom.eleOfficePoint[0]" :data="rightBottom.eleOfficePoint[0]">
                        </table-bar>
                        </div>
                        <div :class="[$style.bar,$style.bottom]">
                        <table-bar v-if="rightBottom.eleOfficePoint[1]" :data="rightBottom.eleOfficePoint[1]">
                        </table-bar>                            
                        </div>
                    </div> -->
                </div>
                <div :class="[$style['right-bottom'],$style['right-bottom-price']]" v-show="rightCurrent===4">   
                    <div id="electric-right-bottom-line1" :class="$style.linebar1"></div>
                    <div id="electric-right-bottom-line2" :class="$style.linebar2"></div>
                </div>
            </div>
        </div>
</template>

<script>
import cardText from './electric/card.vue';
import tableBar from './genery/tablebarcomp.vue';
import 'echarts/map/js/province/zhejiang.js';
import jzMap from './chartconfig/zjMap.js';
import { categoryCount, categoryCost, cityMap as zjCitysArr } from './chartconfig/staticData.js';
import ConfigLine from './chartconfig/electricLine.js';
import ConfigLineSmall from './chartconfig/electricLineSmall.js';
import { provinceMap, cityMap } from './chartconfig/generyMap.js';
import { ConfigElePie1, ConfigElePie2 } from './chartconfig/electricPie.js';
import ConfigPieLine from './chartconfig/electricPieAndLine.js';
import { cityDataArr } from './cityMapCode.js';
import {
    getProvinceParam,
    getCityParam,
    searchVal,
    searchValArr,
    searchEncsArr,
    searchValsArr,
    searchMapData,
    controlMapLabel,
    addDoubleArr2,
    getSortMapArr,
    formatNumberRgx

}
    from './dataUtil.js';
import {
    electricBasicPage,
    cityEncodeArr,
    cityCodeArr,
    cityNameArr,
    countyEncodeArr,
    getCountyCode,
    getCountyName,
    exceEncodeArr,
    getCountyCodeOne
}
    from './electric/origindata.js';

export default {
    data () {
        return {
            leftCurrent: 1,
            rightCurrent: 1,
            sourceData: {},
            sourceCountryData: {},
            ecxeptionData: [],
            rightBottom: {
                eleOfficePoint: [],
                elecountList: [],
                elecostList: [],
                elePriceList: []
            },
            buttonStyle: {
                backgroundColor: 'rgba(16, 162, 249, 1)'
            },
            currentCityName: '',
            currentCity: 'A33',
            currentCityArr: cityNameArr,
            currentCityCodeArr: cityCodeArr,
            mapMoudle: 'province',
            countryNameOne: '',
            countryParentName: ''
        };
    },
    components: {
        cardText,
        tableBar
    },
    computed: {
        currentMonth() {
            return this.$store.getters.month;
        },
        allCount() {
            let val = this.mapMoudle === 'country'
                ? searchVal(this.currentCity, 'NHDP0036', this.sourceCountryData)
                : searchVal(this.currentCity, 'NHDP0036', this.sourceData);
            return val || 0;
        },
        allCountRa() {
            let val = this.mapMoudle === 'country'
                ? (searchVal(this.currentCity, 'NHDP0038', this.sourceCountryData, 4) * 100).toFixed(2)
                : (searchVal(this.currentCity, 'NHDP0038', this.sourceData, 4) * 100).toFixed(2);
            return val || 0;
        },
        allCost() {
            let val = this.mapMoudle === 'country'
                ? searchVal(this.currentCity, 'NHDP0037', this.sourceCountryData)
                : searchVal(this.currentCity, 'NHDP0037', this.sourceData);
            return val || 0;
        },
        allCostRa() {
            let val = this.mapMoudle === 'country'
                ? (searchVal(this.currentCity, 'NHDP0039', this.sourceCountryData, 4) * 100).toFixed(2)
                : (searchVal(this.currentCity, 'NHDP0039', this.sourceData, 4) * 100).toFixed(2);
            return val || 0;
        },
        allException() {
            const encodes = exceEncodeArr;
            // for (let index = 113; index < 119; index++) {
            //     //先屏蔽'合同电价异常'和单表电量异常
            //     if (index === 113 || index === 116) {
            //         continue;
            //     }
            //     encodes.push(`NHDP0${index}`);
            // }
            if (this.mapMoudle === 'province') {
                const source = this.ecxeptionData;
                if (source.length === 0) {
                    return 0;
                }
                const numArr = source.map(ele => ~~ele['indexVlue']);
                return ~~eval(numArr.join('+'));
            }
            const arr = this.mapMoudle === 'country'
                ? searchEncsArr(encodes, this.currentCity, this.sourceCountryData)
                : searchEncsArr(encodes, this.currentCity, this.sourceData);
            return arr && parseInt(eval(arr.join('+')));
        }
        // pueType() {
        //     const encodes = ['NHDP0062', 'NHDP0063'];

        //     let data = searchValsArr(encodes, jzMap.arrCode);
        //     return {
        //         xAxisData: jzMap.arrName,
        //         pueAdata: data[0],
        //         pueBdata: data[1]
        //     };
        // }
    },
    methods: {
        goBack() {
            this.mapMoudle = 'province';
            this.currentCity = 'A33';
            this.currentCityArr = cityNameArr;
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
        leftViewNumber() {
            this.leftCurrent = 1;
        },
        leftViewMoney() {
            this.leftCurrent = 2;
        },
        resizeChart() {
            let charts = this.$store.getters.chartsArr;
            const arr = ['chart4', 'chart5', 'chart6', 'chart7'];
            for (let item in charts) {
                (charts[item] && arr.includes(item)) && charts[item].resize();
            }
        },
        rightViewPointNum() {
            this.rightCurrent = 1;
        },
        rightViewNumber() {
            this.rightCurrent = 2;
        },
        rightViewMoney() {
            this.rightCurrent = 3;
        },
        rightViewPrice() {
            this.rightCurrent = 4;
        },
        goElectricQuantity() {
            this.$router.push({ name: 'ElectricDetail', params: { page: 'quantity' } });
        },
        goElectricPrice() {
            this.$router.push({ name: 'ElectricDetail', params: { page: 'price' } });
        },
        goExceptionPage() {
            this.$router.push({ name: 'ElectricExc', params: { text: '666' } });
        },
        getAxiosData(date) {
            let param1 = getProvinceParam(date, this.currentCity, electricBasicPage);
            let param2;
            if (this.mapMoudle === 'province') { // 省级查看视图，查省级数据和所有市级数据
                param2 = getCityParam(date, cityCodeArr, cityEncodeArr);
            } else if (this.mapMoudle === 'city') { // 市级查看视图，查某个市级数据和所有区县级数据
                let countryCodeArr = getCountyCode(cityDataArr, this.currentCity);
                param2 = getCityParam(date, countryCodeArr, countyEncodeArr);
            } else if (this.mapMoudle === 'company') {
                let countryCodeArr = [this.currentCity];
                param2 = getCityParam(date, countryCodeArr, ['NHDP0062', 'NHDP0063', 'NHDP0043', 'NHDP0048']);
            } else {
                let countryCodeArr = [this.currentCity];
                param2 = getCityParam(date, countryCodeArr, ['NHDP0062', 'NHDP0063', 'NHDP0043', 'NHDP0048']);
            }
            let data = param1 + ',' + param2;
            let postData = this.$store.getters.module === 'dev' ? { paramArrs: data } : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                if (this.mapMoudle === 'country') {
                    this.sourceCountryData = response.data;
                    this.setPUEData(this.sourceCountryData);
                    this.setLeftBottom(this.sourceCountryData);
                    this.setRightBottom(this.sourceCountryData);
                    this.setMap(this.sourceCountryData, this.currentCity);
                    return;
                }
                this.sourceData = response.data;
                this.setPUEData(this.sourceData);
                this.setLeftBottom(this.sourceData);
                this.setMap(this.sourceData, this.currentCity);
                this.setRightBottom(this.sourceData);
            }).catch((error) => {
                console.warn(error);
            });
        },
        getAxiosDataToCountryMap(date, cityName) {
            const code = jzMap.mapCode[cityName];
            let param1 = getProvinceParam(date, code, electricBasicPage);
            let countryCodeArr = getCountyCode(cityDataArr, code);
            let param2 = getCityParam(date, countryCodeArr, countyEncodeArr);

            let data = param1 + ',' + param2;
            let postData = this.$store.getters.module === 'dev' ? { paramArrs: data } : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                this.sourceData = response.data;
                const countryToUpdateCityMap = true;
                this.setMap(this.sourceData, code, countryToUpdateCityMap);
            }).catch((error) => {
                console.warn(error);
            });
        },
        getAxiosDataToException(date) {
            const cityCodes = jzMap.arrCode;
            const encodes = exceEncodeArr;
            const param = getCityParam(date, cityCodes, encodes);
            const postData = this.$store.getters.module === 'dev' ? { paramArrs: param } : this.$qs.stringify({
                paramArrs: param
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then(res => {
                this.ecxeptionData = res.data;
            }).catch(err => {
                console.warn(err);
            });
        },
        setPUEData(arr) {
            let line = this.$echarts.init(document.getElementById('electric-all-lt'));
            this.$store.commit('setCharts', { name: 'chart1', val: line });
            const lineOption = JSON.parse(JSON.stringify(ConfigLine));
            const encodes = ['NHDP0062', 'NHDP0063', 'NHDP0043', 'NHDP0048'];
            let data = [];
            let pueType = {};
            let codeArr = [];
            let cityArr = [];
            if (this.mapMoudle === 'country') {
                codeArr = [this.currentCity];
                cityArr = [this.countryNameOne];
            }
            if (this.mapMoudle === 'city') {
                codeArr = this.currentCityCodeArr;
                cityArr = this.currentCityArr;
            }
            if (this.mapMoudle === 'company') {
                codeArr = [this.currentCity];
                cityArr = [jzMap.mapName[this.currentCity]];
            }
            if (this.mapMoudle === 'province') {
                const index = jzMap.arrCode.indexOf('A3300');
                codeArr = jzMap.arrCode.slice(0, -3); codeArr.push(jzMap.arrCode[index]);
                cityArr = jzMap.arrName.slice(0, -3); cityArr.push(jzMap.arrName[index]);
            }
            data = searchValsArr(encodes, codeArr, arr);
            pueType = {
                xAxisData: cityArr,
                pueAdata: data[0],
                pueBdata: data[1],
                pueCdata: data[2],
                pueDdata: data[3]
            };
            lineOption.yAxis[0].max = 3;
            lineOption.yAxis[0].min = 1;
            lineOption.yAxis[0].splitNumber = 5;
            let a = pueType.pueAdata.map((ele) => {
                let obj = {};
                obj.name = parseFloat(ele).toFixed(2) + '';
                if (ele < 1) {
                    obj.value = 1;
                } else if (ele <= 3) {
                    obj.value = parseFloat(ele).toFixed(2);
                } else {
                    obj.value = 3;
                }
                return obj;
            });
            let b = pueType.pueBdata.map((ele) => {
                let obj = {};
                obj.name = parseFloat(ele).toFixed(2) + '';
                if (ele < 1) {
                    obj.value = 1;
                } else if (ele <= 3) {
                    obj.value = parseFloat(ele).toFixed(2);
                } else {
                    obj.value = 3;
                }
                return obj;
            });
            let c = pueType.pueCdata.map((ele) => {
                let obj = {};
                obj.name = parseFloat(ele).toFixed(2) + '';
                if (ele < 1) {
                    obj.value = 1;
                } else if (ele <= 3) {
                    obj.value = parseFloat(ele).toFixed(2);
                } else {
                    obj.value = 3;
                }
                return obj;
            });
            let d = pueType.pueDdata.map((ele) => {
                let obj = {};
                obj.name = parseFloat(ele).toFixed(2) + '';
                if (ele < 1) {
                    obj.value = 1;
                } else if (ele <= 3) {
                    obj.value = parseFloat(ele).toFixed(2);
                } else {
                    obj.value = 3;
                }
                return obj;
            });
            lineOption.label.formatter = (params) => {
                if (params.value === 1 || params.value === 3) {
                    if (Number(params.name) === 0) {
                        return 0;
                    }
                    return params.name;
                } else {
                    // return params.value;
                    return '';
                }
            };
            lineOption.tooltip.formatter = params => {
                let str = params[0].axisValue + '<br>';
                params.forEach(ele => {
                    str += `${ele.marker}${ele.seriesName}:${ele.name}<br>`;
                });
                return str;
            };
            if (this.mapMoudle === 'province' || this.mapMoudle === 'city') {
                lineOption.xAxis[0].axisLabel.rotate = 35;
            }
            lineOption.yAxis[0].axisLabel.formatter = function(value, index) {
                return parseFloat(value).toFixed(1);
            };
            lineOption.xAxis[0].data = pueType.xAxisData && pueType.xAxisData;
            lineOption.series[0].data = a && a;
            lineOption.series[1].data = b && b;
            lineOption.series[2].data = c && c;
            lineOption.series[3].data = d && d;
            line.setOption(lineOption);
        },
        setLeftBottom(arr) {
            const configOption = JSON.parse(JSON.stringify(ConfigPieLine));
            let pieLine = this.$echarts.init(document.getElementById('electric-all-lb'));
            this.$store.commit('setCharts', { name: 'chart2', val: pieLine });

            const encodes1 = ['NHDP0052', 'NHDP0053', 'NHDP0054', 'NHDP0055', 'NHDP0056'];
            const encodes2 = ['NHDP0057', 'NHDP0058', 'NHDP0059', 'NHDP0060', 'NHDP0061'];
            let dataEcount = [];
            let dataEcost = [];
            let cityArr = [];
            if (this.mapMoudle === 'country') {
                let codeArr = [this.currentCity];
                cityArr = [this.countryNameOne];
                dataEcount = searchValsArr(encodes1, codeArr, arr);
                dataEcost = searchValsArr(encodes2, codeArr, arr);
                // configOption.xAxis[0].data = cityArr;
            }
            if (this.mapMoudle === 'city') {
                let codeArr = this.currentCityCodeArr;
                cityArr = this.currentCityArr;
                dataEcount = searchValsArr(encodes1, codeArr, arr);
                dataEcost = searchValsArr(encodes2, codeArr, arr);
                // configOption.xAxis[0].data = cityArr;
            }
            if (this.mapMoudle === 'company') {
                let codeArr = [this.currentCity];
                cityArr = [jzMap.mapName[this.currentCity]];
                dataEcount = searchValsArr(encodes1, codeArr, arr);
                dataEcost = searchValsArr(encodes2, codeArr, arr);
                // configOption.xAxis[0].data = cityArr;
            }
            if (this.mapMoudle === 'province') {
                cityArr = zjCitysArr;
                dataEcount = searchValsArr(encodes1, jzMap.arrCode, arr);
                dataEcost = searchValsArr(encodes2, jzMap.arrCode, arr);
            }

            let dataPieCount = searchEncsArr(encodes1, this.currentCity, arr);
            let dataPieCost = searchEncsArr(encodes2, this.currentCity, arr);
            if (this.leftCurrent === 1) {
                configOption.legend.data = categoryCount;
                configOption.series[0].data = dataPieCount;
                configOption.series[0].name = '电量占比';
                const sum = addDoubleArr2(dataEcount);
                // 对数据排序
                const results = getSortMapArr('drop', sum, cityArr, ...dataEcount);
                // console.log(cityArr,dataEcount,sum,results,results[1],results.slice(2));
                configOption.xAxis[0].data = results[1];
                // 设置如果最大值max大于第二(max2)1.5倍以上则设置图标最大值为1.5倍max2，并将max列的值缩小到1.5max2
                const max = results[0][0];
                const max2 = results[0][1];
                const module = this.mapMoudle;
                let scale = 1;
                if (max > max2 * 1.5 && module !== 'country' && module !== 'company') {
                    const a = max / max2;
                    scale = a / 1.5;
                }
                console.log(max, max2);
                console.log(parseFloat(max * 1.5).toFixed(2), parseFloat(max2 * 1.5).toFixed(2));
                configOption.yAxis[0].max = (module === 'country' || module === 'company') ? parseFloat(max * 1.5).toFixed(2) : parseFloat(max2 * 1.5).toFixed(2);
                configOption.series.push.apply(configOption.series, getDataLineBar(categoryCount, results.slice(2), scale, module));
            }
            if (this.leftCurrent === 2) {
                configOption.legend.data = categoryCost;
                configOption.series[0].name = '电费占比';
                configOption.series[0].data = dataPieCost;
                const sum = addDoubleArr2(dataEcost);
                // 对数据排序
                const results = getSortMapArr('drop', sum, cityArr, ...dataEcost);

                configOption.xAxis[0].data = results[1];
                // 设置如果最大值max大于第二(max2)1.5倍以上则设置图标最大值为1.5倍max2，并将max列的值缩小到1.5max2
                const max = results[0][0];
                const max2 = results[0][1];
                const module = this.mapMoudle;
                let scale = 1;
                if (max > max2 * 1.4 && module !== 'country' && module !== 'company') {
                    const a = max / max2;
                    scale = a / 1.5;
                }
                configOption.yAxis[0].max = (module === 'country' || module === 'company') ? parseFloat(max * 1.5).toFixed(2) : parseFloat(max2 * 1.5).toFixed(2);
                configOption.series.push.apply(configOption.series, getDataLineBar(categoryCost, results.slice(2), scale, module));
            }
            if (this.mapMoudle === 'province' || this.mapMoudle === 'city') {
                configOption.xAxis[0].axisLabel.rotate = 35;
            }
            // 设置label显示值为data中的value1真实值
            configOption.tooltip.formatter = function(param) {
                let str = `<div>${param[0].axisValue}</div>`;
                param.forEach((ele, index) => {
                    str += `<div>${ele.marker}${ele.name}:${ele.data.value1}</div>`;
                });
                return str;
            };
            console.log(configOption);
            pieLine.setOption(configOption);
        },
        setMap(arr, code, countryToUpdateCityMap) {
            if (this.mapMoudle === 'company') {
                return;
            }
            let map = '';
            if (this.mapMoudle === 'province') {
                map = this.$echarts.init(document.getElementById('electric-right-top'));
                map.clear();
                this.$store.commit('setCharts', { name: 'chart3', val: map });
                let codes = jzMap.arrCode;
                const encodes = ['NHDP0036', 'NHDP0037'];
                let data = searchMapData(codes, encodes, arr, 'city');
                const mapconfig = JSON.parse(JSON.stringify(provinceMap));
                mapconfig.title.text = '当年累计用电';
                mapconfig.tooltip.formatter = function(params) {
                    return `<div>${params.data.name}</div><div>累计用电量：${params.data.value}万度</div> <div>累计电费：${params.data.value1}万元</div>`;
                };
                let max = 0;
                data.forEach(ele => {
                    if (parseFloat(ele.value) > max) {
                        max = Math.ceil(parseFloat(ele.value));
                    }
                });
                mapconfig.dataRange.max = max;
                mapconfig.series[0].data = data;
                map.setOption(mapconfig);
            } else if (this.mapMoudle === 'city') {
                map = this.$echarts.init(document.getElementById('electric-right-top'));
                map.clear();
                let name = jzMap.mapName[code];
                this.$echarts.registerMap(name, jzMap.mapJson[name]);
                const mapconfig = JSON.parse(JSON.stringify(cityMap));
                let clickCode = jzMap.mapCode[name];
                let subCodeCount = jzMap.countryCodeCount[clickCode];
                let subCodes = addCodes(clickCode, subCodeCount);
                const encodes = ['NHDP0036', 'NHDP0037'];
                let data2 = searchMapData(subCodes, encodes, arr, 'country');
                mapconfig.title.text = '当年累计用电';
                mapconfig.tooltip.formatter = function(params) {
                    return `<div>${params.data.name}</div><div>总能耗量：${params.data.value}万度</div> <div>总能耗费：${params.data.value1}万元</div>`;
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
                map.setOption(mapconfig);
            } else {
                if (this.countryParentName && countryToUpdateCityMap) {
                    map = this.$echarts.init(document.getElementById('electric-right-top'));
                    map.clear();
                    let name = this.countryParentName;
                    this.$echarts.registerMap(name, jzMap.mapJson[name]);
                    const mapconfig = JSON.parse(JSON.stringify(cityMap));
                    let clickCode = jzMap.mapCode[name];
                    let subCodeCount = jzMap.countryCodeCount[clickCode];
                    let subCodes = addCodes(clickCode, subCodeCount);
                    const encodes = ['NHDP0036', 'NHDP0037'];
                    let data2 = searchMapData(subCodes, encodes, this.sourceData, 'country');
                    mapconfig.title.text = '当年累计用电';
                    mapconfig.tooltip.formatter = function(params) {
                        return `<div>${params.data.name}</div><div>总能耗量：${params.data.value}万度</div> <div>总能耗费：${params.data.value1}万元</div>`;
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
                    map.setOption(mapconfig);
                }
            }
            // map.hideLoading();
            controlMapLabel(map);
            map && map.off('click');
            map && map.on('click', (param) => {
                // map.showLoading();
                if (this.mapMoudle === 'country') {
                    this.currentCity = getCountyCodeOne(cityDataArr, param.name);
                    this.currentCityArr = [param.name];
                    this.countryNameOne = param.name;
                    return;
                }
                if (this.mapMoudle === 'city') {
                    this.mapMoudle = 'country';
                    this.countryNameOne = param.name;
                    this.currentCity = getCountyCodeOne(cityDataArr, param.name);
                    return;
                }
                this.mapMoudle = 'city';
                this.currentCityName = param.name;
                let clickCode = jzMap.mapCode[param.name];
                this.countryParentName = param.name;
                this.currentCityArr = getCountyName(cityDataArr, clickCode);
                this.currentCityCodeArr = getCountyCode(cityDataArr, clickCode);
                this.currentCity = clickCode;
            });
        },
        setRightBottom(arr) {
            let encodes1 = [];
            let encodes2 = [];
            if (this.rightCurrent === 4) {
                encodes1 = ['NHDP0103', 'NHDP0104', 'NHDP0106', 'NHDP0105', 'NHDP0107'];
                encodes2 = ['NHDP0108', 'NHDP0110', 'NHDP0109', 'NHDP0111', 'NHDP0112'];
                const Xdata1 = ['直供电', '大工业', '一般工商', '居民生活', '不明'];
                const Xdata2 = ['转供电', '铁塔直供', '铁塔转供', '其他转供', '不明'];
                this.$nextTick(() => {
                    let line1 = this.$echarts.init(document.getElementById('electric-right-bottom-line1'));
                    let line2 = this.$echarts.init(document.getElementById('electric-right-bottom-line2'));
                    // this.$store.commit('setCharts', {name: 'chart4', val: line1});
                    // this.$store.commit('setCharts', {name: 'chart5', val: line2});
                    const lineOption1 = JSON.parse(JSON.stringify(ConfigLineSmall));
                    const lineOption2 = JSON.parse(JSON.stringify(ConfigLineSmall));
                    let data1 = searchEncsArr(encodes1, this.currentCity, arr);
                    let data2 = searchEncsArr(encodes2, this.currentCity, arr);
                    // data1 = data1.map((ele) => {
                    //     return ele ? parseInt(ele) : 0;
                    // });
                    // data2 = data2.map((ele) => {
                    //     return ele ? parseInt(ele) : 0;
                    // });
                    // console.log(data1);
                    // let val = data1[0];
                    // data1[0] = {
                    //     value: val,
                    //     itemStyle: {
                    //         // color: '#ffa848',
                    //         borderColor: 'rgba(255, 255, 255, 0.8)',
                    //         borderWidth: 5
                    //     }
                    // };
                    lineOption1.series[0].data = data1;
                    lineOption1.xAxis[0].data = Xdata1;
                    lineOption1.series[0].color = (params) => {
                        const colorList = ['#ffa848', '#fad04e', '#fad04e', '#fad04e', '#fad04e'];
                        return colorList[params.dataIndex];
                    };
                    lineOption2.series[0].data = data2;
                    lineOption2.series[0].name = '转供电';
                    lineOption2.legend.data = ['转供电'];
                    lineOption2.series[0].color = (params) => {
                        const colorList = ['#24c6ff', '#9fcff8', '#9fcff8', '#9fcff8', '#9fcff8'];
                        return colorList[params.dataIndex];
                    };
                    lineOption2.xAxis[0].data = Xdata2;
                    line1.setOption(lineOption1);
                    line2.setOption(lineOption2);
                });

                return;
            }
            if (this.rightCurrent === 1) {
                encodes1 = ['NHDP0081', 'NHDP0077', 'NHDP0079', 'NHDP0078', 'NHDP0080'];
                encodes2 = ['NHDP0086', 'NHDP0083', 'NHDP0082', 'NHDP0084', 'NHDP0085'];
                ConfigElePie1.tooltip.formatter = '{b} <br/>{c}(个)<br/>占比： {d}%';
            }
            if (this.rightCurrent === 2) {
                encodes1 = ['NHDP0068', 'NHDP0064', 'NHDP0066', 'NHDP0065', 'NHDP0067'];
                encodes2 = ['NHDP0073', 'NHDP0070', 'NHDP0069', 'NHDP0071', 'NHDP0072'];
                ConfigElePie1.tooltip.formatter = '{b} <br/>{c}(万度)<br/>占比：{d}%';
            }
            if (this.rightCurrent === 3) {
                encodes1 = ['NHDP0094', 'NHDP0090', 'NHDP0092', 'NHDP0091', 'NHDP0093'];
                encodes2 = ['NHDP0099', 'NHDP0096', 'NHDP0095', 'NHDP0097', 'NHDP0098'];
                ConfigElePie1.tooltip.formatter = '{b} <br/>{c}(万元)<br/>占比：{d}%';
            }
            let offPoint1 = searchEncsArr(encodes1, this.currentCity, arr);
            let offPoint2 = searchEncsArr(encodes2, this.currentCity, arr);
            // this.rightBottom.eleOfficePoint = [getElectricItem(offPoint1, 1), getElectricItem(offPoint2, 2)];

            let pie1 = this.$echarts.init(document.getElementById('electric-right-bottom'));
            let pie2 = this.$echarts.init(document.getElementById('electric-right-bottompie2'));

            // this.$store.commit('setCharts', {name: 'chart6', val: pie1});
            // this.$store.commit('setCharts', {name: 'chart7', val: pie2});
            ConfigElePie1.series[0].data = [
                { value: offPoint2[0] ? Number(offPoint2[0]) : 0, name: '转供电' },
                { value: offPoint1[0] ? Number(offPoint1[0]) : 0, name: '直供电' },
            ];
            const width = parseInt(document.getElementById('electric-right-bottom').clientWidth);
            ConfigElePie2.series[0].data = [
                { value: 8, name: '转供电', label: getLabel('B', offPoint2.slice(1), width * 0.58) },
                { value: 20, name: '转供电', label: { show: false }, labelLine: { show: false } },
                { value: 8, name: '直供电', label: getLabel('A', offPoint1.slice(1), width * 0.58) },
            ];
            let all = parseFloat(offPoint1[0]) + parseFloat(offPoint2[0]);
            let point2 = parseFloat(offPoint2[0]);
            // let startAngle = 270 - (parseFloat(point2 / (all * 2)).toFixed(2)) * 360;
            // ConfigElePie1.series[0].startAngle = startAngle;
            let angle = all === 0 ? 0 : (parseFloat(point2 / all).toFixed(2)) * 360;
            let startAngle = angle >= 80 ? 0 : 320 + angle / 2;
            ConfigElePie1.series[0].startAngle = startAngle;
            pie2.setOption(ConfigElePie2);

            all ? pie1.setOption(ConfigElePie1) : pie1.clear();
        },
        setRightBottomCountry() {

        }
    },
    created() {
        this.getAxiosData(this.currentMonth);
        this.getAxiosDataToException(this.currentMonth);
    },
    beforeDestroy() {

    },
    mounted() {
        // let map = this.$echarts.init(document.getElementById('electric-right-top'));
        // let pie2 = this.$echarts.init(document.getElementById('electric-right-bottom'));

        // map.setOption(provinceMap);
        // pie2.setOption(ConfigElePie);
        // console.log(this.$refs);
    },
    watch: {
        currentMonth: function(val, oldVal) {
            this.mapMoudle === 'country' && this.getAxiosDataToCountryMap(val, this.countryParentName);
            this.getAxiosData(val);
            if (this.mapMoudle === 'province') {
                this.getAxiosDataToException(this.currentMonth);
            }
        },
        currentCity: function(val, oldVal) {
            this.getAxiosData(this.currentMonth);
        },
        leftCurrent() {
            this.mapMoudle === 'country' ? this.setLeftBottom(this.sourceCountryData) : this.setLeftBottom(this.sourceData);
        },
        rightCurrent() {
            // this.this.$nextTick(() => {
            this.mapMoudle === 'country' ? this.setRightBottom(this.sourceCountryData) : this.setRightBottom(this.sourceData);
            // });

            // this.resizeChart();
        }
    }

};
function getDataLineBar(category, dataArr, scale, module) {
    const array = [];

    category.forEach((ele, index) => {
        const data = dataArr[index];
        const dataFormatter = data.map((element, i) => {
            return {
                name: ele,
                value: i === 0 && module !== 'country' ? (element / scale) : element,
                value1: element
            };
        });
        let obj = {
            name: ele,
            type: 'bar',
            stack: '用量',
            barWidth: '13',
            barCategoryGap: '10%',
            data: dataFormatter
        };
        array.push(obj);
    });
    return array;
}
function getDataPie(category, dataArr) {
    const array = [];
    category.forEach((ele, index) => {
        let obj = {
            name: ele,
            value: dataArr[index]
        };
        array.push(obj);
    });
    return array;
}

function addCodes(code, count) {
    let arr = [];
    for (let index = 1; index <= count; index++) {
        index > 9 ? arr.push(`${code}${index}`) : arr.push(`${code}0${index}`);
    }
    return arr;
}
function getElectricItem(valArr, type) {
    // let arr = type === 1 ? [{name: '直供电', value: 0}] : [{name: '转供电', value: 0}];
    let arr = [];
    const staticData = type === 1 ? ['直供电', '大工业', '居民生活', '一般商业', '其他'] : ['转供电', '铁塔转供', '铁塔直供', '协议栈转供', '其他'];
    valArr.forEach(function (ele, index) {
        arr.push({
            name: staticData[index],
            val: (ele ? parseInt(ele) : 0)
        });
    });
    return arr;
}
function getLabel(type, data, width) {
    width = width || 312;
    let tempTitle = type === 'A' ? ('{legend1|}{valueHead|大工业}{splitline|}{legend2|}{valueHead|一般工商}{splitline|}' +
    '{legend3|}{valueHead|居民生活}{splitline|}{legend4|}{valueHead|不明}')
        : ('{legend1|}{valueHead|铁塔直供}{splitline|}{legend2|}{valueHead|铁塔转供}{splitline|}' +
    '{legend3|}{valueHead|其他转供}{splitline|}{legend4|}{valueHead|不明}');
    const tempVal = type === 'A' ? `{legend5|}{valueHead|${parseInt(data[0])}}{splitline|}{legend5|}{valueHead|${parseInt(data[1])}}{splitline|}{legend5|}{valueHead|${parseInt(data[2])}}{splitline|}{legend5|}{valueHead|${parseInt(data[3])}}`
        : `{legend5|}{valueHead|${parseInt(data[0])}}{splitline|}{legend5|}{valueHead|${parseInt(data[1])}}{splitline|}{legend5|}{valueHead|${parseInt(data[2])}}{splitline|}{legend5|}{valueHead|${parseInt(data[3])}}`;
    let all = 0;
    data.forEach(element => {
        all += Number(element);
    });
    let widthArr = [];
    if (all > 0) {
        data.forEach(ele => {
            let wid = parseInt(Number(ele) / all * width);
            widthArr.push(wid);
        });
    } else {
        widthArr = [78, 78, 78, 77];
    }
    const label = {
        normal: {
            formatter: [
                '{bara1|}{bara2|}{bara3|}{bara4|}',
                '{hr|}',
                tempTitle,
                tempVal
            ].join('\n'),
            backgroundColor: 'rgba(103, 179, 238, 0.2)',
            // borderColor: '#777',
            borderWidth: 0,
            position: 'right',
            borderRadius: 1,
            padding: [0, 0, 0, 0],
            rich: {
                // ['#ffed8b', '#ffa848', '#70fed2', '#6668ff', '#3dd55a']
                bara1: {
                    width: widthArr[0],
                    backgroundColor: '#ffed8b',
                },
                bara2: {
                    width: widthArr[1],
                    backgroundColor: '#ffa848',

                },
                bara3: {
                    width: widthArr[2],
                    backgroundColor: '#70fed2',

                },
                bara4: {
                    width: widthArr[3],
                    backgroundColor: '#6668ff',

                },
                legend1: {
                    width: 6,
                    backgroundColor: '#ffed8b',
                },
                legend2: {
                    width: 6,
                    backgroundColor: '#ffa848',
                },
                legend3: {
                    width: 6,
                    backgroundColor: '#70fed2',
                },
                legend4: {
                    width: 6,
                    backgroundColor: '#6668ff',
                },
                legend5: {
                    width: 6,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                },
                splitline: {
                    width: 2,
                    backgroundColor: 'rgba(25, 94, 171, 0.8)',
                    height: 20,
                },
                valueHead: {
                    width: parseInt((width - 32) / 4),
                    height: 20,
                    color: 'rgba(255, 255, 255, 0.8)',
                    // padding: [0, 10, 0, 5],
                    align: 'left',
                    // backgroundColor: 'rgba(103, 179, 238, 0.5)',
                },
                hr: {
                    borderColor: '#0067c0',
                    width: '100%',
                    borderWidth: 1.5,
                    height: 0
                }
            }
        }
    };
    return label;
}
</script>

<style lang="scss" module>
    .content{
        height: 90%;
        width: 100%;
        //margin-top: 20px;
        position: absolute;
        top: 9.9%;
        overflow-y: hidden;
        &>div{

            background-color: rgba(16,162,249,0);
            border: 0.08rem solid rgba(16,162,249,0.5);
            position: absolute;
            border-radius: 0.6rem;
        }
        .left-top{
            left: 2%;
            width:53%;
            height: 17%;
            background:none;
            border: none;
            &>div{
                position: absolute;
                height: 100%;
                width: 36%;
                background-color: rgba(16,162,249,0.4);
                border: 0.08rem solid rgba(16,162,249,0.5);
                border-radius: 0.6rem;
            }
            .left-top-m{
                left:37.5%;             
            }
            .left-top-r{
                left:75%;
                width: 25%;
            }
        }
        .left-bottom{
            left: 2%;
            top:20%;
            width:53%;
            height: 75%;
            &>div{
                width:100%;
            }
            .left-bottom-t{
                height: 40%;
                &>div{
                    height: 100%;
                    width: 100%;
                }
            }
            .left-bottom-m{
                //background-color: #ffea00;
                height: 7%;
                text-align: center;             
            }
            .left-bottom-b{
                height: 52%;
                &>div{
                    height: 100%;
                    width: 100%;
                }                  
            }
        }
        .right-all{
            height: 95%;
            right: 3%;
            width:40%;
            .right-top{
                height:55%;               
            }
            .right-top-back{
                top:20px;
                right: 25px;
                position: absolute;
            }
            .right-top-company{
                position: absolute;
                right: 5%;
                bottom: 55%;
                ul li{
                    list-style: none;
                    color:rgba(255, 255, 255, 0.8);
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
            .right-mid{
                height: 5%;
                // padding-left: calc(50% - 116px);
                // position: absolute;
                // z-index: 101;
                text-align: center;
            }
            .right-bottom{
                height:37%;
                position: relative;
                .pie{
                    position: absolute;
                    //float: left;
                    height: 100%;
                    display: inline-block;
                    width: 100%;
                }
                .tablebar{
                    //float: left;
                    height: 100%;
                    display: inline-block;
                    width: 60%;
                    .bar{
                        height: 20%;
                        width: 60%;
                    }
                    .top{
                        position: absolute;
                        top:35%
                    }
                    .bottom{
                        position: absolute;
                        top:60%
                    }
                }
                .linebar1,.linebar2{
                    height: 49%;
                    width: 100%;
                }
            }
        }
    }
  
</style>


