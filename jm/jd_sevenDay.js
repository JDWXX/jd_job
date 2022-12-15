/*
活动名称：店铺签到 · 超级无线
环境变量：多活动id用逗号分开，不同环境变量对应不同链接类型，注意区分

LZKJ_SEVENDAY   https://lzkj-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=<活动id>
  LZKJ_SIGN     https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId=<活动id>
CJHY_SEVENDAY   https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=<活动id>
  CJHY_SIGN     https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=<活动id>

下方例子：	单个无需 ,  多活动id用逗号分开
export LZKJ_SEVENDAY="xxxx,xxxx,xxxxx"
export LZKJ_SIGN="xxxx,xxxx,xxxxx"
export CJHY_SEVENDAY="xxxx,xxxx,xxxxx"
export CJHY_SIGN="xxxx,xxxx,xxxxx"
export jd_sevenDay_blacklist="" 黑名单 用&隔开 pin值

cron: 7 7 7 7 7 jd_sevenDay.js

*/

const $ = new Env('超级无线店铺签到');
var __encode = 'jsjiami.com',
    _a = {},
    _0xb483 = ["_decode", "http://www.sojson.com/javascriptobfuscator.html"];
(function(_0xd642x1) {
    _0xd642x1[_0xb483[0]] = _0xb483[1]
})(_a);
var __Oxeda6f = ["isNode", "./jdCookie.js", "", "./sendNotify", "./function/krgetToken", "LZKJ_SEVENDAY", "env", ",", "split", "LZKJ_SIGN", "CJHY_SEVENDAY", "CJHY_SIGN", "COOKIE_NUM", "push", "forEach", "keys", "JD_DEBUG", "false", "log", "CookiesJD", "getdata", "[]", "parse", "cookie", "map", "reverse", "CookieJD2", "CookieJD", "filter", "whitelist", "jd_sevenDay_whitelist", "blacklist", "jd_sevenDay_blacklist", "done", "finally", "❌ ", "name", ", 失败! 原因: ", "!", "catch", "    请填写签到变量,不同无线签到的变量请查看注释~        ", "默认跑前10账号，变量为：COOKIE_NUM", "【提示】请先获取京东账号一cookie直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", "msg", "UserName", "match", "index", "isLogin", "nickName", "    ******开始【京东账号", "】", "*********", "【提示】cookie已失效", "京东账号", " ", "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", "cookie已失效 - ", "\n请重新登录获取cookie", "sendNotify", "bean", "ADID", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "UUID", "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "length", "❖ 签到类型1（ lzkj sevenDay ）", "wait", "    ❖ 签到类型2（ lzkj signActivity2 ）", "❖ 签到类型3（ cjhy sevenDay ）", "❖ 签到类型4（ cjhy signActivity ）", "【京东账号", " \n       └ 获得 ", " 京豆。", "", "有点儿收获", "activityUrl", "https://lzkj-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=", "activityId", "token", "secretPin", "venderId", "customer/getSimpleActInfoVo", "activityId=", "https://lzkj-isv.isvjcloud.com", "没有成功获取到用户鉴权信息", "签到 -> ", "common/accessLogWithAD", "venderId=", "&code=", "activityType", "&pin=", "&activityId=", "&pageUrl=", "&subType=app&adSource=tg_xuanFuTuBiao", "sign/sevenDay/wx/signUp", "actId=", "没有成功获取到用户信息", "https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId=", "sign/wx/signUp", "https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=", "https://cjhy-isv.isvjcloud.com", "&subType=app&adSource=", "https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=", "&subType=app", "set-cookie", "headers", ";", "=", "indexOf", "substr", "data", "isOk", "结果 -> 签到成功", "gift", "signResult", "获得 -> ", "giftName", " 🎉", "结果 -> ", "stringify", " -> ", "post", "https://lzkj-isv.isvjcloud.com/", "https://lzkj-isv.isvjcloud.com/sign/wx/", "lzkj-isv.isvjcloud.com", "application/json", "XMLHttpRequest", "zh-cn", "gzip, deflate, br", "application/x-www-form-urlencoded", "https://lzkj-isv.isvjcloud.comm", "jdapp;iPhone;9.5.4;13.6;", ";network/wifi;ADID/", ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "keep-alive", "https://cjhy-isv.isvjcloud.com/", "https://cjhy-isv.isvjcloud.com/sign/wx/", "cjhy-isv.isvjcloud.com", "https://cjhy-isv.isvjcloud.comm", "https://lzkj-isv.isvjcloud.com/customer/getMyPing", "userId=", "&token=", "&fromType=APP", "result", "pin", "nickname", "errorMessage", "京东返回了空数据", "https://cjhy-isv.isvjcloud.com/customer/getMyPing", "&fromType=APP&riskType=1", "https://lzkj-isv.isvjcloud.com/wxCommonInfo/token", "application/json, text/plain, */*", "UA", "statusCode", "undefined", "此ip已被限制，请过10分钟后再执行脚本    ", "outFlag", "toStr", " cookie API请求失败，请检查网路重试", "activityEnd", "活动已结束", "logErr", "get", "JD_USER_AGENT", "USER_AGENT", "./USER_AGENTS", "JDUA", "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "includes", "random", "floor", "当前已设置黑名单：", "&", "from", "join", "splice", "unshift", "toObj", "当前已设置白名单：", "x", "toUpperCase", "replace", "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion", "me-api.jd.com", "*/*", "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1", "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&", "retcode", "1001", "0", "userInfo", "hasOwnProperty", "baseInfo", "删除", "版本号，js会定", "期弹窗，", "还请支持我们的工作", "jsjia", "mi.com"];    const jdCookieNode = $[__Oxeda6f[0x0]]() ? require(__Oxeda6f[0x1]) : __Oxeda6f[0x2];
const notify = $[__Oxeda6f[0x0]]() ? require(__Oxeda6f[0x3]) : __Oxeda6f[0x2];
const getToken = require(__Oxeda6f[0x4]);
let cookiesArr = [],
    cookie = __Oxeda6f[0x2],
    message = __Oxeda6f[0x2];
let activityIdList1 = [];
let activityIdList2 = [];
let activityIdList3 = [];
let activityIdList4 = [];
let lz_cookie = {};
let CookieNum = 10;

if (process[__Oxeda6f[0x6]][__Oxeda6f[0x5]] && process[__Oxeda6f[0x6]][__Oxeda6f[0x5]] != __Oxeda6f[0x2]) {
    activityIdList1 = process[__Oxeda6f[0x6]][__Oxeda6f[0x5]][__Oxeda6f[0x8]](__Oxeda6f[0x7])
};
if (process[__Oxeda6f[0x6]][__Oxeda6f[0x9]] && process[__Oxeda6f[0x6]][__Oxeda6f[0x9]] != __Oxeda6f[0x2]) {
    activityIdList2 = process[__Oxeda6f[0x6]][__Oxeda6f[0x9]][__Oxeda6f[0x8]](__Oxeda6f[0x7])
};
if (process[__Oxeda6f[0x6]][__Oxeda6f[0xa]] && process[__Oxeda6f[0x6]][__Oxeda6f[0xa]] != __Oxeda6f[0x2]) {
    activityIdList3 = process[__Oxeda6f[0x6]][__Oxeda6f[0xa]][__Oxeda6f[0x8]](__Oxeda6f[0x7])
};
if (process[__Oxeda6f[0x6]][__Oxeda6f[0xb]] && process[__Oxeda6f[0x6]][__Oxeda6f[0xb]] != __Oxeda6f[0x2]) {
    activityIdList4 = process[__Oxeda6f[0x6]][__Oxeda6f[0xb]][__Oxeda6f[0x8]](__Oxeda6f[0x7])
};
if (process[__Oxeda6f[0x6]][__Oxeda6f[0xc]] && process[__Oxeda6f[0x6]][__Oxeda6f[0xc]] != 10) {
    CookieNum = process[__Oxeda6f[0x6]][__Oxeda6f[0xc]]
};
if ($[__Oxeda6f[0x0]]()) {
    Object[__Oxeda6f[0xf]](jdCookieNode)[__Oxeda6f[0xe]]((_0xd027xd) => {
        cookiesArr[__Oxeda6f[0xd]](jdCookieNode[_0xd027xd])
    });
    if (process[__Oxeda6f[0x6]][__Oxeda6f[0x10]] && process[__Oxeda6f[0x6]][__Oxeda6f[0x10]] === __Oxeda6f[0x11]) {
        console[__Oxeda6f[0x12]] = () => {}
    }
} else {
    let cookiesData = $[__Oxeda6f[0x14]](__Oxeda6f[0x13]) || __Oxeda6f[0x15];
    cookiesData = JSON[__Oxeda6f[0x16]](cookiesData);
    cookiesArr = cookiesData[__Oxeda6f[0x18]]((_0xd027xd) => {
        return _0xd027xd[__Oxeda6f[0x17]]
    });
    cookiesArr[__Oxeda6f[0x19]]();
    cookiesArr[__Oxeda6f[0xd]](...[$[__Oxeda6f[0x14]](__Oxeda6f[0x1a]), $[__Oxeda6f[0x14]](__Oxeda6f[0x1b])]);
    cookiesArr[__Oxeda6f[0x19]]();
    cookiesArr = cookiesArr[__Oxeda6f[0x1c]]((_0xd027xd) => {
        return !!_0xd027xd
    })
};
let whitelist = __Oxeda6f[0x2];
let blacklist = __Oxeda6f[0x2];
$[__Oxeda6f[0x1d]] = process[__Oxeda6f[0x6]][__Oxeda6f[0x1e]] || whitelist;
$[__Oxeda6f[0x1f]] = process[__Oxeda6f[0x6]][__Oxeda6f[0x20]] || blacklist;
getWhitelist();
getBlacklist();
!(async() => {
    // console.log(__Oxeda6f[0x5])LZKJ_SEVENDAY
    // console.log(__Oxeda6f[0x9])LZKJ_SIGN
    // console.log(__Oxeda6f[0xa])CJHY_SEVENDAY
    // console.log(__Oxeda6f[0xb])CJHY_SIGN
    // console.log(__Oxeda6f[0xc])CookieNum
    console[__Oxeda6f[0x12]](__Oxeda6f[0x28]);
    console[__Oxeda6f[0x12]](__Oxeda6f[0x29]);

    // LZKJ_SEVENDAY="e4f1e2a8c9bb43d89059a55460634621,d112e5c423fb45229a7d6bfda55e8e99,ce9311eb49d94a8db0bcacf67ab3b5f1,cf49c8b481344af88014c52edb5a6cab,383f7b1a2fd54ae9af8df5b563ebfdec,c43539ea2ec34287a2bba76f8e99be1a,15186b87aecb432d90ba1be1effeb0aa,fbd3b82e7c18405d84dc96a81538209d,3b91717e8c5d44f993ae11f16006b309,15ba921a64fe4a238f6939af958178f1,0c2d55d8914644aea24bb00d3792d197,e66a09bacb0141c8bea5f9301cf04d03,698607207afc4921915fe3119924800f,9f5462f1f18b4efb90a25bc0328dd19c,5dd294cfcc19412f8853939d94b73260,45858e45d3bf4d8d9568888ef134ae1b,9959f59aaa994ab98a2a84a17335b5fe,350d3628a9524a51812743743ce46192,25367a95766f44599b4cd8fa66694471"
    //  LZKJ_SIGN="ca60e0e132b24f609ce8d2f63a56cb81,cfd4fb8af0a14d838a4d796918549e2a,408b79d8eadd41a8aca91f0d8a5738e7,c2560ac2bcc94894ae41bb66e5921640,d6d680738f7349fd847b544b51abba01,d1bb25dba1fd4ba18082339609db0107,a971dd72e8dc49a88016d384ddd33eaf,c1a6981425c04b24bcc78550ef43d328,c3c508d819df444c9fe13edbb674c455,b8aa9b4311644050939f184d94807274,4d80e052a5c84ba69767fd4c8d48c03e,6370329f6230420bbef2a799ff0fb32c,d64ab31776db4237b1c91ee286dc6dae,191e2c0787e54fa69a5f1af3ccf0584a,a7e80e3f38624eef96f1298f5c3b8d40,fe5d11fbbf574847b29b37e2a258d2cc,a9488efe96fb493db2fb562915f6ddb1,dda9ab99d27f46a5b24b49cf057820a8,e8d35b3bcd014280890b23d143db230b,73b8ea07864943529239c006c386e4cb,0d357b3753d544d883dffa12b6232dac,f9595931da4345a8a9f517347c0b0f98,4cde18fd88dd4e62bff247a96832ba42,90bb4c594b524549ac1e554cd300fe6d,90d39cd245d040309c2bf0b8b6828ab1,b55d03f854114c929c7742ad4fec8259,884463baeb8b4046b2058617bd4eb1e2,42168fbbaa2e40e99ddd7d9ae355264b,f4dacfa1fdc14074a69d99795c0f958a,230d13544e5a4d0e98bb33afd83d163a,25c4dfede42c4be482001bba42ec9038,3df6ca9fb3884386a088bbb79289ca08,7a84a3e6479e445c935a3598f90af090,2fa4f81425f34bb5bbf577cc97d8d70a,0c6b7d3668154ded850ae7fc2ed6559d,f0bf04e0a0fd466b9e1e3de9bd9065fd,b0de94ca8c6e4c8cb58bd68f2a1f34f6,4406f45f08f546b4b0d1ba1f0baeb8eb,ed7e63117dc741c7a47311e822de0eca,9711ffd6042943e29b2a4f4a596ddfeb,56abcf7fa6d74587b1ccf8a659e46535,b71aeb6e8762404bb04c20971b5319a0,376677b9336b45b4bdcdc2b6bd237996,849741e110fa403e93f6501873f5e4c8,e8d35b3bcd014280890b23d143db230b,a66f79457b7a47368a2f24be618dbab6,f03d45ac19ba4ce0b21903edfc4738c4,f1a06aa6791b4d74bddea6482dc21cc2,37c9c011a9c44ab3923a1cd0ef35d5c7,9ea0e7919cfa4e0ea1d883b7a28f29e0,a5e3f5624dde46b8a4e6b84d8e0ac6fe,bbf2a3d244034784904377b1a6e709b4,5ae935ed44494a61bc7232a2e3fce8aa,6d8bc016a1d2413b8da526783eac8c90,f5c0ebb9ae8f45e1a677030db4a3a592,c454228125ec4ea88c173820602e5bb0,e857c7a7a466498d9474189c4f903530,22bf35cc3fa3423d83831865d7bf5df7,7976c7baf0e6402f9dd5f102ef3f2a19,b86f195f07964d8cbf5f3be7ae9ff5ff,c0d085d862e34fe2a2fa12c1c57dd49f,4d7c1eb1368047688c3bf3d23466839b,851d5a2b424c455baa0a2d26f98b550d,61d9565fb6b64ecab05adff872ae83e5,b69416d8fb0d4e22956a6e480c1f1982,35517223c51b42cfa614cdfc4d3ce0b0,bfb37a9376fd44cd95d04adcef1879c0,98990a9fd3c54a94a43dfb4d91f172d1,33b633d3111f461a9c813dd2ef7bce3b,85af33f75a0c419e87436e43e70d1c4c,da3663e59b034149bd998364dbd952bb,e220dfda1c6a4a8b8cff9db7d189d3f5,933f036fbdd947658b491cad1d5bce74,1f5562c3e345478799c2127375a2ba19,dc4fa6d4d7e34bba9207c83f39140e5f,38f2ce8c6b4f4da5a795754a19a27ad5,c252e6162582400384c1590269962539,508fb55f04824c8cbb093be0bffef89d,71b47e61235744eab983b98448c3c84a,563d344df1d64789b93ac99cb3bf6077,84c70677677040bcba08d732f0fb2ab6,c6de82d847124812961cb193ac9c8c49,4fdaa4c680c540f3b0783b4840705425,8205055948164968a6bb5d32c29ecb7f,314af1e4b8924357a558d9505b8b2358,8ca84682cb34492aab81f6393dd53f89,a644122c6e4143b59b928042dfc791c0,2e31aec9a4104006bfb2f950e8edf141,e206cf853dde4f629d9335f4e3125426,da3663e59b034149bd998364dbd952bb,1d78b878b9a84e4f88c46c47790b1c78,57e3ae3589174a7198aea6d54e659395,e43be3045e134cc6bc95b76a12f1b83c,36de987594114b8cbfa3da42b0580680,47a575c32f114252acee88b75325491d,676b1368f7cb4110bb6c66101a5dd7f8,64667fbcc07c409eba5a112189079606,9b81fc064cde475286750494c49bed93,aac7a693623b430e9faf688a7fc20085,518c2f6767a54050a7546639326e82da,7ce22260392144d18b66af4690eefaf4,a0b7a0c4a0374675a7ad23ad4958fa72,1b327e220ef0499c97424f57abd1a1e7,66e874d5c7ca44d7ba0886908aacae60,e5f625f767e142c5b5c174ca6a16c37b,9d3e456b7204434f9fb4e729f9252368,0db6fb628ad048008ef09123a4378bc1,760edb155e214584b026a3460426106a,1736f4a7ce9a462cafcff4ed85ca4791,adf89cdf534c4aab99fc4a3e6c0368cf,57262811071e4491a0d1997222b65137,760edb155e214584b026a3460426106a,e3f4608c346e4226937a538a06147c71,437ebe535df0485591f608fdb2acde0a,79c0752a2fc2413db2cf0fa3e7d79de2,ffc2e19266c84593ba8ae76052205c56,1736f4a7ce9a462cafcff4ed85ca4791,392a651a65fe430197304c86355f193c,f91a612ddc0844a8a48b6aa2a7e1b45c,1c4a22cb3834484ebf2e75a4fba38e6e,473fe6414d2d4ffd9c9b2cfb868db7db"

    __Oxeda6f[0xa]="7f6a7073701a42e6ade6969b0a5cb7bb,39207cebf759434fbdda88c9fa097dd0,d6bc8d1810864ee8bd50160802a60ba9,b2c63dad57094146b960c72e4a039423,ca7740d24a1b4cafb5208e9526823393,0c8b77af9f0b43ccbe4e77896ae02c72,9abf9037fdbb4026a8f1c2e6e7b7ee46,4d0354afb4a74200a629fc1da5fa10a7,68f28854253843b582b8338bc50d16a1,2875ac042d904d988e8db140e267eac7,0523017cb0fd453891308379b534ac4f,98e1da7e80ef4db9b5124883c5cc3076,7379e6d5258a4edf93849de1e286e0b0,47101557c7bb4900b07b44d70cd184ee,a436ebba38614f5a898761b6025892f1,5f114d224d3348fe8aa452b560526fc9,0fe10b6b922a467ab1a45ed0436d9460,5872c5b3df084031b2f07f132d0682f5,0e8075168a414ecfade6c38107d838b7,d9fa85c4c17b469399a376eede691a6f,adfffc90e3dd493786395b806141810e,250f913858cb4766b19652386f2ca9cd,6070f8a2f273482f91e27fcba6a29842,ab4b5e61255d4b178ee0646ea2f671f2,53bad11ace8548f3933f37848dd6b073,08bcd0f81fc74d5c89687a30e97e56a7,5653ff7fccdb4484b04b6f56234a8378,9b6762bbd9d543c4a37f3c3d110135d6,0e8283d55aee48d1bbba7a99e13ca3bf,089b7322556048d49c1443710d99a37d,1e341ecd649f4663b4f4701ef8f1f6be,ec2fbab627764ac98c4e147671dde7d1,42544f7e13d04862b0b9b219c0982532,f9838dcdc4214fa995885cf3c448a79e,fb912355df03413283405aa486429efb,8945f1b4880840acb1eb8c3f5b231745,101fde999be649f59facc0cf112c28cb,cbe379e1eaaf45d68ef235bb4579a21f,b7b9d76e1b1a4c4aa9c4dce891ab74d5,21032d3c41ef4c819dbae9493d99b413,7445df64af95402fa274e1f31b1d6355,4bb3db6467d14647b0db9197f6ac33d7,fb5c461b8ae544e9b700519b1ee21800,a4baad68229a47518489d1e4a30fc72d,e27983113785435c8bd07aa998faf898,e7ec0eb974ba433b8c120b799a3c3839,6bf552a177814f559d940d41ac0fbf01"
    __Oxeda6f[0xb]="91b237a850604bf58153a31d6bce10f9,6c2d852ef388469eb2f65c554fddd457,fd615568493b4a0aba36307d3d7f10e4,2f9fddf9b72a4423bd37ee2c982e007c,6405e099fd1241b9b9631e28bad753d1,d1cff5067d0943c694d39293b3e145a1,42dad748af004bd89e8d407362295ec9,fa9c6659ce714a6a8e85db6e18bdff84,9901d16c293840a79d868e19e754bbb7,84da8482d9cb4b43b294f71631c16322,1e4df607ac1d401f99aea2d7daeab963,c715bec343b5414b86d245b2484545ff,b85a94f41a0f4bdca612bbb7564e8da1,34f943bfa9264643afe19c4755393f4a,c17bcadbbbe946dd9c6a22cb1d4e0642,be7d502ed93d498784d0c6431390b42e,7eb94aada2b5412a97bf7e1fa77e53ee,445ca250e0c14d71a0b780476d4e9c51,9d0b36c4f3ac4afc8cca199752c4ce75,7571d27b2e60468f8154f8420078537b,a66d182d0fa54580add0b89f4877c50b,df51e1721a754b6eba577c285d2fb1c6,ef01973864874507991c6a30d921edd4,005b234844df41a682b517466d6c80d3,c6ae99481ee84413bb1f93fbce162191,b032e9ce80a144eaa56438c078454aba,77b6fd6ee1e644e9a6f9211aa77f1bd3,9c9109522eb84c0a842ae390094f017d,3e5c352ad9ac4824bbd625836c03effd,2f09950cfce142d4818181ea90dbc9c1,3588da1669164e158942b33d8e8e96a4,731a3a3a22084bfeae9fa97115e08cb5,18249ed3e6044fd4911c822caba6ef13,a9684a9af39c40ff9ba12967276b8e66,917a593633de4684af0674cfbfcee397,e4bb02929af74997b56e8c5153451233,70e5b2f490b24750845c1eec7929dd3e,b3d4d2f4d0834fb1a2501227bc6bb49e,5b52be3ee62f407394e8e2f21aaa23b8,07e6495ccee54084abe5a72928312ce1,2f08f049785444c787de72895c6ac66d,31ef4604c7984e929aa2d86e191c5c5c,7999f3ef0a3c47aab04c92b5f1e29fba,6a3743c5c8a04b248096301ccca18c1a,bb833b720d254cd7ade596e792694fcc,432e2b4366974475864f015c68475e4a,40b2eab475ed4e19a60fcc41d2b2e981,cd982901c7b2431b9da671381be8d3ae,fc0af58022c945d9af026cfd3ff777a9,d3c0b1b2f97f46f3a85fe512d9727ceb,d215fe14f0e64a54b5f72283a476d573,42b9017fa9ce47b39e66ba395b9143fc,23b4dd68026f42b5aafed0b519ba8b1b,36d8e81781f14e5d8e6224f8d8f8854a,b02cadf496c748138292b3b492e06204,0cc960dacaa8428c90378ddcf5cd17f1,4063a90d2cbe4d7382aa571958be5306,b2ac456c17984d2881d81178f10c3264,dc5cd550654248749755ecf878b01c77,7b9313cd4bb04473b518966a91f473c5,f732ceb4a50e4c499e4a2d6c7b3d8bc3,7415000d02954d6588cb0cf0c04431f2,540e14277303478b8fe679cffcc59ff5,a3a610a5827e47e7b71dbf5b2b4c3ad0,22dea535961249888b751f69093223e9,6283f42bcef34291ba9920841860525d,42b62c99586b4f9f9f1b956964b67c34,fdd88a9799c74e0cbcb97135f7cbc09f,1d153ed8723540e8a540500f132abc3b,5070cfba0b734d40a9c6812d712c5b77,1f278fe45a85439aa0fecbd89788f014,de3c2de56cf94ea0bb1724eb9a81662c,94c89a9942c5433b80db8b9b8a4cfa0f,d6df9b8675e54612abea499156fbed6b,b85a94f41a0f4bdca612bbb7564e8da1,c715bec343b5414b86d245b2484545ff,3bdb40c03304456089eeabd0514d48ed,02f68b482745497d920289675b75edd1,b6e309da683e434e83f01dea278e54f0,feae884f2fc448a98a3d52fb5e26aeb2,3ee0c00aa19f427e80e24d478d181825,b83df1c4e6204d8d8d6fa4e0ba0e0bb8,a0a3630165bd44919149bfa674221f2f,06f026e9db4048c08cf230a2b2349ce4,1ac6f5927a024534873b3db4651a17df,9901d16c293840a79d868e19e754bbb7,4ed6b06a52684340aac4d85c7fe9f002,d50c61d654dd488089c7e114ccf6eb2b,aa9a3cfe98784dd684ba6ca8584a44ac,482eb054977e4573b913f0eb124e9f04,380765dbbb494aa6bb6b21bf06296ea9,15afa88271674d7c93cb6672c6c29d9f,c792c54ef72c4e36af3d4ab2465f5889,91f74b3c6593483c93cead8bd466696b,e24562240a7247f0a13c21390fed46a0,16c33c60ca2847629fe3d47b12aaacc0,4cf4aa0cfadf4fecaddc3140832928ee,619629df28cb46229e036b341bdcbf11,f079934fdfa743ba9d0e41b3e20ac7d7,5c3bb6522c49411c9b9a803a9ff2a37b,0fe6005427e04e5884af72f85e3b3f62,99ba46d102f84224b4d3be886f0188e1,f0134fb591324a4ab42e479a2a98e97e,84da8482d9cb4b43b294f71631c16322,2f84bb2f374f4fc98e5cd9030c97ec20,ea9c7ddc22b54a1db2bb42d73d39290e,9175baaf288f4bbb8b32c64c34b556bf,7be894c5e09343fb99f8d4483b34dcb5,0ff837863f4d44658764bafce42baa69,5ba05eeb9ba14ca29e2aa75c375f249c,d33e56654c204ca58a838b49a6c21102,a4c14156112e4479a892c3d80cb48afd,c50b388f6244488e9160799089f48161,62a8367b2b984ad7a3e41d3c484be796,85155c91536b472dbadf935181602eb1,b4a3728774644bb882fd65967d23a71a,c8919e40d04948c291e056ceaec8ac68,76b126a9e4b9464ca636c7065a1e2339,c936170acedc401292e4dfe398f27cb2,fd29f03ec1a14a31ab926f92db0bab0c,3494869e2b6d4bc9a58ea5fbfe413d30,bec1418a867e4824bfd2a35f008972ab,f66562fe15d84885ba2a47a651f1dfe7,3dfe606f7ecf434d9f1d0362c678097f,3e787f71183d4fc4b8d8a9aac38e2e65,d8621c241c964da391b41045371d8b94,5689e068563142f8bdbbf1c584e1da22,fc4fa32c0afd4567b0a9ad428abf9d2b,98c0a4127ca74d46a664f2cef43ddc4f,15db498e33574c26ba051f6b131a65f8,d55d82213b724fa1a4e8b5b7bae24e0f,42dad748af004bd89e8d407362295ec9,d574b517ca994a39b0e6b46ad3ee07e7,758db9781edf4521a2bfb707d481cd47,ffe5dbfe5a6e4ba2a010ad1ace5fb28c,f9cd1f9bd0af441aaee9d3711725dde5,5a9645ec94f748d9b7329816671c2bc7,f6ee8fc604da4e278fc983cc3ebc0cff,f7d2195b0f214cd3b4c66e05ed9023cc,7bf49e4292df4574aa973b6b4ffee3fb,75ec6a8ede294f20b434defbedd6a9f7,33e0b92d1b624d9bb9985c2914d95af6,84d2df96a8574d1f9b199456875b2426,204f01eec8254bc9a250129e4291da14,7757efe8447a425090bccf728115fb5d,73482c6c8c7b413ba77d198f73001d2c,b5ea06557a6c43afbc9e1be7babcad0a,be96506d08234a00898a6eed41f132b1,2fbb065f55464445b2f5d88ebe71d8d3,8e5c33f87b9948f1b5ba774f749d2883,a70499b64ade492ea6baf554f91a9e66,1a82a71a6eb14349bc8e9f17cb07caf3,22cc61f8038f4804873daab7413cc82e,a34735c38d404d7e805ac76b85ea0344,3e5c352ad9ac4824bbd625836c03effd,427e47f2f9ad4757b72b6556df5e72f1,f6ab085f4bcf47dfa4deb1438b10ced5,cc2a9e966ea54450985017dd26b8b691,342183919a3a4bc9999948e26a4d6f14,427e47f2f9ad4757b72b6556df5e72f1,639275fe3c8d44808c21c36c6f5a815d,1e4df607ac1d401f99aea2d7daeab963,1c5c6c4bbdf747268bc2141ea1fa7c10,5e4de13768dc4747bb521498b073eb61,d1cff5067d0943c694d39293b3e145a1,d4ceace609aa4b19b0a20e3ff2b90ee4,79aa06229eea4002bbb0ad4347818bde,a4fd566771744566af448bf1fff6ae57,1fe0889ed3b348d9b0d0f7e405802dbf,5f2c0ad2162c4041a5bea38f3ff366b2,feac1c4b7b984f27af1f2dd71bdd7742,9fa35bf2785043e7b0726c7612ddc41e,16c33c60ca2847629fe3d47b12aaacc0,943d98b5b76a47929350e8451acef19f,2dc949f7986f4c55a9b8b85ed176c774,8593e3d6957d4de386d4b10683b0a5b3,e07b41ba10bc4d6a9eb142016957724f,25f257f36c6a47e19d6422f42f80549e,b337c36a33d14135a1b2735c2195bf7d,f9ad7dbe4be0440495371615a3b08f01,030305cc1aff4257b6849b5394e01465,61a976aa5af74631b64ca1e6634d7222,8b864d2a13b34f849c7f1bbdff1f59ab,01882694d5e748d4bea628125d3201e5,80672e7c25394fdd9d6dd1c1a2b78b37,bffacd9216a746f59abdae1780d3bd39,0f39ae4dab85448f9accc06d015e10dd,2416d5541b044815b133ade59c286380,b1a63883d11e469e98a71c8a1ae18e36,ea9dd455c0934a7eb4a6a5e0ae7c773b,80d0ff65a3df474ba454af1f75cc302e,ea3ade3e34f34cd49a82bda9b5b3ea2d,1b4d59cfd2c64262a5552a93c083e592,4aec39f9d6fc49c3b6269bc80e7e4779,0470c2f90d86470da9e19053a27763cd,80081851184949cba7a1a5d7fc0ed4eb,bffacd9216a746f59abdae1780d3bd39,771efbe5fd2a4ec780038f77b415f3b2,eda4aaafe7aa47f88c26eb2be8b22f79,1cc1981798fd45d8af66661b7e15825a,eb3a85d3cced46dc91d83bd5a6c227b6,c8d2e5e74cca4bd0aec53fd827044974,ce16da13866e45e6983e72130bf1f809,7e923df213074d25ac5ced90548a4f81,6cec46d2666543ea8ad1d250a6eafa34,3952c24dc9bd49b4ac79daa8d2ef4572,15c2624b8625447891e150e33d91c396,b63fcde1522c4c9b9f5684d8d561ae90,ed95932e59484beda7d9881ea3ee0c29,9193dba33b1f4c3dbab34069e75751df,84de3d34832445e395a853b19fe46f6a,9e342b6b9e734b1a87f3bbe4ebf7afcd,d021991ccfb44d558c91cd36120f8978,454f62b18f4844d0be306bb80aadf54c,eaafcf4a48e74160b984357ab0da652f,a34735c38d404d7e805ac76b85ea0344,6a99719efa034159a38f90c47ba9c9be,8d902322026c4a728a2825373f69414e,c153ea68871c4e8287b50171cf029639,c5dbe6e2239a447ca0e8c15d5d743f3a,93f004b4c26e402ab265b7b0aa4a4a69,43effa8bee424e768d9fb824bed6f78e,19ee24fffa004a5486bc04bce10eb69c,d4095a43dc5e40e9be7dac1ef38e1346,d635c183b8334ec7b757a157f2e75d38,f01c0ab2cd1240dfb5f875c2e7a784d4,e2eaaea7dacf4c49ad0c497306c3b3d1,cd6e697751f541babc3589369b32f40f,7ea79904e7ca409cbc9fb69efd680d9d,224cb55d8ab1412bb7b1c12bfc95f72e,436d54b4bca0443582b52edd4d267134,8060a4ef7aa14439b63583dbe9e5778a,ea3f383a6a284db493bd5e64136e7d23,7c9f9cef3c0245839dd549b3ca981f62,f6a12cdff00344d7a1c7aa180728955d,438fdd64c2c14686a145e66bf11d07c1,a3740756f127475cb9ca8f66baba85e7,84e4a254600c4f948cefc55c53d3a08c,54584b4b02884c1793ea11fcbba3bde0,c617630cf3134199815b50b60206538a,8bc501a7114d4d0d90a4e9fc59714910,d8fd69b08aba428f95a8158778385cd8,46a54f83491e42c5841b40e28db8b236,028564fdb88c4e40b25385b7738eef5f,a3740756f127475cb9ca8f66baba85e7,9e5a00e221ff4d1db7777355f9bc3b7f,2f674ef49aa04030a1551d299de60352,16f3bb10a8d44fb4807f05e9156d3735,49e6d7954155440bb2242bfa0ff4c4fc,56f4efd36b7846e09dac681e415bc55d,08a4ac7aaeac4a4eac4c80abd0361295,558543a5239847eab8c29f743cc1c096,c279419a63384fcd9ffa949bdad6b0ee,e5583bd3294448d3bf1fb8f2daaf75e9,2bf9ee81713c4d699ba72be4af71d3d7,2ab8552c37ce47549643899767957bb4,0d9a79848431483faaf9f2742fa5dd98,bb35aad5d8d047b198c81a8c3585b7fe"

    if (!cookiesArr[0x0]) {
        $[__Oxeda6f[0x2c]]($[__Oxeda6f[0x24]], __Oxeda6f[0x2a], __Oxeda6f[0x2b], {
            "open-url": __Oxeda6f[0x2b]
        });
        return
    };
    for (let _0xd027x12 = 0; _0xd027x12 < CookieNum; _0xd027x12++) {
        if (cookiesArr[_0xd027x12]) {
            cookie = cookiesArr[_0xd027x12];
            originCookie = cookiesArr[_0xd027x12];
            newCookie = __Oxeda6f[0x2];
            $[__Oxeda6f[0x2d]] = decodeURIComponent(cookie[__Oxeda6f[0x2e]](/pt_pin=(.+?);/) && cookie[__Oxeda6f[0x2e]](/pt_pin=(.+?);/)[0x1]);
            $[__Oxeda6f[0x2f]] = _0xd027x12 + 1;
            $[__Oxeda6f[0x30]] = true;
            $[__Oxeda6f[0x31]] = __Oxeda6f[0x2];
            console[__Oxeda6f[0x12]](__Oxeda6f[0x32] + $[__Oxeda6f[0x2f]] + __Oxeda6f[0x33] + ($[__Oxeda6f[0x31]] || $[__Oxeda6f[0x2d]]) + __Oxeda6f[0x34]);
            if (!$[__Oxeda6f[0x30]]) {
                $[__Oxeda6f[0x2c]]($[__Oxeda6f[0x24]], `${__Oxeda6f[0x35]}`, `${__Oxeda6f[0x36]}${$[__Oxeda6f[0x2f]]}${__Oxeda6f[0x37]}${$[__Oxeda6f[0x31]]|| $[__Oxeda6f[0x2d]]}${__Oxeda6f[0x38]}`, {
                    "open-url": __Oxeda6f[0x2b]
                });
                if ($[__Oxeda6f[0x0]]()) {
                    await notify[__Oxeda6f[0x3b]](`${__Oxeda6f[0x2]}${$[__Oxeda6f[0x24]]}${__Oxeda6f[0x39]}${$[__Oxeda6f[0x2d]]}${__Oxeda6f[0x2]}`, `${__Oxeda6f[0x36]}${$[__Oxeda6f[0x2f]]}${__Oxeda6f[0x37]}${$[__Oxeda6f[0x2d]]}${__Oxeda6f[0x3a]}`)
                };
                continue
            };
            $[__Oxeda6f[0x3c]] = 0;
            $[__Oxeda6f[0x3d]] = getUUID(__Oxeda6f[0x3e], 1);
            $[__Oxeda6f[0x3f]] = getUUID(__Oxeda6f[0x40]);
            if (activityIdList1[__Oxeda6f[0x41]] >= 1) {
                console[__Oxeda6f[0x12]](__Oxeda6f[0x42]);
                await signActivity1();
                await $[__Oxeda6f[0x43]](5000)
            };
            if (activityIdList2[__Oxeda6f[0x41]] >= 1) {
                console[__Oxeda6f[0x12]](__Oxeda6f[0x44]);
                await signActivity2();
                await $[__Oxeda6f[0x43]](5000)
            };
            if (activityIdList3[__Oxeda6f[0x41]] >= 1) {
                console[__Oxeda6f[0x12]](__Oxeda6f[0x45]);
                await signActivity3();
                await $[__Oxeda6f[0x43]](5000)
            };
            if (activityIdList4[__Oxeda6f[0x41]] >= 1) {
                console[__Oxeda6f[0x12]](__Oxeda6f[0x46]);
                await signActivity4();
                await $[__Oxeda6f[0x43]](5000)
            };
            if ($[__Oxeda6f[0x3c]] > 0) {
                message += `${__Oxeda6f[0x47]}${$[__Oxeda6f[0x2f]]}${__Oxeda6f[0x33]}${$[__Oxeda6f[0x31]]|| $[__Oxeda6f[0x2d]]}${__Oxeda6f[0x48]}${$[__Oxeda6f[0x3c]]}${__Oxeda6f[0x49]}`
            }
        }
    };
    if (message !== __Oxeda6f[0x2]) {
        if ($[__Oxeda6f[0x0]]()) {
            await notify[__Oxeda6f[0x3b]]($[__Oxeda6f[0x24]], message, __Oxeda6f[0x2], __Oxeda6f[0x4a])
        } else {
            $[__Oxeda6f[0x2c]]($[__Oxeda6f[0x24]], __Oxeda6f[0x4b], message)
        }
    }
})()[__Oxeda6f[0x27]]((_0xd027x11) => {
    $[__Oxeda6f[0x12]](__Oxeda6f[0x2], `${__Oxeda6f[0x23]}${$[__Oxeda6f[0x24]]}${__Oxeda6f[0x25]}${_0xd027x11}${__Oxeda6f[0x26]}`, __Oxeda6f[0x2])
})[__Oxeda6f[0x22]](() => {
    $[__Oxeda6f[0x21]]()
});
async function signActivity1() {
    for (let _0xd027x14 = 0; _0xd027x14 < activityIdList1[__Oxeda6f[0x41]]; _0xd027x14++) {
        $[__Oxeda6f[0x4c]] = `${__Oxeda6f[0x4d]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`;
        $[__Oxeda6f[0x4e]] = activityIdList1[_0xd027x14];
        console[__Oxeda6f[0x12]](__Oxeda6f[0x2]);
        if (_0xd027x14 == 0) {
            $[__Oxeda6f[0x4f]] = null;
            $[__Oxeda6f[0x50]] = null
        };
        $[__Oxeda6f[0x51]] = null;
        await getLZCK();
        await $[__Oxeda6f[0x43]](1500);
        await task1(__Oxeda6f[0x52], `${__Oxeda6f[0x53]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`, 1);
        await $[__Oxeda6f[0x43]](1500);
        if (_0xd027x14 == 0) {
            $[__Oxeda6f[0x4f]] = await getToken(cookie, __Oxeda6f[0x54]);
            if ($[__Oxeda6f[0x4f]]) {
                await getMyPing1()
            } else {
                $[__Oxeda6f[0x12]](__Oxeda6f[0x55]);
                break
            }
        };
        if ($[__Oxeda6f[0x50]]) {
            console[__Oxeda6f[0x12]](`${__Oxeda6f[0x56]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`);
            if ($[__Oxeda6f[0x51]]) {
                await task1(__Oxeda6f[0x57], `${__Oxeda6f[0x58]}${$[__Oxeda6f[0x51]]}${__Oxeda6f[0x59]}${$[__Oxeda6f[0x5a]]}${__Oxeda6f[0x5b]}${encodeURIComponent($[__Oxeda6f[0x50]])}${__Oxeda6f[0x5c]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x5d]}${$[__Oxeda6f[0x4c]]}${__Oxeda6f[0x5e]}`, 1);
                await $[__Oxeda6f[0x43]](1500)
            };
            await task1(__Oxeda6f[0x5f], `${__Oxeda6f[0x60]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x5b]}${encodeURIComponent($[__Oxeda6f[0x50]])}${__Oxeda6f[0x2]}`, 1);
            await $[__Oxeda6f[0x43]](1000)
        } else {
            $[__Oxeda6f[0x12]](__Oxeda6f[0x61]);
            break
        }
    }
}
async function signActivity2() {
    for (let _0xd027x14 = 0; _0xd027x14 < activityIdList2[__Oxeda6f[0x41]]; _0xd027x14++) {
        $[__Oxeda6f[0x4c]] = `${__Oxeda6f[0x62]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`;
        $[__Oxeda6f[0x4e]] = activityIdList2[_0xd027x14];
        console[__Oxeda6f[0x12]](__Oxeda6f[0x2]);
        if (_0xd027x14 == 0) {
            $[__Oxeda6f[0x4f]] = null;
            $[__Oxeda6f[0x50]] = null
        };
        $[__Oxeda6f[0x51]] = null;
        await getLZCK();
        await $[__Oxeda6f[0x43]](1500);
        await task1(__Oxeda6f[0x52], `${__Oxeda6f[0x53]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`, 1);
        await $[__Oxeda6f[0x43]](1500);
        if (_0xd027x14 == 0) {
            $[__Oxeda6f[0x4f]] = await getToken(cookie, __Oxeda6f[0x54]);
            if ($[__Oxeda6f[0x4f]]) {
                await getMyPing1()
            } else {
                $[__Oxeda6f[0x12]](__Oxeda6f[0x55]);
                break
            }
        };
        if ($[__Oxeda6f[0x50]]) {
            console[__Oxeda6f[0x12]](`${__Oxeda6f[0x56]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`);
            if ($[__Oxeda6f[0x51]]) {
                await task1(__Oxeda6f[0x57], `${__Oxeda6f[0x58]}${$[__Oxeda6f[0x51]]}${__Oxeda6f[0x59]}${$[__Oxeda6f[0x5a]]}${__Oxeda6f[0x5b]}${encodeURIComponent($[__Oxeda6f[0x50]])}${__Oxeda6f[0x5c]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x5d]}${$[__Oxeda6f[0x4c]]}${__Oxeda6f[0x5e]}`, 1);
                await $[__Oxeda6f[0x43]](1500)
            };
            await task1(__Oxeda6f[0x63], `${__Oxeda6f[0x60]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x5b]}${encodeURIComponent($[__Oxeda6f[0x50]])}${__Oxeda6f[0x2]}`, 1);
            await $[__Oxeda6f[0x43]](1000)
        } else {
            $[__Oxeda6f[0x12]](__Oxeda6f[0x61]);
            break
        }
    }
}
async function signActivity3() {
    for (let _0xd027x14 = 0; _0xd027x14 < activityIdList3[__Oxeda6f[0x41]]; _0xd027x14++) {
        $[__Oxeda6f[0x4c]] = `${__Oxeda6f[0x64]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`;
        $[__Oxeda6f[0x4e]] = activityIdList3[_0xd027x14];
        console[__Oxeda6f[0x12]](__Oxeda6f[0x2]);
        if (_0xd027x14 == 0) {
            $[__Oxeda6f[0x4f]] = null;
            $[__Oxeda6f[0x50]] = null
        };
        $[__Oxeda6f[0x51]] = null;
        await getFirstLZCK();
        await $[__Oxeda6f[0x43]](1500);
        await task2(__Oxeda6f[0x52], `${__Oxeda6f[0x53]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`, 1);
        await $[__Oxeda6f[0x43]](1500);
        if (_0xd027x14 == 0) {
            $[__Oxeda6f[0x4f]] = await getToken(cookie, __Oxeda6f[0x65]);
            if ($[__Oxeda6f[0x4f]]) {
                await getMyPing2()
            } else {
                $[__Oxeda6f[0x12]](__Oxeda6f[0x55]);
                break
            }
        };
        if ($[__Oxeda6f[0x50]]) {
            console[__Oxeda6f[0x12]](`${__Oxeda6f[0x56]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`);
            if ($[__Oxeda6f[0x51]]) {
                await task2(__Oxeda6f[0x57], `${__Oxeda6f[0x58]}${$[__Oxeda6f[0x51]]}${__Oxeda6f[0x59]}${$[__Oxeda6f[0x5a]]}${__Oxeda6f[0x5b]}${encodeURIComponent(encodeURIComponent($[__Oxeda6f[0x50]]))}${__Oxeda6f[0x5c]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x5d]}${encodeURIComponent($[__Oxeda6f[0x4c]])}${__Oxeda6f[0x66]}`, 1);
                await $[__Oxeda6f[0x43]](1500)
            };
            await task2(__Oxeda6f[0x5f], `${__Oxeda6f[0x60]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x5b]}${encodeURIComponent(encodeURIComponent($[__Oxeda6f[0x50]]))}${__Oxeda6f[0x2]}`, 1);
            await $[__Oxeda6f[0x43]](1000)
        } else {
            $[__Oxeda6f[0x12]](__Oxeda6f[0x61]);
            break
        }
    }
}
async function signActivity4() {
    for (let _0xd027x14 = 0; _0xd027x14 < activityIdList4[__Oxeda6f[0x41]]; _0xd027x14++) {
        $[__Oxeda6f[0x4c]] = `${__Oxeda6f[0x67]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`;
        $[__Oxeda6f[0x4e]] = activityIdList4[_0xd027x14];
        console[__Oxeda6f[0x12]](__Oxeda6f[0x2]);
        if (_0xd027x14 == 0) {
            $[__Oxeda6f[0x4f]] = null;
            $[__Oxeda6f[0x50]] = null
        };
        $[__Oxeda6f[0x51]] = null;
        await getFirstLZCK();
        await $[__Oxeda6f[0x43]](1500);
        await task2(__Oxeda6f[0x52], `${__Oxeda6f[0x53]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`, 1);
        await $[__Oxeda6f[0x43]](1500);
        if (_0xd027x14 == 0) {
            $[__Oxeda6f[0x4f]] = await getToken(cookie, __Oxeda6f[0x65]);
            if ($[__Oxeda6f[0x4f]]) {
                await getMyPing2()
            } else {
                $[__Oxeda6f[0x12]](__Oxeda6f[0x55]);
                break
            }
        };
        if ($[__Oxeda6f[0x50]]) {
            console[__Oxeda6f[0x12]](`${__Oxeda6f[0x56]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x2]}`);
            if ($[__Oxeda6f[0x51]]) {
                await task2(__Oxeda6f[0x57], `${__Oxeda6f[0x58]}${$[__Oxeda6f[0x51]]}${__Oxeda6f[0x59]}${$[__Oxeda6f[0x5a]]}${__Oxeda6f[0x5b]}${encodeURIComponent(encodeURIComponent($[__Oxeda6f[0x50]]))}${__Oxeda6f[0x5c]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x5d]}${encodeURIComponent($[__Oxeda6f[0x4c]])}${__Oxeda6f[0x68]}`, 1);
                await $[__Oxeda6f[0x43]](1500)
            };
            await task2(__Oxeda6f[0x63], `${__Oxeda6f[0x60]}${$[__Oxeda6f[0x4e]]}${__Oxeda6f[0x5b]}${encodeURIComponent(encodeURIComponent($[__Oxeda6f[0x50]]))}${__Oxeda6f[0x2]}`, 1);
            await $[__Oxeda6f[0x43]](1000)
        } else {
            $[__Oxeda6f[0x12]](__Oxeda6f[0x61]);
            break
        }
    }
}
async function task1(_0xd027x19, _0xd027x1a, _0xd027x1b = 0) {
    return new Promise((_0xd027x1c) => {
        $[__Oxeda6f[0x7a]](taskUrl1(_0xd027x19, _0xd027x1a, _0xd027x1b), async(_0xd027x1d, _0xd027x1e, _0xd027x1f) => {
            try {
                if (_0xd027x1d) {
                    $[__Oxeda6f[0x12]](_0xd027x1d)
                } else {
                    if (_0xd027x1f) {
                        _0xd027x1f = JSON[__Oxeda6f[0x16]](_0xd027x1f);
                        if (_0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                            cookie = `${__Oxeda6f[0x2]}${originCookie}${__Oxeda6f[0x6b]}`;
                            for (let _0xd027x20 of _0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                                lz_cookie[_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](0, _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]))] = _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]) + 1)
                            };
                            for (const _0xd027x21 of Object[__Oxeda6f[0xf]](lz_cookie)) {
                                cookie += _0xd027x21 + __Oxeda6f[0x6c] + lz_cookie[_0xd027x21] + __Oxeda6f[0x6b]
                            }
                        };
                        if (_0xd027x1f) {
                            switch (_0xd027x19) {
                                case __Oxeda6f[0x52]:
                                    $[__Oxeda6f[0x51]] = _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0x51]];
                                    $[__Oxeda6f[0x5a]] = _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0x5a]];
                                    break;
                                case __Oxeda6f[0x5f]:
                                    if (_0xd027x1f) {
                                        if (_0xd027x1f[__Oxeda6f[0x70]]) {
                                            console[__Oxeda6f[0x12]](__Oxeda6f[0x71]);
                                            if (_0xd027x1f[__Oxeda6f[0x73]][__Oxeda6f[0x72]] != null) {
                                                console[__Oxeda6f[0x12]](__Oxeda6f[0x74] + _0xd027x1f[__Oxeda6f[0x73]][__Oxeda6f[0x72]][__Oxeda6f[0x75]] + __Oxeda6f[0x76])
                                            }
                                        } else {
                                            console[__Oxeda6f[0x12]](__Oxeda6f[0x77] + _0xd027x1f[__Oxeda6f[0x2c]])
                                        }
                                    };
                                    break;
                                case __Oxeda6f[0x63]:
                                    if (_0xd027x1f) {
                                        if (_0xd027x1f[__Oxeda6f[0x70]]) {
                                            console[__Oxeda6f[0x12]](__Oxeda6f[0x71]);
                                            if (_0xd027x1f[__Oxeda6f[0x72]] != null) {
                                                console[__Oxeda6f[0x12]](__Oxeda6f[0x74] + _0xd027x1f[__Oxeda6f[0x72]][__Oxeda6f[0x75]] + __Oxeda6f[0x76])
                                            }
                                        } else {
                                            console[__Oxeda6f[0x12]](__Oxeda6f[0x77] + _0xd027x1f[__Oxeda6f[0x2c]])
                                        }
                                    };
                                    break;
                                default:
                                    $[__Oxeda6f[0x12]](JSON[__Oxeda6f[0x78]](_0xd027x1f));
                                    break
                            }
                        }
                    }
                }
            } catch (error) {
                if (_0xd027x19 != __Oxeda6f[0x52]) {
                    $[__Oxeda6f[0x12]](_0xd027x19 + __Oxeda6f[0x79] + error)
                }
            } finally {
                _0xd027x1c()
            }
        })
    })
}
async function task2(_0xd027x19, _0xd027x1a, _0xd027x1b = 0) {
    return new Promise((_0xd027x1c) => {
        $[__Oxeda6f[0x7a]](taskUrl2(_0xd027x19, _0xd027x1a, _0xd027x1b), async(_0xd027x1d, _0xd027x1e, _0xd027x1f) => {
            try {
                if (_0xd027x1d) {
                    $[__Oxeda6f[0x12]](_0xd027x1d)
                } else {
                    if (_0xd027x1f) {
                        _0xd027x1f = JSON[__Oxeda6f[0x16]](_0xd027x1f);
                        if (_0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                            cookie = `${__Oxeda6f[0x2]}${originCookie}${__Oxeda6f[0x6b]}`;
                            for (let _0xd027x20 of _0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                                lz_cookie[_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](0, _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]))] = _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]) + 1)
                            };
                            for (const _0xd027x21 of Object[__Oxeda6f[0xf]](lz_cookie)) {
                                cookie += _0xd027x21 + __Oxeda6f[0x6c] + lz_cookie[_0xd027x21] + __Oxeda6f[0x6b]
                            }
                        };
                        if (_0xd027x1f) {
                            switch (_0xd027x19) {
                                case __Oxeda6f[0x52]:
                                    $[__Oxeda6f[0x51]] = _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0x51]];
                                    $[__Oxeda6f[0x5a]] = _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0x5a]];
                                    break;
                                case __Oxeda6f[0x5f]:
                                    if (_0xd027x1f) {
                                        if (_0xd027x1f[__Oxeda6f[0x70]]) {
                                            console[__Oxeda6f[0x12]](__Oxeda6f[0x71]);
                                            if (_0xd027x1f[__Oxeda6f[0x73]][__Oxeda6f[0x72]] != null) {
                                                console[__Oxeda6f[0x12]](__Oxeda6f[0x74] + _0xd027x1f[__Oxeda6f[0x73]][__Oxeda6f[0x72]][__Oxeda6f[0x75]] + __Oxeda6f[0x76])
                                            }
                                        } else {
                                            console[__Oxeda6f[0x12]](__Oxeda6f[0x77] + _0xd027x1f[__Oxeda6f[0x2c]])
                                        }
                                    };
                                    break;
                                case __Oxeda6f[0x63]:
                                    if (_0xd027x1f) {
                                        if (_0xd027x1f[__Oxeda6f[0x70]]) {
                                            console[__Oxeda6f[0x12]](__Oxeda6f[0x71]);
                                            if (_0xd027x1f[__Oxeda6f[0x72]] != null) {
                                                console[__Oxeda6f[0x12]](__Oxeda6f[0x74] + _0xd027x1f[__Oxeda6f[0x72]][__Oxeda6f[0x75]] + __Oxeda6f[0x76])
                                            }
                                        } else {
                                            console[__Oxeda6f[0x12]](__Oxeda6f[0x77] + _0xd027x1f[__Oxeda6f[0x2c]])
                                        }
                                    };
                                    break;
                                default:
                                    $[__Oxeda6f[0x12]](JSON[__Oxeda6f[0x78]](_0xd027x1f));
                                    break
                            }
                        }
                    }
                }
            } catch (error) {
                if (_0xd027x19 != __Oxeda6f[0x52]) {
                    $[__Oxeda6f[0x12]](_0xd027x19 + __Oxeda6f[0x79] + error)
                }
            } finally {
                _0xd027x1c()
            }
        })
    })
}

function taskUrl1(_0xd027x19, _0xd027x1a, _0xd027x1b) {
    return {
        url: _0xd027x1b ? `${__Oxeda6f[0x7b]}${_0xd027x19}${__Oxeda6f[0x2]}` : `${__Oxeda6f[0x7c]}${_0xd027x19}${__Oxeda6f[0x2]}`,
        headers: {
            Host: __Oxeda6f[0x7d],
            Accept: __Oxeda6f[0x7e],
            'X-Requested-With': __Oxeda6f[0x7f],
            'Accept-Language': __Oxeda6f[0x80],
            'Accept-Encoding': __Oxeda6f[0x81],
            'Content-Type': __Oxeda6f[0x82],
            Origin: __Oxeda6f[0x83],
            'User-Agent': `${__Oxeda6f[0x84]}${$[__Oxeda6f[0x3f]]}${__Oxeda6f[0x85]}${$[__Oxeda6f[0x3d]]}${__Oxeda6f[0x86]}`,
            Connection: __Oxeda6f[0x87],
            Referer: $[__Oxeda6f[0x4c]],
            Cookie: cookie
        },
        body: _0xd027x1a
    }
}

function taskUrl2(_0xd027x19, _0xd027x1a, _0xd027x1b) {
    return {
        url: _0xd027x1b ? `${__Oxeda6f[0x88]}${_0xd027x19}${__Oxeda6f[0x2]}` : `${__Oxeda6f[0x89]}${_0xd027x19}${__Oxeda6f[0x2]}`,
        headers: {
            Host: __Oxeda6f[0x8a],
            Accept: __Oxeda6f[0x7e],
            'X-Requested-With': __Oxeda6f[0x7f],
            'Accept-Language': __Oxeda6f[0x80],
            'Accept-Encoding': __Oxeda6f[0x81],
            'Content-Type': __Oxeda6f[0x82],
            Origin: __Oxeda6f[0x8b],
            'User-Agent': `${__Oxeda6f[0x84]}${$[__Oxeda6f[0x3f]]}${__Oxeda6f[0x85]}${$[__Oxeda6f[0x3d]]}${__Oxeda6f[0x86]}`,
            Connection: __Oxeda6f[0x87],
            Referer: $[__Oxeda6f[0x4c]],
            Cookie: cookie
        },
        body: _0xd027x1a
    }
}

function getMyPing1() {
    let _0xd027x26 = {
        url: `${__Oxeda6f[0x8c]}`,
        headers: {
            Host: __Oxeda6f[0x7d],
            Accept: __Oxeda6f[0x7e],
            'X-Requested-With': __Oxeda6f[0x7f],
            'Accept-Language': __Oxeda6f[0x80],
            'Accept-Encoding': __Oxeda6f[0x81],
            'Content-Type': __Oxeda6f[0x82],
            Origin: __Oxeda6f[0x54],
            'User-Agent': `${__Oxeda6f[0x84]}${$[__Oxeda6f[0x3f]]}${__Oxeda6f[0x85]}${$[__Oxeda6f[0x3d]]}${__Oxeda6f[0x86]}`,
            Connection: __Oxeda6f[0x87],
            Referer: $[__Oxeda6f[0x4c]],
            Cookie: cookie
        },
        body: `${__Oxeda6f[0x8d]}${$[__Oxeda6f[0x51]]}${__Oxeda6f[0x8e]}${$[__Oxeda6f[0x4f]]}${__Oxeda6f[0x8f]}`
    };
    return new Promise((_0xd027x1c) => {
        $[__Oxeda6f[0x7a]](_0xd027x26, (_0xd027x1d, _0xd027x1e, _0xd027x1f) => {
            try {
                if (_0xd027x1d) {
                    $[__Oxeda6f[0x12]](_0xd027x1d)
                } else {
                    if (_0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                        cookie = `${__Oxeda6f[0x2]}${originCookie}${__Oxeda6f[0x6b]}`;
                        for (let _0xd027x20 of _0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                            lz_cookie[_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](0, _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]))] = _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]) + 1)
                        };
                        for (const _0xd027x21 of Object[__Oxeda6f[0xf]](lz_cookie)) {
                            cookie += _0xd027x21 + __Oxeda6f[0x6c] + lz_cookie[_0xd027x21] + __Oxeda6f[0x6b]
                        }
                    };
                    if (_0xd027x1f) {
                        _0xd027x1f = JSON[__Oxeda6f[0x16]](_0xd027x1f);
                        if (_0xd027x1f[__Oxeda6f[0x90]]) {
                            $[__Oxeda6f[0x91]] = _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0x92]];
                            $[__Oxeda6f[0x50]] = _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0x50]]
                        } else {
                            $[__Oxeda6f[0x12]](_0xd027x1f[__Oxeda6f[0x93]])
                        }
                    } else {
                        $[__Oxeda6f[0x12]](__Oxeda6f[0x94])
                    }
                }
            } catch (error) {
                $[__Oxeda6f[0x12]](error)
            } finally {
                _0xd027x1c()
            }
        })
    })
}

function getMyPing2() {
    let _0xd027x26 = {
        url: `${__Oxeda6f[0x95]}`,
        headers: {
            Host: __Oxeda6f[0x8a],
            Accept: __Oxeda6f[0x7e],
            'X-Requested-With': __Oxeda6f[0x7f],
            'Accept-Language': __Oxeda6f[0x80],
            'Accept-Encoding': __Oxeda6f[0x81],
            'Content-Type': __Oxeda6f[0x82],
            Origin: __Oxeda6f[0x65],
            'User-Agent': `${__Oxeda6f[0x84]}${$[__Oxeda6f[0x3f]]}${__Oxeda6f[0x85]}${$[__Oxeda6f[0x3d]]}${__Oxeda6f[0x86]}`,
            Connection: __Oxeda6f[0x87],
            Referer: $[__Oxeda6f[0x4c]],
            Cookie: cookie
        },
        body: `${__Oxeda6f[0x8d]}${$[__Oxeda6f[0x51]]}${__Oxeda6f[0x8e]}${$[__Oxeda6f[0x4f]]}${__Oxeda6f[0x96]}`
    };
    return new Promise((_0xd027x1c) => {
        $[__Oxeda6f[0x7a]](_0xd027x26, (_0xd027x1d, _0xd027x1e, _0xd027x1f) => {
            try {
                if (_0xd027x1d) {
                    $[__Oxeda6f[0x12]](_0xd027x1d)
                } else {
                    if (_0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                        cookie = `${__Oxeda6f[0x2]}${originCookie}${__Oxeda6f[0x6b]}`;
                        for (let _0xd027x20 of _0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                            lz_cookie[_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](0, _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]))] = _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]) + 1)
                        };
                        for (const _0xd027x21 of Object[__Oxeda6f[0xf]](lz_cookie)) {
                            cookie += _0xd027x21 + __Oxeda6f[0x6c] + lz_cookie[_0xd027x21] + __Oxeda6f[0x6b]
                        }
                    };
                    if (_0xd027x1f) {
                        _0xd027x1f = JSON[__Oxeda6f[0x16]](_0xd027x1f);
                        if (_0xd027x1f[__Oxeda6f[0x90]]) {
                            $[__Oxeda6f[0x91]] = _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0x92]];
                            $[__Oxeda6f[0x50]] = _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0x50]]
                        } else {
                            $[__Oxeda6f[0x12]](_0xd027x1f[__Oxeda6f[0x93]])
                        }
                    } else {
                        $[__Oxeda6f[0x12]](__Oxeda6f[0x94])
                    }
                }
            } catch (error) {
                $[__Oxeda6f[0x12]](error)
            } finally {
                _0xd027x1c()
            }
        })
    })
}

function getLZCK() {
    return new Promise((_0xd027x1c) => {
        let _0xd027x29 = {
            url: `${__Oxeda6f[0x97]}`,
            headers: {
                "Accept": __Oxeda6f[0x98],
                "Accept-Encoding": __Oxeda6f[0x81],
                "Accept-Language": __Oxeda6f[0x80],
                "Connection": __Oxeda6f[0x87],
                "Content-Type": __Oxeda6f[0x82],
                "Cookie": cookie,
                "User-Agent": $[__Oxeda6f[0x99]]
            },
            timeout: 30000
        };
        $[__Oxeda6f[0xa3]](_0xd027x29, async(_0xd027x1d, _0xd027x1e, _0xd027x1f) => {
            try {
                if (_0xd027x1d) {
                    if (_0xd027x1e && typeof _0xd027x1e[__Oxeda6f[0x9a]] != __Oxeda6f[0x9b]) {
                        if (_0xd027x1e[__Oxeda6f[0x9a]] == 493) {
                            console[__Oxeda6f[0x12]](__Oxeda6f[0x9c]);
                            $[__Oxeda6f[0x9d]] = true
                        }
                    };
                    console[__Oxeda6f[0x12]](`${__Oxeda6f[0x2]}${$[__Oxeda6f[0x9e]](_0xd027x1d)}${__Oxeda6f[0x2]}`);
                    console[__Oxeda6f[0x12]](`${__Oxeda6f[0x2]}${$[__Oxeda6f[0x24]]}${__Oxeda6f[0x9f]}`)
                } else {
                    let _0xd027x2a = _0xd027x1f[__Oxeda6f[0x2e]](/(活动已经结束)/) && _0xd027x1f[__Oxeda6f[0x2e]](/(活动已经结束)/)[0x1] || __Oxeda6f[0x2];
                    if (_0xd027x2a) {
                        $[__Oxeda6f[0xa0]] = true;
                        console[__Oxeda6f[0x12]](__Oxeda6f[0xa1])
                    };
                    if (_0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                        cookie = `${__Oxeda6f[0x2]}${originCookie}${__Oxeda6f[0x6b]}`;
                        for (let _0xd027x20 of _0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                            lz_cookie[_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](0, _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]))] = _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]) + 1)
                        };
                        for (const _0xd027x21 of Object[__Oxeda6f[0xf]](lz_cookie)) {
                            cookie += _0xd027x21 + __Oxeda6f[0x6c] + lz_cookie[_0xd027x21] + __Oxeda6f[0x6b]
                        };
                        activityCookie = cookie
                    }
                }
            } catch (e) {
                $[__Oxeda6f[0xa2]](e, _0xd027x1e)
            } finally {
                _0xd027x1c()
            }
        })
    })
}

function getFirstLZCK() {
    return new Promise((_0xd027x1c) => {
        $[__Oxeda6f[0xa3]]({
            url: $[__Oxeda6f[0x4c]],
            headers: {
                "user-agent": $[__Oxeda6f[0x0]]() ? (process[__Oxeda6f[0x6]][__Oxeda6f[0xa4]] ? process[__Oxeda6f[0x6]][__Oxeda6f[0xa4]] : (require(__Oxeda6f[0xa6])[__Oxeda6f[0xa5]])) : ($[__Oxeda6f[0x14]](__Oxeda6f[0xa7]) ? $[__Oxeda6f[0x14]](__Oxeda6f[0xa7]) : __Oxeda6f[0xa8])
            }
        }, (_0xd027x1d, _0xd027x1e, _0xd027x1f) => {
            try {
                if (_0xd027x1d) {
                    console[__Oxeda6f[0x12]](_0xd027x1d)
                } else {
                    if (_0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                        cookie = `${__Oxeda6f[0x2]}${originCookie}${__Oxeda6f[0x6b]}`;
                        for (let _0xd027x20 of _0xd027x1e[__Oxeda6f[0x6a]][__Oxeda6f[0x69]]) {
                            lz_cookie[_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](0, _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]))] = _0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6e]](_0xd027x20[__Oxeda6f[0x8]](__Oxeda6f[0x6b])[0x0][__Oxeda6f[0x6d]](__Oxeda6f[0x6c]) + 1)
                        };
                        for (const _0xd027x21 of Object[__Oxeda6f[0xf]](lz_cookie)) {
                            cookie += _0xd027x21 + __Oxeda6f[0x6c] + lz_cookie[_0xd027x21] + __Oxeda6f[0x6b]
                        }
                    }
                }
            } catch (error) {
                console[__Oxeda6f[0x12]](error)
            } finally {
                _0xd027x1c()
            }
        })
    })
}

function judgePrize(_0xd027x2d) {
    var _0xd027x2e = false;
    for (let _0xd027x11 of lajiprizewords) {
        if (_0xd027x2d[__Oxeda6f[0xa9]](_0xd027x11)) {
            _0xd027x2e = true;
            break
        }
    };
    return _0xd027x2e
}

function random(_0xd027x30, _0xd027x31) {
    return Math[__Oxeda6f[0xab]](Math[__Oxeda6f[0xaa]]() * (_0xd027x31 - _0xd027x30)) + _0xd027x30
}

function getBlacklist() {
    if ($[__Oxeda6f[0x1f]] == __Oxeda6f[0x2]) {
        return
    };
    console[__Oxeda6f[0x12]](__Oxeda6f[0xac]);
    const _0xd027x33 = Array[__Oxeda6f[0xae]](new Set($[__Oxeda6f[0x1f]][__Oxeda6f[0x8]](__Oxeda6f[0xad])));
    console[__Oxeda6f[0x12]](_0xd027x33[__Oxeda6f[0xaf]](__Oxeda6f[0xad]) + __Oxeda6f[0x4a]);
    let _0xd027x34 = _0xd027x33;
    let _0xd027x35 = [];
    let _0xd027x36 = false;
    for (let _0xd027x12 = 0; _0xd027x12 < cookiesArr[__Oxeda6f[0x41]]; _0xd027x12++) {
        let _0xd027x37 = decodeURIComponent((cookiesArr[_0xd027x12][__Oxeda6f[0x2e]](/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0xd027x12][__Oxeda6f[0x2e]](/pt_pin=([^; ]+)(?=;?)/)[0x1]) || __Oxeda6f[0x2]);
        if (!_0xd027x37) {
            break
        };
        let _0xd027x38 = false;
        for (let _0xd027x39 of _0xd027x34) {
            if (_0xd027x39 && _0xd027x39 == _0xd027x37) {
                _0xd027x38 = true;
                break
            }
        };
        if (!_0xd027x38) {
            _0xd027x36 = true;
            _0xd027x35[__Oxeda6f[0xb0]](_0xd027x12, -1, cookiesArr[_0xd027x12])
        }
    };
    if (_0xd027x36) {
        cookiesArr = _0xd027x35
    }
}

function toFirst(_0xd027x35, _0xd027x3b) {
    if (_0xd027x3b != 0) {
        _0xd027x35[__Oxeda6f[0xb1]](_0xd027x35[__Oxeda6f[0xb0]](_0xd027x3b, 1)[0x0])
    }
}

function getWhitelist() {
    if ($[__Oxeda6f[0x1d]] == __Oxeda6f[0x2]) {
        helpCookiesArr = $[__Oxeda6f[0xb2]]($[__Oxeda6f[0x9e]](cookiesArr, cookiesArr));
        return
    };
    console[__Oxeda6f[0x12]](__Oxeda6f[0xb3]);
    const _0xd027x33 = Array[__Oxeda6f[0xae]](new Set($[__Oxeda6f[0x1d]][__Oxeda6f[0x8]](__Oxeda6f[0xad])));
    console[__Oxeda6f[0x12]](_0xd027x33[__Oxeda6f[0xaf]](__Oxeda6f[0xad]) + __Oxeda6f[0x4a]);
    let _0xd027x35 = [];
    let _0xd027x3d = _0xd027x33;
    for (let _0xd027x12 in cookiesArr) {
        let _0xd027x37 = decodeURIComponent((cookiesArr[_0xd027x12][__Oxeda6f[0x2e]](/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0xd027x12][__Oxeda6f[0x2e]](/pt_pin=([^; ]+)(?=;?)/)[0x1]) || __Oxeda6f[0x2]);
        if (_0xd027x3d[__Oxeda6f[0xa9]](_0xd027x37)) {
            _0xd027x35[__Oxeda6f[0xd]](cookiesArr[_0xd027x12])
        }
    };
    helpCookiesArr = _0xd027x35;
    if (_0xd027x3d[__Oxeda6f[0x41]] > 1) {
        for (let _0xd027x39 in _0xd027x3d) {
            let _0xd027x3e = _0xd027x3d[_0xd027x3d[__Oxeda6f[0x41]] - 1 - _0xd027x39];
            if (!_0xd027x3e) {
                continue
            };
            for (let _0xd027x12 in helpCookiesArr) {
                let _0xd027x37 = decodeURIComponent(helpCookiesArr[_0xd027x12][__Oxeda6f[0x2e]](/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0xd027x12][__Oxeda6f[0x2e]](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
                if (_0xd027x3e == _0xd027x37) {
                    toFirst(helpCookiesArr, _0xd027x12)
                }
            }
        }
    }
}

function getUUID(_0xd027x40 = __Oxeda6f[0x40], _0xd027x41 = 0) {
    return _0xd027x40[__Oxeda6f[0xb6]](/[xy]/g, function(_0xd027x42) {
        var _0xd027x43 = Math[__Oxeda6f[0xaa]]() * 16 | 0,
            _0xd027x44 = _0xd027x42 == __Oxeda6f[0xb4] ? _0xd027x43 : (_0xd027x43 & 0x3 | 0x8);
        if (_0xd027x41) {
            uuid = _0xd027x44.toString(36)[__Oxeda6f[0xb5]]()
        } else {
            uuid = _0xd027x44.toString(36)
        };
        return uuid
    })
}

function checkCookie() {
    const _0xd027x46 = {
        url: __Oxeda6f[0xb7],
        headers: {
            "Host": __Oxeda6f[0xb8],
            "Accept": __Oxeda6f[0xb9],
            "Connection": __Oxeda6f[0x87],
            "Cookie": cookie,
            "User-Agent": __Oxeda6f[0xba],
            "Accept-Language": __Oxeda6f[0x80],
            "Referer": __Oxeda6f[0xbb],
            "Accept-Encoding": __Oxeda6f[0x81]
        }
    };
    return new Promise((_0xd027x1c) => {
        $[__Oxeda6f[0xa3]](_0xd027x46, (_0xd027x1d, _0xd027x1e, _0xd027x1f) => {
            try {
                if (_0xd027x1d) {
                    $[__Oxeda6f[0xa2]](_0xd027x1d)
                } else {
                    if (_0xd027x1f) {
                        _0xd027x1f = JSON[__Oxeda6f[0x16]](_0xd027x1f);
                        if (_0xd027x1f[__Oxeda6f[0xbc]] === __Oxeda6f[0xbd]) {
                            $[__Oxeda6f[0x30]] = false;
                            return
                        };
                        if (_0xd027x1f[__Oxeda6f[0xbc]] === __Oxeda6f[0xbe] && _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0xc0]](__Oxeda6f[0xbf])) {
                            $[__Oxeda6f[0x31]] = _0xd027x1f[__Oxeda6f[0x6f]][__Oxeda6f[0xbf]][__Oxeda6f[0xc1]][__Oxeda6f[0x92]]
                        }
                    } else {
                        $[__Oxeda6f[0x12]](__Oxeda6f[0x94])
                    }
                }
            } catch (e) {
                $[__Oxeda6f[0xa2]](e)
            } finally {
                _0xd027x1c()
            }
        })
    })
}(function(_0xd027x47, _0xd027x42, _0xd027x48, _0xd027x49, _0xd027x38, _0xd027x4a) {
    _0xd027x4a = __Oxeda6f[0x9b];
    _0xd027x49 = function(_0xd027x3e) {
        if (typeof alert !== _0xd027x4a) {
            alert(_0xd027x3e)
        };
        if (typeof console !== _0xd027x4a) {
            console[__Oxeda6f[0x12]](_0xd027x3e)
        }
    };
    _0xd027x48 = function(_0xd027x14, _0xd027x47) {
        return _0xd027x14 + _0xd027x47
    };
    _0xd027x38 = _0xd027x48(__Oxeda6f[0xc2], _0xd027x48(_0xd027x48(__Oxeda6f[0xc3], __Oxeda6f[0xc4]), __Oxeda6f[0xc5]));
    try {
        _0xd027x47 = __encode;
        if (!(typeof _0xd027x47 !== _0xd027x4a && _0xd027x47 === _0xd027x48(__Oxeda6f[0xc6], __Oxeda6f[0xc7]))) {
            _0xd027x49(_0xd027x38)
        }
    } catch (e) {
        _0xd027x49(_0xd027x38)
    }
})({})
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }