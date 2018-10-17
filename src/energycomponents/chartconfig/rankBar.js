import { cityMap } from './staticData.js';
let data = (() => {
    const data = [];
    const x = [];
    for (let index = 1; index <= 80; index++) {
        data.unshift(parseInt(Math.random() * 10) / 10 + 0.1);
        x.unshift('增长排名' + index);
    }
    data.sort((a, b) => a - b);
    return {
        d: data,
        x: x
    };
})();
const option = {
    title: {
        text: '累计单位台席电耗数同比（%）',
        // subtext: '纯属虚构'
        left: '10',
        top: '10',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            fontWeight: 300
        }
    },
    legend: {
        data: ['同比增长', '同比负增长'],
        color: ['#ffcc00', '#94ef30'],
        right: 10,
        top: '10',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)'
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            return `${params[0].name}</br>
            ${params[0].seriesName}:${params[0].data.value2}`;
        }
    },
    calculable: true,
    grid: {
        x: 80,
        // y: 5,
        x2: 100,
        // y2: '25%'
    },
    xAxis: [{
        type: 'value',
        boundaryGap: [0, 0.01],
        // max: 1.2,
        // min: -2,
        axisLabel: {
            margin: 8, // ---刻度标签与轴线之间的距离
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200,
            formatter: (val) => {
                return `${val * 100}%`;
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.8)',
                width: 1,
                type: 'solid',
                opacity: 0.1 // ---类型
            }
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    }],
    yAxis: [{
        type: 'category',
        data: data.x,
        axisLabel: {
            margin: 8, // ---刻度标签与轴线之间的距离
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200,
        },
        splitLine: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.8)',
                width: 1,
                type: 'solid',
                opacity: 0.1
            },
        },
        axisTick: {
            show: false
        }
    }],
    dataZoom: [{
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'empty',
        bottom: '10%',
        start: 0,
        end: 100,
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
        yAxisIndex: 0,
        filterMode: 'empty'
    },
        // {
        //     type: 'inside',
        //     yAxisIndex: 0,
        //     filterMode: 'empty'
        // }
    ],
    series: [{
        name: '同比',
        type: 'bar',
        stack: 'yy',
        // color: '#ffcc00','#94ef30'
        color: function(params) {
            // console.log(params);
            if (parseFloat(params.data.value2) < 0) {
                return '#94ef30';
            }
            return '#ffcc00';
        },
        barWidth: '12', // ---柱形宽度
        barCategoryGap: '10%', // ---柱形间距
        label: {
            position: 'right',
            formatter: function(params) {
                return params.data.value2;
            }
        },
        data: data.d
    }, {
        name: '同比负增长',
        type: 'bar',
        stack: 'yy',
        color: '#94ef30',
        data: []
    }, {
        name: '同比增长',
        type: 'bar',
        stack: 'yy',
        color: '#ffcc00',
        data: []
    }]
};

export default option;