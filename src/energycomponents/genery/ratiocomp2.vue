<template>
        <div :class="$style.component">
            <div :class="$style.title">
                <div :class="$style['title-text']"><span>付现成本</span></div>
                <div :class="$style.legend">
                    <ul>
                        <li :class="[$style.color,$style.first]"></li>
                        <li :class="$style.text">能源费</li>
                        <li :class="[$style.color,$style.second]"></li>
                        <li :class="$style.text">付现成本</li>
                    </ul>
                </div>
                <div :class="$style.subtitle"><span>(付现成本)</span></div>
            </div>
            <div :class="$style.content">
                <table>
                    <tbody>
                        <tr v-for="(item, index) in list" :key="index">
                            <td :class="$style.name">杭州西湖</td>
                            <td :class="$style.percentage">20%</td>
                            <td :class="$style.bar">
                                <div :class="$style['bar-item']">
                                <span :class="$style.top"></span>
                                <span :class="$style.bottom"></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            color:#F1F7FC;
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
                    border-radius: 0.2rem;
                }
                .first{
                    background-color: #ffcb00;
                }
                .second{
                    background-color: #3be8fa;
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
            left:2%;
            table{
                //border-collapse:separate;
                //border-spacing:3px;
                table-layout: fixed;
                color:white;
                width: 100%;
                font-size: 0.7rem;
                td{
                    font-weight: 100;
                }
                .name{ 
                    padding: 0;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .percentage{
                    vertical-align: middle;
                    text-align: center; 
                    width: 8%;
                }
                .bar{
                    width: 70%;
                    height: 20px;
                    vertical-align: middle;
                   .bar-item{
                       width:100%;
                       height: 100%;
                       position: relative;
                       span{
                            display: inline-block;
                            width: 50%;
                        }
                        .top{
                            position: absolute;
                            width:70%;
                            top:3px;
                            height: 6px;
                            background-color: #ffcb00;
                        }
                        .bottom{
                            position: absolute;
                            height: 6px;
                            top:13px;
                            background-color: #3be8fa;
                        }
                   }
                }
            }
        }

    }
  
</style>

