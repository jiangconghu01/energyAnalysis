<template>
        <div :class="$style.content">
            <div :class="$style['left-all']">
                <div id="rank-left-all" :class="$style['left-all-chart']"></div>
                <div :class="$style['name-size-button']" v-show="home==='communication'">
                    单位名称显示
                       <Button-group>
                        <i-button type="ghost" size="small">大</i-button>
                        <i-button type="ghost" size="small">中</i-button>
                        <i-button type="ghost" size="small">小</i-button>
                    </Button-group>

                </div>
                <div :class="$style['exception-data']" v-show="exceData.length > 0">
                    <ul>
                        <li v-for="(item,index) in exceData" :key="index + 'e'">{{item.name+`:x=${item.value[0]},y=${item.value[1]}`}}</li>
                    </ul>
                    <!-- <div class="updown"><Icon type="ios-arrow-down" color="#fff" size="20px"/></div> -->
                </div>
            </div>
            <div :class="$style['right-all']">
                <div id="rank-right-all" :class="$style['right-all-chart']"></div>
            </div>
        </div>
</template>

<script>
import ConfigScatter from '../chartconfig/rankScatter.js';
import ConfigBar from '../chartconfig/rankBar.js';
import {getTopParams} from './origindata.js';
import { mapGetters } from 'vuex';
import jzMap from '../chartconfig/zjMap.js';
import {searchValsArr}from '../dataUtil.js';
// import {
//     topOffice,
//     officeBasicNum,
//     officeMap,
//     topTianyi,
//     tianyiBasicNum,
//     tianyiMap,
//     topCommunication,
//     communicationBasicNum,
//     communicationMap
// } from '../chartconfig/topBasicConfig.js';
// import {
//     offx,
//     offy,
//     offbar
// } from './toptest/office.js';
// import {
//     tianx,
//     tiany,
//     tianbar
// } from './toptest/tianyi.js';
// import {
//     comx,
//     comy,
//     combar
// } from './toptest/com.js';
export default {
    data () {
        return {
            home: '',
            nameMap: '',
            surceData: '',
            exceData: []
        };
    },
    computed: {
        ...mapGetters({
            currentMonth:'month'
        }),
        ...mapGetters([
            'module'
        ])
    },
    methods: {
        setCharts(namesdata, ydata, xdata, legendata, seriescount, bardata) {
            let scatter = this.$echarts.init(document.getElementById('rank-left-all'));
            let bar = this.$echarts.init(document.getElementById('rank-right-all'));
            this.$store.commit('setCharts', {name: 'chart1', val: scatter});
            this.$store.commit('setCharts', {name: 'chart2', val: bar});
            let scatterTitle = '';
            let scatterMarkline = [];
            let names = namesdata;
            let xs = xdata[0];
            let ys = ydata[0];
            let scatterLegend = legendata;
            let seriesCount = seriescount;

            let barTitle = '';
            let barsd = bardata[0];
            if (this.home === 'office') {
                scatterTitle = 'TOP-50办公大楼';
                scatterMarkline = ['累计单位面积电耗\n(度)', '累计单位面积\n电耗同比增长\n(%)'];
                barTitle = '累计人均电费同比(%)';
            }
            if (this.home === 'tianyi') {
                scatterTitle = 'TOP-50天翼卖场';
                scatterMarkline = ['累计单位台席电耗\n(万度)', '累计单位台席\n电耗同比增长\n(%)'];
                barTitle = '累计单位台席电费同比(%)';
            }
            if (this.home === 'communication') {
                scatterTitle = 'TOP-80通信局站';
                scatterMarkline = ['PUE值', 'PUE同比\n增幅(%)'];
                barTitle = '累计单位资产电费同比(%)';
            }
            // 清除之前数据
            scatter.clear();
            // 设置title和markline
            ConfigScatter.title.text = scatterTitle;
            const x = xs.map(e => Number(e));
            const y = ys.map(e => Number(e));
            const maxX = Math.max(...x);
            const maxY = Math.max(...y);
            const minX = Math.min(...x);
            const minY = Math.min(...y);

            ConfigScatter.xAxis[0].max = maxX;
            ConfigScatter.xAxis[0].min = minX;
            ConfigScatter.yAxis[0].max = maxY;
            ConfigScatter.yAxis[0].min = minY;
            const datas = getDoubleArr(names, x, y);
            ConfigScatter.legend.data = scatterLegend.map(e => e.slice(0,2));
            const scatterSeriesData = getScatterSeries(seriesCount, datas, scatterLegend);
            //找出异常点
            const exce = sliceExceptionPoint(scatterSeriesData, y);
            this.exceData = exce;
            ConfigScatter.series = scatterSeriesData;
            ConfigScatter.series[0].markLine.data[0].label.formatter = scatterMarkline[1];
            ConfigScatter.series[0].markLine.data[1].label.formatter = scatterMarkline[0];
            ConfigScatter.series[0].markLine.data[0].yAxis = (minY + maxY) / 2;
            ConfigScatter.series[0].markLine.data[1].xAxis = (minX + maxX) / 2;

            // let maxbar = Math.max(...barsd);
            // let minbar = Math.min(...barsd);
            ConfigBar.title.text = barTitle;
            // ConfigBar.xAxis[0].max = maxbar;
            // ConfigBar.xAxis[0].min = minbar;
            const d = getSortArr(names, barsd);
            ConfigBar.yAxis[0].data = d.name;
            ConfigBar.series[0].data = d.val;
            scatter.setOption(ConfigScatter);
            bar.setOption(ConfigBar);
        },
        async getData(param) {
            const params = {
                flag: param
            };
            try {
                const nameMap = await this.$http.get('/czxt/pages/wjhx/getTopNAmmeterName.do', params);
                this.nameMap = nameMap.data;
                const codes = nameMap.data.map(ele => ele.code);
                const postParam = {paramArrs: getTopParams(param, codes, this.currentMonth)};
                const data = await this.$http.post('/czxt/pages/wjhx/getIdWjhxParm.do', postParam, this.module); 
                this.surceData = data.data;
                return Promise.resolve({
                    sourcename:nameMap.data,
                    sourcedata:data.data
                    });
                //return data.data;
            } catch (error) {
                console.info(error);
                return Promise.reject(error);
            }
        },
        updateView(val){
            let param = '';
            let encodes = [];
            if(val === 'office'){
                param = 'bgdl';
                encodes = ['NHTOPN0007', 'NHTOPN0008', 'NHTOPN0009'];
            }
            if(val === 'tianyi'){
                param = 'tymc';
                encodes = ['NHTOPN0014', 'NHTOPN0015', 'NHTOPN0016'];
            }
            if(val === 'communication'){
                param = 'jz';
                encodes = ['NHTOPN0001', 'NHTOPN0002', 'NHTOPN0003'];
            }
            //this.setCharts(namesdata, ydata, xdata, legendata, seriescount, bardata)
            this.getData(param).then( d => {
                const codes = [];
                const names = [];
                let ydata = [];
                let xdata = [];
                const seriescount = {};
                const seriescountArr = [];
                let bardata = [];
                const arr = d.sourcename.sort((a, b) => {
                    return parseInt(a.city.slice(1)) - parseInt(b.city.slice(1));
                });
                for(let i = 0, len = arr.length; i < len; i++){
                    names.push(arr[i].name);
                    codes.push(arr[i].code);
                    const code = arr[i].city === 'A3300' ? 'A3301' : arr[i].city;
                    const city = jzMap.mapName[code];
                    if(seriescount[city]){
                         seriescount[city] += 1;

                    }else{
                        seriescountArr.push(city);
                        seriescount[city] = 1;
                    }
                }
                 ydata = searchValsArr(encodes.slice(0,1), codes, d.sourcedata);
                 xdata = searchValsArr(encodes.slice(1,2), codes, d.sourcedata);
                 bardata = searchValsArr(encodes.slice(2,3), codes, d.sourcedata);
                // names = d.sourcename.map(ele => ele.name);
                // codes = d.sourcename.map(ele => ele.code);
                //ydata = 
                this.setCharts(names, ydata, xdata, seriescountArr, seriescount, bardata);
                //console.log(d);
            }).catch(err => {
                console.log(err);
                this.$Message.info({
                    content: '数据请求过程出错啦！',
                    duration: 3,
                    closable: true
                });
            });
        }

    },
    created() {
        // console.log(this.$router.history.current.params.pageType);
        this.home = this.$router.history.current.params.pageType;
    },
    mounted() {
        //this.setCharts();
    },
    beforeRouteEnter (to, from, next) {
        // this.home = to.params.pageType;
        next();
    },
    beforeRouteUpdate (to, from, next) {
        this.home = to.params.pageType;
        next();
    },
    watch: {
        home(val,oldval) {
            this.updateView(val);
            console.log(this.exceData);
        },
        currentMonth(){
            this.updateView(this.home);
        }
    }

};
function sliceExceptionPoint(scatterSeriesData, ydata){
    let average = 0;
    const exceptionArr = [];
    ydata.forEach(e => average += Number(e));
    for (let index = 0; index < scatterSeriesData.length; index++) {
        const element = scatterSeriesData[index].data;
        for (let k = 0; k < element.length; k++) {
            const point = element[k].value;
            if(point[0] > 2 || point[0] < -2 || point[1] > 3*average || point[1] < -2*average){
                exceptionArr.push(element[k]);
                element.splice(k,1);
            }
            
        }
        
    }
    return exceptionArr;
}
// 合并两个数组对应位置的数据变成二维数组
function getDoubleArr(names, arr1, arr2) {
    const d = [];
    for (let index = 0; index < arr1.length; index++) {
        d.push({
            name: names[index],
            value: [arr1[index], arr2[index]],
            symbolSize: (7 + parseInt(Math.random() * 14))

        });
    }
    return d;
}
// 排序后得出对应数组
function getSortArr(names, datas) {
    let t = [];
    const target = {
        name: [],
        val: []
    };
    for (let i = 0; i < names.length; i++) {
        t.push({
            name: names[i],
            val: datas[i]
        });
    }
    t = t.sort((a, b) => {
        return a.val - b.val;
    });
    t.forEach(ele => {
        target.name.push(ele.name);
        const v = ele.val;
        (v > 2 || v < -2) ? target.val.push({
            name: ele.name,
            value: 2,
            value2: v,
            label: {
                show: true
            }
        })
            : target.val.push({
                name: ele.name,
                value: Math.abs(v),
                value2: v
            });
    });
    return target;
}
// 取出对象的keys,截掉一位
// function getKeys(obj) {
//     let tar = Object.keys(obj);
//     tar = tar.map(ele => ele.slice(0, 2));
//     return tar;
// }
// 散点图系列拼接
function getScatterSeries(names, datas, legendata) {
    const target = [];
    const nameArr = legendata;
    // for(let [key, value] in Object.entries(names) ){
    //     const item = {
    //         name: key.slice(0,2),
    //         type: 'scatter',
    //         data: [],
    //         label: {
    //             show: true,
    //             color: '#fff',
    //             formatter: function(params) {
    //                 return `${params.name}`;
    //             }
    //         }
    //     }
    // }
    let startNum = 0;
    for (let index = 0; index < nameArr.length; index++) {
        const ele = nameArr[index];

        let item = {};
        if (index === 0) {
            item = {
                name: ele.slice(0, 2),
                type: 'scatter',
                data: datas.slice(startNum, startNum + names[ele]),
                label: {
                    show: false,
                    color: '#fff',
                    formatter: function(params) {
                        return `${params.name}`;
                    },
                    emphasis: {
                        show: true,
                        formatter: function(param) {
                            return param.name;
                        },
                        position: 'top'
                    }
                },
                markLine: {
                    symbol: ['none', 'arrow'],
                    silent: true,
                    data: [{
                        yAxis: 52,
                        lineStyle: {
                            type: 'solid',
                            color: '#ffcc00'
                        },
                        label: {
                            formatter: 'PUE同比增幅'
                        }
                    },
                    {
                        xAxis: 175,
                        lineStyle: {
                            type: 'solid',
                            color: '#ffcc00'
                        },
                        label: {
                            formatter: 'PUE'
                        }
                    }]
                }
            };
        } else {
            item = {
                name: ele.slice(0, 2),
                type: 'scatter',
                data: datas.slice(startNum, startNum + names[ele]),
                label: {
                    show: false,
                    color: '#fff',
                    formatter: function(params) {
                        return `${params.name}`;
                    },
                    emphasis: {
                        show: true,
                        formatter: function(param) {
                            return param.name;
                        },
                        position: 'top'
                    }
                }
            };
        }
        target.push(item);
        startNum += names[ele];
    }
    return target;
}
</script>

<style lang="scss" module>
    .content{
        position: relative;
        height: 100%;
       // margin-bottom: 30px;
        &>div{

            background-color: rgba(16,162,249,0.1);
            position: absolute;
             border: 0.08rem solid rgba(16,162,249,0.5);
             border-radius: 0.6rem;
        }
        .left-all{
            left: 3%;
            width:57%;
            height: 95%;
            top:3%;
            .left-all-chart{
                width:100%;
                height: 100%;
            }
            .name-size-button{
                width: 30%;
                height: 30px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top:10px;
                color:#fff;
            }
            .exception-data{
                position: absolute;
                top:10px;
                right: 2%;
               // height: 17%;
                height: 60px;
                width: 170px;
                padding: 5px 0;
                color:#e9ec0d;
                overflow: hidden;
                border-radius: 5px;
                background-color: rgba(16,162,249,0.8);
                ul{
                    width: calc(100% + 20px);
                    height: 100%;
                    overflow: auto;
                    li{
                        padding-left:15px;
                        list-style:none;
                    }
                }
            }

        }
        .right-all{
            height: 95%;
            right: 3%;
            width:35%;
            top:3%;
            .right-all-chart{
                 width:100%;
                height: 100%;               
            }
        }
    }
  
</style>


