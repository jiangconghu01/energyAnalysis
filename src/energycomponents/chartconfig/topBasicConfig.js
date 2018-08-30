//top50办公大楼
const topOffice =
    `浙江元华
    杭州电信
    杭州东新
    杭州景芳
    萧山市北
    桐庐综合
    宁波电信
    宁波鄞中
    镇海西门
    宁海城北
    象山综合
    奉化电信
    温州电信
    泰顺综合
    平阳城西
    苍南城东
    洞头新城
    瑞安安阳
    乐清清远
    嘉兴电信
    桐乡综合
    海盐城北
    嘉善电信
    海宁综合
    湖州电信
    德请英溪
    安吉综合
    绍兴电信
    上虞综合
    新昌综合
    嵊州综合
    金华电信
    兰溪综合
    武义综合
    义乌通发
    永康电信
    衢州电信
    江山城北
    丽水电信
    缙云新区
    青田水南
    台州电信
    临海办公
    天台电信
    玉环城南
    温岭三星
    路桥松塘
    舟山电信
    普陀综合
    岱山综合`.split('\n');
const officeBasicNum = 1001;
const officeMap = {
        '省公司': 1,
        '杭州市': 5,
        '宁波市': 6,
        '温州市': 7,
        '嘉兴市': 5,
        '湖州市': 3,
        '绍兴市': 4,
        '金华市': 5,
        '衢州市': 2,
        '丽水市': 3,
        '台州市': 6,
        '舟山市': 3
    }
    //top50天翼卖场
const topTianyi =
    `杭州武林
    杭州庆春
    萧山梅花
    余杭临平
    富阳桂花
    临安广场
    宁波和义
    奉化中心
    象山中心
    宁海中山
    余姚中心
    慈溪担山
    温州南站
    瑞安万松
    乐清清远
    苍南灵溪
    永嘉中心
    平阳解放
    泰顺罗阳
    嘉兴中山
    平湖建北
    海宁文宗
    桐乡振中
    湖州苕溪
    南浔适园
    德清武康
    安吉中心
    绍兴东街
    绍兴柯桥
    诸暨城广
    上虞解放
    金华后街
    浦江人东
    义乌绣湖
    兰溪城西
    永康江南
    衢州西安
    龙游太平
    江山城中
    丽水府前
    遂昌中心
    龙泉中心
    庆元中心
    台州轮渡
    黄岩劳动
    路桥邮电
    临海巾山
    玉环中心
    舟山人民
    普陀沈家`.split('\n');
const tianyiBasicNum = 2001;
const tianyiMap = {
    '杭州市': 6,
    '宁波市': 6,
    '温州市': 7,
    '嘉兴市': 4,
    '湖州市': 4,
    '绍兴市': 4,
    '金华市': 5,
    '衢州市': 3,
    '丽水市': 4,
    '台州市': 5,
    '舟山市': 2
}

//top80通信局站
const topCommunication =
    `杭州武林
    杭州二枢
    杭州景芳
    杭州西湖
    杭州文一
    杭州惠兴
    杭州东新
    杭州江城
    杭州留下
    萧山梅花
    宁波解北
    宁波鄞中
    鄞州邱隘
    北仑新碶
    镇海西门
    慈溪担山
    象山丹城
    奉化电信
    宁海城北
    余姚舜北
    温州南站
    温州洪殿
    温州数码
    温州信河
    瑞安安阳
    瑞安万松
    平阳昆阳
    乐清城关
    乐清电信
    苍南灵溪
    嘉兴清河
    嘉兴中山
    海宁城西
    海盐六一
    平湖五〇
    桐乡八〇
    嘉善四〇
    湖州红旗
    湖州凤凰
    湖州环诸
    湖州南浔
    长兴雉城
    安吉递铺
    德清武康
    绍兴东街
    绍兴城东
    绍兴柯桥
    诸暨城中
    上虞百官
    嵊州城中
    新昌横街
    金华城中
    金华城南
    金华秋滨
    义乌宾王
    兰溪城西
    永康江南
    武义城东
    衢州新楼
    衢州南街
    龙游县局
    常山县局
    江山城中
    丽水城东
    丽水城中
    缙云中心
    遂昌中心
    龙泉中心
    台州枢纽
    台州轮渡
    台州城南
    温岭三星
    路桥老局
    临海巾山
    温岭横街
    舟山南珍
    舟山城东
    普陀沈家
    嵊泗枢纽
    岱山大楼`.split('\n');
const communicationBasicNum = 3001;
const communicationMap = {
    '杭州市': 10,
    '宁波市': 10,
    '温州市': 10,
    '嘉兴市': 7,
    '湖州市': 7,
    '绍兴市': 7,
    '金华市': 7,
    '衢州市': 5,
    '丽水市': 5,
    '台州市': 7,
    '舟山市': 5
}
export {
    topOffice,
    officeBasicNum,
    officeMap,
    topTianyi,
    tianyiBasicNum,
    tianyiMap,
    topCommunication,
    communicationBasicNum,
    communicationMap
}
// const topOffice = [{
//         cityName: '省公司',
//         sub: [{
//             name: '元华电信',
//             code: '1001'
//         }]

//     },
//     {
//         cityName: '杭州',
//         sub: [{
//                 name: '杭州电信',
//                 code: '1002'
//             },
//             {
//                 name: '杭州东新',
//                 code: '1003'
//             },
//             {
//                 name: '杭州景芳',
//                 code: '1004'
//             },
//             {
//                 name: '萧山市北',
//                 code: '1005'
//             },
//             {
//                 name: '桐庐综合',
//                 code: '1006'
//             }
//         ]
//     },
//     {
//         cityName: '宁波',
//         sub: [{
//                 name: '宁波电信',
//                 code: '1007'
//             },
//             {
//                 name: '宁波鄞中',
//                 code: '1008'
//             },
//             {
//                 name: '镇海西门',
//                 code: '1009'
//             },
//             {
//                 name: '宁海城北',
//                 code: '1010'
//             },
//             {
//                 name: '象山综合',
//                 code: '1011'
//             },
//             {
//                 name: '奉化电信',
//                 code: '1012'
//             }
//         ]
//     },
//     {
//         cityName: '温州',
//         sub: [{
//                 name: '温州电信',
//                 code: '1013'
//             },
//             {
//                 name: '泰顺综合',
//                 code: '1014'
//             },
//             {
//                 name: '平阳城西',
//                 code: '1015'
//             },
//             {
//                 name: '苍南城东',
//                 code: '1016'
//             },
//             {
//                 name: '洞头新城',
//                 code: '1017'
//             },
//             {
//                 name: '瑞安安阳',
//                 code: '1018'
//             },
//             {
//                 name: '乐清清远',
//                 code: '1019'
//             },
//         ]
//     },
//     {
//         cityName: '嘉兴',
//         sub: [{
//                 name: '嘉兴电信',
//                 code: '1020'
//             },
//             {
//                 name: '桐乡综合',
//                 code: '1021'
//             },
//             {
//                 name: '海盐城北',
//                 code: '1022'
//             },
//             {
//                 name: '嘉善电信',
//                 code: '1023'
//             },
//             {
//                 name: '海宁综合',
//                 code: '1024'
//             }
//         ]
//     },
// ]