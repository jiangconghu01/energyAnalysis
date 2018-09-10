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
            res = '[{"name":"浙江元华","code":"6010600475"},{"name":"杭州电信","code":"6010837706"},{"name":"杭州东新","code":"6010459258"},{"name":"杭州景芳","code":"6010015508"},{"name":"萧山市北","code":"1315073455"},{"name":"桐庐综合","code":"3168109763"},{"name":"宁波电信","code":"5001800483"},{"name":"宁波鄞中","code":"5310300437"},{"name":"镇海西门","code":"5212000254"},{"name":"宁海城北","code":"5510951480"},{"name":"象山综合","code":"4106100650"},{"name":"奉化电信","code":"5611100181"},{"name":"温州电信","code":"3902137331"},{"name":"泰顺综合","code":"3846020404"},{"name":"平阳城西","code":"5711100038"},{"name":"苍南城东","code":"1821012542"},{"name":"洞头新城","code":"4024000081"},{"name":"瑞安安阳","code":"2290000713"},{"name":"乐清清远","code":"5810602679"},{"name":"嘉兴电信","code":"1611102037"},{"name":"桐乡综合","code":"3001032096"},{"name":"海盐城北","code":"3021013253"},{"name":"嘉善电信","code":"4515005634"},{"name":"海宁综合","code":"3011014061"},{"name":"湖州电信","code":"3315221028"},{"name":"德请英溪","code":"3613218106"},{"name":"安吉综合","code":"3711204454"},{"name":"绍兴电信","code":"1701012746"},{"name":"上虞综合","code":"1711062664"},{"name":"新昌综合","code":"1721032280"},{"name":"嵊州综合","code":"1731100819"},{"name":"金华电信","code":"8210901628"},{"name":"兰溪综合","code":"8910019546"},{"name":"义乌通发","code":"4441200545"},{"name":"永康电信","code":"4312190094"},{"name":"衢州电信","code":"7618047295"},{"name":"江山城北","code":"7710005496"},{"name":"丽水电信","code":"9010110536"},{"name":"缙云新区","code":"9412000016"},{"name":"青田水南","code":"9701009590"},{"name":"台州电信","code":"6712117852"},{"name":"临海办公","code":"7101080041"},{"name":"天台电信","code":"7311200976"},{"name":"玉环城南","code":"6910002274"},{"name":"温岭三星","code":"6851020029"},{"name":"路桥松塘","code":"7010005683"},{"name":"舟山电信","code":"4612088850"},{"name":"普陀综合","code":"4716031267"},{"name":"岱山综合","code":"4813800235"}]';
        }
        if (p === 'jz') {

        }
        if (p === 'bgdl') {

        }
        console.log(res);
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
