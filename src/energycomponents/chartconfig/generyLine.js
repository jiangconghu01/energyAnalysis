import { cityMap } from './staticData.js';
// let data = (() => {
//     let a = [];
//     for (let index = 0; index < 11; index++) {
//         a.push(parseInt(Math.random() * 10) / 10 + 0.1);
//     }
//     return a;
// })();
const option = {
    title: {
        text: '我省考核指标累计总量及进度',
        // subtext: '纯属虚构'
        left: '10px',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            fontWeight: 300
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        x: 100,
        x2: 40,
        y2: 40, // 图形下对齐
    },
    legend: {
        // data: [{ icon: 'pin', name: '参考值', itemHeight: 2, itemWidth: 10 }, { icon: 'rect', name: '告警值' }, 'IDC电耗', '大网综合能耗'],
        data: ['参考值', '告警值', 'IDC电耗', '大网综合能耗'],
        // itemHeight: 2,
        orient: 'horizontal', // 布局  横向布局图例标记居文字的左边 vertical则反之
        x: 'right', // 图例显示在右边
        y: 'top', // 图例在垂直方向上面显示居中
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            fontWeight: 200
        }
    },
    label: {
        show: true,
        position: 'top',
        color: 'rgba(255, 255, 255, 0.8)'
    },
    calculable: true,
    xAxis: [{
        show: true, // ---是否显示
        position: 'bottom', // ---x轴位置
        offset: 0, // ---x轴相对于默认位置的偏移
        type: 'category', // ---轴类型，默认'category'
        nameGap: 15, // ---坐标轴名称与轴线之间的距离
        axisLabel: { // ---坐标轴 标签
            show: true, // ---是否显示
            inside: false, // ---是否朝内
            rotate: 0, // ---旋转角度
            margin: 8, // ---刻度标签与轴线之间的距离
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200
        },
        axisTick: { // ---坐标轴 刻度
            show: true, // ---是否显示
            inside: true, // ---是否朝内
            lengt: 3, // ---长度
            lineStyle: {
                // color:'red',          //---默认取轴线的颜色
                width: 1,
                type: 'solid',
            },
        },
        axisLine: { // ---坐标轴 轴线
            show: true, // ---是否显示
            // ------------------- 箭头 -------------------------
            symbol: ['none'], // ---是否显示轴线箭头
            // ------------------- 线 -------------------------
            lineStyle: {
                color: '#80a4ce',
                width: 1,
                type: 'solid',
                opacity: 0.5
            },
        },
        data: cityMap
    }],
    yAxis: [{
        // type: 'category',
        // data: ['5%', '25%', '45%', '70%', '90%', '120%'],
        type: 'value',
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        },
        axisLabel: { // ---坐标轴 标签
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200
        },
        splitLine: { // ---grid 区域中的分隔线
            show: true, // ---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.8)',
                width: 1,
                type: 'solid',
                opacity: 0.1 // ---类型
            },
        },
    }],
    series: [{
        name: 'IDC电耗',
        type: 'bar',
        data: [],
        label: {
            show: true,
            position: 'insideBottom',
            color: 'rgba(255, 255, 255, 0.8)'
        },
        markLine: {
            data: [

            ]
        },

        color: ['#24C6FF'],
        barWidth: '11', // ---柱形宽度
        barCategoryGap: '100%', // ---柱形间距
        barGap: '60%',
    },
    {
        name: '大网综合能耗',
        type: 'bar',
        // data: [2.0, 4.9, 7.0, 2.2, 5.6, 7.7, 5.6, 2.2, 3.6, 2.0, 6.4],
        label: {
            show: true
        },
        data: [],
        // markPoint: {
        //     data: [
        //         {type: 'max', name: '最大值'},
        //         {type: 'min', name: '最小值'}
        //     ]
        // },
        markLine: {
            data: [

            ]
        },
        color: ['#fad04e'],
        barWidth: '11', // ---柱形宽度
        barCategoryGap: '10%', // ---柱形间距

    },
    {
        name: '参考值',
        type: 'line',
        data: [],
        symbol: 'emptyCircle',
        markLine: {
            data: [

            ]
        },
        color: ['#7bfcfd'],
        itemStyle: {
            normal: {
                lineStyle: {
                    width: 1,
                    type: 'solid' // 'dotted'虚线 'solid'实线
                }
            }
        }

    },
    {
        name: '告警值',
        type: 'line',
        symbol: 'emptyCircle',
        data: [],
        markLine: {
            data: [

            ]
        },
        color: ['#ffa354'],
        itemStyle: {
            normal: {
                lineStyle: {
                    width: 1,
                    type: 'solid' // 'dotted'虚线 'solid'实线
                }
            }
        }

    }
    ]
};
export default option;