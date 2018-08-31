let y = `11.92514888
2.413444542
9.575761
-5.068710556
3.83117325
9.7875771
7.153925821
3.078513071
3.872589273
4.776738846
4.792475182
0
8.088147031
2.051008571
10.54266725
11.73738657
5.157233
2.671064222
0.239404714
0.371896842
0.079934533
2.992155538
1.407353455
0
0.23473125
3.070367923
6.605257125
9.412504882
0
0.27665375
1.237458636
10.71407369
0.741643308
0
6.5119828
2.375040067
16.18827625
4.8484282
2.170460125
0.6131395
3.608611
2.832564
6.2418804
3.431095125
3.819655222
1.3527284
-0.219161545
2.0963372
1.5387716
4.428662667`;
let tiany = y.split('\n').map((ele) => {
    return parseFloat(ele).toFixed(2);
});
let x = `-0.0133302
-1
-0.013661721
-1.442948541
0.232119874
0.075971983
-0.117258307
0.216016093
-0.498071028
-0.049510533
-0.68725185
0
-0.061790613
1.915951704
0.961762656
-0.090862822
1.167145315
-1.436530145
-0.170763122
-0.920793257
-0.987092617
-0.707434721
0.010435147
0
0.058586169
1.016063082
0.353438394
0.004107153
0
0.007272498
0.037126839
-0.02597946
0.043160168
0
-0.081603211
-0.126324311
-0.023937902
-0.054467902
0.137771422
0.11231635
0.034270125
-0.031313225
-0.283619606
-0.124579576
0.267282643
-0.145650167
0.034446256
-0.041886456
-0.017654624
0.052276721`;
let tianx = x.split('\n').map((ele) => {
    return parseFloat(ele).toFixed(4);
});
let tianbar =
    `-0.003504109
-1
0.00672265
-1.139425676
0.182291053
0.111222132
-0.012627368
0.297817555
-0.403818341
-0.025778874
-0.599205469
0
-0.124399023
1.067188415
0.79572759
-0.201379587
0.712743432
-1.5081087
-0.127777155
-0.659524114
-0.898632733
-0.539121562
0.041361501
0
0.102276557
0.456508918
0.316225457
0.011748744
0
0.006255865
0.062562426
0.009566485
0.130669109
0
-0.024993632
-0.088490185
0.015284931
-0.022153082
0.783549483
0.146035114
0.032847918
0.065912882
-0.276117552
-0.135625962
0.346880252
-0.117799728
0.027962665
-0.027181073
0.008807946
0.087360232`.split('\n').map((ele) => {
        return parseFloat(ele).toFixed(4);
    });
export { tianx, tiany, tianbar };

// [{ dt: '201801' }, { dt: '201809' }, { dt: '201803' }, { dt: '201805' }].sort((a, b) => {
//     return parseInt(a.dt) - parseInt(b.dt);
// });
const a = [8, 4, 5, 2, 9];
const b = [4, 6, 7, 8, 2];
const c = ['w', 't', 'e', 'u', 'k'];
//= >>>>
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

// 根据多个有对应关系的数组，组合对某个值排序之后导出排序顺序后的数组
function getSortMapArr2(type, basic) {
    const result = [];
    const arr = [];
    const len = arguments.length - 2;
    // console.log(arguments, [].slice.apply(arguments));
    for (let i = 0, length = basic.length; i < length; i++) {
        const temp = {};
        temp['arr0'] = basic[i];
        for (let k = 0; k < len; k++) {
            temp['arr' + (k + 1)] = arguments[k + 2][i];
        }
        arr.push(temp);
    }
    const sortArr = arr.sort(function(a, b) {
        return type === 'drop' ? (parseFloat(b['arr0']) - parseFloat(a['arr0'])) : (parseFloat(a['arr0']) - parseFloat(b['arr0']));
    });
    for (let i = 0; i < len + 1; i++) {
        let subResultArr = sortArr.map(ele => ele['arr' + i]);
        result.push(subResultArr);
    }
    return result;
}
const mapCode = {
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
    '股份研发': 'A3314'
};
function getvalkey(obj) {
    const t = {};
    for (let [key, value] of Object.entries(obj)) { // 翻转浙江个地市级编号和名称
        t[value] = key;
    }
    return t;
}
