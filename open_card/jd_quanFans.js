/*
5.1-9.30 泉粉邀请卡

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

基本都开过卡，默认满邀请15人退出

————————————————
入口：[ 5.1-9.30 泉粉邀请卡 ]

请求太频繁会被黑ip
过10分钟再执行

cron:30 5 7-31 5 *
============Quantumultx===============
[task_local]
#5.1-9.30 泉粉邀请卡
30 5 7-31 5 * jd_quanFans.js, tag=5.1-9.30 泉粉邀请卡, enabled=true

*/
const $ = new Env('5.1-9.30 泉粉邀请卡');
var _0xodj = 'jsjiami.com.v6',
    _0x1c90 = [_0xodj, "isNode", "./jdCookie.js", "./sendNotify", "keys", "forEach", "push", "env", "JD_DEBUG", "false", "log", "getdata", "CookieJD", "CookieJD2", "CookiesJD", "map", "cookie", "filter", "hotFlag", "outFlag", "activityEnd", "msg", "name", "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", "assistStatus", "activityId", "dz2009100009970144", "shareUuid", "ae18cc210e504159bba7f68f83c6deb8", "入口:\nhttps://lzdz-isv.isvjcloud.com/dingzhi/biouquan/activity/349456?activityId=", "&shareUuid=", "ae18cc210e504159bba7f68f83c6deb8", "floor", "random", "length", "UserName", "match", "index", "bean", "nickName", "\n\n******开始【京东账号", "*********\n", "wait", "actorUuid", "hasEnd", "此ip已被限制，请过10分钟后再执行脚本", "sendNotify", "catch", "logErr", "finally", "done", "assistCount", "endTime", "Token", "Pin", "isvObfuscator", "获取[token]失败！", "获取cookie失败", "活动结束", "此ip已被限制，请过10分钟后再执行脚本\n", "getSimpleActInfoVo", "getMyPing", "获取[Pin]失败！", "accessLogWithAD", "getUserInfo", "activityContent", "获取不到[actorUuid]退出执行，请重新执行", "drawContent", "openStatus", "joinVenderId", "venderId", "errorJoinShop", "indexOf", "活动太火爆，请稍后再试", "第1次 重新开卡", "第2次 重新开卡", "第3次 重新开卡", "开卡失败❌ ，重新执行脚本", "【账号", "】开卡失败❌ ，重新执行脚本\n", "已开卡", "未开卡", "未知-", "helpStatus", "助力成功", "已助力", "已开卡 无法助力", "未助力", "不能助力自己", "helpCount", "】助力人数：", " 【账号1】助力人数：", "当前助力:", "后面的号都会助力:", "休息一下，别被黑ip了\n可持续发展", "https://lzdz-isv.isvjcloud.com", "POST", "https://api.m.jd.com/client.action?functionId=isvObfuscator", "body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954", "/customer/getMyPing", "token=", "&fromType=APP&userId=", "shopId", "&pin=", "/wxActionCommon/getUserInfo", "pin=", "/dz/common/getSimpleActInfoVo", "activityId=", "/dingzhi/taskact/common/drawContent", "/common/accessLogWithAD", "https://lzdz-isv.isvjcloud.com/dingzhi/biouquan/activity/349456?activityId=", "venderId=", "&code=99&pin=", "&activityId=", "&pageUrl=", "getOpenCardStatusWithOutSelf", "/crmCard/common/coupon/getOpenCardStatusWithOutSelf", "/dingzhi/biouquan/activityContent", "&pinImg=", "attrTouXiang", "&nick=", "nickname", "&cjyxPin=&cjhyPin=&shareUuid=", "getDrawRecordHasCoupon", "/dingzhi/taskact/common/getDrawRecordHasCoupon", "&actorUuid=", "getShareRecord", "/dingzhi/taskact/common/getShareRecord", "post", "statusCode", "undefined", "toStr", " API请求失败，请检查网路重试", "parse", " 执行任务异常", "runFalag", "object", "errcode", "token", "message", "isvObfuscator ", "result", "data", "secretPin", "errorMessage", "yunMidImageUrl", "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png", "openCard", "firstAccess", "shareNumber", "sendBeanNum", "】获得", "isOk", "allOpenCard", "我的奖品：", "被邀请", "逛店铺", "drawId", "dayShareBeans", "infoName", "replace", "infoType", "value", "邀请好友(", "ShareCount", "=========== 你邀请了:", "-> ", "application/json", "gzip, deflate, br", "zh-cn", "keep-alive", "application/x-www-form-urlencoded", "XMLHttpRequest", "Referer", "Origin", "Cookie", "AUTH_C_USER=", "get", " cookie API请求失败，请检查网路重试", "活动已结束", "headers", "set-cookie", "Set-Cookie", "split", "trim", "LZ_TOKEN_KEY=", "LZ_TOKEN_VALUE=", "lz_jdpin_token=", "jdapp;iPhone;10.1.4;13.1.2;", ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "abcdef0123456789", "charAt", "shopactivityId", ",\"activityId\":", "{\"venderId\":\"", "\",\"shopId\":\"", "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0", ",\"channel\":406}", "20220412164641157%3B197ee697d50ca316f3582488c7fa9d34%3B169f1%3Btk02wd9451deb18n1P31JunSGTfZhmebuivwsEwYWUQF1ZkpdtuSmKOES5DnIMFdyOvKikdguelIiBUnJbeCgoNlcEvv%3B6e090cbde337590b51a514718fee391d46fece6b953ed1084a052f6d76ffbd92%3B3.0%3B1649753201157", "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=", "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=", "*/*", "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7", "https://shopmember.m.jd.com/", "toObj", "success", "giftInfo", "giftList", "入会获得:", "discountString", "prizeName", "secondLineDesc", "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22", "%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888", "text/plain; Charset=UTF-8", "https://api.m.jd.com", "api.m.jd.com", "会员卡名称：", "shopMemberCardInfo", "venderCardName", "interestsRuleList", "interestsInfo", "openCardStatus", "userInfo", "includes", "openCardBean", "string", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie", "jHsptjinamli.cAComp.Uv6=="];

function _0x22e9(_0x1d2076, _0x2a7e5a) {
    _0x1d2076 = ~~'0x'['concat'](_0x1d2076['slice'](0));
    var _0x190e79 = _0x1c90[_0x1d2076];
    return _0x190e79;
}

(function (_0x1f6a79, _0x4663e3) {
    var _0x5c299b = 0;

    for (_0x4663e3 = _0x1f6a79['shift'](_0x5c299b >> 2); _0x4663e3 && _0x4663e3 !== (_0x1f6a79['pop'](_0x5c299b >> 3) + '')['replace'](/[HptnlACpU=]/g, ''); _0x5c299b++) {
        _0x5c299b = _0x5c299b ^ 937546;
    }
})(_0x1c90, _0x22e9);

const jdCookieNode = $[_0x22e9('0')]() ? require(_0x22e9('1')) : '';
const notify = $[_0x22e9('0')]() ? require(_0x22e9('2')) : '';
let cookiesArr = [],
    cookie = '';

if ($[_0x22e9('0')]()) {
    Object[_0x22e9('3')](jdCookieNode)[_0x22e9('4')](_0x5af316 => {
        cookiesArr[_0x22e9('5')](jdCookieNode[_0x5af316]);
    });

    if (process[_0x22e9('6')][_0x22e9('7')] && process[_0x22e9('6')][_0x22e9('7')] === _0x22e9('8')) {
        console[_0x22e9('9')] = () => {};
    }
} else {
    cookiesArr = [$[_0x22e9('a')](_0x22e9('b')), $[_0x22e9('a')](_0x22e9('c')), ...jsonParse($[_0x22e9('a')](_0x22e9('d')) || "[]")[_0x22e9('e')](_0x5bb23f => _0x5bb23f[_0x22e9('f')])][_0x22e9('10')](_0xec4c7 => !!_0xec4c7);
}

allMessage = '';
message = '';
$[_0x22e9('11')] = false;
$[_0x22e9('12')] = false;
$[_0x22e9('13')] = false;
let lz_jdpin_token_cookie = '';
let activityCookie = '';
!(async () => {
    if (!cookiesArr[0]) {
        $[_0x22e9('14')]($[_0x22e9('15')], _0x22e9('16'), _0x22e9('17'), {
            'open-url': _0x22e9('17')
        });

        return;
    }

    $[_0x22e9('18')] = false;
    $[_0x22e9('19')] = _0x22e9('1a');
    $[_0x22e9('1b')] = _0x22e9('1c');

    console[_0x22e9('9')](_0x22e9('1d') + $[_0x22e9('19')] + _0x22e9('1e') + $[_0x22e9('1b')]);

    let _0x311984 = [_0x22e9('1c'), _0x22e9('1f')];
    let _0x2492d5 = 0;
    _0x2492d5 = Math[_0x22e9('20')](Math[_0x22e9('21')]() * _0x311984[_0x22e9('22')]);
    $[_0x22e9('1b')] = _0x311984[_0x2492d5] ? _0x311984[_0x2492d5] : $[_0x22e9('1b')];

    for (let _0x1443a7 = 0; _0x1443a7 < cookiesArr[_0x22e9('22')]; _0x1443a7++) {
        cookie = cookiesArr[_0x1443a7];

        if (cookie) {
            $[_0x22e9('23')] = decodeURIComponent(cookie[_0x22e9('24')](/pt_pin=([^; ]+)(?=;?)/) && cookie[_0x22e9('24')](/pt_pin=([^; ]+)(?=;?)/)[1]);
            $[_0x22e9('25')] = _0x1443a7 + 1;
            message = '';
            $[_0x22e9('26')] = 0;
            $[_0x22e9('11')] = false;
            $[_0x22e9('27')] = '';

            console[_0x22e9('9')](_0x22e9('28') + $[_0x22e9('25')] + "】" + ($[_0x22e9('27')] || $[_0x22e9('23')]) + _0x22e9('29'));

            await getUA();
            await run();
            await $[_0x22e9('2a')](4000);

            if (_0x1443a7 == 0 && !$[_0x22e9('2b')]) {
                break;
            }

            if ($[_0x22e9('12')] || $[_0x22e9('13')]) {
                break;
            }

            if ($[_0x22e9('2c')]) {
                break;
            }
        }
    }

    cookie = cookiesArr[0];

    if (cookie && $[_0x22e9('18')] && !$[_0x22e9('12')] && !$[_0x22e9('13')]) {
        $[_0x22e9('23')] = decodeURIComponent(cookie[_0x22e9('24')](/pt_pin=([^; ]+)(?=;?)/) && cookie[_0x22e9('24')](/pt_pin=([^; ]+)(?=;?)/)[1]);
        $[_0x22e9('25')] = 1;
        message = '';
        $[_0x22e9('26')] = 0;
        $[_0x22e9('11')] = false;
        $[_0x22e9('27')] = '';

        console[_0x22e9('9')](_0x22e9('28') + $[_0x22e9('25')] + "】" + ($[_0x22e9('27')] || $[_0x22e9('23')]) + _0x22e9('29'));

        await $[_0x22e9('2a')](parseInt(Math[_0x22e9('21')]() * 2000 + 4000, 10));
        await getUA();
        await run();
    }

    if ($[_0x22e9('12')]) {
        let _0x4d58c6 = _0x22e9('2d');

        $[_0x22e9('14')]($[_0x22e9('15')], '', '' + _0x4d58c6);

        if ($[_0x22e9('0')]()) {
            await notify[_0x22e9('2e')]('' + $[_0x22e9('15')], '' + _0x4d58c6);
        }
    }

    if (allMessage) {
        $[_0x22e9('14')]($[_0x22e9('15')], '', '' + allMessage);
    }
})()[_0x22e9('2f')](_0x3b640e => $[_0x22e9('30')](_0x3b640e))[_0x22e9('31')](() => $[_0x22e9('32')]());

async function run() {
    try {
        $[_0x22e9('33')] = 0;
        $[_0x22e9('34')] = 0;
        lz_jdpin_token_cookie = '';
        $[_0x22e9('35')] = '';
        $[_0x22e9('36')] = '';
        await takePostRequest(_0x22e9('37'));

        if ($[_0x22e9('35')] == '') {
            console[_0x22e9('9')](_0x22e9('38'));

            return;
        }

        await getCk();

        if (activityCookie == '') {
            console[_0x22e9('9')](_0x22e9('39'));

            return;
        }

        if ($[_0x22e9('13')] === true) {
            console[_0x22e9('9')](_0x22e9('3a'));

            return;
        }

        if ($[_0x22e9('12')]) {
            console[_0x22e9('9')](_0x22e9('3b'));

            return;
        }

        await takePostRequest(_0x22e9('3c'));
        await takePostRequest(_0x22e9('3d'));

        if (!$[_0x22e9('36')]) {
            console[_0x22e9('9')](_0x22e9('3e'));

            return;
        }

        await takePostRequest(_0x22e9('3f'));
        await takePostRequest(_0x22e9('40'));
        await $[_0x22e9('2a')](1000);
        await takePostRequest(_0x22e9('41'));

        if ($[_0x22e9('11')]) {
            return;
        }

        if (!$[_0x22e9('2b')]) {
            console[_0x22e9('9')](_0x22e9('42'));

            return;
        }

        await takePostRequest(_0x22e9('43'));
        await $[_0x22e9('2a')](1000);

        if ($[_0x22e9('44')] == false) {
            console[_0x22e9('9')]("开卡");

            $[_0x22e9('45')] = $[_0x22e9('46')];
            await joinShop();

            if ($[_0x22e9('47')][_0x22e9('48')](_0x22e9('49')) > -1) {
                console[_0x22e9('9')](_0x22e9('4a'));

                await $[_0x22e9('2a')](parseInt(Math[_0x22e9('21')]() * 2000 + 3000, 10));
                await joinShop();
            }

            if ($[_0x22e9('47')][_0x22e9('48')](_0x22e9('49')) > -1) {
                console[_0x22e9('9')](_0x22e9('4b'));

                await $[_0x22e9('2a')](parseInt(Math[_0x22e9('21')]() * 2000 + 4000, 10));
                await joinShop();
            }

            if ($[_0x22e9('47')][_0x22e9('48')](_0x22e9('49')) > -1) {
                console[_0x22e9('9')](_0x22e9('4c'));

                await $[_0x22e9('2a')](parseInt(Math[_0x22e9('21')]() * 2000 + 4000, 10));
                await joinShop();
            }

            if ($[_0x22e9('47')][_0x22e9('48')](_0x22e9('49')) > -1) {
                console[_0x22e9('9')](_0x22e9('4d'));

                allMessage += _0x22e9('4e') + $[_0x22e9('25')] + _0x22e9('4f');
            } else {
                $[_0x22e9('18')] = true;
            }

            await takePostRequest(_0x22e9('43'));
            await takePostRequest(_0x22e9('41'));
        }

        console[_0x22e9('9')]($[_0x22e9('44')] === true ? _0x22e9('50') : $[_0x22e9('44')] === false ? _0x22e9('51') : _0x22e9('52') + $[_0x22e9('44')]);

        console[_0x22e9('9')]($[_0x22e9('53')] === 1 ? _0x22e9('54') : $[_0x22e9('53')] === 2 ? _0x22e9('55') : $[_0x22e9('53')] === 22 ? _0x22e9('56') : $[_0x22e9('53')] === 21 ? _0x22e9('57') : $[_0x22e9('53')] === 0 ? _0x22e9('58') : _0x22e9('52') + $[_0x22e9('53')]);

        if ($[_0x22e9('25')] == 1) {
            $[_0x22e9('59')] = $[_0x22e9('33')];
        } else {
            if ($[_0x22e9('53')] == 1) {
                $[_0x22e9('59')]++;
            }
        }

        console[_0x22e9('9')](_0x22e9('4e') + $[_0x22e9('25')] + _0x22e9('5a') + $[_0x22e9('33')] + ($[_0x22e9('25')] != 1 && _0x22e9('5b') + $[_0x22e9('59')] || ''));

        if ($[_0x22e9('59')] >= 15) {
            $[_0x22e9('2c')] = true;
        }

        console[_0x22e9('9')]($[_0x22e9('2b')]);

        console[_0x22e9('9')](_0x22e9('5c') + $[_0x22e9('1b')]);

        if ($[_0x22e9('25')] == 1) {
            $[_0x22e9('1b')] = $[_0x22e9('2b')];

            console[_0x22e9('9')](_0x22e9('5d') + $[_0x22e9('1b')]);
        }

        if ($[_0x22e9('25')] % 3 == 0) {
            console[_0x22e9('9')](_0x22e9('5e'));
        }

        if ($[_0x22e9('25')] % 3 == 0) {
            await $[_0x22e9('2a')](parseInt(Math[_0x22e9('21')]() * 5000 + 5000, 10));
        }
    } catch (_0x1d56f4) {
        console[_0x22e9('9')](_0x1d56f4);
    }
}

async function takePostRequest(_0x259fcf) {
    if ($[_0x22e9('12')]) {
        return;
    }

    let _0x14cd7b = _0x22e9('5f');

    let _0x3165c0 = '';

    let _0x222e6e = _0x22e9('60');

    switch (_0x259fcf) {
        case _0x22e9('37'):
            url = _0x22e9('61');
            _0x3165c0 = _0x22e9('62');
            break;

        case _0x22e9('3d'):
            url = _0x14cd7b + _0x22e9('63');
            _0x3165c0 = _0x22e9('64') + $[_0x22e9('35')] + _0x22e9('65') + ($[_0x22e9('66')] || $[_0x22e9('46')] || '') + _0x22e9('67');
            break;

        case _0x22e9('40'):
            url = _0x14cd7b + _0x22e9('68');
            _0x3165c0 = _0x22e9('69') + encodeURIComponent($[_0x22e9('36')]);
            break;

        case _0x22e9('3c'):
            url = _0x14cd7b + _0x22e9('6a');
            _0x3165c0 = _0x22e9('6b') + $[_0x22e9('19')];
            break;

        case _0x22e9('43'):
            url = _0x14cd7b + _0x22e9('6c');
            _0x3165c0 = _0x22e9('6b') + $[_0x22e9('19')] + _0x22e9('67') + encodeURIComponent($[_0x22e9('36')]);
            break;

        case _0x22e9('3f'):
            url = _0x14cd7b + _0x22e9('6d');

            let _0x432d58 = _0x22e9('6e') + $[_0x22e9('19')] + _0x22e9('1e') + $[_0x22e9('1b')];

            _0x3165c0 = _0x22e9('6f') + ($[_0x22e9('66')] || $[_0x22e9('46')] || '') + _0x22e9('70') + encodeURIComponent($[_0x22e9('36')]) + _0x22e9('71') + $[_0x22e9('19')] + _0x22e9('72') + encodeURIComponent(_0x432d58);
            break;

        case _0x22e9('73'):
            url = _0x14cd7b + _0x22e9('74');
            _0x3165c0 = _0x22e9('6f') + ($[_0x22e9('66')] || $[_0x22e9('46')] || '') + _0x22e9('71') + $[_0x22e9('19')] + _0x22e9('67') + encodeURIComponent($[_0x22e9('36')]);
            break;

        case _0x22e9('41'):
            url = _0x14cd7b + _0x22e9('75');
            _0x3165c0 = _0x22e9('6b') + $[_0x22e9('19')] + _0x22e9('67') + encodeURIComponent($[_0x22e9('36')]) + _0x22e9('76') + encodeURIComponent($[_0x22e9('77')]) + _0x22e9('78') + encodeURIComponent($[_0x22e9('79')]) + _0x22e9('7a') + $[_0x22e9('1b')];
            break;

        case _0x22e9('7b'):
            url = _0x14cd7b + _0x22e9('7c');
            _0x3165c0 = _0x22e9('6b') + $[_0x22e9('19')] + _0x22e9('67') + encodeURIComponent($[_0x22e9('36')]) + _0x22e9('7d') + $[_0x22e9('2b')];
            break;

        case _0x22e9('7e'):
            url = _0x14cd7b + _0x22e9('7f');
            _0x3165c0 = _0x22e9('6b') + $[_0x22e9('19')] + _0x22e9('67') + encodeURIComponent($[_0x22e9('36')]) + _0x22e9('7d') + $[_0x22e9('2b')];
            break;

        default:
            console[_0x22e9('9')]("错误" + _0x259fcf);

    }

    let _0x19a29e = getPostRequest(url, _0x3165c0, _0x222e6e);

    return new Promise(async _0x48dbdc => {
        $[_0x22e9('80')](_0x19a29e, (_0x2c32b7, _0xde2b23, _0xc838c3) => {
            try {
                setActivityCookie(_0xde2b23);

                if (_0x2c32b7) {
                    if (_0xde2b23 && typeof _0xde2b23[_0x22e9('81')] != _0x22e9('82')) {
                        if (_0xde2b23[_0x22e9('81')] == 493) {
                            console[_0x22e9('9')](_0x22e9('3b'));

                            $[_0x22e9('12')] = true;
                        }
                    }

                    console[_0x22e9('9')]('' + $[_0x22e9('83')](_0x2c32b7, _0x2c32b7));

                    console[_0x22e9('9')](_0x259fcf + _0x22e9('84'));
                } else {
                    dealReturn(_0x259fcf, _0xc838c3);
                }
            } catch (_0x27c134) {
                console[_0x22e9('9')](_0x27c134, _0xde2b23);
            } finally {
                _0x48dbdc();
            }
        });
    });
}

async function dealReturn(_0x6a5451, _0x22255b) {
    let _0x274c30 = '';

    try {
        if (_0x6a5451 != _0x22e9('3f') || _0x6a5451 != _0x22e9('43')) {
            if (_0x22255b) {
                _0x274c30 = JSON[_0x22e9('85')](_0x22255b);
            }
        }
    } catch (_0x45e239) {
        console[_0x22e9('9')](_0x6a5451 + _0x22e9('86'));

        console[_0x22e9('9')](_0x22255b);

        $[_0x22e9('87')] = false;
    }

    try {
        switch (_0x6a5451) {
            case _0x22e9('37'):
                if (typeof _0x274c30 == _0x22e9('88')) {
                    if (_0x274c30[_0x22e9('89')] == 0) {
                        if (typeof _0x274c30[_0x22e9('8a')] != _0x22e9('82')) {
                            $[_0x22e9('35')] = _0x274c30[_0x22e9('8a')];
                        }
                    } else {
                        if (_0x274c30[_0x22e9('8b')]) {
                            console[_0x22e9('9')](_0x22e9('8c') + (_0x274c30[_0x22e9('8b')] || ''));
                        } else {
                            console[_0x22e9('9')](_0x22255b);
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x22255b);
                }

                break;

            case _0x22e9('3d'):
                if (typeof _0x274c30 == _0x22e9('88')) {
                    if (_0x274c30[_0x22e9('8d')] && _0x274c30[_0x22e9('8d')] === true) {
                        if (_0x274c30[_0x22e9('8e')] && typeof _0x274c30[_0x22e9('8e')][_0x22e9('8f')] != _0x22e9('82')) {
                            $[_0x22e9('36')] = _0x274c30[_0x22e9('8e')][_0x22e9('8f')];
                        }

                        if (_0x274c30[_0x22e9('8e')] && typeof _0x274c30[_0x22e9('8e')][_0x22e9('79')] != _0x22e9('82')) {
                            $[_0x22e9('79')] = _0x274c30[_0x22e9('8e')][_0x22e9('79')];
                        }
                    } else {
                        if (_0x274c30[_0x22e9('90')]) {
                            console[_0x22e9('9')](_0x6a5451 + " " + (_0x274c30[_0x22e9('90')] || ''));
                        } else {
                            console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                }

                break;

            case _0x22e9('3c'):
                if (typeof _0x274c30 == _0x22e9('88')) {
                    if (_0x274c30[_0x22e9('8d')] && _0x274c30[_0x22e9('8d')] === true) {
                        if (typeof _0x274c30[_0x22e9('8e')][_0x22e9('66')] != _0x22e9('82')) {
                            $[_0x22e9('66')] = _0x274c30[_0x22e9('8e')][_0x22e9('66')];
                        }

                        if (typeof _0x274c30[_0x22e9('8e')][_0x22e9('46')] != _0x22e9('82')) {
                            $[_0x22e9('46')] = _0x274c30[_0x22e9('8e')][_0x22e9('46')];
                        }
                    } else {
                        if (_0x274c30[_0x22e9('90')]) {
                            console[_0x22e9('9')](_0x6a5451 + " " + (_0x274c30[_0x22e9('90')] || ''));
                        } else {
                            console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                }

                break;

            case _0x22e9('40'):
                if (typeof _0x274c30 == _0x22e9('88')) {
                    if (_0x274c30[_0x22e9('8d')] && _0x274c30[_0x22e9('8d')] === true) {
                        if (_0x274c30[_0x22e9('8e')] && typeof _0x274c30[_0x22e9('8e')][_0x22e9('91')] != _0x22e9('82')) {
                            $[_0x22e9('77')] = _0x274c30[_0x22e9('8e')][_0x22e9('91')] || _0x22e9('92');
                        }
                    } else {
                        if (_0x274c30[_0x22e9('90')]) {
                            console[_0x22e9('9')](_0x6a5451 + " " + (_0x274c30[_0x22e9('90')] || ''));
                        } else {
                            console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                }

                break;

            case _0x22e9('41'):
                if (typeof _0x274c30 == _0x22e9('88')) {
                    if (_0x274c30[_0x22e9('8d')] && _0x274c30[_0x22e9('8d')] === true) {
                        $[_0x22e9('2b')] = _0x274c30[_0x22e9('8e')][_0x22e9('2b')] || '';
                        $[_0x22e9('53')] = _0x274c30[_0x22e9('8e')][_0x22e9('18')] || 0;
                        $[_0x22e9('44')] = _0x274c30[_0x22e9('8e')][_0x22e9('93')] || false;
                        $[_0x22e9('94')] = _0x274c30[_0x22e9('8e')][_0x22e9('94')] || false;
                        $[_0x22e9('33')] = _0x274c30[_0x22e9('8e')][_0x22e9('95')] || 0;

                        if (_0x274c30[_0x22e9('8e')][_0x22e9('96')]) {
                            console[_0x22e9('9')]("获得" + _0x274c30[_0x22e9('8e')][_0x22e9('96')] + "豆");

                            allMessage += _0x22e9('4e') + $[_0x22e9('25')] + _0x22e9('97') + _0x274c30[_0x22e9('8e')][_0x22e9('96')] + "豆\n";
                        }
                    } else {
                        if (_0x274c30[_0x22e9('90')]) {
                            if (_0x274c30[_0x22e9('90')][_0x22e9('48')]("结束") > -1) {
                                $[_0x22e9('13')] = true;
                            }

                            console[_0x22e9('9')](_0x6a5451 + " " + (_0x274c30[_0x22e9('90')] || ''));
                        } else {
                            console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                }

                break;

            case _0x22e9('73'):
                if (typeof _0x274c30 == _0x22e9('88')) {
                    if (_0x274c30[_0x22e9('98')]) {
                        $[_0x22e9('99')] = _0x274c30[_0x22e9('93')] || false;
                    } else {
                        if (_0x274c30[_0x22e9('90')] || _0x274c30[_0x22e9('14')]) {
                            console[_0x22e9('9')](_0x6a5451 + " " + (_0x274c30[_0x22e9('90')] || _0x274c30[_0x22e9('14')] || ''));
                        } else {
                            console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                }

                break;

            case _0x22e9('7b'):
                if (typeof _0x274c30 == _0x22e9('88')) {
                    if (_0x274c30[_0x22e9('8d')] && _0x274c30[_0x22e9('8d')] === true) {
                        console[_0x22e9('9')](_0x22e9('9a'));

                        let _0x3560f0 = 0;
                        let _0x31f98a = 0;
                        let _0x31209a = {
                            'dayShareBeans': "邀请",
                            'dayBeSharedBeans': _0x22e9('9b'),
                            'openCardBeans': "开卡",
                            'saveTaskBeans23': "关注",
                            'saveTaskBeans12': _0x22e9('9c'),
                            'saveTaskBeans21': "加购"
                        };

                        for (let _0x3a737d in _0x274c30[_0x22e9('8e')]) {
                            let _0x55c999 = _0x274c30[_0x22e9('8e')][_0x3a737d];

                            if (_0x55c999[_0x22e9('9d')] == _0x22e9('9e')) {
                                _0x3560f0++;
                                _0x31f98a = _0x55c999[_0x22e9('9f')][_0x22e9('a0')]("京豆", '');
                            } else {
                                console[_0x22e9('9')]('' + (_0x55c999[_0x22e9('a1')] != 10 && _0x55c999[_0x22e9('9d')] && (_0x31209a[_0x55c999[_0x22e9('9d')]] || _0x55c999[_0x22e9('9d')]) + ":" || _0x55c999[_0x22e9('a2')] && _0x55c999[_0x22e9('a2')] + ":" || '') + _0x55c999[_0x22e9('9f')]);
                            }
                        }

                        if (_0x3560f0 > 0) {
                            console[_0x22e9('9')](_0x22e9('a3') + _0x3560f0 + "):" + (_0x3560f0 * parseInt(_0x31f98a, 10) || 30) + "京豆");
                        }
                    } else {
                        if (_0x274c30[_0x22e9('90')]) {
                            console[_0x22e9('9')](_0x6a5451 + " " + (_0x274c30[_0x22e9('90')] || ''));
                        } else {
                            console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                }

                break;

            case _0x22e9('7e'):
                if (typeof _0x274c30 == _0x22e9('88')) {
                    if (_0x274c30[_0x22e9('8d')] && _0x274c30[_0x22e9('8d')] === true && _0x274c30[_0x22e9('8e')]) {
                        $[_0x22e9('a4')] = _0x274c30[_0x22e9('8e')][_0x22e9('22')];

                        $[_0x22e9('9')](_0x22e9('a5') + _0x274c30[_0x22e9('8e')][_0x22e9('22')] + "个");
                    } else {
                        if (_0x274c30[_0x22e9('90')]) {
                            console[_0x22e9('9')](_0x6a5451 + " " + (_0x274c30[_0x22e9('90')] || ''));
                        } else {
                            console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x6a5451 + " " + _0x22255b);
                }

                break;

            case _0x22e9('3f'):
            case _0x22e9('43'):
                break;

            default:
                console[_0x22e9('9')](_0x6a5451 + _0x22e9('a6') + _0x22255b);

        }

        if (typeof _0x274c30 == _0x22e9('88')) {
            if (_0x274c30[_0x22e9('90')]) {
                if (_0x274c30[_0x22e9('90')][_0x22e9('48')]("火爆") > -1) {
                    $[_0x22e9('11')] = true;
                }
            }
        }
    } catch (_0x3d460f) {
        console[_0x22e9('9')](_0x3d460f);
    }
}

function getPostRequest(_0xc1035f, _0x40c66d, _0x402c3b = _0x22e9('60')) {
    let _0x4f38b4 = {
        'Accept': _0x22e9('a7'),
        'Accept-Encoding': _0x22e9('a8'),
        'Accept-Language': _0x22e9('a9'),
        'Connection': _0x22e9('aa'),
        'Content-Type': _0x22e9('ab'),
        'Cookie': cookie,
        'User-Agent': $["UA"],
        'X-Requested-With': _0x22e9('ac')
    };

    if (_0xc1035f[_0x22e9('48')](_0x22e9('5f')) > -1) {
        _0x4f38b4[_0x22e9('ad')] = _0x22e9('6e') + $[_0x22e9('19')];
        _0x4f38b4[_0x22e9('ae')] = _0x22e9('5f');
        _0x4f38b4[_0x22e9('af')] = '' + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || '') + ($[_0x22e9('36')] && _0x22e9('b0') + $[_0x22e9('36')] + ";" || '') + activityCookie;
    }

    return {
        "url": _0xc1035f,
        "method": _0x402c3b,
        "headers": _0x4f38b4,
        "body": _0x40c66d,
        "timeout": 30000
    };
}

function getCk() {
    return new Promise(_0x182b8d => {
        let _0x3948fa = {
            "url": _0x22e9('6e') + $[_0x22e9('19')] + _0x22e9('1e') + $[_0x22e9('1b')],
            "followRedirect": false,
            "headers": {
                'User-Agent': $["UA"]
            },
            "timeout": 30000
        };

        $[_0x22e9('b1')](_0x3948fa, async (_0x14e3b2, _0x13b41d, _0x586698) => {
            try {
                if (_0x14e3b2) {
                    if (_0x13b41d && typeof _0x13b41d[_0x22e9('81')] != _0x22e9('82')) {
                        if (_0x13b41d[_0x22e9('81')] == 493) {
                            console[_0x22e9('9')](_0x22e9('3b'));

                            $[_0x22e9('12')] = true;
                        }
                    }

                    console[_0x22e9('9')]('' + $[_0x22e9('83')](_0x14e3b2));

                    console[_0x22e9('9')]($[_0x22e9('15')] + _0x22e9('b2'));
                } else {
                    let _0x88a9cf = _0x586698[_0x22e9('24')](/(活动已经结束)/) && _0x586698[_0x22e9('24')](/(活动已经结束)/)[1] || '';

                    if (_0x88a9cf) {
                        $[_0x22e9('13')] = true;

                        console[_0x22e9('9')](_0x22e9('b3'));
                    }

                    setActivityCookie(_0x13b41d);
                }
            } catch (_0x3af633) {
                $[_0x22e9('30')](_0x3af633, _0x13b41d);
            } finally {
                _0x182b8d();
            }
        });
    });
}

function setActivityCookie(_0x4020f0) {
    let _0x53a927 = '';
    let _0x3a5924 = '';
    let _0xf508f9 = '';

    let _0x3a46aa = _0x4020f0 && _0x4020f0[_0x22e9('b4')] && (_0x4020f0[_0x22e9('b4')][_0x22e9('b5')] || _0x4020f0[_0x22e9('b4')][_0x22e9('b6')] || '') || '';

    let _0x3b53ae = '';

    if (_0x3a46aa) {
        if (typeof _0x3a46aa != _0x22e9('88')) {
            _0x3b53ae = _0x3a46aa[_0x22e9('b7')](",");
        } else {
            _0x3b53ae = _0x3a46aa;
        }

        for (let _0x3ac56d of _0x3b53ae) {
            let _0x13de80 = _0x3ac56d[_0x22e9('b7')](";")[0][_0x22e9('b8')]();

            if (_0x13de80[_0x22e9('b7')]("=")[1]) {
                if (_0x13de80[_0x22e9('48')](_0x22e9('b9')) > -1) {
                    _0x53a927 = _0x13de80[_0x22e9('a0')](/ /g, '') + ";";
                }

                if (_0x13de80[_0x22e9('48')](_0x22e9('ba')) > -1) {
                    _0x3a5924 = _0x13de80[_0x22e9('a0')](/ /g, '') + ";";
                }

                if (_0x13de80[_0x22e9('48')](_0x22e9('bb')) > -1) {
                    _0xf508f9 = '' + _0x13de80[_0x22e9('a0')](/ /g, '') + ";";
                }
            }
        }
    }

    if (_0x53a927 && _0x3a5924) {
        activityCookie = _0x53a927 + " " + _0x3a5924;
    }

    if (_0xf508f9) {
        lz_jdpin_token_cookie = _0xf508f9;
    }
}

async function getUA() {
    $["UA"] = _0x22e9('bc') + randomString(40) + _0x22e9('bd');
}

function randomString(_0x14e701) {
    _0x14e701 = _0x14e701 || 32;

    let _0xd8a368 = _0x22e9('be'),
        _0x2a98e5 = _0xd8a368[_0x22e9('22')],
        _0x3fe8af = '';

    for (i = 0; i < _0x14e701; i++) {
        _0x3fe8af += _0xd8a368[_0x22e9('bf')](Math[_0x22e9('20')](Math[_0x22e9('21')]() * _0x2a98e5));
    }

    return _0x3fe8af;
}

async function joinShop() {
    if (!$[_0x22e9('45')]) {
        return;
    }

    return new Promise(async _0x2e35e8 => {
        $[_0x22e9('47')] = _0x22e9('49');
        let _0x9f57e7 = '';

        if ($[_0x22e9('c0')]) {
            _0x9f57e7 = _0x22e9('c1') + $[_0x22e9('c0')];
        }

        let _0x408d21 = _0x22e9('c2') + $[_0x22e9('45')] + _0x22e9('c3') + $[_0x22e9('45')] + _0x22e9('c4') + _0x9f57e7 + _0x22e9('c5');

        let _0x363502 = _0x22e9('c6');

        const _0x4d619f = {
            "url": _0x22e9('c7') + _0x408d21 + _0x22e9('c8') + _0x363502,
            "headers": {
                'accept': _0x22e9('c9'),
                'accept-encoding': _0x22e9('a8'),
                'accept-language': _0x22e9('ca'),
                'cookie': cookie,
                'origin': _0x22e9('cb'),
                'user-agent': $["UA"]
            }
        };

        $[_0x22e9('b1')](_0x4d619f, async (_0x7f7e19, _0x215a4a, _0x20bb06) => {
            try {
                _0x20bb06 = _0x20bb06 && _0x20bb06[_0x22e9('24')](/jsonp_.*?\((.*?)\);/) && _0x20bb06[_0x22e9('24')](/jsonp_.*?\((.*?)\);/)[1] || _0x20bb06;

                let _0x4cf2fe = $[_0x22e9('cc')](_0x20bb06, _0x20bb06);

                if (_0x4cf2fe && typeof _0x4cf2fe == _0x22e9('88')) {
                    if (_0x4cf2fe && _0x4cf2fe[_0x22e9('cd')] === true) {
                        console[_0x22e9('9')](_0x4cf2fe[_0x22e9('8b')]);

                        $[_0x22e9('47')] = _0x4cf2fe[_0x22e9('8b')];

                        if (_0x4cf2fe[_0x22e9('8d')] && _0x4cf2fe[_0x22e9('8d')][_0x22e9('ce')]) {
                            for (let _0x32697c of _0x4cf2fe[_0x22e9('8d')][_0x22e9('ce')][_0x22e9('cf')]) {
                                console[_0x22e9('9')](_0x22e9('d0') + _0x32697c[_0x22e9('d1')] + _0x32697c[_0x22e9('d2')] + _0x32697c[_0x22e9('d3')]);
                            }
                        }
                    } else {
                        if (_0x4cf2fe && typeof _0x4cf2fe == _0x22e9('88') && _0x4cf2fe[_0x22e9('8b')]) {
                            $[_0x22e9('47')] = _0x4cf2fe[_0x22e9('8b')];

                            console[_0x22e9('9')]('' + (_0x4cf2fe[_0x22e9('8b')] || ''));
                        } else {
                            console[_0x22e9('9')](_0x20bb06);
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x20bb06);
                }
            } catch (_0x2e4d1e) {
                $[_0x22e9('30')](_0x2e4d1e, _0x215a4a);
            } finally {
                _0x2e35e8();
            }
        });
    });
}

function getshopactivityId() {
    return new Promise(_0x59dc99 => {
        const _0x738731 = {
            "url": _0x22e9('d4') + $[_0x22e9('45')] + _0x22e9('d5'),
            "headers": {
                'Content-Type': _0x22e9('d6'),
                'Origin': _0x22e9('d7'),
                'Host': _0x22e9('d8'),
                'accept': _0x22e9('c9'),
                'User-Agent': $["UA"],
                'content-type': _0x22e9('ab'),
                'Cookie': cookie
            }
        };

        $[_0x22e9('b1')](_0x738731, async (_0x369ffa, _0x1d9cc0, _0x49d1ed) => {
            try {
                let _0x107f82 = $[_0x22e9('cc')](_0x49d1ed, _0x49d1ed);

                if (typeof _0x107f82 == _0x22e9('88')) {
                    if (_0x107f82[_0x22e9('cd')] == true) {
                        console[_0x22e9('9')](_0x22e9('d9') + (_0x107f82[_0x22e9('8d')][_0x22e9('da')][_0x22e9('db')] || ''));

                        $[_0x22e9('c0')] = _0x107f82[_0x22e9('8d')][_0x22e9('dc')] && _0x107f82[_0x22e9('8d')][_0x22e9('dc')][0] && _0x107f82[_0x22e9('8d')][_0x22e9('dc')][0][_0x22e9('dd')] && _0x107f82[_0x22e9('8d')][_0x22e9('dc')][0][_0x22e9('dd')][_0x22e9('19')] || '';
                        $[_0x22e9('de')] = _0x107f82[_0x22e9('8d')][_0x22e9('df')][_0x22e9('de')];

                        if (_0x107f82[_0x22e9('8d')][_0x22e9('dc')] && _0x107f82[_0x22e9('8d')][_0x22e9('dc')][_0x22e9('22')]) {
                            for (let _0x38f42e = 0; _0x38f42e < _0x107f82[_0x22e9('8d')][_0x22e9('dc')][_0x22e9('22')]; _0x38f42e++) {
                                const _0x20bba5 = _0x107f82[_0x22e9('8d')][_0x22e9('dc')][_0x38f42e];

                                if (_0x20bba5[_0x22e9('d2')] && _0x20bba5[_0x22e9('d2')][_0x22e9('e0')]("京豆")) {
                                    $[_0x22e9('e1')] = parseInt(_0x20bba5[_0x22e9('d1')]);
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    console[_0x22e9('9')](_0x49d1ed);
                }
            } catch (_0x30eee4) {
                $[_0x22e9('30')](_0x30eee4, _0x1d9cc0);
            } finally {
                _0x59dc99();
            }
        });
    });
}

function jsonParse(_0x59183c) {
    if (typeof _0x59183c == _0x22e9('e2')) {
        try {
            return JSON[_0x22e9('85')](_0x59183c);
        } catch (_0x579a13) {
            console[_0x22e9('9')](_0x579a13);

            $[_0x22e9('14')]($[_0x22e9('15')], '', _0x22e9('e3'));

            return [];
        }
    }
}

_0xodj = 'jsjiami.com.v6'; // prettier-ignore

function Env(t, e) {
    "undefined" != typeof process && JSON["stringify"](process["env"])["indexOf"]("GITHUB") > -1 && process["exit"](0);

    class s {
        constructor(t) {
            this["env"] = t;
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                "url": t
            } : t;
            let s = this["get"];
            "POST" === e && (s = this["post"]);
            return new Promise((e, i) => {
                s["call"](this, t, (t, s, r) => {
                    t ? i(t) : e(s);
                });
            });
        }

        get(t) {
            return this["send"]["call"](this["env"], t);
        }

        post(t) {
            return this["send"]["call"](this["env"], t, "POST");
        }

    }

    return new class {
        constructor(t, e) {
            this["name"] = t;
            this["http"] = new s(this);
            this["data"] = null;
            this["dataFile"] = "box.dat";
            this["logs"] = [];
            this["isMute"] = false;
            this["isNeedRewrite"] = false;
            this["logSeparator"] = "\n";
            this["startTime"] = new Date()["getTime"]();
            Object["assign"](this, e);
            this["log"]("", `🔔${this["name"]}, 开始!`);
        }

        isNode() {
            return "undefined" != typeof module && !!module["exports"];
        }

        isQuanX() {
            return "undefined" != typeof $task;
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
        }

        isLoon() {
            return "undefined" != typeof $loon;
        }

        toObj(t, e = null) {
            try {
                return JSON["parse"](t);
            } catch {
                return e;
            }
        }

        toStr(t, e = null) {
            try {
                return JSON["stringify"](t);
            } catch {
                return e;
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this["getdata"](t);

            if (i) {
                try {
                    s = JSON["parse"](this["getdata"](t));
                } catch {}
            }

            return s;
        }

        setjson(t, e) {
            try {
                return this["setdata"](JSON["stringify"](t), e);
            } catch {
                return false;
            }
        }

        getScript(t) {
            return new Promise(e => {
                this["get"]({
                    "url": t
                }, (t, s, i) => e(i));
            });
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this["getdata"]("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i["replace"](/\n/g, "")["trim"]() : i;
                let r = this["getdata"]("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20;
                r = e && e["timeout"] ? e["timeout"] : r;
                const [o, h] = i["split"]("@"),
                    n = {
                        "url": `http://${h}/v1/scripting/evaluate`,
                        "body": {
                            "script_text": t,
                            "mock_type": "cron",
                            "timeout": r
                        },
                        "headers": {
                            "X-Key": o,
                            "Accept": "*/*"
                        }
                    };
                this["post"](n, (t, e, i) => s(i));
            })["catch"](t => this["logErr"](t));
        }

        loaddata() {
            if (!this["isNode"]()) {
                return {};
            }

            {
                this["fs"] = this["fs"] ? this["fs"] : require("fs");
                this["path"] = this["path"] ? this["path"] : require("path");
                const t = this["path"]["resolve"](this["dataFile"]),
                    e = this["path"]["resolve"](process["cwd"](), this["dataFile"]),
                    s = this["fs"]["existsSync"](t),
                    i = !s && this["fs"]["existsSync"](e);

                if (!s && !i) {
                    return {};
                }

                {
                    const i = s ? t : e;

                    try {
                        return JSON["parse"](this["fs"]["readFileSync"](i));
                    } catch (t) {
                        return {};
                    }
                }
            }
        }

        writedata() {
            if (this["isNode"]()) {
                this["fs"] = this["fs"] ? this["fs"] : require("fs");
                this["path"] = this["path"] ? this["path"] : require("path");
                const t = this["path"]["resolve"](this["dataFile"]),
                    e = this["path"]["resolve"](process["cwd"](), this["dataFile"]),
                    s = this["fs"]["existsSync"](t),
                    i = !s && this["fs"]["existsSync"](e),
                    r = JSON["stringify"](this["data"]);
                s ? this["fs"]["writeFileSync"](t, r) : i ? this["fs"]["writeFileSync"](e, r) : this["fs"]["writeFileSync"](t, r);
            }
        }

        lodash_get(t, e, s) {
            const i = e["replace"](/\[(\d+)\]/g, ".$1")["split"](".");
            let r = t;

            for (const t of i) if (r = Object(r)[t], void 0 === r) {
                return s;
            }

            return r;
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array["isArray"](e) || (e = e["toString"]()["match"](/[^.[\]]+/g) || []), e["slice"](0, -1)["reduce"]((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math["abs"](e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e["length"] - 1]] = s, t);
        }

        getdata(t) {
            let e = this["getval"](t);

            if (/^@/["test"](t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/["exec"](t),
                    r = s ? this["getval"](s) : "";

                if (r) {
                    try {
                        const t = JSON["parse"](r);
                        e = t ? this["lodash_get"](t, i, "") : e;
                    } catch (t) {
                        e = "";
                    }
                }
            }

            return e;
        }

        setdata(t, e) {
            let s = false;

            if (/^@/["test"](e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/["exec"](e),
                    o = this["getval"](i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";

                try {
                    const e = JSON["parse"](h);
                    this["lodash_set"](e, r, t);
                    s = this["setval"](JSON["stringify"](e), i);
                } catch (e) {
                    const o = {};
                    this["lodash_set"](o, r, t);
                    s = this["setval"](JSON["stringify"](o), i);
                }
            } else {
                s = this["setval"](t, e);
            }

            return s;
        }

        getval(t) {
            return this["isSurge"]() || this["isLoon"]() ? $persistentStore["read"](t) : this["isQuanX"]() ? $prefs["valueForKey"](t) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][t]) : this["data"] && this["data"][t] || null;
        }

        setval(t, e) {
            return this["isSurge"]() || this["isLoon"]() ? $persistentStore["write"](t, e) : this["isQuanX"]() ? $prefs["setValueForKey"](t, e) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][e] = t, this["writedata"](), true) : this["data"] && this["data"][e] || null;
        }

        initGotEnv(t) {
            this["got"] = this["got"] ? this["got"] : require("got");
            this["cktough"] = this["cktough"] ? this["cktough"] : require("tough-cookie");
            this["ckjar"] = this["ckjar"] ? this["ckjar"] : new this["cktough"]["CookieJar"]();
            t && (t["headers"] = t["headers"] ? t["headers"] : {}, void 0 === t["headers"]["Cookie"] && void 0 === t["cookieJar"] && (t["cookieJar"] = this["ckjar"]));
        }

        get(t, e = () => {}) {
            t["headers"] && (delete t["headers"]["Content-Type"], delete t["headers"]["Content-Length"]);
            this["isSurge"]() || this["isLoon"]() ? (this["isSurge"]() && this["isNeedRewrite"] && (t["headers"] = t["headers"] || {}, Object["assign"](t["headers"], {
                "X-Surge-Skip-Scripting": false
            })), $httpClient["get"](t, (t, s, i) => {
                !t && s && (s["body"] = i, s["statusCode"] = s["status"]);
                e(t, s, i);
            })) : this["isQuanX"]() ? (this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t["opts"], {
                "hints": false
            })), $task["fetch"](t)["then"](t => {
                const {
                    "statusCode": s,
                    "statusCode": i,
                    "headers": r,
                    "body": o
                } = t;
                e(null, {
                    "status": s,
                    "statusCode": i,
                    "headers": r,
                    "body": o
                }, o);
            }, t => e(t))) : this["isNode"]() && (this["initGotEnv"](t), this["got"](t)["on"]("redirect", (t, e) => {
                try {
                    if (t["headers"]["set-cookie"]) {
                        const s = t["headers"]["set-cookie"]["map"](this["cktough"]["Cookie"]["parse"])["toString"]();
                        s && this["ckjar"]["setCookieSync"](s, null);
                        e["cookieJar"] = this["ckjar"];
                    }
                } catch (t) {
                    this["logErr"](t);
                }
            })["then"](t => {
                const {
                    "statusCode": s,
                    "statusCode": i,
                    "headers": r,
                    "body": o
                } = t;
                e(null, {
                    "status": s,
                    "statusCode": i,
                    "headers": r,
                    "body": o
                }, o);
            }, t => {
                const {
                    "message": s,
                    "response": i
                } = t;
                e(s, i, i && i["body"]);
            }));
        }

        post(t, e = () => {}) {
            if (t["body"] && t["headers"] && !t["headers"]["Content-Type"] && (t["headers"]["Content-Type"] = "application/x-www-form-urlencoded"), t["headers"] && delete t["headers"]["Content-Length"], this["isSurge"]() || this["isLoon"]()) {
                this["isSurge"]() && this["isNeedRewrite"] && (t["headers"] = t["headers"] || {}, Object["assign"](t["headers"], {
                    "X-Surge-Skip-Scripting": false
                }));
                $httpClient["post"](t, (t, s, i) => {
                    !t && s && (s["body"] = i, s["statusCode"] = s["status"]);
                    e(t, s, i);
                });
            } else {
                if (this["isQuanX"]()) {
                    t["method"] = "POST";
                    this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t["opts"], {
                        "hints": false
                    }));
                    $task["fetch"](t)["then"](t => {
                        const {
                            "statusCode": s,
                            "statusCode": i,
                            "headers": r,
                            "body": o
                        } = t;
                        e(null, {
                            "status": s,
                            "statusCode": i,
                            "headers": r,
                            "body": o
                        }, o);
                    }, t => e(t));
                } else {
                    if (this["isNode"]()) {
                        this["initGotEnv"](t);
                        const {
                            "url": s,
                            ...i
                        } = t;
                        this["got"]["post"](s, i)["then"](t => {
                            const {
                                "statusCode": s,
                                "statusCode": i,
                                "headers": r,
                                "body": o
                            } = t;
                            e(null, {
                                "status": s,
                                "statusCode": i,
                                "headers": r,
                                "body": o
                            }, o);
                        }, t => {
                            const {
                                "message": s,
                                "response": i
                            } = t;
                            e(s, i, i && i["body"]);
                        });
                    }
                }
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date();
            let i = {
                "M+": s["getMonth"]() + 1,
                "d+": s["getDate"](),
                "H+": s["getHours"](),
                "m+": s["getMinutes"](),
                "s+": s["getSeconds"](),
                "q+": Math["floor"]((s["getMonth"]() + 3) / 3),
                "S": s["getMilliseconds"]()
            };
            /(y+)/["test"](t) && (t = t["replace"](RegExp["$1"], (s["getFullYear"]() + "")["substr"](4 - RegExp["$1"]["length"])));

            for (let e in i) new RegExp("(" + e + ")")["test"](t) && (t = t["replace"](RegExp["$1"], 1 == RegExp["$1"]["length"] ? i[e] : ("00" + i[e])["substr"](("" + i[e])["length"])));

            return t;
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) {
                    return t;
                }

                if ("string" == typeof t) {
                    return this["isLoon"]() ? t : this["isQuanX"]() ? {
                        "open-url": t
                    } : this["isSurge"]() ? {
                        "url": t
                    } : void 0;
                }

                if ("object" == typeof t) {
                    if (this["isLoon"]()) {
                        let e = t["openUrl"] || t["url"] || t["open-url"],
                            s = t["mediaUrl"] || t["media-url"];
                        return {
                            "openUrl": e,
                            "mediaUrl": s
                        };
                    }

                    if (this["isQuanX"]()) {
                        let e = t["open-url"] || t["url"] || t["openUrl"],
                            s = t["media-url"] || t["mediaUrl"];
                        return {
                            "open-url": e,
                            "media-url": s
                        };
                    }

                    if (this["isSurge"]()) {
                        let e = t["url"] || t["openUrl"] || t["open-url"];
                        return {
                            "url": e
                        };
                    }
                }
            };

            if (this["isMute"] || (this["isSurge"]() || this["isLoon"]() ? $notification["post"](e, s, i, o(r)) : this["isQuanX"]() && $notify(e, s, i, o(r))), !this["isMuteLog"]) {
                let t = ["", "==============📣系统通知📣=============="];
                t["push"](e);
                s && t["push"](s);
                i && t["push"](i);
                console["log"](t["join"]("\n"));
                this["logs"] = this["logs"]["concat"](t);
            }
        }

        log(...t) {
            t["length"] > 0 && (this["logs"] = [...this["logs"], ...t]);
            console["log"](t["join"](this["logSeparator"]));
        }

        logErr(t, e) {
            const s = !this["isSurge"]() && !this["isQuanX"]() && !this["isLoon"]();
            s ? this["log"]("", `❗️${this["name"]}, 错误!`, t["stack"]) : this["log"]("", `❗️${this["name"]}, 错误!`, t);
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t));
        }

        done(t = {}) {
            const e = new Date()["getTime"](),
                s = (e - this["startTime"]) / 1e3;
            this["log"]("", `🔔${this["name"]}, 结束! 🕛 ${s} 秒`);
            this["log"]();
            (this["isSurge"]() || this["isQuanX"]() || this["isLoon"]()) && $done(t);
        }

    }(t, e);
}