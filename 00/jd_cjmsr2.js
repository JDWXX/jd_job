/*
超级秒杀日-抽京豆
不会用加群：212796668、681030097
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#超级秒杀日-抽京豆
55 21 * * * https://github.com/JDWXX/jd_job.git, tag=超级秒杀日-抽京豆, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "55 21 * * *" script-path=https://github.com/JDWXX/jd_job.git,tag=超级秒杀日-抽京豆
===================================Surge================================
超级秒杀日-抽京豆 = type=cron,cronexp="55 21 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_job.git
====================================小火箭=============================
超级秒杀日-抽京豆 = type=cron,script-path=https://github.com/JDWXX/jd_job.git, cronexpr="55 21 * * *", timeout=3600, enable=true
 */
const $ = new Env('超级秒杀日-抽京豆');
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
            try {
                await fetch("https://api.m.jd.com/api?client=wh5&functionId=queryInteractiveInfo&t=1667292329439&body=%7B%22encryptProjectId%22:%22vfSa4igjoruXCsJnkMS4PUL9KYe%22,%22scoreExchangeId%22:%221362%22,%22sourceCode%22:%22ace35880%22,%22ext%22:%7B%7D%7D", {
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
                        // if($.index == 1)
                        //     console.log(json.assignmentList);
                    });
                console.log("---【签到】---")
                await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667292329025&body=%7B%22encryptProjectId%22:%22vfSa4igjoruXCsJnkMS4PUL9KYe%22,%22encryptAssignmentId%22:%2243FWgzZTzKdakwQ5XzJZdMztsXnN%22,%22sourceCode%22:%22ace35880%22,%22actionType%22:0,%22ext%22:%7B%7D%7D",cookie)
                for (let j = 0; j < 6; j++) {
                    console.log("---【抽奖】---")
                    let ss = await cj("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667294616338&body=%7B%22encryptProjectId%22:%224FLTZXLXM8WE2ccsxqwhRjTxt3WX%22,%22encryptAssignmentId%22:%223ActvRwusAuYYQRzxymR7B29fwEY%22,%22sourceCode%22:%22ace35880%22,%22actionType%22:0,%22ext%22:%7B%22exchangeNum%22:1%7D%7D",cookie)
                    console.log(ss)
                    if(ss.msg == "兑换积分不足")
                        break
                }
                console.log("---【任务一 领取】---")
                await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293456877&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"4YxjVKK4BvYkYc1oMK4eAYNVsdAF\",\"sourceCode\":\"ace35880\",\"itemId\":\"6501694951\",\"actionType\":1,\"ext\":{}}",cookie)
                // await sleep(15000)
                // console.log("---【任务一 完成】---")
                // await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293484002&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"4YxjVKK4BvYkYc1oMK4eAYNVsdAF\",\"sourceCode\":\"ace35880\",\"itemId\":\"6501694951\",\"actionType\":0,\"ext\":{}}",cookie)
                // console.log("---【任务二 领取】---")
                // await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293456877&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2ee3ypJreS4EkebZgQ2RadhFnWuD\",\"sourceCode\":\"ace35880\",\"itemId\":\"9601677601\",\"actionType\":1,\"ext\":{}}",cookie)
                // await sleep(15000)
                // console.log("---【任务二 完成】---")
                // await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293484002&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2ee3ypJreS4EkebZgQ2RadhFnWuD\",\"sourceCode\":\"ace35880\",\"itemId\":\"9601677601\",\"actionType\":0,\"ext\":{}}",cookie)
                // console.log("---【任务三 领取】---")
                // await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293456877&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2VJWJM7sMrhGtKr6xcCLucbyUaVk\",\"sourceCode\":\"ace35880\",\"itemId\":\"0066693679\",\"actionType\":1,\"ext\":{}}",cookie)
                // await sleep(15000)
                // console.log("---【任务三 完成】---")
                // await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293484002&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2VJWJM7sMrhGtKr6xcCLucbyUaVk\",\"sourceCode\":\"ace35880\",\"itemId\":\"0066693679\",\"actionType\":0,\"ext\":{}}",cookie)
                // console.log("---【任务四 领取】---")
                // await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293456877&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2bd22BM2hNXF8mWuydUWBdZpK4X2\",\"sourceCode\":\"ace35880\",\"itemId\":\"1201702917\",\"actionType\":1,\"ext\":{}}",cookie)
                // await sleep(15000)
                // console.log("---【任务四 完成】---")
                // await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293484002&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2bd22BM2hNXF8mWuydUWBdZpK4X2\",\"sourceCode\":\"ace35880\",\"itemId\":\"1201702917\",\"actionType\":0,\"ext\":{}}",cookie)
            }catch (e){

            }
        }
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
            try {
                await sleep(cookiesArr.length > 15 ? 100 : 20000/cookiesArr.length)
                console.log("---【任务一 完成】---")
                await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293484002&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"4YxjVKK4BvYkYc1oMK4eAYNVsdAF\",\"sourceCode\":\"ace35880\",\"itemId\":\"6501694951\",\"actionType\":0,\"ext\":{}}",cookie)
                console.log("---【任务二 领取】---")
                await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293456877&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2ee3ypJreS4EkebZgQ2RadhFnWuD\",\"sourceCode\":\"ace35880\",\"itemId\":\"9601677601\",\"actionType\":1,\"ext\":{}}",cookie)
            }catch (e){
            }
        }
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
            try {
                await sleep(cookiesArr.length > 15 ? 100 : 20000/cookiesArr.length)
                console.log("---【任务二 完成】---")
                await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293484002&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2ee3ypJreS4EkebZgQ2RadhFnWuD\",\"sourceCode\":\"ace35880\",\"itemId\":\"9601677601\",\"actionType\":0,\"ext\":{}}",cookie)
                console.log("---【任务三 领取】---")
                await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293456877&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2VJWJM7sMrhGtKr6xcCLucbyUaVk\",\"sourceCode\":\"ace35880\",\"itemId\":\"0066693679\",\"actionType\":1,\"ext\":{}}",cookie)
            }catch (e){
            }
        }
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
            try {
                await sleep(cookiesArr.length > 15 ? 100 : 20000/cookiesArr.length)
                console.log("---【任务三 完成】---")
                await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293484002&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2VJWJM7sMrhGtKr6xcCLucbyUaVk\",\"sourceCode\":\"ace35880\",\"itemId\":\"0066693679\",\"actionType\":0,\"ext\":{}}",cookie)
                console.log("---【任务四 领取】---")
                await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293456877&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2bd22BM2hNXF8mWuydUWBdZpK4X2\",\"sourceCode\":\"ace35880\",\"itemId\":\"1201702917\",\"actionType\":1,\"ext\":{}}",cookie)
            }catch (e){
            }
        }
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
            try {
                await sleep(cookiesArr.length > 15 ? 100 : 20000/cookiesArr.length)
                console.log("---【任务四 完成】---")
                await rw("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667293484002&body={\"encryptProjectId\":\"vfSa4igjoruXCsJnkMS4PUL9KYe\",\"encryptAssignmentId\":\"2bd22BM2hNXF8mWuydUWBdZpK4X2\",\"sourceCode\":\"ace35880\",\"itemId\":\"1201702917\",\"actionType\":0,\"ext\":{}}",cookie)
            }catch (e){
            }
        }
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
            try {
                for (let j = 0; j < 6; j++) {
                    console.log("---【抽奖】---")
                    let ss = await cj("https://api.m.jd.com/api?client=wh5&functionId=doInteractiveAssignment&appid=SecKill2020&t=1667294616338&body=%7B%22encryptProjectId%22:%224FLTZXLXM8WE2ccsxqwhRjTxt3WX%22,%22encryptAssignmentId%22:%223ActvRwusAuYYQRzxymR7B29fwEY%22,%22sourceCode%22:%22ace35880%22,%22actionType%22:0,%22ext%22:%7B%22exchangeNum%22:1%7D%7D",cookie)
                    console.log(ss)
                    if(ss.msg == "兑换积分不足")
                        break
                }
            }catch (e){
            }
        }
    }

})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
async function rw(url,cookie) {
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