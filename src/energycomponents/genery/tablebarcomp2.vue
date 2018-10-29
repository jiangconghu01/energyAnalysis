<template>
        <div :class="$style.component">
            <div :class="$style.title">
                <div :class="$style['title-text']" :title="list[0].name">{{list[0].name}}</div>
                <div :class="$style.number">{{first[0].val}}</div>
            </div>
            <div :class="$style.table">
                <div :class="$style.barcontainer" :id="itemid">

                </div>
                <div :class="$style.content">
                    <table>
                        <tbody>
                            <tr>
                                <td v-for="(item, index) in subList" :key="index" :class="$style.item" :style="{width:`${1/(subList.length)*100}%`}">
                                    <div :class="$style.bar" :style="{backgroundColor:colors[index]}"></div>
                                    <div :class="$style.text">
                                        <div :class="$style.overstyle" :title="item.name">{{item.name}}</div>
                                        <div>{{item.val}}</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
</template>

<script>
import config from '../chartconfig/tablebar.js';
export default {
    props: {
        data: {
            validator (val) {
                return val || [];
            }
        },
        type: {
            type: String,
            required: false
        },
        itemid: {
            type: String,
            required: true
        },
    },
    data () {
        return {
            colors: ['#ffed8b', '#ffa848', '#70fed2', '#6668ff', '#3dd55a'],
            list: this.data,
            // sum: this.data[0].val
        };
    },
    computed: {
        first() {
            // return this.data[0].val;
            return this.data.slice(0, 1);
        },
        maxLog() {
            let arr = this.data.slice(1);
            let arr2 = arr.map((ele) => {
                return parseFloat(ele.val);
            });
            let a = Math.max(...arr2);
            return Math.log10(a);
        },
        subList() {
            const a = this.data.slice(1);
            let b = a.map((ele) => {
                return {
                    name: ele.name,
                    val: ele.val,
                    val2: ele.val
                };
            });
            return b;
        },
        subListLog() {
            const a = this.data.slice(1);
            const logDataArr = a.map((ele) => {
                return {
                    name: ele.name,
                    val: Math.log10(parseFloat(ele.val > 0 ? ele.val : 1)),
                    val2: ele.val
                };
            });
            return logDataArr;
        },
        subListLogMistake() {
            const a = this.subListLog;
            const c = this.data.slice(1);
            let b = [];
            for (let index = 0; index < a.length; index++) {
                const element = a[index];
                if (index === 0) {
                    b.push({
                        name: element.name,
                        val: element.val,
                        val2: c[index].val
                    });
                } else {
                    b.push({
                        name: element.name,
                        val: element.val - a[index - 1].val > 0 ? element.val - a[index - 1].val : 0,
                        val2: c[index].val
                    });
                }
            }
            return b;
        },
        sumLog() {
            let a = 0;
            this.subList.forEach(element => {
                let val = parseFloat(element.val) > 0 ? parseFloat(element.val) : 1;
                a += Math.log10(val);
            });
            return parseFloat(a) + 0.1;
        },
        sumNor() {
            let a = 0;
            this.subList.forEach(element => {
                let val = parseFloat(element.val);
                a += val;
            });
            return parseFloat(a) + 0.1;
        }

    },
    methods: {
        setBar() {
            let t = this.$echarts.init(document.getElementById(this.itemid));
            const configco = JSON.parse(JSON.stringify(config));
            console.log(parseInt(this.itemid.slice(-1)) + 3);
            this.$store.commit('setCharts', { name: 'chart' + (parseInt(this.itemid.slice(-1)) + 3), val: t });
            const isNor = this.type === 'normal';
            // console.log(this.subList, this.subListLog);
            const colors = ['#ffed8b', '#ffa848', '#70fed2', '#6668ff', '#3dd55a'];
            const nums = ['1', '10', '100', '1000', '10000', '100000', '1000000'];
            const persent = ['0%', '100%'];
            let l = [];

            if (isNor) {
                configco.xAxis[0].splitNumber = 1;
                configco.xAxis[0].max = this.sumNor;
                l = this.subList;
                configco.xAxis[0].axisTick.show = false;
            } else {
            // configco.xAxis[0].splitNumber = this.subListLog.length;
            // configco.xAxis[0].splitNumber = parseInt(this.sumNor).toString().length;
            // let len = parseInt(this.sumNor).toString().length;
            // configco.xAxis[0].interval = this.sumLog / len;
            // configco.xAxis[0].max = this.sumLog;
            // l = this.subListLog;

                configco.xAxis[0].interval = 1;
                configco.xAxis[0].max = this.maxLog;
                l = this.subListLogMistake;
            }
            // configco.xAxis[0].max = this.sumLog;
            // let l = this.subListLog;
            for (let index = 0; index < l.length; index++) {
                let ele = l[index];
                let item = {
                    name: ele.name,
                    type: 'bar',
                    color: colors[index],
                    barWidth: '9',
                    stack: '量',
                    barCategoryGap: 0,
                    data: [{ value: ele.val, value2: ele.val2 }]
                };
                configco.series.push(item);
            }
            configco.xAxis[0].axisLabel = {
                show: !isNor,
                margin: 0,
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 12,
                fontWeight: 200,
                align: 'right',
                formatter: function(value, index) {
                    return isNor ? persent[index] : nums[index];
                }
            };
            configco.tooltip = {
                trigger: 'item',
                // show: false,
                formatter: function(params) {
                    return `${params.seriesName}:${params.data.value2}`;
                }
            };

            t.setOption(configco);
        }
    },
    created() {

    },
    updated() {
        // console.log(this.data, this.first);

    },
    mounted() {
        this.setBar();
    },
    watch: {
        subList() {
            this.setBar();
        }
    }
};
</script>
<style lang="scss" module>
    .component{
        height: 100%;
        width:100%;
         color:rgba(255, 255, 255, 0.8);
        &>div{
            display: inline-block;
        }
        .title{
            height: 100%;
            width:18%;
            font-size: 14px;
            &>div{
                //height: 50%;
               
                white-space: nowrap;   
            }
            .title-text{
                 padding-top: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                        
            }
            .number{
                height: 50%;

            }
        }
        .table{
            height: 100%;
            width:80%;
            vertical-align: top;
            .barcontainer{
                width:100%;
                height: 25px;
                ul{
                   height: 100%;
                    width:100%;
                    font-size: 0;  
                }
                li{
                    height: 100%;
                    width: 20%;
                    display: inline-block;
                    background-color: aquamarine;
                }
            }
            .content{
                height: 70%;
                table{
                    width: 100%;
                    height: 90%;
                    // border-collapse:separate; 
                    // border-spacing:0px 10px;
                    td{
                        .overstyle{
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        background-color:  rgba(134, 167, 204, 0.2); 
                        &>div{
                            float: left;
                            height: 100%;
                        }
                      .bar{
                          width: 5%;
                          background-color: chocolate;
                          height: 10px;;
                          margin-top: 5%;
                      }
                      .text{
                          width: 90%;
                          white-space: nowrap;
                      }  
                    }
                }
            }
        }

    }
  
</style>

