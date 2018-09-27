import { cityMap } from './staticData.js';
let data = (() => {
    let a = [];
    for (let index = 0; index < 11; index++) {
        a.push(parseInt(Math.random() * 10) + 0.1);
    }
    return a;
})();
const option = {
    title: {
        text: '总PUE情况',
        // subtext: '纯属虚构'
        left: '10px',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            fontWeight: 300
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            console.log(params);
        }
    },
    grid: {
        y: 50,
        y2: 40, // 图形下对齐
    },
    legend: {
        data: ['A类局站', 'B类局站', 'C类局站', 'D类局站'],
        orient: 'horizontal', // 布局  横向布局图例标记居文字的左边 vertical则反之
        x: 'right', // 图例显示在右边
        y: 'top', // 图例在垂直方向上面显示居中
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            fontWeight: 100
        }
    },
    calculable: true,
    xAxis: [{
        show: true, // ---是否显示
        position: 'bottom', // ---x轴位置
        offset: 0, // ---x轴相对于默认位置的偏移
        type: 'category', // ---轴类型，默认'category'
        nameGap: 5, // ---坐标轴名称与轴线之间的距离
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
    label: {
        show: true,
        position: 'top',
        color: 'rgba(255, 255, 255, 0.8)'
    },
    series: [{
            name: 'A类局站',
            type: 'bar',
            data: data,
            color: ['#fad04e'],
            barWidth: '6', // ---柱形宽度
            barCategoryGap: '100%', // ---柱形间距

        },
        {
            name: 'B类局站',
            type: 'bar',
            label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255, 0.8)'
            },
            data: data,
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ]
            // },
            color: ['#7bfcfd'],
            barWidth: '6', // ---柱形宽度
            barGap: '30%',
            barCategoryGap: '100%', // ---柱形间距
        },
        {
            name: 'C类局站',
            type: 'bar',
            label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255, 0.8)'
            },
            data: data,
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ]
            // },
            color: ['#ffa848'],
            barWidth: '6', // ---柱形宽度
            barGap: '30%',
            barCategoryGap: '100%', // ---柱形间距
        },
        {
            name: 'D类局站',
            type: 'bar',
            label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255, 0.8)'
            },
            data: data,
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ]
            // },
            color: ['#ff66ec'],
            barWidth: '6', // ---柱形宽度
            barGap: '30%',
            barCategoryGap: '100%', // ---柱形间距
        }
    ]
};
export default option;
//'#ffa848', '#ff66ec',