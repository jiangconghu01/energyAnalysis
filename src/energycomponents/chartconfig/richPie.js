const option = {
    title: {
        text: '天气情况统计',
        subtext: '虚构数据',
        left: 'center'
    },

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['西凉', '益州', '兖州', '荆州', '幽州']
    },
    series: [{
        type: 'pie',
        radius: '65%',
        center: ['30%', '50%'],
        selectedMode: 'single',
        data: [{
                value: 1548,
                name: '幽州',
                label: {
                    normal: {
                        formatter: [
                            '{bara1|}{bara2|}{bara3|}{bara4|}',
                            '{hr|}',
                            '{legend1|}{valueHead|大工业}{splitline|}{legend2|}{valueHead|居民生活}{splitline|}{legend3|}{valueHead|一般商业}{splitline|}{legend4|}{valueHead|其他}',
                            '{legend5|}{valueHead|2342}{splitline|}{legend5|}{valueHead|23425}{splitline|}{legend5|}{valueHead|45645}{splitline|}{legend5|}{valueHead|45456}',
                        ].join('\n'),
                        backgroundColor: 'rgba(103, 179, 238, 0.5)',
                        // borderColor: '#777',
                        borderWidth: 0,
                        borderRadius: 1,
                        padding: [0, 0, 0, 0],
                        rich: {
                            // ['#ffed8b', '#ffa848', '#70fed2', '#6668ff', '#3dd55a']
                            bara1: {
                                width: 81.5,
                                backgroundColor: '#ffed8b',

                            },
                            bara2: {
                                width: 61.5,
                                backgroundColor: '#ffa848',

                            },
                            bara3: {
                                width: 89.5,
                                backgroundColor: '#70fed2',

                            },
                            bara4: {
                                width: 21.5,
                                backgroundColor: '#6668ff',

                            },
                            legend1: {
                                width: 6,
                                backgroundColor: '#ffed8b',
                            },
                            legend2: {
                                width: 6,
                                backgroundColor: '#ffa848',
                            },
                            legend3: {
                                width: 6,
                                backgroundColor: '#70fed2',
                            },
                            legend4: {
                                width: 6,
                                backgroundColor: '#6668ff',
                            },
                            legend5: {
                                width: 6,
                                backgroundColor: 'rgba(255, 255, 255, 0)',
                            },
                            splitline: {
                                width: 2,
                                backgroundColor: '#0067c0',
                                height: 20,
                            },
                            valueHead: {
                                width: 70,
                                height: 20,
                                color: 'rgba(255, 255, 255, 0.8)',
                                // padding: [0, 10, 0, 5],
                                align: 'left',
                                // backgroundColor: 'rgba(103, 179, 238, 0.5)',
                            },
                            hr: {
                                borderColor: '#0067c0',
                                width: '100%',
                                borderWidth: 1.5,
                                height: 0
                            }
                        }
                    }
                }
            },
            { value: 535, name: '荆州' },
            { value: 510, name: '兖州' },
            { value: 634, name: '益州' },
            { value: 735, name: '西凉' }
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};
export default option;