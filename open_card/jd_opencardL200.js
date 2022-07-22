/*
7.20-8.4 七夕喜鹊叫，好运身边绕
新增开卡脚本，一次性脚本

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

邀请有问题，反正看运气有时候有，愿意跑的就跑吧，不跑的禁用。

开一张卡5 关注5 加购5

cron:31 4,15 20-31,1-4 7,8 *
============Quantumultx===============
[task_local]
#7.20-8.4 七夕喜鹊叫，好运身边绕
31 4,15 20-31,1-4 7,8 * jd_opencardL200.js, tag=7.20-8.4 七夕喜鹊叫，好运身边绕, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("7.20-8.4 七夕喜鹊叫，好运身边绕");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
    Object.keys(jdCookieNode).forEach(OOQ0Q0=>{
        cookiesArr.push(jdCookieNode[OOQ0Q0]);
    });
    if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
    cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(O0O000=>O0O000.cookie)].filter(O0O0Q0=>!!O0O0Q0);
}
opencard_toShop=$.isNode()?process.env.opencard_toShop?process.env.opencard_toShop:''+opencard_toShop:$.getdata('opencard_toShop')?$.getdata('opencard_toShop'):''+opencard_toShop;
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let shareUuidArr=['/nFlfyWPdMnTxK1/nf0Ssc7TwJCmNe8NFvhpI0XmJDULVU108+UxlHw7qoUuHA4F'];
let s=Math.floor(Math.random()*3);
let n=0;
n=Math.floor(Math.random()*shareUuidArr.length);
let helpnum=shareUuidArr[n]?shareUuidArr[n]:$.shareUuid;
!(async()=>{
    console.log('\n请自行确认账号一是否黑号，黑号会全部助力当前助力');
    console.log('\n当前助力：'+helpnum);
    if(!cookiesArr[0]){
        $.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
        return;
    }
    $.appkey='21699045';
    $.userId='10299171';
    $.actId='unionLover20220804';
    $.MixNicks='';
    $.inviteNick=helpnum;
    for(let QOQO0Q=0;QOQO0Q<cookiesArr.length;QOQO0Q++){
        cookie=cookiesArr[QOQO0Q];
        if(cookie){
            $.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index=QOQO0Q+1;
            message='';
            $.bean=0;
            $.hotFlag=false;
            $.nickName='';
            console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
            await getUA();
            await run();
            if($.outFlag||$.activityEnd)break;
        }
    }if($.outFlag){
        let QOQOQO='此ip已被限制，请过10分钟后再执行脚本';
        $.msg($.name,'',''+QOQOQO);
        if($.isNode())await notify.sendNotify(''+$.name,''+QOQOQO);
    }
})().catch(OOQQQQ=>$.logErr(OOQQQQ)).finally(()=>$.done());
async function run(){
    try{
        $.hasEnd=true;
        $.endTime=0;
        lz_jdpin_token_cookie='';
        $.Token='';
        $.Pin='';
        $.MixNick='';
        let OQ0O0Q=false;
        if($.activityEnd)return;
        if($.outFlag){
            console.log('此ip已被限制，请过10分钟后再执行脚本\n');
            return;
        }
        await takePostRequest('isvObfuscator');
        if($.Token==''){
            console.log('获取[token]失败！');
            return;
        }
        await takePostRequest('activity_load');
        if($.hotFlag)return;
        if($.MixNick==''){
            console.log('获取cookie失败');
            return;
        }
        $.toBind=0;
        $.openLists=[];
        await $.wait(parseInt((Math.random()*2000)+1000,10));
        await takePostRequest('绑定');
        await $.wait(parseInt(Math.random()*2000+2000,10));
        await takePostRequest('shopList');
        for(o of $.openLists){
            $.missionType='openCard';
            if((o.open!=true)&&o.openCardUrl){
                if($.activityEnd)return;
                $.open=false;
                $.joinVenderId=o.userId;
                await takePostRequest('kaika');
                await $.wait(parseInt(Math.random()*2000+2000,10));
                if($.open==false){
                    $.errorJoinShop='';
                    await joinShop();
                    if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
                        console.log('第1次 重新开卡');
                        await $.wait(1000);
                        await joinShop();
                    }
                    if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
                        console.log('第2次 重新开卡');
                        await $.wait(1000);
                        await joinShop();
                    }
                    if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
                        console.log('第3次 重新开卡');
                        await $.wait(1000);
                        await joinShop();
                    }
                    if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
                        console.log('第4次 重新开卡');
                        await $.wait(1000);
                        await joinShop();
                    }
                    await takePostRequest('kaika');
                    await takePostRequest('shopList');
                    await takePostRequest('activity_load');
                    await $.wait(parseInt(Math.random()*2000+1000,10));
                }
            }
        }
        await takePostRequest('bulletChat');
        await $.wait(parseInt(Math.random()*2000+1000,10));
        if($.hasCollectShop===0){
            $.missionType='uniteCollectShop';
            await takePostRequest('mission');
            await $.wait(parseInt(Math.random()*2000+1000,10));
        }else{
            console.log('已经关注');
        }
        if($.hasAddCart===0){
            $.missionType='uniteAddCart';
            await takePostRequest('mission');
            await $.wait(parseInt(Math.random()*2000+1000,10));
        }else{
            console.log('已经加购');
        }
        await $.wait(parseInt((Math.random()*2000)+1000,10));
        $.missionType='inviteCheck';
        await takePostRequest('mission');
        await takePostRequest('activity_load');
        $.runFalag=true;
        let OQQQ0O=parseInt($.remainPoint/200);
        console.log('抽奖次数为:'+OQQQ0O);
        for(m=1;OQQQ0O--;m++){
            console.log('第'+m+'次抽奖');
            await takePostRequest('抽奖');
            if($.runFalag==false)break;
            if(Number(OQQQ0O)<=0)break;
            if(m>=5){
                console.log('抽奖太多次，多余的次数请再执行脚本');
                break;
            }
            await $.wait(parseInt(Math.random()*2000+2000,10));
        }
        if($.index==1){
            $.inviteNick=$.MixNick;
            console.log('后面的号都会助力:'+$.inviteNick);
        }
        await $.wait(parseInt(Math.random()*1000+2000,10));
    }catch(Q0000Q){
        console.log(Q0000Q);
    }
}
async function takePostRequest(OQ00QQ){
    if($.outFlag)return;
    let OOOOQO='https://mpdz6-dz.isvjcloud.com';
    let Q00Q00='';
    let OO0QOQ='POST';
    let OO0QOO='';
    switch(OQ00QQ){
        case 'isvObfuscator':
            url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
            Q00Q00='body=%7B%22url%22%3A%22https%3A%5C/%5C/mpdz-dz.isvjcloud.com%5C/jdbeverage%5C/pages%5C/sign51%5C/sign51?bizExtString%3Dc2hhcmVOaWNrOjh0WFJQTEFobk8yaEU4V1VPUHByY2M3VHdKQ21OZThORnZocEkwWG1KRFVMVlUxMDglMkJVeGxIdzdxb1V1SEE0RiZoZWFkUGljVXJsOmh0dHAlM0ElMkYlMkZzdG9yYWdlLjM2MGJ1eWltZy5jb20lMkZpLmltYWdlVXBsb2FkJTJGNzc3NTY4NjU2ZTczNzQ2MTcyMzEzNjMwMzQzOTM4MzczODMxMzMzMTMxMzNfbWlkLmpwZyZuaWNrTmFtZTolRTYlOEMlOUElRTclODglQjElRTclOEYlOEElRTUlQUUlOUQlRTUlQUUlOUQ%3D%26sid%3D8476480e8271ba209c055afca63a924w%26un_area%3D4_50950_50957_0%22%2C%22id%22%3A%22%22%7D&build=167963&client=apple&clientVersion=10.3.6&d_brand=apple&d_model=iPhone8%2C2&ef=1&eid=eidI994b812123s1PRhmb/36RNW2uQJarJ271z0YZ%2Bv4APcrj75ymDe%2B0Z6%2BnTWSLykYTnpR8p/NwxporPY8JdbEwVIoH6%2BtJTHm/uL08tuO6g10hmNP&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJS0CseyCtK4%22%2C%22osVersion%22%3A%22CJGkEK%3D%3D%22%2C%22openudid%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22area%22%3A%22DP81CNu1CP81CNu1D18m%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1651115073%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&isBackground=N&joycious=116&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=01&sign=a872218a0b5b8bbf20718217f084b1ed&st=1651205710814&sv=120&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJGDvIUMS36N/l7mJ1NVzSiKCsJDs6WgecFid6ckXh2O65h6Up5mRVfM9FxyqSf7AnAUkkxZuCEelMJweKE0qmxKo6RbZPmvFcsO%2BBSivc5EiXDNGR2/Plyt5HCOw4YhV3l8R5RbDUOvqt4fdTRkK6bkQ28k%2B8Lf73/CiUHR%2ByZjLjlf/p50Zq9A%3D%3D';
            break;
        case 'activity_load':
            url=OOOOQO+'/dm/front/jdUnionLover/activity/load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
            OO0QOO={'jdToken':$.Token,'inviteNick':$.inviteNick||''};
            if($.joinVenderId)OO0QOO={
                ...OO0QOO,'shopId':''+$.joinVenderId
            };
            Q00Q00=taskPostUrl('/jdUnionLover/activity/load',OO0QOO);
            break;
        case 'shopList':
            url=OOOOQO+'/dm/front/jdUnionLover/shop/shopList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
            OO0QOO={};
            Q00Q00=taskPostUrl('/jdUnionLover/shop/shopList',OO0QOO);
            break;
        case'绑定':
            url=OOOOQO+'/dm/front/jdUnionLover/customer/inviteRelation?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
            OO0QOO={'missionType':'relationBind','inviterNick':$.inviteNick||''};
            Q00Q00=taskPostUrl('/jdUnionLover/customer/inviteRelation',OO0QOO);
            break;
        case'助力':
            url=OOOOQO+'/dm/front/jdUnionLover/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
            OO0QOO={'inviteListRequest':{'actId':'unionLover20220804','missionType':'shareAct','buyerNick':$.MixNick||'','inviteType':0},'inviterNick':$.inviteNick||''};
            Q00Q00=taskPostUrl('/jdUnionLover/customer/inviteList',OO0QOO);
            break;
        case 'mission':
            url=OOOOQO+'/dm/front/jdUnionLover/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
            OO0QOO={'missionType':$.missionType};
            Q00Q00=taskPostUrl('/jdUnionLover/mission/completeMission',OO0QOO);
            break;
        case 'kaika':
            url=OOOOQO+'/dm/front/jdUnionLover/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
            OO0QOO={'missionType':$.missionType,'userId':$.joinVenderId,'inviterNick':$.inviteNick||''};
            Q00Q00=taskPostUrl('/jdUnionLover/mission/completeMission',OO0QOO);
            break;
        case'抽奖':
            url=OOOOQO+'/dm/front/jdUnionLover/interactive/drawPost?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
            OO0QOO={'usedGameNum':'2','dataType':'draw'};
            Q00Q00=taskPostUrl('/jdUnionLover/interactive/drawPost',OO0QOO);
            break;
        case 'followShop':
            url=OOOOQO+'/dm/front/jdUnionLover/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
            OO0QOO={'actId':$.actId,'missionType':'uniteCollectShop'};
            Q00Q00=taskPostUrl('/jdUnionLover/mission/completeMission',OO0QOO);
            break;
        case 'bulletChat':
            url=OOOOQO+'/dm/front/jdUnionLover/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
            OO0QOO={'bulletChat':'七夕喜鹊叫，好运身边绕','actId':$.actId,'missionType':'bulletChat'};
            Q00Q00=taskPostUrl('/jdUnionLover/mission/completeMission',OO0QOO);
            break;
        case 'inviteCheck':
            url=OOOOQO+'/dm/front/jdUnionLover/mission/completeMission?open_id=?mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
            OO0QOO={'actId':$.actId,'missionType':'inviteCheck'};
            Q00Q00=taskPostUrl('/jdUnionLover/mission/completeMission',OO0QOO);
            break;
        case 'myAward':
            url=OOOOQO+'/dm/front/jdRiceNoodleFestival/awards/list?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
            OO0QOO={'pageNo':1,'pageSize':9999};
            Q00Q00=taskPostUrl('/jdRiceNoodleFestival/awards/list',OO0QOO);
            break;
        case 'missionInviteList':
            url=OOOOQO+'/dm/front/jdRiceNoodleFestival/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
            OO0QOO={'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteNum':1,'buyerNick':$.MixNick||''};
            Q00Q00=taskPostUrl('/jdRiceNoodleFestival/customer/inviteList',OO0QOO);
            break;
        default:
            console.log('错误'+OQ00QQ);
    }
    let OO00O0=getPostRequest(url,Q00Q00,OO0QOQ);
    return new Promise(async OOOO0Q=>{
        $.post(OO00O0,(OOQQQ0,Q00QOQ,OOQ0OO)=>{
            try{
                if(OOQQQ0){
                    if(Q00QOQ&&Q00QOQ.statusCode&&Q00QOQ.statusCode==493){
                        console.log('此ip已被限制，请过10分钟后再执行脚本\n');
                        $.outFlag=true;
                    }
                    console.log(''+$.toStr(OOQQQ0,OOQQQ0));
                    console.log(OQ00QQ+' API请求失败，请检查网路重试');
                }else{
                    dealReturn(OQ00QQ,OOQ0OO);
                }
            }catch(Q00QO0){
                console.log(Q00QO0,Q00QOQ);
            }
            finally{
                OOOO0Q();
            }
        });
    });
}
async function dealReturn(OO0QQQ,OO0000){
    let QQOQQ0='';
    try{
        if((OO0QQQ!='accessLogWithAD')||(OO0QQQ!='drawContent')){
            if(OO0000){
                QQOQQ0=JSON.parse(OO0000);
            }
        }
    }catch(QQO0OO){
        console.log(OO0QQQ+' 执行任务异常');
        console.log(OO0000);
        $.runFalag=false;
    }try{
        let Q0OOQ0='';
        switch(OO0QQQ){
            case 'isvObfuscator':
                if(typeof QQOQQ0=='object'){
                    if(QQOQQ0.errcode==0){
                        if(typeof QQOQQ0.token!='undefined')$.Token=QQOQQ0.token;
                    }else if(QQOQQ0.message){
                        console.log(OO0QQQ+' '+(QQOQQ0.message||''));
                    }else{
                        console.log(OO0000);
                    }
                }else{
                    console.log(OO0000);
                }
                break;
            case'accessLogWithAD':
            case 'drawContent':
                break;
            case 'activity_load':
            case 'mission':
            case 'shopList':
            case 'loadUniteOpenCard':
            case 'setMixNick':
            case 'uniteOpenCardOne':
            case 'checkOpenCard':
            case 'followShop':
            case 'addCart':
            case 'myAward':
            case 'missionInviteList':
            case'抽奖':
            case 'kaika':
            case'绑定':
            case'助力':
            case 'bulletChat':
            case 'specialSign':
                Q0OOQ0='';
                if(OO0QQQ=='followShop')Q0OOQ0='关注';
                if(OO0QQQ=='addCart')Q0OOQ0='加购';
                if(typeof QQOQQ0=='object'){
                    if(QQOQQ0.success&&QQOQQ0.success===true&&QQOQQ0.data){
                        if(QQOQQ0.data.status&&QQOQQ0.data.status==200){
                            QQOQQ0=QQOQQ0.data;
                            if((OO0QQQ!='setMixNick')&&(QQOQQ0.msg||QQOQQ0.data.isOpenCard||QQOQQ0.data.remark))console.log(''+(Q0OOQ0&&(Q0OOQ0+':')||'')+(QQOQQ0.msg||QQOQQ0.data.isOpenCard||QQOQQ0.data.remark||''));
                            if(OO0QQQ=='activity_load'){
                                if(QQOQQ0.data){
                                    $.endTime=QQOQQ0.data.cusActivity.endTime||0;
                                    $.MixNick=QQOQQ0.data.missionCustomer.buyerNick||'';
                                    $.remainPoint=QQOQQ0.data.missionCustomer.remainPoint||0;
                                    $.usedPoint=QQOQQ0.data.missionCustomer.usedPoint||0;
                                    $.hasCollectShop=QQOQQ0.data.missionCustomer.hasCollectShop||0;
                                    $.hasAddCart=QQOQQ0.data.missionCustomer.hasAddCart||0;
                                }
                            }else if(OO0QQQ=='shopList'){
                                if(QQOQQ0.data){
                                    $.openLists=QQOQQ0.data;
                                }
                            }else if(OO0QQQ=='mission'){
                                if(QQOQQ0.data.remark.indexOf('赶紧去开卡吧')>-1){
                                    $.open=true;
                                }else{
                                    $.open=false;
                                }
                            }else if(OO0QQQ=='uniteOpenCardOne'){
                                $.uniteOpenCar=QQOQQ0.msg||QQOQQ0.data.msg||'';
                            }else if(OO0QQQ=='myAward'){
                                console.log('我的奖品：');
                                let QQO000=0;
                                let Q0OO0O=0;
                                for(let Q0Q0O0 in QQOQQ0.data.list||[]){
                                    let Q0OOQQ=QQOQQ0.data.list[Q0Q0O0];
                                    Q0OO0O+=Number(Q0OOQQ.awardDes);
                                }
                                if(Q0OO0O>0)console.log('共获得'+Q0OO0O+'京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n');
                            }else if(OO0QQQ=='missionInviteList'){
                                console.log('邀请人数('+QQOQQ0.data.total+')');
                            }
                        }else if(QQOQQ0.data.msg){
                            if(QQOQQ0.errorMessage.indexOf('活动未开始')>-1){
                                $.activityEnd=true;
                            }
                            console.log(''+(QQOQQ0.data.msg||''));
                        }else if(QQOQQ0.errorMessage){
                            if(QQOQQ0.errorMessage.indexOf('火爆')>-1){}
                            console.log(''+(QQOQQ0.errorMessage||''));
                        }else{
                            console.log(''+OO0000);
                        }
                    }else if(QQOQQ0.errorMessage){
                        console.log(''+(QQOQQ0.errorMessage||''));
                    }else{
                        console.log(''+OO0000);
                    }
                }else{
                    console.log(''+OO0000);
                }
                break;
            default:
                console.log((Q0OOQ0||OO0QQQ)+'-> '+OO0000);
        }if(typeof QQOQQ0=='object'){
            if(QQOQQ0.errorMessage){
                if(QQOQQ0.errorMessage.indexOf('火爆')>-1){}
            }
        }
    }catch(OQOOQO){
        console.log(OQOOQO);
    }
}
function getPostRequest(OQOOQQ,OQQ0O0,OQQQOQ='POST'){
    let Q0Q0OO={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
    if(OQOOQQ.indexOf('https://mpdz6-dz.isvjcloud.com')>-1){
        Q0Q0OO.Origin='https://mpdz6-dz.isvjcloud.com';
        Q0Q0OO['Content-Type']='application/json; charset=utf-8';
        delete Q0Q0OO.Cookie;
    }
    return{'url':OQOOQQ,'method':OQQQOQ,'headers':Q0Q0OO,'body':OQQ0O0,'timeout':60000};
}
function taskPostUrl(Q0QQ00,OQ00OQ){
    const OQOOQ0={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','sign':'a6b11167cb823d19f793bb979448dfac','timestamp':Date.now(),'userId':$.userId},'admJson':{
                'actId':$.actId,'userId':$.userId,...OQ00OQ,'method':Q0QQ00,'buyerNick':$.MixNick||''
            }}};
    if(Q0QQ00.indexOf('missionInviteList')>-1){
        delete OQOOQ0.params.admJson.actId;
    }
    return $.toStr(OQOOQ0,OQOOQ0);
}
async function getUA(){
    $.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(QQOQOO){
    QQOQOO=(QQOQOO||32);
    let Q0Q000='abcdef0123456789',Q0QQQQ=Q0Q000.length,Q0Q0Q0='';
    for(i=0;i<QQOQOO;i++)Q0Q0Q0+=Q0Q000.charAt(Math.floor(Math.random()*Q0QQQQ));
    return Q0Q0Q0;
}
function jsonParse(Q0QQQO){
    if(typeof Q0QQQO=='string'){
        try{
            return JSON.parse(Q0QQQO);
        }catch(OQOOOQ){
            console.log(OQOOOQ);
            $.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
            return[];
        }
    }
}
function joinShop(){
    if(!$.joinVenderId)return;
    return new Promise(async Q0QOOO=>{
        $.errorJoinShop='';
        $.shopactivityId='';
        await $.wait(1000);
        await getshopactivityId();
        let QOQ00O0='';
        if($.shopactivityId)QOQ00O0=',"activityId":'+$.shopactivityId;
        let OOQQOOQ='20220412164634306%3Bf5299392a200d6d9ffced997e5790dcc%3B169f1%3Btk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E%2FgujGAB50kyO7hwByWK%3B77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7%3B3.0%3B1649753194306';
        const OOQ0OQO={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+QOQ00O0+',"channel":401}&client=H5&clientVersion=9.2.0&uuid=88888&h5st='+OOQQOOQ,'headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
        $.get(OOQ0OQO,async(OOOOQQ0,OQ00OQO,Q000QQ0)=>{
            try{
                let Q00QQOQ=$.toObj(Q000QQ0,Q000QQ0);
                if(typeof Q00QQOQ=='object'){
                    if(Q00QQOQ.success===true){
                        console.log(Q00QQOQ.message);
                        $.errorJoinShop=Q00QQOQ.message;
                        if($.errorJoinShop==='手机号已经在此店铺下绑定过'){
                            console.log('无用账号，退出');
                            return;
                        }if(Q00QQOQ.result&&Q00QQOQ.result.giftInfo){
                            for(let OOQQOOO of Q00QQOQ.result.giftInfo.giftList){
                                console.log('入会获得:'+OOQQOOO.discountString+OOQQOOO.prizeName+OOQQOOO.secondLineDesc);
                            }
                        }
                    }else if(typeof Q00QQOQ=='object'&&Q00QQOQ.message){
                        $.errorJoinShop=Q00QQOQ.message;
                        console.log(''+(Q00QQOQ.message||''));
                    }else{
                        console.log(Q000QQ0);
                    }
                }else{
                    console.log(Q000QQ0);
                }
            }catch(OOQQOO0){
                $.logErr(OOQQOO0,OQ00OQO);
            }
            finally{
                Q0QOOO();
            }
        });
    });
}
function getshopactivityId(){
    return new Promise(Q00QQQ0=>{
        const Q00QQQO={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22'+$.joinVenderId+'%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888','headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
        $.get(Q00QQQO,async(OQ0QOQO,OOQQ000,OOQQQQQ)=>{
            try{
                let QOQ0Q0O=$.toObj(OOQQQQQ,OOQQQQQ);
                if(typeof QOQ0Q0O=='object'){
                    if(QOQ0Q0O.success==true){
                        console.log('入会:'+(QOQ0Q0O.result.shopMemberCardInfo.venderCardName||''));
                        $.shopactivityId=QOQ0Q0O.result.interestsRuleList&&QOQ0Q0O.result.interestsRuleList[0]&&QOQ0Q0O.result.interestsRuleList[0].interestsInfo&&QOQ0Q0O.result.interestsRuleList[0].interestsInfo.activityId||'';
                    }
                }else{
                    console.log(OOQQQQQ);
                }
            }catch(OOOOQO0){
                $.logErr(OOOOQO0,OOQQ000);
            }
            finally{
                Q00QQQ0();
            }
        });
    });
};
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    class s { constructor(t) { this.env = t }
        send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) }
        get(t) { return this.send.call(this.env, t) }
        post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) }
        isNode() { return "undefined" != typeof module && !!module.exports }
        isQuanX() { return "undefined" != typeof $task }
        isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon }
        isLoon() { return "undefined" != typeof $loon }
        toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } }
        toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } }
        getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch {}
            return s }
        setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } }
        getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) }
        runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
            i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
            r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } };
            this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) }
        loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile),
            e = this.path.resolve(process.cwd(), this.dataFile),
            s = this.fs.existsSync(t),
            i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } }
        writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile),
            e = this.path.resolve(process.cwd(), this.dataFile),
            s = this.fs.existsSync(t),
            i = !s && this.fs.existsSync(e),
            r = JSON.stringify(this.data);
            s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } }
        lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i)
            if (r = Object(r)[t], void 0 === r) return s;
            return r }
        lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) }
        getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e }
        setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h);
            this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {};
            this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s }
        getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null }
        setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null }
        initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) }
        get(t, e = (() => {})) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => {!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t;
            e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t;
            e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t;
            e(s, i, i && i.body) })) }
        post(t, e = (() => {})) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => {!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) });
        else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t;
            e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t));
        else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t;
            this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t;
                e(s, i, i && i.body) }) } }
        time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t }
        msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"],
            s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl,
            s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="];
            t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } }
        log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) }
        logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) }
        wait(t) { return new Promise(e => setTimeout(e, t)) }
        done(t = {}) { const e = (new Date).getTime(),
            s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }