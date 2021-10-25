const $ = new Env('环游记助力');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const dyjCode = $.isNode() ? (process.env.dyjCode ? process.env.dyjCode : null) : null //邀请码变量，不支持多账号，格式：redEnvelopeId@markedPin
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';
//http://jd.zack.xin/sms/jd/

let secretp = ''
let inviteIdArr = []

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }


    $.newShareCodes = []
/*
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.index = i + 1;
        await getUA()
        await get_secretp()
        res = await travel_getTaskDetail()
        console.log(`\n\n助力码：${res.inviteId}\n`)
        $.newShareCodes.push(res.inviteId)
    }
*/
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.index = i + 1;
        await getUA()
        await get_secretp("ySFFHkABmK4YMs_WF5h_mlK7AlYUfCnoUOaJYnJ0")
        
        
        //await collectFriendRecordColor()
        //await travel_pk_collectPkExpandScore("PKASTT0205KkcAkhNoweSeGGl87BbCjRWnIaRzT0jeQOc")
        await travel_doDropTask("ySFFHkABmK4YMs_WF5h_mlK7AlYUfCnoUOaJYnJ0");

        await $.wait(1000)
        //if (i > 5) break;
    }



})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function open() {
    return new Promise(async (resolve) => {
        let options = taskUrl("openRedEnvelopeInteract", `{"linkId":"${$.linkid}"}`)
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function collectFriendRecordColor() {
    //RnEyxzJRaD3en9RP--s1C_ZLgEcWB5PkiRc
    let body = {"mpin":"","businessCode":"20136","assistType":"1"} 
    return new Promise(async (resolve) => {
        $.post(taskPostUrl("collectFriendRecordColor", body), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`initateCoinDozer API请求失败，请检查网路重试`)
                } else {
                    console.log(data)
                    //data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function travel_doDropTask(inviteId) {
    let body = {"ss": JSON.stringify({"extraData":{"log":"","sceneid":"HYGJZYh5"},"secretp":secretp,"random":randomNum(8)}) ,"inviteId":inviteId}
    return new Promise(async (resolve) => {
        let functionId="travel_doDropTask";
        let options = {
                url: `${JD_API_HOST}?functionId=${functionId}`,//&client=wh5
                body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0`,
                headers: {
                    'Cookie': cookie,
                    'Host': 'api.m.jd.com',
                    'Connection': 'keep-alive',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "User-Agent": $.UA,
                    'Accept-Language': 'zh-cn',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Referer':'https://wbbny.m.jd.com/',
                    'origin':'https://wbbny.m.jd.com'
            }
        }
        //taskPostUrl("travel_doDropTask", body)
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`initateCoinDozer API请求失败，请检查网路重试`)
                } else {
                    console.log(data)
                    //data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

//1634995511095~1opGaG7m4aCMDJldGNpajAxMQ%3D%3D.VEJQXVNcQVZZXVZAVhcjUkApBBIoPVcBFFRYVUVSSUYdWxRUChZYXyYNCT5dExwKGDwLLAETWjNbUi8NWEkd.cc025bd0~8%2C2~FC4C7C300E2830D6045E52A008D267865BD2B83AE3F74357A6C15E4041D026FC~1w0vtrs~C~ThVDWBtfbDgZFkNcWRMPPhVXDE4BZBtxfhVWcSgZBRkCBAEZERUfGwcDGAJmGX8uG1Z%2FAhsDGgEFVRtHG08WUQYaAGhJcSAZB31qGEQZERVuFUFTR1kVDwhJFRZGFg0QBQcGUQ4KDFYEAAQFDQ5RAlEXGBVFUVUXXxVHTRdAQVFCUxtJFRJQVRUIFldTEUNHTRZVFxsVRV0LFV9uDRsDAh0HSQQfCE8BaBsVX1NHDVQZFlRBFgsXVFUCWwFXAQcDUwkHB1MCVlICUFQBAw5VWFQMVA8HAA5HG0dbRBUIFn1cC0JLGQJVR1RfAw1HG0dBFg0DAgIBXA4GDFIFBQ4CGRsPXEcPFhofBgdWUA8CClYEVgVWVl9dVEcZFlFCVhMPR0ICDCBNX2AAQ1EMRjNbbFVIBGcaVHFUBF4WGRVZQxtfFSJaW1BeURF8C1QdG08WW1ZBFwNHDlUABwUQGBNGBkURAzgMAgQbBgBWakkXRlgQDmoXKAUDCVV%2BBAd0FxVHVgtRRlhbUBMZRwYCG08WBAcZBBdTFUkXDQcHBwMXSRUBClUHBgECBgFWBlYGBwIBGQEGVgEBClICBgEBAwFWBFMXGBUDFmwZR15cWEEOF1FRU18DURFBFhsQVVsXXxVGG08WVl4VDxsSBEsHGgMQGBNWA2hFG1kWBQYVGRsHU0cPFkVTWlVaCAoFCVQBBQcODBtJFQhfFg1pBR0FSQduFUFWWVhQFwNHBlMGAA4LAQQFUQQDCR0FU0FAdngueiNPY3p2cnxUCXVhaDd1TXpQCARLUTNNXm1qXABtV2VcXTtcVlZ0DQ4kdgFZVXZnVXNmBhhjQxNzflkGR2AjRBBvTg4LcnJSCnJnQQB3YQ9vb0AsTTxxWAJ2TF4aJ3NmcQJwTQNxdn8JdB1kBntYQ2t%2BLWJDdydHflEGQl8kTixZd3N%2FBX50Cm5VQzJtfWVQcGMtVFF%2BYGJweUhBA3tUBF4aUw4HVl8DDwFLQxsDSk9LJ0lnUTlzc2YHY383RDJjTFR9cllgBnFfaAJ3d0dkZEFdbzNjckZjXGh7I2ZQfiVmUmJmZ2AqcTRkfHVFU2BzJ3J6aDFXeHFmYGAndTBXcmFCfHdSEm9xeDZ8dGVuV34JcTdwYkRgYlZgP3VLViVyYFgKSwkBAQxWWkAQGBNYFlARA0EWSA%3D%3D~1qo4rid
function travel_pk_collectPkExpandScore(inviteId) {
    return new Promise(async (resolve) => {
        let options = {
            url: `${JD_API_HOST}?functionId=travel_pk_collectPkExpandScore`,
            body: `functionId=travel_pk_collectPkExpandScore&body={"ss":"{\"extraData\":{\"log\":\"\",\"sceneid\":\"HYGJZYh5\"},\"secretp\":\"kVdv4gJwkVsnsLiMfg\",\"random\":\"60750099\"}","inviteId":"${inviteId}"}&client=wh5&clientVersion=1.0.0`,
            headers: {
                "Origin": "https://wbbny.m.jd.com",
                "Host": "api.m.jd.com",
                "User-Agent": "jdapp;android;10.1.6;11;2363365383133353-0336231636668336;network/UNKNOWN;model/M2006J10C;addressid/3210928933;aid/26c581350c2acf8c;oaid/540e6a2cffe0dbb0;osVer/30;appBuild/90532;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; M2006J10C Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045709 Mobile Safari/537.36",
                "Cookie": cookie,
                "Referer": `https://wbbny.m.jd.com/babelDiy/Zeus/2vVU4E7JLH9gKYfLQ5EVW6eN2P7B/index.html?babelChannel=jdappsyfc&shareType=expandHelp&inviteId=${inviteId}&mpin=RnEyxzJRaD3en9RP--s1C_ZLgEcWB5PkiRc&from=sc&sid=70de6872cee442e1b430c9254358924w&un_area=22_2005_36315_36332`
            }
        }
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`initateCoinDozer API请求失败，请检查网路重试`)
                } else {
                    console.log(data)
                    //data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}


function travel_getTaskDetail() {
    let body = {};
    return new Promise((resolve) => {
        $.post(taskPostUrl("travel_getTaskDetail", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {
                                if (data.data.result.inviteId == null) {
                                    console.log("黑号")
                                    resolve("")
                                }
                                inviteIdArr.push(data.data.result.inviteId)
                                resolve(data.data.result)
                            }
                        } else {
                            console.log(`\n\nsecretp失败:${JSON.stringify(data)}\n`)
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

function get_secretp(inviteId = "") {
    let body = inviteId?{}:{"inviteId":inviteId};
    return new Promise((resolve) => {
        $.post(taskPostUrl("travel_getHomeData", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            if (data.data && data['data']['bizCode'] === 0) {
                                secretp = data.data.result.homeMainInfo.secretp

                            }
                        } else {
                            console.log(`\n\nsecretp失败:${JSON.stringify(data)}\n`)
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

function taskPostUrl(functionId, body) {
    return {
        url: `${JD_API_HOST}?functionId=${functionId}`,//&client=wh5
        body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.UA,
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }
}


function getUA() {
    $.UA = `jdapp;android;10.0.6;11;9363537336739353-2636733333439346;network/wifi;model/KB2000;addressid/138121554;aid/9657c795bc73349d;oaid/;osVer/30;appBuild/88852;partner/oppo;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; KB2000 Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36`
}

function randomString(e) {
    e = e || 32;
    let t = "abcdef0123456789",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function randomNum(e) {
    e = e || 32;
    let t = "0123456789",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
        return false;
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
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }