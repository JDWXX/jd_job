/*
APP:https://marketing.dfcfs.com/views/annualactjump/sharein123?shareid=fe9a9cf6e23541abaed679f732bb6eb4&appfenxiang=1
左上角点头像 活动中心跳一跳
关键域名：请求连接 http://msgcnt.eastmoney.com/msgcenter/my/getallbadges 这后面就是uid
关键域名:mkapi2.dfcfs.com 请求头里
ct GTOKEN ut EM-MD Cookie等信息都在请求头
变量
export dfcfhd='uid&ct&GTOKEN&ut&EM-MD&Cookie'
多号@或换行
cron 0 0 * * * dfcf.js
*/
const $ = new Env('东方财富跳一跳');
const axios = require('axios');
let CryptoJS = require('crypto-js')
let request = require("request");
request = request.defaults({
    jar: true
});
const {
    log
} = console;
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
let dfcfhd = ($.isNode() ? process.env.dfcfhd : $.getdata("dfcfhd")) || ""
let dfcfhdArr = [];
let data = '';
let msg = '';
var hours = new Date().getMonth();

var timestamp = Math.round(new Date().getTime()).toString();
!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite();
    } else {
        if (!(await Envs()))
            return;
        else {

            log(`\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000).toLocaleString()} \n=============================================\n`);



            log(`\n============ 微信公众号：柠檬玩机交流 ============`)
            log(`\n=================== 共找到 ${dfcfhdArr.length} 个账号 ===================`)
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${dfcfhdArr}`);
            }
            for (let index = 0; index < dfcfhdArr.length; index++) {

                let num = index + 1
                addNotifyStr(`\n==== 开始【第 ${num} 个账号】====\n`, true)

                dfcfhd = dfcfhdArr[index];
                uid =  dfcfhd.split('&')[0]
                ct = dfcfhd.split('&')[1]
                gtoken = dfcfhd.split('&')[2]
                ut = dfcfhd.split('&')[3]
                emmd = dfcfhd.split('&')[4]
                cookie = dfcfhd.split('&')[5]

                await share()
                await ActivityTask()
                await getUserActivityInfo()
                if (userPoint > 0){
                    for(let i =0;i < userPoint;i++){
                        await createGame()
                        await finishGame()
                    }
                }
                await withdraw()
            }
            await SendMsg(msg);
        }
    }
})()
    .catch((e) => log(e))
    .finally(() => $.done())
async function createGame() {
    return new Promise((resolve) => {
        var options = {
            method: 'POST',
            url: 'https://mkapi2.dfcfs.com/upgame/api/in/game/createGame',
            headers: {
                Host: 'mkapi2.dfcfs.com',
                Connection: 'keep-alive',
                'Sec-Fetch-Mode': 'cors',
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                Appkey: 'EIBnBlYuvK',
                'EM-VER': '10.5.1',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=154049263;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                ct: ct,
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                hasSecurities: 'false',
                haslogin: 'true',
                'Content-Type': 'application/json;charset=UTF-8',
                ut: ut,
                'EM-MD': emmd,
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'same-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/jump',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                Cookie: cookie,
                'Cache-Control': 'no-cache',
                'Accept-Encoding': 'gzip, deflate',
            },
            data:{"start":"1","end":"80"}
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.status == 0) {
                    gameId = data.data.gameId
                    uidList = data.data.uidList
                    stockList = data.data.stockList
                    rewardHeightList = data.data.rewardHeightList
                    log('gameId:'+data.data.gameId)
                    await addGameTask()

                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function addGameTask() {
    return new Promise((resolve) => {
        var options = {
            method: 'POST',
            url: 'https://mkapi2.dfcfs.com/upgame/api/in/game/addGameTask',
            headers: {
                Host: 'mkapi2.dfcfs.com',
                Connection: 'keep-alive',
                'Sec-Fetch-Mode': 'cors',
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                Appkey: 'EIBnBlYuvK',
                'EM-VER': '10.5.1',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=154049263;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                ct: ct,
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                hasSecurities: 'false',
                haslogin: 'true',
                'Content-Type': 'application/json;charset=UTF-8',
                ut: ut,
                'EM-MD': emmd,
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'same-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/jump',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                Cookie: cookie,
                'Cache-Control': 'no-cache',
                'Accept-Encoding': 'gzip, deflate',
            },
            data:`{"gameId":"${gameId}","uidList":["6732306140678198","6073396357519808","7428111481466798"],"stockList":["SZ159967","150.006229","150.014766","150.004235","150.001942","150.005505","150.002662","150.163407","150.007449","SH512670","SZ159628","150.016789","150.519704","150.004075","150.008734","150.000828","150.162202","150.162212","150.008923","150.014425","150.012651","150.006075","150.003413","150.004010","150.013081","150.000209","150.001338","150.008810","150.519026","150.002083","150.001294","SH560900","150.377150","150.007549","150.010728","150.001717","150.014377","SH600186"]}`
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.status == 0) {
                    log(data.message)
                    for(code of rewardHeightList){
                        await createReward(code)
                        await $.wait(3000)
                    }
                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function createReward(a) {
    return new Promise((resolve) => {
        var options = {
            method: 'POST',
            url: 'https://mkapi2.dfcfs.com/upgame/api/in/reward/createReward',
            headers: {
                Host: 'mkapi2.dfcfs.com',
                Connection: 'keep-alive',
                'Sec-Fetch-Mode': 'cors',
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                Appkey: 'EIBnBlYuvK',
                'EM-VER': '10.5.1',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=154049263;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                ct: ct,
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                hasSecurities: 'false',
                haslogin: 'true',
                'Content-Type': 'application/json;charset=UTF-8',
                ut: ut,
                'EM-MD': emmd,
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'same-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/jump',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                // Cookie: cookie,
                'Cache-Control': 'no-cache',
                'Accept-Encoding': 'gzip, deflate',
            },
            data:`{"gameId":"${gameId}","start":${a},"end":${a}}`
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.status == 0) {
                    if(data.message == 'ok' && data.data){
                        rewardId = data.data[0].rewardId
                        taskId = data.data[0].taskId
                        userRewardId = data.data[0].userRewardId
                        log(data.data[0].title)
                        await receiveReward()
                    }
                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function receiveReward() {
    return new Promise((resolve) => {
        signs = `{"gameId":"${gameId}","taskId":"${taskId}","userRewardId":"${userRewardId}","rewardId":"${rewardId}"}`
        var body = ["xa%$bshd", "njag#gys", "iu%gda1d", "cnjsk!gs", "bhjksdsz"]
        key = CryptoJS.enc.Utf8.parse(body[timestamp % 0x5]+uid+timestamp)
        iv = CryptoJS.enc.Utf8.parse(body[timestamp % 0x5])
        sign = Encrypt(signs,key,iv)
        var options = {
            method: 'POST',
            url: 'https://mkapi2.dfcfs.com/upgame/api/in/reward/receiveReward',
            headers: {
                Host: 'mkapi2.dfcfs.com',
                Connection: 'keep-alive',
                'Sec-Fetch-Mode': 'cors',
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                Appkey: 'EIBnBlYuvK',
                'EM-VER': '10.5.1',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=154049263;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                ct: ct,
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                hasSecurities: 'false',
                haslogin: 'true',
                'Content-Type': 'application/json;charset=UTF-8',
                ut: ut,
                'EM-MD': emmd,
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'same-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/jump',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                Cookie: cookie,
                'Cache-Control': 'no-cache',
                'Accept-Encoding': 'gzip, deflate',
            },
            data:`{"st":${timestamp},"sign":"${sign}"}`
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.status == 0) {
                    log(data.message)

                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function finishGame() {
    return new Promise((resolve) => {
        signs = `{"gameId":"${gameId}","endFlag":"1","gameResult":"500"}`
        var body = ["xa%$bshd", "njag#gys", "iu%gda1d", "cnjsk!gs", "bhjksdsz"]
        key = CryptoJS.enc.Utf8.parse(body[timestamp % 0x5]+uid+timestamp)
        iv = CryptoJS.enc.Utf8.parse(body[timestamp % 0x5])
        sign = Encrypt(signs,key,iv)
        var options = {
            method: 'POST',
            url: 'https://mkapi2.dfcfs.com/upgame/api/in/game/finishGame',
            headers: {
                Host: 'mkapi2.dfcfs.com',
                Connection: 'keep-alive',
                'Sec-Fetch-Mode': 'cors',
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                Appkey: 'EIBnBlYuvK',
                'EM-VER': '10.5.1',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=154049263;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                ct: ct,
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                hasSecurities: 'false',
                haslogin: 'true',
                'Content-Type': 'application/json;charset=UTF-8',
                ut: ut,
                'EM-MD': emmd,
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'same-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/jump',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                Cookie: cookie,
                'Cache-Control': 'no-cache',
                'Accept-Encoding': 'gzip, deflate',
            },
            data:`{"st":${timestamp},"sign":"${sign}"}`
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.status == 0) {
                    log(data.message)
                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function ActivityTask() {
    return new Promise((resolve) => {

        var options = {
            method: 'GET',
            url: 'https://empointcpf.eastmoney.com:9001/ActivityTask/getUserActivityList?activityCode=pjump',
            headers: {
                Host: 'empointcpf.eastmoney.com:9001',
                Connection: 'keep-alive',
                'Sec-Fetch-Mode': 'cors',
                UToken: ut,
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=64572074;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                'EM-VER': '10.5.1',
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                CToken: ct,
                'EM-MD': emmd,
                Appkey: 'EIBnBlYuvK',
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'cross-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/maintain',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept-Encoding': 'gzip, deflate',
                Cookie: cookie,
            },

        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.result == 1) {
                    list = data.data
                    for(s in list){
                        await FinishActivity(list[s].TaskStrategy.TaskID)
                    }
                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${JSON.stringify(response.data)}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function FinishActivity(a) {
    return new Promise((resolve) => {

        var options = {
            method: 'POST',
            url: 'https://empointcpf.eastmoney.com:9001/ActivityTask/FinishActivity',
            headers: {
                Host: 'empointcpf.eastmoney.com:9001',
                Connection: 'keep-alive',
                'Sec-Fetch-Mode': 'cors',
                UToken: ut,
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=64572074;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                'EM-VER': '10.5.1',
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                CToken: ct,
                'EM-MD': emmd,
                'Content-Type': 'application/json;charset=UTF-8',
                Appkey: 'EIBnBlYuvK',
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'cross-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/maintain',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cache-Control': 'no-cache',
                'Accept-Encoding': 'gzip, deflate',
            },
            data:{"TaskId":a}
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.result == 1) {
                    log('result:'+data.result)
                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function getUserActivityInfo() {
    return new Promise((resolve) => {

        var options = {
            method: 'POST',
            url: 'https://mkapi2.dfcfs.com/upgame/api/in/activity/getUserActivityInfo',
            headers: {
                Host: 'mkapi2.dfcfs.com',
                Connection: 'keep-alive',
                ct: ct,
                'Sec-Fetch-Mode': 'cors',
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                Appkey: 'EIBnBlYuvK',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=64572074;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                'EM-VER': '10.5.1',
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                hasSecurities: 'false',
                ut: ut,
                haslogin: 'true',
                'EM-MD': emmd,
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'same-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/maintain',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                Cookie: cookie,
                'Accept-Encoding': 'gzip, deflate',
            },
            data:``
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.status == 0) {
                    log('totalGameResult:'+data.data.totalGameResult)
                    log('gameRank:'+data.data.gameRank)
                    userPoint = data.data.userPoint
                    log('userPoint:'+data.data.userPoint)
                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function share() {
    return new Promise((resolve) => {

        var options = {
            method: 'POST',
            url: 'https://mkapi2.dfcfs.com/upgame/api/in/share',
            headers: {
                Host: 'mkapi2.dfcfs.com',
                Connection: 'keep-alive',
                ct: ct,
                'Sec-Fetch-Mode': 'cors',
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                Appkey: 'EIBnBlYuvK',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=64572074;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                'EM-VER': '10.5.1',
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                hasSecurities: 'false',
                ut: ut,
                haslogin: 'true',
                'EM-MD': emmd,
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'same-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/maintain',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                Cookie: cookie,
                'Accept-Encoding': 'gzip, deflate',
            },
            data:``
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.status == 0) {
                    log(data.message)

                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function withdraw() {
    return new Promise((resolve) => {

        var options = {
            method: 'POST',
            url: 'https://mkapi2.dfcfs.com/upgame/api/in/reward/withdraw',
            headers: {
                Host: 'mkapi2.dfcfs.com',
                Connection: 'keep-alive',
                ct: ct,
                'Sec-Fetch-Mode': 'cors',
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                Appkey: 'EIBnBlYuvK',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=64572074;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                'EM-VER': '10.5.1',
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                hasSecurities: 'false',
                ut: ut,
                haslogin: 'true',
                'EM-MD': emmd,
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'same-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/maintain',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                Cookie: cookie,
                'Accept-Encoding': 'gzip, deflate',
            },
            data:``
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.status == 0) {
                    log(data.message)
                    msg += data.message
                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function getRewardList() {
    return new Promise((resolve) => {

        var options = {
            method: 'POST',
            url: 'https://mkapi2.dfcfs.com/upgame/api/in/reward/getRewardList',
            headers: {
                Host: 'mkapi2.dfcfs.com',
                Connection: 'keep-alive',
                ct: ct,
                'Sec-Fetch-Mode': 'cors',
                Origin: 'https://marketing.dfcfs.com',
                'EM-OS': 'OPPO PCAM00 10',
                Appkey: 'EIBnBlYuvK',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36;eastmoney_android;color=w;pkg=com.eastmoney.android.berlin;appver=10.5.1;tag=64572074;statusBarHeight=32.0;titleBarHeight=45.0;density=3.0;androidsdkversion=29;fontsize=3;listFontSize=1;adaptAgedSwitch=0',
                'EM-VER': '10.5.1',
                GToken: gtoken,
                Accept: 'application/json, text/plain, */*',
                hasSecurities: 'false',
                ut: ut,
                haslogin: 'true',
                'EM-MD': emmd,
                'X-Requested-With': 'com.eastmoney.android.berlin',
                'Sec-Fetch-Site': 'same-site',
                Referer: 'https://marketing.dfcfs.com/views/annualactjump/maintain',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                Cookie: cookie,
                'Accept-Encoding': 'gzip, deflate',
            },
            data:``
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                if (data.status == 0) {
                    log('rewardAmount:'+data.data.rewardAmount)
                    log('totalPoint:'+data.data.totalPoint)
                    log('totalRewardAmount:'+data.data.totalRewardAmount)
                    msg += '\nrewardAmount:'+data.data.rewardAmount+'\ntotalPoint:'+data.data.totalPoint+'\ntotalRewardAmount:'+data.data.totalRewardAmount
                } else
                    log(data.message)



            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
function Encrypt(word,keys,ivs) {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.DES.encrypt(srcs, keys, {
        iv: ivs,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
async function Envs() {
    if (dfcfhd) {
        if (dfcfhd.indexOf("@") != -1) {
            dfcfhd.split("@").forEach((item) => {

                dfcfhdArr.push(item);
            });
        } else if (dfcfhd.indexOf("\n") != -1) {
            dfcfhd.split("\n").forEach((item) => {
                dfcfhdArr.push(item);
            });
        } else {
            dfcfhdArr.push(dfcfhd);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 dfcfhd`)
        return;
    }

    return true;
}
function addNotifyStr(str, is_log = true) {
    if (is_log) {
        log(`${str}\n`)
    }
    msg += `${str}\n`
}

// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        log(message);
    }
}
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}