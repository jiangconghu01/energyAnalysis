<template>
        <div :class="$style.content">
            <div :class="$style.nav">
                <Row style="height:100%">
                    <i-col span="6" :class="$style.line">
                        <Button-group style="width:100%">
                        <i-button type="ghost" style="font-size:16px;border:none;">|&nbsp;异常多维分析</i-button>
                        <i-button type="ghost" 
                        @click="goback()" style="margin-top: 3px;">返回统计数据</i-button>
                    </Button-group>
                    </i-col>
                    <i-col span="5" :class="$style.line"></i-col>
                    <i-col span="3" :class="$style.line" style="padding-top: 3px;">
                        <Button-group>
                            <i-button type="ghost" 
                            @click="viewNumber()" 
                            :style="[current==1?buttonStyle:{}]">当前</i-button>
                            <i-button type="ghost" 
                            @click="viewMoney()" 
                            :style="[current==2?buttonStyle:{}]">累计</i-button>
                        </Button-group>
                    </i-col>
                    <i-col span="7" :class="$style.line"></i-col>
                    <i-col span="3" :class="$style.line" style="position:relative;">
                        <span @click="downLoadData()" :class="$style.download"><img src="../../static/electric/page.png" alt="">下载数据</span>
                    </i-col>
                </Row>
            </div>
            <div id="exc-table" :class="$style['table-container']">
                <div v-show="current===1">
                     <table-total type="current" :th="thCu" :data1="currentMonthData"></table-total>
                </div>
                <div v-show="current===2">
                    <table-total type="total" :th="thTo" :data1="currentYearData"></table-total>
                </div>
            </div>
        </div>
</template>

<script>

import tableTotal from './tabletotal2.vue';
import { tableTh, tableThCurrent, tableTd } from '../chartconfig/staticData.js';
import zjMap from '../chartconfig/zjMap.js';
import 'echarts/map/js/province/zhejiang.js';
import {
    getCityParam,
    searchMonthValsArr,
    searchEncodeMonthsVals,
    addDoubleArr
}
    from '../dataUtil.js';
import {
    exceEncodeArr
}
    from './origindata.js';
// import zjMapjson from '../chartconfig/mapjson/330000.json';
export default {
    data () {
        return {
            current: 1,

            buttonStyle: {
                backgroundColor: 'rgba(16, 162, 249, 1)'
            },
            thTo: tableTh,
            thCu: tableThCurrent,
            sourceMonthData: {},
            currentMonthData: [],
            currentYearData: []
        };
    },
    computed: {
        currentMonth() {
            return this.$store.getters.month;
        }
    },
    created() {
        this.getAxiosData();
    },
    components: {
        tableTotal
    },
    methods: {
        getAxiosData() {
            const codes = JSON.parse(JSON.stringify(zjMap.arrCode));
            codes.unshift('A33');
            let data = '';
            const monthsArr = getCurentMonthArr(this.currentMonth);
            monthsArr.forEach((ele) => {
                let item = getCityParam(ele, codes, exceEncodeArr);
                data = data + ',' + item;
            });
            data = data.slice(1);

            let postData = this.$store.getters.module === 'dev' ? { paramArrs: data } : this.$qs.stringify({
                paramArrs: data
            });
            this.axios.post('/czxt/pages/wjhx/getIdWjhxParm.do', postData).then((response) => {
                this.sourceMonthData = response.data;
                this.setTable(response.data, codes);
            }).catch((error) => {
                console.warn(error);
            });
        },
        setTable(source, codes) {
            // 设置异常当前表格数据
            const monthData = searchMonthValsArr(exceEncodeArr, codes, this.currentMonth, source);

            const datas = monthData.map((ele, index) => {
                const sum = eval(ele.dataArr.join('+'));
                const a33 = ele.dataArr[0];
                ele.dataArr[0] = ~~sum - ~~a33;
                return tableTd[index].concat(ele.dataArr);
            });
            this.currentMonthData = datas;
            // console.log(datas);
            // 设置异常累计表格数据
            const totalArr = [];
            const months = getCurentMonthArr(this.currentMonth);
            exceEncodeArr.forEach((ele, index) => {
                totalArr.push(searchEncodeMonthsVals(ele, codes, months, source));
            });
            // console.log(totalArr);
            totalArr.forEach((ele, i) => {
                let all = [];
                let result = [];
                let type = '';
                for (let index = 0; index < ele.length; index++) {
                    const element = ele[index];
                    type = element.type;
                    const sum = eval(element.dataArr.join('+'));
                    const a33 = element.dataArr[0];
                    element.dataArr[0] = ~~sum - ~~a33;
                    all.push(element.dataArr);
                    element.dataArr = tableTd[i].concat([parseInt(element.month.substr(4, 2)) + '月', '']).concat(element.dataArr);
                }
                // result = addDoubleArr(all);
                result = tableTd[i].concat(['', '各月异常总数量之和']).concat(addDoubleArr(all));
                // console.log(result);
                ele.unshift({ type: `${type}-${i}`, month: `all${i}`, dataArr: result });
            });
            const aa = [].concat(...totalArr);
            // console.log(aa);
            this.currentYearData = aa;
            console.log(aa);
            // this.currentYearData = totalArr;
        },
        goback() {
            this.$router.replace({ name: 'Electric' });
        },
        viewNumber() {
            this.current = 1;
        },
        viewMoney() {
            this.current = 2;
        },
        downLoadData() {

        }
    },
    mounted() {

    },
    watch: {
        currentMonth: function(val, oldVal) {
            this.getAxiosData();
            // window.location.reload();
            // this.$router.replace({name: 'ElectricExc'});
            // this.$forceUpdate();
        }
    }

};
function getCurentMonthArr(date) {
    const arr = [];
    let year = parseInt(date.substr(0, 4));
    let month = parseInt(date.substr(4, 2));
    for (let index = 1; index <= month; index++) {
        index > 9 ? arr.push(`${year}${index}`) : arr.push(`${year}0${index}`);
    }
    return arr;
}
</script>

<style lang="scss" module>
    .content{
        height: 91%;
        width: 100%;
        position: absolute;
        top: 9%;
        &>div{
            //background-color: rgba(16,162,249,0.5);
            position: absolute;
            //border: 0.08rem solid rgba(16,162,249,0.5);
            //border-radius: 0.6rem;
        }
        .nav{
            left: 3%;
            width:95%;
            height: 6%;
            background-color: rgba(16,162,249,0);
            border: none;
            color: white;
            .line{
                height: 100%;
                .download{
                    display: inline-block;
                    width: 50%;
                    position: absolute;
                    top:50%;
                    transform: translateY(-50%);
                    font-size: 14px;
                    cursor: pointer;
                }
                img{
                    width: 18px;
                    height: 20px;
                    margin-right: 2%;
                    vertical-align: middle;
                }
            }
        }
        .table-container{
            top:8%;
            height: 89%;
            left: 2%;
            width:96%;
            &>div{
                width: 100%;
                height: 100%;
            }
        }
    }
  
</style>

<style>

.ivu-btn.ivu-btn-ghost{
    color:white;
    font-weight: bold;
    border-color:rgba(16, 162, 249, 1);
}
.ivu-btn.ivu-btn-ghost:hover{
    color:white;
}

</style>
