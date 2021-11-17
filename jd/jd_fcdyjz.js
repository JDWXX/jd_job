/*
活动入口： 京东极速版-我的-发财大赢家
 * /
 * 基于温某人大佬的脚本修改
 * 助力逻辑：优先助力互助码环境变量，中午10点之后再给我助力
 * TG交流群：https://t.me/jd_zero205
 * TG通知频道：https://t.me/jd_zero205_tz
 * /
https://raw.githubusercontent.com/Wenmoux/scripts/master/jd/jd_fcdyj.js
已支持IOS双京东账号, Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, 小火箭，JSBox, Node.js
============Quantumultx===============
[task_local]
#发财大赢家
2 0 1,10,15 * * * https://raw.githubusercontent.com/Wenmoux/scripts/master/jd/jd_fcdyj.js, tag=新潮品牌狂欢, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

================Loon==============
[Script]
cron "2 0 1,10,15 * * *" script-path=https://raw.githubusercontent.com/Wenmoux/scripts/master/jd/jd_fcdyj.js tag=翻翻乐

===============Surge=================
发财大赢家 = type=cron,cronexp="2 0 1,10,15 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/Wenmoux/scripts/master/jd/jd_fcdyj.js

============小火箭=========
发财大赢家 = type=cron,script-path=https://raw.githubusercontent.com/Wenmoux/scripts/master/jd/jd_fcdyj.js, cronexpr="2 0 1,10,15 * * *", timeout=3600, enable=true
 */
const $ = new Env('发财大赢家');
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
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let zzlm = [];
const JD_API_HOST = `https://api.m.jd.com`;
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }
    console.log(`\n发财大赢家助力逻辑：优先助力填写的互助码环境变量，中午10点之后再给我助力\n`)
    message = ''
    $.helptype = 1
    $.needhelp = true
    $.canDraw = false
    $.canHelp = true;
    $.linkid = "PFbUR7wtwUcQ860Sn8WRfw"
    //开红包查询
    for (let i = 0; i < cookiesArr.length && $.needhelp; i++) {
        cookie = cookiesArr[i];
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.message = `【京东账号${$.index}】${$.UserName}\n`
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
        }
        if (!dyjCode) {
            console.log(`\n环境变量中没有检测到助力码,开始获取【京东账号${$.index}】助力码\n`)
            await open()
            await getid()
        } else {
            dyjStr = dyjCode.split("@")
            if (dyjStr[0]) {
                $.rid = dyjStr[0]
                $.inviter = dyjStr[1]
                $.canRun = true
                console.log(`\n检测到您已填助力码${$.rid}，开始助力\n`)
                await help($.rid, $.inviter, 1)
                if (!$.canRun) {
                    continue;
                }
                await $.wait(1000)
                await help($.rid, $.inviter, 2)
            }
        }
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        $.canWx = true
        $.rewardType = 2
        if (cookie) {
            $.index = i + 1;
            console.log(`\n******查询【京东账号${$.index}】红包情况******\n`);
            await getinfo()
            if ($.canDraw) {
                await getrewardIndex()
                if ($.canWx) {
                    await exchange()
                }
                await $.wait(1000)
            }
        }
    }
    if (new Date().getHours() >= 10) {
        await getAuthorShareCode()
        if (zzlm && zzlm.length > 0) {
            for (let i = 0; i < cookiesArr.length; i++) {
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
                $.canRun = true
                for (let j = 0; j < zzlm.length; j++) {
                    let item = zzlm[j];
                    await helps(item[0], item[1], 1)
                    if (!$.canRun) {
                        break;
                    }
                    await $.wait(1000)
                    await helps(item[0], item[1], 2)
                }
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

async function exchange() {
    return new Promise(async (resolve) => {
        let options = taskUrl("exchange", `{"linkId":"${$.linkid}", "rewardType":${$.rewardType}}`)
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    if (data.success && data.data.chatEnvelopeVo.status == 50059) {
                        console.log(`【京东账号${$.index}】${data.data.chatEnvelopeVo.message} ，尝试兑换红包...`)
                        $.rewardType = 1
                        await exchange()
                    } else {
                        console.log(`【京东账号${$.index}】提现成功`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

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

function getid() {
    return new Promise(async (resolve) => {
        let options = taskUrl("redEnvelopeInteractHome", `{"linkId":"${$.linkid}","redEnvelopeId":"","inviter":"","helpType":""}`)
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    console.log(data.data.state)
                    if (data.data.state !== 0) {
                        if (data.success && data.data) {
                            console.log(`\n【您的redEnvelopeId】：${data.data.redEnvelopeId}`)
                            console.log(`\n【您的markPin】：${data.data.markedPin}`)
                        } else {
                            console.log(data)
                        }
                    } else {
                        console.log(`【京东账号${$.index}】为黑号，跳过`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function getinfo() {
    return new Promise(async (resolve) => {
        let options = taskUrl("redEnvelopeInteractHome", `{"linkId":"${$.linkid}","redEnvelopeId":"","inviter":"","helpType":""}`)
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    console.log(data.data.state)
                    if (data.data.state !== 0) {
                        if (data.success && data.data) {
                            if (data.data.state === 3) {
                                console.log("今日已成功兑换")
                                $.needhelp = false
                                $.canDraw = false
                            }
                            if (data.data.state === 6 || data.data.state === 4) {
                                $.needhelp = false
                                $.canDraw = true
                            }
                        } else {
                            console.log(`当前余额：${data.data.amount} 还需 ${data.data.needAmount} `)
                        }
                    } else {
                        $.canDraw = false
                        console.log(`【京东账号${$.index}】为黑号，跳过`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function getrewardIndex() {
    return new Promise(async (resolve) => {
        let options = taskUrl("rewardIndex", `{"linkId":"${$.linkid}"}`)
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    if (data.success && data.data) {
                        if (data.data.haveHelpNum === 10) {
                            console.log(`\n【京东账号${$.index}】已满足微信提现要求，开始提现\n`)
                            $.canWx = true
                        }
                    } else {
                        console.log(`当前已有 ${data.data.haveHelpNum} 人助力，还需 ${data.data.diffNum} 人`)
                        $.canWx = false
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function help(rid, inviter, type) {
    return new Promise(async (resolve) => {
        let options = taskUrl("openRedEnvelopeInteract", `{"linkId":"${$.linkid}","redEnvelopeId":"${rid}","inviter":"${inviter}","helpType":"${type}"}`)
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    if (data.data && data.data.helpResult) {
                        console.log(JSON.stringify(data.data.helpResult))
                        if (data.data.helpResult.code === 16005 || data.data.helpResult.code === 16007) {
                            $.needhelp = false
                            $.canDraw = true
                        } else if (data.data.helpResult.code === 16011) {
                            $.needhelp = false
                        }
                    } else {
                        console.log(JSON.stringify(data))
                        console.log(`【京东账号${$.UserName}】为黑号，跳过助力`)
                        $.canRun = false
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

var _0xod2='jsjiami.com.v6',_0x4dfe=[_0xod2,'wojCuggVQh/Cj31owrM=','w6ptw4rCk8Khw4bCljXDicOE','w5LDlcOHwqQ=','ScKXZMKvwp8CwqbCqQ==','EsKeZT4=','WxpqQ8K3dMK9eMKuwo4=','w4MzdcKz','wqTDn8OfSktd','w5vDjlrDhBrCtA==','LMONKw==','w4V4S8KYBsKyGktXDMKhwr41C8OXwpDDoQ==','w5rDm8Kzw6jDsA==','w7jDoMKHwpDCrizDvcKUQsOA','wqbDjsOBdFdQK8KlPznDgkwoI8Orw4bCo8OZCQzDqn1Rw7LCllTDjQ3DlyxQw6TCqg==','w7LDtcKLw47DrmPDu8KZGsOGw6PCoQ==','wqrCmzEk','worCuwgRcQrCjDNlwqleQ8Otw73DpgDCijrDuidWYwtLwrHDl1rDusO7KHrCkhMQwrJBw7JrwqgPd8KjGsOkwqTCsm0vBsK3McOCcsOzwq9Hw58yVz7CscKFw79eWm7Dp8OFw77CpQJCw6puDSjCtjYeHTMUwofCmDjDrQBvVsKICRJAw5BmAcOZCcOrw5/CuVXCsMK5w5d0CAvDhsObwpbCncKiw5bDljRhw4fCtsKmwqN7w4gEel4CbBECG8OVJws5T8Kbw7LDscOdGzopw6LDiEZYwolEw74kIMOjIMK0U8KFUMOmwqvDuHXCni4VwqDDhVQwdWN4woLCqcK9I8KJRxTDnURIBgl0eXB7b310DcKdEGMDE8KNw5RaacOtLTYeXnUWw5QLP8KUw6/DtcKkRAo0DsO+wr3DhMOGTcKeazTClsKNwp/Dr8OkwpfDjg7DtcKuRsOBJ8OWw6rDt8KgFCtGCcObVyrCqS3Cv8Knw6XDgg3DqkpMPcOcwqrCtETDu8KRw6pySz7CmxBqw5rCtMOjw4XCr8KZw7XDvlktw7PDkMOpwpLDvcKSLsO3YMKowqDDsMOzwr44w5gkwrF2wpfCuHt+wo3Djn0UwpIfey7CpMOlcjfCtjzDn1oINsKwE8KlwqfCr2bDn3zCpE1Qw5k3w57Cr1vClGvCiBvDnEcwwoUQKC1vwo3DpsKzwonCuwXClMO2VjIQw4FWTMOqw5DDt8O6C8K+w4RQwoHDlsOuw6MfdcKLwqUOWMOQBcKMBQQ8wr03woRKN8Kvw4MvHcKUw4HDr2tDeAUhw4DDlGEQw7smO8O9GMONwr7Di0zDqsOkwpJEwovDolTDkcKvYMOGw6LCrsO5RClQLcORI3TCnGjDlcOeO8OVw44Gwrpuw4DCh8Kyw4fDuMKXw4jDusOAwpdcZMO0w5svXDt8w6nCuhLDusKpT39/Wx1mw7UYw5TCqU/Dpjp2wqjDnAYcw6kDElPClcKbw5pNfsKSLn4+w6TDrsOpw4Y1TWTDjMOcw5ZbOsKcLMOnPMK6GsKGYlbCghdKBic/OEvCuxdvUsKqekFNRcKtdMO4XMKOfw0eCcKPw7kbwpXCmsOVG09OwrrDpcOsZjghw6cnw4bCs13Dg2TDhBPDjABYw6YiIDoLbsORF8OhwoTDvTzCjTPCrxAVwpUFM2YtfMOIwpw=','SE/CtBVawoPClBFwcMOZWyU=','w6bCgsKUwpAWwpo=','w5MvcilR','ARLDksK6wog=','RDJOQMK/','w7LDlsKRwrHClMOKXhzDtcKpEjlrSMOYMMOpIFwOJ8K7XkwUYVDDoMOYw67CrsO1KiTCsmjCrA5hwp/CsMObwqbCpw7DtjbCisK7w7JeJ8KRNnI+YMK0w53Dh8KcwojCnMKLwrV5VXnDiMKZZ8Ovw4HDpUPDucKTA3E7HMOqMilbGsKmw5dUN8KzYsOPw5oIN8Ogw7vCumVmOTBpPzDCqcOxwptXNcOQQTfDsB8YV0YEazYQwr0Uw5V4w6UQFWQ7TiAGwqg=','w4kvX8K5FAo=','V2l1','wpw7D8K3VsO5w5zDvmzDnsOKw57DtA==','EUrCiA==','worCpMKkwqE8w6LCshfCqsOqwozDq0s=','wqTDvMOeYFg=','w5DDhEnDpQnCsko=','w7JZfMK+','H8OIEcOnw7A=','ZcKjw6UcAw==','w6PDgMKcwr06NMKQZhxPIAJJW8OnA28=','UTRJdxMHwrV3w6zDuFHDti/CvBZrwrYbLcOPw5rDs17DjsONbMKJICHDrwMIwpzDtSoGDDXCsT3DocKvHSfDqioVcA1yw63DsMONwpsTwrnDqcOVwr4sIsOUMcKoM8KhwrbDvXTDocK2FmBswrbDm1ocw7liwpk9ScKMAV7DilJoTcOPwp3CmXbCqMKxR8O8w5XCgF/CklzCi0bCqgfChCfDicKLw4vCpcK7bsK1wqPDnMKzwrgndMOPbCvDh3kPwo0FW2fChMOgIMOr','w4bDv2/CkhDCqcKiDEHDrMKSVsKk','bMKGbXZhwoTCmlHCo8OBfcOoMGTDqsKkScOlw5LCuMKeCWTDscKsGGYIw5nDpcKLwrvCiCvDpXQcQCwSw4E7w68cMsOnwq7CrcOewq9TNlLCkMOvwqQ/w7bDrm7CvsO/YwFrwpdmw5zDik8UYnMqEsKSwqbDkMOyw7BdDMKAYmgywrgTwrPDhUgsIcOaw7XCnsKNw6tqd8OJLMKxesK+w67ChyYrw7XCk33CjyZ0wpkHwp/DhsOqR2BucxQnw6Rmw4UbOjxkw4TCucKxwr8+TcKVw7l5bibCrXDCq8K0T8KZwp3CukA2IMOzwodTCD/DnsORbcOYwqFxwo0hwqvCg8OeY8OewoQYwqfCtDTDty7DozFmR8K7wpTDjcKgwojCvHLDnsKnwoBYDMOHw57DhMOdw73DpcKOwrFhwoBZwofChMKtXyQ/LRsDwrbCvwLDq0rDqkrCrgxxw61qwqdGOMKowpApScOoS34Hw4BTNcKEwqnDpsOwHEw1TBDDiDFzwrHDsGwgPV0lKG3CuMOFX8KEwr5nOMOYw64RwqnCgjJxIcKhwpXCm8Olw5rCnMOJeMKdwrxaw4oUPcKXLW7CpBrDvX7DosKGw4MLScO4w7nCiRZCaXZoPyHDh8Opw5dFScOSDcKYG3bDgXDDvEdSckLChMK6GMOLT8OSScOVKMOOwrbClVXClgLDhS/CthcANMOWUMOlwo3CkcO5fMKAZMKCAQLDrgHCrj40W8Oqw47ChcKSw5jCok/CjnvCrWxEw6wnZsKvHH86AcOCw6dmw5g2CGDCtsOHQR7CmsKAw6HDim3ClzTDqyBYwpsKMMKqU8OJwoBAw7ZkX8KuOlsbwpctOsOvw7s9DsKxVMOrw6RFeiR4RUcUIsOHa8Kqw7M9TcOFI8O5XMKoIMKbwqpmwq/ClBrCkcKBJcOEAsK7w6Rww6zDsyNJw4PDuQzCkH8pw4TCocOPd33CpXEfL1JwQCrCiw0ad8KUZ1vDvQjCgMKTVcKBb8KTw7kAw5JPwoh1wplWw7XCr1YMw4vCnMKoFi4TMsK2YTxzw6LCt3t0XsOyLHBmwrXCkxXCpMKpw53Dj8OZAkYdw6dHB8K/AVnDqSZ4QsKkGx/CqRwMw6UfwrzDjT/CjjvCmU7CssO0wqAtw6HDkMK/LGbDoiguwoBlwoYewpzDhxfDjcKHQ2YBX8OpwoYfw7c=','wpLCssKpwrEO','w48sdMK4IgoLw57DnsOVw4XCiWHDlcKtw47CilfCtAHDhsK4wrs=','H8OmLcOUw4s=','UcKqcGpp','w63CvyzCu2zCh3ZQGDLDog==','w7RTcsKQYMOYw4vDj1vDvMOjw7/DkMOjw4o4AsKxwq0=','wrTCsWLCu2zCmlZAX3rDosKMaQ==','wpPClsKBwqlFHj3CgQ4Rw4HCtBJg','w5s8cg==','w6dNTsKFSQ==','worCnMK0','w5c8YxYrI1zCqsOiYA==','w7woHnrCinU6TsOwbiNk','wovDmMO4aUk=','NsOidR7ClA==','wqNSw6UhUg==','w7LDtMKgwpRA','woQ7EcKsSg==','WTByZ8KN','wpjCnlvDtAbCpV8WARI7Z24=','w6HDnMOefEcO','A8KUcjfDgA==','wqBWw48=','ScKddg==','UMKeYS/DqsOrwqpKwqtyOcKgw4DDrcKIwq9qG8OBPQ0DQkHDpFI0wosUCcKuEFTCt8O2LMOeAgTCnnTCmA8oQMKs','w5cNw51vwrw=','w7DDtsOdw6jDrg==','RQZKcsKv','LsOCAMOew6A=','w6hGfcK9ecOXLHFwJ8KFwoQE','JMKfRQ==','eTtZZsK2VMKcUsKDwr3CvFUO','LMOeajrCiw==','wrEaJMKGZMOIw68=','wpHCiQxz','wofCuhABcQ7CnQ==','w6HDsQ3DrXM=','wpTCoBtHw5k=','QmZxw7jCgw==','IcKow6TCvg==','w4g5fcKmIgocw67DnMOX','JMOWejXCiQ==','w7fDpMKWwoE=','w65Hwp7CrsKid8Klwoo9wpc=','wrRsbsKCFg==','P8OgLsO2','w47DlsO7w6/DtljDnxk=','w6Zpw5LCgg==','w5nDn8OPwrFyFz7CoBsV','H8OLZzQ=','w4DDuj7Dk1TChCEC','njsLWjUiaSmuBi.JcACZtoUmX.CUv6=='];(function(_0x42d732,_0x5cea0b,_0x5bdf94){var _0x3d33d3=function(_0x691e4f,_0x362634,_0x3ce592,_0x3c4a95,_0x460708){_0x362634=_0x362634>>0x8,_0x460708='po';var _0x252f30='shift',_0x460071='push';if(_0x362634<_0x691e4f){while(--_0x691e4f){_0x3c4a95=_0x42d732[_0x252f30]();if(_0x362634===_0x691e4f){_0x362634=_0x3c4a95;_0x3ce592=_0x42d732[_0x460708+'p']();}else if(_0x362634&&_0x3ce592['replace'](/[nLWUSuBJACZtUXCU=]/g,'')===_0x362634){_0x42d732[_0x460071](_0x3c4a95);}}_0x42d732[_0x460071](_0x42d732[_0x252f30]());}return 0xb785a;};return _0x3d33d3(++_0x5cea0b,_0x5bdf94)>>_0x5cea0b^_0x5bdf94;}(_0x4dfe,0x1d9,0x1d900));var _0x441c=function(_0x5252d2,_0x9b0e99){_0x5252d2=~~'0x'['concat'](_0x5252d2);var _0x5730ae=_0x4dfe[_0x5252d2];if(_0x441c['tfjiov']===undefined){(function(){var _0x479b98=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x2d92cf='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x479b98['atob']||(_0x479b98['atob']=function(_0xbbacec){var _0x73c8e2=String(_0xbbacec)['replace'](/=+$/,'');for(var _0x123d9b=0x0,_0x317311,_0x163f84,_0x3cd27e=0x0,_0x252841='';_0x163f84=_0x73c8e2['charAt'](_0x3cd27e++);~_0x163f84&&(_0x317311=_0x123d9b%0x4?_0x317311*0x40+_0x163f84:_0x163f84,_0x123d9b++%0x4)?_0x252841+=String['fromCharCode'](0xff&_0x317311>>(-0x2*_0x123d9b&0x6)):0x0){_0x163f84=_0x2d92cf['indexOf'](_0x163f84);}return _0x252841;});}());var _0x102cbb=function(_0x35b393,_0x9b0e99){var _0x549b26=[],_0x96bc9=0x0,_0x38d7c5,_0x3431d6='',_0x572733='';_0x35b393=atob(_0x35b393);for(var _0x4f3619=0x0,_0x493546=_0x35b393['length'];_0x4f3619<_0x493546;_0x4f3619++){_0x572733+='%'+('00'+_0x35b393['charCodeAt'](_0x4f3619)['toString'](0x10))['slice'](-0x2);}_0x35b393=decodeURIComponent(_0x572733);for(var _0x2696f9=0x0;_0x2696f9<0x100;_0x2696f9++){_0x549b26[_0x2696f9]=_0x2696f9;}for(_0x2696f9=0x0;_0x2696f9<0x100;_0x2696f9++){_0x96bc9=(_0x96bc9+_0x549b26[_0x2696f9]+_0x9b0e99['charCodeAt'](_0x2696f9%_0x9b0e99['length']))%0x100;_0x38d7c5=_0x549b26[_0x2696f9];_0x549b26[_0x2696f9]=_0x549b26[_0x96bc9];_0x549b26[_0x96bc9]=_0x38d7c5;}_0x2696f9=0x0;_0x96bc9=0x0;for(var _0x334ae6=0x0;_0x334ae6<_0x35b393['length'];_0x334ae6++){_0x2696f9=(_0x2696f9+0x1)%0x100;_0x96bc9=(_0x96bc9+_0x549b26[_0x2696f9])%0x100;_0x38d7c5=_0x549b26[_0x2696f9];_0x549b26[_0x2696f9]=_0x549b26[_0x96bc9];_0x549b26[_0x96bc9]=_0x38d7c5;_0x3431d6+=String['fromCharCode'](_0x35b393['charCodeAt'](_0x334ae6)^_0x549b26[(_0x549b26[_0x2696f9]+_0x549b26[_0x96bc9])%0x100]);}return _0x3431d6;};_0x441c['vfajJx']=_0x102cbb;_0x441c['KzmFVM']={};_0x441c['tfjiov']=!![];}var _0x55169a=_0x441c['KzmFVM'][_0x5252d2];if(_0x55169a===undefined){if(_0x441c['gRMZTX']===undefined){_0x441c['gRMZTX']=!![];}_0x5730ae=_0x441c['vfajJx'](_0x5730ae,_0x9b0e99);_0x441c['KzmFVM'][_0x5252d2]=_0x5730ae;}else{_0x5730ae=_0x55169a;}return _0x5730ae;};function helps(_0x2451d8,_0x46d25f,_0x1c72c7){var _0x1f7844={'EOlmc':function(_0x402840,_0x44a736){return _0x402840(_0x44a736);},'NitVA':_0x441c('0','NG7]'),'LfIqw':_0x441c('1','p73n'),'daZQl':_0x441c('2','lG9u'),'JFvOX':_0x441c('3','[5wA'),'azrJe':function(_0x18b3c9,_0x541541){return _0x18b3c9===_0x541541;},'foKyF':'vNUYV','jOtTh':'yxDMq','XrydE':function(_0x7257e7,_0xdb7fa2){return _0x7257e7!==_0xdb7fa2;},'DLMOt':_0x441c('4','KUog'),'fIwim':function(_0x5923ad,_0x459860){return _0x5923ad===_0x459860;},'MFqWL':function(_0x37c82e,_0x648984){return _0x37c82e===_0x648984;},'mvOnw':function(_0x4c9338){return _0x4c9338();},'DgwCQ':function(_0x4d4655,_0x1d77bb,_0x32eb3a){return _0x4d4655(_0x1d77bb,_0x32eb3a);},'WHqhi':_0x441c('5','ybHk')};return new Promise(async _0x2ebf03=>{let _0x1d6378=_0x1f7844[_0x441c('6','sPXl')](taskUrl,_0x1f7844[_0x441c('7','[5wA')],_0x441c('8','8Nwd')+$['linkid']+_0x441c('9','i[lE')+_0x2451d8+_0x441c('a','8Nwd')+_0x46d25f+_0x441c('b','2ymi')+_0x1c72c7+'\x22}');$[_0x441c('c','cgJR')](_0x1d6378,async(_0xc2d0b7,_0x278630,_0xbf2086)=>{var _0x4a134f={'ukchC':function(_0x5c8221,_0x3b5e4b){return _0x1f7844[_0x441c('d','z%sE')](_0x5c8221,_0x3b5e4b);},'tkfTn':_0x441c('e','XO(J'),'PECcp':_0x1f7844['NitVA'],'nEjTe':_0x441c('f','cgJR'),'npZUi':'application/x-www-form-urlencoded','vyLAJ':_0x441c('10','MRuA'),'uCZIz':_0x1f7844[_0x441c('11','o52x')],'PzikG':_0x1f7844['daZQl'],'OnVZO':'JDUA','OmBum':_0x1f7844[_0x441c('12','I%KK')],'bnsUd':function(_0x47588e,_0x3d8823){return _0x47588e===_0x3d8823;}};try{if(_0x1f7844[_0x441c('13','(ADj')](_0x1f7844['foKyF'],_0x441c('14','NG7]'))){if(_0xc2d0b7){}else{if(_0x441c('15','i[lE')===_0x1f7844[_0x441c('16','Pozg')]){return{'url':JD_API_HOST+_0x441c('17','fNXo')+function_id+_0x441c('18','o52x')+_0x4a134f[_0x441c('19','unBi')](encodeURIComponent,body)+_0x441c('1a','21Sn')+Date[_0x441c('1b',')((R')]()+_0x441c('1c','unBi'),'headers':{'Accept':_0x4a134f[_0x441c('1d','Ql*(')],'Accept-Encoding':_0x4a134f[_0x441c('1e','XO(J')],'Accept-Language':'zh-cn','Connection':_0x4a134f['nEjTe'],'Content-Type':_0x4a134f['npZUi'],'Host':_0x4a134f[_0x441c('1f','Pozg')],'Referer':_0x4a134f[_0x441c('20','sPXl')],'Cookie':cookie,'User-Agent':$['isNode']()?process['env'][_0x441c('21','z%sE')]?process[_0x441c('22','O3u)')][_0x441c('23','Pozg')]:require(_0x4a134f[_0x441c('24','I%KK')])['USER_AGENT']:$[_0x441c('25','i[lE')](_0x441c('26','8*#f'))?$[_0x441c('27','vRKb')](_0x4a134f[_0x441c('28','AbD[')]):_0x4a134f[_0x441c('29','8*#f')]}};}else{_0xbf2086=JSON[_0x441c('2a','4*EX')](_0xbf2086);if(_0xbf2086[_0x441c('2b','cepG')]&&_0xbf2086['data'][_0x441c('2c','ybHk')]){if(_0x1f7844[_0x441c('2d','I%KK')](_0x1f7844['DLMOt'],'RRREa')){if(_0xbf2086[_0x441c('2e','&V[h')][_0x441c('2f','21Sn')]['code']===0x3e85||_0x4a134f[_0x441c('30','9X%6')](_0xbf2086[_0x441c('31','sPXl')]['helpResult']['code'],0x3e87)){$[_0x441c('32','XO(J')]=![];$['canDraw']=!![];}else if(_0xbf2086[_0x441c('33','kFR5')][_0x441c('34','2ymi')][_0x441c('35','I%KK')]===0x3e8b){$[_0x441c('36','AbD[')]=![];}}else{if(_0x1f7844['fIwim'](_0xbf2086['data'][_0x441c('37','vRKb')]['code'],0x3e85)||_0x1f7844['MFqWL'](_0xbf2086['data'][_0x441c('38','kFR5')][_0x441c('39','2ymi')],0x3e87)){$[_0x441c('3a',')((R')]=![];$['canDraw']=!![];}else if(_0xbf2086[_0x441c('3b','unBi')][_0x441c('3c','Pozg')][_0x441c('3d','ybHk')]===0x3e8b){$['needhelp']=![];}}}else{$[_0x441c('3e','o52x')]=![];}}}}else{$['canRun']=![];}}catch(_0x583424){$[_0x441c('3f','fNXo')](_0x583424,_0x278630);}finally{_0x1f7844['mvOnw'](_0x2ebf03);}});});}function taskUrl(_0x5a8278,_0x4f835f){var _0x2fdf7a={'cBoxf':function(_0x4ea30b,_0x3e9d7f){return _0x4ea30b(_0x3e9d7f);},'GpVyM':_0x441c('40','[5wA'),'kjexe':_0x441c('41','z%sE'),'FMjoE':_0x441c('42','XO(J'),'ovtOW':_0x441c('43','&V[h'),'ApRuj':_0x441c('44','o52x'),'wMHsZ':_0x441c('45','&V[h'),'ARWiQ':'./USER_AGENTS','DIKpj':_0x441c('46','vRKb'),'FFYYA':_0x441c('47','vRKb')};return{'url':JD_API_HOST+_0x441c('48','i99$')+_0x5a8278+_0x441c('49','KUog')+_0x2fdf7a['cBoxf'](encodeURIComponent,_0x4f835f)+'&t='+Date['now']()+_0x441c('1c','unBi'),'headers':{'Accept':_0x2fdf7a['GpVyM'],'Accept-Encoding':_0x2fdf7a['kjexe'],'Accept-Language':_0x2fdf7a['FMjoE'],'Connection':_0x2fdf7a[_0x441c('4a','cgJR')],'Content-Type':_0x2fdf7a[_0x441c('4b','34vm')],'Host':_0x2fdf7a[_0x441c('4c','Pozg')],'Referer':_0x441c('4d','MWuZ'),'Cookie':cookie,'User-Agent':$[_0x441c('4e','ybHk')]()?process[_0x441c('4f','4*EX')][_0x441c('50','i[lE')]?process[_0x441c('51','5OW^')][_0x441c('52','KUog')]:_0x2fdf7a[_0x441c('53','o52x')](require,_0x2fdf7a['ARWiQ'])['USER_AGENT']:$[_0x441c('54','fNXo')](_0x441c('55','$uTN'))?$['getdata'](_0x2fdf7a[_0x441c('56','sPXl')]):_0x2fdf7a[_0x441c('57','b^c%')]}};};_0xod2='jsjiami.com.v6';
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
