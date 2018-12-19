import { cityMap, categoryCount } from './staticData.js';
// function getData() {
//     let array = [];
//     categoryCount.forEach((ele, index) => {
//         let obj = {
//             name: ele,
//             type: 'bar',
//             stack: '用量',
//             barWidth: '10', // ---柱形宽度
//             barCategoryGap: '10%', // ---柱形间距
//             data: getRandom()
//         };
//         array.push(obj);
//     });
//     return array;
// }
// function getRandom() {
//     let arr = [];
//     for (let i = 0; i < 11; i++) {
//         arr.push(10 + parseInt(Math.random() * 50));
//     }
//     let a = arr.sort((a, b) => b - a);
//     return a;
// }
const option = {
    title: {
        text: '总电耗结构分析',
        left: '10px',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            fontWeight: 300
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(param) {
            console.log(param);
        }
    },
    // grid: {
    //     x: 100,
    //     y: 5,
    //     x2: 5,
    //     y2: 50
    // },
    calculable: true,
    legend: {
        data: categoryCount,
        orient: 'vertical',
        // x: '85%', // 图例显示在右边
        right: '5',
        y: 'top', // 图例在垂直方向上面显示居中
        itemWidth: 14,
        itemGap: 5,
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            fontWeight: 200
        }
    },
    xAxis: [{
        type: 'category',
        splitLine: { show: false },
        data: cityMap,
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
    }],
    yAxis: [{
        type: 'value',
        position: 'left',
        // max: 4000,
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        },
        axisLabel: { // ---坐标轴 标签
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 10
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
    color: ['#79ddff', '#ffdd48', '#ffa848', '#ff66ec', '#6668ff'],
    series: [{
        name: '电量占比',
        type: 'pie',
        tooltip: {
            trigger: 'item',
            formatter: '{a} {b} :<br/> {c} ({d}%)'
        },
        center: ['65%', '30%'],
        radius: ['23%', '53%'],
        hoverAnimation: false,
        color: ['#79ddff', '#ffdd48', '#ffa848', '#ff66ec', '#6668ff'],
        itemStyle: {
            normal: {
                labelLine: {
                    length: 20
                },
                label: {
                    position: 'inner',
                    show: true,
                    formatter: '{d}%'
                }
            }
        },
        data: [

        ]
    }]
};
// option.series.push.apply(option.series, getData());
// option.series = getData().concat(option.series);
export default option;