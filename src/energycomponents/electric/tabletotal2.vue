<template>
        <div :class="$style.component">
            <table :class="$style['table-head']">
                <colgroup>
                <col v-for="(ele,index) in th" :key="index+'a'" :style="setWidth(ele)">
                <col v-if="sysType==='Windows'" style="width:20px">
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="(ele,index) in th" :key="index+'b'">{{ele}}</th>
                        <th v-if="sysType==='Windows'" style="width:30px"></th>
                    </tr>
                    <!-- <tr v-if="sysType==='Windows'">
                        <th v-for="(ele,index) in th" :key="index+'b'">{{ele}}</th>
                        <th ></th>
                    </tr> -->
                </thead>
            </table>
            <div :class="$style['table-body']" :style="{height:contentHeight}">
            <table> 
                <colgroup>
                 <col v-for="(ele,index) in th" :key="index+'c'" :style="setWidth(ele)">
                </colgroup>               
                <tbody v-if="type==='current'">
                    <tr v-for="(ele,index) in data1" :key="index">
                        <td>
                            {{index+1}}
                        </td>
                        <td v-for="(item,index) in ele" :key="index">
                            {{item}}
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="type==='total'" id='tale-body-data'>
                    <tr v-for="(ele,index) in dataCo" :key="index" :class="ele.type" v-show="ele.month[0]==='a'" :style="ele.month[0]!=='a'?{backgroundColor:'#f5f5f5'}:{}">
                        <td v-if="ele.month[0]==='a'">
                            <Icon  @click="openSubData($event,ele.type)" type="plus"></Icon>
                            <Icon style="display:none;" @click="closeSubData($event,ele.type)" type="minus"></Icon>{{parseInt(ele.type.split('-')[1])+1}}
                        </td>
                        <td v-else>
                            
                        </td>
                        <td v-for="(item,index) in ele.dataArr" :key="index">
                            {{item}}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
</template>
<script>
import { tableTh } from '../chartconfig/staticData.js';
export default {
    props: {
        type: {
            type: String,
            requried: true
        },
        th: {
            type: Array,
            requried: false
        },
        data1: {
            type: Array,
            requried: true
        }
    },
    data () {
        return {
            contentHeight: '400px',
            tableTh: tableTh,
            indexOfall: 1,
            dataCo: [],
            // dataSource: this.data1,
            sysType: this.$store.getters.systemType,
            arr: []
        };
    },
    computed: {
        dataSource() {
            return this.data1;
        }
        // parentDataArr() {
        //     let arr = [];
        //     arr = this.data1.map((ele) => {
        //         return ele[0];
        //     });
        //     return arr;
        // },
        // openArr() {
        //     const len = this.arr.length;

        //     let arr = [];
        //     for (let index = 0; index < len; index++) {
        //         arr[index] = 0;
        //     }
        //     return arr;
        // },
        // subDataArr() {
        //     let arr = [];
        //     arr = this.data1.map((ele) => {
        //         return ele.slice(1);
        //     });
        //     return arr;
        // },
    },
    methods: {
        setWidth(ele) {
            // let len = this.th.length;
            // if (['异常指标', '异常说明', '累计规则'].includes(ele)) {
            //     return {width: '9%'};
            // }
            // if (ele === '异常统计规则') {
            //     return {width: '14%'};
            // }
            // return {
            //     width: 59 / len + '%'
            // };
            if (['异常指标', '异常说明', '累计规则'].includes(ele)) {
                return { width: '130px' };
            }
            if (ele === '异常统计规则') {
                return this.type === 'total' ? { width: '150px' } : { width: '230px' };
            }
            return '';
        },
        setHeight() {
            const ele = document.getElementById('exc-table');
            if (!ele) return;
            const height = ele.clientHeight;
            this.contentHeight = `${height - 80}px`;
        },
        totalArr() {
            let sub = this.subDataArr;
            let par = JSON.parse(JSON.stringify(this.parentDataArr));
            this.openArr.forEach((ele, index) => {
                if (ele === 1) {
                    par[index] = [...par[index], ...sub[index]];
                }
            });
            this.arr = [].concat(...par);
        },
        openSubData(e, cla) {
            let ele = e.target;
            let next = ele.nextSibling;
            while (true) {
                next = next.nextSibling;
                if (next.nodeType === 1) {
                    break;
                }
            }
            ele.style.display = 'none';
            next.style.display = 'inline-block';
            let className = cla.split('-')[0];
            let arr = document.querySelectorAll('.' + className);
            // console.log(arr);
            // arr.forEach(element => {
            //     element.style.display = 'table-row';
            // });
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                element.style.display = 'table-row';
            }
            // let index = parseInt(cla.split('-')[1]);
            // this.$set(this.openArr, index, 1);
            // this.totalArr();
        },
        closeSubData(e, cla) {
            let ele = e.target;
            let pre = ele.previousSibling;
            while (true) {
                pre = pre.previousSibling;
                if (pre.nodeType === 1) {
                    break;
                }
            }
            ele.style.display = 'none';
            pre.style.display = 'inline-block';
            let className = cla.split('-')[0];
            let arr = document.querySelectorAll('.' + className);
            // arr.forEach(element => {
            //     element.style.display = 'none';
            // });
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                element.style.display = 'none';
            }
        }
    },
    updated() {
        // this.$forceUpdate();
    },
    mounted() {
        this.setHeight();
        window.addEventListener('resize', () => {
            this.setHeight();
        });
    },
    watch: {
        dataSource() { // 写代码时候数据结构不好拼接，故而表格的展开和收起采用了dom操作，此处是为了重置表格
            this.dataCo = [];
            this.$nextTick(() => {
                this.dataCo = this.dataSource;
            });
        }
    }
};
</script>

<style lang="scss" module>
    .component{
        height: 100%;
        width:100%;
        color:#555;
        table {
            width: 100%;
            min-height: 30px;
            line-height: 30px;
            text-align: center; 
            border-collapse: collapse; 
            padding:2px;
           table-layout:fixed;
            word-break:break-all;
            // col{
            //     width: 4.5%;
            // }
            // col.wide{
            //     width: 6.8%;
            // }
        }          
        table,table tr th, table tr td { 
            //border:1px solid #0094ff; 
            //border: 1px solid rgba(0,0,0,0.2);
            border: 0.08rem solid #e5e5e5;
             border-top: none;
            }
        .table-head{
            background-color: rgba(16,162,249,1);
          
            border: 0.08rem solid rgba(16,162,249,1); 
            color:rgba(255, 255, 255, 0.8); 
            tr th{
                border: 1px solid rgba(0,0,0,0.2);
                border-top: none;
                border-left: none;
            }        
        }
        .table-body{
                padding-bottom: 40px;
            //background-color: rgba(16,162,249,0.5);
              background-color:rgba(255, 255, 255, 1);
           border: 0.08rem solid rgba(16,162,249,0.5);
           
          
            border-radius: 0 0 0.6rem 0.6rem;
            overflow-y: scroll;
            td{
                i{
                    width: 15px;
                    height: 15px;;
                    //border: 0.08rem solid rgba(16,162,249,1);
                    border: 1px solid rgba(0,0,0,0.3);
                }
            }
        }
    }
  
</style>

