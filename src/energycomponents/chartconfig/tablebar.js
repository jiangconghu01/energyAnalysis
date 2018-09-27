const option = {
    tooltip: {
        trigger: 'axis',
        // show: false,
        formatter: function(params) {
            return '';
        }
    },
    // calculable: true,
    grid: {
        x: 0,
        y: 12,
        x2: 0,
        y2: -3
    },
    xAxis: [{
        type: 'value',
        position: 'top',
        // data: ['10', '100', ''],
        // boundaryGap: [0, 0.01],
        max: 1,
        splitNumber: 5,
        // min: 0,
        axisLabel: {
            margin: 0, // ---刻度标签与轴线之间的距离
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200,
            align: 'left',
            formatter: function(value, index) {
                return value + '33';
            }
        },
        splitLine: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.8)',
                width: 1,
                type: 'solid',
                opacity: 0.2
            },
        },
        axisTick: {
            show: true,
            inside: true,
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.8)',
                width: 1,
                type: 'solid',
                opacity: 0.6
            },
        }
    }],
    yAxis: [{
        type: 'category',
        // data: ['巴西', '印尼', '美国', '印度', '中国', '世界'],
        data: ['test'],
        axisLabel: {
            margin: 0, // ---刻度标签与轴线之间的距离
            color: 'rgba(255, 255, 255, 0.8)', // ---默认取轴线的颜色
            fontSize: 12,
            fontWeight: 200,
        },
        splitLine: {
            show: false
        },
        axisLine: {
            show: false,
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
    series: [
        // {
        //     name: '同1',
        //     type: 'bar',
        //     color: '#33cc00',
        //     barWidth: '9', // ---柱形宽度
        //     stack: '量',
        //     barCategoryGap: 0, // ---柱形间距
        //     // data: [0.2, 0.4, 0.1, 0.6, 0.6, 0.8]
        //     data: [26]
        // },
        // {
        //     name: '同1',
        //     type: 'bar',
        //     color: '#ff2200',
        //     barWidth: '9', // ---柱形宽度
        //     stack: '量',
        //     barCategoryGap: 0, // ---柱形间距
        //     // data: [0.2, 0.4, 0.1, 0.6, 0.6, 0.8]
        //     data: [140]
        // },
        // {
        //     name: '同1',
        //     type: 'bar',
        //     color: '#ffcc88',
        //     barWidth: '9', // ---柱形宽度
        //     stack: '量',
        //     barCategoryGap: 0, // ---柱形间距
        //     // data: [0.2, 0.4, 0.1, 0.6, 0.6, 0.8]
        //     data: [299]
        // },
        // {
        //     name: '同1',
        //     type: 'bar',
        //     color: '#ffcc88',
        //     barWidth: '9', // ---柱形宽度
        //     stack: '量',
        //     barCategoryGap: 0, // ---柱形间距
        //     // data: [0.2, 0.4, 0.1, 0.6, 0.6, 0.8]
        //     data: [38000]
        // },
        // {
        //     name: '同1',
        //     type: 'bar',
        //     color: '#ffcc88',
        //     barWidth: '9', // ---柱形宽度
        //     stack: '量',
        //     barCategoryGap: 0, // ---柱形间距
        //     // data: [0.2, 0.4, 0.1, 0.6, 0.6, 0.8]
        //     data: [38000]
        // },
    ]
};

export default option;