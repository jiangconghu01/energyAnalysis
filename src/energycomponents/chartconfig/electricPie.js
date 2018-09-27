const ConfigElePie1 = {
    title: {
        text: '',
        left: '5px', // 标题的位置 默认是left，其余还有center、right属性
        // bottom: '20%',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            fontWeight: 300
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} <br/>{c} ({d}%)'
    },
    legend: {
        orient: 'horizontal',
        x: 'right', // 图例显示在右边
        y: 0,
        data: ['直供电', '转供电'],
        textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            fontWeight: 200
        }
    },
    // calculable: true,
    series: [{
        name: '各部占比',
        type: 'pie',
        radius: '55%',
        zoom: 1.6,
        center: ['20%', '50%'],
        data: [
            { value: 0, name: '直供电' },
            { value: 0, name: '转供电' },
        ],
        color: ['#ffa354', '#24c6ff'],
        startAngle: -60,
        hoverAnimation: false,
        itemStyle: {
            normal: {
                label: {
                    position: 'inner',
                    show: true,
                    formatter: '{b}\n {d}%'
                }
            }

        }
    }]
};

// 显示label用的
const ConfigElePie2 = {
    calculable: true,
    series: [{
        name: '各部占比',
        type: 'pie',
        radius: '55%',
        zoom: 1.6,
        center: ['20%', '50%'],
        data: [],
        // color: ['rgba(255,255,255,0)'],
        color: ['rgba(255, 255, 255, 0.8)'],
        startAngle: 0,
        hoverAnimation: false,
        itemStyle: {
            normal: {
                label: {
                    position: 'right',
                    show: true,
                    formatter: '{b}\n {d}%'
                }
            }

        }
    }]
};

export { ConfigElePie1, ConfigElePie2 };