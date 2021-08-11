/*
京喜财富岛
活动地址: 京喜APP-我的-京喜财富岛
活动时间：长期
更新时间：2021-07-13 12:00
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#京喜财富岛
10 6-23/1 * * * https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_cfd_new.js, tag=京喜财富岛, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "10 6-23/1 * * *" script-path=https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_cfd_new.js,tag=京喜财富岛
===================================Surge================================
京喜财富岛 = type=cron,cronexp="10 6-23/1 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_cfd_new.js
====================================小火箭=============================
京喜财富岛 = type=cron,script-path=https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_cfd_new.js, cronexpr="10 6-23/1 * * *", timeout=3600, enable=true
 */
const $ = new Env("京喜财富岛");
const JD_API_HOST = "https://m.jingxi.com/";
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
$.showLog = $.getdata("cfd_showLog") ? $.getdata("cfd_showLog") === "true" : false;
$.notifyTime = $.getdata("cfd_notifyTime");
$.result = [];
$.shareCodes = [];
let cookiesArr = [], cookie = '', token;

const randomCount = $.isNode() ? 3 : 0;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0);
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
$.appId = 10028;
!(async () => {
  await requireConfig();
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  $.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
  await requestAlgo();
  await $.wait(1000)
  let res = await getAuthorShareCode('https://ghproxy.com/https://raw.githubusercontent.com/jiulan/platypus/main/json/cfd.json')
  $.strGroupIds = [...(res  || [])]
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i + 1;
      $.nickName = '';
      $.isLogin = true;
      $.nickName = '';
      await TotalBean();
      console.log(`\n开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      $.allTask = []
      $.info = {}
      await shareCodesFormat()
      await cfd();
      await $.wait(2000);
    }
  }
  for (let j = 0; j < cookiesArr.length; j++) {
    cookie = cookiesArr[j];
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
    $.canHelp = true
    if ($.strGroupIds && $.strGroupIds.length) {
      console.log(`\n助力作者\n`);
      for (let id of $.strGroupIds) {
        console.log(`账号${$.UserName} 去助力 ${id}`)
        await helpByStage(id)
        if (!$.canHelp) break
        await $.wait(3000)
      }
    }
    if (!$.canHelp) continue
    if ($.shareCodes && $.shareCodes.length) {
      console.log(`\n自己账号内部循环互助\n`);
      for (let id of $.shareCodes) {
        console.log(`账号${$.UserName} 去助力 ${id}`)
        await helpByStage(id)
        if (!$.canHelp) break
        await $.wait(3000)
      }
    }
  }
  await showMsg();
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());

async function cfd() {
  try {
    let beginInfo = await getUserInfo();
    if (beginInfo.Fund.ddwFundTargTm === 0) {
      console.log(`还未开通活动，尝试初始化`)
      await noviceTask()
      await $.wait(2000)
      beginInfo = await getUserInfo(false);
      if (beginInfo.Fund.ddwFundTargTm !== 0) {
        console.log(`初始化成功\n`)
      } else {
        console.log(`初始化失败\n`)
        return
      }
    }

    //每日签到
    await $.wait(2000)
    await getTakeAggrPage('sign')

    //助力奖励
    await $.wait(2000)
    await getTakeAggrPage('helpdraw')

    //卖贝壳
    await $.wait(2000)
    await querystorageroom()

    //每日任务领奖
    await $.wait(2000)
    await getActTask()

    //升级建筑
    await $.wait(2000)
    for(let key of Object.keys($.info.buildInfo.buildList)) {
      let vo = $.info.buildInfo.buildList[key]
      let body = `strBuildIndex=${vo.strBuildIndex}`
      await getBuildInfo(body, vo.strBuildIndex)
      await $.wait(1000)
    }

    //倒垃圾
    await $.wait(2000)
    await queryRubbishInfo()

    //雇导游
    await $.wait(2000);
    await employTourGuideInfo();

    console.log(`\n做任务`)
    //日常任务
    await $.wait(2000);
    await getTaskList(0);
    await $.wait(2000);
    await browserTask(0);

    //成就任务
    await $.wait(2000);
    await getTaskList(1);
    await $.wait(2000);
    await browserTask(1);

    await $.wait(2000);
    const endInfo = await getUserInfo(false);
    $.result.push(
        `【京东账号${$.index}】${$.nickName || $.UserName}`,
        `【🥇金币】${endInfo.ddwCoinBalance}`,
        `【💵财富值】${endInfo.ddwRichBalance}\n`,
    );

    // $.result.push(
    //     `【京东账号${$.index}】${$.nickName || $.UserName}`,
    //     `【💵财富值】任务前: ${beginInfo.ddwRichBalance}\n【💵财富值】任务后: ${endInfo.ddwRichBalance}`,
    //     `【💵财富值】净增值: ${endInfo.ddwRichBalance - beginInfo.ddwRichBalance}\n`
    // );
  } catch (e) {
    $.logErr(e)
  }
}

// 卖贝壳
async function querystorageroom() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`story/querystorageroom`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} querystorageroom API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          console.log(`卖贝壳`)
          let bags = []
          for (let key of Object.keys(data.Data.Office)) {
            let vo = data.Data.Office[key]
            bags.push(vo.dwType)
            bags.push(vo.dwCount)
          }
          if (bags.length !== 0) {
            let strTypeCnt = ''
            for (let j = 0; j < bags.length; j++) {
              if (j % 2 === 0) {
                strTypeCnt += `${bags[j]}:`
              } else {
                strTypeCnt += `${bags[j]}|`
              }
            }
            await $.wait(1000)
            await sellgoods(`strTypeCnt=${strTypeCnt}&dwSceneId=1`)
          } else {
            console.log(`背包是空的，快去捡贝壳吧\n`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
function sellgoods(body) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/sellgoods`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} sellgoods API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0) {
            console.log(`贝壳出售成功：获得${data.Data.ddwCoin}金币 ${data.Data.ddwMoney}财富\n`)
          } else {
            console.log(`贝壳出售失败：${data.sErrMsg}\n`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

// 每日签到
async function getTakeAggrPage(type) {
  return new Promise(async (resolve) => {
    switch (type) {
      case 'sign':
        $.get(taskUrl(`story/GetTakeAggrPage`), async (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} GetTakeAggrPage API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
              console.log(`每日签到`)
              for (let key of Object.keys(data.Data.Sign.SignList)) {
                let vo = data.Data.Sign.SignList[key]
                if (vo.dwDayId === data.Data.Sign.dwTodayId) {
                  if (vo.dwStatus !== 1) {
                    const body = `ddwCoin=${vo.ddwCoin}&ddwMoney=${vo.ddwMoney}&dwPrizeType=${vo.dwPrizeType}&strPrizePool=${vo.strPrizePool}&dwPrizeLv=${vo.dwBingoLevel}`
                    await rewardSign(body)
                    await $.wait(1000)
                  } else {
                    console.log(`今日已签到\n`)
                    break
                  }
                }
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        })
        break
      case 'helpdraw':
        $.get(taskUrl(`story/GetTakeAggrPage`), async (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} GetTakeAggrPage API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
              console.log(`领助力奖励`)
              let helpNum = []
              for (let key of Object.keys(data.Data.Employee.EmployeeList)) {
                let vo = data.Data.Employee.EmployeeList[key]
                if (vo.dwStatus !== 1) {
                  helpNum.push(vo.dwId)
                }
              }
              if (helpNum.length !== 0) {
                for (let j = 0; j < helpNum.length; j++) {
                  await helpdraw(helpNum[j])
                  await $.wait(2000)
                }
              } else {
                console.log(`暂无可领助力奖励`)
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        })
        break
      default:
        break
    }
  })
}
function rewardSign(body) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/RewardSign`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} RewardSign API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0 || data.sErrMsg === "success") {
            if (data.Data.ddwCoin) {
              console.log(`签到成功：获得${data.Data.ddwCoin}金币\n`)
            } else if (data.Data.ddwMoney) {
              console.log(`签到成功：获得${data.Data.ddwMoney}财富\n`)
            } else if (data.Data.strPrizeName) {
              console.log(`签到成功：获得${data.Data.strPrizeName}\n`)
            } else {
              console.log(`签到成功：很遗憾未中奖~\n`)
            }
          } else {
            console.log(`签到失败：${data.sErrMsg}\n`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
function helpdraw(dwUserId) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/helpdraw`, `dwUserId=${dwUserId}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} helpdraw API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0 || data.sErrMsg === "success") {
            console.log(`领取助力奖励成功：获得${data.Data.ddwCoin}金币`)
          } else {
            console.log(`领取助力奖励失败：${data.sErrMsg}`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

// 倒垃圾
async function queryRubbishInfo() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`story/QueryRubbishInfo`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} QueryRubbishInfo API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          console.log(`倒垃圾`)
          if (data.Data.StoryInfo.StoryList.length === 0) {
            console.log(`暂时没有垃圾\n`)
          } else {
            console.log(`获取到垃圾信息，开始倒垃圾`)
            await $.wait(2000)
            let rubbishOperRes = await rubbishOper('1')
            for(let key of Object.keys(rubbishOperRes.Data.ThrowRubbish.Game.RubbishList)) {
              let vo = rubbishOperRes.Data.ThrowRubbish.Game.RubbishList[key]
              await $.wait(2000)
              var rubbishOperTwoRes = await rubbishOper('2', `dwRubbishId=${vo.dwId}`)
            }
            if (rubbishOperTwoRes.iRet === 0) {
              let AllRubbish = rubbishOperTwoRes.Data.RubbishGame.AllRubbish
              console.log(`倒垃圾成功：获得${AllRubbish.ddwCoin}金币 ${AllRubbish.ddwMoney}财富\n`)
            } else {
              console.log(`倒垃圾失败：${rubbishOperTwoRes.sErrMsg}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
function rubbishOper(dwType, body = '') {
  return new Promise((resolve) => {
    switch(dwType) {
      case '1':
        $.get(taskUrl(`story/RubbishOper`, `dwType=1&dwRewardType=0`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} RubbishOper API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve(data);
          }
        })
        break
      case '2':
        $.get(taskUrl(`story/RubbishOper`, `dwType=2&dwRewardType=0&${body}`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} RubbishOper API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve(data);
          }
        })
        break
      default:
        break
    }
  })
}

// 每日任务领奖
async function getActTask() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`story/GetActTask`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} GetActTask API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          for (let key of Object.keys(data.Data.TaskList)) {
            let vo = data.Data.TaskList[key]
            if (vo.dwCompleteNum >= vo.dwTargetNum && vo.dwAwardStatus !== 1) {
              await awardActTask(vo)
              await $.wait(2000)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
function awardActTask(taskInfo) {
  const { ddwTaskId, strTaskName} = taskInfo
  return new Promise((resolve) => {
    $.get(taskListUrl(`Award`, `taskId=${ddwTaskId}`, 'jxbfddch'), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} awardActTask API请求失败，请检查网路重试`)
        } else {
          const {msg, ret, data: {prizeInfo = ''} = {}} = JSON.parse(data);
          let str = '';
          if (msg.indexOf('活动太火爆了') !== -1) {
            str = '任务为成就任务或者未到任务时间';
          } else {
            str = msg + prizeInfo ? ` 获得金币 ¥ ${JSON.parse(prizeInfo).ddwCoin}` : '';
          }
          console.log(`【领每日任务奖励】${strTaskName} ${str}\n${$.showLog ? data : ''}`);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

// 导游
async function employTourGuideInfo() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/EmployTourGuideInfo`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} EmployTourGuideInfo API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          console.log(`雇导游`)
          for(let key of Object.keys(data.TourGuideList)) {
            let vo = data.TourGuideList[key]
            let buildNmae;
            switch(vo.strBuildIndex) {
              case 'food':
                buildNmae = '京喜美食城'
                break
              case 'sea':
                buildNmae = '京喜旅馆'
                break
              case 'shop':
                buildNmae = '京喜商店'
                break
              case 'fun':
                buildNmae = '京喜游乐场'
              default:
                break
            }
            if(vo.ddwRemainTm === 0 && vo.strBuildIndex !== 'food') {
              let dwIsFree;
              if(vo.dwFreeMin !== 0) {
                dwIsFree = 1
              } else {
                dwIsFree = 0
              }
              const body = `strBuildIndex=${vo.strBuildIndex}&dwIsFree=${dwIsFree}&ddwConsumeCoin=${vo.ddwCostCoin}`
              await employTourGuide(body, buildNmae)
              await $.wait(1000)
            } else if (vo.strBuildIndex !== 'food') {
              console.log(`【${buildNmae}】无可雇佣导游`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
function employTourGuide(body, buildNmae) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/EmployTourGuide`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} EmployTourGuide API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0) {
            console.log(`【${buildNmae}】雇佣导游成功`)
          } else {
            console.log(`【${buildNmae}】导游下班了~`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

// 升级建筑
async function getBuildInfo(body, strBuildIndex, type = true) {
  let twobody = body
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/GetBuildInfo`, body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} GetBuildInfo API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (type) {
            let buildNmae;
            switch(strBuildIndex) {
              case 'food':
                buildNmae = '京喜美食城'
                break
              case 'sea':
                buildNmae = '京喜旅馆'
                break
              case 'shop':
                buildNmae = '京喜商店'
                break
              case 'fun':
                buildNmae = '京喜游乐场'
              default:
                break
            }
            // console.log(data)
            if (data.dwBuildLvl === 0) {
              console.log(`创建建筑`)
              console.log(`【${buildNmae}】当前建筑还未创建，开始创建`)
              await createbuilding(`strBuildIndex=${data.strBuildIndex}`, buildNmae)
              await $.wait(2000)
              data = await getBuildInfo(twobody, strBuildIndex, false)
              await $.wait(2000)
            }
            console.log(`收金币`)
            const body = `strBuildIndex=${data.strBuildIndex}&dwType=1`
            let collectCoinRes = await collectCoin(body)
            console.log(`【${buildNmae}】收集${collectCoinRes.ddwCoin}金币`)
            await $.wait(2000)
            await getUserInfo(false)
            console.log(`升级建筑`)
            console.log(`【${buildNmae}】升级需要${data.ddwNextLvlCostCoin}金币，当前拥有${$.info.ddwCoinBalance}`)
            if(data.dwCanLvlUp === 1 && $.info.ddwCoinBalance >= data.ddwNextLvlCostCoin) {
              console.log(`【${buildNmae}】满足升级条件，开始升级`)
              const body = `ddwCostCoin=${data.ddwNextLvlCostCoin}&strBuildIndex=${data.strBuildIndex}`
              let buildLvlUpRes = await buildLvlUp(body)
              if (buildLvlUpRes.iRet === 0) {
                console.log(`【${buildNmae}】升级成功\n`)
              } else {
                console.log(`${buildLvlUpRes}\n`)
                await $.wait(2000)
              }
            } else {
              console.log(`【${buildNmae}】不满足升级条件，跳过升级\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function collectCoin(body) {
  return new Promise((resolve) => {
    $.get(taskUrl(`user/CollectCoin`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} CollectCoin API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function buildLvlUp(body) {
  return new Promise((resolve) => {
    $.get(taskUrl(`user/BuildLvlUp`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} BuildLvlUp API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function createbuilding(body, buildNmae) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/createbuilding`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} createbuilding API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0) console.log(`【${buildNmae}】创建成功`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

// 助力
function helpByStage(shareCodes) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/helpbystage`, `strShareId=${shareCodes}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} helpbystage API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0 || data.sErrMsg === 'success') {
            console.log(`助力成功，帮助好友获得${data.Data.GuestPrizeInfo.strPrizeName}`)
          } else if (data.iRet === 2232 || data.sErrMsg === '今日助力次数达到上限，明天再来帮忙吧~') {
            console.log(data.sErrMsg)
            $.canHelp = false
          } else if (data.iRet === 9999 || data.sErrMsg === '您还没有登录，请先登录哦~') {
            console.log(data.sErrMsg)
            $.canHelp = false
          } else if (data.iRet === 2229 || data.sErrMsg === '助力失败啦~') {
            console.log(data.sErrMsg)
            // $.canHelp = false
          } else {
            console.log(data.sErrMsg)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function getAuthorShareCode(url) {
  return new Promise(async resolve => {
    const options = {
      "url": `${url}`,
      "timeout": 10000
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
      Object.assign(options, { agent })
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
}

// 获取用户信息
function getUserInfo(showInvite = true) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/QueryUserInfo`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} QueryUserInfo API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          const {
            iret,
            buildInfo = {},
            ddwRichBalance,
            ddwCoinBalance,
            JxUserWelfare,
            sErrMsg,
            strMyShareId,
            strNickName,
            dwLandLvl,
            Fund = {}
          } = data;
          const dwIsJxNewUser = JxUserWelfare["dwIsJxNewUser"]
          if (showInvite) {
            console.log(`\n获取用户信息：${sErrMsg}\n${$.showLog ? data : ""}`);
            console.log(`\n当前等级:${dwLandLvl},金币:${ddwCoinBalance},财富值:${ddwRichBalance}\n`)
          }
          if (showInvite && strMyShareId) {
            console.log(`财富岛好友互助码每次运行都变化,旧的可继续使用`);
            $.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${strMyShareId}\n\n`);
            $.shareCodes.push(strMyShareId)
          }
          $.info = {
            ...$.info,
            buildInfo,
            ddwRichBalance,
            ddwCoinBalance,
            dwIsJxNewUser,
            strMyShareId,
            strNickName,
            dwLandLvl,
            Fund
          };
          resolve({
            buildInfo,
            ddwRichBalance,
            ddwCoinBalance,
            dwIsJxNewUser,
            strMyShareId,
            strNickName,
            Fund
          });
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//任务
function getTaskList(taskType) {
  return new Promise(async (resolve) => {
    switch (taskType){
      case 0: //日常任务
        $.get(taskListUrl("GetUserTaskStatusList"), async (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} GetUserTaskStatusList 日常任务 API请求失败，请检查网路重试`)
            } else {
              const { ret, data: { userTaskStatusList = [] } = {}, msg } = JSON.parse(data);
              $.allTask = userTaskStatusList.filter((x) => x.awardStatus !== 1 && x.taskCaller === 1);
              if($.allTask.length === 0) {
                console.log(`【📆日常任务】已做完`)
              } else {
                console.log(`获取【📆日常任务】列表 ${msg}，总共${$.allTask.length}个任务！\n${$.showLog ? data : ""}`);
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break;
      case 1: //成就任务
        $.get(taskListUrl("GetUserTaskStatusList"), async (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} GetUserTaskStatusList 成就任务 API请求失败，请检查网路重试`)
            } else {
              const { ret, data: { userTaskStatusList = [] } = {}, msg } = JSON.parse(data);
              $.allTask = userTaskStatusList.filter((x) => (x.completedTimes >= x.targetTimes) && x.awardStatus !== 1 && x.taskCaller === 2);
              if($.allTask.length === 0) {
                console.log(`【🎖成就任务】没有可领奖的任务\n`)
              } else {
                console.log(`获取【🎖成就任务】列表 ${msg}，总共${$.allTask.length}个任务！\n${$.showLog ? data : ""}`);
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break;
      default:
        break;
    }
  });
}

//浏览任务 + 做任务 + 领取奖励
function browserTask(taskType) {
  return new Promise(async (resolve) => {
    switch (taskType) {
      case 0://日常任务
        for (let i = 0; i < $.allTask.length; i++) {
          const start = $.allTask[i].completedTimes, end = $.allTask[i].targetTimes
          const taskinfo = $.allTask[i];
          console.log(`开始第${i + 1}个【📆日常任务】${taskinfo.taskName}\n`);
          for (let i = start; i < end; i++) {
            //做任务
            console.log(`【📆日常任务】${taskinfo.taskName} 进度：${i + 1}/${end}`)
            await doTask(taskinfo);
            await $.wait(2000);
          }
          //领取奖励
          await awardTask(0, taskinfo);
        }
        break;
      case 1://成就任务
        for (let i = 0; i < $.allTask.length; i++) {
          const taskinfo = $.allTask[i];
          console.log(`开始第${i + 1}个【🎖成就任务】${taskinfo.taskName}\n`);
          if(taskinfo.completedTimes < taskinfo.targetTimes){
            console.log(`【领成就奖励】${taskinfo.taskName} 该成就任务未达到门槛\n`);
          } else {
            //领奖励
            await awardTask(1, taskinfo);
            await $.wait(1000);
          }
        }
        break;
      default:
        break;
    }
    resolve();
  });
}

//做任务
function doTask(taskinfo) {
  return new Promise(async (resolve) => {
    const { taskId, completedTimes, targetTimes, taskName } = taskinfo;
    if (parseInt(completedTimes) >= parseInt(targetTimes)) {
      resolve(false);
      console.log(`【做日常任务】${taskName} 任务已做完，去领奖\n`);
      return;
    }
    $.get(taskListUrl(`DoTask`, `taskId=${taskId}`), (err, resp, data) => {
      try {
        //console.log(`taskId:${taskId},data:${data}`);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} DoTask API请求失败，请检查网路重试`)
        } else {
          const { msg, ret } = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//领取奖励
function awardTask(taskType, taskinfo) {
  return new Promise((resolve) => {
    const {taskId, taskName} = taskinfo;
    switch (taskType) {
      case 0://日常任务
        $.get(taskListUrl(`Award`, `taskId=${taskId}`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} Award API请求失败，请检查网路重试`)
            } else {
              const {msg, ret, data: {prizeInfo = ''} = {}} = JSON.parse(data);
              let str = '';
              if (msg.indexOf('活动太火爆了') !== -1) {
                str = '任务为成就任务或者未到任务时间';
              } else {
                str = msg + prizeInfo ? ` 获得金币 ¥ ${JSON.parse(prizeInfo).ddwCoin}` : '';
              }
              console.log(`【领日常奖励】${taskName} ${str}\n${$.showLog ? data : ''}`);
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break
      case 1://成就奖励
        $.get(taskListUrl(`Award`, `taskId=${taskId}`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} AchieveAward API请求失败，请检查网路重试`)
            } else {
              const {msg, ret, data: {prizeInfo = ''} = {}} = JSON.parse(data);
              if(msg.indexOf('活动太火爆了') !== -1) {
                console.log(`活动太火爆了`)
              } else {
                console.log(`【领成就奖励】${taskName} 获得财富值 ¥ ${JSON.parse(prizeInfo).ddwMoney}\n${$.showLog ? data : ''}`);
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break
      default:
        break
    }
  });
}

// 新手任务
async function noviceTask(){
  let body = ``
  await init(`user/guideuser`, body)
  body = `strMark=guider_step&strValue=welcom&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_over_flag&strValue=999&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_step&strValue=999&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_step&strValue=999&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_over_flag&strValue=999&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_step&strValue=gift_redpack&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_step&strValue=none&dwType=2`
  await init(`user/SetMark`, body)
}
async function init(function_path, body) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(function_path, body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} init API请求失败，请检查网路重试`)
        } else {
          if (function_path == "user/SetMark") opId = 23
          if (function_path == "user/guideuser") opId = 27
          data = JSON.parse(data);
          contents = `1771|${opId}|${data.iRet}|0|${data.sErrMsg || 0}`
          await biz(contents)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
function biz(contents){
  return new Promise(async (resolve) => {
    let option = {
      url:`https://m.jingxi.com/webmonitor/collect/biz.json?contents=${contents}&t=${Math.random()}&sceneval=2`,
      headers: {
        Cookie: cookie,
        Accept: "*/*",
        Connection: "keep-alive",
        Referer: "https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
        "Accept-Encoding": "gzip, deflate, br",
        Host: 'm.jingxi.com',
        "User-Agent": `jdpingou;iPhone;3.15.2;14.2.1;ea00763447803eb0f32045dcba629c248ea53bb3;network/wifi;model/iPhone13,2;appBuild/100365;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
      }
    }
    $.get(option, async (err, resp, _data) => {
      try {
        // console.log(_data)
      }
      catch (e) {
        $.logErr(e, resp);
      }
      finally {
        resolve();
      }
    })
  })
}

function taskUrl(function_path, body = '') {
  let url = `${JD_API_HOST}jxbfd/${function_path}?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=${Date.now()}&ptag=138631.26.55&${body}&_stk=_cfd_t%2CbizCode%2CddwTaskId%2CdwEnv%2Cptag%2Csource%2CstrShareId%2CstrZone&_ste=1`;
  url += `&h5st=${decrypt(Date.now(), '', '', url)}&_=${Date.now() + 2}&sceneval=2&g_login_type=1&g_ty=ls`;
  return {
    url,
    headers: {
      Cookie: cookie,
      Accept: "*/*",
      Connection: "keep-alive",
      Referer:"https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
      "Accept-Encoding": "gzip, deflate, br",
      Host: "m.jingxi.com",
      "User-Agent":`jdpingou;iPhone;3.15.2;14.2.1;ea00763447803eb0f32045dcba629c248ea53bb3;network/wifi;model/iPhone13,2;appBuild/100365;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
      "Accept-Language": "zh-cn",
    },
    timeout: 10000
  };
}

function taskListUrl(function_path, body = '', bizCode = 'jxbfd') {
  let url = `${JD_API_HOST}newtasksys/newtasksys_front/${function_path}?strZone=jxbfd&bizCode=${bizCode}&source=jxbfd&dwEnv=7&_cfd_t=${Date.now()}&ptag=138631.26.55&${body}&_stk=_cfd_t%2CbizCode%2CconfigExtra%2CdwEnv%2Cptag%2Csource%2CstrZone%2CtaskId&_ste=1`;
  url += `&h5st=${decrypt(Date.now(), '', '', url)}&_=${Date.now() + 2}&sceneval=2&g_login_type=1&g_ty=ls`;
  return {
    url,
    headers: {
      Cookie: cookie,
      Accept: "*/*",
      Connection: "keep-alive",
      Referer:"https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
      "Accept-Encoding": "gzip, deflate, br",
      Host: "m.jingxi.com",
      "User-Agent":`jdpingou;iPhone;3.15.2;14.2.1;ea00763447803eb0f32045dcba629c248ea53bb3;network/wifi;model/iPhone13,2;appBuild/100365;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
      "Accept-Language": "zh-cn",
    },
    timeout: 10000
  };
}

function showMsg() {
  return new Promise(async (resolve) => {
    if ($.result.length) {
      if ($.notifyTime) {
        const notifyTimes = $.notifyTime.split(",").map((x) => x.split(":"));
        const now = $.time("HH:mm").split(":");
        console.log(`\n${JSON.stringify(notifyTimes)}`);
        console.log(`\n${JSON.stringify(now)}`);
        if ( notifyTimes.some((x) => x[0] === now[0] && (!x[1] || x[1] === now[1])) ) {
          $.msg($.name, "", `${$.result.join("\n")}`);
        }
      } else {
        $.msg($.name, "", `${$.result.join("\n")}`);
      }

      if ($.isNode() && process.env.CFD_NOTIFY_CONTROL)
        await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName}`, `${$.result.join("\n")}`);
    }
    resolve();
  });
}

function readShareCode() {
  console.log(`开始`)
  return new Promise(async resolve => {
    $.get({
      url: `http://share.turinglabs.net/api/v3/jxbfd/query/${randomCount}/`,
      'timeout': 10000
    }, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            console.log(`随机取${randomCount}个码放到您固定的互助码后面(不影响已有固定互助)`)
            data = JSON.parse(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
    await $.wait(10000);
    resolve()
  })
}
//格式化助力码
function shareCodesFormat() {
  return new Promise(async resolve => {
    // console.log(`第${$.index}个京东账号的助力码:::${$.shareCodesArr[$.index - 1]}`)
    $.newShareCodes = [];
    if ($.shareCodesArr[$.index - 1]) {
      $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
    } else {
      console.log(`由于您第${$.index}个京东账号未提供shareCode,将采纳本脚本自带的助力码\n`)
      // const tempIndex = $.index > inviteCodes.length ? (inviteCodes.length - 1) : ($.index - 1);
      // $.newShareCodes = [...$.strMyShareIds];
    }
    // const readShareCodeRes = await readShareCode();
    // if (readShareCodeRes && readShareCodeRes.code === 200) {
    //   $.newShareCodes = [...new Set([...$.newShareCodes, ...(readShareCodeRes.data || [])])];
    // }
    console.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify($.newShareCodes)}`)
    resolve();
  })
}
function requireConfig() {
  return new Promise(resolve => {
    console.log(`开始获取${$.name}配置文件\n`);
    let shareCodes = [];
    if ($.isNode() && process.env.JDCFD_SHARECODES) {
      if (process.env.JDCFD_SHARECODES.indexOf('\n') > -1) {
        shareCodes = process.env.JDCFD_SHARECODES.split('\n');
      } else {
        shareCodes = process.env.JDCFD_SHARECODES.split('&');
      }
    }
    $.shareCodesArr = [];
    if ($.isNode()) {
      Object.keys(shareCodes).forEach((item) => {
        if (shareCodes[item]) {
          $.shareCodesArr.push(shareCodes[item])
        }
      })
    } else {
      if ($.getdata('jd_jxCFD')) $.shareCodesArr = $.getdata('jd_jxCFD').split('\n').filter(item => !!item);
      console.log(`\nBoxJs设置的京喜财富岛邀请码:${$.getdata('jd_jxCFD')}\n`);
    }
    console.log(`您提供了${$.shareCodesArr.length}个账号的${$.name}助力码\n`);
    resolve()
  })
}

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
      headers: {
        Host: "me-api.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        Cookie: cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-cn",
        "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === "1001") {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
              $.nickName = data.data.userInfo.baseInfo.nickname;
            }
          } else {
            console.log('京东服务器返回空数据');
          }
        }
      } catch (e) {
        $.logErr(e)
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
/*
修改时间戳转换函数，京喜工厂原版修改
 */
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

async function requestAlgo() {
  $.fingerprint = await generateFp();
  const options = {
    "url": `https://cactus.jd.com/request_algo?g_ty=ajax`,
    "headers": {
      'Authority': 'cactus.jd.com',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
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
  new Promise(async resolve => {
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`request_algo 签名参数API请求失败，请检查网路重试`)
        } else {
          if (data) {
            // console.log(data);
            data = JSON.parse(data);
            if (data['status'] === 200) {
              $.token = data.data.result.tk;
              let enCryptMethodJDString = data.data.result.algo;
              if (enCryptMethodJDString) $.enCryptMethodJD = new Function(`return ${enCryptMethodJDString}`)();
              console.log(`获取签名参数成功！`)
              console.log(`fp: ${$.fingerprint}`)
              console.log(`token: ${$.token}`)
              console.log(`enCryptMethodJD: ${enCryptMethodJDString}`)
            } else {
              console.log(`fp: ${$.fingerprint}`)
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
function decrypt(time, stk, type, url) {
  stk = stk || (url ? getUrlData(url, '_stk') : '')
  if (stk) {
    const timestamp = new Date(time).Format("yyyyMMddhhmmssSSS");
    let hash1 = '';
    if ($.fingerprint && $.token && $.enCryptMethodJD) {
      hash1 = $.enCryptMethodJD($.token, $.fingerprint.toString(), timestamp.toString(), $.appId.toString(), $.CryptoJS).toString($.CryptoJS.enc.Hex);
    } else {
      const random = '5gkjB6SpmC9s';
      $.token = `tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc`;
      $.fingerprint = 5287160221454703;
      const str = `${$.token}${$.fingerprint}${timestamp}${$.appId}${random}`;
      hash1 = $.CryptoJS.SHA512(str, $.token).toString($.CryptoJS.enc.Hex);
    }
    let st = '';
    stk.split(',').map((item, index) => {
      st += `${item}:${getUrlData(url, item)}${index === stk.split(',').length -1 ? '' : '&'}`;
    })
    const hash2 = $.CryptoJS.HmacSHA256(st, hash1.toString()).toString($.CryptoJS.enc.Hex);
    // console.log(`\nst:${st}`)
    // console.log(`h5st:${["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat($.appId.toString()), "".concat(token), "".concat(hash2)].join(";")}\n`)
    return encodeURIComponent(["".concat(timestamp.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.token), "".concat(hash2)].join(";"))
  } else {
    return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d'
  }
}

/**
 * 获取url参数值
 * @param url
 * @param name
 * @returns {string}
 */
function getUrlData(url, name) {
  if (typeof URL !== "undefined") {
    let urls = new URL(url);
    let data = urls.searchParams.get(name);
    return data ? data : '';
  } else {
    const query = url.match(/\?.*/)[0].substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] === name) {
        // return pair[1];
        return vars[i].substr(vars[i].indexOf('=') + 1);
      }
    }
    return ''
  }
}
/**
 * 模拟生成 fingerprint
 * @returns {string}
 */
function generateFp() {
  let e = "0123456789";
  let a = 13;
  let i = '';
  for (; a--; )
    i += e[Math.random() * e.length | 0];
  return (i + Date.now()).slice(0,16)
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
