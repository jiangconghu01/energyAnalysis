<template>
    <div id="index" :class="$style.index">
        <!-- <img src="./static/bg.jpg" alt="" id="background" > -->
        <!-- <img src="./static/bj.jpg" alt="" id="background" :style="{width:wid,height:hid}"> -->
        <div :class="$style.bg"></div>
        <div :class="$style.head">
            <div :class="$style.logo">
                <div :class="$style['logo-img']">
                    XXXXXXXXXX平台
                    <!-- <img src="./static/electric/logo.png" alt=""> -->
                    </div>
                <div :class="$style['logo-text']">-能耗划小分析</div>
            </div>
            <div :class="$style.nav">
                <ul>
                    <li :class="[$style['nav-genery'],currentPage=='genery'?$style.current:'']" @click="goGenery()">
                        <span :class="$style['nav-item-img']"><img src="./static/electric/zn_w.png" alt=""></span>
                        <span :class="$style['nav-item-text']"><span>总览</span></span>                       
                    </li>
                    <li :class="[$style['nav-electric'],currentPage=='electric'?$style.current:'']" @click="goElectric()">
                        <span :class="$style['nav-item-img']"><img src="./static/electric/dl_w.png" alt=""></span>
                        <span :class="$style['nav-item-text']"><span>电力</span></span>                       
                    </li>
                    <li>
                        <span :class="$style['nav-item-img']"><img src="./static/electric/idc_b.png" alt=""></span>
                        <span :class="$style['nav-item-text']"><span>IDC</span></span>                      
                    </li>
                    <li>
                        <span :class="$style['nav-item-img']"><img src="./static/electric/wifi_b.png" alt=""></span>
                        <span :class="$style['nav-item-text']"><span>无线基站</span></span>                   
                    </li>
                    <li>
                        <span :class="$style['nav-item-img']"><img src="./static/electric/ry_b.png" alt=""></span>
                        <span :class="$style['nav-item-text']"><span>燃油</span></span>                    
                    </li>
                </ul>

            </div>
            <div :class="$style.date">
                <ul :class="$style['date-select']">
                    <li :class="$style.icon"><img src="./static/tb_rq.png" alt=""></li>
                    <li :class="$style.date"><Date-picker type="month" 
                    placeholder="选择月" 
                    format="yyyy年MM月" 
                    size="small" 
                    style="width: 145px"
                    v-model="dateVal"
                    @on-change="setTime"
                    ></Date-picker></li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
function beforeMonth() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 3) {
        year -= 1;
        month = 10 + month;
    } else {
        month = month - 2;
    }
    return month < 10 ? `${year}-0${month}` : `${year}-${month}`;
}

export default {
    data () {
        return {
            currentPage: 'genery',
            dateVal: beforeMonth(),
            wid: '100%',
            hid: '100%'
        };
    },
    computed: {
        needMonth() {
            let year = this.dateVal.getFullYear();
            let month = this.dateVal.getMonth() + 1;
            return month < 10 ? `${year}0${month}` : `${year}${month}`;
        }
    },
    methods: {
        goGenery() {
            this.currentPage = 'genery';
            this.setTime();
            this.$router.push({ name: 'All' });
        },
        goElectric() {
            this.currentPage = 'electric';
            this.setTime();
            this.$router.push({ name: 'Electric' });
        },
        setTime() {
            this.$store.commit('setMonth', this.needMonth);
        },

    },
    created() {
        // this.setTime();
    },
    mounted() {
        this.currentPage = getCurrent(this.$router.history.current.path);
        let resizeTimer = '';
        window.addEventListener('resize', () => {
            // let w = document.documentElement.clientWidth;
            // let h = document.documentElement.clientHeight;
            // let a = this.$router.history.current.name;
            let charts = this.$store.getters.chartsArr;
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                for (let item in charts) {
                    charts[item] && charts[item].resize();
                }
            }, 400);
        });
    }

};
// function debounce(method, context, time) {
//     clearTimeout(method.timeoutId);
//     method.timeoutId = setTimeout(() => {
//         method.apply(context, arguments);
//     }, time);
// }

function getCurrent(path) {
    let current = 'genery';
    switch (path) {
    case '/genery':current = 'genery';
        break;
    case '/electric':current = 'electric';
        break;
    case '/electricdetail':current = 'electric';
        break;
    }
    return current;
}
</script>

<style lang="scss" module>
//@import './css/energyanalysis.scss';
.index{
    width: 100%;
    height: 100%;
    position: absolute;
    min-height: 600px;
    min-width: 1000px;
    .bg{
     width: 100%;
    height: 100%;
    position: absolute;
    background: url('./static/bj.png') no-repeat;
    //background: url('./static/bg.jpg') no-repeat;
    background-size: cover;
    //transform: rotateX(180deg);
    }
    .head{
        position: absolute;
        width: 100%;
        height: 6%;
        min-height: 45px;
        border-bottom: 1px solid rgba(16, 162, 249, 0.5);
        box-sizing: border-box;
        &>div{
            display: inline-block;
            height: 100%;
        }
        .logo{
            position: relative;
            width: 30%;
            float: left;
            &>div{
                display: inline-block;
            }
            .logo-img{
                height: 100%;
                font-size: 20px;
                color:rgba(255, 255, 255, 0.8);
                vertical-align: bottom;
                padding-top:8px;
                padding-left:15px;
            }
            .logo-text{
                height: 100%;
                vertical-align: bottom;
                color:$text-color;
                font-size: 16px;
                padding-top:12px;
            }
        }
        .nav{
            width:48%;
            text-align: center;
            margin: 0 auto;
            color: #fff;
            position: relative;
            float: left;
            ul{
                width:100%;
                height: 100%;
                .current{
                    opacity: 1;
                    border-bottom: 2px solid;
                }
                li{
                    position: relative;
                    display: inline-block;
                    width: 19%;
                    opacity: 0.5;
                    height: 100%;
                    cursor: pointer;
                    &>span{
                        display: inline-block;
                        margin-top:12px;
                    }
                    .nav-item-img{
                      width: 20px;
                      height: 20px;
                      vertical-align: middle;              
                      img{
                          width: 100%;
                          height: 100%;
                      }
                    }
                    .nav-item-text{
                        font-size: 16px;
                        vertical-align: middle;
                    }
                }
            }
        }
        .date{
            width:19%;
            position: relative;
            display: table;
            .date-select{
                display: table-cell;
                vertical-align: middle;
                li{
                    display: inline-block;
                }
                .icon{
                    width: 35%;
                    text-align: right;
                    vertical-align: bottom;
                    img{
                        width: 16px;
                        height: 15px;
                    }

                }
                .date{
                    width: 50%;
                }
            }

        }
    }

}

</style>
<style>
.ivu-date-picker-cells.ivu-date-picker-cells-month{
    width: 130px;
}
.ivu-date-picker-cells.ivu-date-picker-cells-year{
    width: 130px;
}
.ivu-date-picker .ivu-input[disabled]{
    background-color: rgba(255,255,255,0);
    opacity: 1;
    cursor: pointer;
    color:rgba(255, 255, 255, 0.8);
}
.ivu-picker-panel-body{
    background-color: rgba(16, 162, 249, 1);
    color: white;
    border-radius:10px;
}
    .ivu-input-wrapper-small .ivu-input-icon{
        display: none;
    }
    .ivu-date-picker-focused input{
        background-color: rgba(16, 162, 249, 0);
    }
   .ivu-input-wrapper .ivu-input{
        background-color: rgba(16, 162, 249, 0);
        border: none;
        color:transparent;
    text-shadow:0 0 0 white;
        font-size: 14px;
        cursor: pointer;
        padding-left: 10%;
    }
    .ivu-date-picker-focused input.ivu-input{
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .ivu-date-picker .ivu-select-dropdown{
        background-color: rgba(16, 162, 249, 0);
        -webkit-box-shadow: none;
        box-shadow: none;        
    }
</style>

