<template>
    <div :class="$style.component">
        <Row style="height:12%;">
        </Row>
        <Row style="height:30%;">
            <i-col span="16" :class="$style.line">
                <div>
                    <img v-if="type==='dl'" src="../../static/electric/dl.png" alt="">
                    <img v-else-if="type==='df'" src="../../static/electric/money.png" alt="">
                    <img v-else src="../../static/electric/denger.png" alt="">
                    <span v-if="type==='dl'">总电量(万度)</span>
                    <span v-else-if="type==='df'">总电费(万元)</span>
                    <span v-else>异常</span>
                </div>
            </i-col>
            <i-col span="8" :class="$style.line"><span :class="$style.num">{{formatterNum?formatterNum:0}}</span></i-col>
        </Row>
        <Row style="height:30%;">
            <div v-if="type==='dl'">
            <i-col span="14" :class="$style.line">
                <div>
                    <img src="../../static/electric/up.png" alt="">
                    <span>同比增长</span>
                </div>
            </i-col>
            <i-col span="10" :class="$style.line"><span :class="$style.num">{{(ratio?ratio:0)+'%'}}</span></i-col>
            </div>
            <div v-else-if="type==='df'">
            <i-col span="14" :class="$style.line">
                <div>
                    <img src="../../static/electric/up.png" alt="">
                    <span>同比增长</span>
                </div>
            </i-col>
            <i-col span="10" :class="$style.line"><span :class="$style.num">{{(ratio?ratio:0)+'%'}}</span></i-col>
            </div>
            <div v-else></div>
        </Row>
        <Row style="height:20%;">
            <i-col span="24" :class="$style.line">
                <span @click="toDetail()" :class="$style.detail">查看详情>
                </span>
            </i-col>
        </Row>
    </div>
</template>

<script>
import { formatNumberRgx } from '../dataUtil.js';
export default {
    props: {
        type: {
            type: String,
            default: 'dl'// 'df','yc'
        },
        topage: {
            type: Function,
            required: true,
        },
        number: {
            // type: Number,
            default: 0
        },
        ratio: {
            // type: Number,
            default: 0
        }
    },
    data () {
        return {

        };
    },
    computed: {
        formatterNum() {
            return formatNumberRgx(this.number);
        }
    },
    methods: {
        toDetail() {
            this.topage();
        }

    },
    created() {

    },
    mounted() {
    }
};
</script>
<style lang="scss" module>
.component{
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    @media screen and (max-width: 1100px){
        font-size: 14px;
    }
    .line{
       &>div{
            text-align: left;
            padding-left: 5%;
        }
        height: 100%;
        text-align: right;
        padding-right: 5%;
        img{
        width: 20px;
        height: 20px;
       // margin-right: 5%;
        vertical-align: middle;
        }
        .num{
            color:#fff000;
        }
        .detail{
            // @media screen and (max-width: 1024px){
            //     font-size: 12px;
            // }
            font-size: 14px;
            cursor: pointer;
            @media screen and (max-width: 1100px){
                font-size: 12px;
            }
        }
    }

}
</style>

