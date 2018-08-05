import {cityMap} from './staticData.js';
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
            color: '#FFF',
            fontSize: 16,
            fontWeight: 300
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    grid: {
        x: 80,
        // y: 5,
        x2: 100,
        // y2: '25%'
    },
    xAxis: [
        {
            type: 'value',
            boundaryGap: [0, 0.01],
            max: 1.2,
            min: 0,
            axisLabel: {
                margin: 8, // ---刻度标签与轴线之间的距离
                color: '#fff', // ---默认取轴线的颜色
                fontSize: 12,
                fontWeight: 200,
                formatter: (val) => {
                    return `${val * 100}%`;
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#fff',
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
        }
    ],
    yAxis: [
        {
            type: 'category',
            // data: ['巴西', '印尼', '美国', '印度', '中国', '世界'],
            data: data.x,
            axisLabel: {
                margin: 8, // ---刻度标签与轴线之间的距离
                color: '#fff', // ---默认取轴线的颜色
                fontSize: 12,
                fontWeight: 200,
            },
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff',
                    width: 1,
                    type: 'solid',
                    opacity: 0.1
                },
            },
            axisTick: {
                show: false
            }
        }
    ],
    dataZoom: [
        {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty',
            bottom: '10%',
            start: 80,
            end: 100,
            textStyle: {
                color: '#fff'
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
    series: [
        {
            name: '同比增长',
            type: 'bar',
            color: '#ffcc00',
            barWidth: '12', // ---柱形宽度
            barCategoryGap: '10%', // ---柱形间距
            // data: [0.2, 0.4, 0.1, 0.6, 0.6, 0.8]
            data: data.d
        }
    ]
};

export default option;
