<template>
        <div :class="$style.component">
            <div :class="$style.title">
                <div :class="$style['title-text']"><span>付现成本</span></div>
                <div :class="$style.legend">
                    <ul>
                        <li :class="$style.color"></li>
                        <li :class="$style.text">能源费</li>
                        <li :class="$style.color"></li>
                        <li :class="$style.text">付现成本</li>
                    </ul>
                </div>
                <div :class="$style.subtitle"><span>(付现成本)</span></div>
            </div>
            <div :class="$style.contentn">
                <ul>
                    <li v-for="(item, index) in list" :key="index" :class="$style.item">
                        <div :class="$style.text">
                            <span :class="$style.name">上海werwrwerwrwer</span>
                            <span :class="$style.percentage">20%</span>
                        </div>
                        <div :class="$style.bar">
                            <span :class="$style.top"></span>
                            <span :class="$style.bottom"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {
    data () {
        return {
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        };
    },
    methods: {

    },
    created() {

    },
    mounted() {

    }
};
</script>
<style lang="scss" module>
    .component{
        height: 100%;
        width:100%;
        position: relative;
        .title{         
            position: absolute;
            height: 10%;
            width: 100%;
            top:1%;
            color:#fff;
            .title-text{
                display: inline-block;
                height: 100%;
                position: absolute;
                left: 2%;
                span{
                    display: inline-block;
                    vertical-align: top;
                }
            }
            .legend{
                height: 100%;
                display: inline-block;
                position: absolute;
                right: 2%;
                
                li{
                    display: inline-block;
                }
                .text{
                    font-size: 0.8rem;
                    font-weight: 100;
                    vertical-align: top;
                }
                .color{
                    width: 1.5rem;
                    height: 1rem;

                    background-color: coral;
                    border-radius: 0.2rem;
                }
            }
            .subtitle{
               position: absolute;
               top: 1.2rem;
               left:2%; 
               font-size: 0.8rem;
               span{
                font-weight:100;
               }
            }
        }
        .content{
            //background-color: #ade7e7;
            height: 88%;
            width: 100%;
            position: absolute;
            top:12%;
            ul{
                .item{
                    position: relative;
                    padding-left:2%;
                    width: 100%;
                    height: 1rem;
                    color: rgba(255, 255, 2555, 1);
                    font-size: 0.8rem;
                    margin-bottom: 1rem;
                    &>div{
                        display: inline-block;
                    }
                    .text{
                        position: absolute;
                        width: 20%;
                        top:0;
                       span{
                        font-weight: 100;
                       } 
                    }
                    .bar{
                        position: absolute;
                        width: 75%;
                        height: 1rem;
                        left:22%;
                        span{
                            display: inline-block;
                            width: 50%;
                        }
                        .top{
                            position: absolute;
                            width:70%;
                            top:0.2rem;
                            height: 0.3rem;
                            background-color: #ffcb00;
                        }
                        .bottom{
                            position: absolute;
                            height: 0.3rem;
                            top:0.7rem;
                            background-color: #3be8fa;
                        }
                    }
                }
            }
        }

    }
  
</style>

