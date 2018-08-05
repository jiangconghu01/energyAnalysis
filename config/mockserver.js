const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
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
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"17","indexCode":"${ele[2]}"}`;
            case 'NHDP0019':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"140","indexCode":"${ele[2]}"}`;
            case 'NHDP0020':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"299","indexCode":"${ele[2]}"}`;
            case 'NHDP0021':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"33567","indexCode":"${ele[2]}"}`;
            case 'NHDP0022':
                return `{"accountCode":"${ele[1]}","bilMonth":"${ele[0]}","indexVlue":"69234","indexCode":"${ele[2]}"}`;
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
    for (let [ index, queryStr ] of queryStrList.entries()) {
        let itemList = queryStr.split('=');
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1]);
    }
    return queryData;
}

app.listen(3000, () => {
    console.log('[demo] request post is starting at port 3000');
});
