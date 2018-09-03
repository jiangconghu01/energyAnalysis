function random(type) {
    return type === 1 ? parseFloat(150.00 + Math.random() * 50).toFixed(2) : parseFloat(30.00 + Math.random() * 40).toFixed(2);
}

function randomDataArray() {
    let d = [];
    let len = 20;
    while (len--) {
        d.push([
            random(1),
            random()
        ]);
    }
    return d;
}

const option = {
    title: {
        text: 'TOP-50办公大楼',
        left: 10,
        top: 10,
        textStyle: {
            color: '#FFF',
            fontSize: 16,
            fontWeight: 300
        }
    },
    color: ['#94ef30', '#6bdaff', '#ffa900', '#fa655c'],
    // tooltip: {
    //     trigger: 'axis',
    //     showDelay: 0,
    //     formatter: function (params) {
    //         if (params.value.length > 1) {
    //             return params.seriesName + ' :<br/>' +
    //                params.value[0] + 'cm ' +
    //                params.value[1] + 'kg ';
    //         } else {
    //             return params.seriesName + ' :<br/>' +
    //                params.name + ' : ' +
    //                params.value + 'kg ';
    //         }
    //     },
    //     axisPointer: {
    //         show: true,
    //         type: 'cross',
    //         lineStyle: {
    //             type: 'dashed',
    //             width: 1
    //         }
    //     }
    // },
    grid: {
        x: '10%',
        y: '20%',
        x2: '15%',
        y2: '12%'
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'cross'
        },
        formatter: function(params) {
            return `${params.data.name}:${params.value}`;
        }
    },
    dataZoom: [
        // {
        //     type: 'slider',
        //     yAxisIndex: 0,
        //     filterMode: 'empty',
        //     bottom: '10%',
        //     start: 0,
        //     end: 100,
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
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
        {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
        }
    ],
    legend: {
        data: ['优', '良', '中', '差'],
        right: 10,
        y: 'center',
        orient: 'vertical',
        textStyle: {
            color: '#FFF',
            fontSize: 12,
            fontWeight: 200
        }
    },
    xAxis: [{
            type: 'value',
            scale: true,
            max: 205,
            axisLabel: { // ---坐标轴 标签
                show: true, // ---是否显示
                inside: false, // ---是否朝内
                rotate: 0, // ---旋转角度
                margin: 8, // ---刻度标签与轴线之间的距离
                color: '#fff', // ---默认取轴线的颜色
                fontSize: 12,
                fontWeight: 200,
                formatter: (val) => {
                    return parseFloat(val * 100).toFixed(2) + '%';
                }
            },
            axisTick: { // ---坐标轴 刻度
                show: true, // ---是否显示
                inside: false, // ---是否朝内
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
            splitLine: {
                show: false
            }
        }

    ],
    yAxis: [{
        type: 'value',
        scale: true,
        max: 75,
        axisLabel: {
            margin: 8, // ---刻度标签与轴线之间的距离
            color: '#fff', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200,
            formatter: '{value}'
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
    }],
    color: [
        '#fa150d',
        '#fa7b78', // 红
        '#ff66ec',
        '#ffa900', // 橙
        '#e9e025', // 黄
        '#e2e07e',
        '#94ef30', // 绿
        '#6bdaff', // 蓝
        '#419eff',
        '#6668ff', // 紫
        '#ffffff' // 白
    ],
    series: [
        // {
        //     name: '优',
        //     type: 'scatter',
        //     data: [],
        //     // markPoint: {
        //     //     data: [
        //     //         {type: 'max', name: '最大值'},
        //     //         {type: 'min', name: '最小值'}
        //     //     ]
        //     // },
        //     // symbolSize: function(data) {
        //     //     // console.log(data, data[1]);
        //     //     return 10;
        //     // },
        //     label: {
        //         show: true,
        //         color: '#fff',
        //         // formatter: function(params) {
        //         //     return `${params.name}`;
        //         // },
        //         emphasis: {
        //             show: true,
        //             formatter: function(param) {
        //                 return param.name;
        //             },
        //             position: 'top'
        //         }
        //     },
        //     markLine: {
        //         symbol: ['none', 'arrow'],
        //         silent: true,
        //         data: [{
        //             yAxis: 52,
        //             lineStyle: {
        //                 type: 'solid',
        //                 color: '#ffcc00'
        //             },
        //             label: {
        //                 formatter: 'PUE同比增幅'
        //             }
        //         },
        //         {
        //             xAxis: 175,
        //             lineStyle: {
        //                 type: 'solid',
        //                 color: '#ffcc00'
        //             },
        //             label: {
        //                 formatter: 'PUE'
        //             }
        //         }
        //         ]
        //     }
        // },
        //     // {
        //     //     name: '良',
        //     //     type: 'scatter',
        //     //     data: randomDataArray(),
        //     // },
        //     // {
        //     //     name: '中',
        //     //     type: 'scatter',
        //     //     data: randomDataArray(),
        //     //     symbolSize: function (data) {
        //     //         // console.log(data, data[1]);
        //     //         return 18;
        //     //     },
        //     // },
        //     // {
        //     //     name: '差',
        //     //     type: 'scatter',
        //     //     data: randomDataArray(),
        //     // }
    ]
};
export default option;