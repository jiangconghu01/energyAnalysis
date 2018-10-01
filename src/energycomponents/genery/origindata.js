import { provinceData } from '../cityMapCode.js';
import { getCityParam } from '../dataUtil.js';
// 总览-总体情况-省级数据&&市级数据
const generyAllProvince = (() => {
    const arr = [
        'NHDP0001',
        'NHDP0002',
        'NHDP0003',
        'NHDP0004',
        'NHDP0005',
        'NHDP0006',
        'NHDP0007',
        'NHDP0008',
        'NHDP0011', // 大网综合指导值
        'NHDP0012', // 大网综合预警值
        'NHDP0124',
        'NHDP0125'
    ];
    for (let index = 17; index < 36; index++) {
        arr.push(`NHDP00${index}`);
    }
    return arr;
})();

// 总览-总体情况-各地市级数据
const cityEncodeArr = ['NHDP0005', 'NHDP0006', 'NHDP0009', 'NHDP0010', 'NHDP0013', 'NHDP0014', 'NHDP0015', 'NHDP0016'];
const cityCodeArr = getCityCode(provinceData);
const cityNameArr = getCityName(provinceData);

function getCityCode(provinceData) {
    const cityCodeArr = [];
    const arr = provinceData.subCityArr;
    for (let index = 0; index < arr.length; index++) {
        cityCodeArr.push(arr[index].cityCode);
    }
    return cityCodeArr;
}

function getCityName(provinceData) {
    const cityNameArr = [];
    const arr = provinceData.subCityArr;
    for (let index = 0; index < arr.length; index++) {
        cityNameArr.push(arr[index].cityName);
    }
    return cityNameArr;
}
// 总览-总体情况-各区县级请求数据
const countyEncodeArr = ['NHDP0005', 'NHDP0006', 'NHDP0009', 'NHDP0010', 'NHDP0013', 'NHDP0014', 'NHDP0015', 'NHDP0016'];
// const countyCodeArr = getCountyCode(cityDataArr, '');
// const countyNameArr = getCountyName(cityDataArr, '');
function getCountyCode(cityDataArr, cityCode) {
    const countyCodeArr = [];
    let targetCity = {};
    cityDataArr.forEach(element => {
        if (element.cityCode === cityCode) {
            targetCity = element;
        }
    });
    let arr = targetCity.subCityArr;
    for (let index = 0; index < arr.length; index++) {
        countyCodeArr.push(arr[index].cityCode);
    }
    return countyCodeArr;
}

function getCountyName(cityDataArr, cityCode) {
    const countyNameArr = [];
    let targetCity = {};
    cityDataArr.forEach(element => {
        if (element.cityCode === cityCode) {
            targetCity = element;
        }
    });
    let arr = targetCity.subCityArr;
    for (let index = 0; index < arr.length; index++) {
        countyNameArr.push(arr[index].cityName);
    }
    return countyNameArr;
}

function getCountyCodeOne(cityDataArr, cityName) {
    // const countyCodeArr = [];
    let a = '';
    for (let i = 0; i < cityDataArr.length; i++) {
        let sub = cityDataArr[i].subCityArr;
        for (let index = 0; index < sub.length; index++) {
            const element = sub[index];
            if (element.cityName === cityName) {
                // countyCodeArr.push(element.cityCode);
                a = element.cityCode;
            }
        }
    }
    return a;
}
// top系列参数获取
// [y,x,bar]
function getTopParams(type, codes, date) {
    let encodes = [];
    if (type === 'bgdl') {
        encodes = ['NHTOPN0007', 'NHTOPN0008', 'NHTOPN0009'];
    }
    if (type === 'tymc') {
        encodes = ['NHTOPN0014', 'NHTOPN0015', 'NHTOPN0016'];
    }
    if (type === 'jz') {
        encodes = ['NHTOPN0001', 'NHTOPN0002', 'NHTOPN0003'];
    }
    return getCityParam(date, codes, encodes);
}
export {
    generyAllProvince,
    cityEncodeArr,
    cityCodeArr,
    cityNameArr,
    countyEncodeArr,
    getCountyCode,
    getCountyName,
    getCountyCodeOne,
    getTopParams
};
