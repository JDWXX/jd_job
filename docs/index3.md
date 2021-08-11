# 个人学习目的，请下载后24小时内删除下载的代码

# 付费代挂
[http://47.97.116.61:6789](http://47.97.116.61:6789)

不要直接Fork!!!
请建立完仓库在Fork！！！！
以上所有脚本均来自其他大佬开发，此类脚本为整合脚本
本人非大佬，定时更新各类整合脚本，失效脚本会及时删除
拥有此库等于拥有所有！！！


## 维护收集不易，大部分内容皆来自群友们和管理们的贡献，为了可持续发展，给我们一点支撑

![image](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4a406456-63ac-413b-b1f6-27a6eed5945e/470b3993-dd1c-4050-a9bf-8b311264780a.png)


## 超低价阿里云服务器
#### [https://www.aliyun.com/activity/ambassador/share-gift/goods?taskCode=xfyh2107&recordId=764770&userCode=31csnowy](https://www.aliyun.com/activity/ambassador/share-gift/goods?taskCode=xfyh2107&recordId=764770&userCode=31csnowy)

## 腾讯云服务器
#### [http://url.cn/5Z0ZWGI](http://url.cn/5Z0ZWGI)
#### [备用购买地址](https://cloud.tencent.com/act/pro/starlake?fromSource=gwzcw.3788702.3788702.3788702&utm_medium=cpc&utm_id=gwzcw.3788702.3788702.3788702&cps_key=13c854d3ec192824956cc079f600753f)

## 扫描教程
#### 请看上面【青龙扫描.md】文件

## 搭建教程 方式一
#### [https://blog.csdn.net/tangcv/article/details/118691149](https://blog.csdn.net/tangcv/article/details/118691149)

## 搭建教程 方式二
#### [https://blog.csdn.net/weixin_42565036/category_11188503.html](https://blog.csdn.net/weixin_42565036/category_11188503.html)

## 交流群
### 1群 681030097
![image](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4a406456-63ac-413b-b1f6-27a6eed5945e/baf96b0a-3764-4d81-b47f-bdcc3c553c96.png)
### 2群 681030097
![image](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4a406456-63ac-413b-b1f6-27a6eed5945e/98838c66-1a67-4c86-b52b-702742d7412a.png)

# 拉取仓库
##### 名称

```
【JDWXX】
```
##### 命令

```
ql repo https://ghproxy.com/https://github.com/JDWXX/JD.git "jd_|jx_|getJDCookie" "activity|backUp" "^jd[^_]|USER"

```
##### 备用命令
```
ql repo https://hub.fastgit.org/JDWXX/JD.git "jd_|jx_|getJDCookie" "activity|backUp" "^jd[^_]|USER"

```
##### 定时规则

```
0 10 0 * * *
```

### 任务执行缺少文件 
##### sendNotify.js，手动从本库里下至 /QL/scripts 目录下，其他文件同理


## 安装依赖
#### 【图形验证】

```
docker exec -it QL bash -c "cd scripts && npm i -S png-js"
```

#### 【canvas】

```
docker exec -it QL bash -c "apk add --no-cache build-base g++ cairo-dev pango-dev giflib-dev && cd scripts && npm install canvas --build-from-source"
```

## python 脚本

## 入会 【jd_rh.py】
##### 退会,会有黑号风险

## 刷微信、支付宝步数 【jd_bs.py】
##### 下载小米运动软件，注册账号密码，绑定微信支付宝，通过宝塔在 jd_bs.py 文件里添加账号密码即可


# 助力配置
## 青龙面板-配置文件里添加 

## 签到领现金配置
### 自行添加变量设置邀请码 格式如下 默认10个

```
export cashinviteCode=""
export cashinviteCode2=""
export cashinviteCode3=""
```

## jd_cashHelp.py【签到领现金】

```
jd_cashHelp.py 文件里设置  cash_zlzh = ['', '', '', '', '', '', '', ''] 对应pin
```

## 柠檬推一推
#### 五元无门槛红包大概需要50 ck
##### 每天会变，软件手动分享至QQ复制

```
export tytpacketId=""
```

## 柠檬是兄弟就砍我

##### packetId 你要参加砍价的邀请码
##### actId 你要参加砍价的商品ID
```
export actId=""
export packetId="" 
```

## 店铺签到
#### 店铺签到 各类店铺签到，有新的店铺直接添加token即可
#### 活动地址:
#### 活动时间：长期
#### 更新时间：2021-07-13 12:00
#### 脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
#### 搬运cui521大佬脚本

### 方式一

```
export MyShopToken1='30DE3F2E8B4278A120007C8CD0D4F835'
export MyShopToken2='3C0B9CE1F01623C77ADE9F90AFA0FD5F'
export MyShopToken3='4A02128626C3691B6A98341C3F8CD27E'
export MyShopToken4='81F530105DFF92EF55FF36F1E2097066'
export MyShopToken5='9B45653CFEFE49045C2748E8AA9E37B4'
export MyShopToken6='B8157420EE77DDA819C2B3BAF991797B'
export MyShopToken7='BB80E573A5329D6AD511900955F6E12C'
export MyShopToken8='DCD2E2F3BECE2344E21ABB33D071BFAE'
export MyShopToken9='F9C7E6B7E724B7DB0CE232508C97490D'

export SHOP_TOKENS="${MyShopToken1}&${MyShopToken2}&${MyShopToken3}&${MyShopToken4}&${MyShopToken5}&${MyShopToken6}&${MyShopToken7}&${MyShopToken8}&${MyShopToken9}"

```

### 方式二

```
export SHOP_TOKENS="30DE3F2E8B4278A120007C8CD0D4F835&3C0B9CE1F01623C77ADE9F90AFA0FD5F&4A02128626C3691B6A98341C3F8CD27E&81F530105DFF92EF55FF36F1E2097066&9B45653CFEFE49045C2748E8AA9E37B4&B8157420EE77DDA819C2B3BAF991797B&BB80E573A5329D6AD511900955F6E12C&DCD2E2F3BECE2344E21ABB33D071BFAE&F9C7E6B7E724B7DB0CE232508C97490D"
```

## 愤怒的锦鲤

### 填写 pt_pin
```
export kois="%E5%94%90%E6%9C%95%E9%94%8B&t142171&jd_kXOjqjxoEElT&jd_uhuavdFubDeJ"
```

## 发财翻翻乐 每天0.3现金

## 柠檬发财大赢家
##### 先执行 柠檬发财大赢家获取邀请码，查看日志，从日志里获取 redEnvelopeId 和 inviter，添加至配置文件

```
export redEnvelopeId="a45166e259694002a32cb978fc188fae64711626364924409"
export inviter="gL9wXhsUV10DVlTsq_ND9A"
```

## 送豆得豆
### 脚本jd_senbeans.js
### 脚本会根据你总CK数量计算出共能助力几个账号，然后默认给前几名的账号助力【所以自己的号要放前面】
#### 例如有75个CK，通过计算大致可以助力7个号，那只有几个账号能拿到助力奖励


## 东东农场、种豆得豆、东东萌宠、东东工厂、京喜工厂
#### 先运行 【获取互助码】 拿到助力码
#### 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间用&符号或者换行隔开,下面给一个示例
#### 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2

### 配置文件修改 env_name 里修改
```
## 需组合的环境变量列表，env_name需要和var_name一一对应，如何有新活动按照格式添加(不懂勿动)
## FRUITSHARECODES 东东农场
## PLANT_BEAN_SHARECODES 种豆得豆
## PETSHARECODES 东东萌宠
## DDFACTORY_SHARECODES 东东工厂
## DREAM_FACTORY_SHARE_CODES  京喜工厂
env_name=(
  JD_COOKIE
  FRUITSHARECODES="c375f5806c5a406ca238dc4e5410f009&f010bfbb75fa403b8facd45d91954b6f&c466e4f13cbe467c850276d7c356c1ea&fa4753f4ceba4cce82029815d6638ea0&1034bf367b624feb8099cb9f3c035314&31a3b3b208a04c0bbc90e11425a53042&51a8f379bbc04876a2f78d21ba4186bf&f498e643abd8477da3b8f6ebf14f2def&af063f65b27646c9add726727328a064&1ddd03eafcdf4270999db01003db7dc6"
  PETSHARECODES="MTEyNjE4NjQ2MDAwMDAwMDQ5OTIyNjY3&MTE1NDY3NTMwMDAwMDAwNDk5MjI3MDE=&MTEyNjE4NjQ2MDAwMDAwMDUwODI1MjYx&MTAxODc2NTEzOTAwMDAwMDAyMDYyODYyNw==&MTE1NDY3NTIwMDAwMDAwNTA4NDAyNjE=&MTE1NDQ5MzYwMDAwMDAwMzgxNjkyMzM="
  PLANT_BEAN_SHARECODES="mluaqp25jqdzoaiyb4eb3viclm&7oivz2mjbmnx56hxie4mesldxft422tev5dtgqa&hnyn3j5q6xitdiv5r54bx3zqha&mh5uulbrvnknkjxynyusmgjglp4tcmixyorzsgq&ebxm5lgxoknqdtiju2haj6ghvquprhmxicgrvka&bw2eckbfemfiba42bf52kidnvz6rr4je7cmp7ha&cd2lbjgriwpzsetjdo4i5t6s3jguvzlapilphxy&3nds3dh2ebzau6whfis7kg2h3q3h7wlwy7o5jii&olmijoxgmjutzsqjfcxsqazott36mnhuakgkc3q&wo7xc2znigdez23tkuin32egdsekabwcubzhgra&mlrdw3aw26j3xi3b3xgblzetwxwx4zbl73etuay"
  DREAM_FACTORY_SHARE_CODES="1_I8MUjrb-aQDsqz2LaMAA==&K8tGGvR1bmSom0nejC2UmA==&6e9cQId9a_zbWhpMb9XSYg==&UOLfmpfmlAwVNt7E-y1a_A=="
  DDFACTORY_SHARECODES="T012a1nTlrK8LPBsCjVWnYaS5kRrbA&T0205KkcG3ZmrxWNaEWB4atuCjVWnYaS5kRrbA&T010-vx3Qh8e9ACjVWnYaS5kRrbA&T0205KkcBUZcpBKDVl-m4KJwCjVWnYaS5kRrbA&T0205KkcNGhZvz2pVF2P6rNRCjVWnYaS5kRrbA&T018a1nTlJaULfRqIBn1lgCjVWnYaS5kRrbA&T022uvlyQRke9VTWPR_ylPYKcgCjVWnYaS5kRrbA&T018v_hzRx4b91TVJxmb1ACjVWnYaS5kRrbA&T0225KkcRk9M81GGdE6lxvMDcgCjVWnYaS5kRrbA&T019-ak7E315simNaGmVyKMCjVWnYaS5kRrbA&T0225KkcRRhI9VCCIhugkfIOJQCjVWnYaS5kRrbA"
  JDZZ_SHARECODES
  JDJOY_SHARECODES
  JXNC_SHARECODES
  BOOKSHOP_SHARECODES
  JD_CASH_SHARECODES
  JDSGMH_SHARECODES
  JDCFD_SHARECODES
  JDHEALTH_SHARECODES
)
```

## 柠檬开卡3
#### 你的邀请码
```
export opencard3="1eac1fedb6ed4badbe577e9c513162a8" 
```

## 东东超市兑换奖品
#### 兑换多少数量的京豆（20或者1000），0表示不兑换，默认不兑换京豆，如需兑换把0改成20或者1000，或者'商品名称'(商品名称放到单引号内)即可
```
export MARKET_COIN_TO_BEANS="20" 
```

## 宠汪汪积分兑换奖品 【如果失败，请重新安装上面的依赖】
#### 是否兑换京豆，默认0不兑换京豆，其中20为兑换20京豆,500为兑换500京豆，0为不兑换京豆.数量有限先到先得
```
export JD_JOY_REWARD_NAME="20" 
```

## 宠汪汪赛跑
#### 赛跑先给lxk0301作者两个固定的pin进行助力,然后从账号内部与剩下的固定位置合并后随机抽取进行助力
#### 如需自己账号内部互助,设置环境变量 JOY_RUN_HELP_MYSELF 为true,则开启账号内部互助

```
export JOY_RUN_HELP_MYSELF=true
```

## 财富岛提现
#### 获取Token方式：
#### 打开【❗️京喜农场❗️】，手动任意完成<工厂任务>、<签到任务>、<金牌厂长任务>一项，提示获取cookie成功即可，然后退出跑任务脚本
### TOKEN的形式：{"farm_jstoken":"749a90f871adsfads8ffda7bf3b1576760","timestamp":"1610165423873","phoneid":"42c7e3dadfadsfdsaac-18f0e4f4a0cf"}
### MyJxncToken 对应ck编号
### token 是json  多个拼接在字符中所以需要进行转译

```
MyJxncToken1={\"farm_jstoken\":\"1126cc70d0a640ee55d12d35a2c1a949\",\"timestamp\":\"1620465575092\",\"phoneid\":\"f13e8ecbcdc218d5\"}
MyJxncToken2={\"farm_jstoken\":\"2d65af69867386b0fed959d25aadbcd4\",\"timestamp\":\"1620489451718\",\"phoneid\":\"144925245d4b8372\"}
MyJxncToken3=
export JXNCTOKENS="${MyJxncToken1}&${MyJxncToken2}&${MyJxncToken3}"
```

## 京喜工厂开团
#### 一个账号能参团一次，一个账号一天能开三次团，请根据自己的情况设置需要开团的CK，一般至少5个CK能成团
#### 脚本每执行一次，会领取上一次成团的奖励和新开一次团，每天执行4次能开完3次团和领取3次团的奖励
#### OPEN_DREAMFACTORY_TUAN 脚本默认第一个CK开团，例：若OPEN_DREAMFACTORY_TUAN="2,3"  则第2，第3个CK开团，其他账号参加第2，第3个CK开的团

```
export OPEN_DREAMFACTORY_TUAN="1,2,3,4,5,6,7,8,9,10"
```

## 燃动夏季
### 入会
#### OPEN_DREAMFACTORY_TUAN 是否入会  true 入会，false 不入会 【默认 false】
```
export summer_movement_joinjoinjoinhui=false
```
### 百元守卫战SH
#### summer_movement_ShHelpFlag = 0不开启也不助力 1开启并助力 2开启但不助力 【默认 1】
```
export summer_movement_ShHelpFlag=1
```
### 邀请助力
#### summer_movement_HelpHelpHelpFlag = false 是否只执行邀请助力  true 是，false 不是 【默认 false】
```
export summer_movement_HelpHelpHelpFlag=false
```
### 是否助力作者SH
#### ShHelpAuthorFlag = true 是否助力作者SH  true 助力，false 不助力 【默认 true】
```
export ShHelpAuthorFlag=true
```
### 燃动夏季下注
#### 是否下满注 false否，true是，（满注20次，前提：需要已经开过会员卡，若未开同会员，则只能下3注） 【默认 false】
```
export MAX_BET=false
```
### 燃动夏季-正道的光
#### 原作者脚本启用了[正道的光]模式\n执行 做任务、做店铺任务 会有几率不执行\n本脚本不让任务一次全部做完\n您可以多跑几次\n北京时间18时后是正常模式 【默认 false 关闭】
```
export zddg=false
```

## 真·抢京豆
#### 高速并发抢京豆，专治偷助力
#### 设置助人,用户名 或 pin 用&分割, angryBeanMode可选值priority和speed，默认speed模式
```
export angryBeanPins="账号昵称1&账号昵称1"
export angryBeanMode="speed"
```
## 特务Zx佳沛
#### 要跑2次，第一次做任务和脚本内互助，第二次才够币抽奖

### 赚30元
#### 活动入口：我的-赚30 每月可以提现100元，但需要邀请一个新人下首单。可以用已注册手机号重新注册为新人账号，切换ip可以提高成功率
#### 默认所有账号
```
export earn30Pins="账号昵称1&账号昵称1"
```

## 全民抢京豆（7.22-7.31）
#### 满160豆需要20人助力，每个用户目前只能助力2次不同的用户
#### 设置被助力的账号可填用户名 或 pin的值不要;修改文件 jd_qjd.py
```
qjd_zlzh = ['程序工厂', '程序工厂2号']
```
## 全民抢京豆（7.22-7.31）配置文件里写助力方法
#### 在服务器,青龙 【/QL/config】或【/ql/config】 目录下创建 pin.text 文件，填写格式
```
程序工厂&程序工厂2号
```

## jd_lxj.py【领现金】 配置文件里写助力方法
#### 在服务器,青龙 【/QL/config】或【/ql/config】 目录下创建 pin.text 文件，填写格式，和抢京豆公用一个配置
```
程序工厂&程序工厂2号
```