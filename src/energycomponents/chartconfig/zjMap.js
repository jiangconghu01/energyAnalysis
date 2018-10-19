// import hzjson from './mapjson/330100';
import hzjson from './mapjson/map';
import nbjson from './mapjson/330200';
import wzjson from './mapjson/330300';
import jxjson from './mapjson/330400';
import huzhoujson from './mapjson/330500';
import sxjson from './mapjson/330600';
import jhjson from './mapjson/330700';
import qzjson from './mapjson/330800';
import zsjson from './mapjson/330900';
import tzjson from './mapjson/331000';
import lsjson from './mapjson/331100';

const config = {
    mapJson: {
        '杭州市': hzjson,
        '宁波市': nbjson,
        '温州市': wzjson,
        '嘉兴市': jxjson,
        '湖州市': huzhoujson,
        '绍兴市': sxjson,
        '金华市': jhjson,
        '衢州市': qzjson,
        '舟山市': zsjson,
        '台州市': tzjson,
        '丽水市': lsjson,
    },
    mapCode: {
        '杭州市': 'A3301',
        '宁波市': 'A3302',
        '温州市': 'A3303',
        '嘉兴市': 'A3304',
        '湖州市': 'A3305',
        '绍兴市': 'A3306',
        '金华市': 'A3307',
        '衢州市': 'A3308',
        '丽水市': 'A3309',
        '台州市': 'A3310',
        '舟山市': 'A3311',
        '省传输局': 'A3312',
        '信产公司': 'A3314',
        '省本部': 'A3300'
    },
    mapName: {

    },
    colorName: [
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
    arrName: [
        '杭州市',
        '宁波市',
        '温州市',
        '嘉兴市',
        '湖州市',
        '绍兴市',
        '金华市',
        '衢州市',
        '丽水市',
        '台州市',
        '舟山市',
        '省传输局',
        '信产公司',
        '省本部'
    ],
    arrCode: [
        'A3301',
        'A3302',
        'A3303',
        'A3304',
        'A3305',
        'A3306',
        'A3307',
        'A3308',
        'A3309',
        'A3310',
        'A3311',
        'A3312',
        'A3314',
        'A3300'
    ],
    countryCodeCount: {
        'A3301': 14,
        'A3302': 12,
        'A3303': 11,
        'A3304': 7,
        'A3305': 5,
        'A3306': 6,
        'A3307': 9,
        'A3308': 6,
        'A3309': 10,
        'A3310': 9,
        'A3311': 5,
        'A3312': -1,
        'A3314': -1,
        'A3300': -1
    }
};
for (let [key, value] of Object.entries(config.mapCode)) { // 翻转浙江个地市级编号和名称
    config.mapName[value] = key;
}
export default config;