// 浙江省2级数据
const provinceData = {
    provinceName: '浙江省',
    mapCode: '330000',
    provinceCode: 'A33',
    subCityArr: [{
        cityName: '杭州市',
        mapCode: '330100',
        cityCode: 'A3301',
    }, {
        cityName: '宁波市',
        mapCode: '330200',
        cityCode: 'A3302',
    }, {
        cityName: '温州市',
        mapCode: '330300',
        cityCode: 'A3303',
    }, {
        cityName: '嘉兴市',
        mapCode: '330400',
        cityCode: 'A3304',
    }, {
        cityName: '湖州市',
        mapCode: '330500',
        cityCode: 'A3305',
    }, {
        cityName: '绍兴市',
        mapCode: '330600',
        cityCode: 'A3306',
    }, {
        cityName: '金华市',
        mapCode: '330700',
        cityCode: 'A3307',
    }, {
        cityName: '衢州市',
        mapCode: '330800',
        cityCode: 'A3308',
    }, {
        cityName: '丽水市',
        mapCode: '331100',
        cityCode: 'A3309',
    }, {
        cityName: '台州市',
        mapCode: '331000',
        cityCode: 'A3310',
    }, {
        cityName: '舟山市',
        mapCode: '330900',
        cityCode: 'A3311',
    }]
};

var cityDataArr = [{
    cityName: '杭州市',
    mapCode: '330100',
    cityCode: 'A3301',
    subCityArr: [{
        cityName: '上城区',
        cityCode: 'A330101'
    }, {
        cityName: '下城区',
        cityCode: 'A330102'
    }, {
        cityName: '江干区',
        cityCode: 'A330103'
    }, {
        cityName: '拱墅区',
        cityCode: 'A330104'
    }, {
        cityName: '西湖区',
        cityCode: 'A330105'
    }, {
        cityName: '下沙区',
        cityCode: 'A330106'
    }, {
        cityName: '滨江区',
        cityCode: 'A330107'
    }, {
        cityName: '萧山区',
        cityCode: 'A330108'
    }, {
        cityName: '桐庐县',
        cityCode: 'A330109'
    }, {
        cityName: '富阳市',
        cityCode: 'A330110'
    }, {
        cityName: '临安市',
        cityCode: 'A330111'
    }, {
        cityName: '余杭区',
        cityCode: 'A330112'
    }, {
        cityName: '建德市',
        cityCode: 'A330113'
    }, {
        cityName: '淳安县',
        cityCode: 'A330114'
    }]
}, {
    cityName: '宁波市',
    mapCode: '330200',
    cityCode: 'A3302',
    subCityArr: [{
        cityName: '高新区',
        cityCode: 'A330201'
    }, {
        cityName: '海曙区',
        cityCode: 'A330202'
    }, {
        cityName: '江东区',
        cityCode: 'A330203'
    }, {
        cityName: '江北区',
        cityCode: 'A330204'
    }, {
        cityName: '北仑区',
        cityCode: 'A330205'
    }, {
        cityName: '镇海区',
        cityCode: 'A330206'
    }, {
        cityName: '慈溪市',
        cityCode: 'A330207'
    }, {
        cityName: '余姚市',
        cityCode: 'A330208'
    }, {
        cityName: '奉化市',
        cityCode: 'A330209'
    }, {
        cityName: '象山县',
        cityCode: 'A330210'
    }, {
        cityName: '宁海县',
        cityCode: 'A330211'
    }, {
        cityName: '鄞州区',
        cityCode: 'A330212'
    }]
}, {
    cityName: '温州市',
    mapCode: '330300',
    cityCode: 'A3303',
    subCityArr: [{
        cityName: '鹿城区',
        cityCode: 'A330301'
    }, {
        cityName: '龙湾区',
        cityCode: 'A330302'
    }, {
        cityName: '瓯海区',
        cityCode: 'A330303'
    }, {
        cityName: '洞头县',
        cityCode: 'A330304'
    }, {
        cityName: '乐清市',
        cityCode: 'A330305'
    }, {
        cityName: '永嘉县',
        cityCode: 'A330306'
    }, {
        cityName: '瑞安市',
        cityCode: 'A330307'
    }, {
        cityName: '平阳县',
        cityCode: 'A330308'
    }, {
        cityName: '苍南县',
        cityCode: 'A330309'
    }, {
        cityName: '文成县',
        cityCode: 'A330310'
    }, {
        cityName: '泰顺县',
        cityCode: 'A330311'
    }]
}, {
    cityName: '嘉兴市',
    mapCode: '330400',
    cityCode: 'A3304',
    subCityArr: [{
        cityName: '南湖区',
        cityCode: 'A330401'
    }, {
        cityName: '秀洲区',
        cityCode: 'A330402'
    }, {
        cityName: '嘉善县',
        cityCode: 'A330403'
    }, {
        cityName: '平湖市',
        cityCode: 'A330404'
    }, {
        cityName: '海宁市',
        cityCode: 'A330405'
    }, {
        cityName: '海盐县',
        cityCode: 'A330406'
    }, {
        cityName: '桐乡市',
        cityCode: 'A330407'
    }]
}, {
    cityName: '湖州市',
    mapCode: '330500',
    cityCode: 'A3305',
    subCityArr: [{
        cityName: '吴兴区',
        cityCode: 'A330501'
    }, {
        cityName: '南浔区',
        cityCode: 'A330502'
    }, {
        cityName: '德清县',
        cityCode: 'A330503'
    }, {
        cityName: '长兴县',
        cityCode: 'A330504'
    }, {
        cityName: '安吉县',
        cityCode: 'A330505'
    }]
}, {
    cityName: '绍兴市',
    mapCode: '330600',
    cityCode: 'A3306',
    subCityArr: [{
        cityName: '柯桥区',
        cityCode: 'A330601'
    }, {
        cityName: '上虞市',
        cityCode: 'A330602'
    }, {
        cityName: '嵊州市',
        cityCode: 'A330603'
    }, {
        cityName: '新昌县',
        cityCode: 'A330604'
    }, {
        cityName: '诸暨市',
        cityCode: 'A330605'
    }]
}, {
    cityName: '金华市',
    mapCode: '330700',
    cityCode: 'A3307',
    subCityArr: [{
        cityName: '婺城区',
        cityCode: 'A330701'
    }, {
        cityName: '金东区',
        cityCode: 'A330702'
    }, {
        cityName: '兰溪市',
        cityCode: 'A330703'
    }, {
        cityName: '永康市',
        cityCode: 'A330704'
    }, {
        cityName: '武义县',
        cityCode: 'A330705'
    }, {
        cityName: '东阳市',
        cityCode: 'A330706'
    }, {
        cityName: '磐安县',
        cityCode: 'A330707'
    }, {
        cityName: '义乌市',
        cityCode: 'A330708'
    }, {
        cityName: '浦江县',
        cityCode: 'A330709'
    }]
}, {
    cityName: '衢州市',
    mapCode: '330800',
    cityCode: 'A3308',
    subCityArr: [{
        cityName: '常山县',
        cityCode: 'A330801'
    }, {
        cityName: '江山市',
        cityCode: 'A330802'
    }, {
        cityName: '开化县',
        cityCode: 'A330803'
    }, {
        cityName: '龙游县',
        cityCode: 'A330804'
    }]
}, {
    cityName: '丽水市',
    mapCode: '331100',
    cityCode: 'A3309',
    subCityArr: [{
        cityName: '莲都区',
        cityCode: 'A330901'
    }, {
        cityName: '南城区',
        cityCode: 'A330902'
    }, {
        cityName: '青田县',
        cityCode: 'A330903'
    }, {
        cityName: '云和县',
        cityCode: 'A330904'
    }, {
        cityName: '龙泉市',
        cityCode: 'A330905'
    }, {
        cityName: '庆元县',
        cityCode: 'A330906'
    }, {
        cityName: '缙云县',
        cityCode: 'A330907'
    }, {
        cityName: '遂昌县',
        cityCode: 'A330908'
    }, {
        cityName: '松阳县',
        cityCode: 'A330909'
    }, {
        cityName: '景宁县',
        cityCode: 'A330910'
    }]
}, {
    cityName: '台州市',
    mapCode: '331000',
    cityCode: 'A3310',
    subCityArr: [{
        cityName: '椒江区',
        cityCode: 'A331001'
    }, {
        cityName: '黄岩区',
        cityCode: 'A331002'
    }, {
        cityName: '路桥区',
        cityCode: 'A331003'
    }, {
        cityName: '临海市',
        cityCode: 'A331004'
    }, {
        cityName: '温岭市',
        cityCode: 'A331005'
    }, {
        cityName: '仙居县',
        cityCode: 'A331006'
    }, {
        cityName: '天台县',
        cityCode: 'A331007'
    }, {
        cityName: '三门县',
        cityCode: 'A331008'
    }, {
        cityName: '玉环县',
        cityCode: 'A331009'
    }]
}, {
    cityName: '舟山市',
    mapCode: '330900',
    cityCode: 'A3311',
    subCityArr: [{
        cityName: '新城区',
        cityCode: 'A331101'
    }, {
        cityName: '定海区',
        cityCode: 'A331102'
    }, {
        cityName: '普陀区',
        cityCode: 'A331103'
    }, {
        cityName: '岱山县',
        cityCode: 'A331104'
    }, {
        cityName: '嵊泗县',
        cityCode: 'A331105'
    }]
}];
export default {provinceData, cityDataArr};
