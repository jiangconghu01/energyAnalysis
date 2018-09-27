import { cityMap } from './staticData.js';
let data = (() => {
    let a = [];
    for (let index = 0; index < 11; index++) {
        a.push(parseInt(Math.random() * 10) + 5);
    }
    return a;
})();
const option = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        x: 50,
        y: 30,
        x2: '10%',
        y2: '20%', // 图形下对齐
    },
    legend: {
        data: ['直供电'],
        orient: 'horizontal', // 布局  横向布局图例标记居文字的左边 vertical则反之
        x: 'right', // 图例显示在右边
        y: 'top', // 图例在垂直方向上面显示居中
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            fontWeight: 200
        }
    },
    calculable: true,
    xAxis: [{
        show: true, // ---是否显示
        // position: 'bottom', // ---x轴位置
        offset: 0, // ---x轴相对于默认位置的偏移
        type: 'category', // ---轴类型，默认'category'
        // nameGap: 15, // ---坐标轴名称与轴线之间的距离
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
        data: ['直供电', '大工业', '居民生活', '一般商业', '其他']
    }],
    yAxis: [{
        type: 'value',
        splitNumber: 3,
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
                // color: '#79ddff',
                color: 'rgba(255, 255, 255, 0.8)',
                width: 1,
                type: 'solid',
                opacity: 0.1 // ---类型
            },
        },
    }],
    series: [{
        name: '直供电',
        type: 'bar',
        data: [],
        color: ['#ffa848', '#fad04e', '#fad04e', '#fad04e', '#fad04e'],
        // color: (params) => {
        //     const colorList = ['#ffa848', '#fad04e', '#fad04e', '#fad04e', '#fad04e'];
        //     return colorList[params.dataIndex];
        // },
        barWidth: '20', // ---柱形宽度
        barCategoryGap: '0%', // ---柱形间距

    }]
};
export default option;