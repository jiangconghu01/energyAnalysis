const option = {
    title: {
        text: 'TOP-50办公大楼',
        left: 10,
        top: 10,
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            fontWeight: 300
        }
    },
    // color: ['#94ef30', '#6bdaff', '#ffa900', '#fa655c'],
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
        x: '15%',
        y: '10%',
        x2: '15%',
        y2: '18%'
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'cross'
        },
        // formatter: function(params) {
        //     return `${params.data.name}:</br>
        //     x=${params.value[0]}
        //     y=${params.value[1]}`;
        // }
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
        //         color: 'rgba(255, 255, 255, 0.8)'
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
    geo: {
        roam: true
    },
    legend: {
        data: [],
        right: 10,
        y: 'center',
        orient: 'vertical',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
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
                color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
                fontSize: 12,
                fontWeight: 200,
                formatter: (val) => {
                    return parseInt(val * 100) + '%';
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
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200,
            formatter: '{value}'
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

    ]
};
export default option;