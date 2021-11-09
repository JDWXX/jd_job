/**
 惊喜牧场
 cron 23 0-23/3 * * * https://github.com/JDWXX/jd_job/blob/master/jd/jd_jxmc_zl.js
 */
const $ = new Env('惊喜牧场-助力');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
const JXUserAgent =  $.isNode() ? (process.env.JX_USER_AGENT ? process.env.JX_USER_AGENT : ``):``;
let cookiesArr = [],token = {},ua = '';
$.appId = 10028;
let activeid = 'null';
$.inviteCodeList = [];
$.inviteCodeList_rp = [];
let flag_hb = true
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
    };
} else {
    cookiesArr = [
        $.getdata("CookieJD"),
        $.getdata("CookieJD2"),
        ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
!(async () => {
    $.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
    $.fingerprint = '';$.token = '';
    await requestAlgo();
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    console.log('\nJDWXX库');
    console.log('https://github.com/JDWXX/jd_job\n');
    for (let i = 0; i < cookiesArr.length; i++) {
        $.index = i + 1;
        $.cookie = cookiesArr[i];
        $.isLogin = true;
        $.nickName = '';
        $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        await TotalBean();
        console.log(`\n*****开始【京东账号${$.index}】${$.nickName || $.UserName}*****\n`);
        if (!$.isLogin) {
            $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
            if ($.isNode()) {
                await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
            }
            continue
        }
        try {
            await main();
        } catch (e) {
            $.logErr(e)
        }
        await $.wait(2000);
    }
    if (flag_hb) {
        console.log('\n##################开始账号内互助(红包)#################\n');
        for (let j = 0; j < cookiesArr.length; j++) {
            $.cookie = cookiesArr[j];
            $.UserName = decodeURIComponent($.cookie.match(/pt_pin=(.+?);/) && $.cookie.match(/pt_pin=(.+?);/)[1]);
            token = await getJxToken();
            $.canHelp = true;
            for (let k = 0; k < $.inviteCodeList_rp.length; k++) {
                $.oneCodeInfo = $.inviteCodeList_rp[k];
                activeid = $.oneCodeInfo.activeid;
                if($.oneCodeInfo.use === $.UserName) continue;
                if (!$.canHelp) break;
                if($.oneCodeInfo.use === $.UserName){
                    continue
                }
                console.log(`\n${$.UserName}去助力${$.oneCodeInfo.use},助力码：${$.oneCodeInfo.code}\n`);
                let helpInfo = await takeRequest(`jxmc`,`operservice/InviteEnroll`,`&sharekey=${$.oneCodeInfo.code}`,`activeid%2Cactivekey%2Cchannel%2Cjxmc_jstoken%2Cphoneid%2Csceneid%2Csharekey%2Ctimestamp`,true);
                // console.debug(helpInfo)
                await $.wait(2000);
            }
        }
    }
    console.log('\n##################开始账号内互助#################\n');
    for (let j = 0; j < cookiesArr.length; j++) {
        $.cookie = cookiesArr[j];
        $.UserName = decodeURIComponent($.cookie.match(/pt_pin=(.+?);/) && $.cookie.match(/pt_pin=(.+?);/)[1]);
        token = await getJxToken();
        $.canHelp = true;
        for (let k = 0; k < $.inviteCodeList.length; k++) {
            $.oneCodeInfo = $.inviteCodeList[k];
            activeid = $.oneCodeInfo.activeid;
            if($.oneCodeInfo.use === $.UserName) continue;
            if (!$.canHelp) break;
            console.log(`\n${$.UserName}去助力${$.oneCodeInfo.use},助力码：${$.oneCodeInfo.code}\n`);
            let helpInfo = await takeRequest(`jxmc`,`operservice/EnrollFriend`,`&sharekey=${$.oneCodeInfo.code}`,`activeid%2Cactivekey%2Cchannel%2Cjxmc_jstoken%2Cphoneid%2Csceneid%2Csharekey%2Ctimestamp`,true);
            if ( helpInfo && helpInfo.result === 0 ) {
                console.log(`助力成功`);
            }else if (helpInfo && helpInfo.result === 4){
                console.log(`助力次数已用完`);
                $.canHelp = false;
            }else if(helpInfo && helpInfo.result === 5){
                console.log(`已助力过`);
                //$.oneCodeInfo.max = true;
            }else{
                console.log(`助力失败，可能此账号不能助力别人`);
                //console.log(JSON.stringify(data))
                $.canHelp = false;
            }
            await $.wait(2000);
        }
    }
})().catch((e) => {$.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')}).finally(() => {$.done();})

async function get_rp(){
    let rpInfo = await takeRequest(`jxmc`,`operservice/GetInviteStatus`,``,``,true);
    if (rpInfo.ret === 0) {
        if(rpInfo.data.sharekey){
            console.log(`红包邀请码:${rpInfo.data.sharekey}`);
            $.inviteCodeList_rp.push({'use':$.UserName,'code':rpInfo.data.sharekey,'max':false,'activeid':activeid});
        }
    } else if(rpInfo.ret === 2704){
        console.log('红包今天领完了,跳过红包相关')
        flag_hb = false
    } else if(rpInfo.ret === 2706){
        console.log('此帐号红包助力已满')
    } else if(rpInfo.ret === 1016){
        console.log('此帐号红包火爆')
    } else{
        console.log(`未知异常：${JSON.stringify(rpInfo)}\n`);
    }
}
async function main() {
    ua = '';
    if(JXUserAgent){
        ua = JXUserAgent;
    }else{
        ua = `jdpingou;iPhone;4.9.4;14.6;${randomWord(false,40,40)};network/wifi;model/iPhone9,2;appBuild/100579;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/936;pap/JA2019_3111800;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E200`;
    }
    token = await getJxToken();
    activeid = 'null';
    let configInfo = await takeRequest(`jxmc`,`queryservice/GetConfigInfo`,``,undefined,true);
    let homePageInfo = await takeRequest(`jxmc`,`queryservice/GetHomePageInfo`,`&isgift=1&isquerypicksite=1&isqueryinviteicon=1`,`activeid%2Cactivekey%2Cchannel%2Cisgift%2Cisqueryinviteicon%2Cisquerypicksite%2Cjxmc_jstoken%2Cphoneid%2Csceneid%2Ctimestamp`,true);
    activeid = homePageInfo.activeid;
    let signInfo = await takeRequest(`jxmc`,`queryservice/GetSignInfo`,``,undefined,true);
    if(JSON.stringify(configInfo) === '{}' || JSON.stringify(homePageInfo) === '{}'){
        console.log(`初始化失败,可能是牧场黑号`);
        return ;
    }
    if(homePageInfo.maintaskId !== 'pause'){
        let runTime = 0;
        let doMainTaskInfo = {};
        do {
            await $.wait(2000);
            console.log(`\n执行初始化任务：${homePageInfo.maintaskId}`);
            doMainTaskInfo = await takeRequest(`jxmc`,`operservice/DoMainTask`,`&step=${homePageInfo.maintaskId}`,`activeid%2Cactivekey%2Cchannel%2Cjxmc_jstoken%2Cphoneid%2Csceneid%2Cstep%2Ctimestamp`,true);
            console.log(`执行结果：\n${JSON.stringify(doMainTaskInfo)}`);
            await $.wait(2000);
            homePageInfo = await takeRequest(`jxmc`,`queryservice/GetHomePageInfo`,`&isgift=1&isquerypicksite=1&isqueryinviteicon=1`,`activeid%2Cactivekey%2Cchannel%2Cisgift%2Cisqueryinviteicon%2Cisquerypicksite%2Cjxmc_jstoken%2Cphoneid%2Csceneid%2Ctimestamp`,true);
            runTime++;
        }while (homePageInfo.maintaskId !== 'pause' && runTime<30 && JSON.stringify(doMainTaskInfo) !== '{}');
    }
    let petidList = [];
    for (let i = 0; i < homePageInfo.petinfo.length; i++) {
        let onepetInfo = homePageInfo.petinfo[i];
        petidList.push(onepetInfo.petid);
    }
    if (!homePageInfo.petinfo) {
        console.log(`\n温馨提示：${$.UserName} 请先手动完成【新手指导任务】再运行脚本再运行脚本\n`);
        return;
    }

    if (flag_hb) {
        //获取红包邀请码
        await get_rp()
    }
    $.inviteCodeList.push({'use':$.UserName,'code':homePageInfo.sharekey,'max':false,'activeid':activeid});
    if(JSON.stringify(signInfo) !== '{}'){
        if(signInfo.signlist && signInfo.condneed === signInfo.condstep){
            let signList = signInfo.signlist;
            let signFlag = true;
            for (let j = 0; j < signList.length; j++) {
                if(signList[j].fortoday && !signList[j].hasdone){
                    await $.wait(1000);
                    console.log(`\n去签到`);
                    await takeRequest(`jxmc`,`operservice/GetSignReward`,`&currdate=${signInfo.currdate}`,`activeid%2Cactivekey%2Cchannel%2Ccurrdate%2Cjxmc_jstoken%2Cphoneid%2Csceneid%2Ctimestamp`,true);
                    console.log(`签到成功`);
                    signFlag = false;
                }
            }
            if(signFlag){
                console.log(`已完成每日签到`);
            }
        }else if(signInfo.condneed !== signInfo.condstep){
            console.log(`暂不满足签到条件`);
        }else{
            console.log(`暂无签到列表`);
        }
    }

    $.freshFlag = false;
    let runTime = 0;
    do {
        $.freshFlag = false;
        runTime++;
    }while ($.freshFlag  && runTime <5)
    await $.wait(2000);
    await doUserLoveInfo();
}

async function doUserLoveInfo() {
    console.log(`助农活动`);
    let taskLiskInfo = await takeRequest(`newtasksys`, `newtasksys_front/GetUserTaskStatusList`, `&source=jxmc_zanaixin&bizCode=jxmc_zanaixin&dateType=2&showAreaTaskFlag=0&jxpp_wxapp_type=7`, `bizCode%2CdateType%2Cjxpp_wxapp_type%2CshowAreaTaskFlag%2Csource`, false);
    let taskLisk = taskLiskInfo.userTaskStatusList;
    for (let i = 0; i < taskLisk.length; i++) {
        let oneTask = taskLisk[i];
        if(oneTask.awardStatus === 1){
            console.log(`任务：${oneTask.taskName},已完成`)
            continue;
        }
        if (oneTask.awardStatus === 2 && oneTask.completedTimes === oneTask.targetTimes) {
            console.log(`完成任务：${oneTask.taskName}`);
            awardInfo = await takeRequest(`newtasksys`, `newtasksys_front/Award`, `source=jxmc_zanaixin&taskId=${oneTask.taskId}&bizCode=jxmc_zanaixin`, `bizCode%2Csource%2CtaskId`, true);
            console.log(`领取爱心成功，获得${JSON.parse(awardInfo.prizeInfo).prizeInfo}`);
            await $.wait(2000);
            $.freshFlag = true;
        }
        if(oneTask.taskId === 2147 || oneTask.taskId === 2157 || oneTask.taskId === 2167 || oneTask.taskId === 2171){
            console.log(`去做任务：${oneTask.description}，等待5S`);
            awardInfo = await takeRequest(`newtasksys`,`newtasksys_front/DoTask`,`source=jxmc_zanaixin&taskId=${oneTask.taskId}&bizCode=jxmc_zanaixin&configExtra=`,`bizCode%2CconfigExtra%2Csource%2CtaskId`,false);
            await $.wait(5500);
            console.log(`完成任务：${oneTask.description}`);
            awardInfo = await takeRequest(`newtasksys`,`newtasksys_front/Award`,`source=jxmc_zanaixin&taskId=${oneTask.taskId}&bizCode=jxmc_zanaixin`,`bizCode%2Csource%2CtaskId`,true);
            console.log(`领取爱心成功，获得${JSON.parse(awardInfo.prizeInfo).prizeInfo}`);
        }

        if(oneTask.taskId === 2154 && oneTask.completedTimes !== 1){
            console.log(`去做任务：${oneTask.description}，等待5S`);
            awardInfo = await takeRequest(`jxmc`,`operservice/GetInviteStatus`,``,undefined,true);
            await $.wait(5500);
            console.log(`完成任务：${oneTask.description}`);
            awardInfo = await takeRequest(`newtasksys`,`newtasksys_front/Award`,`source=jxmc_zanaixin&taskId=${oneTask.taskId}&bizCode=jxmc_zanaixin`,`bizCode%2Csource%2CtaskId`,true);
            if(awardInfo && awardInfo.prizeInfo && JSON.parse(awardInfo.prizeInfo)){
                console.log(`领取爱心成功，获得${JSON.parse(awardInfo.prizeInfo).prizeInfo || ''}`);
            }else{
                console.log(`领取爱心：${JSON.stringify(awardInfo)}`);
            }
        }
    }
    let userLoveInfo = await takeRequest(`jxmc`, `queryservice/GetUserLoveInfo`, ``, undefined, true);
    let lovelevel = userLoveInfo.lovelevel;
    if(lovelevel){
        for (let i = 0; i < lovelevel.length; i++) {
            if(lovelevel[i].drawstatus === 1){
                console.log(`抽取红包`);
                let drawLoveHongBao =await takeRequest(`jxmc`, `operservice/DrawLoveHongBao`, `&lovevalue=${lovelevel[i].lovevalue}`, `activeid%2Cactivekey%2Cchannel%2Cjxmc_jstoken%2Clovevalue%2Cphoneid%2Csceneid%2Ctimestamp`, true);
                console.log(`抽取结果：${JSON.stringify(drawLoveHongBao)}`);
                await $.wait(3000);
            }
        }
    }
}

async function takeRequest(type,functionId,info,stk='activeid%2Cactivekey%2Cchannel%2Cjxmc_jstoken%2Cphoneid%2Csceneid%2Ctimestamp',jxTokenFlag){
    let url = '';
    if(type === 'jxmc'){
        url = `https://m.jingxi.com/${type}/${functionId}?channel=7&sceneid=1001&activeid=${activeid}&activekey=null${info}`;

    }else if(type === 'newtasksys'){
        url = `https://m.jingxi.com/${type}/${functionId}?${info}`;
    }
    if(jxTokenFlag){
        url += `&jxmc_jstoken=${token.farm_jstoken}&timestamp=${token.timestamp}&phoneid=${token.phoneid}`;
    }
    if(stk){
        url += `&_stk=${stk}`;
    }
    url += `&_ste=1&h5st=${decrypt(url)}&_=${Date.now()}&sceneval=2&g_login_type=1&g_ty=ls`;
    let myRequest = {
        url: url,
        headers: {
            'Origin': `https://st.jingxi.com`,
            'Cookie': $.cookie,
            'Connection': `keep-alive`,
            'Accept': `application/json`,
            'Referer': `https://st.jingxi.com/pingou/jxmc/index.html`,
            'Host': `m.jingxi.com`,
            'User-Agent':ua,
            'Accept-Encoding': `gzip, deflate, br`,
            'Accept-Language': `zh-cn`
        }
    };
    return new Promise(async resolve => {
        $.get(myRequest, (err, resp, data) => {
            try {
                if(err){
                    console.log(err);
                }else{
                    data = JSON.parse(data);
                }
            } catch (e) {
                console.log(data);
                $.logErr(e, resp)
            } finally {
                if(functionId === 'operservice/Feed' || functionId === 'operservice/GetInviteStatus'){
                    resolve(data || {});
                }else{
                    resolve(data.data || {});
                }
            }
        })
    })
}
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": $.cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        if (data['retcode'] === 0) {
                            $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
                        } else {
                            $.nickName = $.UserName
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
var _0xodf='jsjiami.com.v6',_0x17da=[_0xodf,'woFYZh/Csg==','YBzDosOycg==','w4PDv8O9woo=','wpjDu2TDpEJp','R8OFMUIp','K8Kpw4zDssKswqHCu2XClUvCj8OZX1zCsQ==','wpNLIQjChEFDw6pewp0L','f2TDt0rDkcOWwpXCsQ==','w4Z7w7c7wq/CjcKiw5k=','w73DvMO5wqjCrw==','csOtF0U8GnBL','w4hHAsO3woIzMmM=','wo/DgsO3QMODeF8+','JFXCs8KUwoXDkcKhwq0=','wpRAUQ==','wrlLSg==','FFfCpsKNwoU=','w7rCohA=','wpjDnkzDilU=','w47DhMOkw5fDgg==','w4Qnwp3Dl8OU','NMKUwoHDpcKGZMKRDQvCpg==','DADCq8KFw4jCpjkU','wr1HNw==','w5bDhi1sLsOSw5Z2','wqUsTMOvw6RB','wr0aPVtGw6xSw4NsYg8=','woFNHBvCk1pdw78=','ZcOtKlIvBw==','wpZNIQzCgEc=','V8ObwqLCiRU=','wqhnYsK4','w67Dj8OKwonCgA==','wqRgSzLCng==','wovDrMKlw4nCsA==','wrQPw7DDgMK5','GsK+QlN1','RMOZXwEmwo8=','NQXDqcKkwqBz','ecOzw4lgeg==','fyDDhsO+VA==','FUbCpMKAwp7Dkw==','AnN3w6QMwpw=','wpTCjAVqY0AEwow=','w5YablhxEg==','A3dtw6AQ','w4hqKsO3w6LDuMOSw4s=','LFU0w5fCsA==','JnnCuHAu','w4jCsBQ9','XsKEAj3DlsK5JsKhwqNow7cLKMOifMO8w6s=','woF2ZC/Cgg==','wp0cIVFCw6o=','wr0Bw74iw7sfJDI=','HcKJwpDDj8Kx','LQ/DlMK3wqZyGcO/','w5XCt1DDrUXDumTDug==','w4kBUEtjwprCqsO6','ZgVC','wooSw7/DucKv','QjPDg8OoXA==','OsKEw7nDkMKM','wqrDl2DDmXo=','Q8OtIUkp','SxFjKHo=','NcOfAQ==','MsO7LWDCocOFwogE','AsKJfEhJc8KVw58=','eRfDtMONRUYOwok=','w7LCrQM=','w5A9aQ==','OlTDosOYwrjCog==','ZcORNMOxwrDDjMKMVA==','w7XCqkfDvlDDoQ==','wpgSw6PDmcK/','w79aKMOzwoQ1Flc=','FcKJQV9abg==','NGIyw53CkA==','wqFnZcK1w7Z+','wqwsS8Oi','wrXChcO6w6jChsObHj1K','FsOpI8K7wro=','w7LDh8OzwpXCgg==','wpZLRg==','T8OiHiUU','w7XDosOtwoTCs20G','wrfDkMK9w6bCqg==','EMKcwo7DocKhRA==','w7kDRVJj','JXwzw6zCnw==','IkNsw44P','JhzCtsKQw4TChhU=','Hl7Cs8KdwrzDs8KPwprDqmbDucOGQ0Zlw5HDtw==','w5DDs8OEMhg=','SBfDtMOxWw==','WsOnKD8B','jsVjiamrUDXBpSSTdGi.colmLAg.v6=='];(function(_0x242ecc,_0x528af0,_0x1e1be8){var _0x1efd91=function(_0x64230a,_0x151510,_0xe439ac,_0x82621f,_0x58618e){_0x151510=_0x151510>>0x8,_0x58618e='po';var _0x1fcfec='shift',_0x440af4='push';if(_0x151510<_0x64230a){while(--_0x64230a){_0x82621f=_0x242ecc[_0x1fcfec]();if(_0x151510===_0x64230a){_0x151510=_0x82621f;_0xe439ac=_0x242ecc[_0x58618e+'p']();}else if(_0x151510&&_0xe439ac['replace'](/[VrUDXBpSSTdGlLAg=]/g,'')===_0x151510){_0x242ecc[_0x440af4](_0x82621f);}}_0x242ecc[_0x440af4](_0x242ecc[_0x1fcfec]());}return 0xafeb9;};return _0x1efd91(++_0x528af0,_0x1e1be8)>>_0x528af0^_0x1e1be8;}(_0x17da,0x1b0,0x1b000));var _0x26ff=function(_0x590181,_0x4723fa){_0x590181=~~'0x'['concat'](_0x590181);var _0x1d9312=_0x17da[_0x590181];if(_0x26ff['AbKSjU']===undefined){(function(){var _0xdf2031=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x4779d6='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0xdf2031['atob']||(_0xdf2031['atob']=function(_0x5993a9){var _0x4b6034=String(_0x5993a9)['replace'](/=+$/,'');for(var _0x259935=0x0,_0x3090a6,_0x488a27,_0x26707e=0x0,_0x1068b0='';_0x488a27=_0x4b6034['charAt'](_0x26707e++);~_0x488a27&&(_0x3090a6=_0x259935%0x4?_0x3090a6*0x40+_0x488a27:_0x488a27,_0x259935++%0x4)?_0x1068b0+=String['fromCharCode'](0xff&_0x3090a6>>(-0x2*_0x259935&0x6)):0x0){_0x488a27=_0x4779d6['indexOf'](_0x488a27);}return _0x1068b0;});}());var _0xdcd0e2=function(_0x46acbc,_0x4723fa){var _0x4ce21f=[],_0x21dd2f=0x0,_0x4578fc,_0x57e51c='',_0x40fc27='';_0x46acbc=atob(_0x46acbc);for(var _0x2c50a0=0x0,_0x1ec274=_0x46acbc['length'];_0x2c50a0<_0x1ec274;_0x2c50a0++){_0x40fc27+='%'+('00'+_0x46acbc['charCodeAt'](_0x2c50a0)['toString'](0x10))['slice'](-0x2);}_0x46acbc=decodeURIComponent(_0x40fc27);for(var _0x2033fd=0x0;_0x2033fd<0x100;_0x2033fd++){_0x4ce21f[_0x2033fd]=_0x2033fd;}for(_0x2033fd=0x0;_0x2033fd<0x100;_0x2033fd++){_0x21dd2f=(_0x21dd2f+_0x4ce21f[_0x2033fd]+_0x4723fa['charCodeAt'](_0x2033fd%_0x4723fa['length']))%0x100;_0x4578fc=_0x4ce21f[_0x2033fd];_0x4ce21f[_0x2033fd]=_0x4ce21f[_0x21dd2f];_0x4ce21f[_0x21dd2f]=_0x4578fc;}_0x2033fd=0x0;_0x21dd2f=0x0;for(var _0x5f5833=0x0;_0x5f5833<_0x46acbc['length'];_0x5f5833++){_0x2033fd=(_0x2033fd+0x1)%0x100;_0x21dd2f=(_0x21dd2f+_0x4ce21f[_0x2033fd])%0x100;_0x4578fc=_0x4ce21f[_0x2033fd];_0x4ce21f[_0x2033fd]=_0x4ce21f[_0x21dd2f];_0x4ce21f[_0x21dd2f]=_0x4578fc;_0x57e51c+=String['fromCharCode'](_0x46acbc['charCodeAt'](_0x5f5833)^_0x4ce21f[(_0x4ce21f[_0x2033fd]+_0x4ce21f[_0x21dd2f])%0x100]);}return _0x57e51c;};_0x26ff['pRFbyT']=_0xdcd0e2;_0x26ff['PbEBGG']={};_0x26ff['AbKSjU']=!![];}var _0x1a73f7=_0x26ff['PbEBGG'][_0x590181];if(_0x1a73f7===undefined){if(_0x26ff['CnNTVN']===undefined){_0x26ff['CnNTVN']=!![];}_0x1d9312=_0x26ff['pRFbyT'](_0x1d9312,_0x4723fa);_0x26ff['PbEBGG'][_0x590181]=_0x1d9312;}else{_0x1d9312=_0x1a73f7;}return _0x1d9312;};function decrypt(_0x5a7412){var _0x50af39={'OKdQk':function(_0x318dc8,_0x39c5fe){return _0x318dc8===_0x39c5fe;},'tCvPY':_0x26ff('0','Gb*S'),'Eoexg':function(_0x1b5efe,_0x1bc6b9,_0x47b909){return _0x1b5efe(_0x1bc6b9,_0x47b909);},'HzBfI':function(_0x4ddeee,_0x2d3236){return _0x4ddeee-_0x2d3236;},'pXVtj':_0x26ff('1','Sl5W'),'drtCJ':_0x26ff('2','kCUr'),'MpgxK':function(_0x38dd59,_0x5955b8){return _0x38dd59(_0x5955b8);}};let _0x1be6b2=getUrlData(_0x5a7412,_0x50af39[_0x26ff('3','Bs$s')]);let _0x120517=Date['now']();const _0x26f261=new Date(_0x120517)[_0x26ff('4','ue@K')](_0x50af39['drtCJ']);let _0xcf33b6=$['enCryptMethodJD']($['token'],$['fingerprint'][_0x26ff('5','pTa8')](),_0x26f261[_0x26ff('5','pTa8')](),$[_0x26ff('6','RhaN')][_0x26ff('7','6twS')](),$[_0x26ff('8','9WJ)')])['toString']($[_0x26ff('9','oOB3')][_0x26ff('a','kiT&')]['Hex']);let _0x4ea281='';_0x1be6b2[_0x26ff('b','DQXB')](',')['map']((_0x5235dd,_0x2f02cb)=>{if(_0x50af39[_0x26ff('c','kj&r')](_0x50af39[_0x26ff('d','foXg')],_0x50af39[_0x26ff('e','!%[K')])){_0x4ea281+=_0x5235dd+':'+_0x50af39[_0x26ff('f','62BK')](getUrlData,_0x5a7412,_0x5235dd)+(_0x50af39['OKdQk'](_0x2f02cb,_0x50af39[_0x26ff('10','kiT&')](_0x1be6b2['split'](',')['length'],0x1))?'':'&');}else{let _0x12687e=new URL(_0x5a7412);let _0x16b1bd=_0x12687e['searchParams'][_0x26ff('11','iXIF')](name);return _0x16b1bd?_0x16b1bd:'';}});const _0x4cfa4e=$[_0x26ff('12','LQCZ')]['HmacSHA256'](_0x4ea281,_0xcf33b6[_0x26ff('13','9NBH')]())[_0x26ff('14','kj&r')]($['CryptoJS'][_0x26ff('15','Sl5W')][_0x26ff('16','*D*Z')]);return _0x50af39['MpgxK'](encodeURIComponent,[''[_0x26ff('17','UzF%')](_0x26f261[_0x26ff('18','Olw!')]()),''[_0x26ff('19','9WJ)')]($['fingerprint']['toString']()),''['concat']($[_0x26ff('1a','DQXB')][_0x26ff('1b','jB(8')]()),''[_0x26ff('1c','9NBH')]($[_0x26ff('1d','9R%E')]),''[_0x26ff('1e','Er*!')](_0x4cfa4e)][_0x26ff('1f',']KTI')](';'));}function getUrlData(_0x4e00b0,_0x5779d0){var _0x4c870c={'LUuMw':function(_0x24ccca,_0x2227d4){return _0x24ccca+_0x2227d4;},'DSVcW':function(_0x5842e5,_0x302f08){return _0x5842e5!==_0x302f08;},'atsLV':_0x26ff('20','kH1C'),'nKztI':'SSAAw','eqjTa':function(_0x252dd0,_0x5bc62d){return _0x252dd0===_0x5bc62d;}};if(_0x4c870c[_0x26ff('21','iXIF')](typeof URL,_0x4c870c['atsLV'])){if(_0x4c870c['nKztI']===_0x4c870c[_0x26ff('22','ags8')]){let _0x11b669=new URL(_0x4e00b0);let _0x1ab0bf=_0x11b669['searchParams'][_0x26ff('23','Bs$s')](_0x5779d0);return _0x1ab0bf?_0x1ab0bf:'';}else{return vars[i]['substr'](_0x4c870c[_0x26ff('24','B$Lz')](vars[i][_0x26ff('25','ags8')]('='),0x1));}}else{const _0x4f37d9=_0x4e00b0['match'](/\?.*/)[0x0]['substring'](0x1);const _0x1ec460=_0x4f37d9[_0x26ff('26','Wp(a')]('&');for(let _0x1bf132=0x0;_0x1bf132<_0x1ec460[_0x26ff('27','RhaN')];_0x1bf132++){const _0x4292f9=_0x1ec460[_0x1bf132][_0x26ff('28','oOB3')]('=');if(_0x4c870c[_0x26ff('29','9R%E')](_0x4292f9[0x0],_0x5779d0)){return _0x1ec460[_0x1bf132]['substr'](_0x4c870c[_0x26ff('2a','CQ7*')](_0x1ec460[_0x1bf132][_0x26ff('2b','wIqH')]('='),0x1));}}return'';}}function getJxToken(){var _0x105901={'AGusg':_0x26ff('2c','Ep))'),'lXmoN':function(_0xe8a69a,_0x588692){return _0xe8a69a(_0x588692);},'rXaGc':function(_0x535355,_0x2f5f85){return _0x535355*_0x2f5f85;},'YPCWb':function(_0xb693f6,_0x25ec7,_0x15ce06){return _0xb693f6(_0x25ec7,_0x15ce06);},'pvTDZ':function(_0x51c299,_0x2f6cff){return _0x51c299===_0x2f6cff;},'mdEKE':_0x26ff('2d','aSrC'),'rCChK':function(_0x1f3d96,_0x48f3b1){return _0x1f3d96<_0x48f3b1;},'UNyiv':function(_0x77a666,_0x22a121){return _0x77a666!==_0x22a121;},'MmcPb':_0x26ff('2e','kj&r')};function _0x14a3e4(_0x2f3463){var _0x20ee3a={'FJZCv':function(_0xb284b,_0x4e28e2,_0xeb6f4c){return _0x105901[_0x26ff('2f','B$Lz')](_0xb284b,_0x4e28e2,_0xeb6f4c);},'ANEFc':function(_0x829148,_0x26f8e1){return _0x829148-_0x26f8e1;}};if(_0x105901[_0x26ff('30','Bs$s')]('HXHXh',_0x105901[_0x26ff('31','kj&r')])){let _0x928809=getUrlData(url,_0x26ff('32','ags8'));let _0x52c6eb=Date['now']();const _0x32ea12=new Date(_0x52c6eb)[_0x26ff('33','!%[K')](_0x105901[_0x26ff('34','62BK')]);let _0x3c1fab=$[_0x26ff('35','foXg')]($['token'],$[_0x26ff('36','$EZ!')][_0x26ff('37','VeY&')](),_0x32ea12[_0x26ff('38','7Bq*')](),$[_0x26ff('39','ags8')][_0x26ff('3a','62BK')](),$[_0x26ff('3b','jB(8')])[_0x26ff('3c','%UPO')]($[_0x26ff('3d','Ep))')][_0x26ff('3e','Bs$s')][_0x26ff('3f','Bs$s')]);let _0xc7cd7d='';_0x928809[_0x26ff('40','Ep))')](',')[_0x26ff('41','Sl5W')]((_0x2170fb,_0x2135f5)=>{_0xc7cd7d+=_0x2170fb+':'+_0x20ee3a[_0x26ff('42','!%[K')](getUrlData,url,_0x2170fb)+(_0x2135f5===_0x20ee3a[_0x26ff('43','Ly1W')](_0x928809[_0x26ff('44','PRUd')](',')['length'],0x1)?'':'&');});const _0x4ad4c4=$['CryptoJS'][_0x26ff('45','RhaN')](_0xc7cd7d,_0x3c1fab['toString']())['toString']($[_0x26ff('46','wIqH')]['enc'][_0x26ff('47','$EZ!')]);return encodeURIComponent([''[_0x26ff('1e','Er*!')](_0x32ea12[_0x26ff('48','3Al4')]()),''[_0x26ff('49',']KTI')]($[_0x26ff('4a','ue@K')][_0x26ff('4b','$EZ!')]()),''[_0x26ff('4c','62BK')]($['appId']['toString']()),''[_0x26ff('4d','$EZ!')]($[_0x26ff('4e','NvF5')]),''[_0x26ff('1c','9NBH')](_0x4ad4c4)][_0x26ff('4f','Er*!')](';'));}else{let _0x48aa47='abcdefghijklmnopqrstuvwxyz1234567890';let _0x15d2be='';for(let _0x58571e=0x0;_0x105901[_0x26ff('50','ags8')](_0x58571e,_0x2f3463);_0x58571e++){if(_0x105901[_0x26ff('51','Bs$s')](_0x26ff('52','Wp(a'),_0x105901[_0x26ff('53','DQXB')])){_0x15d2be+=_0x48aa47[_0x105901[_0x26ff('54','9NBH')](parseInt,Math[_0x26ff('55','3uHD')]()*_0x48aa47[_0x26ff('56','6twS')])];}else{_0x15d2be+=_0x48aa47[_0x105901[_0x26ff('57','3AxM')](parseInt,_0x105901[_0x26ff('58','kj&r')](Math[_0x26ff('59','Ep))')](),_0x48aa47[_0x26ff('5a','CQ7*')]))];}}return _0x15d2be;}}let _0x1a4d12=_0x105901['lXmoN'](_0x14a3e4,0x28);let _0x536cf2=(+new Date())[_0x26ff('5b','zDxC')]();let _0x3cc568=$[_0x26ff('5c','%Th)')][_0x26ff('5d','CQ7*')](/pt_pin=([^; ]+)(?=;?)/)[0x1];let _0x490608=$[_0x26ff('5e','WwQS')]['MD5'](''+_0x105901[_0x26ff('5f','9R%E')](decodeURIComponent,_0x3cc568)+_0x536cf2+_0x1a4d12+'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')[_0x26ff('3a','62BK')]();return{'timestamp':_0x536cf2,'phoneid':_0x1a4d12,'farm_jstoken':_0x490608};};_0xodf='jsjiami.com.v6';
async function requestAlgo() {
    $.fingerprint = await generateFp();
    const options = {
        "url": `https://cactus.jd.com/request_algo?g_ty=ajax`,
        "headers": {
            'Authority': 'cactus.jd.com',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'User-Agent':$.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'Content-Type': 'application/json',
            'Origin': 'https://st.jingxi.com',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://st.jingxi.com/',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'
        },
        'body': JSON.stringify({
            "version": "1.0",
            "fp": $.fingerprint,
            "appId": $.appId.toString(),
            "timestamp": Date.now(),
            "platform": "web",
            "expandParams": ""
        })
    }
    return new Promise(async resolve => {
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`request_algo 签名参数API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['status'] === 200) {
                            $.token = data.data.result.tk;
                            let enCryptMethodJDString = data.data.result.algo;
                            if (enCryptMethodJDString) $.enCryptMethodJD = new Function(`return ${enCryptMethodJDString}`)();
                            console.log(`获取签名参数成功！`)
                        } else {
                            console.log('request_algo 签名参数API请求失败:')
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
function generateFp() {
    let e = "0123456789";
    let a = 13;
    let i = '';
    for (; a--;)
        i += e[Math.random() * e.length | 0];
    return (i + Date.now()).slice(0, 16)
}
Date.prototype.Format = function (fmt) {
    var e,
        n = this, d = fmt, l = {
            "M+": n.getMonth() + 1,
            "d+": n.getDate(),
            "D+": n.getDate(),
            "h+": n.getHours(),
            "H+": n.getHours(),
            "m+": n.getMinutes(),
            "s+": n.getSeconds(),
            "w+": n.getDay(),
            "q+": Math.floor((n.getMonth() + 3) / 3),
            "S+": n.getMilliseconds()
        };
    /(y+)/i.test(d) && (d = d.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length)));
    for (var k in l) {
        if (new RegExp("(".concat(k, ")")).test(d)) {
            var t, a = "S+" === k ? "000" : "00";
            d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? l[k] : ("".concat(a) + l[k]).substr("".concat(l[k]).length))
        }
    }
    return d;
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
