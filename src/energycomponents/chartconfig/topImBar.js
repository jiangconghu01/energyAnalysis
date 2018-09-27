import { cityMap } from './staticData.js';
let data = (() => {
    const data = [];
    const x = [];
    for (let index = 1; index <= 10; index++) {
        data.unshift(parseInt(Math.random() * 10) / 10 + 0.1);
        // index % 2 === 0 ? x.unshift('增长排名 ' + index + '0%') : x.unshift('排名 ' + index + '0%');
        // index % 2 === 0 ? x.unshift('增长排名') : x.unshift('排名');
        index % 2 === 0 ? x.unshift({ value: '非真实数', per: index }) : x.unshift({ value: '模拟数', per: index });
    }
    data.sort((a, b) => a - b);
    return {
        d: data,
        x: x
    };
})();
const option = {
    title: {
        text: '累计单位）',
        subtext: '纯属虚构',
        left: '10',
        top: '0',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 14,
            fontWeight: 300
        }
    },
    legend: {
        orient: 'horizontal', // 布局  横向布局图例标记居文字的左边 vertical则反之
        y: 'top', // 图例在垂直方向上面显示居中
        right: 0,
        top: 0,
        data: [],
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            fontWeight: 200
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    grid: {
        x: 100,
        y: 42,
        x2: 0,
        y2: '5%'
    },
    xAxis: [{
        type: 'value',
        boundaryGap: [0, 0.01],
        max: 1.2,
        min: 0,
        axisLabel: {
            show: false
        },
        splitLine: {
            show: false,
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
        // data: ['巴西', '印尼', '美国', '印度', '中国', '世界'],
        data: data.x,
        axisLabel: {
            // align: 'right',
            margin: 6, // ---刻度标签与轴线之间的距离
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200,
            formatter: (data) => {
                // console.log(data);
                // return `{name}|${data.name}{value}|${data.value * 100}%`;
                return `{name|${data}}{value|22%}`;
            },
            rich: {
                name: {
                    width: 55,
                    align: 'left',
                    padding: [0, 0, 0, 5]
                },
                value: {
                    width: 25,
                    align: 'left',
                    padding: [0, 5, 0, 0]
                }
            }
        },
        splitLine: {
            show: false
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        }
    }],
    series: [{
            name: '能源费',
            type: 'bar',
            color: '#ffcc00',
            barWidth: '4', // ---柱形宽度
            // data: [0.2, 0.4, 0.1, 0.6, 0.6, 0.8]
            data: data.d
        },
        {
            name: '收入',
            type: 'bar',
            color: '#2bfcff',
            barWidth: '4', // ---柱形宽度
            barGap: '100%',
            barCategoryGap: '5%', // ---柱形间距
            // data: [0.2, 0.4, 0.1, 0.6, 0.6, 0.8]
            data: data.d
        }
    ]
};

export default option;