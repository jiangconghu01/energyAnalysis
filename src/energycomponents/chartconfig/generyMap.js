const provinceMap = {
    title: {
        text: '当年累计能耗发生量',
        left: '10px',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            fontWeight: 300
        }
    },
    tooltip: {
        trigger: 'item',
        confine: true,
        formatter: '{b}<br/>{c}'
            // formatter: function(params, ticket, callback) {
            //     // console.log(params, '3453495348573535');
            //     return params.name;
            // }
    },
    // legend: {
    //     x: 'right',
    //     selectedMode: false,
    //     data: ['杭州市']
    // },
    dataRange: {
        orient: 'vertical',
        min: 0,
        x: 30,
        max: 10000,
        text: ['高', '低'], // 文本，默认为数值文本
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            fontWeight: 300
        },
        // splitNumber: 0,
        calculable: true,
        // splitList: [
        //     {start: 1500},
        //     {start: 900, end: 1500},
        //     {start: 310, end: 1000},
        //     {start: 200, end: 300},
        //     {start: 10, end: 200, label: '10 到 200（火灾数量）'},
        //     {start: 5, end: 5, label: '5（火灾数量）', color: 'black'},
        //     {end: 10}
        // ],
        color: ['#0052bc', '#b9effe']
    },
    roam: true,
    series: [{
        type: 'map',
        // selectedMode: 'single',
        map: '浙江',
        zoom: 1,
        mapLocation: {
            x: 'center',
            y: 'center'
        },
        data: [],
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255, 0.8)',
                },
                borderColor: 'rgba(255, 255, 255, 0.8)',
            },
            emphasis: {
                label: {
                    show: true,
                }
            },
        }
    }],

};

const cityMap = {
    title: {
        text: '当年累计能耗发生量',
        left: '10px',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            fontWeight: 300
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c}'
            // formatter: (p) => {
            //     console.log(p);
            // }
    },
    dataRange: {
        orient: 'vertical',
        min: 0,
        x: 30,
        max: 10000,
        text: ['高', '低'], // 文本，默认为数值文本
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            fontWeight: 300
        },
        calculable: true,
        color: ['#0052bc', '#b9effe']
    },
    roam: true,
    series: [{
        type: 'map',
        zoom: 1.1,
        mapLocation: {
            x: 'center',
            y: 'center'
        },
        data: [],
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255, 0.8)',
                    // formatter: '{a}'
                },
                borderColor: 'rgba(255, 255, 255, 0.8)',
            },
            emphasis: { label: { show: true } },
        }
    }],

};
// function getNumberStr(num) {
//     let result = [];
//     let counter = 0;
//     num = (num || 0).toString().split('');
//     for (var i = num.length - 1; i >= 0; i--) {
//         counter++;
//         result.unshift(num[i]);
//         if (!(counter % 3) && i != 0) {
//             result.unshift(',');
//         }
//     }
//     return result.join('');
// }
export { provinceMap, cityMap };