import { cityMap } from './staticData.js';
const xArr = ['定额线', '大工业用电', '居民生活用电', '一般商业', '转供电', '其他'];
// function getData() {
//     let array = [];
//     xArr.forEach((ele, index) => {
//         let obj = {
//             name: ele,
//             type: 'bar',
//             stack: '用量',
//             barWidth: '20', // ---柱形宽度
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
        text: '地区分析（当年累计值）',
        subtext: '单位（万度）',
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
        // x: 100,
        // y: 5,
        // x2: 5,
        y2: 85
    },
    calculable: true,
    legend: {
        data: xArr,
        orient: 'horizontal',
        right: 50,
        itemWidth: 20,
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
            margin: 5, // ---刻度标签与轴线之间的距离
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200
        },
        axisTick: { // ---坐标轴 刻度
            show: true, // ---是否显示
            inside: true, // ---是否朝内
            lengt: 3, // ---长度
            lineStyle: {
                width: 1,
                type: 'solid',
            },
        },
        axisLine: { // ---坐标轴 轴线
            show: true, // ---是否显示
            symbol: ['none'], // ---是否显示轴线箭头
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
    dataZoom: [{
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'empty',
            bottom: '5%',
            textStyle: {
                color: 'rgba(255, 255, 255, 0.8)'
            }
        },
        // {
        //     type: 'slider',
        //     yAxisIndex: 0,
        //     filterMode: 'empty'
        // },
        {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        // {
        //     type: 'inside',
        //     yAxisIndex: 0,
        //     filterMode: 'empty'
        // }
    ],
    color: ['#ff66ec', '#60e0ff', '#ffb510', '#6668ff'],
    series: [{
        name: '定额线',
        type: 'line',
        symbol: 'emptyCircle',
        // symbol: 'circle',
        symbolSize: 2,
        itemStyle: {
            normal: {
                color: '#ffb510',
                lineStyle: {
                    color: '#ffff00',
                    width: 4
                }
            }
        },
        data: []
    }]
};
// option.series.push.apply(option.series, getData());
export default option;