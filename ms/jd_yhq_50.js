/*
全品类优惠券50减20
自动预约茅台 执行时间大家自己改下
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#全品类优惠券50减20
0 55 * * * * https://github.com/JDWXX/jd_job/blob/master/ms/jd_jdjsb_10_4.js, tag=全品类优惠券50减20, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "0 55 * * * *" script-path=https://github.com/JDWXX/jd_job/blob/master/ms/jd_jdjsb_10_4.js,tag=全品类优惠券50减20
===================================Surge================================
全品类优惠券50减20 = type=cron,cronexp="0 55 * * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_job/blob/master/ms/jd_jdjsb_10_4.js
====================================小火箭=============================
全品类优惠券50减20 = type=cron,script-path=https://github.com/JDWXX/jd_job/blob/master/ms/jd_jdjsb_10_4.js, cronexpr="0 55 * * * *", timeout=3600, enable=true
 */
const $ = new Env('全品类优惠券50减20');
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
var date=new Date();
function getCurrentDateTimeT(){
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();
    var hm=date.getMilliseconds();
    return year + "年" + formatZero(month) + "月" +formatZero(day) + "日 " +formatZero(hours) + ":" +formatZero(minutes) + ":" +formatZero(seconds) + ":" +formatZero(hm);
}
function getCurrentDateTimeZ(hours){
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    return year + "-" + formatZero(month) + "-" +formatZero(day) + " " + hours + ":00:00";
}

function formatZero(n){
    if(n>=0&&n<=9){
        return "0"+n;
    }else{
        return n;
    }
}
function sleep(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    try {
        $.isNode() ? require('./ql212796668.js') : '';
    }catch (e){
        console.log(`\n\n我觉得你没拉我仓库，脚本不执行了\n\n`);
        console.log("\n拉仓库加QQ群：212796668、681030097 ，看群公告\n")
        return;
    }
    let dqxs = parseInt(formatZero(date.getHours()))
    let xs = ""
    dqxs = parseInt(dqxs);
    xs = dqxs + 1
    if(dqxs < 10)
        xs = 10
    let jdsjc = '' //京东时间戳
    console.log(xs);
    console.log("\n============【京东时间校准】===============");
    await fetch("https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    }).then(res => res.json())
    .then(json => {
        jdsjc = json.currentTime2
        // console.log("京东时间戳：" + json.currentTime2)
    });
    console.log("\n========================================");
    console.log("\n执行准点时间: " + getCurrentDateTimeZ(xs));
    ddhm = (new Date(getCurrentDateTimeZ(xs)).getTime() - jdsjc) / 1000;
    console.log(`\n等待 ${ddhm} 秒后执行代码`);
    // if(ddhm > 1800){
    //     console.log(`等待时间大于 1800 秒（半小时），终止运行\n`);
    //     return
    // }
    ddhm = ddhm*1000
    // await sleep(ddhm)
    let msgs = ""
    console.log("\n========================================");
    console.log("\n》》》》》》执行时间: " + getCurrentDateTimeT() + "《《《《《《");
    for (let i = 0; i < cookiesArr.length; i++) {
    // for (let i = 0; i < 2; i++) {
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
            try {
                const option =  {
                    url: `https://api.m.jd.com/client.action?functionId=getCcFeedInfo&clientVersion=10.3.0&build=91795&client=android&partner=tencent&oaid=06ad1eb785b54a37&eid=eidA619b8123ffs9zVnplaoQSFiRdRsIbAsLJs1Z6w/QuYhg0smYkdOF7YyLQyxxoQuhTWVTnqGPzBeV/caPNwqBWgZSIdkmZdcoqRMkCZGY9O8BEFRP&sdkVersion=30&lang=zh_CN&harmonyOs=0&networkType=UNKNOWN&uts=0f31TVRjBSuD0J0gZBTeLhmgBKvaTq8em3ZtqQB90LoJdpmZkB94WnmYkAX4Z5y5hLvaswHULRD6mpRNbIIP0Hmu40YkG2pAC%2Fn9haSIYXUTU1%2FmQBb5gXBMl2Fm0wkupn1WIPqcPXmw8EZqo0LjhHwVIy643zeZkqG96%2BczhTaoVJ%2Ff1akWPclcao1YXVfQEa%2FRkcZyYy2MMPr2SKaN%2Bg%3D%3D&uemps=0-0&ext=%7B%22prstate%22%3A%220%22%7D&ef=1&ep=%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1646995729645%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22area%22%3A%22CJvpCJY1EV8zDzS2Cv8zDzS3Cq%3D%3D%22%2C%22d_model%22%3A%22JJSnCNTBCUPN%22%2C%22wifiBssid%22%3A%22dW5hbw93bq%3D%3D%22%2C%22osVersion%22%3A%22CJO%3D%22%2C%22d_brand%22%3A%22WQvrb21f%22%2C%22screen%22%3A%22CzKmDyenDNGm%22%2C%22uuid%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%2C%22aid%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%2C%22openudid%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D&st=1646995783767&sign=656d14904dca303817f115e1102a4831&sv=102`,
                    body: `body=%7B%22categoryId%22%3A118%2C%22childActivityUrl%22%3A%22openapp.jdmobile%3A%2F%2Fvirtual%3Fparams%3D%7B%5C%22category%5C%22%3A%5C%22jump%5C%22%2C%5C%22des%5C%22%3A%5C%22couponCenter%5C%22%7D%22%2C%22eid%22%3A%22eidA619b8123ffs9zVnplaoQSFiRdRsIbAsLJs1Z6w%2FQuYhg0smYkdOF7YyLQyxxoQuhTWVTnqGPzBeV%2FcaPNwqBWgZSIdkmZdcoqRMkCZGY9O8BEFRP%22%2C%22globalLat%22%3A%22a7f1f05ea1cb073061c7dd395fb51cf2%22%2C%22globalLng%22%3A%2289c622bfae35930a028e006f8858359e%22%2C%22lat%22%3A%220f5edf6df56e98577092a41ff0195c4c%22%2C%22lng%22%3A%229d60a1be33e162bad43fd902104428a0%22%2C%22monitorRefer%22%3A%22appClient%22%2C%22monitorSource%22%3A%22ccfeed_android_index_feed%22%2C%22pageClickKey%22%3A%22Coupons_GetCenter%22%2C%22pageNum%22%3A1%2C%22pageSize%22%3A20%2C%22shshshfpb%22%3A%22JD012145b9j9vsq90Edy164699573095602fI7c5lUlt-3VyCuJHlDEjmKFPukQHiig16o4gut%7EjcYfTYlhtrSjY44y9m2%2BXvDIAM7zeAkXPPWnZfRlHx4YN8q6T2fmer%2BWJVupm6Rrf8qSoG8AYvu98V8rznhDLng%3D%3D%22%7D&`,
                    headers: {
                        "J-E-C": "%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1646988616850%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22pin%22%3A%22TUU1TJu0TJumTUU2TJvNTJu1TUU5TJu0TJrM%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D",
                        "J-E-H": "%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1646988616851%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22user-agent%22%3A%22b2jedRHmBzCkCJSkCJjgZQ1rbQm7YW5ucw9fZNj2ZXTzaW9kBzOmBtCkCNjsdWviZM85CJc5DJjzY3TvZW4lCJG0CRqzCNK3E29zBzOnEm%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D",
                        "Connection": "Keep-Alive",
                        "host": "api.m.jd.com",
                        "Charset": "UTF-8",
                        "Accept-Encoding": "br,gzip,deflate",
                        "user-agent": "okhttp/3.12.1;jdmall;android;version/10.3.0;build/91795;",
                        "Cache-Control": "no-cache",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Content-Length": "952",
                        "Cookie": cookie
                    },
                    timeout: 3000,
                };
                $.post(option, (err, resp, data) => {
                    try {
                        if (err) {
                            console.log('权限查询请求失败')
                        } else {
                            // console.log('------')
                            // console.log(data)
                            // console.log('------')
                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    }
                })

                // await  fetch(`https://api.m.jd.com/api?functionId=getUnionGiftCoupon&client=wh5&appid=u&clientVersion=1.0.0&body=%7B%22sku%22%3A%22" + skuId + "%22%2C%22q%22%3A%22EHATEBRmGHUbERBsEnYiURYwRykbS0QwFDARVkcxQy0aSxAqFCkVSxAwFHUVQRxfFnEQFxJrEnAiUkAwRSVRe2MOAiQVERY8EXBCHRZsQnRAEhw%2FEiIXEkM4E3QWRh1pE3FFJR1qGXcaERNsEEE%3D%22%2C%22d%22%3A%22pC1up0x%22%2C%22platform%22%3A4%2C%22giftInfo%22%3A%22%22%2C%22wxtoken%22%3A%22%22%2C%22eid%22%3A%22%22%2C%22fp%22%3A%22%22%2C%22shshshfp%22%3A%22-1%22%2C%22shshshfpa%22%3A%22-1%22%2C%22shshshfpb%22%3A%22-1%22%2C%22childActivityUrl%22%3A%22https%3A%2F%2Fjingfen.jd.com%2Fitem.html%3Fsku%3D" + skuId + "%26q%3DEHATEBRmGHUbERBsEnYiURYwRykbS0QwFDARVkcxQy0aSxAqFCkVSxAwFHUVQRxfFnEQFxJrEnAiUkAwRSVRe2MOAiQVERY8EXBCHRZsQnRAEhw%2FEiIXEkM4E3QWRh1pE3FFJR1qGXcaERNsEEE%3D%26d%3DpC1up0x%26cu%3Dtrue%26utm_source%3Dkong%26utm_medium%3Djingfen%26utm_campaign%3Dt_2011692802_%26utm_term%3D5f4a14c49ae04991b8e0c74d02ddff25%26sid%3D5a4eff6d3d962f63dd5c20bf260f68ew%26un_area%3D15_1213_3410_71720%23%2Fpages%2Fcommon-coupon%2Fcommon-coupon%22%2C%22pageClickKey%22%3A%22MJDAlliance_CheckDetail%22%7D&loginType=2&_t=1647013156745`, {
                //     "headers": {
                //         "Host": "api.m.jd.com",
                //         "Connection": "keep-alive",
                //         "User-Agent": "jdapp;android;10.4.3;;;appBuild/92922;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1647013144080%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJO%3D%22%2C%22ad%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%2C%22od%22%3A%22CNZrZNPvYtc4DWS1DQOzDm%3D%3D%22%2C%22ov%22%3A%22CzK%3D%22%2C%22ud%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; M2102K1AC Build/RKQ1.201112.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045935 Mobile Safari/537.36",
                //         "Accept": "*/*",
                //         "Origin": "https://jingfen.jd.com",
                //         "X-Requested-With": "com.jingdong.app.mall",
                //         "Sec-Fetch-Site": "same-site",
                //         "Sec-Fetch-Mode": "cors",
                //         "Sec-Fetch-Dest": "empty",
                //         "Referer": "https://jingfen.jd.com/item.html?sku=" + skuId + "&q=EHATEBRmGHUbERBsEnYiURYwRykbS0QwFDARVkcxQy0aSxAqFCkVSxAwFHUVQRxfFnEQFxJrEnAiUkAwRSVRe2MOAiQVERY8EXBCHRZsQnRAEhw/EiIXEkM4E3QWRh1pE3FFJR1qGXcaERNsEEE=&d=pC1up0x&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2011692802_&utm_term=5f4a14c49ae04991b8e0c74d02ddff25&sid=5a4eff6d3d962f63dd5c20bf260f68ew&un_area=15_1213_3410_71720",
                //         "Accept-Encoding": "gzip, deflate, br",
                //         "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                //         "Cookie": cookie
                //     },
                //     // body: `body=%7B%22channel%22%3A%22%E9%A2%86%E5%88%B8%E4%B8%AD%E5%BF%83%22%2C%22childActivityUrl%22%3A%22openapp.jdmobile%3A%2F%2Fvirtual%3Fparams%3D%7B%5C%22category%5C%22%3A%5C%22jump%5C%22%2C%5C%22des%5C%22%3A%5C%22couponCenter%5C%22%7D%22%2C%22couponSource%22%3A%22manual%22%2C%22couponSourceDetail%22%3Anull%2C%22eid%22%3A%22eidA619b8123ffs9zVnplaoQSFiRdRsIbAsLJs1Z6w%2FQuYhg0smYkdOF7YyLQyxxoQuhTWVTnqGPzBeV%2FcaPNwqBWgZSIdkmZdcoqRMkCZGY9O8BEFRP%22%2C%22extend%22%3A%22${$.extend}%22%2C%22lat%22%3A%22474a8517413160eb25d3327be99a05ce%22%2C%22lng%22%3A%228e7ae9542f47e419be9636c6cbd8134d%22%2C%22pageClickKey%22%3A%22Coupons_GetCenter%22%2C%22rcType%22%3A%224%22%2C%22shshshfpb%22%3A%22JD012145b9Z9doldQZ2m164698862004003HMpogdOv6F4T59zR-5EKGOWOqjRE1ixx1406bm0%7EjcYfTYlhtrSjY44y9m2%2BXvDIAM7zeAkXPPWnZfRlHx4YN8q6T2fmer%2BWJVupm6Rrf8qSoG8AYvu98V8rznhDLng%3D%3D%22%2C%22source%22%3A%22couponCenter_app%22%2C%22subChannel%22%3A%22feeds%E6%B5%81%22%7D&`,
                //     "method": "GET"
                // }).then(res => res.json())
                //     .then(json => {
                //         console.log("领取")
                //         console.log(json)
                //     });

                await fetch(`https://api.m.jd.com/client.action?functionId=getCcFeedInfo&clientVersion=10.3.0&build=91795&client=android&partner=tencent&oaid=06ad1eb785b54a37&eid=eidA619b8123ffs9zVnplaoQSFiRdRsIbAsLJs1Z6w/QuYhg0smYkdOF7YyLQyxxoQuhTWVTnqGPzBeV/caPNwqBWgZSIdkmZdcoqRMkCZGY9O8BEFRP&sdkVersion=30&lang=zh_CN&harmonyOs=0&networkType=UNKNOWN&uts=0f31TVRjBSuD0J0gZBTeLhmgBKvaTq8em3ZtqQB90LoJdpmZkB94WnmYkAX4Z5y5hLvaswHULRD6mpRNbIIP0Hmu40YkG2pAC%2Fn9haSIYXUTU1%2FmQBb5gXBMl2Fm0wkupn1WIPqcPXmw8EZqo0LjhHwVIy643zeZkqG96%2BczhTaoVJ%2Ff1akWPclcao1YXVfQEa%2FRkcZyYy2MMPr2SKaN%2Bg%3D%3D&uemps=0-0&ext=%7B%22prstate%22%3A%220%22%7D&ef=1&ep=%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1646995729645%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22area%22%3A%22CJvpCJY1EV8zDzS2Cv8zDzS3Cq%3D%3D%22%2C%22d_model%22%3A%22JJSnCNTBCUPN%22%2C%22wifiBssid%22%3A%22dW5hbw93bq%3D%3D%22%2C%22osVersion%22%3A%22CJO%3D%22%2C%22d_brand%22%3A%22WQvrb21f%22%2C%22screen%22%3A%22CzKmDyenDNGm%22%2C%22uuid%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%2C%22aid%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%2C%22openudid%22%3A%22ZwY2CQOzENdwDwTrENumDK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D&st=1646995783767&sign=656d14904dca303817f115e1102a4831&sv=102`, {
                    "headers": {
                        "Connection": "Keep-Alive",
                        "host": "api.m.jd.com",
                        "Charset": "UTF-8",
                        "Accept-Encoding": "br,gzip,deflate",
                        "user-agent": "okhttp/3.12.1;jdmall;android;version/10.3.0;build/91795;",
                        "Cache-Control": "no-cache",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Content-Length": "952",
                        "Cookie": cookie
                    },
                    body: `body=%7B%22categoryId%22%3A118%2C%22childActivityUrl%22%3A%22openapp.jdmobile%3A%2F%2Fvirtual%3Fparams%3D%7B%5C%22category%5C%22%3A%5C%22jump%5C%22%2C%5C%22des%5C%22%3A%5C%22couponCenter%5C%22%7D%22%2C%22eid%22%3A%22eidA619b8123ffs9zVnplaoQSFiRdRsIbAsLJs1Z6w%2FQuYhg0smYkdOF7YyLQyxxoQuhTWVTnqGPzBeV%2FcaPNwqBWgZSIdkmZdcoqRMkCZGY9O8BEFRP%22%2C%22globalLat%22%3A%22a7f1f05ea1cb073061c7dd395fb51cf2%22%2C%22globalLng%22%3A%2289c622bfae35930a028e006f8858359e%22%2C%22lat%22%3A%220f5edf6df56e98577092a41ff0195c4c%22%2C%22lng%22%3A%229d60a1be33e162bad43fd902104428a0%22%2C%22monitorRefer%22%3A%22appClient%22%2C%22monitorSource%22%3A%22ccfeed_android_index_feed%22%2C%22pageClickKey%22%3A%22Coupons_GetCenter%22%2C%22pageNum%22%3A1%2C%22pageSize%22%3A20%2C%22shshshfpb%22%3A%22JD012145b9j9vsq90Edy164699573095602fI7c5lUlt-3VyCuJHlDEjmKFPukQHiig16o4gut%7EjcYfTYlhtrSjY44y9m2%2BXvDIAM7zeAkXPPWnZfRlHx4YN8q6T2fmer%2BWJVupm6Rrf8qSoG8AYvu98V8rznhDLng%3D%3D%22%7D&`,
                    "method": "POST"
                }).then(res => res.json())
                    .then(json => {
                        console.log("全品类优惠券50减20")
                        if(json.code == 0){
                            for (let j = 0; j < json.result.couponList.length; j++) {
                                console.log(json.result.couponList[j])
                                // console.log("-------------------------------")
                                // console.log(json.result.couponList[j].title)
                                // console.log("-------------------------------")
                                // console.log(json.result.couponList[j].skuList)
                                // console.log("-------------------------------")
                                // for (let k = 0; k < json.result.couponList[j].skuList.length; k++) {
                                //     let skuId = json.result.couponList[j].skuList[k].skuId
                                //     console.log("skuId : " + skuId)
                                //     fetch("https://api.m.jd.com/api?functionId=getUnionGiftCoupon&client=wh5&appid=u&clientVersion=1.0.0&body=%7B%22sku%22%3A%22" + skuId + "%22%2C%22q%22%3A%22EHATEBRmGHUbERBsEnYiURYwRykbS0QwFDARVkcxQy0aSxAqFCkVSxAwFHUVQRxfFnEQFxJrEnAiUkAwRSVRe2MOAiQVERY8EXBCHRZsQnRAEhw%2FEiIXEkM4E3QWRh1pE3FFJR1qGXcaERNsEEE%3D%22%2C%22d%22%3A%22pC1up0x%22%2C%22platform%22%3A4%2C%22giftInfo%22%3A%22%22%2C%22wxtoken%22%3A%22%22%2C%22eid%22%3A%22%22%2C%22fp%22%3A%22%22%2C%22shshshfp%22%3A%22-1%22%2C%22shshshfpa%22%3A%22-1%22%2C%22shshshfpb%22%3A%22-1%22%2C%22childActivityUrl%22%3A%22https%3A%2F%2Fjingfen.jd.com%2Fitem.html%3Fsku%3D" + skuId + "%26q%3DEHATEBRmGHUbERBsEnYiURYwRykbS0QwFDARVkcxQy0aSxAqFCkVSxAwFHUVQRxfFnEQFxJrEnAiUkAwRSVRe2MOAiQVERY8EXBCHRZsQnRAEhw%2FEiIXEkM4E3QWRh1pE3FFJR1qGXcaERNsEEE%3D%26d%3DpC1up0x%26cu%3Dtrue%26utm_source%3Dkong%26utm_medium%3Djingfen%26utm_campaign%3Dt_2011692802_%26utm_term%3D5f4a14c49ae04991b8e0c74d02ddff25%26sid%3D5a4eff6d3d962f63dd5c20bf260f68ew%26un_area%3D15_1213_3410_71720%23%2Fpages%2Fcommon-coupon%2Fcommon-coupon%22%2C%22pageClickKey%22%3A%22MJDAlliance_CheckDetail%22%7D&loginType=2&_t=1647013156745", {
                                //         "headers": {
                                //             "Host": "api.m.jd.com",
                                //             "Connection": "keep-alive",
                                //             "User-Agent": "jdapp;android;10.4.3;;;appBuild/92922;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1647013144080%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJO%3D%22%2C%22ad%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%2C%22od%22%3A%22CNZrZNPvYtc4DWS1DQOzDm%3D%3D%22%2C%22ov%22%3A%22CzK%3D%22%2C%22ud%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; M2102K1AC Build/RKQ1.201112.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045935 Mobile Safari/537.36",
                                //             "Accept": "*/*",
                                //             "Origin": "https://jingfen.jd.com",
                                //             "X-Requested-With": "com.jingdong.app.mall",
                                //             "Sec-Fetch-Site": "same-site",
                                //             "Sec-Fetch-Mode": "cors",
                                //             "Sec-Fetch-Dest": "empty",
                                //             "Referer": "https://jingfen.jd.com/item.html?sku=" + skuId + "&q=EHATEBRmGHUbERBsEnYiURYwRykbS0QwFDARVkcxQy0aSxAqFCkVSxAwFHUVQRxfFnEQFxJrEnAiUkAwRSVRe2MOAiQVERY8EXBCHRZsQnRAEhw/EiIXEkM4E3QWRh1pE3FFJR1qGXcaERNsEEE=&d=pC1up0x&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2011692802_&utm_term=5f4a14c49ae04991b8e0c74d02ddff25&sid=5a4eff6d3d962f63dd5c20bf260f68ew&un_area=15_1213_3410_71720",
                                //             "Accept-Encoding": "gzip, deflate, br",
                                //             "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                                //             "Cookie": cookie
                                //         },
                                //         "method": "GET"
                                //     }).then(res => res.json())
                                //         .then(json => {
                                //             console.log("领取")
                                //             console.log(json)
                                //         });
                                // }

                                console.log(json.result.couponList[j].skuId)
                                if(json.result.couponList[j].title.indexOf("全品类(除特例商品)【每周可领一次】") != -1){
                                    // console.log(json.result.couponList[j])
                                    $.extend = json.result.couponList[j].receiveKey
                                    console.log($.extend)
                                    console.log(json.result.couponList[j].quota)
                                }
                            }
                        }
                    });

                // let activityId = '04BCD352B47E5A8B92C7D4ED398FBE33_bingo'
                // let key = '82955FF5B19B4873DD7044D75B44AD907C1A9FECE3BD974B2E35492750271EA91192D5362104AA91EDD08FFB7EFA944C_bingo,roleId=04BCD352B47E5A8B92C7D4ED398FBE33_bingo,strengthenKey=19F512DCD8EE34ABE9C4FB4A92C2F42A35635A66A268556B6252CE474CA6F3B6_bingo'
                // await fetch("http://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={\"activityId\":\"" + activityId + "\",\"from\":\"H5node\",\"scene\":\"1\",\"args\":" +
                //     "\"key=" + key + "\",\"mitemAddrId\":\"\",\"geo\":{\"lng\":\"\",\"lat\":\"\"}}&client=wh5&clientVersion=1.0.0", {
                //     "headers": {
                //         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                //         "accept-language": "zh-CN,zh;q=0.9",
                //         "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
                //         "sec-ch-ua-mobile": "?0",
                //         "sec-ch-ua-platform": "\"Windows\"",
                //         "sec-fetch-dest": "document",
                //         "sec-fetch-mode": "navigate",
                //         "sec-fetch-site": "none",
                //         "sec-fetch-user": "?1",
                //         "upgrade-insecure-requests": "1",
                //         "cookie": cookie
                //     },
                //     "referrerPolicy": "strict-origin-when-cross-origin",
                //     "body": null,
                //     "method": "GET"
                // }).then(res => res.json())
                //     .then(json => {
                //         console.log("全品类优惠券50减20")
                //         console.log(json)
                //         if(json.subCodeMsg.indexOf("领取成功！") != -1)
                //             msgs += "账号:【" + $.UserName + "】 全品类优惠券50减20 " + json.subCodeMsg + "\n";
                //     });
            }catch (e){

            }
        }
    }
    if(msgs != ""){
        notify.sendNotify("全品类优惠券50减20", msgs);
    }


})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
