/*
自定义变量
export opencard3="1eac1fedb6ed4badbe577e9c513162a8" //你的邀请码
入口 time 7.23
https://lzdz1-isv.isvjcloud.com/dingzhi/dz/openCard/activity/9010894?activityId=c927f967852843329c05464a053f290e&shareUuid=96e5f59a49fe4b2d9aba5ac132a49b79&adsource=null&shareuserid4minipg=u/cWHIy7/x3Ij+HjfbnnePkaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw&shopid=1000086749&lng=114.062522&lat=29.541495&sid=6e9bfee3838075a72533536815d8f3ew&un_area=4_48201_54794_0
*/
const $ = new Env('柠檬开卡3-7.23');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const randomCount = $.isNode() ? 20 : 5;
const notify = $.isNode() ? require('./sendNotify') : '';
let merge = {}
let codeList = []
Exchange = $.isNode() ? (process.env.Cowexchange ? process.env.Cowexchange : false) : ($.getdata("Cowexchange") ? $.getdata("Cowexchange") : false);
//IOS等用户直接用NobyDa的jd cookie
let opencard3 = '1eac1fedb6ed4badbe577e9c513162a8';

if (process.env.opencard3) {
    opencard3 = process.env.opencard3;
}

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

const JD_API_HOST = `https://api.m.jd.com/client.action`;
message = ""

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    for (let i = 0; i <cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        cookie1 = cookiesArr[i];
        cookie1 = cookiesArr[0];
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.cando = true
            $.cow = ""
            $.openCard = true
            $.isLogin = true;
            $.needhelp = true
            $.foodNum = 0
            $.nickName = '';
            $.drawresult = ""
            $.exchange =0
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            await genToken()
            await getActCk()
            await getToken2()
            await getshopid()
            await getMyPin()
            await adlog()
            await getUserInfo()
            if ($.cando) {
                await getUid()
                await check
                await draw(1)
                await draw(2)}

        }
    }

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
//获取活动信息



//genToken
function genToken() {
    let config = {
        url: 'https://api.m.jd.com/client.action?functionId=genToken&clientVersion=10.0.4&build=88641&client=android&d_brand=OPPO&d_model=PCAM00&osVersion=10&screen=2208*1080&partner=oppo&oaid=&openudid=7049442d7e415232&eid=eidAfb0d81231cs3I4yd3GgLRjqcx9qFEcJEmyOMn1BwD8wvLt/pM7ENipVIQXuRiDyQ0FYw2aud9+AhtGqo1Zhp0TsLEgoKZvAWkaXhApgim9hlEyRB&sdkVersion=29&lang=zh_CN&uuid=7049442d7e415232&aid=7049442d7e415232&area=4_48201_54794_0&networkType=wifi&wifiBssid=774de7601b5cddf9aad1ae30f3a3dfc0&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJ37PXgbFHUbL1MqJzlU2EF5xRpAW5VoZ3SEtOz781K7UMmYxhZQAt0Gynq3ZeYJbm9%2FDjWkzW5iK9aRySIo5Px8b9C%2FLLdK7GOQr0gY18geU0HxTSvkUgezbdW9JC28t1rJ%2BU7f%2FlsCb4eHfIa9W7mrkmkno4IC1MExGJC2eTuHDdWI8LiNbKyQ%3D%3D&uemps=0-0&st=1626418319258&sign=548a7b3b2a5d1fc07302c2c16667f32d&sv=121',
        body: 'body=%7B%22action%22%3A%22to%22%2C%22to%22%3A%22https%253A%252F%252Flzdz1-isv.isvjcloud.com%252Fdingzhi%252Fdz%252FopenCard%252Factivity%252F3861991%253FactivityId%253Dc927f967852843329c05464a053f290e%22%7D&',
        headers: {
            'Host': 'api.m.jd.com',
            'accept': '*/*',
            'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
            'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        }
    }
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                    console.log(`${JSON.stringify(err)}`)
                } else {
                    data = JSON.parse(data);
                    $.isvToken = data['tokenKey']

                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

//获取pin需要用到
function getToken2() {
    let config = {
        url: 'https://api.m.jd.com/client.action?functionId=isvObfuscator&clientVersion=10.0.4&build=88641&client=android&d_brand=OPPO&d_model=PCAM00&osVersion=10&screen=2208*1080&partner=oppo&oaid=&openudid=7049442d7e415232&eid=eidAfb0d81231cs3I4yd3GgLRjqcx9qFEcJEmyOMn1BwD8wvLt/pM7ENipVIQXuRiDyQ0FYw2aud9+AhtGqo1Zhp0TsLEgoKZvAWkaXhApgim9hlEyRB&sdkVersion=29&lang=zh_CN&uuid=7049442d7e415232&aid=7049442d7e415232&area=4_48201_54794_0&networkType=wifi&wifiBssid=774de7601b5cddf9aad1ae30f3a3dfc0&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJ37PXgbFHUbL1MqJzlU2EF5xRpAW5VoZ3SEtOz781K7UMmYxhZQAt0Gynq3ZeYJbm9%2FDjWkzW5iK9aRySIo5Px8b9C%2FLLdK7GOQr0gY18geU0HxTSvkUgezbdW9JC28t1rJ%2BU7f%2FlsCb4eHfIa9W7mrkmkno4IC1MExGJC2eTuHDdWI8LiNbKyQ%3D%3D&uemps=0-0&st=1626418321236&sign=89e09f9a5e3ffe32a0868e61de75c90c&sv=120',
        body: 'body=%7B%22id%22%3A%22%22%2C%22url%22%3A%22https%3A%2F%2Flzdz1-isv.isvjcloud.com%22%7D&',
        headers: {
            'Host': 'api.m.jd.com',
            'accept': '*/*',
            'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
            'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        }
    }
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    $.token2 = data['token']

                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}




//抄的书店的 不过不加好像也能进去
function getActCk() {
    return new Promise(resolve => {
        $.get(taskUrl("/dingzhi/dz/openCard/activity", `activityId=c927f967852843329c05464a053f290e&lng=107.146945&lat=33.255267&sid=cad74d1c843bd47422ae20cadf6fe5aw&un_area=27_2442_2444_31912`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.isNode())
                        for (let ck of resp['headers']['set-cookie']) {
                            cookie = `${cookie}; ${ck.split(";")[0]};`
                        }
                    else {
                        for (let ck of resp['headers']['Set-Cookie'].split(',')) {
                            cookie = `${cookie}; ${ck.split(";")[0]};`
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

//获取我的pin
function getshopid() {
    let config = taskPostUrl("/dz/common/getSimpleActInfoVo", "activityId=c927f967852843329c05464a053f290e")
    //console.log(config)
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.result) {
                        $.shopid = data.data.venderId

                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

//获取我的pin
function getMyPin() {
    let config = taskPostUrl("/customer/getMyPing", `userId=${$.shopid}&token=${encodeURIComponent($.token2)}&fromType=APP`)
    //   console.log(config)
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            //console.log(data)
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.data && data.data.secretPin) {
                        $.pin = data.data.secretPin

                        $.nickname = data.data.nickname
                        $.lz_jdpin_token = resp['headers']['set-cookie'].filter(row => row.indexOf("lz_jdpin_token") !== -1)[0]

                    }else {
                        console.log(data.errorMessage)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function adlog() {
    let config = taskPostUrl("/common/accessLogWithAD", `venderId=1000086749&code=99&pin=${encodeURIComponent($.pin)}&activityId=c927f967852843329c05464a053f290e&pageUrl=https%3A%2F%2Flzdz1-isv.isvjcloud.com%2Fdingzhi%2Fdz%2FopenCard%2Factivity%2F3861991%3FactivityId%3Dc927f967852843329c05464a053f290e%26lng%3D114.062522%26lat%3D29.541495%26sid%3D6e9bfee3838075a72533536815d8f3ew%26un_area%3D4_48201_54794_0&subType=app&adSource=`)
    //   console.log(config)
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    //  data = JSON.parse(data);
                    if ($.isNode())
                        for (let ck of resp['headers']['set-cookie']) {
                            cookie = `${cookie}; ${ck.split(";")[0]};`
                        }
                    else {
                        for (let ck of resp['headers']['Set-Cookie'].split(',')) {
                            cookie = `${cookie}; ${ck.split(";")[0]};`
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}



// 获得用户信息
function getUserInfo() {
    return new Promise(resolve => {
        let body = `pin=${encodeURIComponent($.pin)}`
        let config = taskPostUrl('/wxActionCommon/getUserInfo', body)
        //   console.log(config)
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.data) {
                        $.userId = data.data.id
                        $.pinImg = data.data.yunMidImageUrl
                        $.nick = data.data.nickname

                    } else {
                        $.cando = false
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function getUid() {
    return new Promise(resolve => {
        let body = `activityId=c927f967852843329c05464a053f290e&pin=${encodeURIComponent($.pin)}&pinImg=${$.pinImg }&nick=${encodeURIComponent($.nick)}&cjyxPin=&cjhyPin=&shareUuid=${opencard3}`
        $.post(taskPostUrl('/dingzhi/dz/openCard/activityContent', body), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.result == true) {

                        $.shareuuid1 = data.data.actorUuid
                        console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}\n好友互助码】${$.shareuuid1}\n`);
                        console.log(`一键关注任务`)
                        await dotask(23,1000086749)


                        tasks1 = data.data.addSku.settings
                        //console.log(JSON.stringify(tasks1))

                        for (let k = 0; k < tasks1.length; k++) {
                            console.log(`开卡任务`)
                            value = tasks1[k].value2

                            await join(value)
                        }


                    }else if (data.result == false) {

                        $.log(data.errorMessage)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function check() {
    let body = `activityId=c927f967852843329c05464a053f290e&actorUuid=${$.shareuuid1}&shareUuid=${opencard3}&pin=${encodeURIComponent($.token)}`

    return new Promise(resolve => {
        $.post(taskPostUrl('dingzhi/dz/openCard/startDraw', body), async (err, resp, data) => {
            try {

                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.result && data.data) {
                        if(data.data.allOpenCard == true){
                            console.log(`开卡任务完成`)

                        }
                    } else {
                        console.log(`${data.errorMessage}`)
                    }
                }
                //}
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })

}
//入会
function join(venderId) {
    return new Promise(resolve => {


        $.get(ruhui(`${venderId}`), async (err, resp, data) => {
            try {

                data = data.match(/(\{().+\})/)[1]
                data = JSON.parse(data);
                if(data.success == true){
                    $.log(data.message)
                }else if(data.success == false){
                    $.log(data.message)
                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function ruhui(functionId) {
    return {
        url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"${functionId}","shopId":"${functionId}","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0}&client=H5&clientVersion=8.5.6&uuid=88888&jsonp=jsonp_1599410555929_50468`,
        headers: {
            'Origin': 'https://api.m.jd.com',
            'Host': 'api.m.jd.com',
            'accept': '*/*',
            'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
            'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie1
        }
    }
}
function dotask(taskType, value) {
    let config = taskPostUrl("/dingzhi/dz/openCard/followShop", `activityId=c927f967852843329c05464a053f290e&pin=${encodeURIComponent($.pin)}&actorUuid=${$.shareuuid1}&taskType=${taskType}&taskValue=${value}`)
    //console.log(config)
    return new Promise(resolve => {

        $.post(config, async (err, resp, data) => {
            //console.log("dotask "+data)
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.result && data.data) {
                        console.log(`任务完成成功，获得${data.data.addBeanNum}京豆`)
                        $.score += data.data.addBeanNum
                    } else {
                        console.log(`${data.errorMessage}`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })

}

function draw(type) {
    let config = taskPostUrl("/dingzhi/dz/openCard/startDraw", `activityId=c927f967852843329c05464a053f290e&actorUuid=${$.shareuuid1}&pin=${encodeURIComponent($.pin)}&type=${type}`)
    //console.log(config)
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.result == true) {
                        if (data.data.name) {
                            console.log(`抽奖成功，获得奖品：${data.data.name}`)
                            message += `抽奖成功，获得奖品：${data.data.name}\n`
                        } else {
                            console.log(`抽奖成功，获得空气`)
                            message += `抽奖成功，获得空气`
                        }
                    }else if (data.result == false) {
                        console.log(data.errorMessage)

                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function taskUrl(url, body) {
    const time = Date.now();
    //  console.log(cookie)
    return {
        url: `https://lzdz1-isv.isvjcloud.com${url}?${body}`,
        headers: {
            "Host": "lzdz1-isv.isvjcloud.com",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Accept-Language": "zh-cn",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://lzdz1-isv.isvjcloud.com",
            "Connection": "keep-alive",
            "Referer": "https://lzdz1-isv.isvjcloud.com/dingzhi/dz/openCard/activity/?activityId=c927f967852843329c05464a053f290e&lng=114.062600&lat=29.541483&sid=155af26c71756ef0318aeb0fafbed57w&un_area=4_48201_54794_0",
            "User-Agent": "Mozilla/5.0 (Linux; U; Android 8.0.0; zh-cn; Mi Note 2 Build/OPR1.170623.032) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.128 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.1.1 " ,
            'Cookie': `${cookie} IsvToken=${$.isvToken};AUTH_C_USER=${$.pin}`,
        }
    }
}



function taskPostUrl(url, body) {
    return {
        url: `https://lzdz1-isv.isvjcloud.com${url}`,
        body: body,
        headers: {
            "Host": "lzdz1-isv.isvjcloud.com",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Accept-Language": "zh-cn",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://lzdz1-isv.isvjcloud.com",
            "Connection": "keep-alive",
            "Referer": "https://lzdz1-isv.isvjcloud.com/dingzhi/dz/openCard/activity/?activityId=c927f967852843329c05464a053f290e&lng=114.062600&lat=29.541483&sid=155af26c71756ef0318aeb0fafbed57w&un_area=4_48201_54794_0",
            "User-Agent": "Mozilla/5.0 (Linux; U; Android 8.0.0; zh-cn; Mi Note 2 Build/OPR1.170623.032) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.128 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.1.1 " ,
            'Cookie': `${cookie} IsvToken=${$.isvToken};AUTH_C_USER=${$.pin};${$.lz_jdpin_token}`,
        }
    }
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
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
