/*
年终奖补贴开奖
不会用加群：212796668、681030097
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#年终奖补贴开奖
55 21 * * * https://github.com/JDWXX/jd_job.git, tag=年终奖补贴开奖, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "55 21 * * *" script-path=https://github.com/JDWXX/jd_job.git,tag=年终奖补贴开奖
===================================Surge================================
年终奖补贴开奖 = type=cron,cronexp="55 21 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_job.git
====================================小火箭=============================
年终奖补贴开奖 = type=cron,script-path=https://github.com/JDWXX/jd_job.git, cronexpr="55 21 * * *", timeout=3600, enable=true
 */
const $ = new Env('年终奖补贴开奖');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie2.js') : '';
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
    let zlmList = ['T0205KkcBUZcpBKDVl-m4KJwCjRQl4aW5kRrbA','T012a1nTlrK8LPBsCjRQl4aW5kRrbA']
    let index = Math.floor((Math.random()*zlmList.length));
    let zlm = zlmList[index];
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
            try {
                await fetch("https://api.m.jd.com/client.action?functionId=newBabelAwardCollection", {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "zh,zh-CN;q=0.9",
                        "content-type": "application/x-www-form-urlencoded",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "cookie": cookie,
                        "Referer": "https://pro.m.jd.com/mall/active/2zvwa4x1uEj4Z62dDsCxptg6jfh4/index.html?forceCurrentView=1&preventPV=1&cu=true&utm_source=weixin&utm_medium=weixin&utm_campaign=t_1000072672_17053_001&utm_term=305e97c8af6a4d04ad652a853a6eab6e&PTAG=17053.1.1",
                        "Referrer-Policy": "no-referrer-when-downgrade"
                    },
                    "body": "body=%7B%22activityId%22%3A%222zvwa4x1uEj4Z62dDsCxptg6jfh4%22%2C%22gridInfo%22%3A%22%22%2C%22transParam%22%3A%22%7B%5C%22bsessionId%5C%22%3A%5C%22adaa4ea0-a242-4c8c-ba9b-af3331e95c23%5C%22%2C%5C%22babelChannel%5C%22%3A%5C%22%5C%22%2C%5C%22actId%5C%22%3A%5C%2201356743%5C%22%2C%5C%22enActId%5C%22%3A%5C%222zvwa4x1uEj4Z62dDsCxptg6jfh4%5C%22%2C%5C%22pageId%5C%22%3A%5C%223954717%5C%22%2C%5C%22encryptCouponFlag%5C%22%3A%5C%221%5C%22%2C%5C%22requestChannel%5C%22%3A%5C%22h5%5C%22%2C%5C%22jdAtHomePage%5C%22%3A%5C%220%5C%22%2C%5C%22utmFlag%5C%22%3A%5C%220%5C%22%2C%5C%22locType%5C%22%3A%5C%221%5C%22%7D%22%2C%22scene%22%3A%221%22%2C%22args%22%3A%22key%3D5F8D8DE16BC9811CE24303546946056B4E54EB7F1D8ABFBE2FF089B4F8DB76A8CE5BD86BF85F0AC11662FAE666C0CB23_bingo%2CroleId%3D3EDE3A3E524CFBEC6C34EDF8130977A2814616012FD18C3926B1B28EA3B4F584D14CD7E4EC836AE526F8F755A3FF3E804E48C048321136C6BE0B58ECFF6802FDB21C716C97645C57E6F3D286661A66FF1118F8FEB268E250710C7C279E13935D299F39E69043142241AA46B868D2FF07D6B531706BEF2D94FB747007C8AB60A2752E2D1207154F5F9ADD210D4B36D8931D300AB24C4C2D1552D95C6F59E6CFC0_bingo%2CstrengthenKey%3D99DA3083614654CF2B411906BFE5B3CA67DE3A7AB08DE56A1DAC1108E9A41265E2F2BFBB4296CC21760C1F7D4ACB9EE8_bingo%22%2C%22platform%22%3A%221%22%2C%22orgType%22%3A%222%22%2C%22openId%22%3A%22-1%22%2C%22pageClickKey%22%3A%22-1%22%2C%22eid%22%3A%22QLYTVLE2ZPJOITZCGABDC6KCO4PHHZKHRCOIC7PA4AH3VI73MJLCI5VGRBL3OZUBOKQVWVWTIEI2BPHY772GBK3BBY%22%2C%22fp%22%3A%22a87b26869af5106cf30c86457f2f6cf8%22%2C%22shshshfp%22%3A%2255236c2c7968147307594c238e9c7a8f%22%2C%22shshshfpa%22%3A%2250a4dfa0-51f4-4af6-5dcc-f8286c8eb1ca-1640840556%22%2C%22shshshfpb%22%3A%22dSayOMzAz363to0mT3mlgnA%22%2C%22childActivityUrl%22%3A%22https%253A%252F%252Fpro.m.jd.com%252Fmall%252Factive%252F2zvwa4x1uEj4Z62dDsCxptg6jfh4%252Findex.html%253FforceCurrentView%253D1%2526preventPV%253D1%2526cu%253Dtrue%2526utm_source%253Dweixin%2526utm_medium%253Dweixin%2526utm_campaign%253Dt_1000072672_17053_001%2526utm_term%253D305e97c8af6a4d04ad652a853a6eab6e%2526PTAG%253D17053.1.1%22%2C%22userArea%22%3A%22-1%22%2C%22client%22%3A%22-1%22%2C%22clientVersion%22%3A%22-1%22%2C%22uuid%22%3A%22-1%22%2C%22osVersion%22%3A%22-1%22%2C%22brand%22%3A%22-1%22%2C%22model%22%3A%22-1%22%2C%22networkType%22%3A%22-1%22%2C%22jda%22%3A%22122270672.1653030824979833655680.1653030824.1673243259.1673250355.146%22%2C%22sdkToken%22%3A%22%22%2C%22token%22%3A%22HO73QAULEOKOAZ7YW6V3MHJLMBST6PK7TL2Z23OOUWGC57YP4GBF5FV7LSNMJEBYSC2CGMRNHNPXW%22%2C%22jstub%22%3A%22FBND7EZMTTIZPUMAAV2JQVPV6A34Y3QNJOWHIPPMCJJ2AZ4VBQ57VPO4HJNFJZ5LASNK6QGKYNHDUN26XVJRNNQIQM6SRSPAL4AOS7Y%22%2C%22pageClick%22%3A%22Babel_Coupon%22%2C%22couponSource%22%3A%22manual%22%2C%22couponSourceDetail%22%3A%22-100%22%2C%22channel%22%3A%22%E9%80%9A%E5%A4%A9%E5%A1%94%E4%BC%9A%E5%9C%BA%22%2C%22batchId%22%3A%22872151598%22%2C%22headArea%22%3A%22%22%2C%22couponTemplateFrom%22%3A%22%22%2C%22mitemAddrId%22%3A%22%22%2C%22geo%22%3A%7B%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D%2C%22addressId%22%3A%22%22%2C%22posLng%22%3A%22%22%2C%22posLat%22%3A%22%22%2C%22jdv%22%3A%22weixin%7Ct_1000072672_17053_001%7Cweixin%7C305e97c8af6a4d04ad652a853a6eab6e%22%2C%22focus%22%3A%22%22%2C%22innerAnchor%22%3A%22%22%2C%22cv%22%3A%222.0%22%2C%22log%22%3A%221673251685162~1KC3270fQioMDFBVEJLTTk5MQ%3D%3D.cGJ1eH90ZHp4eHZtczV4djp7Pyx3FQwOM3B4dGd8bWU8eTNwKiYYLDgbDzEMO2d0eDkuZC8ffiw4JSUMPyo%3D.3ce98034~1%2C1~CA9F8C4800A2751031413F7AA1F62C1CCF882BD4~0i8c0n3~C~TRFGXhoMbW4eEUxYWxEIaBpSBx4LfRRyeh8GH00aQhEeEVwDGwphH3xyGgAGBm0aBx0CAwgaQhEeEVwBGwphH3xyGgAGC28aBx0CAwgaQhFvHxpRRF0QCQsaFEBBEQIUBwUFAAoDBwYBCg8FAwYECwkUGhFFVlwUDBFGR0xCQlVHVRoaFERXUhoMFFVUR0xDQkZTERQURldcEQJtBQMeBg0aBwAeCxQOGgJvHxpcXBEIABQUVUAQCRoPUAAGVQ4PAgUHUQlXUlZTC10PVFEBAwlXVFYCVloDAREeEVZGFAkQZFFYBQEQHxpCFAkDBQ8FBAYDBQADBwUAHxpcXREIEVkUGhFUQ1oUDBFWYFlPeX5IckIFAABGXAhbYgBfX19YdxEeEVZAFAkQdFdZUV9XE3FYVR0QHxpYV0UQCRpVFB8QQFtEFAlpCgkDGgcDAWUaFEFdEQJtFFIQHxpXFB8QUhoaFFIQHxpXFB8QUhoaFFIQbhQUX1xTEQIUUFVUVV5QQkcQHxpXXBEIEU0UGhFRWhoMFEQBHQ0YBBEeEVtQaUUQCRoPDxEeEVpSFAkQQVlYUlxfDkBeXHBWX3pRFB8QXlIUDGgDHwgaBm4eEVpaWVQQCRpXFB8QXktRFAkQUhpL~1sqnrxg%22%2C%22random%22%3A%22xhjCdlBg%22%2C%22floor_id%22%3A%2285381362%22%7D&screen=1442*3202&client=wh5&clientVersion=1.0.0&sid=&uuid=1653030824979833655680&area=",
                    // "body": "body=%7B%22activityId%22%3A%222zvwa4x1uEj4Z62dDsCxptg6jfh4%22%2C%22gridInfo%22%3A%22%22%2C%22transParam%22%3A%22%7B%5C%22bsessionId%5C%22%3A%5C%22adaa4ea0-a242-4c8c-ba9b-af3331e95c23%5C%22%2C%5C%22babelChannel%5C%22%3A%5C%22%5C%22%2C%5C%22actId%5C%22%3A%5C%2201356743%5C%22%2C%5C%22enActId%5C%22%3A%5C%222zvwa4x1uEj4Z62dDsCxptg6jfh4%5C%22%2C%5C%22pageId%5C%22%3A%5C%223954717%5C%22%2C%5C%22encryptCouponFlag%5C%22%3A%5C%221%5C%22%2C%5C%22requestChannel%5C%22%3A%5C%22h5%5C%22%2C%5C%22jdAtHomePage%5C%22%3A%5C%220%5C%22%2C%5C%22utmFlag%5C%22%3A%5C%220%5C%22%2C%5C%22locType%5C%22%3A%5C%221%5C%22%7D%22%2C%22scene%22%3A%221%22%2C%22args%22%3A%22key%3D5F8D8DE16BC9811CE24303546946056B4E54EB7F1D8ABFBE2FF089B4F8DB76A8CE5BD86BF85F0AC11662FAE666C0CB23_bingo%2CroleId%3D3EDE3A3E524CFBEC6C34EDF8130977A2814616012FD18C3926B1B28EA3B4F584D14CD7E4EC836AE526F8F755A3FF3E804E48C048321136C6BE0B58ECFF6802FDB21C716C97645C57E6F3D286661A66FF1118F8FEB268E250710C7C279E13935D299F39E69043142241AA46B868D2FF07D6B531706BEF2D94FB747007C8AB60A2752E2D1207154F5F9ADD210D4B36D8931D300AB24C4C2D1552D95C6F59E6CFC0_bingo%2CstrengthenKey%3D99DA3083614654CF2B411906BFE5B3CA67DE3A7AB08DE56A1DAC1108E9A41265E2F2BFBB4296CC21760C1F7D4ACB9EE8_bingo%22%2C%22platform%22%3A%221%22%2C%22orgType%22%3A%222%22%2C%22openId%22%3A%22-1%22%2C%22pageClickKey%22%3A%22-1%22%2C%22eid%22%3A%22QLYTVLE2ZPJOITZCGABDC6KCO4PHHZKHRCOIC7PA4AH3VI73MJLCI5VGRBL3OZUBOKQVWVWTIEI2BPHY772GBK3BBY%22%2C%22fp%22%3A%22a87b26869af5106cf30c86457f2f6cf8%22%2C%22shshshfp%22%3A%2255236c2c7968147307594c238e9c7a8f%22%2C%22shshshfpa%22%3A%2250a4dfa0-51f4-4af6-5dcc-f8286c8eb1ca-1640840556%22%2C%22shshshfpb%22%3A%22dSayOMzAz363to0mT3mlgnA%22%2C%22childActivityUrl%22%3A%22https%253A%252F%252Fpro.m.jd.com%252Fmall%252Factive%252F2zvwa4x1uEj4Z62dDsCxptg6jfh4%252Findex.html%253FforceCurrentView%253D1%2526preventPV%253D1%2526cu%253Dtrue%2526utm_source%253Dweixin%2526utm_medium%253Dweixin%2526utm_campaign%253Dt_1000072672_17053_001%2526utm_term%253D305e97c8af6a4d04ad652a853a6eab6e%2526PTAG%253D17053.1.1%22%2C%22userArea%22%3A%22-1%22%2C%22client%22%3A%22-1%22%2C%22clientVersion%22%3A%22-1%22%2C%22uuid%22%3A%22-1%22%2C%22osVersion%22%3A%22-1%22%2C%22brand%22%3A%22-1%22%2C%22model%22%3A%22-1%22%2C%22networkType%22%3A%22-1%22%2C%22jda%22%3A%22122270672.1653030824979833655680.1653030824.1673243259.1673250355.146%22%2C%22sdkToken%22%3A%22%22%2C%22token%22%3A%22HO73QAULEOKOAZ7YW6V3MHJLMBST6PK7TL2Z23OOUWGC57YP4GBF5FV7LSNMJEBYSC2CGMRNHNPXW%22%2C%22jstub%22%3A%22FBND7EZMTTIZPUMAAV2JQVPV6A34Y3QNJOWHIPPMCJJ2AZ4VBQ57VPO4HJNFJZ5LASNK6QGKYNHDUN26XVJRNNQIQM6SRSPAL4AOS7Y%22%2C%22pageClick%22%3A%22Babel_Coupon%22%2C%22couponSource%22%3A%22manual%22%2C%22couponSourceDetail%22%3A%22-100%22%2C%22channel%22%3A%22%E9%80%9A%E5%A4%A9%E5%A1%94%E4%BC%9A%E5%9C%BA%22%2C%22batchId%22%3A%22872151598%22%2C%22headArea%22%3A%22%22%2C%22couponTemplateFrom%22%3A%22%22%2C%22mitemAddrId%22%3A%22%22%2C%22geo%22%3A%7B%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D%2C%22addressId%22%3A%22%22%2C%22posLng%22%3A%22%22%2C%22posLat%22%3A%22%22%2C%22jdv%22%3A%22weixin%7Ct_1000072672_17053_001%7Cweixin%7C305e97c8af6a4d04ad652a853a6eab6e%22%2C%22focus%22%3A%22%22%2C%22innerAnchor%22%3A%22%22%2C%22cv%22%3A%222.0%22%2C%22log%22%3A%221673251539676~2VhcO8lYDFiMDFBVEJLTTk5MQ%3D%3D.cGJ1eH90ZHp4eHZtczV4djp7Pyx3FQwOM3B4dGd8bWU8eTNwKiYYLDgbDzEMO2d0eDkuZC8ffiw4JSUMPyo%3D.3ce98034~1%2C1~CF8B557BCC9408F2B22E88C80C9372CF54B2FB28~14imcyp~C~TRFBWBoDbW4ZF0xXWxEPbhpdBx4McBR9fh9yGU0VQhEZF1wMGwp4GXx1GnUFeA0VBx0FBQgVQhEZF1wOGwp7GXx1GnUFemgVBx0FBQgVQhFoGRpeRF0XDwoVFEBGFwIbBwUCBgoMBgsGDQEABwQFDAsbGhFCUFwbDBFBQUxNQlVAUxoVFERQVBoDFFVTQUxMQkZUFxQbRldbFwJiBQMZAA0VBwAZDRQBGgJoGRpTXBEPBhQbVUAXDxoAUAABUw4AAgUAVwlYUlZUDV0AVFEGBQlYVFYFUFoMAREZF1ZJFAkXYlFXBQEXGRpNFAkEAw8KBAYEAAsAAAQDGRpTXREPF1kbGhFTRVobDBFRZllAeX5PdEIKAABBWghUYgBYWV9XdxEZF1ZPFAkXcldWUV9QFXFXVR0XGRpXV0UXDxpaFB8XRltLFAluDAkMGgcEB2UVFEFaFwJiFFIXGRpYFB8XVBoVFFIXGRpYFB8XVBoVFFIXaBQbX1xUFwIbUFVTU15fQkcXGRpYXBEPF00bGhFWXBoDFEQGGw0XBBEZF1tfaUUXDxoADxEZF1pdFAkXR1lXUlxYCHN2T0dfcXVuFB8XWFIbDGgEGQgVBm4ZF1pVWVQXDxpYFB8XWEteFAkXVBpE~0hvhp05%22%2C%22random%22%3A%22KOytjDMW%22%2C%22floor_id%22%3A%2285381362%22%7D&screen=1442*3202&client=wh5&clientVersion=1.0.0&sid=&uuid=1653030824979833655680&area=",
                    "method": "POST"
                }).then(res => res.json())
                    .then(json => {
                        console.log(json)
                    });

                // await fetch("https://api.m.jd.com/client.action?functionId=newBabelAwardCollection", {
                //     "headers": {
                //         "accept": "*/*",
                //         "accept-language": "zh,zh-CN;q=0.9",
                //         "content-type": "application/x-www-form-urlencoded",
                //         "sec-fetch-dest": "empty",
                //         "sec-fetch-mode": "cors",
                //         "sec-fetch-site": "same-site",
                //         "cookie": "whwswswws=; shshshfpb=dSayOMzAz363to0mT3mlgnA; __jdu=1653030824979833655680; cn=59; TARGET_UNIT=bjcenter; b_avif=1; b_webp=1; shshshfpa=50a4dfa0-51f4-4af6-5dcc-f8286c8eb1ca-1640840556; autoOpenApp_downCloseDate_jd_homePage=1668418994642_1; autoOpenApp_downCloseDate_autoOpenApp_autoPromptly=1668419154675_1; unick=%E7%A8%8B%E5%BA%8F%E5%B7%A5%E5%8E%822%E5%8F%B7; ceshi3.com=000; _tp=NNXiCNDtKgfo%2FeBplcgtjw%3D%3D; _pst=jd_uhuavdFubDeJ; qyjr_U=N0k0Nm5RMndRV1k4aUF0eHp2TXluUT09; qyjr_P=YkM5ZGRESnpDK2prekN2TzB5eGkvZz09; pinId=OorUrskWEjq9H0b1c2xUmQ; TrackID=1b-3PThlwZsDGq9Pu6uqYlT_VNO0tgD40XiXs_5lrtA8XkD46LqgcFTze5IXEz5q-ys1vHo5MVIewO-zuOUCrCNKfQk36eBJJd5KCrvj46XA; _jdjr_qy_sid=Mmh6R3B6MzZ6TWhqOFB4bmh4cE9jbjhGMTVjTGVhM0xsY05xSndpaTI4YVZtY1ZXZGRoTU5BPT0=; __jdc=122270672; ipLoc-djd=15-1213-3038-59931; mba_muid=1653030824979833655680; unpl=JF8EAKFnNSttWB8DBh5WSxoRH15dW1hbTUQHaGNQAwlbGwBXHlVMRxh7XlVdXxRKFx9uYRRVXlNIUA4aASsSFHteVV5dD0MUCm5kNWRVUCVUSBtsGBtdBhBkXV04SicDaGMHVV9ZQlcAEwQTGxJJWlBaWgFKJwNpVwVSbWh7VTUaMhoiWyVcGV5aDEkWAW5uBlFVXkNdBxkFHxYXQlxkXF0ITxMzbA; cid=9; __jda=122270672.1653030824979833655680.1653030824.1673243259.1673250355.146; autoOpenApp_downCloseDate_auto=1673250357861_1800000; b_dh=915; b_dw=412; b_dpr=3.5; _gia_s_local_fingerprint=a87b26869af5106cf30c86457f2f6cf8; _gia_s_e_joint={\"eid\":\"QLYTVLE2ZPJOITZCGABDC6KCO4PHHZKHRCOIC7PA4AH3VI73MJLCI5VGRBL3OZUBOKQVWVWTIEI2BPHY772GBK3BBY\",\"ma\":\"\",\"im\":\"\",\"os\":\"Android 1.x\",\"ip\":\"115.198.231.213\",\"ia\":\"\",\"uu\":\"\",\"at\":\"6\"}; 3AB9D23F7A4B3C9B=QLYTVLE2ZPJOITZCGABDC6KCO4PHHZKHRCOIC7PA4AH3VI73MJLCI5VGRBL3OZUBOKQVWVWTIEI2BPHY772GBK3BBY; jcap_dvzw_fp=llFaDOtrONR4XbkL50NPyiqd3BQkyzftaQNjupEEZ4hJEV9lblv-fnGZITAVwir7Csmryg==; TrackerID=AgwbMXkUCNcrPFtX2TT3qhgkajpCbMq035rdJSBbs-1ImeShQKjuQenxCGXBASRSYiM2Ud05f0S2wAyoVTxPbvcNaW5XwH-2GRzQW94o7n7clceetGJ3hFyLbLykNXvq; pt_key=AAJju8ZVADClTaO7Y8C0z0omX8Ho-9ZB1Q_itJmmLyR8irxDBw_Zd8mpU4kUqVcxoyfBsRu3KCs; pt_pin=t142171; pt_token=8kbda6td; pwdt_id=t142171; sfstoken=tk01m0fe31e57a8sMysyKzErMngxEQpyL4fDleoqqUdoL2QVkEbhVfjnLhPOc1ADencJiVoGxId5yx6WuiY9oaWOtVqU; mba_sid=16732503552506740286731613940.4; shshshfp=55236c2c7968147307594c238e9c7a8f; __jdb=122270672.26.1653030824979833655680|146.1673250355; __jdv=122270672%7Cweixin%7Ct_1000072672_17053_001%7Cweixin%7C305e97c8af6a4d04ad652a853a6eab6e%7C1673250835827; joyytokem=babel_2zvwa4x1uEj4Z62dDsCxptg6jfh4MDFBVEJLTTk5MQ==.cGJ1eH90ZHp4eHZtczV4djp7Pyx3FQwOM3B4dGd8bWU8eTNwKiYYLDgbDzEMO2d0eDkuZC8ffiw4JSUMPyo=.3ce98034; shshshsID=87095da76726eb715132f205a140f911_13_1673250835922; __jd_ref_cls=Babel_FreeCoupon; joyya=1673250835.1673251677.40.0y83dox",
                //         "Referer": "https://pro.m.jd.com/mall/active/2zvwa4x1uEj4Z62dDsCxptg6jfh4/index.html?forceCurrentView=1&preventPV=1&cu=true&utm_source=weixin&utm_medium=weixin&utm_campaign=t_1000072672_17053_001&utm_term=305e97c8af6a4d04ad652a853a6eab6e&PTAG=17053.1.1",
                //         "Referrer-Policy": "no-referrer-when-downgrade"
                //     },
                //     "body": "body=%7B%22activityId%22%3A%222zvwa4x1uEj4Z62dDsCxptg6jfh4%22%2C%22gridInfo%22%3A%22%22%2C%22transParam%22%3A%22%7B%5C%22bsessionId%5C%22%3A%5C%22adaa4ea0-a242-4c8c-ba9b-af3331e95c23%5C%22%2C%5C%22babelChannel%5C%22%3A%5C%22%5C%22%2C%5C%22actId%5C%22%3A%5C%2201356743%5C%22%2C%5C%22enActId%5C%22%3A%5C%222zvwa4x1uEj4Z62dDsCxptg6jfh4%5C%22%2C%5C%22pageId%5C%22%3A%5C%223954717%5C%22%2C%5C%22encryptCouponFlag%5C%22%3A%5C%221%5C%22%2C%5C%22requestChannel%5C%22%3A%5C%22h5%5C%22%2C%5C%22jdAtHomePage%5C%22%3A%5C%220%5C%22%2C%5C%22utmFlag%5C%22%3A%5C%220%5C%22%2C%5C%22locType%5C%22%3A%5C%221%5C%22%7D%22%2C%22scene%22%3A%221%22%2C%22args%22%3A%22key%3D5F8D8DE16BC9811CE24303546946056B4E54EB7F1D8ABFBE2FF089B4F8DB76A8CE5BD86BF85F0AC11662FAE666C0CB23_bingo%2CroleId%3D3EDE3A3E524CFBEC6C34EDF8130977A2814616012FD18C3926B1B28EA3B4F584D14CD7E4EC836AE526F8F755A3FF3E804E48C048321136C6BE0B58ECFF6802FDB21C716C97645C57E6F3D286661A66FF1118F8FEB268E250710C7C279E13935D299F39E69043142241AA46B868D2FF07D6B531706BEF2D94FB747007C8AB60A2752E2D1207154F5F9ADD210D4B36D8931D300AB24C4C2D1552D95C6F59E6CFC0_bingo%2CstrengthenKey%3D99DA3083614654CF2B411906BFE5B3CA67DE3A7AB08DE56A1DAC1108E9A41265E2F2BFBB4296CC21760C1F7D4ACB9EE8_bingo%22%2C%22platform%22%3A%221%22%2C%22orgType%22%3A%222%22%2C%22openId%22%3A%22-1%22%2C%22pageClickKey%22%3A%22-1%22%2C%22eid%22%3A%22QLYTVLE2ZPJOITZCGABDC6KCO4PHHZKHRCOIC7PA4AH3VI73MJLCI5VGRBL3OZUBOKQVWVWTIEI2BPHY772GBK3BBY%22%2C%22fp%22%3A%22a87b26869af5106cf30c86457f2f6cf8%22%2C%22shshshfp%22%3A%2255236c2c7968147307594c238e9c7a8f%22%2C%22shshshfpa%22%3A%2250a4dfa0-51f4-4af6-5dcc-f8286c8eb1ca-1640840556%22%2C%22shshshfpb%22%3A%22dSayOMzAz363to0mT3mlgnA%22%2C%22childActivityUrl%22%3A%22https%253A%252F%252Fpro.m.jd.com%252Fmall%252Factive%252F2zvwa4x1uEj4Z62dDsCxptg6jfh4%252Findex.html%253FforceCurrentView%253D1%2526preventPV%253D1%2526cu%253Dtrue%2526utm_source%253Dweixin%2526utm_medium%253Dweixin%2526utm_campaign%253Dt_1000072672_17053_001%2526utm_term%253D305e97c8af6a4d04ad652a853a6eab6e%2526PTAG%253D17053.1.1%22%2C%22userArea%22%3A%22-1%22%2C%22client%22%3A%22-1%22%2C%22clientVersion%22%3A%22-1%22%2C%22uuid%22%3A%22-1%22%2C%22osVersion%22%3A%22-1%22%2C%22brand%22%3A%22-1%22%2C%22model%22%3A%22-1%22%2C%22networkType%22%3A%22-1%22%2C%22jda%22%3A%22122270672.1653030824979833655680.1653030824.1673243259.1673250355.146%22%2C%22sdkToken%22%3A%22%22%2C%22token%22%3A%22HO73QAULEOKOAZ7YW6V3MHJLMBST6PK7TL2Z23OOUWGC57YP4GBF5FV7LSNMJEBYSC2CGMRNHNPXW%22%2C%22jstub%22%3A%22FBND7EZMTTIZPUMAAV2JQVPV6A34Y3QNJOWHIPPMCJJ2AZ4VBQ57VPO4HJNFJZ5LASNK6QGKYNHDUN26XVJRNNQIQM6SRSPAL4AOS7Y%22%2C%22pageClick%22%3A%22Babel_Coupon%22%2C%22couponSource%22%3A%22manual%22%2C%22couponSourceDetail%22%3A%22-100%22%2C%22channel%22%3A%22%E9%80%9A%E5%A4%A9%E5%A1%94%E4%BC%9A%E5%9C%BA%22%2C%22batchId%22%3A%22872151598%22%2C%22headArea%22%3A%22%22%2C%22couponTemplateFrom%22%3A%22%22%2C%22mitemAddrId%22%3A%22%22%2C%22geo%22%3A%7B%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D%2C%22addressId%22%3A%22%22%2C%22posLng%22%3A%22%22%2C%22posLat%22%3A%22%22%2C%22jdv%22%3A%22weixin%7Ct_1000072672_17053_001%7Cweixin%7C305e97c8af6a4d04ad652a853a6eab6e%22%2C%22focus%22%3A%22%22%2C%22innerAnchor%22%3A%22%22%2C%22cv%22%3A%222.0%22%2C%22log%22%3A%221673251685162~1KC3270fQioMDFBVEJLTTk5MQ%3D%3D.cGJ1eH90ZHp4eHZtczV4djp7Pyx3FQwOM3B4dGd8bWU8eTNwKiYYLDgbDzEMO2d0eDkuZC8ffiw4JSUMPyo%3D.3ce98034~1%2C1~CA9F8C4800A2751031413F7AA1F62C1CCF882BD4~0i8c0n3~C~TRFGXhoMbW4eEUxYWxEIaBpSBx4LfRRyeh8GH00aQhEeEVwDGwphH3xyGgAGBm0aBx0CAwgaQhEeEVwBGwphH3xyGgAGC28aBx0CAwgaQhFvHxpRRF0QCQsaFEBBEQIUBwUFAAoDBwYBCg8FAwYECwkUGhFFVlwUDBFGR0xCQlVHVRoaFERXUhoMFFVUR0xDQkZTERQURldcEQJtBQMeBg0aBwAeCxQOGgJvHxpcXBEIABQUVUAQCRoPUAAGVQ4PAgUHUQlXUlZTC10PVFEBAwlXVFYCVloDAREeEVZGFAkQZFFYBQEQHxpCFAkDBQ8FBAYDBQADBwUAHxpcXREIEVkUGhFUQ1oUDBFWYFlPeX5IckIFAABGXAhbYgBfX19YdxEeEVZAFAkQdFdZUV9XE3FYVR0QHxpYV0UQCRpVFB8QQFtEFAlpCgkDGgcDAWUaFEFdEQJtFFIQHxpXFB8QUhoaFFIQHxpXFB8QUhoaFFIQbhQUX1xTEQIUUFVUVV5QQkcQHxpXXBEIEU0UGhFRWhoMFEQBHQ0YBBEeEVtQaUUQCRoPDxEeEVpSFAkQQVlYUlxfDkBeXHBWX3pRFB8QXlIUDGgDHwgaBm4eEVpaWVQQCRpXFB8QXktRFAkQUhpL~1sqnrxg%22%2C%22random%22%3A%22xhjCdlBg%22%2C%22floor_id%22%3A%2285381362%22%7D&screen=1442*3202&client=wh5&clientVersion=1.0.0&sid=&uuid=1653030824979833655680&area=",
                //     "method": "POST"
                // });
                await sleep(3000)
                // await fetch("https://api.m.jd.com/client.action", {
                //     "headers": {
                //         "Host": "api.m.jd.com",
                //         "Connection": "keep-alive",
                //         "Content-Length": "149",
                //         "Accept": "application/json, text/plain, */*",
                //         "User-Agent": "jdapp;android;11.3.2;;;appBuild/98450;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1670843471817%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJS%3D%22%2C%22ad%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%2C%22od%22%3A%22CNZrZNPvYtc4DWS1DQOzDm%3D%3D%22%2C%22ov%22%3A%22CzO%3D%22%2C%22ud%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 12; M2102K1AC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046033 Mobile Safari/537.36",
                //         "Content-Type": "application/x-www-form-urlencoded",
                //         "Origin": "https://h5.m.jd.com",
                //         "X-Requested-With": "com.jingdong.app.mall",
                //         "Sec-Fetch-Site": "same-site",
                //         "Sec-Fetch-Mode": "cors",
                //         "Sec-Fetch-Dest": "empty",
                //         "Referer": "https://h5.m.jd.com/",
                //         "Accept-Encoding": "gzip, deflate, br",
                //         "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                //         "Cookie": cookie,
                //     },
                //     "method": "POST",
                //     "body":'functionId=splitHongbao_getHomeData&appid=&area=&body={"appId":"1EFVXyw","taskToken":' + zlm + '}&client=wh5&clientVersion=1.0.0'
                // }).then(res => res.json())
                //     .then(json => {
                //         // console.log(json)
                //     });
                // for (let j = 0; j < 1000; j++) {
                //     await fetch("https://api.m.jd.com/?functionId=onePrizesPay&body={%22linkId%22:%228ARp8L7nxzN3qhXUj-hejA%22,%22drawCount%22:1,%22subActivityId%22:%2239d3777b-c12c-4c10-bdcb-eb11eefccc4d%22,%22jumpUrl%22:%22%22}&t=1671081342913&appid=activities_platform&client=android&clientVersion=3.9.0&h5st=20221215131542914%3B7808100236745906%3Bd1e24%3Btk02wc33d1cc618nSUWb5x0EAXrYYhxdqy9PuuKLUoG1BSVy7GYWtlyLGoFNhPXolMzS%2BZKJ1UUllncbhLkQuB7VNhLF%3B25152c602468ea90b37d26bfb6d4c220d635034973619793af795078386f689a%3B3.1%3B1671081342914%3B62f4d401ae05799f14989d31956d3c5f95ac49dc790ae47c6db5defda570eaab887e11b88d4e7582a29aa1f940982225df6b8b24a83a6866387d021e397a392dbd4eb906a74158857082f94a95dae20d42e1085d91590dd12196966fa92ecdceec9682c734ccb4dc01e974fd82febf963f6207dbc41c2e39f69e3aeccd11ab747cdc6ce326fce384bb3912cdbf474cf3&cthr=1&uuid=2316636666635383-5383661603831633&build=2333&screen=412*915&networkType=wifi&d_brand=Xiaomi&d_model=Mi%2011%20Pro&lang=zh_CN&osVersion=12&partner=xiaomi&eid=eidAfe878122d0s9ZtwA1lWBRQ2YzOcLWIQPpWbcAlKpDv38FReLuNhdOi0iZvHIpVGx4VRskf2XvFRkdZ6cCTPcjfajAkpFZ3Or3gS7M3GcvJhfqSZO", {
                //         "headers": {
                //             "Host": "api.m.jd.com",
                //             "Connection": "keep-alive",
                //             "Accept": "application/json, text/plain, */*",
                //             "User-Agent": "jdltapp;android;3.9.0;;;appBuild/2333;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1671081238745%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJS%3D%22%2C%22ad%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%2C%22od%22%3A%22CNZrZNPvYtc4DWS1DQOzDm%3D%3D%22%2C%22ov%22%3A%22CzO%3D%22%2C%22ud%22%3A%22CwO2ZwY2DJq1EQZrCNrrCm%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jd.jdlite%22%7D;Mozilla/5.0 (Linux; Android 12; M2102K1AC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36",
                //             "Origin": "https://h5platform.jd.com",
                //             "X-Requested-With": "com.jd.jdlite",
                //             "Sec-Fetch-Site": "same-site",
                //             "Sec-Fetch-Mode": "cors",
                //             "Sec-Fetch-Dest": "empty",
                //             "Referer": "https://h5platform.jd.com/",
                //             "Accept-Encoding": "gzip, deflate, br",
                //             "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                //             "Cookie": cookie,
                //         },
                //         "method": "GET",
                //         // "body":'functionId=splitHongbao_getLotteryResult&appid=&area=&body={"appId":"1EFVXyw","taskId":' + j + '}&client=wh5&clientVersion=1.0.0'
                //     }).then(res => res.json())
                //         .then(json => {
                //             console.log(json.data)
                //             // if(j == 1 && json.data.result && json.data.result.securityCode){
                //             //     zlm = json.data.result.securityCode;
                //             //     // console.log("助力码:" + zlm)
                //             //     console.log(json.data.result)
                //             // }else if(json.data.result){
                //             //     console.log(json.data.result)
                //             // }else {
                //             //     console.log(json.data)
                //             // }
                //         });
                //     await sleep(200)
                // }

            }catch (e){

            }
            // await sleep(5000)
        }
    }


})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}