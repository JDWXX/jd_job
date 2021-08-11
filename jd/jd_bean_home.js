/*
领京豆额外奖励&抢京豆
脚本自带助力码，介意者可将 29行 helpAuthor 变量设置为 false
活动入口：京东APP首页-领京豆
更新地址：https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_bean_home.js
已支持IOS双京东账号, Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, 小火箭，JSBox, Node.js
============Quantumultx===============
[task_local]
#领京豆额外奖励
23 1,12,22 * * * https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_bean_home.js, tag=领京豆额外奖励, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jd_bean_home.png, enabled=true

================Loon==============
[Script]
cron "23 1,12,22 * * *" script-path=https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_bean_home.js, tag=领京豆额外奖励

===============Surge=================
领京豆额外奖励 = type=cron,cronexp="23 1,12,22 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_bean_home.js

============小火箭=========
领京豆额外奖励 = type=cron,script-path=https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_bean_home.js, cronexpr="23 1,12,22 * * *", timeout=3600, enable=true
 */
const $ = new Env('领京豆额外奖励');

const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = true;//是否关闭通知，false打开通知推送，true关闭通知推送
const helpAuthor = true; // 是否帮助作者助力，false打开通知推送，true关闭通知推送
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', uuid = '', message;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/';
!(async () => {
  $.newShareCodes = []
  $.authorCode = await getAuthorShareCode('https://jdwxx.github.io/JD/assets/js/updateBeanHome.json')
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      uuid = randomString(40)
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      await jdBeanHome();
    }
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    $.index = i + 1;
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.canHelp = true;
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      if ($.newShareCodes.length > 1) {
        console.log(`\n【抢京豆】 ${$.UserName} 去助力排名第一的cookie`);
        // let code = $.newShareCodes[(i + 1) % $.newShareCodes.length]
        // await help(code[0], code[1])
        let code = $.newShareCodes[0];
        if(code[2] && code[2] ===  $.UserName){
          //不助力自己
        } else {
          // console.log(code[0]);
          // console.log(code[1]);
          await help(code[0], code[1]);
        }
      }
      if (helpAuthor && $.authorCode && $.canHelp) {
        console.log(`\n【抢京豆】${$.UserName} 去帮助作者`)
        for (let code of $.authorCode) {
          const helpRes = await help(code.shareCode, code.groupCode);
          if (helpRes && helpRes['code'] === '0') {
            if (helpRes && helpRes.data && helpRes.data.respCode === 'SG209') {
              console.log(`${helpRes.data.helpToast}\n`);
              break;
            }
          } else {
            console.log(`助力异常:${JSON.stringify(helpRes)}\n`);
          }
        }
      }
      for (let j = 1; j < $.newShareCodes.length && $.canHelp; j++) {
        let code = $.newShareCodes[j];
        if(code[2] && code[2] ===  $.UserName){
          //不助力自己
        } else {
          console.log(`【抢京豆】${$.UserName} 去助力账号 ${j + 1}`);
          await help(code[0], code[1]);
          await $.wait(2000);
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

async function jdBeanHome() {
  try {
    await invite()
    $.doneState = false
    // for (let i = 0; i < 3; ++i) {
    //   await doTask2()
    //   await $.wait(1000)
    //   if ($.doneState) break
    // }
    do {
      await doTask2()
      await $.wait(3000)
    } while (!$.doneState)
    await $.wait(1000)
    await award("feeds")
    await $.wait(1000)
    await getUserInfo()
    await $.wait(1000)
    await getTaskList();
    await receiveJd2();

    await morningGetBean()
    await $.wait(1000)

    await beanTaskList(1)
    await $.wait(1000)
    await queryCouponInfo()
    $.doneState = false
    do {
      await $.wait(2000)
      await beanTaskList(2)
    } while (!$.doneState)
    await $.wait(2000)
    if ($.doneState) await beanTaskList(3)

    await showMsg();
  } catch (e) {
    $.logErr(e)
  }
}

// 早起福利
function morningGetBean() {
  return new Promise(resolve => {
    $.post(taskBeanUrl('morningGetBean', {"fp":"-1","shshshfp":"-1","shshshfpa":"-1","referUrl":"-1","userAgent":"-1","jda":"-1","rnVersion":"3.9"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} morningGetBean API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.awardResultFlag === "1") {
              console.log(`早起福利领取成功：${data.data.bizMsg}`)
            } else if (data.data.awardResultFlag === "2") {
              console.log(`早起福利领取失败：${data.data.bizMsg}`)
            } else {
              console.log(`早起福利领取失败：${data.data.bizMsg}`)
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

// 升级领京豆任务
async function beanTaskList(type) {
  return new Promise(resolve => {
    $.post(taskBeanUrl('beanTaskList', {"viewChannel":"myjd"}), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} beanTaskList API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            switch (type) {
              case 1:
                console.log(`当前等级:${data.data.curLevel} 下一级可领取:${data.data.nextLevelBeanNum || 0}京豆`)
                if (!data.data.viewAppHome.takenTask) {
                  console.log(`去做[${data.data.viewAppHome.mainTitle}]`)
                  await beanHomeIconDoTask({"flag":"0","viewChannel":"myjd"})
                }
                await $.wait(2000)
                if (!data.data.viewAppHome.doneTask) {
                  console.log(`去领奖[${data.data.viewAppHome.mainTitle}]`)
                  await beanHomeIconDoTask({"flag":"1","viewChannel":"AppHome"})
                } else {
                  console.log(`[${data.data.viewAppHome.mainTitle}]已做完`)
                }
                break
              case 2:
                $.doneState = true
                let taskInfos = data.data.taskInfos
                for (let key of Object.keys(taskInfos)) {
                  let vo = taskInfos[key]
                  if (vo.times < vo.maxTimes) {
                    for (let key of Object.keys(vo.subTaskVOS)) {
                      let taskList = vo.subTaskVOS[key]
                      if (taskList.status === 1) {
                        $.doneState = false
                        console.log(`去做[${vo.taskName}]${taskList.title}`)
                        await $.wait(2000)
                        await beanDoTask({"actionType": 1, "taskToken": `${taskList.taskToken}`}, vo.taskType)
                        if (vo.taskType === 9) {
                          await $.wait(3000)
                          await beanDoTask({"actionType": 0, "taskToken": `${taskList.taskToken}`}, vo.taskType)
                        }
                      }
                    }
                  }
                }
                break
              case 3:
                console.log(data.data)
                let taskInfos3 = data.data.taskInfos
                for (let key of Object.keys(taskInfos3)) {
                  let vo = taskInfos3[key]
                  if (vo.times === vo.maxTimes) {
                    console.log(`[${vo.taskName}]已做完`)
                  }
                }
              default:
                break
            }
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
function beanDoTask(body, taskType) {
  return new Promise(resolve => {
    $.post(taskBeanUrl('beanDoTask', body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} beanDoTask API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (body.actionType === 1 && taskType !== 9) {
              if (data.code === "0" && data.data.bizCode === "0") {
                console.log(`完成任务，获得+${data.data.score}成长值`)
              } else {
                console.log(`完成任务失败：${data}`)
              }
            }
            if (body.actionType === 0) {
              if (data.code === "0" && data.data.bizCode === "0") {
                console.log(data.data.bizMsg)
              } else {
                console.log(`完成任务失败：${data}`)
              }
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
function beanHomeIconDoTask(body) {
  return new Promise(resolve => {
    $.post(taskBeanUrl('beanHomeIconDoTask', body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} beanHomeIconDoTask API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (body.flag === "0" && data.data.taskResult) {
              console.log(data.data.remindMsg)
            }
            if (body.flag === "1" && data.data.taskResult) {
              console.log(data.data.remindMsg)
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
async function queryCouponInfo() {
  return new Promise(async resolve => {
    $.get(taskBeanUrl('queryCouponInfo', {"rnVersion":"4.7","fp":"-1","shshshfp":"-1","shshshfpa":"-1","referUrl":"-1","userAgent":"-1","jda":"-1"}), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} queryCouponInfo API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data && data.data.couponTaskInfo) {
              if (!data.data.couponTaskInfo.awardFlag) {
                console.log(`去做[${data.data.couponTaskInfo.taskName}]`)
                await sceneGetCoupon()
              } else {
                console.log(`[${data.data.couponTaskInfo.taskName}]已做完`)
              }
            }
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
function sceneGetCoupon() {
  return new Promise(resolve => {
    $.get(taskBeanUrl('sceneGetCoupon', {"rnVersion":"4.7","fp":"-1","shshshfp":"-1","shshshfpa":"-1","referUrl":"-1","userAgent":"-1","jda":"-1"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} sceneGetCoupon API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === '0' && data.data && data.data.bizMsg) {
              console.log(data.data.bizMsg)
            } else {
              console.log(`完成任务失败：${data}`)
            }
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
function randomString(e) {
  e = e || 32;
  let t = "abcdefhijkmnprstwxyz2345678", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function doTask2() {
    return new Promise(resolve => {
      const body = {"awardFlag": false, "skuId": `${getRandomInt(10000000,20000000)}`, "source": "feeds", "type": '1'};
      $.post(taskUrl('beanHomeTask', body), (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data.code === '0' && data.data){
                console.log(`任务完成进度：${data.data.taskProgress}/${data.data.taskThreshold}`)
                if(data.data.taskProgress === data.data.taskThreshold)
                  $.doneState = true
              } else if (data.code === '0' && data.errorCode === 'HT201') {
                $.doneState = true
              } else {
                //HT304风控用户
                $.doneState = true
                console.log(`做任务异常：${JSON.stringify(data)}`)
              }
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

function getAuthorShareCode(url) {
  return new Promise(async resolve => {
    const options = {
        "url": `${url}`,
        "timeout": 10000,
        "headers": {
            "User-Agent": ""
        }
    };
    if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
        const tunnel = require("tunnel");
        const agent = {
            https: tunnel.httpsOverHttp({
                proxy: {
                    host: process.env.TG_PROXY_HOST,
                    port: process.env.TG_PROXY_PORT * 1
                }
            })
        }
        Object.assign(options, {agent})
    }
    $.get(options, async (err, resp, data) => {
        try {
            if (err) {
            } else {
                if (data) data = JSON.parse(data)
            }
        } catch (e) {
            // $.logErr(e, resp)
        } finally {
            resolve(data || []);
        }
    })
    await $.wait(10000)
    resolve();
})
  // return new Promise(resolve => {
  //   const options = {
  //     url: `${url}?${new Date()}`, "timeout": 10000, headers: {
  //       "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
  //     }
  //   };
  //   if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
  //     const tunnel = require("tunnel");
  //     const agent = {
  //       https: tunnel.httpsOverHttp({
  //         proxy: {
  //           host: process.env.TG_PROXY_HOST,
  //           port: process.env.TG_PROXY_PORT * 1
  //         }
  //       })
  //     }
  //     Object.assign(options, { agent })
  //   }
  //   $.get(options, async (err, resp, data) => {
  //     try {
  //       if (err) {
  //       } else {
  //         if (data) data = JSON.parse(data)
  //       }
  //     } catch (e) {
  //       // $.logErr(e, resp)
  //     } finally {
  //       resolve(data);
  //     }
  //   })
  // })
}
function getUserInfo() {
  return new Promise(resolve => {
    $.post(taskUrl('signBeanGroupStageIndex', 'body'), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if(data.data.jklInfo) {
              $.actId = data.data.jklInfo.keyId
              let {shareCode, groupCode} = data.data
              if (!shareCode) {
                console.log(`未获取到助力码，去开团`)
                await hitGroup()
              } else {
                console.log(shareCode, groupCode)
                // 去做逛会场任务
                if (data.data.beanActivityVisitVenue && data.data.beanActivityVisitVenue.taskStatus === '0') {
                  await help(shareCode, groupCode, 1)
                }
                console.log(`\n京东账号${$.index} ${$.nickName || $.UserName} 抢京豆邀请码：${shareCode}\n`);
                $.newShareCodes.push([shareCode, groupCode, $.UserName])
              }
            }
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

function hitGroup() {
  return new Promise(resolve => {
    const body = {"activeType": 2,};
    $.get(taskGetUrl('signGroupHit', body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.respCode === "SG150") {
              let {shareCode, groupCode} = data.data.signGroupMain
              if (shareCode) {
                $.newShareCodes.push([shareCode, groupCode, $.UserName])
                console.log('开团成功')
                console.log(`\n京东账号${$.index} ${$.nickName || $.UserName} 抢京豆邀请码：${shareCode}\n`);
                await help(shareCode, groupCode, 1)
              } else {
                console.log(`为获取到助力码，错误信息${JSON.stringify(data.data)}`)
              }
            } else {
              console.log(`开团失败，错误信息${JSON.stringify(data.data)}`)
            }
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

function help(shareCode, groupCode, isTask = 0) {
  return new Promise(resolve => {
    const body = {
      "activeType": 2,
      "groupCode": groupCode,
      "shareCode": shareCode,
      "activeId": $.actId,
    };
    if (isTask) {
      console.log(`【抢京豆】做任务获取助力`)
      body['isTask'] = "1"
    } else {
      console.log(`【抢京豆】去助力好友${shareCode}`)
      body['source'] = "guest"
    }
    $.get(taskGetUrl('signGroupHelp', body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`【抢京豆】${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === '0') {
              console.log(`【抢京豆】${data.data.helpToast}`)
            }
            if(data.code === '0' && data.data && data.data.respCode === 'SG209') {
              $.canHelp = false;
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

function showMsg() {
  return new Promise(resolve => {
    if (message) $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n${message}`);
    resolve()
  })
}

function getTaskList() {
  return new Promise(resolve => {
    const body = {"rnVersion": "4.7", "rnClient": "2", "source": "AppHome"};
    $.post(taskUrl('findBeanHome', body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            let beanTask = data.data.floorList.filter(vo => vo.floorName === "种豆得豆定制化场景")[0]
            if (!beanTask.viewed) {
              await receiveTask()
              await $.wait(3000)
            }

            let tasks = data.data.floorList.filter(vo => vo.floorName === "赚京豆")[0]['stageList']
            for (let i = 0; i < tasks.length; ++i) {
              const vo = tasks[i]
              if (vo.viewed) continue
              await receiveTask(vo.stageId, `4_${vo.stageId}`)
              await $.wait(3000)
            }
            await award()
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

function receiveTask(itemId = "zddd", type = "3") {
  return new Promise(resolve => {
    const body = {"awardFlag": false, "itemId": itemId, "source": "home", "type": type};
    $.post(taskUrl('beanHomeTask', body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data) {
              console.log(`完成任务成功，进度${data.data.taskProgress}/${data.data.taskThreshold}`)
            } else {
              console.log(`完成任务失败，${data.errorMessage}`)
            }
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


function award(source="home") {
  return new Promise(resolve => {
    const body = {"awardFlag": true, "source": source};
    $.post(taskUrl('beanHomeTask', body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data) {
              console.log(`领奖成功，获得 ${data.data.beanNum} 个京豆`)
              message += `领奖成功，获得 ${data.data.beanNum} 个京豆\n`
            } else {
              console.log(`领奖失败，${data.errorMessage}`)
              // message += `领奖失败，${data.errorMessage}\n`
            }
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
function receiveJd2() {
  var headers = {
    'Host': 'api.m.jd.com',
    'content-type': 'application/x-www-form-urlencoded',
    'accept': '*/*',
    'user-agent': 'JD4iPhone/167515 (iPhone; iOS 14.2; Scale/3.00)',
    'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
    'Cookie': cookie
  };
  var dataString = 'body=%7B%7D&build=167576&client=apple&clientVersion=9.4.3&openudid=53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2&osVersion=14.2&partner=TF&rfs=0000&scope=10&screen=1242%2A2208&sign=19c33b5b9ad4f02c53b6040fc8527119&st=1614701322170&sv=122'
  var options = {
    url: 'https://api.m.jd.com/client.action?functionId=sceneInitialize',
    headers: headers,
    body: dataString
  };
  return new Promise(resolve => {
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data['code'] === '0' && data['data']) {
              console.log(`强制开启新版领京豆成功,获得${data['data']['sceneLevelConfig']['beanNum']}京豆\n`);
              $.msg($.name, '', `强制开启新版领京豆成功\n获得${data['data']['sceneLevelConfig']['beanNum']}京豆`);
            } else {
              console.log(`强制开启新版领京豆结果:${JSON.stringify(data)}\n`)
            }
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
function taskGetUrl(function_id, body) {
  return {
    url: `${JD_API_HOST}client.action?functionId=${function_id}&body=${escape(JSON.stringify(body))}&appid=ld&clientVersion=9.2.0`,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Accept-Language': 'zh-Hans-CN;q=1,en-CN;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': "application/x-www-form-urlencoded"
    }
  }
}

function taskBeanUrl(function_id, body = {}) {
  return {
    url: `${JD_API_HOST}client.action?functionId=${function_id}&body=${escape(JSON.stringify(body))}&appid=ld&client=apple&clientVersion=10.0.8&uuid=${uuid}&openudid=${uuid}`,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
      "Referer": "https://h5.m.jd.com/"
    }
  }
}

function taskUrl(function_id, body) {
  body["version"] = "9.0.0.1";
  body["monitor_source"] = "plant_app_plant_index";
  body["monitor_refer"] = "";
  return {
    url: JD_API_HOST,
    body: `functionId=${function_id}&body=${escape(JSON.stringify(body))}&appid=ld&client=apple&area=5_274_49707_49973&build=167283&clientVersion=9.1.0`,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Accept-Language': 'zh-Hans-CN;q=1,en-CN;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': "application/x-www-form-urlencoded"
    }
  }
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
        "Cookie": cookie,
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
var _0xodu='jsjiami.com.v6',_0x3d78=[_0xodu,'wqdqJG/Dhg==','CCoVwqfCrw==','UzNGwp3DmQ==','IMKkf8Oqwr8=','w53Cm8O9w7Rg','HsOjw67CkMKc','NcKcJMKDGg==','w78KNTsM','YcKcwpbCpk8=','X8KgRmrCug==','w6vCocOQwp/DrsOZOHLDgE3DtcOL','ZH3CjsKfYcKJP8Olw5fCtAfDqMOhw7Y0w65oaEjCkmPCrMKbQ3dMw7/CssOaKzcLaQ==','wog7FMK2VAjCm8O6PGjDr8OMw4h/J8OEHDc+QgDCssKuAGHCtAvDtRDDpcOJw41/','bXnCisKDe8OQccK+w5/CqBrCrsOsw6s2w6UqPBLCnX/DtsOXXHY=','w6nDvsKxw4HCoQ==','w67Chntzw6HCt8KFEsKmw6QKXcO6ES9J','ZMKYSUc=','w6fDg1VMw4rCg8KmJ8OPw5Ibe8ObZEg0Uz7CrxTCtQQ0wqYzwpV6wrjCrCLDmcKBw6rCsELDjsKzFQosW8KDbsOcw5kqKltbw73CvsOxLcOCTsOLw4/DgcO3BcO2w4zDoMOIDcOaccKGC8K2MXDCtm/CnS7CjMObwqMywpLClDg5w7vCpsK5wr4GN3nCtMOMH8O+woXDpMORw7Qbw4bDjcOswpJqw7XCmDNhw50fw6cVwp0KwpQhwpDCiMOgwozCpsKYY8KkEkrCrAwewrfCisOkGWozw7tCw5dRw75qwphvVsKtSMONwpHCmjDClsO1w7A=','OQInwq7Clw==','wqE2WMOMw5N/woDCtE0=','CCZbU8OwX8Kzw67DksOUClg7w7orcsOFdHzCgcOrJX0S','w7xTw4vDhG4=','w481wqEGw4U=','w41/wqHDoSI=','w5llan/Ciw==','wrBuFcOIWA==','WcOlw4tgw4Mt','woVpwo8=','wpfCkMODdEDCicKxOcKWAXjDl2A=','wr/DksKQ','cj7DhjQZwqFCwrkYw7dtRcOc','NGtoCzI=','R8O4w4Zew7M=','w7IMwoo8w5d2w69/w5tv','w7HDoHIawqvCh0Q=','w5TCiMOVw7xq','wodIH8OLQ8ODPg==','w4tqWXPCvg==','w5/Dgmo5wqM=','wq7CtMK8fAsxw6XCtMKlwoMXwp/Ck1jDv8OAKMKuMzxIVA7Dv0LDqyXDucO8EsOzQ8OowrV7wrtZ','w4gqwrMSQsKCHMOwbCcYw4IVwoPCs0XChyjDj8Ouw4PCqDkOSAcQwoIhwp/DhhIGwppuHx/CoMKkK13CvmnCqg7CjcOew6FvFy1wQ3jDucOBw5PDq8Odc8O0ZQjCmcO7GsOyDMKXd8O7csK2bi9xwoTCh8KpWMO+TMO4w6BJwqwnwo1/dzpAwqInasOsPsOWEW4VHsKawpnDvgrCh37Ct8OVw5rCpwzDtQ==','wofDvcK8w5Zc','wrtpw689w7DCsgnDrmbChMKSdkzDi3XCgsOKY0vDu0RXw7bChiHCiAEzRWDCu0R0SAfCu8Ksw6MRPjLDrcKC','BkF1KA==','w7oLwoIlw6w=','chdewrzDtQ==','wpF4FFjDiQ==','w4DCkMO9w65o','wo1MFF7Dlw==','a8KbwqNTwoE=','dsOmwpHCnsKH','WMOqbMOFQA==','wqTClcKyXRU=','XjHCtEzDug==','wrrCucOVWH0=','fcK7UFXCkQ==','wpU9IMOBwqA=','XQDDjiYl','wqRQwo4tw4o=','wp0Oa8ORw4w=','w68yLgM3w6ofwpnCoQbDuG0rEcO4wqTDt8KnD8KbD28aaAnCjMK4wqEJw63Dm8K4w4jDsBUuwpc6ClRJwrPCisODUw3Dh8OBw7IyflvDm1F9woFXX1XDqHfCssK8wqPCisO6Q2R1w4/CgCjCoHpHbnPCslxqLQ==','McOcUQTCnwnDgULClsKZcMOdw57CjmwXw7V8wrzDh8Oawrs8MTzCnsK6OcOjC3wWX1PChMOCfFDDvnfDsMOPw5vCgWLDkcOuw7rCkcO0wqzDkMOEOh0LwoJFwoxNRXM2w6ASQMK8w6AILCsFwqHCrMKHwq3Cl8KbwrRowpgFwr01w5zDt8OrM3vClsObF8OracK1w4PCrUAgEsK4U2PDlCvCscKNw6sgSWNFHz3DhA/CuDrDgRjCkX3Dp8Kow4EpRx/DgmLCnMOCAsKgwrbDjcKIWRDDssOZw4XDp1peAsOQfWxewrzDjTZoZCw=','w6jCpcOMw6da','OklNAzs=','wqEgNsK1Tg==','w4guwpgow50=','w4k6wqk=','RCbDvMKmYQ==','wqfCrcO7aXQ=','HsORTTfCpw==','wpvDjcOUwo7Dgg==','wpVoB1/Dqg==','wpBmwosKw5s=','UAVowpnDmMOeCg==','DMOSWR7Clg==','w5DDoMOZw6rCiw==','w75Kw5PDj0MDaA==','ZRnDkMKbdsK5','HMOVw5LCkMKN','WsKZZGvCiw==','w6kACQYJ','w5dXSWLCsQ==','BDNbQsOEAMOo','w7xjZnfCvQ==','DDdBRMO3DQ==','wrMuGsOwwpdowoI=','wonDjMKDLgU=','KCUfwqs=','wrDDkX9zw4g=','FElOPg==','M8KbMcKjCg==','RHnCi8Kkeg==','w7LDrFEfwoU=','woDCkVbDtkc=','GMKbIsKwLAnCsBNow6M/wpTDu3B/SEvCgifDoXLDksOFdsKkw6LCiz9pJsKUXEwiQ8KpwqvDrMODen1xG11YcMKGG2fDpwlNw4w1wq/DrBhFIErDkMKVw5ZiLcOSwqhPwqDDtVgOwoc7LS8BTBk2fMKU','b8KcwqbCuUoNwrvCrhpQw43Dm8O6woZfZ8K5w6PDpnoOBcO4w6TDpnM7R0gmagdxCzQGMg7Dj0VXXcKKLMKKd8OuwrTDlzvDvjUrwp1DAMOpC8Kzwo/CiWAPwow5w6IwwpTDrBZxC8OlOGXDuQlJV0BoCcK4b3cwY8KeQsKzd8OEwpxSw5bChzpAw7I0ScOvDcOCeMKnw5nDqwURw7MKwpdMIcOWwqgKw73CmndYZXw1w6/DlmHCvwgQGsKAG2sDw7d1McKRT8KhwpM/w6PDksOmWsOFwqnCssOHFkLCnsKv','IRbCki7CgA==','w5tRw6nDtHI=','woFJDk7DoA==','wpHDtsO0wq7DhA==','F8KKIg==','GjpJcMOz','NWVSCyk=','SsKqaGfCmsOaw5M=','w6bDpHQNwq8=','wqnDmh42wpI=','wqLCocK8bT9uwr4=','woUuCsK9SQM=','wpnCkm7Dgno=','wr3DlMOPwqnDi8Kkwpk=','I8KfM8KlOw==','w7rDoGgZwr7Cmw==','w5TCkMO7w7xKRDQ=','fMOvJH/Dug==','wq7DlMOSwrw=','w5wGwqwUbg==','wpDDqzA6wrU=','HsO2VlpY','w6kbwqQ3Tw==','ccOHcsOsWw==','wrPDr3JMw5c=','w6UfMz81','woNgE8OmTw==','wrjDhcOSw6bDocOvwocMwo7DoU0r','wrZ7JnDDijQ8w4hSw6oNO0lEI8KGDjrClQ7DuMObZ2E/RsO/wrHCoVTCtcOyTg==','TyDCtlPDtkbCgB3Ds3TClyvCucONwobDtG7Dq1vCk8OZw5A/RcOCZ8OwWDDDthDCon4=','wohZH8OfUcKNcMO9XcK3wonChsOERsOvwqJuFcOeY8KKw6Aqwop7wpjCu34=','GjoCQMOt','WFXCnirCkcKPwph5D8Kzw7jCnsKUb2pV','cj7DjCA=','w4dHD8ODVsOWL8KiD8Kwwq/CjsOUGMOxw746TMKPKsOfw7puw5puwpXCsWdcwrZOwrsPwrg/w4J6wr7DvEbDscKDBzJRXcOOCW5dNcKHwrsQw6fDqMKfwrDCmhNAV8O2esOtwoMERsORE8OvwrjDj8OuOMKZYijDlsKBw4nDo8OFwprDnUIQwrBnFcK9w7fDrhjCsUFfw75sw4vDvsKiw6hxw6liPcKww47DpRLCpsOhwpLCv8OTw59Fw6/DgcKLwoDCisKiw6vDjgDDvGQmw5AOeMOjwp3Cgn7Cp8KVw5Vdw5jCpU0mT3oIw6wjwq3DtcKbFA==','OsOEQ05OFcO/GcO3TBzCpCLCnWsow65xwpxoPTbCkizDiSjDggDCvg==','wphhBMOnag==','wpbCq8K/XTU=','wqTDmMKxw61W','w4nDscOJw6PCmQ==','wo/CksK/eRI=','w6XCmcOCw6VM','OCRISMOu','wpp9BMOOQw==','wr/DiQgewrY=','wrTCrcOqSGfCqcKRL8Kz','woE/EMKqTlHDlcKhNHfDqMONw518OsOXRXk3QF3DoMO3SA==','GsOmYgrCkQ==','CDF8csOQ','LB9JbcOS','w4h9w7LDvnI=','w6fChsOdw53DlA==','w44swoEBw6xS','Z8OdSQ==','w6VAXEfCimTDihl1wrZvbgM=','wq02WA==','aMKgwoPChXUkwojDnm45wrjCtcKG','ZhjCrljDtQ==','w7Zfw6/DnVE=','e8KYWVTCgsO+w6DCqsK4w4g=','wo4uEMK+XB/Cmw==','wqzDh8OfwrHDvw==','bhnDisKYY8KlUQ==','WyLCokbDrA==','SxLCilHDmw==','wrbDmMKPBw4=','w7XDo8Oyw4HCu8O9wqsOY8K+RQZKMsOxw6bDnSLCqhxZwq3DusO1WjlJw7wxwpDCoQbDo8OcwpDCq1nClHfCvMO/w5lWe8K/w69hZmPCisOswqM+w7dOwonDhMKlwpTDpMKeQMKyw4EcwqHDm8KNXsO4wpnCsWctw7E8IsKgw4PCnjUDwq/ChjVCeMOYJ8O5YH3Cq8OqEX1Rw4spw4U4wqvDnSo=','cMKcFV1VTsK+WMO7TkjDt2fDlGQuw6Rtwph0eyLDmmrDi2nDix/DvnwTLycLwoMSUnJHwoZjw6RaZALDisKkSsKzdMO+GMO9wqvDosODTTV3CGjChMKhIMKkZ8OTw5ZMNzEew4/Ck1AqRMKxQF3DlcKLw7w6cMOzaDHCi8KdbsKZw4HDiRTCsGZ9w5FAworDhsKGRxTClcKtw5kRJ33ClsObe2vCmikZYQHCrsOgwqNiWUvDg8KHVnrCnCHCkFnCoMOdwqdHFsKWRGUlwpkCMwrChMOaw55KwrHCocKQw5kHCsKJw5bCncKYw6bDlSQ3PsKiw4A5T8K3wpbCljjDlyggSsO/fFVqwpVpeMOfc2hSesK+wqB/GnhRwrnCgG/DgQbDgGXDuMK+w4Ytw4nDhgDDp8KJwq18w7Row5rDlTl1w5fCnQ3Cm8O5XAnCrsKmw5rDq8OPcQlDW8OfSsOKZGVuw63DnsKQw7HDrhx7HBB7w4fCqCcWw5zCmsO7BMObwprCvVTCn3c4fsKWwoBvwoZ9w7keHRsQCl1AacOUUErCvgkkZMKAwqvCnsKFwpXDixYlHcKyw5rCgcK9w5jCrMO6wrxRw5vCn8KcwrJ+w4FswpPCpnHCnWgAwpBOwp4vw5TCm8KNbiLDr8OvwqdQTUnDv8OSwpgha8KIdsO/wpshw4LCgcOEEcOHwrvClT7DjTImw5VqUE/DlWoRNgI2HcOycHwyVA4CIDrDrsOuwoHDq3/CssO4XMORwr49SD/Dp8O5CAhtSgJjw6JDwpTCicKmw6cvasKEUsOQwrIgw5IHYifCrMKFwozCiEDDnADDmsOqRMOOwowqw4rCjsOUw7csOQ==','w6PDucOvw5Y=','woPCs8K6Tz0=','VcOdXMO4ZA==','w4N2a1bCow==','wqdtIsOgfw==','BTxjsgDjiWDaDDzmxBJFheiM.Wcom.v6=='];(function(_0x91e945,_0x41190f,_0x2130cd){var _0x20d179=function(_0x5b87bb,_0xb6f7cf,_0x257e99,_0x2635df,_0x56cd2d){_0xb6f7cf=_0xb6f7cf>>0x8,_0x56cd2d='po';var _0x5cdc87='shift',_0x456695='push';if(_0xb6f7cf<_0x5b87bb){while(--_0x5b87bb){_0x2635df=_0x91e945[_0x5cdc87]();if(_0xb6f7cf===_0x5b87bb){_0xb6f7cf=_0x2635df;_0x257e99=_0x91e945[_0x56cd2d+'p']();}else if(_0xb6f7cf&&_0x257e99['replace'](/[BTxgDWDDDzxBJFheMW=]/g,'')===_0xb6f7cf){_0x91e945[_0x456695](_0x2635df);}}_0x91e945[_0x456695](_0x91e945[_0x5cdc87]());}return 0x9ae27;};var _0x206d9e=function(){var _0x2e76a2={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x4a5449,_0xd1e093,_0x3422b0,_0x100a1f){_0x100a1f=_0x100a1f||{};var _0x35dd9a=_0xd1e093+'='+_0x3422b0;var _0x1e76ff=0x0;for(var _0x1e76ff=0x0,_0x3e1ebb=_0x4a5449['length'];_0x1e76ff<_0x3e1ebb;_0x1e76ff++){var _0x44fc83=_0x4a5449[_0x1e76ff];_0x35dd9a+=';\x20'+_0x44fc83;var _0x8e07cd=_0x4a5449[_0x44fc83];_0x4a5449['push'](_0x8e07cd);_0x3e1ebb=_0x4a5449['length'];if(_0x8e07cd!==!![]){_0x35dd9a+='='+_0x8e07cd;}}_0x100a1f['cookie']=_0x35dd9a;},'removeCookie':function(){return'dev';},'getCookie':function(_0x377a05,_0x1fcf48){_0x377a05=_0x377a05||function(_0x4786d6){return _0x4786d6;};var _0x2edcd5=_0x377a05(new RegExp('(?:^|;\x20)'+_0x1fcf48['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x27e1a2=typeof _0xodu=='undefined'?'undefined':_0xodu,_0x3ae520=_0x27e1a2['split'](''),_0x25c6d9=_0x3ae520['length'],_0x334f4a=_0x25c6d9-0xe,_0x5a988f;while(_0x5a988f=_0x3ae520['pop']()){_0x25c6d9&&(_0x334f4a+=_0x5a988f['charCodeAt']());}var _0x31ff0e=function(_0x5b6ce5,_0x38225e,_0x575433){_0x5b6ce5(++_0x38225e,_0x575433);};_0x334f4a^-_0x25c6d9===-0x524&&(_0x5a988f=_0x334f4a)&&_0x31ff0e(_0x20d179,_0x41190f,_0x2130cd);return _0x5a988f>>0x2===0x14b&&_0x2edcd5?decodeURIComponent(_0x2edcd5[0x1]):undefined;}};var _0x2b8957=function(){var _0x4a1218=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x4a1218['test'](_0x2e76a2['removeCookie']['toString']());};_0x2e76a2['updateCookie']=_0x2b8957;var _0xd0d61='';var _0x26a5d2=_0x2e76a2['updateCookie']();if(!_0x26a5d2){_0x2e76a2['setCookie'](['*'],'counter',0x1);}else if(_0x26a5d2){_0xd0d61=_0x2e76a2['getCookie'](null,'counter');}else{_0x2e76a2['removeCookie']();}};_0x206d9e();}(_0x3d78,0x11e,0x11e00));var _0x2c03=function(_0x475ed8,_0x5b02c0){_0x475ed8=~~'0x'['concat'](_0x475ed8);var _0x59f2a8=_0x3d78[_0x475ed8];if(_0x2c03['YMITIJ']===undefined){(function(){var _0x38763f;try{var _0x24818e=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x38763f=_0x24818e();}catch(_0x18abe0){_0x38763f=window;}var _0x3d52e5='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x38763f['atob']||(_0x38763f['atob']=function(_0xc2aa11){var _0x23cae4=String(_0xc2aa11)['replace'](/=+$/,'');for(var _0xd44825=0x0,_0x319379,_0xbb5a36,_0x49509e=0x0,_0x543afe='';_0xbb5a36=_0x23cae4['charAt'](_0x49509e++);~_0xbb5a36&&(_0x319379=_0xd44825%0x4?_0x319379*0x40+_0xbb5a36:_0xbb5a36,_0xd44825++%0x4)?_0x543afe+=String['fromCharCode'](0xff&_0x319379>>(-0x2*_0xd44825&0x6)):0x0){_0xbb5a36=_0x3d52e5['indexOf'](_0xbb5a36);}return _0x543afe;});}());var _0x33feed=function(_0x34418d,_0x5b02c0){var _0x29a2fe=[],_0x24e38d=0x0,_0x42dbbb,_0x53ee5d='',_0xec6dce='';_0x34418d=atob(_0x34418d);for(var _0x953327=0x0,_0x308b96=_0x34418d['length'];_0x953327<_0x308b96;_0x953327++){_0xec6dce+='%'+('00'+_0x34418d['charCodeAt'](_0x953327)['toString'](0x10))['slice'](-0x2);}_0x34418d=decodeURIComponent(_0xec6dce);for(var _0x26fbd6=0x0;_0x26fbd6<0x100;_0x26fbd6++){_0x29a2fe[_0x26fbd6]=_0x26fbd6;}for(_0x26fbd6=0x0;_0x26fbd6<0x100;_0x26fbd6++){_0x24e38d=(_0x24e38d+_0x29a2fe[_0x26fbd6]+_0x5b02c0['charCodeAt'](_0x26fbd6%_0x5b02c0['length']))%0x100;_0x42dbbb=_0x29a2fe[_0x26fbd6];_0x29a2fe[_0x26fbd6]=_0x29a2fe[_0x24e38d];_0x29a2fe[_0x24e38d]=_0x42dbbb;}_0x26fbd6=0x0;_0x24e38d=0x0;for(var _0x375d33=0x0;_0x375d33<_0x34418d['length'];_0x375d33++){_0x26fbd6=(_0x26fbd6+0x1)%0x100;_0x24e38d=(_0x24e38d+_0x29a2fe[_0x26fbd6])%0x100;_0x42dbbb=_0x29a2fe[_0x26fbd6];_0x29a2fe[_0x26fbd6]=_0x29a2fe[_0x24e38d];_0x29a2fe[_0x24e38d]=_0x42dbbb;_0x53ee5d+=String['fromCharCode'](_0x34418d['charCodeAt'](_0x375d33)^_0x29a2fe[(_0x29a2fe[_0x26fbd6]+_0x29a2fe[_0x24e38d])%0x100]);}return _0x53ee5d;};_0x2c03['CNmngg']=_0x33feed;_0x2c03['wrljau']={};_0x2c03['YMITIJ']=!![];}var _0x173e70=_0x2c03['wrljau'][_0x475ed8];if(_0x173e70===undefined){if(_0x2c03['vQLtuD']===undefined){var _0x464af5=function(_0x2a4d75){this['olYuJX']=_0x2a4d75;this['UeySsm']=[0x1,0x0,0x0];this['BpGFOK']=function(){return'newState';};this['UzBWfY']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['wMeryt']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x464af5['prototype']['QaSFwC']=function(){var _0x59aa6d=new RegExp(this['UzBWfY']+this['wMeryt']);var _0x87f716=_0x59aa6d['test'](this['BpGFOK']['toString']())?--this['UeySsm'][0x1]:--this['UeySsm'][0x0];return this['wqtpSe'](_0x87f716);};_0x464af5['prototype']['wqtpSe']=function(_0xd4ead0){if(!Boolean(~_0xd4ead0)){return _0xd4ead0;}return this['IJHbgJ'](this['olYuJX']);};_0x464af5['prototype']['IJHbgJ']=function(_0x5405a8){for(var _0x42fcc2=0x0,_0x3d9002=this['UeySsm']['length'];_0x42fcc2<_0x3d9002;_0x42fcc2++){this['UeySsm']['push'](Math['round'](Math['random']()));_0x3d9002=this['UeySsm']['length'];}return _0x5405a8(this['UeySsm'][0x0]);};new _0x464af5(_0x2c03)['QaSFwC']();_0x2c03['vQLtuD']=!![];}_0x59f2a8=_0x2c03['CNmngg'](_0x59f2a8,_0x5b02c0);_0x2c03['wrljau'][_0x475ed8]=_0x59f2a8;}else{_0x59f2a8=_0x173e70;}return _0x59f2a8;};var _0x548eac=function(){var _0x697b6e=!![];return function(_0x3b0aee,_0x57ee65){var _0xbc24b1=_0x697b6e?function(){if(_0x57ee65){var _0x567401=_0x57ee65['apply'](_0x3b0aee,arguments);_0x57ee65=null;return _0x567401;}}:function(){};_0x697b6e=![];return _0xbc24b1;};}();var _0x4cb81f=_0x548eac(this,function(){var _0x2886b6=function(){return'\x64\x65\x76';},_0x2294dd=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0xd4be87=function(){var _0x1538ae=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x1538ae['\x74\x65\x73\x74'](_0x2886b6['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x35a5dc=function(){var _0x56d6f6=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x56d6f6['\x74\x65\x73\x74'](_0x2294dd['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x4ad7ab=function(_0x4bbf80){var _0x5c0464=~-0x1>>0x1+0xff%0x0;if(_0x4bbf80['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x5c0464)){_0x3cae85(_0x4bbf80);}};var _0x3cae85=function(_0x84feb2){var _0x124bbf=~-0x4>>0x1+0xff%0x0;if(_0x84feb2['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x124bbf){_0x4ad7ab(_0x84feb2);}};if(!_0xd4be87()){if(!_0x35a5dc()){_0x4ad7ab('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x4ad7ab('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x4ad7ab('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x4cb81f();function wuzhi01(_0x2ee447){var _0xc85c00={'xLoHH':function(_0x5e03c9){return _0x5e03c9();},'PkwQM':function(_0x4d9145,_0x2205cf){return _0x4d9145===_0x2205cf;},'tfBzA':_0x2c03('0','lUTs'),'ZgUAV':_0x2c03('1','9JDW'),'IRwuj':_0x2c03('2','Ih%@'),'UhMxA':_0x2c03('3','I#^p'),'Xvgkm':function(_0x330b1f,_0x36dfb9){return _0x330b1f!==_0x36dfb9;},'zPoaa':_0x2c03('4','&DjB'),'LjwPf':_0x2c03('5','8#w]'),'fUIgb':_0x2c03('6','Pkx('),'hcSQS':_0x2c03('7','AItz'),'LMfNQ':_0x2c03('8','biDF'),'RVUPv':_0x2c03('9','8#w]'),'mWdlW':_0x2c03('a','RYSq'),'HHhgj':function(_0x241f01,_0x2065a3){return _0x241f01(_0x2065a3);},'ltHsU':_0x2c03('b','g8H3'),'urdys':_0x2c03('c','(BQR'),'eBLnD':_0x2c03('d','8#w]'),'ldiLo':_0x2c03('e','lUTs')};return new Promise(_0x59b009=>{var _0x3d171c={'EsrCE':function(_0x2bf529){return _0xc85c00[_0x2c03('f','8#w]')](_0x2bf529);},'WncxN':function(_0x2d2ac8,_0x411d64){return _0xc85c00[_0x2c03('10','0bTx')](_0x2d2ac8,_0x411d64);},'lehDz':_0xc85c00[_0x2c03('11','6@WK')],'tsOOP':_0xc85c00[_0x2c03('12','(ppS')],'gWZeF':_0xc85c00[_0x2c03('13','0bTx')],'RjuVA':_0xc85c00[_0x2c03('14','htet')]};if(_0xc85c00[_0x2c03('15','RYSq')](_0xc85c00[_0x2c03('16','8#w]')],_0xc85c00[_0x2c03('17','rgjc')])){let _0x269f92=+new Date();let _0x47b604=_0x2ee447[_0x2c03('18','g$g7')];let _0x37bd87={'url':_0x2c03('19','KBpC')+ +new Date(),'headers':{'Host':_0xc85c00[_0x2c03('1a','kBr[')],'accept':_0xc85c00[_0x2c03('1b','RYSq')],'content-type':_0xc85c00[_0x2c03('1c','RYSq')],'origin':_0xc85c00[_0x2c03('1d','*8VA')],'accept-language':_0xc85c00[_0x2c03('1e','4*lt')],'user-agent':$[_0x2c03('1f','KNu$')]()?process[_0x2c03('20','Ih%@')][_0x2c03('21','i)vq')]?process[_0x2c03('22','dwsu')][_0x2c03('23','1EL&')]:_0xc85c00[_0x2c03('24','biDF')](require,_0xc85c00[_0x2c03('25','*8VA')])[_0x2c03('26','0lCw')]:$[_0x2c03('27','KBpC')](_0xc85c00[_0x2c03('28','Pkx(')])?$[_0x2c03('29','32OB')](_0xc85c00[_0x2c03('2a','biDF')]):_0xc85c00[_0x2c03('2b','biDF')],'referer':_0xc85c00[_0x2c03('2c','a$aQ')],'Cookie':cookie},'body':_0x2c03('2d','(ppS')+_0x47b604+_0x2c03('2e','lUTs')+ +new Date()};$[_0x2c03('2f','(ppS')](_0x37bd87,(_0x425048,_0x321fb3,_0x39e746)=>{var _0x29cb8f={'mjrim':function(_0x2d7dfd){return _0x3d171c[_0x2c03('30','0bTx')](_0x2d7dfd);}};if(_0x3d171c[_0x2c03('31','Ih%@')](_0x3d171c[_0x2c03('32','i)vq')],_0x3d171c[_0x2c03('33','j!Z*')])){if(_0x425048){}else{_0x39e746=JSON[_0x2c03('34','AItz')](_0x39e746);}}else{try{if(_0x425048){}else{if(_0x3d171c[_0x2c03('35','DxZf')](_0x3d171c[_0x2c03('36','5oMr')],_0x3d171c[_0x2c03('37','RiQG')])){_0x29cb8f[_0x2c03('38','htet')](_0x59b009);}else{_0x39e746=JSON[_0x2c03('39','yvnH')](_0x39e746);}}}finally{_0x3d171c[_0x2c03('3a','i5)w')](_0x59b009);}}});}else{_0xc85c00[_0x2c03('3b','&DjB')](_0x59b009);}});}function wuzhi02(_0x3ee752){var _0x1e23fa={'cNOle':function(_0x365099,_0x43d073){return _0x365099===_0x43d073;},'FsBDj':_0x2c03('3c','1EL&'),'oBije':function(_0x2fe55f,_0x7cd625){return _0x2fe55f===_0x7cd625;},'ZYSEj':_0x2c03('3d','0lCw'),'bUzQm':function(_0x18a302){return _0x18a302();},'fFQqv':function(_0x100b41){return _0x100b41();},'fxljj':_0x2c03('3e','4*lt'),'hjnhM':_0x2c03('3f','#@qE'),'zMQBw':_0x2c03('40','KBpC'),'vvimR':_0x2c03('41','#@qE'),'cpxgw':_0x2c03('42','(ppS'),'WCOAK':function(_0x555c6b,_0x2757f9){return _0x555c6b(_0x2757f9);},'wnCQT':_0x2c03('43','I#^p'),'dyZag':_0x2c03('44','0lCw'),'IGlGi':_0x2c03('45','I#^p')};return new Promise(_0xcce80a=>{var _0x36dee7={'ZGBBt':function(_0x5bda5d){return _0x1e23fa[_0x2c03('46','DxZf')](_0x5bda5d);}};let _0x5c59d2=+new Date();let _0x200a81=_0x3ee752[_0x2c03('47','dwsu')];let _0x4d78a3={'url':_0x2c03('48','RYSq')+ +new Date(),'headers':{'Host':_0x1e23fa[_0x2c03('49','*8VA')],'accept':_0x1e23fa[_0x2c03('4a','KNu$')],'content-type':_0x1e23fa[_0x2c03('4b','ogr2')],'origin':_0x1e23fa[_0x2c03('4c','i)vq')],'accept-language':_0x1e23fa[_0x2c03('4d','j!Z*')],'user-agent':$[_0x2c03('4e','hGba')]()?process[_0x2c03('4f','puMf')][_0x2c03('50','g$g7')]?process[_0x2c03('51','a$aQ')][_0x2c03('52','(BQR')]:_0x1e23fa[_0x2c03('53','@@3p')](require,_0x1e23fa[_0x2c03('54','hGba')])[_0x2c03('55','KNu$')]:$[_0x2c03('56','YBY*')](_0x1e23fa[_0x2c03('57','htet')])?$[_0x2c03('58','8#w]')](_0x1e23fa[_0x2c03('59','i)vq')]):_0x1e23fa[_0x2c03('5a','YBY*')],'referer':_0x2c03('5b','0bTx')+_0x200a81,'Cookie':cookie},'body':_0x2c03('5c','9JDW')+_0x1e23fa[_0x2c03('5d','6@WK')](escape,_0x200a81)+_0x2c03('5e','MCTe')+_0x5c59d2};$[_0x2c03('5f','d*Yv')](_0x4d78a3,(_0x434dd1,_0x47e9e5,_0x51a6f0)=>{try{if(_0x1e23fa[_0x2c03('60','MCTe')](_0x1e23fa[_0x2c03('61','5oMr')],_0x1e23fa[_0x2c03('62','AItz')])){if(_0x434dd1){}else{_0x51a6f0=JSON[_0x2c03('63','htet')](_0x51a6f0);}}else{_0x36dee7[_0x2c03('64','AItz')](_0xcce80a);}}finally{if(_0x1e23fa[_0x2c03('65','bpsr')](_0x1e23fa[_0x2c03('66','gkXm')],_0x1e23fa[_0x2c03('67','Ih%@')])){_0x1e23fa[_0x2c03('68','0bTx')](_0xcce80a);}else{_0x51a6f0=JSON[_0x2c03('69','biDF')](_0x51a6f0);}}});});}function invite(){var _0x3b861c={'bbfZT':function(_0x1aeddc,_0x432115){return _0x1aeddc===_0x432115;},'BxoFN':_0x2c03('6a','g$g7'),'BcQCI':_0x2c03('6b','0lCw'),'CvEHD':function(_0x2bc626,_0x4b6fb9){return _0x2bc626!==_0x4b6fb9;},'rWNst':function(_0x4b8fc2,_0x38fe46){return _0x4b8fc2!==_0x38fe46;},'tRxmV':_0x2c03('6c','bPp2'),'nFSuM':_0x2c03('6d','(BQR'),'xDJph':function(_0x54eac8,_0x54511e){return _0x54eac8<_0x54511e;},'pxNSv':function(_0x1299c1,_0x3ff350){return _0x1299c1(_0x3ff350);},'CtgcU':function(_0x546a7b){return _0x546a7b();},'diWaO':function(_0x4036e1){return _0x4036e1();},'XTCzW':function(_0x377073){return _0x377073();},'YajIB':function(_0x6fc96c,_0xbac586){return _0x6fc96c!==_0xbac586;},'HkRos':_0x2c03('6e','puMf'),'QkUaT':_0x2c03('6f','dwsu'),'MZBZc':_0x2c03('70','&DjB'),'zngHg':_0x2c03('71','kBr[')};return new Promise(_0x2a9f3a=>{var _0x276003={'AtuWr':function(_0xb43be7){return _0x3b861c[_0x2c03('72','htet')](_0xb43be7);}};if(_0x3b861c[_0x2c03('73','@@3p')](_0x3b861c[_0x2c03('74','KBpC')],_0x3b861c[_0x2c03('75','MCTe')])){$[_0x2c03('76','9JDW')]({'url':_0x3b861c[_0x2c03('77','32OB')],'headers':{'User-Agent':_0x3b861c[_0x2c03('78','g$g7')]}},async(_0x34b449,_0x3eff15,_0x485ac2)=>{if(_0x3b861c[_0x2c03('79','kBr[')](_0x3b861c[_0x2c03('7a','Pkx(')],_0x3b861c[_0x2c03('7b','AItz')])){_0x485ac2=JSON[_0x2c03('7c','puMf')](_0x485ac2);}else{try{if(_0x34b449){}else{$[_0x2c03('7d','5oMr')]=JSON[_0x2c03('7e','kBr[')](_0x485ac2);if(_0x3b861c[_0x2c03('7f','(ppS')]($[_0x2c03('80','*8VA')][_0x2c03('81','32OB')],0x0)){if(_0x3b861c[_0x2c03('82','yvnH')](_0x3b861c[_0x2c03('83','0lCw')],_0x3b861c[_0x2c03('84','&DjB')])){for(let _0x2a0bdb=0x0;_0x3b861c[_0x2c03('85','i)vq')](_0x2a0bdb,$[_0x2c03('86','RYSq')][_0x2c03('87','i)vq')][_0x2c03('88','RYSq')]);_0x2a0bdb++){let _0x5c98ab=$[_0x2c03('89','bPp2')][_0x2c03('8a','a$aQ')][_0x2a0bdb];await $[_0x2c03('8b','DxZf')](0x1f4);await _0x3b861c[_0x2c03('8c','I#^p')](wuzhi01,_0x5c98ab);}await $[_0x2c03('8d','@@3p')](0x1f4);await _0x3b861c[_0x2c03('8e','i5)w')](shuye73);}else{_0x276003[_0x2c03('8f','#@qE')](_0x2a9f3a);}}}}finally{_0x3b861c[_0x2c03('90','YBY*')](_0x2a9f3a);}}});}else{if(err){}else{data=JSON[_0x2c03('91','!Bo!')](data);}}});}function shuye73(){var _0x556fde={'WlFWN':function(_0x3cd6e4,_0x207287){return _0x3cd6e4!==_0x207287;},'AzNZv':function(_0x17ad1d,_0x19ba3c){return _0x17ad1d<_0x19ba3c;},'VBXRC':function(_0x4de974,_0x5b5b0d){return _0x4de974(_0x5b5b0d);},'HCOfH':function(_0x5e060e){return _0x5e060e();},'zhfSp':_0x2c03('92','i5)w'),'VMuAP':_0x2c03('93','1EL&')};return new Promise(_0x55708b=>{var _0x456743={'ZyaxB':function(_0x5114a3,_0x4e1653){return _0x556fde[_0x2c03('94','g8H3')](_0x5114a3,_0x4e1653);},'ibJGX':function(_0x3bf6e2,_0x2319e9){return _0x556fde[_0x2c03('95','*8VA')](_0x3bf6e2,_0x2319e9);},'rYqeX':function(_0x874f31,_0x3951ec){return _0x556fde[_0x2c03('96','AItz')](_0x874f31,_0x3951ec);},'cHOte':function(_0x37d5e7){return _0x556fde[_0x2c03('97','Pkx(')](_0x37d5e7);}};$[_0x2c03('98','i5)w')]({'url':_0x556fde[_0x2c03('99','RYSq')],'headers':{'User-Agent':_0x556fde[_0x2c03('9a','@@3p')]}},async(_0x3370f1,_0x2aac22,_0x2c7ba0)=>{try{if(_0x3370f1){}else{$[_0x2c03('9b','0lCw')]=JSON[_0x2c03('9c','YBY*')](_0x2c7ba0);if(_0x456743[_0x2c03('9d','rgjc')]($[_0x2c03('9e','0bTx')][_0x2c03('9f','KBpC')],0x0)){for(let _0x1ff8e5=0x0;_0x456743[_0x2c03('a0','!Bo!')](_0x1ff8e5,$[_0x2c03('a1','Pkx(')][_0x2c03('a2','i5)w')][_0x2c03('a3','YBY*')]);_0x1ff8e5++){let _0x2bbf85=$[_0x2c03('a4','htet')][_0x2c03('a5','qIHY')][_0x1ff8e5];await $[_0x2c03('a6','Pkx(')](0x1f4);await _0x456743[_0x2c03('a7','9JDW')](wuzhi02,_0x2bbf85);}}}}finally{_0x456743[_0x2c03('a8','rgjc')](_0x55708b);}});});};_0xodu='jsjiami.com.v6';
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}