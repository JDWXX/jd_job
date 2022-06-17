/*
6.8-6.18 大牌联合 好物焕新季
开卡脚本,一次性脚本


第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本
————————————————
入口：[ 6.8-6.18 大牌联合 好物焕新季 ]

请求太频繁会被黑ip
过10分钟再执行

cron:20 3,6 23-31,1-20 5,6 *
============Quantumultx===============
[task_local]
#6.8-6.18 大牌联合 好物焕新季
20 3,6 23-31,1-20 5,6 * * jd_opencardL155.js, tag=6.8-6.18 大牌联合 好物焕新季, enabled=true

*/

const $ = new Env('6.8-6.18 大牌联合 好物焕新季')
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [], cookie = "", message = "";
let ownCode = null;
let authorCodeList = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
    let cookiesData = $.getdata("CookiesJD") || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map((item) => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter((item) => !!item);
}
!(async () => {
    $.getAuthorCodeListerr = false;
    if (!cookiesArr[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    authorCodeList = [
        '8f2a70046df0403f8e26d0aac47f2523',
    ];
    console.log(`入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity?activityId=dzlhkk5bd64e98a31ebbe366e45bb8`)
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            originCookie = cookiesArr[i];
            newCookie = "";
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = "";
            await checkCookie();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                continue;
            }
            $.bean = 0;
            $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
            $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            $.authorCode = authorCodeList[random(0, authorCodeList.length)];
            // $.authorCode = ownCode ? ownCode : authorCodeList[random(0, authorCodeList.length)]
            $.authorNum = `${random(1000000, 9999999)}`;
            $.randomCode = random(1000000, 9999999);
            $.activityId = "dzlhkk5bd64e98a31ebbe366e45bb8";
            $.activityShopId = "1000000866";
            $.activityUrl = `https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity/${$.authorNum}?activityId=${$.activityId}&shareUuid=${encodeURIComponent($.authorCode)}&adsource=SD&shareuserid4minipg=${encodeURIComponent($.secretPin)}&shopid=undefined&lng=00.000000&lat=00.000000&sid=&un_area=`;
            await member();
            // await $.wait(1000);
            if ($.bean > 0) {
                message += `\n【京东账号${$.index}】${$.nickName || $.UserName} \n       └ 获得 ${$.bean} 京豆。`;
            }
        }
    }
    if (message !== "") {
        if ($.isNode()) {
            await notify.sendNotify($.name, message, "", `\n`);
        } else {
            $.msg($.name, "有点儿收获", message);
        }
    }
})()
    .catch((e) => {
        $.log("", `❌ ${$.name}, 失败! 原因: ${e}!`, "");
    })
    .finally(() => {
        $.done();
    });

async function member() {
    $.token = null;
    $.secretPin = null;
    $.openCardActivityId = null;
    $.addScore = 1
    lz_cookie = {};
    await getFirstLZCK();
    await getToken();
    await task("dz/common/getSimpleActInfoVo", `activityId=${$.activityId}`, 1);
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            // console.log("去助力 -> " + $.ownCode);
            await taskaccessLog("common/accessLogWithAD", `venderId=${$.activityShopId}&code=99&pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=FLP`, 1);
            // await task("wxActionCommon/getUserInfo", `pin=${encodeURIComponent($.secretPin)}`, 1);
            if ($.index === 1) {
                await task("linkgame/activity/content", `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&pinImg=&nick=${encodeURIComponent($.pin)}&cjyxPin=&cjhyPin=&shareUuid=${encodeURIComponent($.authorCode)}`, 0, 1);
            } else {
                await task("linkgame/activity/content", `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&pinImg=&nick=${encodeURIComponent($.pin)}&cjyxPin=&cjhyPin=&shareUuid=${encodeURIComponent($.authorCode)}`);
            }
            $.log("关注店铺");
            await task("opencard/follow/shop", `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`);
            await task("taskact/common/drawContent", `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`);
            await task("linkgame/task/opencard/info", `pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}`);
            $.log("加入店铺会员");
            if ($.openCardList) {
                for (const vo of $.openCardList) {
                    // console.log(vo)
                    $.log(`>>> 去加入${vo.name} ${vo.venderId}`);
                    // await task("crm/pageVisit/insertCrmPageVisit", `venderId=1000000576&elementId=入会跳转&pageId=dzlhkk068d4d0ab8a6609723002f50&pin=${encodeURIComponent($.secretPin)}`, 1);
                    // await $.wait(500);
                    // await getFirstLZCK();
                    // await getToken();
                    if (vo.status == 0) {
                        await getShopOpenCardInfo({ venderId: `${vo.venderId}`, channel: "401" }, vo.venderId);
                        // console.log($.openCardActivityId)
                        await bindWithVender({ venderId: `${vo.venderId}`, bindByVerifyCodeFlag: 1, registerExtend: {}, writeChildFlag: 0, activityId: 2329491, channel: 401 }, vo.venderId);
                        await $.wait(500);
                    } else {
                        $.log(`>>> 已经是会员`);
                    }
                }
            } else {
                $.log("没有获取到对应的任务。\n");
            }
            await task("linkgame/checkOpenCard", `pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}`);
            console.log("去助力 -> " + $.authorCode);
            await task("linkgame/assist/status", `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&shareUuid=${$.authorCode}`);
            await task("linkgame/assist", `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&shareUuid=${$.authorCode}`);
            // await task('linkgame/help/list', `pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}`)

            // await task('linkgame/task/info', `pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}`)
            // console.log('任务 -> ')
            // await $.wait(2000)
            // await task('opencard/addCart', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`);
            // await $.wait(2000)
            // await task('linkgame/sendAllCoupon', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`);
            // await getFirstLZCK()
            // await getToken();
            // console.log('抽奖 -> ')
            // await $.wait(2000)
            // await task('linkgame/draw', `activityId=${$.activityId}&actorUuid=${$.actorUuid}&pin=${encodeURIComponent($.secretPin)}`);
            // console.log('100 -> ')
            // await getFirstLZCK()
            // await getToken();
            // await $.wait(2000)
            // await task('linkgame/draw/record', `activityId=${$.activityId}&actorUuid=${$.actorUuid}&pin=${encodeURIComponent($.secretPin)}`);
        }
    }
}

function task(function_id, body, isCommon = 0, own = 0) {
    return new Promise((resolve) => {
        $.post(taskUrl(function_id, body, isCommon), async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err);
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.result) {
                            switch (function_id) {
                                case "dz/common/getSimpleActInfoVo":
                                    $.jdActivityId = data.data.jdActivityId;
                                    $.venderId = data.data.venderId;
                                    $.activityType = data.data.activityType;
                                    // console.log($.venderId)
                                    break;
                                case "wxActionCommon/getUserInfo":
                                    break;
                                case "linkgame/activity/content":
                                    if (!data.data.hasEnd) {
                                        $.log(`开启【${data.data.activity["name"]}】活动`);
                                        $.log("-------------------");
                                        if ($.index === 1) {
                                            // ownCode = data.data.actor["actorUuid"];
                                            // authorCodeList.push(ownCode)
                                            // console.log(ownCode);
                                        }
                                        $.actorUuid = data.data.actor["actorUuid"];
                                    } else {
                                        $.log("活动已经结束");
                                    }
                                    break;
                                case "linkgame/task/opencard/info":
                                    $.openCardList = data.data.followShopList;
                                    $.openCardStatus = data.data;
                                    // console.log(data)
                                    break;
                                case "opencard/follow/shop":
                                    console.log(data);
                                    if (data.data) {
                                        $.addScore = data.data.addScore
                                    }
                                    break;
                                case "linkgame/sign":
                                    console.log(data);
                                    break;
                                case "opencard/addCart":
                                    if (data.data) {
                                        console.log(data.data);
                                    }
                                    break;
                                case "linkgame/sendAllCoupon":
                                    if (data.data) {
                                        console.log(data.data);
                                    }

                                    break;
                                case "interaction/write/writePersonInfo":
                                    console.log(data);
                                    break;
                                case "linkgame/draw":
                                    console.log(data);
                                    break;
                                case "linkgame/draw/record":
                                    console.log(data.data);
                                    break;
                                case "linkgame/assist/status":
                                    $.log(JSON.stringify(data));
                                    break;
                                case "linkgame/assist":
                                    $.log(JSON.stringify(data));
                                    break;
                                case "opencard/help/list":
                                    $.log(JSON.stringify(data));
                                    break;
                                default:
                                    // $.log(JSON.stringify(data))
                                    break;
                            }
                        } else {
                            // $.log(JSON.stringify(data))
                        }
                    } else {
                        // $.log("京东没有返回数据")
                    }
                }
            } catch (error) {
                $.log(error);
            } finally {
                resolve();
            }
        });
    });
}
function taskaccessLog(function_id, body, isCommon = 0) {
    return new Promise((resolve) => {
        $.post(taskUrl(function_id, body, isCommon), async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err);
                } else {
                    // console.log(resp);
                    if (resp["headers"]["set-cookie"]) {
                        cookie = `${originCookie};`;
                        for (let sk of resp["headers"]["set-cookie"]) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1);
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + "=" + lz_cookie[vo] + ";";
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                resolve();
            }
        });
    });
}

function getAuthorCodeList(url) {
    return new Promise((resolve) => {
        const options = {
            url: `${url}?${new Date()}`,
            timeout: 10000,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88",
            },
        };
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    // $.log(err)
                    $.getAuthorCodeListerr = false;
                } else {
                    if (data) data = JSON.parse(data);
                    $.getAuthorCodeListerr = true;
                }
            } catch (e) {
                $.logErr(e, resp);
                data = null;
            } finally {
                resolve(data);
            }
        });
    });
}

function taskUrl(function_id, body, isCommon) {
    return {
        url: isCommon ? `https://lzdz1-isv.isvjcloud.com/${function_id}` : `https://lzdz1-isv.isvjcloud.com/dingzhi/${function_id}`,
        headers: {
            Host: "lzdz1-isv.isvjcloud.com",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Accept-Language": "zh-cn",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "https://lzdz1-isv.isvjcloud.com",
            "User-Agent": `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: "keep-alive",
            Referer: $.activityUrl,
            Cookie: $.cookie,
        },
        body: body,
    };
}

function getMyPing() {
    let opt = {
        url: `https://lzdz1-isv.isvjcloud.com/customer/getMyPing`,
        headers: {
            Host: "lzdz1-isv.isvjcloud.com",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Accept-Language": "zh-cn",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "https://lzdz1-isv.isvjcloud.com",
            "User-Agent": `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: "keep-alive",
            Referer: $.activityUrl,
            Cookie: cookie,
        },
        body: `userId=${$.activityShopId}&token=${$.token}&fromType=APP&riskType=1`,
    };
    return new Promise((resolve) => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err);
                } else {
                    if (resp["headers"]["set-cookie"]) {
                        cookie = `${originCookie}`;
                        if ($.isNode()) {
                            for (let sk of resp["headers"]["set-cookie"]) {
                                cookie = `${cookie}${sk.split(";")[0]};`;
                            }
                        } else {
                            for (let ck of resp["headers"]["Set-Cookie"].split(",")) {
                                cookie = `${cookie}${ck.split(";")[0]};`;
                            }
                        }
                    }
                    if (resp["headers"]["Set-Cookie"]) {
                        cookie = `${originCookie}`;
                        if ($.isNode()) {
                            for (let sk of resp["headers"]["set-cookie"]) {
                                cookie = `${cookie}${sk.split(";")[0]};`;
                            }
                        } else {
                            for (let ck of resp["headers"]["Set-Cookie"].split(",")) {
                                cookie = `${cookie}${ck.split(";")[0]};`;
                            }
                        }
                    }
                    if (data) {
                        data = JSON.parse(data);
                        if (data.result) {
                            $.log(`你好：${data.data.nickname}`);
                            $.pin = data.data.nickname;
                            $.secretPin = data.data.secretPin;
                            cookie = `${cookie};AUTH_C_USER=${data.data.secretPin}`;
                        } else {
                            $.log(data.errorMessage);
                        }
                    } else {
                        $.log("京东返回了空数据");
                    }
                }
            } catch (error) {
                $.log(error);
            } finally {
                resolve();
            }
        });
    });
}
function getFirstLZCK() {
    return new Promise((resolve) => {
        $.get(
            {
                url: $.activityUrl,
                headers: {
                    "user-agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                },
            },
            (err, resp, data) => {
                try {
                    if (err) {
                        console.log(err);
                    } else {
                        if (resp["headers"]["set-cookie"]) {
                            cookie = `${originCookie}`;
                            if ($.isNode()) {
                                for (let sk of resp["headers"]["set-cookie"]) {
                                    cookie = `${cookie}${sk.split(";")[0]};`;
                                }
                            } else {
                                for (let ck of resp["headers"]["Set-Cookie"].split(",")) {
                                    cookie = `${cookie}${ck.split(";")[0]};`;
                                }
                            }
                        }
                        if (resp["headers"]["Set-Cookie"]) {
                            cookie = `${originCookie}`;
                            if ($.isNode()) {
                                for (let sk of resp["headers"]["set-cookie"]) {
                                    cookie = `${cookie}${sk.split(";")[0]};`;
                                }
                            } else {
                                for (let ck of resp["headers"]["Set-Cookie"].split(",")) {
                                    cookie = `${cookie}${ck.split(";")[0]};`;
                                }
                            }
                        }
                        $.cookie = cookie
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    resolve();
                }
            }
        );
    });
}
function getToken() {
    let opt = {
        url: `https://api.m.jd.com/client.action?functionId=isvObfuscator`,
        headers: {
            Host: "api.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
            "Accept-Language": "zh-Hans-CN;q=1",
            "Accept-Encoding": "gzip, deflate, br",
        },
        body: `body=%7B%22url%22%3A%20%22https%3A//lzkj-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=hjudwgohxzVu96krv&client=apple&clientVersion=9.4.0&st=1620476162000&sv=111&sign=f9d1b7e3b943b6a136d54fe4f892af05`,
    };
    return new Promise((resolve) => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err);
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code === "0") {
                            $.token = data.token;
                        }
                    } else {
                        $.log("京东返回了空数据");
                    }
                }
            } catch (error) {
                $.log(error);
            } finally {
                resolve();
            }
        });
    });
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function getUUID(format = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", UpperCase = 0) {
    return format.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        if (UpperCase) {
            uuid = v.toString(36).toUpperCase();
        } else {
            uuid = v.toString(36);
        }
        return uuid;
    });
}
function checkCookie() {
    const options = {
        url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
        headers: {
            Host: "me-api.jd.com",
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
            "Accept-Language": "zh-cn",
            Referer: "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
            "Accept-Encoding": "gzip, deflate, br",
        },
    };
    return new Promise((resolve) => {
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err);
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.retcode === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data.retcode === "0" && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        $.log("京东返回了空数据");
                    }
                }
            } catch (e) {
                $.logErr(e);
            } finally {
                resolve();
            }
        });
    });
}
// prettier-ignore
var _0xod7 = 'jsjiami.com.v6',
    _0xod7_ = ['‮_0xod7'],
    _0x1acd = [_0xod7, 'S3JTV2M=', 'TGNLbnk=', 'bG9n', 'cGFyc2U=', 'c3VjY2Vzcw==', 'cmVzdWx0', 'aW50ZXJlc3RzUnVsZUxpc3Q=', 'b3BlbkNhcmRBY3Rpdml0eUlk', 'aW50ZXJlc3RzSW5mbw==', 'YWN0aXZpdHlJZA==', 'VEVJYW8=', 'UmxmY2M=', 'cE91RkM=', 'dnZuWEM=', 'b3d2ZGU=', 'Y3pKbGg=', 'QUdYY0k=', 'T0JXUEY=', 'VWlUQ3c=', 'YmluZFdpdGhWZW5kZXI=', 'RWR6bWg=', 'UHVXbkY=', 'aHR0cHM6Ly9hcGkubS5qZC5jb20vY2xpZW50LmFjdGlvbj8=', 'R3ZuUlU=', 'RlZqS0U=', 'VG5ic0s=', 'anlGT1A=', 'fSZjaGFubmVsPTQwMSZyZXR1cm5Vcmw9', 'YUx6a1c=', 'Vmtub3Q=', 'TVloTEM=', 'bXd4RG0=', 'elZpYW4=', 'RUFJQkE=', 'SWpzYko=', 'VUtyaFU=', 'V2tiSEw=', 'TFJIakw=', 'T0NDTnc=', 'V1pzWVo=', 'V3NrcHg=', 'aVBkZXg=', 'QndlU1c=', 'eW5ZcXI=', 'cGtPdXM=', 'WmVZblg=', 'aVhNT3k=', 'bVZ3eVg=', 'UGJPQUI=', 'T3htVWY=', 'bU1Ra3Y=', 'SWJEbVE=', 'YmluZFdpdGhWZW5kZXJtZXNzYWdl', 'bWVzc2FnZQ==', 'ZW52', 'U0lHTl9VUkw=', 'YmRnc00=', 'Wkt4Sk4=', 'Y0VQcmM=', 'eEdrTG8=', 'ZEtWdmg=', 'QXhscmo=', 'OGFkZmI=', 'amRfc2hvcF9tZW1iZXI=', 'OS4yLjA=', 'amRzaWduLmNm', 'YXBwbGljYXRpb24vanNvbg==', 'dllCZEg=', 'Qk1Ga3k=', 'aXV6a1E=', 'Z0h3RXo=', 'U2VMRnE=', 'RW5Yelk=', 'UHp4cUg=', 'TlRBUVA=', 'a0VxenE=', 'alZYcHE=', 'QW1Ockk=', 'cWlCd2c=', 'Zmxvb3I=', 'bFlWeGs=', 'cmFuZG9t', 'bGVuZ3Ro', 'aHR0cHM6Ly9jZG4ubnoubHUvZ2V0aDVzdA==', 'RGZab2g=', 'WEN6bnY=', 'cG9zdA==', 'SkdJSko=', 'Y0x1WVc=', 'SmVtdkg=', 'VFNlYUY=', 'ZldmT1Q=', 'YXBwbHk=', 'ek9IdEg=', 'VFpuQmo=', 'bG9nRXJy', 'a0dBUUQ=', 'VFlHWHo=', 'YXBpLm0uamQuY29t', 'Ki8q', 'a2VlcC1hbGl2ZQ==', 'emgtY24=', 'Z3ppcCwgZGVmbGF0ZSwgYnI=', 'aHR0cHM6Ly9hcGkubS5qZC5jb20vY2xpZW50LmFjdGlvbj9hcHBpZD1qZF9zaG9wX21lbWJlciZmdW5jdGlvbklkPWdldFNob3BPcGVuQ2FyZEluZm8mYm9keT0=', 'eGRuQlI=', 'c3RyaW5naWZ5', 'JmNsaWVudD1INSZjbGllbnRWZXJzaW9uPTkuMi4wJnV1aWQ9ODg4ODg=', 'UkpFU3o=', 'bHZldng=', 'Y1hqcnA=', 'amRhcHA7aVBob25lOzkuNS40OzEzLjY7', 'VVVJRA==', 'O25ldHdvcmsvd2lmaTtBRElELw==', 'QURJRA==', 'O21vZGVsL2lQaG9uZTEwLDM7YWRkcmVzc2lkLzA7YXBwQnVpbGQvMTY3NjY4O2pkU3VwcG9ydERhcmtNb2RlLzA7TW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxM182IGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwNS4xLjE1IChLSFRNTCwgbGlrZSBHZWNrbykgTW9iaWxlLzE1RTE0ODtzdXBwb3J0SkRTSFdLLzE=', 'aWJIZHE=', 'aHR0cHM6Ly9zaG9wbWVtYmVyLm0uamQuY29tL3Nob3BjYXJkLz92ZW5kZXJJZD0=', 'fSZjaGFubmVsPTgwMSZyZXR1cm5Vcmw9', 'YWN0aXZpdHlVcmw=', 'ZUdHeng=', 'aXF4WU8=', 'YVRkemU=', 'bVRQeUc=', 'Z2V0', 'jksjEiHamidS.cTomC.v6hlEEVPuV=='];
if (function(_0x47dca4, _0x2e45a0, _0x2d0d38) {
    function _0x358c40(_0x4e0fee, _0x44d395, _0x5f1629, _0x6d2cae, _0x379df8, _0x59c1d4) {
        _0x44d395 = _0x44d395 >> 0x8, _0x379df8 = 'po';
        var _0x24e0cd = 'shift',
            _0x197297 = 'push',
            _0x59c1d4 = '‮';
        if (_0x44d395 < _0x4e0fee) {
            while (--_0x4e0fee) {
                _0x6d2cae = _0x47dca4[_0x24e0cd]();
                if (_0x44d395 === _0x4e0fee && _0x59c1d4 === '‮' && _0x59c1d4['length'] === 0x1) {
                    _0x44d395 = _0x6d2cae, _0x5f1629 = _0x47dca4[_0x379df8 + 'p']();
                } else if (_0x44d395 && _0x5f1629['replace'](/[kEHdSTChlEEVPuV=]/g, '') === _0x44d395) {
                    _0x47dca4[_0x197297](_0x6d2cae);
                }
            }
            _0x47dca4[_0x197297](_0x47dca4[_0x24e0cd]());
        }
        return 0xdaf2e;
    };
    return _0x358c40(++_0x2e45a0, _0x2d0d38) >> _0x2e45a0 ^ _0x2d0d38;
}(_0x1acd, 0x1d5, 0x1d500), _0x1acd) {
    _0xod7_ = _0x1acd['length'] ^ 0x1d5;
};

function _0x27de(_0x4ab799, _0x2148e0) {
    _0x4ab799 = ~~'0x' ['concat'](_0x4ab799['slice'](0x1));
    var _0x38aa70 = _0x1acd[_0x4ab799];
    if (_0x27de['HEabFd'] === undefined && '‮' ['length'] === 0x1) {
        (function() {
            var _0x48587b = function() {
                var _0x226fa7;
                try {
                    _0x226fa7 = Function('return (function() ' + '{}.constructor("return this")( )' + ');')();
                } catch (_0x302471) {
                    _0x226fa7 = window;
                }
                return _0x226fa7;
            };
            var _0x2dcb25 = _0x48587b();
            var _0x5d0b0e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x2dcb25['atob'] || (_0x2dcb25['atob'] = function(_0x41138d) {
                var _0x37290e = String(_0x41138d)['replace'](/=+$/, '');
                for (var _0x1da2f9 = 0x0, _0x27e844, _0x496c4d, _0x55ec30 = 0x0, _0x46993b = ''; _0x496c4d = _0x37290e['charAt'](_0x55ec30++); ~_0x496c4d && (_0x27e844 = _0x1da2f9 % 0x4 ? _0x27e844 * 0x40 + _0x496c4d : _0x496c4d, _0x1da2f9++ % 0x4) ? _0x46993b += String['fromCharCode'](0xff & _0x27e844 >> (-0x2 * _0x1da2f9 & 0x6)) : 0x0) {
                    _0x496c4d = _0x5d0b0e['indexOf'](_0x496c4d);
                }
                return _0x46993b;
            });
        }());
        _0x27de['ciicrd'] = function(_0x35e622) {
            var _0x1ca022 = atob(_0x35e622);
            var _0x460af0 = [];
            for (var _0x27de2b = 0x0, _0x1b5b31 = _0x1ca022['length']; _0x27de2b < _0x1b5b31; _0x27de2b++) {
                _0x460af0 += '%' + ('00' + _0x1ca022['charCodeAt'](_0x27de2b)['toString'](0x10))['slice'](-0x2);
            }
            return decodeURIComponent(_0x460af0);
        };
        _0x27de['qeLOEi'] = {};
        _0x27de['HEabFd'] = !![];
    }
    var _0x4e1a4f = _0x27de['qeLOEi'][_0x4ab799];
    if (_0x4e1a4f === undefined) {
        _0x38aa70 = _0x27de['ciicrd'](_0x38aa70);
        _0x27de['qeLOEi'][_0x4ab799] = _0x38aa70;
    } else {
        _0x38aa70 = _0x4e1a4f;
    }
    return _0x38aa70;
};

function getShopOpenCardInfo(_0x2dfe13, _0x2a9c59) {
    var _0x169e2b = {
        'iqxYO': function(_0x237960, _0x2865f7) {
            return _0x237960 === _0x2865f7;
        },
        'aTdze': _0x27de('‮0'),
        'mTPyG': function(_0x5db734) {
            return _0x5db734();
        },
        'xdnBR': function(_0x27ef1f, _0x2696d1) {
            return _0x27ef1f(_0x2696d1);
        },
        'RJESz': _0x27de('‫1'),
        'lvevx': _0x27de('‫2'),
        'cXjrp': _0x27de('‫3'),
        'ibHdq': _0x27de('‮4'),
        'eGGzx': _0x27de('‫5')
    };
    let _0x4540b3 = {
        'url': _0x27de('‮6') + _0x169e2b[_0x27de('‮7')](encodeURIComponent, JSON[_0x27de('‫8')](_0x2dfe13)) + _0x27de('‮9'),
        'headers': {
            'Host': _0x169e2b[_0x27de('‮a')],
            'Accept': _0x169e2b[_0x27de('‮b')],
            'Connection': _0x169e2b[_0x27de('‫c')],
            'Cookie': cookie,
            'User-Agent': _0x27de('‫d') + $[_0x27de('‫e')] + _0x27de('‫f') + $[_0x27de('‫10')] + _0x27de('‫11'),
            'Accept-Language': _0x169e2b[_0x27de('‫12')],
            'Referer': _0x27de('‮13') + _0x2a9c59 + _0x27de('‮14') + _0x169e2b[_0x27de('‮7')](encodeURIComponent, $[_0x27de('‫15')]),
            'Accept-Encoding': _0x169e2b[_0x27de('‮16')]
        }
    };
    return new Promise(_0x24d014 => {
        var _0x45d140 = {
            'KrSWc': function(_0x564cc4, _0x316683) {
                return _0x169e2b[_0x27de('‫17')](_0x564cc4, _0x316683);
            },
            'LcKny': _0x169e2b[_0x27de('‫18')],
            'TEIao': function(_0x32cebc) {
                return _0x169e2b[_0x27de('‫19')](_0x32cebc);
            }
        };
        $[_0x27de('‫1a')](_0x4540b3, (_0x497df1, _0x18ad2f, _0x1d037c) => {
            if (_0x45d140[_0x27de('‮1b')](_0x45d140[_0x27de('‮1c')], _0x45d140[_0x27de('‮1c')])) {
                try {
                    if (_0x497df1) {
                        console[_0x27de('‫1d')](_0x497df1);
                    } else {
                        res = JSON[_0x27de('‫1e')](_0x1d037c);
                        if (res[_0x27de('‮1f')]) {
                            if (res[_0x27de('‮20')][_0x27de('‮21')]) {
                                $[_0x27de('‮22')] = res[_0x27de('‮20')][_0x27de('‮21')][0x0][_0x27de('‫23')][_0x27de('‮24')];
                            }
                        }
                    }
                } catch (_0x487efd) {
                    console[_0x27de('‫1d')](_0x487efd);
                } finally {
                    _0x45d140[_0x27de('‮25')](_0x24d014);
                }
            } else {
                console[_0x27de('‫1d')](_0x497df1);
            }
        });
    });
}
async function bindWithVender(_0x4bf9aa, _0x5a230c) {
    var _0x5180ad = {
        'MYhLC': function(_0x396660) {
            return _0x396660();
        },
        'mwxDm': function(_0x4b2169, _0x405a0d) {
            return _0x4b2169 !== _0x405a0d;
        },
        'zVian': _0x27de('‫26'),
        'EAIBA': _0x27de('‫27'),
        'IjsbJ': function(_0xcf4ea9, _0x3221b8) {
            return _0xcf4ea9 === _0x3221b8;
        },
        'UKrhU': _0x27de('‫28'),
        'WkbHL': _0x27de('‫29'),
        'LRHjL': _0x27de('‮2a'),
        'OCCNw': _0x27de('‫2b'),
        'WZsYZ': _0x27de('‫2c'),
        'Wskpx': _0x27de('‮2d'),
        'Edzmh': function(_0x148959, _0x176008, _0x319ba8) {
            return _0x148959(_0x176008, _0x319ba8);
        },
        'PuWnF': _0x27de('‮2e'),
        'GvnRU': _0x27de('‫1'),
        'FVjKE': _0x27de('‫2'),
        'TnbsK': _0x27de('‫3'),
        'jyFOP': _0x27de('‮4'),
        'aLzkW': function(_0x3768db, _0x1db8ba) {
            return _0x3768db(_0x1db8ba);
        },
        'Vknot': _0x27de('‫5')
    };
    return h5st = await _0x5180ad[_0x27de('‮2f')](geth5st, _0x5180ad[_0x27de('‮30')], _0x4bf9aa), opt = {
        'url': _0x27de('‮31') + h5st,
        'headers': {
            'Host': _0x5180ad[_0x27de('‮32')],
            'Accept': _0x5180ad[_0x27de('‫33')],
            'Connection': _0x5180ad[_0x27de('‮34')],
            'Cookie': cookie,
            'User-Agent': _0x27de('‫d') + $[_0x27de('‫e')] + _0x27de('‫f') + $[_0x27de('‫10')] + _0x27de('‫11'),
            'Accept-Language': _0x5180ad[_0x27de('‫35')],
            'Referer': _0x27de('‮13') + _0x5a230c + _0x27de('‮36') + _0x5180ad[_0x27de('‮37')](encodeURIComponent, $[_0x27de('‫15')]),
            'Accept-Encoding': _0x5180ad[_0x27de('‫38')]
        }
    }, new Promise(_0x2c2848 => {

        var _0x1f470d = {
            'iPdex': function(_0x4c0bea) {
                return _0x5180ad[_0x27de('‫39')](_0x4c0bea);
            },
            'BweSW': function(_0x240905, _0x2118e5) {
                return _0x5180ad[_0x27de('‫3a')](_0x240905, _0x2118e5);
            },
            'ynYqr': _0x5180ad[_0x27de('‫3b')],
            'pkOus': _0x5180ad[_0x27de('‮3c')],
            'ZeYnX': function(_0x2ff734, _0x50b6d9) {
                return _0x5180ad[_0x27de('‮3d')](_0x2ff734, _0x50b6d9);
            },
            'iXMOy': _0x5180ad[_0x27de('‫3e')],
            'mVwyX': function(_0x43cb7f, _0x5f0fa8) {
                return _0x5180ad[_0x27de('‮3d')](_0x43cb7f, _0x5f0fa8);
            },
            'PbOAB': _0x5180ad[_0x27de('‫3f')],
            'OxmUf': _0x5180ad[_0x27de('‫40')],
            'IbDmQ': _0x5180ad[_0x27de('‫41')],
            'bdgsM': _0x5180ad[_0x27de('‫42')],
            'ZKxJN': _0x5180ad[_0x27de('‮43')]
        };
        $[_0x27de('‫1a')](opt, (_0x311afb, _0x3b7aab, _0x4c2873) => {
            var _0x53384e = {
                'mMQkv': function(_0x26e196) {
                    return _0x1f470d[_0x27de('‫44')](_0x26e196);
                }
            };
            try {
                if (_0x1f470d[_0x27de('‮45')](_0x1f470d[_0x27de('‫46')], _0x1f470d[_0x27de('‮47')])) {
                    if (_0x311afb) {
                        if (_0x1f470d[_0x27de('‫48')](_0x1f470d[_0x27de('‫49')], _0x1f470d[_0x27de('‫49')])) {
                            console[_0x27de('‫1d')](_0x311afb);
                        } else {
                            console[_0x27de('‫1d')](error);
                        }
                    } else {
                        if (_0x1f470d[_0x27de('‮4a')](_0x1f470d[_0x27de('‫4b')], _0x1f470d[_0x27de('‮4c')])) {
                            _0x53384e[_0x27de('‮4d')](_0x2c2848);
                        } else {
                            res = JSON[_0x27de('‫1e')](_0x4c2873);
                            if (res[_0x27de('‮1f')]) {
                                if (_0x1f470d[_0x27de('‮4a')](_0x1f470d[_0x27de('‫4e')], _0x1f470d[_0x27de('‫4e')])) {
                                    console[_0x27de('‫1d')](res);
                                    $[_0x27de('‫4f')] = res[_0x27de('‮50')];
                                } else {
                                    console[_0x27de('‫1d')](_0x311afb);
                                }
                            }
                        }
                    }
                } else {
                    Host = process[_0x27de('‮51')][_0x27de('‫52')];
                }
            } catch (_0x317968) {
                if (_0x1f470d[_0x27de('‮4a')](_0x1f470d[_0x27de('‮53')], _0x1f470d[_0x27de('‮53')])) {
                    console[_0x27de('‫1d')](_0x317968);
                } else {
                    $[_0x27de('‮22')] = res[_0x27de('‮20')][_0x27de('‮21')][0x0][_0x27de('‫23')][_0x27de('‮24')];
                }
            } finally {
                if (_0x1f470d[_0x27de('‮45')](_0x1f470d[_0x27de('‫54')], _0x1f470d[_0x27de('‫54')])) {
                    _0x1f470d[_0x27de('‫44')](_0x2c2848);
                } else {
                    _0x1f470d[_0x27de('‫44')](_0x2c2848);
                }
            }
        });
    });
}

function geth5st(_0x1c2dc4, _0x38bbf9) {
    var _0xad3eae = {
        'vYBdH': function(_0xb6682a, _0x1dbeb1) {
            return _0xb6682a === _0x1dbeb1;
        },
        'BMFky': _0x27de('‮55'),
        'iuzkQ': function(_0x521e0c, _0x1ffbd9) {
            return _0x521e0c !== _0x1ffbd9;
        },
        'gHwEz': _0x27de('‮56'),
        'SeLFq': _0x27de('‮57'),
        'EnXzY': function(_0x4fa54e, _0x1f1dc2) {
            return _0x4fa54e === _0x1f1dc2;
        },
        'PzxqH': _0x27de('‮58'),
        'NTAQP': function(_0x3fd51b, _0x32a444) {
            return _0x3fd51b(_0x32a444);
        },
        'kEqzq': _0x27de('‫59'),
        'jVXpq': _0x27de('‫5a'),
        'AmNrI': _0x27de('‮5b'),
        'qiBwg': _0x27de('‫5c'),
        'lYVxk': function(_0x2a05e2, _0x15824) {
            return _0x2a05e2 * _0x15824;
        },
        'DfZoh': _0x27de('‫5d'),
        'XCznv': function(_0x46d10b, _0x5b5da1) {
            return _0x46d10b * _0x5b5da1;
        }
    };
    return new Promise(async _0x573221 => {
        var _0x1c0efb = {
            'JGIJJ': function(_0x30195c, _0x3fe97e) {
                return _0xad3eae[_0x27de('‮5e')](_0x30195c, _0x3fe97e);
            },
            'cLuYW': _0xad3eae[_0x27de('‫5f')],
            'JemvH': function(_0x41b061, _0x2c0980) {
                return _0xad3eae[_0x27de('‫60')](_0x41b061, _0x2c0980);
            },
            'TSeaF': _0xad3eae[_0x27de('‫61')],
            'fWfOT': _0xad3eae[_0x27de('‮62')],
            'zOHtH': function(_0x1029f8, _0x21337a) {
                return _0xad3eae[_0x27de('‮63')](_0x1029f8, _0x21337a);
            },
            'TZnBj': _0xad3eae[_0x27de('‫64')],
            'kGAQD': function(_0x1b9d1f, _0x3ee921) {
                return _0xad3eae[_0x27de('‫65')](_0x1b9d1f, _0x3ee921);
            }
        };
        let _0x23db17 = {
            'appId': _0xad3eae[_0x27de('‫66')],
            'body': {
                'appid': _0xad3eae[_0x27de('‫67')],
                'functionId': _0x1c2dc4,
                'body': JSON[_0x27de('‫8')](_0x38bbf9),
                'clientVersion': _0xad3eae[_0x27de('‫68')],
                'client': 'H5',
                'activityId': $[_0x27de('‮24')]
            },
            'callbackAll': !![]
        };
        let _0x2402da = '';
        let _0x25911c = [_0xad3eae[_0x27de('‮69')]];
        if (process[_0x27de('‮51')][_0x27de('‫52')]) {
            _0x2402da = process[_0x27de('‮51')][_0x27de('‫52')];
        } else {
            _0x2402da = _0x25911c[Math[_0x27de('‫6a')](_0xad3eae[_0x27de('‫6b')](Math[_0x27de('‫6c')](), _0x25911c[_0x27de('‮6d')]))];
        }
        let _0x5f5ad9 = {
            'url': _0x27de('‮6e'),
            'body': JSON[_0x27de('‫8')](_0x23db17),
            'headers': {
                'Host': _0x2402da,
                'Content-Type': _0xad3eae[_0x27de('‮6f')]
            },
            'timeout': _0xad3eae[_0x27de('‫70')](0x1e, 0x3e8)
        };
        $[_0x27de('‮71')](_0x5f5ad9, async(_0x4a1749, _0x300e08, _0x23db17) => {
            if (_0x1c0efb[_0x27de('‫72')](_0x1c0efb[_0x27de('‫73')], _0x1c0efb[_0x27de('‫73')])) {
                try {
                    if (_0x4a1749) {
                        if (_0x1c0efb[_0x27de('‮74')](_0x1c0efb[_0x27de('‮75')], _0x1c0efb[_0x27de('‮76')])) {
                            _0x23db17 = await geth5st[_0x27de('‮77')](this, arguments);
                        } else {
                            if (res[_0x27de('‮20')][_0x27de('‮21')]) {
                                $[_0x27de('‮22')] = res[_0x27de('‮20')][_0x27de('‮21')][0x0][_0x27de('‫23')][_0x27de('‮24')];
                            }
                        }
                    } else {}
                } catch (_0x580180) {
                    if (_0x1c0efb[_0x27de('‫78')](_0x1c0efb[_0x27de('‮79')], _0x1c0efb[_0x27de('‮79')])) {
                        $[_0x27de('‫7a')](_0x580180, _0x300e08);
                    } else {
                        if (_0x4a1749) {
                            console[_0x27de('‫1d')](_0x4a1749);
                        } else {
                            res = JSON[_0x27de('‫1e')](_0x23db17);
                            if (res[_0x27de('‮1f')]) {
                                console[_0x27de('‫1d')](res);
                                $[_0x27de('‫4f')] = res[_0x27de('‮50')];
                            }
                        }
                    }
                } finally {
                    _0x1c0efb[_0x27de('‫7b')](_0x573221, _0x23db17);
                }
            } else {
                res = JSON[_0x27de('‫1e')](_0x23db17);
                if (res[_0x27de('‮1f')]) {
                    console[_0x27de('‫1d')](res);
                    $[_0x27de('‫4f')] = res[_0x27de('‮50')];
                }
            }
        });
    });
};
_0xod7 = 'jsjiami.com.v6';
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
