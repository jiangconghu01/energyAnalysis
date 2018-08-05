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
            </div>
            <div :class="$style['right-all']">
                <div id="rank-right-all" :class="$style['right-all-chart']"></div>
            </div>
        </div>
</template>

<script>
import ConfigScatter from '../chartconfig/rankScatter.js';
import ConfigBar from '../chartconfig/rankBar.js';
import {x1, y1, name1} from './test.js';
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
            let scatterTitle = '';
            let scatterMarkline = [];
            let barTitle = '';
            if (this.home === 'office') {
                scatterTitle = 'TOP-50办公大楼';
                scatterMarkline = ['累计单位面积电耗\n(万度)', '累计单位面积\n电耗同比增长\n(%)'];
                barTitle = '累计人均电费同比(%)';
            }
            if (this.home === 'tianyi') {
                scatterTitle = 'TOP-50天翼卖场';
                scatterMarkline = ['累计单位台席电耗\n(万度)', '累计单位台席\n电耗同比增长\n(%)'];
                barTitle = '累计单位台席电费同比(%)';
            }
            if (this.home === 'communication') {
                scatterTitle = 'TOP-80通信局站';
                scatterMarkline = ['PUE值', 'PUE同比增幅(%)'];
                barTitle = '累计单位资产电费同比(%)';
                ConfigScatter.legend.x = 'center';
            }
            ConfigScatter.title.text = scatterTitle;
            ConfigScatter.series[0].markLine.data[0].label.formatter = scatterMarkline[1];
            ConfigScatter.series[0].markLine.data[1].label.formatter = scatterMarkline[0];
            let x = x1.map((e) => {
                return Number(e);
            });
            let y = y1.map((e) => {
                return Number(e);
            });
            console.log(Math.max(...x), 'wwwwwwww', ...y);
            let maxX = Math.max(...x);
            let maxY = Math.max(...y);

            ConfigScatter.xAxis[0].max = maxX;
            ConfigScatter.yAxis[0].max = maxY;
            ConfigScatter.series[0].markLine.data[0].yAxis = (Math.min(...y) + maxY) / 2;
            ConfigScatter.series[0].markLine.data[1].xAxis = (Math.min(...x) + maxX) / 2;
            ConfigScatter.series[0].data = getDoubleArr(name1, x, y);
            console.log(getDoubleArr(name1, x, y));
            ConfigBar.title.text = barTitle;
            scatter.setOption(ConfigScatter);
            bar.setOption(ConfigBar);
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
        }
    }

};
// 合并两个数组对应位置的数据变成二维数组
function getDoubleArr(names, arr1, arr2) {
    const d = [];
    for (let index = 0; index < arr1.length; index++) {
        d.push({name: names[index],
            value: [arr1[index], arr2[index]]});
    }
    return d;
}
</script>

<style lang="scss" module>
    .content{
        position: relative;
        height: 96%;
        margin-top: 20px;
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

        }
        .right-all{
            height: 95%;
            right: 3%;
            width:35%;
            .right-all-chart{
                 width:100%;
                height: 100%;               
            }
        }
    }
  
</style>


