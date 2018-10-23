import jzMap from './chartconfig/zjMap.js';
import { labelZoom } from './chartconfig/staticData.js';
import { cityDataArr } from './cityMapCode.js';
// 请求浙江省参数
const zhjCode = 'A33';

function getProvinceParam(date, code, encodeArray) {
    let paramStr = '';
    code = code || zhjCode;
    for (let index = 0, len = encodeArray.length; index < len; index++) {
        paramStr += `[${date},${code},${encodeArray[index]}],`;
    }
    paramStr = paramStr.substring(0, paramStr.length - 1);
    return paramStr;
}
// 请求城市的各指标参数
function getCityParam(date, cityCodeArr, encodeArray) {
    let paramStr = '';
    for (let index = 0, len = cityCodeArr.length; index < len; index++) {
        const element = cityCodeArr[index];
        for (let i = 0, len = encodeArray.length; i < len; i++) {
            const ele = encodeArray[i];
            paramStr += `[${date},${element},${ele}],`;
        }
    }
    paramStr = paramStr.substring(0, paramStr.length - 1);
    return paramStr;
}
// 查找省级或者城市对应编号的指标
function searchVal(code, encode, dataArr, fix) {
    let target = {};
    for (let index = 0, len = dataArr.length; index < len; index++) {
        const element = dataArr[index];
        if (element.accountCode === code && element.indexCode === encode) {
            target = element;
        }
    }
    return fix ? parseFloat(target.indexVlue).toFixed(fix) : parseFloat(target.indexVlue).toFixed(2);
}
// 根据编码查出所有改编码的值
function searchValArr(encode, dataArr, cityCode) {
    const target = [];
    if (cityCode) {
        for (let index = 0, len = dataArr.length; index < len; index++) {
            const element = dataArr[index];
            if (element.indexCode === encode && element.accountCode === cityCode) {
                target.push(parseFloat(element.indexVlue).toFixed(2));
            }
        }
    } else {
        for (let index = 0, len = dataArr.length; index < len; index++) {
            const element = dataArr[index];
            if (element.indexCode === encode) {
                target.push(parseFloat(element.indexVlue).toFixed(2));
            }
        }
    }

    return target;
}
// 根据-指标数组-和-编码数组-查出所有指标对应的所有编码值
function searchValsArr(encodes, codes, dataArr) {
    const target = [];
    for (let index = 0; index < encodes.length; index++) {
        const encode = encodes[index];
        const arr = [];
        for (let i = 0; i < codes.length; i++) {
            const ele = codes[i];
            for (let index = 0, len = dataArr.length; index < len; index++) {
                const element = dataArr[index];
                if (element.indexCode === encode && element.accountCode === ele) {
                    arr.push(parseFloat(element.indexVlue).toFixed(2));
                }
            }
        }

        target.push(arr);
    }
    return target;
}
// 根据-指标数组-和-编码数组-查出所有指标对应月份的所有编码值
function searchMonthValsArr(encodes, codes, month, dataArr) {
    const target = [];
    for (let index = 0; index < encodes.length; index++) {
        const encode = encodes[index];
        const arr = [];
        for (let i = 0; i < codes.length; i++) {
            const ele = codes[i];
            for (let index = 0, len = dataArr.length; index < len; index++) {
                const element = dataArr[index];
                if (element.indexCode === encode && element.accountCode === ele && element.bilMonth === month) {
                    arr.push(parseInt(element.indexVlue) ? parseInt(element.indexVlue) : 0);
                }
            }
        }

        target.push({ encode: encodes[index], dataArr: arr });
    }
    return target;
}
// 根据-指标数-和-编码数组-月份数组-查出所有指标对应指标的结果
function searchEncodeMonthsVals(encode, codes, months, dataArr) {
    const target = [];
    for (let index = 0; index < months.length; index++) {
        const month = months[index];
        const arr = [];
        for (let i = 0; i < codes.length; i++) {
            const ele = codes[i];
            for (let index = 0, len = dataArr.length; index < len; index++) {
                const element = dataArr[index];
                if (element.indexCode === encode && element.accountCode === ele && element.bilMonth === month) {
                    arr.push(parseInt(element.indexVlue) ? parseInt(element.indexVlue) : 0);
                }
            }
        }

        target.push({ type: encode, month: months[index], dataArr: arr });
    }
    return target;
}
// 根据-指标数组-和-编码-查出所有指标对应的所有编码值
function searchEncsArr(encodes, code, dataArr) {
    const target = [];
    for (let index = 0; index < encodes.length; index++) {
        const encode = encodes[index];
        for (let index = 0, len = dataArr.length; index < len; index++) {
            const element = dataArr[index];
            if (element.indexCode === encode && element.accountCode === code) {
                target.push(parseFloat(element.indexVlue).toFixed(2));
            }
        }
    }
    return target;
}
// 累加二维数组为一个数组，对应位置相加
function addDoubleArr(arr) {
    let a = [];
    arr.forEach((ele, index) => {
        if (index === 0) {
            a = ele;
        } else {
            for (let index = 0; index < ele.length; index++) {
                const element = ele[index];
                a[index] += element;
            }
        }
    });
    return a;
}
// 累加二维数组为一个数组，对应位置相加
function addDoubleArr2(arr) {
    let a = [];
    arr.forEach((ele, index) => {
        if (index === 0) {
            a = ele.map(e => parseFloat(e));
        } else {
            for (let index = 0; index < ele.length; index++) {
                const element = parseFloat(ele[index]);
                a[index] += element;
            }
        }
    });
    return a;
}
// 根据编码数组和cityCodes查出所有对应的值
function searchMapDataItem(code, encodes, arr, type) {
    let data = {};
    if (type === 'city') {
        data.name = jzMap.mapName[code];
    }
    if (type === 'country') {
        for (let index = 0; index < cityDataArr.length; index++) {
            const element = cityDataArr[index];
            element.subCityArr.forEach((ele) => {
                if (ele.cityCode === code) {
                    data.name = ele.cityName;
                }
            });
        }
    }
    for (let index = 0; index < encodes.length; index++) {
        const element = encodes[index];
        let key = index > 0 ? index : '';
        let val = searchVal(code, element, arr);
        data['value' + key] = val;
    }
    labelZoom.controlArr.includes(data.name) && (data.label = { show: false });
    return data;
}

function searchMapData(codes, encodes, arr, type) {
    const data = [];

    for (let index = 0; index < codes.length; index++) {
        const element = codes[index];
        let item = searchMapDataItem(element, encodes, arr, type);
        item && data.push(item);
    }
    return data;
}
// 节流函数简版
const throttle = (function() {
    var last = 0;
    return function(method, context, time) {
        var current = +new Date();
        if (current - last > time) {
            method.apply(context, arguments);
            last = current;
        }
    };
})();
// 散点图显示label修正函数
function controlScatterLabel(scatter) {
    const boxWidth = scatter.getWidth();
    const boxHeight = scatter.getHeight();
    const baseRect = Math.min(boxHeight, boxWidth);
}
// 地图缩放label显示修正函数
function controlMapLabel(map) {
    const boxWidth = map ? map.getWidth() : 0;
    const boxHeight = map ? map.getHeight() : 0;
    const baseRect = Math.min(boxWidth, boxHeight);
    // 地图缩放显示label控制130-850
    map.off('georoam');
    map.on('georoam', (data) => {
        if (!data['zoom']) {
            return;
        }

        throttle(co, null, 500);
    });

    function co() {
        const config = map.getOption();
        const sw = config.series[0].zoom * baseRect;
        let data2 = config.series[0].data;
        if (sw > 150 && sw < 700) {
            data2 = data2.map((ele) => {
                ele.label = {
                    show: !labelZoom.controlArr.includes(ele.name)
                };
                return ele;
            });
        }
        if (sw > 700) {
            data2 = data2.map((ele) => {
                if (labelZoom.controlArr.includes(ele.name)) {
                    ele.label = {
                        show: true
                    };
                }
                return ele;
            });
        }
        if (sw < 180) {
            data2 = data2.map((ele) => {
                ele.label = {
                    show: false
                };
                return ele;
            });
        }
        config.series[0].data = data2;
        map.setOption(config);
    }
}
// 算出当前日期之前的十二个月字符串
function getMonthsArr(date) {
    const monthArr = {
        xMonths: [],
        sMonths: []
    };
    const year = parseInt(date.substr(0, 4));
    const month = parseInt(date.substr(4, 2));
    if (month === 12) {
        for (let index = 1; index <= 12; index++) {
            index > 9 ? monthArr.sMonths.unshift(`${year}${index}`) : monthArr.sMonths.unshift(`${year}0${index}`);
            index > 9 ? monthArr.xMonths.unshift(`${year}/${index}`) : monthArr.xMonths.unshift(`${year}/0${index}`);
        }
        monthArr.sMonths.unshift(`${year - 1}12`);
        monthArr.xMonths.push(`${year - 1}/12`);
    } else {
        for (let index = month; index <= 12; index++) {
            index > 9 ? monthArr.sMonths.unshift(`${year - 1}${index}`) : monthArr.sMonths.unshift(`${year - 1}0${index}`);
            index > 9 ? monthArr.xMonths.unshift(`${year - 1}/${index}`) : monthArr.xMonths.unshift(`${year - 1}/0${index}`);
        }
        for (let index = 1; index <= month; index++) {
            index > 9 ? monthArr.sMonths.unshift(`${year}${index}`) : monthArr.sMonths.unshift(`${year}0${index}`);
            index > 9 ? monthArr.xMonths.unshift(`${year}/${index}`) : monthArr.xMonths.unshift(`${year}/0${index}`);
        }
    }
    monthArr.xMonths = monthArr.xMonths.reverse();
    monthArr.sMonths = monthArr.sMonths.reverse();
    return monthArr;
}
// 根据月份数组，编号数组和城市编号生成查询参数
function getMonthsParam(months, encodes, code) {
    let paramStr = '';
    for (let index = 0; index < months.length; index++) {
        const date = months[index];
        for (let index = 0, len = encodes.length; index < len; index++) {
            paramStr += `[${date},${code},${encodes[index]}],`;
        }
    }
    paramStr = paramStr.substring(0, paramStr.length - 1);
    return paramStr;
}
// 根据多个有对应关系的数组，组合对某个值排序之后导出排序顺序后的数组
// 根据多个有对应关系的数组，组合对某个值排序之后导出排序顺序后的数组
function getSortMapArr(type, basic, ...rest) {
    const result = [];
    const arr = [];
    const len = rest.length;
    for (let i = 0, length = basic.length; i < length; i++) {
        const temp = {};
        temp['arr0'] = basic[i];
        for (let k = 0; k < len; k++) {
            temp['arr' + (k + 1)] = rest[k][i];
        }
        arr.push(temp);
    }
    const sortArr = arr.sort((a, b) => {
        return type === 'drop' ? (parseFloat(b['arr0']) - parseFloat(a['arr0'])) : (parseFloat(a['arr0']) - parseFloat(b['arr0']));
    });
    for (let i = 0; i < len + 1; i++) {
        let subResultArr = sortArr.map(ele => ele['arr' + i]);
        result.push(subResultArr);
    }
    return result;
}
// 千分号显示的数据
function formatNumberRgx(num) {
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}
// 根据区县编码查找名字查找编码
// function getCountryMapVal(param) {
//     cityDataArr.forEach(e)
// }
function generyRBData(arr, code) {
    let rb = {
        station: [],
        vehicle: [],
        energy: [],
        electric: []
    };
    for (let index = 0; index < arr.length; index++) {
        switch (arr[index].indexCode) {
        case 'NHDP0017':
            rb.station.push({ name: '局站数', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0018':
            rb.station.push({ name: 'A类', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0019':
            rb.station.push({ name: 'B类', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0020':
            rb.station.push({ name: 'C类', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0021':
            rb.station.push({ name: 'D类有机房', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0022':
            rb.station.push({ name: 'D类无机房', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0023':
            rb.vehicle.push({ name: '车辆数', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0024':
            rb.vehicle.push({ name: '管理', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0025':
            rb.vehicle.push({ name: '生产', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0026':
            rb.vehicle.push({ name: '应急', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0027':
            rb.energy.push({ name: '能耗对象数', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0028':
            rb.energy.push({ name: '通信机房', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0029':
            rb.energy.push({ name: 'IDC机房', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0030':
            rb.energy.push({ name: '无线基站', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0031':
            rb.energy.push({ name: '接入点', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0032':
            rb.energy.push({ name: '办公营销及其他', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0033':
            rb.electric.push({ name: '电表回路数', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0034':
            rb.electric.push({ name: '接口接入数量', val: parseInt(arr[index].indexVlue) });
            break;
        case 'NHDP0035':
            rb.electric.push({ name: '报账纳管数量', val: parseInt(arr[index].indexVlue) });
            break;
        }
    }
    return rb;
}
// function searchValArr(codes, encodes, dataArr){

// }
export {
    getProvinceParam,
    getCityParam,
    searchVal,
    searchValArr,
    searchEncsArr,
    searchValsArr,
    searchMonthValsArr,
    searchEncodeMonthsVals,
    generyRBData,
    getMonthsArr,
    getMonthsParam,
    searchMapData,
    controlMapLabel,
    addDoubleArr,
    addDoubleArr2,
    getSortMapArr,
    formatNumberRgx
};
