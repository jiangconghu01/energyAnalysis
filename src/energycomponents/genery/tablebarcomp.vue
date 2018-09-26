<template>
        <div :class="$style.component">
            <div :class="$style.title">
                <div :class="$style['title-text']" :title="list[0].name">{{list[0].name}}</div>
                <div :class="$style.number">{{first[0].val}}</div>
            </div>
            <div :class="$style.table">
                <div :class="$style.barcontainer">
                    <ul>
                        <li v-for="(item, index) in subList" 
                        :key="index" 
                        :class="[$style.bar]"
                        :style="{
                            backgroundColor:colors[index],
                            width:type==='normal'?`${parseInt(item.val)/sumNor*100}%`:`${Math.log(item.val>0?item.val:1)/sumLog*100}%`,
                            color:index===0?'#666':'#444'
                        }"
                        ><span>{{parseFloat(parseInt(item.val)/sumNor*100).toFixed(3)+'%'}}</span></li>
                    </ul>
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
        }
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
        subList() {
            return this.data.slice(1);
        },
        sumLog() {
            let a = 0;
            this.subList.forEach(element => {
                let val = parseFloat(element.val) > 0 ? parseFloat(element.val) : 1;
                a += Math.log(val);
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

    },
    created() {

    },
    updated() {
        // console.log(this.data, this.first);
    },
    mounted() {
        // console.log(this.data, this.first);
    }
};
</script>
<style lang="scss" module>
    .component{
        height: 100%;
        width:100%;
         color:#F1F7FC;
        &>div{
            display: inline-block;
        }
        .title{
            height: 100%;
            width:15%;
            font-size: 14px;
            &>div{
                //height: 50%;
                padding-top: 5%;
                white-space: nowrap;   
            }
            .title-text{
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
                height: 25%;
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
                    span{
                        display: inline-block;
                       width: 100%;
                        height: 100%;
                        // width:20px;
                        // height: 12px;
                            line-height: 1;
                        font-size: 12px;
                        vertical-align: top;
                        transform: scale(0.8)
                    }
                }
            }
            .content{
                height: 80%;
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
                        background-color: rgba(103, 179, 238, 0.5);
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

