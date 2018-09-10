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
                <!-- <div :class="$style['exception-data']">
                    <ul>
                        <li>杭州武林：154.567</li>
                        <li>杭州武林：154.567</li>
                        <li>杭州武林：154.567</li>
                        <li>杭州武林：154.567</li>
                        <li>杭州武林：154.567</li>
                        <li>杭州武林：154.567</li>
                    </ul>
                </div> -->
            </div>
            <div :class="$style['right-all']">
                <div id="rank-right-all" :class="$style['right-all-chart']"></div>
            </div>
        </div>
</template>

<script>
import ConfigScatter from '../chartconfig/rankScatter.js';
import ConfigBar from '../chartconfig/rankBar.js';
import {
    topOffice,
    officeBasicNum,
    officeMap,
    topTianyi,
    tianyiBasicNum,
    tianyiMap,
    topCommunication,
    communicationBasicNum,
    communicationMap
} from '../chartconfig/topBasicConfig.js';
import {
    offx,
    offy,
    offbar
} from './toptest/office.js';
import {
    tianx,
    tiany,
    tianbar
} from './toptest/tianyi.js';
import {
    comx,
    comy,
    combar
} from './toptest/com.js';
export default {
    data () {
        return {
            home: '',
            czxtData: null
        };
    },
    methods: {
        setCharts() {
            let scatter = this.$echarts.init(document.getElementById('rank-left-all'));
            let bar = this.$echarts.init(document.getElementById('rank-right-all'));
            this.$store.commit('setCharts', {name: 'chart1', val: scatter});
            this.$store.commit('setCharts', {name: 'chart2', val: bar});
            let scatterTitle = '';
            let scatterMarkline = [];
            let names = [];
            let xs = [];
            let ys = [];
            let scatterLegend = [];
            let seriesCount = [];
            let barTitle = '';
            let barsd = [];
            if (this.home === 'office') {
                scatterTitle = 'TOP-50办公大楼';
                scatterMarkline = ['累计单位面积电耗\n(度)', '累计单位面积\n电耗同比增长\n(%)'];
                names = topOffice;
                xs = offx;
                ys = offy;
                scatterLegend = getKeys(officeMap);
                seriesCount = officeMap;
                barTitle = '累计人均电费同比(%)';
                barsd = offbar;
            }
            if (this.home === 'tianyi') {
                scatterTitle = 'TOP-50天翼卖场';
                scatterMarkline = ['累计单位台席电耗\n(万度)', '累计单位台席\n电耗同比增长\n(%)'];
                names = topTianyi;
                xs = tianx;
                ys = tiany;
                scatterLegend = getKeys(tianyiMap);
                seriesCount = tianyiMap;
                barTitle = '累计单位台席电费同比(%)';
                barsd = tianbar;
            }
            if (this.home === 'communication') {
                scatterTitle = 'TOP-80通信局站';
                scatterMarkline = ['PUE值', 'PUE同比\n增幅(%)'];
                // ConfigScatter.legend.x = 'center';
                names = topCommunication;
                xs = comx;
                ys = comy;
                scatterLegend = getKeys(communicationMap);
                seriesCount = communicationMap;
                barTitle = '累计单位资产电费同比(%)';
                barsd = combar;
            }
            // 清除之前数据
            scatter.clear();
            // 设置title和markline
            ConfigScatter.title.text = scatterTitle;
            let x = xs.map((e) => {
                return Number(e);
            });
            let y = ys.map((e) => {
                return Number(e);
            });
            const maxX = Math.max(...x);
            const maxY = Math.max(...y);
            const minX = Math.min(...x);
            const minY = Math.min(...y);

            ConfigScatter.xAxis[0].max = maxX;
            ConfigScatter.xAxis[0].min = minX;
            ConfigScatter.yAxis[0].max = maxY;
            ConfigScatter.yAxis[0].min = minY;
            const datas = getDoubleArr(names, x, y);
            ConfigScatter.legend.data = scatterLegend;
            ConfigScatter.series = getScatterSeries(seriesCount, datas);
            ConfigScatter.series[0].markLine.data[0].label.formatter = scatterMarkline[1];
            ConfigScatter.series[0].markLine.data[1].label.formatter = scatterMarkline[0];
            ConfigScatter.series[0].markLine.data[0].yAxis = (Math.min(...y) + maxY) / 2;
            ConfigScatter.series[0].markLine.data[1].xAxis = (Math.min(...x) + maxX) / 2;

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
            const nameMap = await this.$http.get('/czxt/pages/wjhx/getTopNAmmeterName.do', params);
            // const
            console.log(param);
        }

    },
    created() {
        // console.log(this.$router.history.current.params.pageType);
        this.home = this.$router.history.current.params.pageType;
    },
    mounted() {
        this.setCharts();
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
        home() {
            this.setCharts();
            this.getData('tymc');
        }
    }

};
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
function getKeys(obj) {
    let tar = Object.keys(obj);
    tar = tar.map(ele => ele.slice(0, 2));
    return tar;
}
// 散点图系列拼接
function getScatterSeries(names, datas) {
    const target = [];
    const nameArr = Object.keys(names);
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
                right: 10px;
                top:10px;
                color:#fff;
            }
            .exception-data{
                position: absolute;
                top:10px;
                right: 2%;
               // height: 17%;
                height: 60px;
                width: 150px;
                background-color: rgba(16,162,249,0.8);
                padding: 5px 0;
                color:#fff;
                overflow: hidden;
                border-radius: 5px;
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


