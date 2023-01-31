/*
团圆红包开红包
入口：京东极速版》团圆红包
不会用加群：212796668、681030097、743744614
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#团圆红包开红包
0 40 1,6 * * * https://github.com/JDWXX/jd_job.git, tag=团圆红包开红包, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "0 40 1,6 * * *" script-path=https://github.com/JDWXX/jd_job.git,tag=团圆红包开红包
===================================Surge================================
团圆红包开红包 = type=cron,cronexp="0 40 1,6 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_job.git
====================================小火箭=============================
团圆红包开红包 = type=cron,script-path=https://github.com/JDWXX/jd_job.git, cronexpr="0 40 1,6 * * *", timeout=3600, enable=true
 */
const $ = new Env("团圆红包开红包");
var __encode = 'jsjiami.com',
    _a = {},
    _0xb483 = ["_decode", "http://www.sojson.com/javascriptobfuscator.html"];
(function(_0xd642x1) {
    _0xd642x1[_0xb483[0]] = _0xb483[1]
})(_a);
var __Oxf3d21 = ["isNode", "./sendNotify", "", "./jdCookie", "./function/krgetToken", "krtyhot", "push", "forEach", "keys", "JD_DEBUG", "env", "false", "log", "filter", "CookieJD", "getdata", "CookieJD2", "cookie", "map", "CookiesJD", "[]", "done", "finally", "❌ ", "name", ", 失败! 原因: ", "!", "catch", "【提示】请先获取京东账号一cookie 直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", "msg", "krtycode", "@", "split", "http://code.kingran.ga/tyzl.json", "authorCode", "length", "shareId", "未设置助力码变量，变量：export krtycode='''，本次运行不会助力，仅获取助力码", "UserName", "match", "index", "isLogin", "nickName", "jdpingou;iPhone;4.13.0;14.4.2;", ";network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/", "random", ";pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "******开始【京东账号", "】", "******", "【提示】cookie已失效", "京东账号", " ", "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", "cookie已失效 - ", "\n请重新登录获取cookie", "sendNotify", "wait", "CK1默认去助力作者", "https://api.m.jd.com/api?g_ty=h5&g_tk=&appCode=ms2362fc9e&body=%7B%22activeId%22%3A%2263bfbb5552b9e4602f8dd1e0%22%2C%22shareId%22%3A%22", "%22%2C%22itemId%22%3A%22S-vx3Qh8e9A%22%7D&appid=cs_h5&client=cs_h5&functionId=festivalhb_help&clientVersion=1.0&h5st=20230117234208044%3B8399674437320856%3B38c56%3Btk02wa77c1b1f18nVheVcKPli3c1UJi8jjBlJOkw3ZyuX1lcmpTt098ftG80v7SiGRD0JhW%2Fd9vX8%2BOoXAlMBU1%2F%2BOYG%3B0e95b3aa0d8dc70332f1be273e50fb6f3b016a6b04f854d8b7bf623c149e4442%3B3.1%3B1673970128044%3B7414c4e56278580a133b60b72a30beb2764d2e61c66a5620e8e838e06644d1bf09a2adda77e27b81a11139bb7385a14230e5df7abbca5a5103be98c29ef17d4ed322ea46a73415edc642eeeeb0b4772fdbf1981d26f27029318287b099d0e15e7d6cf74722ccd2840781d7257ebc2f90300a79f5293172aee01eab2c36ce073a&loginType=2&sceneval=2", "https://wqs.jd.com/promote/2023/spring2023/index.html?activeId=63bfbb5552b9e4602f8dd1e0&shareId=85_121_70_72_84_113_50_113_110_82_72_101_122_107_66_66_47_114_109_111_73_81_61_61&itemId=S-vx3Qh8e9A&source=3&jxsid=16738848624375081522&appCode=ms2362fc9e&lng=106.476362&lat=29.502736&sid=af76a8076d1db5dcf12add14ae2bfcaw&un_area=4_50950_50957_0", "https://wqs.jd.com", "jdltapp;iPhone;3.9.0;;;M/5.0;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;hasOCPay/0;appBuild/1157;supportBestPay/0;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22YWS5ZwY5ENOmDQDrCWGmZJu2DtDwZJOyYtcmDWDrCNGmYWYyCtZvYm%3D%3D%22%2C%22sv%22%3A%22CJGkEK%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A1673970095%2C%22hdid%22%3A%22u%5C%2FKUchaNHUK4XWvXbc%5C%2FulPKSTuxbqgnDaszTT5LHaRU%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.jd.jdmobilelite%22%2C%22ridx%22%3A1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;", "cid=3", "parse", "去助力 → ", "code", "success", "✅ 助力成功", "好友红包已被领光了", "✅ 助力已满", "活动火爆", "不多说了，乌漆嘛黑", "logErr", "get", "https://api.m.jd.com/api?g_ty=h5&g_tk=&appCode=ms2362fc9e&body=%7B%22activeId%22%3A%2263bfbb5552b9e4602f8dd1e0%22%7D&appid=cs_h5&client=cs_h5&functionId=festivalhb_home&clientVersion=1.0&h5st=20230117234205947%3B8399674437320856%3B38c56%3Btk02wa77c1b1f18nVheVcKPli3c1UJi8jjBlJOkw3ZyuX1lcmpTt098ftG80v7SiGRD0JhW%2Fd9vX8%2BOoXAlMBU1%2F%2BOYG%3Baef92602dc3fbf3e2b3571a92de69bb6d50d8f59d3332bd252642c6fec1f9de1%3B3.1%3B1673970125947%3B7414c4e56278580a133b60b72a30beb2764d2e61c66a5620e8e838e06644d1bf09a2adda77e27b81a11139bb7385a14230e5df7abbca5a5103be98c29ef17d4ed322ea46a73415edc642eeeeb0b4772fdbf1981d26f27029318287b099d0e15e7d6cf74722ccd2840781d7257ebc2f90300a79f5293172aee01eab2c36ce073a&loginType=2&sceneval=2", "data", "【助力码】", "0123456789abcdef", "floor", "charAt", "string", "请勿随意在BoxJs输入框修改内容建议通过脚本去获取cookie", "?", "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88", "getAuthorCodeListerr", "undefined", "删除", "版本号，js会定", "期弹窗，", "还请支持我们的工作", "jsjia", "mi.com"];
const notify = $[__Oxf3d21[0x0]]() ? require(__Oxf3d21[0x1]) : __Oxf3d21[0x2];
const jdCookieNode = $[__Oxf3d21[0x0]]() ? require(__Oxf3d21[0x3]) : __Oxf3d21[0x2];
let cookiesArr = [],
    cookie = __Oxf3d21[0x2],
    message;
let shareCodesArr = [];
let sxzlcsArr = [];
let helpTimesArr = [];
let UA, UAInfo = {};
let cgcs = 0;
let dqz = 0;
let 提现金额 = 0;
$[__Oxf3d21[0x5]] = false;
if ($[__Oxf3d21[0x0]]()) {
    Object[__Oxf3d21[0x8]](jdCookieNode)[__Oxf3d21[0x7]]((_0xc929xc) => {
        cookiesArr[__Oxf3d21[0x6]](jdCookieNode[_0xc929xc])
    });
    if (process[__Oxf3d21[0xa]][__Oxf3d21[0x9]] && process[__Oxf3d21[0xa]][__Oxf3d21[0x9]] === __Oxf3d21[0xb]) {
        console[__Oxf3d21[0xc]] = () => {}
    }
} else {
    cookiesArr = [$[__Oxf3d21[0xf]](__Oxf3d21[0xe]), $[__Oxf3d21[0xf]](__Oxf3d21[0x10]), ...jsonParse($[__Oxf3d21[0xf]](__Oxf3d21[0x13]) || __Oxf3d21[0x14])[__Oxf3d21[0x12]]((_0xc929xc) => {
        return _0xc929xc[__Oxf3d21[0x11]]
    })][__Oxf3d21[0xd]]((_0xc929xc) => {
        return !!_0xc929xc
    })
};
!(async() => {
    if (!cookiesArr[0x0]) {
        $[__Oxf3d21[0x1e]]($[__Oxf3d21[0x18]], __Oxf3d21[0x1c], __Oxf3d21[0x1d], {
            "open-url": __Oxf3d21[0x1d]
        });
        return
    };
    if (process[__Oxf3d21[0xa]][__Oxf3d21[0x1f]]) {
        shareCodesArr = process[__Oxf3d21[0xa]][__Oxf3d21[0x1f]][__Oxf3d21[0x21]](__Oxf3d21[0x20])
    };
    let qs = parseInt(cookiesArr[__Oxf3d21[0x24]] / 10)
    qs = qs > 1 ? qs : 1;
    console.log("-------------读取前【" + qs + "】位账号助力码----------------\n")
    // if (shareCodesArr[__Oxf3d21[0x24]] == 0) {
    //     for (let _0xc929xe = 0; _0xc929xe < qs; _0xc929xe++) {
    //         if (cookiesArr[_0xc929xe]) {
    //             cookie = cookiesArr[_0xc929xe];
    //             $[__Oxf3d21[0x27]] = decodeURIComponent(cookie[__Oxf3d21[0x28]](/pt_pin=([^; ]+)(?=;?)/) && cookie[__Oxf3d21[0x28]](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
    //             $[__Oxf3d21[0x29]] = _0xc929xe + 1;
    //             $[__Oxf3d21[0x2a]] = true;
    //             $[__Oxf3d21[0x2b]] = __Oxf3d21[0x2];
    //             message = __Oxf3d21[0x2];
    //             UA = `${__Oxf3d21[0x2c]}${randomString(40)}${__Oxf3d21[0x2d]}${Math[__Oxf3d21[0x2e]]* 98+ 1}${__Oxf3d21[0x2f]}`;
    //             UAInfo[$[__Oxf3d21[0x27]]] = UA;
    //             console[__Oxf3d21[0xc]](__Oxf3d21[0x30] + $[__Oxf3d21[0x29]] + __Oxf3d21[0x31] + ($[__Oxf3d21[0x2b]] || $[__Oxf3d21[0x27]]) + __Oxf3d21[0x32]);
    //             if (!$[__Oxf3d21[0x2a]]) {
    //                 $[__Oxf3d21[0x1e]]($[__Oxf3d21[0x18]], `${__Oxf3d21[0x33]}`, `${__Oxf3d21[0x34]}${$[__Oxf3d21[0x29]]}${__Oxf3d21[0x35]}${$[__Oxf3d21[0x2b]]|| $[__Oxf3d21[0x27]]}${__Oxf3d21[0x36]}`, {
    //                     "open-url": __Oxf3d21[0x1d]
    //                 });
    //                 if ($[__Oxf3d21[0x0]]()) {
    //                     await notify[__Oxf3d21[0x39]](`${__Oxf3d21[0x2]}${$[__Oxf3d21[0x18]]}${__Oxf3d21[0x37]}${$[__Oxf3d21[0x27]]}${__Oxf3d21[0x2]}`, `${__Oxf3d21[0x34]}${$[__Oxf3d21[0x29]]}${__Oxf3d21[0x35]}${$[__Oxf3d21[0x27]]}${__Oxf3d21[0x38]}`)
    //                 };
    //                 continue
    //             };
    //             await TaskSub();
    //             await $[__Oxf3d21[0x3a]](200)
    //         }
    //     }
    // }
    // if(shareCodesArr.length > 0){
    //     console.log("\n-------------开始助力----------------\n")
    //     for (let _0xc929xe = 0; _0xc929xe < cookiesArr[__Oxf3d21[0x24]]; _0xc929xe++) {
    //         if (cookiesArr[_0xc929xe]) {
    //             cookie = cookiesArr[_0xc929xe];
    //             $[__Oxf3d21[0x27]] = decodeURIComponent(cookie[__Oxf3d21[0x28]](/pt_pin=([^; ]+)(?=;?)/) && cookie[__Oxf3d21[0x28]](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
    //             $[__Oxf3d21[0x29]] = _0xc929xe + 1;
    //             $[__Oxf3d21[0x2a]] = true;
    //             $[__Oxf3d21[0x2b]] = __Oxf3d21[0x2];
    //             message = __Oxf3d21[0x2];
    //             UA = `${__Oxf3d21[0x2c]}${randomString(40)}${__Oxf3d21[0x2d]}${Math[__Oxf3d21[0x2e]]* 98+ 1}${__Oxf3d21[0x2f]}`;
    //             UAInfo[$[__Oxf3d21[0x27]]] = UA;
    //             console[__Oxf3d21[0xc]](__Oxf3d21[0x30] + $[__Oxf3d21[0x29]] + __Oxf3d21[0x31] + ($[__Oxf3d21[0x2b]] || $[__Oxf3d21[0x27]]) + __Oxf3d21[0x32]);
    //             if (!$[__Oxf3d21[0x2a]]) {
    //                 $[__Oxf3d21[0x1e]]($[__Oxf3d21[0x18]], `${__Oxf3d21[0x33]}`, `${__Oxf3d21[0x34]}${$[__Oxf3d21[0x29]]}${__Oxf3d21[0x35]}${$[__Oxf3d21[0x2b]]|| $[__Oxf3d21[0x27]]}${__Oxf3d21[0x36]}`, {
    //                     "open-url": __Oxf3d21[0x1d]
    //                 });
    //                 if ($[__Oxf3d21[0x0]]()) {
    //                     await notify[__Oxf3d21[0x39]](`${__Oxf3d21[0x2]}${$[__Oxf3d21[0x18]]}${__Oxf3d21[0x37]}${$[__Oxf3d21[0x27]]}${__Oxf3d21[0x2]}`, `${__Oxf3d21[0x34]}${$[__Oxf3d21[0x29]]}${__Oxf3d21[0x35]}${$[__Oxf3d21[0x27]]}${__Oxf3d21[0x38]}`)
    //                 };
    //                 continue
    //             };
    //             console.log("当前助力：" + helpTimesArr[dqz])
    //             await Task(shareCodesArr[dqz],helpTimesArr[dqz],sxzlcsArr[dqz]);
    //             await $[__Oxf3d21[0x3a]](500)
    //         }
    //     }
    // }
    console.log("\n-------------开红包----------------\n")
    for (let _0xc929xe = 0; _0xc929xe < qs; _0xc929xe++) {
        if (cookiesArr[_0xc929xe]) {
            cookie = cookiesArr[_0xc929xe];
            $[__Oxf3d21[0x27]] = decodeURIComponent(cookie[__Oxf3d21[0x28]](/pt_pin=([^; ]+)(?=;?)/) && cookie[__Oxf3d21[0x28]](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
            $[__Oxf3d21[0x29]] = _0xc929xe + 1;
            $[__Oxf3d21[0x2a]] = true;
            $[__Oxf3d21[0x2b]] = __Oxf3d21[0x2];
            message = __Oxf3d21[0x2];
            UA = `${__Oxf3d21[0x2c]}${randomString(40)}${__Oxf3d21[0x2d]}${Math[__Oxf3d21[0x2e]]* 98+ 1}${__Oxf3d21[0x2f]}`;
            UAInfo[$[__Oxf3d21[0x27]]] = UA;
            console[__Oxf3d21[0xc]](__Oxf3d21[0x30] + $[__Oxf3d21[0x29]] + __Oxf3d21[0x31] + ($[__Oxf3d21[0x2b]] || $[__Oxf3d21[0x27]]) + __Oxf3d21[0x32]);
            if (!$[__Oxf3d21[0x2a]]) {
                $[__Oxf3d21[0x1e]]($[__Oxf3d21[0x18]], `${__Oxf3d21[0x33]}`, `${__Oxf3d21[0x34]}${$[__Oxf3d21[0x29]]}${__Oxf3d21[0x35]}${$[__Oxf3d21[0x2b]]|| $[__Oxf3d21[0x27]]}${__Oxf3d21[0x36]}`, {
                    "open-url": __Oxf3d21[0x1d]
                });
                if ($[__Oxf3d21[0x0]]()) {
                    await notify[__Oxf3d21[0x39]](`${__Oxf3d21[0x2]}${$[__Oxf3d21[0x18]]}${__Oxf3d21[0x37]}${$[__Oxf3d21[0x27]]}${__Oxf3d21[0x2]}`, `${__Oxf3d21[0x34]}${$[__Oxf3d21[0x29]]}${__Oxf3d21[0x35]}${$[__Oxf3d21[0x27]]}${__Oxf3d21[0x38]}`)
                };
                continue
            };
            for (let i = 0; i < 25; i++) {
                await 开红包();
                await $[__Oxf3d21[0x3a]](500)
            }
            await $[__Oxf3d21[0x3a]](1500)
        }
    }
    console.log("\n-------------提现----------------\n")
    for (let _0xc929xe = 0; _0xc929xe < qs; _0xc929xe++) {
        if (cookiesArr[_0xc929xe]) {
            cookie = cookiesArr[_0xc929xe];
            $[__Oxf3d21[0x27]] = decodeURIComponent(cookie[__Oxf3d21[0x28]](/pt_pin=([^; ]+)(?=;?)/) && cookie[__Oxf3d21[0x28]](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
            $[__Oxf3d21[0x29]] = _0xc929xe + 1;
            $[__Oxf3d21[0x2a]] = true;
            $[__Oxf3d21[0x2b]] = __Oxf3d21[0x2];
            message = __Oxf3d21[0x2];
            UA = `${__Oxf3d21[0x2c]}${randomString(40)}${__Oxf3d21[0x2d]}${Math[__Oxf3d21[0x2e]]* 98+ 1}${__Oxf3d21[0x2f]}`;
            UAInfo[$[__Oxf3d21[0x27]]] = UA;
            console[__Oxf3d21[0xc]](__Oxf3d21[0x30] + $[__Oxf3d21[0x29]] + __Oxf3d21[0x31] + ($[__Oxf3d21[0x2b]] || $[__Oxf3d21[0x27]]) + __Oxf3d21[0x32]);
            if (!$[__Oxf3d21[0x2a]]) {
                $[__Oxf3d21[0x1e]]($[__Oxf3d21[0x18]], `${__Oxf3d21[0x33]}`, `${__Oxf3d21[0x34]}${$[__Oxf3d21[0x29]]}${__Oxf3d21[0x35]}${$[__Oxf3d21[0x2b]]|| $[__Oxf3d21[0x27]]}${__Oxf3d21[0x36]}`, {
                    "open-url": __Oxf3d21[0x1d]
                });
                if ($[__Oxf3d21[0x0]]()) {
                    await notify[__Oxf3d21[0x39]](`${__Oxf3d21[0x2]}${$[__Oxf3d21[0x18]]}${__Oxf3d21[0x37]}${$[__Oxf3d21[0x27]]}${__Oxf3d21[0x2]}`, `${__Oxf3d21[0x34]}${$[__Oxf3d21[0x29]]}${__Oxf3d21[0x35]}${$[__Oxf3d21[0x27]]}${__Oxf3d21[0x38]}`)
                };
                continue
            };
            await 查询余额();
            if(提现金额 >= 0.3){
                //559967f159d4fbd39d58bbd690875fc8 0.3元现金
                //e55648727819d44b09a414aa99c10b48 0.38元现金
                //6e53192e506af5d1fe5718867ee0ba1c 0.5元现金
                //a3595d5c3b107a912ba368b3ebc70ffa 1元现金
                //c47654fb387a2b2d84ffc19f16b52690 20元现金
                //await 查询提现列表();
                if(提现金额 >= 20){
                    提现("c47654fb387a2b2d84ffc19f16b52690")
                }else if(提现金额 >= 1){
                    提现("a3595d5c3b107a912ba368b3ebc70ffa")
                }else if(提现金额 >= 0.5){
                    提现("6e53192e506af5d1fe5718867ee0ba1c")
                }else if(提现金额 >= 0.38){
                    提现("e55648727819d44b09a414aa99c10b48")
                }else if(提现金额 >= 0.3){
                    提现("559967f159d4fbd39d58bbd690875fc8")
                }
            }
            await $[__Oxf3d21[0x3a]](1500)
        }
    }
})()[__Oxf3d21[0x1b]]((_0xc929xd) => {
    $[__Oxf3d21[0xc]](__Oxf3d21[0x2], `${__Oxf3d21[0x17]}${$[__Oxf3d21[0x18]]}${__Oxf3d21[0x19]}${_0xc929xd}${__Oxf3d21[0x1a]}`, __Oxf3d21[0x2])
})[__Oxf3d21[0x16]](() => {
    $[__Oxf3d21[0x15]]()
});
async function Task(_0xc929x11,itemId,zlcs) {
    return new Promise(async(_0xc929x12) => {
        let _0xc929x13 = {
            // url: "https://api.m.jd.com/api?g_ty=h5&g_tk=&appCode=ms2362fc9e&" + _0xc929x11 + "%22%2C%22itemId%22%3A%22 " + itemId + "%22%7D&t=1675069860821&appid=cs_h5&client=cs_h5&clientVersion=1.0&h5st=20230130171100823%3B1822764398181112%3B38c56%3Btk02w74ab1bc818n6UmBVx01Ig71a98h%2FcJa4W%2FKerXJ7yxG4Pm7n942nltUwkzk%2BU8zVqzPqCozC6KM0ViYwfxdx%2Fb9%3Be1f0fe2ac0818f6395661a521a2fab164fa9ab6c82061942b58d0b4d4e8399a9%3B3.1%3B1675069860823%3B7414c4e56278580a133b60b72a30beb2764d2e61c66a5620e8e838e06644d1bf09a2adda77e27b81a11139bb7385a14230e5df7abbca5a5103be98c29ef17d4e19044bdb47cd56fd71ca1a347464d36c77dd68cd5549df3649c45bc903ddf2783039d5de467394307f7e3a1104ad71356f854915333823a9f89268d170d5eb17&loginType=2&sceneval=2",
            url:"https://api.m.jd.com/api?g_ty=h5&g_tk=&appCode=ms2362fc9e&body=%7B%22activeId%22%3A%2263bfbb5552b9e4602f8dd1e0%22%2C%22shareId%22%3A%22" + _0xc929x11 + "%22%2C%22itemId%22%3A%22" + itemId + "%22%7D&appid=cs_h5&client=cs_h5&functionId=festivalhb_help&clientVersion=1.0&h5st=20230117234208044%3B8399674437320856%3B38c56%3Btk02wa77c1b1f18nVheVcKPli3c1UJi8jjBlJOkw3ZyuX1lcmpTt098ftG80v7SiGRD0JhW%2Fd9vX8%2BOoXAlMBU1%2F%2BOYG%3B0e95b3aa0d8dc70332f1be273e50fb6f3b016a6b04f854d8b7bf623c149e4442%3B3.1%3B1673970128044%3B7414c4e56278580a133b60b72a30beb2764d2e61c66a5620e8e838e06644d1bf09a2adda77e27b81a11139bb7385a14230e5df7abbca5a5103be98c29ef17d4ed322ea46a73415edc642eeeeb0b4772fdbf1981d26f27029318287b099d0e15e7d6cf74722ccd2840781d7257ebc2f90300a79f5293172aee01eab2c36ce073a&loginType=2&sceneval=2",
            headers: {
                Referer: "https://wqs.jd.com/promote/2023/spring2023/index.html",
                origin: "https://wqs.jd.com",
                "User-Agent": "jdltapp;iPhone;3.9.0;;;M/5.0;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;hasOCPay/0;appBuild/1157;supportBestPay/0;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22YWS5ZwY5ENOmDQDrCWGmZJu2DtDwZJOyYtcmDWDrCNGmYWYyCtZvYm%3D%3D%22%2C%22sv%22%3A%22CJGkEK%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A1673970095%2C%22hdid%22%3A%22u%5C%2FKUchaNHUK4XWvXbc%5C%2FulPKSTuxbqgnDaszTT5LHaRU%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.jd.jdmobilelite%22%2C%22ridx%22%3A1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;",
                Cookie: cookie + " cid=3"
            }
        };
        $[__Oxf3d21[0x4c]](_0xc929x13, async(_0xc929x14, _0xc929x15, _0xc929x16) => {
            try {
                _0xc929x16 = JSON[__Oxf3d21[0x42]](_0xc929x16);
                if(_0xc929x16 != null && _0xc929x16["msg"] != null ){
                    console.log(_0xc929x16["msg"])
                    if("success"  == _0xc929x16["msg"]){
                        cgcs += 1;
                        console.log("成功助力次数：" + cgcs)
                        if(cgcs == zlcs){
                            cgcs = 0;
                            dqz += 1;
                        }
                    }
                }
            } catch (e) {
                $[__Oxf3d21[0x4b]](e, _0xc929x15)
            } finally {
                _0xc929x12()
            }
        })
    })
}
async function TaskSub() {
    return new Promise(async(_0xc929x12) => {
        let _0xc929x13 = {
            url: `${__Oxf3d21[0x4d]}`,
            headers: {
                Referer: __Oxf3d21[0x3e],
                origin: __Oxf3d21[0x3f],
                "User-Agent": __Oxf3d21[0x40],
                Cookie: cookie + __Oxf3d21[0x41]
            }
        };
        $[__Oxf3d21[0x4c]](_0xc929x13, async(_0xc929x14, _0xc929x15, _0xc929x16) => {
            try {
                _0xc929x16 = JSON[__Oxf3d21[0x42]](_0xc929x16);
                if (_0xc929x16) {
                    if (_0xc929x16[__Oxf3d21[0x44]] == 0 && _0xc929x16[__Oxf3d21[0x1e]] == __Oxf3d21[0x45]) {
                        let _0xc929x19 = _0xc929x16[__Oxf3d21[0x4e]][__Oxf3d21[0x25]] || __Oxf3d21[0x2];
                        let itemId =_0xc929x16['data']['helpTask']['itemId']
                        // console.log(_0xc929x19);
                        console.log(itemId);
                        let sxzl = _0xc929x16['data']['helpTask']['assignmentTimesLimit'] - _0xc929x16['data']['helpTask']['completionCnt'];
                        console.log("还需助力次数：" + sxzl)
                        if(sxzl > 0){
                            shareCodesArr.push(_0xc929x19)
                            helpTimesArr.push(itemId)
                            sxzlcsArr.push(_0xc929x16['data']['helpTask']['assignmentTimesLimit'] - _0xc929x16['data']['helpTask']['completionCnt'])
                        }
                    } else {
                        if (_0xc929x16[__Oxf3d21[0x44]] == 2000 && _0xc929x16[__Oxf3d21[0x1e]] == __Oxf3d21[0x49]) {
                            console[__Oxf3d21[0xc]](__Oxf3d21[0x4a])
                        } else {
                            console[__Oxf3d21[0xc]](_0xc929x16[__Oxf3d21[0x1e]])
                        }
                    }
                }
            } catch (e) {
                $[__Oxf3d21[0x4b]](e, _0xc929x15)
            } finally {
                _0xc929x12()
            }
        })
    })
}
async function 开红包() {
    return new Promise(async(_0xc929x12) => {
        let _0xc929x13 = {
            url:"https://api.m.jd.com/api?g_ty=h5&g_tk=&appCode=ms2362fc9e&body=%7B%22activeId%22%3A%2263bfbb5552b9e4602f8dd1e0%22%7D&appid=cs_h5&client=cs_h5&functionId=festivalhb_draw&clientVersion=1.0&h5st=20230119091825823%3B3130015768555529%3B38c56%3Btk02w87771b5718nyIV1xFYr9KMuTcVTCOGzCaVDxClqf4SC9%2F9jLZ%2BJ67f8fc0AiQbWX%2BTKFCo9ouWgpYDJ7rhVeRYT%3B1fb62ccf9a73a94c1ea113642efe002811f59bf7f7a804289452bbbd23ea327a%3B3.1%3B1674091105823%3B62f4d401ae05799f14989d31956d3c5f95ac49dc790ae47c6db5defda570eaab887e11b88d4e7582a29aa1f940982225df6b8b24a83a6866387d021e397a392dbd4eb906a74158857082f94a95dae20d42e1085d91590dd12196966fa92ecdcef575c1fec2944de02d7f9549055080c907a2c17597c75218ac331de700271d326562df3faf80659666bb792506e70bb21497b0172a0f22334bed8a81e15285cc&loginType=2&sceneval=2",
            headers: {
                Referer: __Oxf3d21[0x3e],
                origin: __Oxf3d21[0x3f],
                "User-Agent": __Oxf3d21[0x40],
                Cookie: cookie + __Oxf3d21[0x41]
            }
        };
        $[__Oxf3d21[0x4c]](_0xc929x13, async(_0xc929x14, _0xc929x15, _0xc929x16) => {
            try {
                _0xc929x16 = JSON[__Oxf3d21[0x42]](_0xc929x16);
                if(_0xc929x16 != null && _0xc929x16["data"] != null ){
                    console.log(_0xc929x16["data"]["prize"])
                }
            } catch (e) {
                $[__Oxf3d21[0x4b]](e, _0xc929x15)
            } finally {
                _0xc929x12()
            }
        })
    })
}
async function 查询余额() {
    return new Promise(async(_0xc929x12) => {
        let _0xc929x13 = {
            url:"https://api.m.jd.com/api?functionId=festivalhb_querymyprizelist&appid=cs_h5&t=1674096007651&channel=jxh5&cv=1.2.5&clientVersion=1.2.5&client=jxh5&uuid=30559920198278676&cthr=1&loginType=2&body=%7B%22activeId%22%3A%2263bfbb5552b9e4602f8dd1e0%22%2C%22type%22%3A1%2C%22isExpire%22%3A1%2C%22sid%22%3A%224451b8a592a07371edc6a6c3faeb038w%22%2C%22un_area%22%3A%2219_1607_40152_47425%22%2C%22%24taroTimestamp%22%3A1674096003436%2C%22sceneval%22%3A2%2C%22buid%22%3A325%2C%22appCode%22%3A%22ms2362fc9e%22%2C%22time%22%3A1674096007651%2C%22signStr%22%3A%22ad740171f47f0ab094ab8a5e4942e744%22%7D",
            headers: {
                Referer: __Oxf3d21[0x3e],
                origin: __Oxf3d21[0x3f],
                "User-Agent": __Oxf3d21[0x40],
                Cookie: cookie + __Oxf3d21[0x41]
            }
        };
        $[__Oxf3d21[0x4c]](_0xc929x13, async(_0xc929x14, _0xc929x15, _0xc929x16) => {
            try {
                _0xc929x16 = JSON[__Oxf3d21[0x42]](_0xc929x16);
                console.log("可提现：" + _0xc929x16["data"]["canUseCoinAmount"])
                console.log("累计提现：" + _0xc929x16["data"]["totalCoinAmount"])
                console.log("累计红包：" + _0xc929x16["data"]["totalHbAmount"])
                提现金额 = _0xc929x16["data"]["canUseCoinAmount"];
            } catch (e) {
                $[__Oxf3d21[0x4b]](e, _0xc929x15)
            } finally {
                _0xc929x12()
            }
        })
    })
}
async function 提现(code) {
    return new Promise(async(_0xc929x12) => {
        let _0xc929x13 = {
            url:"https://api.m.jd.com/api?functionId=jxPrmtExchange_exchange&appid=cs_h5&t=1674096577888&channel=jxh5&cv=1.2.5&clientVersion=1.2.5&client=jxh5&uuid=30559920198278676&cthr=1&loginType=2&h5st=20230119104937878%3Bt9nygm5qtcqqc1c0%3Baf89e%3Btk02wc0551ce618nNnyLUQg9w19beOgS5mgTY26yh9pUlnoh065y%2FtFtAstAjgmMxFp1jBZopiNxxS%2BmOBuIIzS2R9od%3B4322dfb62324ea09d9bb6705eebfd6e7c3093e2114141d1e5aed237b2c6ce3d2%3B400%3B1674096577878%3B234d597e4bbee03fed04c11bddbceda504d2c50800364a379be8dfdd0985ed43916b0f7d5c9093c5cf0a4bfa9533821cd34a4460679bc47d7051720d7700a18ea855d3e5c15e1282a5cd71a545b817368af676d55067d66cb929b2240f79d534dc134df4f1c62e08bb2270c5c54ede6e5b654312646f835d144cdac5c1dad378898960d3318871b7724b201c0305448f400771313a51ffdc0c8bac978de18792123b818fabce55a95cfb64a7a3b40fd9&body=%7B%22bizCode%22%3A%22festivalhb%22%2C%22ruleId%22%3A%22" + code + "%22%2C%22sceneval%22%3A2%2C%22buid%22%3A325%2C%22appCode%22%3A%22ms2362fc9e%22%2C%22time%22%3A1674096577888%2C%22signStr%22%3A%22ae1a668da6e58e86c0c4add07ff3be9a%22%7D",
            headers: {
                Referer: __Oxf3d21[0x3e],
                origin: __Oxf3d21[0x3f],
                "User-Agent": __Oxf3d21[0x40],
                Cookie: cookie + __Oxf3d21[0x41]
            }
        };
        $[__Oxf3d21[0x4c]](_0xc929x13, async(_0xc929x14, _0xc929x15, _0xc929x16) => {
            try {
                _0xc929x16 = JSON[__Oxf3d21[0x42]](_0xc929x16);
                console.log(_0xc929x16)
            } catch (e) {
                $[__Oxf3d21[0x4b]](e, _0xc929x15)
            } finally {
                _0xc929x12()
            }
        })
    })
}
async function 查询提现列表() {
    return new Promise(async(_0xc929x12) => {
        let _0xc929x13 = {
            url:"https://api.m.jd.com/api?functionId=festivalhb_queryexchangelist&appid=cs_h5&t=1674096578223&channel=jxh5&cv=1.2.5&clientVersion=1.2.5&client=jxh5&uuid=30559920198278676&cthr=1&loginType=2&body=%7B%22activeId%22%3A%2263bfbb5552b9e4602f8dd1e0%22%2C%22sceneval%22%3A2%2C%22buid%22%3A325%2C%22appCode%22%3A%22ms2362fc9e%22%2C%22time%22%3A1674096578223%2C%22signStr%22%3A%22419f0815a20c770a5b0e40a154460c37%22%7D",
            headers: {
                Referer: __Oxf3d21[0x3e],
                origin: __Oxf3d21[0x3f],
                "User-Agent": __Oxf3d21[0x40],
                Cookie: cookie + __Oxf3d21[0x41]
            }
        };
        $[__Oxf3d21[0x4c]](_0xc929x13, async(_0xc929x14, _0xc929x15, _0xc929x16) => {
            try {
                _0xc929x16 = JSON[__Oxf3d21[0x42]](_0xc929x16);
                console.log(_0xc929x16["data"]["cashExchangeRuleList"])
            } catch (e) {
                $[__Oxf3d21[0x4b]](e, _0xc929x15)
            } finally {
                _0xc929x12()
            }
        })
    })
}
function randomString(_0xc929xd) {
    _0xc929xd = _0xc929xd || 32;
    let _0xc929x1b = __Oxf3d21[0x50],
        _0xc929x1c = _0xc929x1b[__Oxf3d21[0x24]],
        _0xc929x1d = __Oxf3d21[0x2];
    for (let _0xc929xe = 0; _0xc929xe < _0xc929xd; _0xc929xe++) {
        _0xc929x1d += _0xc929x1b[__Oxf3d21[0x52]](Math[__Oxf3d21[0x51]](Math[__Oxf3d21[0x2e]]() * _0xc929x1c))
    };
    return _0xc929x1d
}

function jsonParse(_0xc929x1f) {
    if (typeof _0xc929x1f == __Oxf3d21[0x53]) {
        try {
            return JSON[__Oxf3d21[0x42]](_0xc929x1f)
        } catch (e) {
            console[__Oxf3d21[0xc]](e);
            $[__Oxf3d21[0x1e]]($[__Oxf3d21[0x18]], __Oxf3d21[0x2], __Oxf3d21[0x54]);
            return []
        }
    }
}
function random(_0xc929x23, _0xc929x24) {
    return Math[__Oxf3d21[0x51]](Math[__Oxf3d21[0x2e]]() * (_0xc929x24 - _0xc929x23)) + _0xc929x23
}(function(_0xc929x25, _0xc929x26, _0xc929x27, _0xc929x28, _0xc929x29, _0xc929x2a) {
    _0xc929x2a = __Oxf3d21[0x58];
    _0xc929x28 = function(_0xc929x2b) {
        if (typeof alert !== _0xc929x2a) {
            alert(_0xc929x2b)
        };
        if (typeof console !== _0xc929x2a) {
            console[__Oxf3d21[0xc]](_0xc929x2b)
        }
    };
    _0xc929x27 = function(_0xc929x1c, _0xc929x25) {
        return _0xc929x1c + _0xc929x25
    };
    _0xc929x29 = _0xc929x27(__Oxf3d21[0x59], _0xc929x27(_0xc929x27(__Oxf3d21[0x5a], __Oxf3d21[0x5b]), __Oxf3d21[0x5c]));
    try {
        _0xc929x25 = __encode;
        if (!(typeof _0xc929x25 !== _0xc929x2a && _0xc929x25 === _0xc929x27(__Oxf3d21[0x5d], __Oxf3d21[0x5e]))) {
            _0xc929x28(_0xc929x29)
        }
    } catch (e) {
        _0xc929x28(_0xc929x29)
    }
})({})

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
