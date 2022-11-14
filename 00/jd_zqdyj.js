/*
双十一终极红包
不会用加群：212796668、681030097
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#双十一终极红包
55 21 * * * https://github.com/JDWXX/jd_job.git, tag=双十一终极红包, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "55 21 * * *" script-path=https://github.com/JDWXX/jd_job.git,tag=双十一终极红包
===================================Surge================================
双十一终极红包 = type=cron,cronexp="55 21 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_job.git
====================================小火箭=============================
双十一终极红包 = type=cron,script-path=https://github.com/JDWXX/jd_job.git, cronexpr="55 21 * * *", timeout=3600, enable=true
 */
const $ = new Env('双十一终极红包');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const fetch = require('node-fetch')
let cookiesArr = [], cookie = '', message;

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function sleep(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            console.log("===========【双十一终极红包】==============")
            try {
                await fetch("https://api.m.jd.com/api?functionId=getCoupons&appid=u&_=1668083863094&loginType=2&body=%7B%22platform%22%3A4%2C%22unionActId%22%3A%2231149%22%2C%22actId%22%3A%222GdKXzvywVytLvcJTk2K3pLtDEHq%22%2C%22d%22%3A%224MkxnUU%22%2C%22unionShareId%22%3A%22%22%2C%22type%22%3A3%2C%22eid%22%3A%22O6Y6FVOJ2WDGFMKTXPRRC224YT22TMRRU2L43W2XLR66FRFRQX2VAQT7XBVFGSAQ54OXK2XTLZ2ZZZUWRRA6IAELJ4%22%7D&client=Linux%20armv8l&clientVersion=&osVersion=AndroidOS&screen=412*915&d_brand=UnknownTablet&d_model=UnknownTablet&lang=zh-CN&sdkVersion=&openudid=&h5st=20221110203743856%3B8568006574529136%3B6a98d%3Btk02wa85a1b4018nBihehNZw8Ntgr5S9XjtBNsFhmZNNlQ6SXr2SIXA870iUyeH%2BsHZWNLWgDeBFa44n4z984BzI4vK5%3B0f971fe7651ac8a7072660baca5ffb3961120ab6b2ac9ecb9860600eb518c449%3B3.1%3B1668083863856%3B62f4d401ae05799f14989d31956d3c5f95ac49dc790ae47c6db5defda570eaab887e11b88d4e7582a29aa1f940982225df6b8b24a83a6866387d021e397a392dbd4eb906a74158857082f94a95dae20db9d20c9c29f88caaf60c6c9f3d2acd030ad610dfd718c3f3d22f5dc236f4d06c4b02d926d142f056f2901f25b3aa6eb4e77d0301f03f9d6579c3aec51321862f", {
                    "headers": {
                        "Host": "api.m.jd.com",
                        "Connection": "keep-alive",
                        "User-Agent": "jdapp;android;10.3.0;;;appBuild/91795;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1668083827429%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJS%3D%22%2C%22ad%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%2C%22od%22%3A%22CNZrZNPvYtc4DWS1DQOzDm%3D%3D%22%2C%22ov%22%3A%22CzO%3D%22%2C%22ud%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 12; M2102K1AC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36",
                        "Accept": "*/*",
                        "Origin": "https://prodev.m.jd.com",
                        "X-Requested-With": "com.jingdong.app.mall",
                        "Sec-Fetch-Site": "same-site",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": "https://prodev.m.jd.com/mall/active/2GdKXzvywVytLvcJTk2K3pLtDEHq/index.html?unionActId=31149&uabt=169_709_1&d=4MkxnUU&s=&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2011692802_&utm_term=b39dca68314046058c2dc215fb5134ee&tttparams=M6zKDVneyJnTGF0IjoiMzAuMzMyNzUwMDE2ODA2MDEiLCJnTG5nIjoiMTIwLjE3ODc0MDE3OTc5NTExIiwiZ3BzX2FyZWEiOiIxNV8xMjEzXzM0MTBfNzE3MjAiLCJsYXQiOjMwLjMzMzA5OSwibG5nIjoxMjAuMTc5MTE1LCJtb2RlbCI6Ik1pIDExIFBybyIsInByc3RhdGUiOiIwIiwidW5fYXJlYSI6IjE1XzEyMTNfMzQxMF83MTcyMC7J9",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                        "Cookie": cookie,
                    },
                    "method": "GET"
                }).then(res => res.json())
                    .then(json => {
                        console.log(json)
                    });
            }catch (e){

            }
            await sleep(2000)

            console.log("===========【开超市盲盒】==============")
            for (let j = 0; j < 4; j++) {
                try {
                    await fetch("https://api.m.jd.com/?functionId=starShopDraw&body={%22linkId%22:%22qHqXOx2bvqgFOzTH_-iJoQ%22}&appid=activities_platform&t=1668084057218&client=android&clientVersion=11.1.0&h5st=20221110204057224%3B3371771546937091%3B568c6%3Btk02wc2b21c7b18nxd6urVP4gEjLdK91orbbgSkFgr34dGntnThaUOA91fmAxsTC%2BRmdlXW%2BiPV8Uljnwe7yWD9b4PQE%3B8985700b639c1fcf8006392be6ebf9a64a96ad505cff5b04d255cd7410a10304%3B3.1%3B1668084057224%3B62f4d401ae05799f14989d31956d3c5f95ac49dc790ae47c6db5defda570eaab887e11b88d4e7582a29aa1f940982225df6b8b24a83a6866387d021e397a392dbd4eb906a74158857082f94a95dae20d42e1085d91590dd12196966fa92ecdceec9682c734ccb4dc01e974fd82febf96939c9223665c3f92054163adb688b5510b9344ea7e7bd7fc3f7732ef13ad41a7&cthr=1&uuid=2316636666635383-5383661603831633&build=98139&screen=412*915&networkType=wifi&d_brand=Xiaomi&d_model=Mi%2011%20Pro&lang=zh_CN&osVersion=12&partner=xiaomi001&eid=eidAcb8881223dsaCf8nDyskQlSQJQcj6MAl4wn%2FKJA%2Fk1aY0hYKmfO21L8xBfLOHTMNBUhL9wu3DIlI9UpKrf3qaiC7Um7tp9WZegjn1%2FqmKoLxsVVw", {
                        "headers": {
                            "Host": "api.m.jd.com",
                            "Connection": "keep-alive",
                            "User-Agent": "jdapp;android;10.3.0;;;appBuild/91795;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1668083827429%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJS%3D%22%2C%22ad%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%2C%22od%22%3A%22CNZrZNPvYtc4DWS1DQOzDm%3D%3D%22%2C%22ov%22%3A%22CzO%3D%22%2C%22ud%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 12; M2102K1AC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36",
                            "Accept": "*/*",
                            "Origin": "https://prodev.m.jd.com",
                            "X-Requested-With": "com.jingdong.app.mall",
                            "Sec-Fetch-Site": "same-site",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://prodev.m.jd.com/mall/active/2GdKXzvywVytLvcJTk2K3pLtDEHq/index.html?unionActId=31149&uabt=169_709_1&d=4MkxnUU&s=&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2011692802_&utm_term=b39dca68314046058c2dc215fb5134ee&tttparams=M6zKDVneyJnTGF0IjoiMzAuMzMyNzUwMDE2ODA2MDEiLCJnTG5nIjoiMTIwLjE3ODc0MDE3OTc5NTExIiwiZ3BzX2FyZWEiOiIxNV8xMjEzXzM0MTBfNzE3MjAiLCJsYXQiOjMwLjMzMzA5OSwibG5nIjoxMjAuMTc5MTE1LCJtb2RlbCI6Ik1pIDExIFBybyIsInByc3RhdGUiOiIwIiwidW5fYXJlYSI6IjE1XzEyMTNfMzQxMF83MTcyMC7J9",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                            "Cookie": cookie,
                        },
                        "method": "GET"
                    }).then(res => res.json())
                        .then(json => {
                            console.log(json)
                        });
                }catch (e){

                }
            }
            await sleep(1100)
        }
    }


})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
async function reward(sid,taskId) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url, {
                "headers": {
                    "Host": "api.m.jd.com",
                    "Connection": "keep-alive",
                    "Accept": "application/json, text/plain, */*",
                    "User-Agent": "jdapp;android;11.1.0;;;appBuild/98139;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1667291801471%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJS%3D%22%2C%22ad%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%2C%22od%22%3A%22CNZrZNPvYtc4DWS1DQOzDm%3D%3D%22%2C%22ov%22%3A%22CzO%3D%22%2C%22ud%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 12; M2102K1AC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36",
                    "Origin": "https://prodev.m.jd.com",
                    "X-Requested-With": "com.jingdong.app.mall",
                    "Sec-Fetch-Site": "same-site",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Dest": "empty",
                    "Referer": "https://prodev.m.jd.com/",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Cookie": cookie,
                },
                "method": "GET"
            }).then(res => res.json())
                .then(json => {
                    console.log(json.msg)
                });
            resolve();
        }, 1500);
    });
}
async function cj(url,cookie) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url, {
                "headers": {
                    "Host": "api.m.jd.com",
                    "Connection": "keep-alive",
                    "Accept": "application/json, text/plain, */*",
                    "User-Agent": "jdapp;android;11.1.0;;;appBuild/98139;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1667291801471%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJS%3D%22%2C%22ad%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%2C%22od%22%3A%22CNZrZNPvYtc4DWS1DQOzDm%3D%3D%22%2C%22ov%22%3A%22CzO%3D%22%2C%22ud%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 12; M2102K1AC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36",
                    "Origin": "https://prodev.m.jd.com",
                    "X-Requested-With": "com.jingdong.app.mall",
                    "Sec-Fetch-Site": "same-site",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Dest": "empty",
                    "Referer": "https://prodev.m.jd.com/",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Cookie": cookie,
                },
                "method": "GET"
            }).then(res => res.json())
                .then(json => {
                    resolve(json);
                    // console.log(json)
                });
        }, 1500);
    });
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}