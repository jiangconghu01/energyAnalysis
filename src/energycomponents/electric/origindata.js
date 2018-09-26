import { provinceData } from '../cityMapCode.js';
// 电力-主页-省级&&点击地图进入市级别数据
const electricBasicPage = (() => {
    const arr = [
        'NHDP0036',
        'NHDP0037',
        'NHDP0038',
        'NHDP0039'
    ];
    for (let index = 52; index < 119; index++) {
        // 防止和countyEncodeArr 这个重复
        if (index === 62 || index === 63) {
            continue;
        }
        index > 99 ? arr.push(`NHDP0${index}`) : arr.push(`NHDP00${index}`);
    }
    return arr;
})();

// 电力-主页-各地市级数据（左中和下）&&点击地图进入各区县级数据
const cityEncodeArr = (() => {
    let arr = ['NHDP0036', 'NHDP0037', 'NHDP0043', 'NHDP0048'];
    for (let index = 52; index < 64; index++) {
        arr.push(`NHDP00${index}`);
    }
    return arr;
})();

// 电力-主页-各区县级请求数据
const countyEncodeArr = (() => {
    let arr = ['NHDP0036', 'NHDP0037', 'NHDP0043', 'NHDP0048'];
    for (let index = 52; index < 64; index++) {
        arr.push(`NHDP00${index}`);
    }
    return arr;
})();
// 电力详情页
const detailEncodeArr = (() => {
    let arr = ['NHDP0036', 'NHDP0037'];
    for (let index = 40; index < 52; index++) {
        arr.push(`NHDP00${index}`);
    }
    return arr;
})();
const detailEncodeArr2 = (() => {
    let arr = [];
    for (let index = 126; index < 138; index++) {
        arr.push(`NHDP0${index}`);
    }
    return arr;
})();
// 异常页面请求指标
const exceEncodeArr = (() => {
    let arr = [];
    for (let index = 113; index < 119; index++) {
        // 先屏蔽'合同电价异常'和单表电量异常
        if (index === 113 || index === 116) {
            continue;
        }
        arr.push(`NHDP0${index}`);
    }
    return arr;
})();
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

export {
    electricBasicPage,
    cityEncodeArr,
    cityCodeArr,
    cityNameArr,
    countyEncodeArr,
    getCountyCode,
    getCountyName,
    detailEncodeArr,
    detailEncodeArr2,
    exceEncodeArr,
    getCountyCodeOne
};
