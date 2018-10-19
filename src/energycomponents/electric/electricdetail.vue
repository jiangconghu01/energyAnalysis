<template>
        <div :class="$style.content">
            <div :class="$style.nav">
                <Row style="height:100%">
                    <i-col span="6" :class="$style.line">
                        <Button-group style="width:100%">
                        <i-button type="ghost" style="font-size:16px;border:none;">|&nbsp;{{current===1?'电量':'电费'}}多维分析</i-button>
                        <i-button type="ghost" 
                        @click="goback()" style="margin-top: 3px;">返回统计数据</i-button>
                    </Button-group>
                    </i-col>
                    <i-col span="5" :class="$style.line"></i-col>
                    <i-col span="3" :class="$style.line" style="padding-top: 3px;">
                        <Button-group>
                            <i-button type="ghost" 
                            @click="viewNumber()" 
                            :style="[current==1?buttonStyle:{}]">电量</i-button>
                            <i-button type="ghost" 
                            @click="viewMoney()" 
                            :style="[current==2?buttonStyle:{}]">电费</i-button>
                        </Button-group>
                    </i-col>
                    <i-col span="10" :class="$style.line"></i-col>
                </Row>
            </div>
            <div  :class="$style['left-top']">
                <div id="electric-detail-left-top" :class="$style['left-top-content']"></div>
            </div>
            <div :class="$style['left-bottom']">
                <div id="electric-detail-left-bottom" :class="$style['left-bottom-content']"></div>
                <div :class="$style['left-bottom-tip']">
                </div>
            </div>
            <div id="electric-detail-right-all" :class="$style['right-all']">
                <div id="electric-detail-right" :class="$style['right-map']"></div>
                <div :class="[$style['right-top-back']]">
                        <i-button 
                        type="primary"
                         v-show="mapMoudle==='city' || mapMoudle==='country' "   
                        @click="backProvince()" 
                        :style="{borderColor: 'rgba(255, 255, 255, 0.8)'}">
                            <Icon type="chevron-left"></Icon>
                            返回
                        </i-button>
                        <i-button 
                        type="primary"
                        v-show="mapMoudle==='company'" 
                        @click="backProvince()" :style="{borderColor: 'rgba(255, 255, 255, 0.8)'}">
                            <Icon type="chevron-left"></Icon>
                            返回省级数据
                        </i-button>                        
                </div>
                <div :class="[$style['right-top-company']]">
                    <ul>
                        <li  v-show="mapMoudle==='province' || mapMoudle==='company'" 
                        :class="$style['company-name']"  @click="goCompany('省本部')">省本部</li>
                        <li  v-show="mapMoudle==='province' || mapMoudle==='company'" 
                        :class="$style['company-name']"  @click="goCompany('省传输局')">省传输局</li>
                        <li  v-show="mapMoudle==='province' || mapMoudle==='company'" 
                        :class="$style['company-name']" @click="goCompany('信产公司')">信产公司</li>
                        <li  v-show="mapMoudle==='city' || mapMoudle==='country'" 
                        @click="gocityCenter()" :class="$style['company-name']" >市本级</li>
                    </ul>
                </div>                    
            </div>
        </div>
</template>

<script>

// import tableBar from './tablebarcomp.vue';
import 'echarts/map/js/province/zhejiang.js';
import jzMap from '../chartconfig/zjMap.js';
import { detailXarr, labelZoom } from '../chartconfig/staticData.js';
import ConfigBarLine from '../chartconfig/electricBarAndLine.js';
import { provinceMap, cityMap } from '../chartconfig/generyMap.js';
import { cityDataArr } from '../cityMapCode.js';
import {
    getProvinceParam,
    getCityParam,
    searchVal,
    searchValArr,
    searchEncsArr,
    searchValsArr,
    getMonthsArr,
    controlMapLabel,
    getMonthsParam
}
    from '../dataUtil.js';
import {
    cityEncodeArr,
    cityCodeArr,
    cityNameArr,
    countyEncodeArr,
    getCountyCode,
    getCountyName,
    detailEncodeArr,
    detailEncodeArr2,
    getCountyCodeOne
}
    from './origindata.js';
export default {
    data () {
        return {
            current: 1,
            buttonStyle: {
                backgroundColor: 'rgba(16, 162, 249, 1)'
            },
            sourceData: {},
            sourceData2: {},
            sourceMonthData: {},
            currentCityName: '',
            currentCity: 'A33',
            currentCityArr: cityNameArr,
            currentCityCodeArr: cityCodeArr,
            countryNameOne: '',
            mapMoudle: 'province'
        };
    },
    computed: {
        currentMonth() {
            return this.$store.getters.month;
        }
    },
    components: {

    },
    beforeRouteEnter (to, from, next) { // 刷新页面时候确定tab标签位置
        let page = to.params.page === 'price' ? 2 : 1;
        next(vm => {
            vm.current = page;
        });
    },
    created() {
        // this.getAxiosData(this.currentMonth);
        // this.getMonthAxiosData(this.currentMonth);
        this.axios.all([this.getAxiosData(this.currentMonth), this.getMonthAxiosData(this.currentMonth)]).then(this.axios.spread((res1, res2) => {
            console.log(res1, res2);
        }));
    },
    methods: {
        goback() {
            this.$router.replace({ name: 'Electric' });
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
        backProvince() {
            this.mapMoudle = 'province';
            this.currentCity = 'A33';
            this.currentCityArr = cityNameArr;
            this.currentCityCodeArr = cityCodeArr;
        },
        viewNumber() {
            this.current = 1;
        },
        viewMoney() {
            this.current = 2;
        },
        getMonthAxiosData() {
            const arr = getMonthsArr(this.currentMonth);
            const encodes = detailEncodeArr2;
            const data = getMonthsParam(arr.sMonths, encodes, this.currentCity);
            let postData = this.$store.getters.module === 'dev' ? { paramArrs: data } : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                // console.log(response.data);
                this.sourceMonthData = response.data;
                this.setLeftTop(arr.sMonths, this.sourceMonthData, this.currentCity, arr.xMonths);
            }).catch((error) => {
                console.warn(error);
            });
        },
        getAxiosData(date) {
            let data = getCityParam(date, this.currentCityCodeArr, detailEncodeArr);
            let postData = this.$store.getters.module === 'dev' ? { paramArrs: data } : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                this.sourceData = response.data;
                this.setLeftBottom(this.sourceData);
                this.setMap(this.sourceData, this.currentCity);
            }).catch((error) => {
                console.warn(error);
            });
        },
        getAxiosDataToCountryMap(date, cityName) {
            const code = jzMap.mapCode[cityName];
            let countryCodeArr = getCountyCode(cityDataArr, code);
            let data = getCityParam(date, this.currentCityCodeArr, detailEncodeArr);
            let postData = this.$store.getters.module === 'dev' ? { paramArrs: data } : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                this.sourceData2 = response.data;
                let countryToUpdateCityMap = true;
                this.setMap(this.sourceData2, this.currentCity, countryToUpdateCityMap);
            }).catch((error) => {
                console.warn(error);
            });
        },
        setMap(arr, code, countryToUpdateCityMap) {
            if (this.mapMoudle === 'company') {
                return;
            }
            let map = '';
            // const encodes = ['NHDP0036', 'NHDP0037'];
            let encodes = this.current === 1 ? ['NHDP0036'] : ['NHDP0037'];
            let title = this.current === 1 ? '电量当年累计值' : '电费当年累计值';
            let unit = this.current === 1 ? '万度' : '万元';
            if (this.mapMoudle === 'province') {
                map = this.$echarts.init(document.getElementById('electric-detail-right'));
                map.clear();
                this.$store.commit('setCharts', { name: 'chart1', val: map });
                const mapconfig = JSON.parse(JSON.stringify(provinceMap));
                let codes = jzMap.arrCode;
                let data = searchMapData(codes, encodes, arr, 'city');
                let max = 0;
                data.forEach(ele => {
                    if (parseFloat(ele.value) > max) {
                        max = Math.ceil(parseFloat(ele.value));
                    }
                });
                mapconfig.dataRange.max = max;
                mapconfig.title.text = title;
                mapconfig.series[0].data = data;
                mapconfig.tooltip.formatter = `{b}<br/>{c}${unit}`;
                map.setOption(mapconfig);
            } else if (this.mapMoudle === 'city') {
                map = this.$echarts.init(document.getElementById('electric-detail-right'));
                map.clear();
                this.$store.commit('setCharts', { name: 'chart1', val: map });
                let name = jzMap.mapName[code];
                this.$echarts.registerMap(name, jzMap.mapJson[name]);
                const mapconfig = JSON.parse(JSON.stringify(cityMap));
                let clickCode = jzMap.mapCode[name];
                let subCodeCount = jzMap.countryCodeCount[clickCode];
                let subCodes = addCodes(clickCode, subCodeCount);

                let data2 = searchMapData(subCodes, encodes, arr, 'country');
                let max = 0;
                data2.forEach(ele => {
                    if (parseFloat(ele.value) > max) {
                        max = Math.ceil(parseFloat(ele.value));
                    }
                });
                mapconfig.dataRange.max = max;
                mapconfig.title.text = title;
                mapconfig.series[0].map = name;
                mapconfig.series[0].data = data2;
                mapconfig.tooltip.formatter = `{b}<br/>{c}${unit}`;
                map.setOption(mapconfig);
            } else {
                if (this.countryParentName && countryToUpdateCityMap) {
                    map = this.$echarts.init(document.getElementById('electric-detail-right'));
                    map.clear();
                    this.$store.commit('setCharts', { name: 'chart1', val: map });
                    let name = this.countryParentName;
                    this.$echarts.registerMap(name, jzMap.mapJson[name]);
                    const mapconfig = JSON.parse(JSON.stringify(cityMap));
                    let clickCode = jzMap.mapCode[name];
                    let subCodeCount = jzMap.countryCodeCount[clickCode];
                    let subCodes = addCodes(clickCode, subCodeCount);

                    let data2 = searchMapData(subCodes, encodes, this.sourceData2, 'country');
                    let max = 0;
                    data2.forEach(ele => {
                        if (parseFloat(ele.value) > max) {
                            max = Math.ceil(parseFloat(ele.value));
                        }
                    });
                    mapconfig.dataRange.max = max;
                    mapconfig.title.text = title;
                    mapconfig.series[0].map = name;
                    mapconfig.series[0].data = data2;
                    mapconfig.tooltip.formatter = `{b}<br/>{c}${unit}`;
                    map.setOption(mapconfig);
                }
            }
            const boxWidth = map ? map.getWidth() : 0;
            const boxHeight = map ? map.getHeight() : 0;
            const baseRect = Math.min(boxWidth, boxHeight);

            controlMapLabel(map);
            map && map.off('click');
            map && map.on('click', (param) => {
                if (this.mapMoudle === 'country') {
                    this.currentCity = getCountyCodeOne(cityDataArr, param.name);
                    this.currentCityArr = [param.name];
                    this.currentCityCodeArr = [this.currentCity];
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
        setLeftBottom(arr) {
            const configOption = JSON.parse(JSON.stringify(ConfigBarLine));
            configOption.dataZoom = [];
            let barLine = this.$echarts.init(document.getElementById('electric-detail-left-bottom'));
            this.$store.commit('setCharts', { name: 'chart2', val: barLine });
            const encodes1 = ['NHDP0040', 'NHDP0042', 'NHDP0041', 'NHDP0044'];
            const encodes2 = ['NHDP0045', 'NHDP0047', 'NHDP0046', 'NHDP0049'];
            let dataEcount = [];
            let dataEcost = [];
            let dataLineCount = [];
            let dataLineCost = [];
            // if(this.mapMoudle==='country'){
            //     let codeArr = this.currentCityCodeArr;
            //     let cityArr = this.currentCityArr;
            //     dataEcount = searchValsArr(encodes1, codeArr, arr);
            //     dataEcost = searchValsArr(encodes2, codeArr, arr);
            //     dataLineCount = searchValsArr(['NHDP0050'], codeArr, arr);
            //     dataLineCost = searchValsArr(['NHDP0051'], codeArr, arr);
            //     configOption.xAxis[0].data = cityArr;
            // }
            if (this.mapMoudle === 'country') {
                let codeArr = [this.currentCity];
                let cityArr = [this.countryNameOne];
                dataEcount = searchValsArr(encodes1, codeArr, arr);
                dataEcost = searchValsArr(encodes2, codeArr, arr);
                dataLineCount = searchValsArr(['NHDP0050'], codeArr, arr);
                dataLineCost = searchValsArr(['NHDP0051'], codeArr, arr);
                configOption.xAxis[0].data = cityArr;
            }
            if (this.mapMoudle === 'city') {
                let codeArr = this.currentCityCodeArr;
                let cityArr = this.currentCityArr;
                dataEcount = searchValsArr(encodes1, codeArr, arr);
                dataEcost = searchValsArr(encodes2, codeArr, arr);
                dataLineCount = searchValsArr(['NHDP0050'], codeArr, arr);
                dataLineCost = searchValsArr(['NHDP0051'], codeArr, arr);
                configOption.xAxis[0].data = cityArr;
            }
            if (this.mapMoudle === 'company') {
                let codeArr = [this.currentCity];
                let cityArr = [jzMap.mapName[this.currentCity]];
                dataEcount = searchValsArr(encodes1, codeArr, arr);
                dataEcost = searchValsArr(encodes2, codeArr, arr);
                dataLineCount = searchValsArr(['NHDP0050'], codeArr, arr);
                dataLineCost = searchValsArr(['NHDP0051'], codeArr, arr);
                configOption.xAxis[0].data = cityArr;
            }
            if (this.mapMoudle === 'province') {
                dataEcount = searchValsArr(encodes1, jzMap.arrCode, arr);
                dataEcost = searchValsArr(encodes2, jzMap.arrCode, arr);
                dataLineCount = searchValsArr(['NHDP0050'], jzMap.arrCode, arr);
                dataLineCost = searchValsArr(['NHDP0051'], jzMap.arrCode, arr);// 返回数组里边多个数组
            }
            if (this.current === 1) {
                configOption.legend.data = detailXarr;
                configOption.series[0].data = dataLineCount[0];
                configOption.series.push.apply(configOption.series, getDataLineBar(detailXarr, dataEcount));
            }
            if (this.current === 2) {
                configOption.title.subtext = '单位（万元）';
                configOption.legend.data = detailXarr.slice(1);
                // configOption.series[0].data = dataLineCost[0];
                configOption.series[0].data = [];
                configOption.series.push.apply(configOption.series, getDataLineBar(detailXarr, dataEcost));
            }
            // configOption.grid.y2 = '15%';
            configOption.grid.y2 = 40;
            if (this.mapMoudle === 'province' || this.mapMoudle === 'city') {
                configOption.xAxis[0].axisLabel.rotate = 35;
            }
            barLine.setOption(configOption);
        },
        setLeftTop(monthsArr, encodes, code, monthsxArr) {
            const configOption = JSON.parse(JSON.stringify(ConfigBarLine));
            let barLine = this.$echarts.init(document.getElementById('electric-detail-left-top'));
            this.$store.commit('setCharts', { name: 'chart3', val: barLine });
            configOption.title.text = '月度分析';
            configOption.xAxis[0].data = monthsxArr;
            const encodes1 = ['NHDP0126', 'NHDP0128', 'NHDP0127', 'NHDP0130'];
            const encodes2 = ['NHDP0131', 'NHDP0133', 'NHDP0132', 'NHDP0135'];
            let dataEcount = [];
            let dataEcost = [];
            let dataLineCount = [];
            let dataLineCost = [];
            let city = this.currentCity;

            if (this.current === 1) {
                configOption.title.subtext = '单位（万度）';
                configOption.legend.data = detailXarr;
                dataEcount = searchMonthsDataArr(monthsArr, encodes1, city, this.sourceMonthData);
                dataLineCount = searchMonthsDataArr(monthsArr, ['NHDP0136'], city, this.sourceMonthData);
                configOption.series[0].data = dataLineCount[0];
                configOption.series.push.apply(configOption.series, getDataLineBar(detailXarr, dataEcount));
            }
            if (this.current === 2) {
                configOption.title.subtext = '单位（万元）';
                configOption.legend.data = detailXarr.slice(1);
                dataEcost = searchMonthsDataArr(monthsArr, encodes2, city, this.sourceMonthData);
                dataLineCost = searchMonthsDataArr(monthsArr, ['NHDP0137'], city, this.sourceMonthData);
                // configOption.series[0].data = dataLineCost[0];
                configOption.series[0].data = [];
                configOption.series.push.apply(configOption.series, getDataLineBar(detailXarr, dataEcost));
            }
            configOption.xAxis[0].axisLabel.rotate = 30;
            barLine.setOption(configOption);
        }
    },
    mounted() {

    },
    watch: {
        currentMonth: function(val, oldVal) {
            // const arr = getMonthsArr(this.currentMonth);
            this.getAxiosData(val);
            this.getMonthAxiosData(this.currentMonth);
            this.mapMoudle === 'country' && this.getAxiosDataToCountryMap(val, this.countryParentName);
            // this.setLeftTop(arr.sMonths, this.sourceMonthData, this.currentCity, arr.xMonths);
        },
        currentCity: function(val, oldVal) {
            this.getAxiosData(this.currentMonth);
            this.getMonthAxiosData(this.currentMonth);
        },
        current() {
            this.getAxiosData(this.currentMonth);
            this.getMonthAxiosData(this.currentMonth);
            this.mapMoudle === 'country' && this.getAxiosDataToCountryMap(this.currentMonth, this.countryParentName);
            // const arr = getMonthsArr(this.currentMonth);
            // this.mapMoudle === 'country'?this.setMap(this.sourceData, this.currentCity,true) : this.setMap(this.sourceData, this.currentCity);
            // this.setLeftBottom(this.sourceData);
            // this.setLeftTop(arr.sMonths, this.sourceMonthData, this.currentCity, arr.xMonths);
        }
    }

};
function searchMonthsDataArr(months, encodes, code, arr) {
    const arrList = [];
    for (let index = 0; index < encodes.length; index++) {
        const subArr = [];

        const encode = encodes[index];
        for (let index = 0; index < months.length; index++) {
            const month = months[index];
            for (let index = 0; index < arr.length; index++) {
                const item = arr[index];
                if (item.bilMonth === month && item.indexCode === encode) {
                    subArr.push(parseFloat(item.indexVlue).toFixed(2));
                }
            }
        }
        arrList.push(subArr);
    }
    return arrList;
}
function getDataLineBar(category, dataArr) {
    const array = [];
    const arr = Array.from(category);
    arr.splice(0, 1);
    arr.forEach((ele, index) => {
        let obj = {
            name: ele,
            type: 'bar',
            stack: '用量',
            barWidth: '20',
            barCategoryGap: '10%',
            data: dataArr[index]
        };
        array.push(obj);
    });
    return array;
}
function searchMapDataItem(code, encodes, arr, type) {
    let data = {};
    if (type === 'city') {
        data.name = jzMap.mapName[code];
    }
    if (type === 'country') {
        for (let index = 0; index < cityDataArr.length; index++) {
            const element = cityDataArr[index];
            element.subCityArr.forEach((ele) => {
                if (ele.cityCode === code) {
                    data.name = ele.cityName;
                }
            });
        }
    }
    for (let index = 0; index < encodes.length; index++) {
        const element = encodes[index];
        let key = index > 0 ? index : '';
        let val = searchVal(code, element, arr);
        data['value' + key] = val;
    }
    labelZoom.controlArr.includes(data.name) && (data.label = { show: false });
    return data;
}
function searchMapData(codes, encodes, arr, type) {
    let data = [];

    for (let index = 0; index < codes.length; index++) {
        const element = codes[index];
        let item = searchMapDataItem(element, encodes, arr, type);
        item && data.push(item);
    }
    return data;
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
        height: 92%;
        width: 100%;
        position: absolute;
        top: 8%;
        &>div{

            background-color: rgba(16,162,249,0.1);
            position: absolute;
            border: 0.08rem solid rgba(16,162,249,0.5);
            border-radius: 0.6rem;
        }
        .nav{
            left: 3%;
            width:95%;
            height: 6%;
            background-color: rgba(16,162,249,0);
            border: none;
            .line{
                height: 100%;
            }
        }
        .left-top{
            top:8%;
            left: 3%;
            width:52%;
            height: 41%;
            .left-top-content{
                width:100%;
                height: 100%;
            }
        }
        .left-bottom{
            left: 3%;
            top:55%;
            width:52%;
            height: 41%;
            .left-bottom-content{
                width:100%;
                height: 100%;
            }
        }
        .right-all{
            top:8%;
            height: 87%;
            right: 3%;
            width:40%;
            .right-map{
                width: 100%;
                height:100%;
            }
            .right-top-back{
                top:20px;
                right: 25px;
                position: absolute;
            }
            .right-top-company{
                position: absolute;
                right: 5%;
                bottom: 15%;
                ul li{
                    list-style: none;
                    color:rgba(255, 255, 255, 0.8);
                    width:80px;
                    height: 40px;
                    line-height: 40px;
                    background-color: rgba(16, 162, 249, 0.7);
                    padding-left:5px;
                    margin-top: 5px;
                    border: 1px solid rgba(16, 162, 249, 0.5);
                    border-radius: 4px;
                    cursor: pointer;
                    text-align: center;
                }
            }
        }
    }
  
</style>
<style>
.ivu-btn.ivu-btn-ghost{
    color:rgba(255, 255, 255, 0.8);
    font-weight: bold;
    border-color:rgba(16, 162, 249, 1);
}
.ivu-btn.ivu-btn-ghost:hover{
    color:rgba(255, 255, 255, 0.8);
}

</style>
