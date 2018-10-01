const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
    // console.log(ctx.url);
    if (ctx.url === '/' && ctx.method === 'GET') {
        // 当GET请求时候返回表单页面
        let html = `
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <h1>koa2 request post method</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `;
        ctx.body = html;
    } else if (/.*getTopNAmmeterName.do.*/.test(ctx.url) && ctx.method === 'GET') {
        let request = ctx.request;
        const p = request.query.flag;
        let res = '';
        if (p === 'tymc') {
            res = '[{"name":"杭州武林","code":"6010017331","city":"A3301"},{"name":"杭州庆春","code":"6010398390","city":"A3301"},{"name":"萧山梅花","code":"1315013840","city":"A3301"},{"name":"余杭临平","code":"6110216011","city":"A3301"},{"name":"富阳桂花","code":"6611003440","city":"A3301"},{"name":"临安广场","code":"6310906498","city":"A3301"},{"name":"宁波和义","code":"5001800483","city":"A3302"},{"name":"奉化中心","code":"5611100181","city":"A3302"},{"name":"象山中心","code":"4106100650","city":"A3302"},{"name":"宁海中山","code":"5510951480","city":"A3302"},{"name":"余姚中心","code":"1090203678","city":"A3302"},{"name":"慈溪担山","code":"QNB-Q70000093","city":"A3302"},{"name":"温州南站","code":"3902137331","city":"A3303"},{"name":"瑞安万松","code":"2210211718","city":"A3303"},{"name":"乐清清远","code":"5810602679","city":"A3303"},{"name":"苍南灵溪","code":"1821012542","city":"A3303"},{"name":"永嘉中心","code":"2153191410","city":"A3303"},{"name":"平阳解放","code":"5711100029","city":"A3303"},{"name":"泰顺罗阳","code":"3846020383","city":"A3303"},{"name":"嘉兴中山","code":"1611102037","city":"A3304"},{"name":"平湖建北","code":"3211000097","city":"A3304"},{"name":"海宁文宗","code":"3011014061","city":"A3304"},{"name":"桐乡振中","code":"3001032096","city":"A3304"},{"name":"湖州苕溪","code":"Q0101001","city":"A3305"},{"name":"南浔适园","code":"3360012951","city":"A3305"},{"name":"德清武康","code":"3613107565","city":"A3305"},{"name":"安吉中心","code":"3711204454","city":"A3305"},{"name":"绍兴东街","code":"1701012746","city":"A3306"},{"name":"诸暨城广","code":"1761096370","city":"A3306"},{"name":"上虞解放","code":"1711062664","city":"A3306"},{"name":"金华后街","code":"8210901628","city":"A3307"},{"name":"浦江人东","code":"8830002952","city":"A3307"},{"name":"兰溪城西","code":"8910019546","city":"A3307"},{"name":"永康江南","code":"4312190222","city":"A3307"},{"name":"衢州西安","code":"7618047295","city":"A3308"},{"name":"龙游太平","code":"7801102034","city":"A3308"},{"name":"江山城中","code":"7716250023","city":"A3308"},{"name":"丽水府前","code":"9011039118","city":"A3309"},{"name":"遂昌中心","code":"9141291490","city":"A3309"},{"name":"龙泉中心","code":"9611136002","city":"A3309"},{"name":"庆元中心","code":"9301210176","city":"A3309"},{"name":"台州轮渡","code":"6711105220","city":"A3310"},{"name":"黄岩劳动","code":"6811210507","city":"A3310"},{"name":"路桥邮电","code":"7010001838","city":"A3310"},{"name":"临海巾山","code":"7101080041","city":"A3310"},{"name":"玉环中心","code":"6910054004","city":"A3310"},{"name":"舟山人民","code":"4612088850","city":"A3311"},{"name":"普陀沈家","code":"4716031267","city":"A3311"}]';
        }
        if (p === 'jz') {
            res = '[{"name":"杭州武林","code":"6010017331","city":"A3301"},{"name":"杭州二枢","code":"6010837706","city":"A3301"},{"name":"杭州景芳","code":"6010015508","city":"A3301"},{"name":"杭州西湖","code":"6010017141","city":"A3301"},{"name":"杭州文一","code":"6010148614","city":"A3301"},{"name":"杭州惠兴","code":"6010017278","city":"A3301"},{"name":"杭州东新","code":"6010459258","city":"A3301"},{"name":"杭州江城","code":"6010015095","city":"A3301"},{"name":"杭州留下","code":"6010072679","city":"A3301"},{"name":"萧山梅花","code":"1315013840","city":"A3301"},{"name":"宁波解北","code":"5001269212","city":"A3302"},{"name":"宁波鄞中","code":"5310300437","city":"A3302"},{"name":"鄞州邱隘","code":"5310008240","city":"A3302"},{"name":"北仑新碶","code":"5115559442","city":"A3302"},{"name":"镇海西门","code":"5212000254","city":"A3302"},{"name":"慈溪担山","code":"5412003045","city":"A3302"},{"name":"象山丹城","code":"4106100650","city":"A3302"},{"name":"奉化电信","code":"5611100181","city":"A3302"},{"name":"宁海城北","code":"5510951480","city":"A3302"},{"name":"余姚舜北","code":"1090203678","city":"A3302"},{"name":"温州南站","code":"3902137331","city":"A3303"},{"name":"温州洪殿","code":"3901164329","city":"A3303"},{"name":"温州数码","code":"3901198713","city":"A3303"},{"name":"温州信河","code":"3901164029","city":"A3303"},{"name":"瑞安安阳","code":"2290000713","city":"A3303"},{"name":"瑞安万松","code":"2210211718","city":"A3303"},{"name":"平阳昆阳","code":"5711100029","city":"A3303"},{"name":"乐清城关","code":"5810000052","city":"A3303"},{"name":"乐清电信","code":"5810602679","city":"A3303"},{"name":"苍南灵溪","code":"1821012542","city":"A3303"},{"name":"嘉兴清河","code":"1511138392","city":"A3304"},{"name":"嘉兴中山","code":"1611102037","city":"A3304"},{"name":"海宁城西","code":"3011014061","city":"A3304"},{"name":"海盐六一","code":"3021013253","city":"A3304"},{"name":"平湖五〇","code":"3211000097","city":"A3304"},{"name":"桐乡八〇","code":"3001000589","city":"A3304"},{"name":"嘉善四〇","code":"4510102725","city":"A3304"},{"name":"湖州红旗","code":"3315221028","city":"A3305"},{"name":"湖州凤凰","code":"3315259835","city":"A3305"},{"name":"湖州环诸","code":"3315264316","city":"A3305"},{"name":"湖州南浔","code":"3314300978","city":"A3305"},{"name":"长兴雉城","code":"3514243203","city":"A3305"},{"name":"安吉递铺","code":"3711204454","city":"A3305"},{"name":"德清武康","code":"3613107565","city":"A3305"},{"name":"绍兴东街","code":"1701012746","city":"A3306"},{"name":"绍兴城东","code":"1701034615","city":"A3306"},{"name":"诸暨城中","code":"1761018631","city":"A3306"},{"name":"上虞百官","code":"1711063072","city":"A3306"},{"name":"嵊州城中","code":"1731408783","city":"A3306"},{"name":"新昌横街","code":"1721010054","city":"A3306"},{"name":"金华城中","code":"8210901628","city":"A3307"},{"name":"金华城南","code":"8214241382","city":"A3307"},{"name":"金华秋滨","code":"8214273897","city":"A3307"},{"name":"义乌宾王","code":"4441200545","city":"A3307"},{"name":"兰溪城西","code":"8910019546","city":"A3307"},{"name":"永康江南","code":"4312190222","city":"A3307"},{"name":"衢州新楼","code":"7618047295","city":"A3308"},{"name":"衢州南街","code":"7611102037","city":"A3308"},{"name":"龙游县局","code":"7801102034","city":"A3308"},{"name":"常山县局","code":"8020018214","city":"A3308"},{"name":"江山城中","code":"7716250023","city":"A3308"},{"name":"丽水城东","code":"9010110536","city":"A3309"},{"name":"丽水城中","code":"9010178070","city":"A3309"},{"name":"缙云中心","code":"9412000016","city":"A3309"},{"name":"遂昌中心","code":"9141291490","city":"A3309"},{"name":"龙泉中心","code":"9611136002","city":"A3309"},{"name":"台州枢纽","code":"6712117852","city":"A3310"},{"name":"台州轮渡","code":"6711105220","city":"A3310"},{"name":"台州城南","code":"6711111525","city":"A3310"},{"name":"温岭三星","code":"6851020029","city":"A3310"},{"name":"路桥老局","code":"7010001838","city":"A3310"},{"name":"临海巾山","code":"7100011642","city":"A3310"},{"name":"温岭横街","code":"6851002198","city":"A3310"},{"name":"舟山南珍","code":"4611037680","city":"A3311"},{"name":"舟山城东","code":"4612017946","city":"A3311"},{"name":"普陀沈家","code":"4716031267","city":"A3311"},{"name":"嵊泗枢纽","code":"4919000035","city":"A3311"},{"name":"岱山大楼","code":"4813800235","city":"A3311"}]';
        }
        if (p === 'bgdl') {
            res = '[{"name":"浙江元华","code":"6010600475","city":"A3300"},{"name":"杭州电信","code":"6010837706","city":"A3301"},{"name":"杭州东新","code":"6010459258","city":"A3301"},{"name":"杭州景芳","code":"6010015508","city":"A3301"},{"name":"萧山市北","code":"1315073455","city":"A3301"},{"name":"桐庐综合","code":"3168109763","city":"A3301"},{"name":"宁波电信","code":"5001800483","city":"A3302"},{"name":"宁波鄞中","code":"5310300437","city":"A3302"},{"name":"镇海西门","code":"5212000254","city":"A3302"},{"name":"宁海城北","code":"5510951480","city":"A3302"},{"name":"象山综合","code":"4106100650","city":"A3302"},{"name":"奉化电信","code":"5611100181","city":"A3302"},{"name":"温州电信","code":"3902137331","city":"A3303"},{"name":"泰顺综合","code":"3846020404","city":"A3303"},{"name":"平阳城西","code":"5711100038","city":"A3303"},{"name":"苍南城东","code":"1821012542","city":"A3303"},{"name":"洞头新城","code":"4024000081","city":"A3303"},{"name":"瑞安安阳","code":"2290000713","city":"A3303"},{"name":"乐清清远","code":"5810602679","city":"A3303"},{"name":"嘉兴电信","code":"1611102037","city":"A3304"},{"name":"桐乡综合","code":"3001032096","city":"A3304"},{"name":"海盐城北","code":"3021013253","city":"A3304"},{"name":"嘉善电信","code":"4515005634","city":"A3304"},{"name":"海宁综合","code":"3011014061","city":"A3304"},{"name":"湖州电信","code":"3315221028","city":"A3305"},{"name":"德请英溪","code":"3613218106","city":"A3305"},{"name":"安吉综合","code":"3711204454","city":"A3305"},{"name":"绍兴电信","code":"1701012746","city":"A3306"},{"name":"上虞综合","code":"1711062664","city":"A3306"},{"name":"新昌综合","code":"1721032280","city":"A3306"},{"name":"嵊州综合","code":"1731100819","city":"A3306"},{"name":"金华电信","code":"8210901628","city":"A3307"},{"name":"兰溪综合","code":"8910019546","city":"A3307"},{"name":"义乌通发","code":"4441200545","city":"A3307"},{"name":"永康电信","code":"4312190094","city":"A3307"},{"name":"衢州电信","code":"7618047295","city":"A3308"},{"name":"江山城北","code":"7710005496","city":"A3308"},{"name":"丽水电信","code":"9010110536","city":"A3309"},{"name":"缙云新区","code":"9412000016","city":"A3309"},{"name":"青田水南","code":"9701009590","city":"A3309"},{"name":"台州电信","code":"6712117852","city":"A3310"},{"name":"临海办公","code":"7101080041","city":"A3310"},{"name":"天台电信","code":"7311200976","city":"A3310"},{"name":"玉环城南","code":"6910002274","city":"A3310"},{"name":"温岭三星","code":"6851020029","city":"A3310"},{"name":"路桥松塘","code":"7010005683","city":"A3310"},{"name":"舟山电信","code":"4612088850","city":"A3311"},{"name":"普陀综合","code":"4716031267","city":"A3311"},{"name":"岱山综合","code":"4813800235","city":"A3311"}]';
        }
        ctx.body = res;
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        // 当POST请求的时候，解析POST表单里的数据，并显示出来
        let postData = await parsePostData(ctx);
        ctx.body = postData;
    } else if (ctx.url === '/czxt/pages/wjhx/getIdWjhxParm.do' && ctx.method === 'POST') {
        let postData = await new Promise((resolve, reject) => {
            try {
                let postdata = '';
                ctx.req.addListener('data', (data) => {
                    postdata += data;
                });
                ctx.req.addListener('end', () => {
                    postdata = JSON.parse(postdata);
                    let parseData = getCZXTData(postdata['paramArrs']);
                    // console.log(parseData);
                    resolve(parseData);
                });
            } catch (error) {
                reject(error);
            }
        });
        ctx.body = postData;
    } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
    }
});

// '[201803,A33,NHDP0001],[201803,A33,NHDP0002]'
// '[{"accountCode":"A33","bilMonth":"201803","indexVlue":"58888","indexCode":"NHDP0001"},{"accountCode":"A33","bilMonth":"201803","indexVlue":"9786","indexCode":"NHDP0002"}]';
const persentage = ['NHDP0011', 'NHDP0012', 'NHDP0015', 'NHDP0016', 'NHDP0038', 'NHDP0039'];
const point = ['NHDP0062', 'NHDP0063'];
const negative = ['NHDP0007', 'NHDP0008'];
const juzhanshu = ['NHDP0018', 'NHDP0019', 'NHDP0020', 'NHDP0021', 'NHDP0022'];
const topm = ['NHTOPN0002', 'NHTOPN0003', 'NHTOPN0008', 'NHTOPN0009', 'NHTOPN0015', 'NHTOPN0016'];
const topl = ['NHTOPN0001', 'NHTOPN0007', 'NHTOPN0014'];

function getCZXTData(reqStr) {
    let str = '';
    let reqArr = reqStr.split('],[');
    reqArr[0] = reqArr[0].substring(1);
    let last = reqArr[reqArr.length - 1];
    reqArr[reqArr.length - 1] = last.substring(0, last.length - 1);
    reqArr = reqArr.map(function(ele) {
        return ele.split(',');
    });
    reqArr = reqArr.map(function(ele) {
        if (persentage.includes(ele[2])) {
            return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${(Math.random() + 0.1).toFixed(2)}","indexCode":"${ele[2]}"}`;
            // return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${(Math.random() - 0.4).toFixed(5)}","indexCode":"${ele[2]}"}`;
        } else if (point.includes(ele[2])) {
            return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${(Math.random() + 0.1 + Math.random() * 10).toFixed(5)}","indexCode":"${ele[2]}"}`;
        } else if (negative.includes(ele[2])) {
            // return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${-(Math.random() * 5000) + 10}","indexCode":"${ele[2]}"}`;
            return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${(Math.random() * 5000) + 10}","indexCode":"${ele[2]}"}`;
        } else if (topm.includes(ele[2])) {
            // return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${-(Math.random() * 5000) + 10}","indexCode":"${ele[2]}"}`;
            return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${(Math.random() * 4) - 1.2}","indexCode":"${ele[2]}"}`;
        } else if (topl.includes(ele[2])) {
            switch (ele[2]) {
            case 'NHTOPN0001':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${(Math.random() * 4)}","indexCode":"${ele[2]}"}`;
            case 'NHTOPN0007':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${Math.random() * 700}","indexCode":"${ele[2]}"}`;
            case 'NHTOPN0014':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${Math.random() * 16}","indexCode":"${ele[2]}"}`;
            }
        } else if (juzhanshu.includes(ele[2])) {
            switch (ele[2]) {
            case 'NHDP0018':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"0","indexCode":"${ele[2]}"}`;
            case 'NHDP0019':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"140","indexCode":"${ele[2]}"}`;
            case 'NHDP0020':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"0","indexCode":"${ele[2]}"}`;
            case 'NHDP0021':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"0","indexCode":"${ele[2]}"}`;
            case 'NHDP0022':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"13212","indexCode":"${ele[2]}"}`;
            }
        } else {
            return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${Math.random() * 5000 + 100}","indexCode":"${ele[2]}"}`;
            // return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"${0}","indexCode":"${ele[2]}"}`;
        }
    });
    let length = reqArr.length;
    reqArr.forEach((element, index) => {
        index === length - 1 ? (str += (element)) : (str += (element + ','));
    });
    str = `[${str}]`;
    return str;
}

// 解析上下文里node原生请求的POST参数
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = '';
            ctx.req.addListener('data', (data) => {
                postdata += data;
            });
            ctx.req.addListener('end', function() {
                let parseData = parseQueryStr(postdata);
                resolve(parseData);
            });
        } catch (err) {
            reject(err);
        }
    });
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=');
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData;
}

app.listen(3000, () => {
    console.log('[demo] request post is starting at port 3000');
});
