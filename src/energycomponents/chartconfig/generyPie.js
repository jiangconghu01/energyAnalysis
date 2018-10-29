const option = {
    title: { // 标题组件
        text: '当前累计总能耗状况',
        left: '10px', // 标题的位置 默认是left，其余还有center、right属性
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            fontWeight: 300
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'horizontal', // 布局  横向布局图例标记居文字的左边 vertical则反之
        // x: 'right', // 图例显示在右边
        y: 'top', // 图例在垂直方向上面显示居中
        // right: 10,
        right: 10,
        top: 1,
        // data: ['电费', '电量', '油费', '油耗', '水费', '水量', '燃气费', '燃气耗量'],
        data: [],
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            fontWeight: 200
        }
    },
    calculable: true,

    series: [{
        name: '能源费情况',
        type: 'pie',
        radius: ['62%', '75%'],
        center: ['45%', '53%'],
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'outer',
                    formatter: '总{b}费(万元)\n{c}',
                    // color: '#ffa354',
                    align: 'left',
                    fontWeight: 200,
                    fontSize: 14,

                },
                labelLine: {
                    show: true,
                    length: 10,
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        width: 1
                    }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true,
                    length: 10,
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        width: 1
                    }
                }
            }
        },
        data: [
            { value: 0, name: '电', label: { show: false, color: '#ffefb4' }, labelLine: { show: false } },
            { value: 0, name: '油', label: { show: true }, labelLine: { show: true } },
        ],
        color: ['#ffa354', '#ffefb4', '#24c6ff'], // '#FFEC00'
        startAngle: -5,
        hoverAnimation: false,
    },
    {
        name: '能耗情况',
        type: 'pie',
        radius: ['45%', '60%'],
        center: ['45%', '53%'],
        itemStyle: {
            normal: {
                labelLine: {
                    show: true,
                    length: 20,
                    lineStyle: {

                        width: 1
                    }
                },
                label: {
                    show: true,
                    position: 'outer',
                    formatter: '总{b}量(吨标煤)\n{c}',
                    // formatter: function(param) {
                    //     if (param.value == 0) {
                    //         return '';
                    //     } else {
                    //         return `总${param.name}(万元)\n${param.value}`;
                    //     }
                    // },
                    // color: '#ffa354',
                    align: 'left',
                    fontWeight: 200,
                    fontSize: 14
                }

            },
            emphasis: {
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true,
                    length: 20,
                    lineStyle: {

                        width: 1
                    }
                }
            }
        },
        data: [
            { value: 135, name: '电', label: { show: true, color: '#ffefb4' }, labelLine: { show: true } },
            { value: 1348, name: '油', label: { show: true }, labelLine: { show: true } }
        ],
        // color: ['#ffefb4', '#ff66ec', '#24c6ff', '#ffa354'],
        color: ['#ffa354', '#ffefb4', '#24c6ff'],
        startAngle: -55,
        hoverAnimation: false,
    }
    ]
};
export default option;
