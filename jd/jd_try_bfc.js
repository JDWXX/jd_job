/*
入口 京东 京东试用

cron 0 40 3,15,15 * * * jd_try_bfc.js

 */
const $ = new Env('京东试用_并发版')
const URL = 'https://api.m.jd.com/client.action'
let trialActivityIdList = []
let trialActivityTitleList = []
let notifyMsg = ''
let size = 1;
$.isPush = true;
$.isLimit = false;
$.isForbidden = false;
$.wrong = false;
$.totalPages = 0;
$.giveupNum = 0;
$.successNum = 0;
$.completeNum = 0;
$.getNum = 0;
$.try = true;
$.sentNum = 0;
$.cookiesArr = []
$.innerKeyWords =
	[
		"幼儿园", "教程", "英语", "辅导", "培训",
		"孩子", "小学", "成人用品", "套套", "情趣",
		"自慰", "阳具", "飞机杯", "男士用品", "女士用品",
		"内衣", "高潮", "避孕", "乳腺", "肛塞", "肛门",
		"宝宝", "玩具", "芭比", "娃娃", "男用",
		"女用", "神油", "足力健", "老年", "老人",
		"宠物", "饲料", "丝袜", "黑丝", "磨脚",
		"脚皮", "除臭", "性感", "内裤", "跳蛋",
		"安全套", "龟头", "阴道", "阴部", "流量卡", "手机卡"
	]
//下面很重要，遇到问题请把下面注释看一遍再来问
let args_xh = {
	/*
     * 商品原价，低于这个价格都不会试用，意思是
     * A商品原价49元，试用价1元，如果下面设置为50，那么A商品不会被加入到待提交的试用组
     * B商品原价99元，试用价0元，如果下面设置为50，那么B商品将会被加入到待提交的试用组
     * C商品原价99元，试用价1元，如果下面设置为50，那么C商品将会被加入到待提交的试用组
     * 默认为0
     * */
	jdPrice: process.env.JD_TRY_PRICE * 1 || 50,
	/*
     * 获取试用商品类型，默认为1，原来不是数组形式，我以为就只有几个tab，结果后面还有我服了
     * 1 - 精选
     * 2 - 闪电试
     * 3 - 家用电器(可能会有变化)
     * 4 - 手机数码(可能会有变化)
     * 5 - 电脑办公(可能会有变化)
     * ...
     * 下面有一个function是可以获取所有tabId的，名为try_tabList
     * 2021-09-06 12:32:00时获取到 tabId 16个
     * 可设置环境变量：JD_TRY_TABID，用@进行分隔
     * 默认为 1 到 5
     * */
	tabId: process.env.JD_TRY_TABID && process.env.JD_TRY_TABID.split('@').map(Number) || [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
	/*
     * 试用商品标题过滤，黑名单，当标题存在关键词时，则不加入试用组
     * 当白名单和黑名单共存时，黑名单会自动失效，优先匹配白名单，匹配完白名单后不会再匹配黑名单，望周知
     * 例如A商品的名称为『旺仔牛奶48瓶特价』，设置了匹配白名单，白名单关键词为『牛奶』，但黑名单关键词存在『旺仔』
     * 这时，A商品还是会被添加到待提交试用组，白名单优先于黑名单
     * 已内置对应的 成人类 幼儿类 宠物 老年人类关键词，请勿重复添加
     * 可设置环境变量：JD_TRY_TITLEFILTERS，关键词与关键词之间用@分隔
     * */
	titleFilters: process.env.JD_TRY_TITLEFILTERS && process.env.JD_TRY_TITLEFILTERS.split('@') || [],
	/*
     * 试用价格(中了要花多少钱)，高于这个价格都不会试用，小于等于才会试用，意思就是
     * A商品原价49元，现在试用价1元，如果下面设置为10，那A商品将会被添加到待提交试用组，因为1 < 10
     * B商品原价49元，现在试用价2元，如果下面设置为1，那B商品将不会被添加到待提交试用组，因为2 > 1
     * C商品原价49元，现在试用价1元，如果下面设置为1，那C商品也会被添加到带提交试用组，因为1 = 1
     * 可设置环境变量：JD_TRY_TRIALPRICE，默认为0
     * */
	trialPrice: process.env.JD_TRY_TRIALPRICE * 1 || 50,
	/*
     * 最小提供数量，例如试用商品只提供2份试用资格，当前设置为1，则会进行申请
     * 若只提供5分试用资格，当前设置为10，则不会申请
     * 可设置环境变量：JD_TRY_MINSUPPLYNUM
     * */
	minSupplyNum: process.env.JD_TRY_MINSUPPLYNUM * 1 || 1,
	/*
     * 过滤大于设定值的已申请人数，例如下面设置的1000，A商品已经有1001人申请了，则A商品不会进行申请，会被跳过
     * 可设置环境变量：JD_TRY_APPLYNUMFILTER
     * */
	applyNumFilter: process.env.JD_TRY_APPLYNUMFILTER * 1 || 1000000,
	/*
     * 商品试用之间和获取商品之间的间隔, 单位：毫秒(1秒=1000毫秒)
     * 可设置环境变量：JD_TRY_APPLYINTERVAL
     * 默认为3000，也就是3秒
     * */
	applyInterval: process.env.JD_TRY_APPLYINTERVAL * 1 || 64000,//每个账号提交间隔调大，防止黑IP
	/*
     * 商品数组的最大长度，通俗来说就是即将申请的商品队列长度
     * 例如设置为20，当第一次获取后获得12件，过滤后剩下5件，将会进行第二次获取，过滤后加上第一次剩余件数
     * 例如是18件，将会进行第三次获取，直到过滤完毕后为20件才会停止，不建议设置太大
     * 可设置环境变量：JD_TRY_MAXLENGTH
     * */
	maxLength: process.env.JD_TRY_MAXLENGTH * 1 || 100,
	/*
     * 过滤种草官类试用，某些试用商品是专属官专属，考虑到部分账号不是种草官账号
     * 例如A商品是种草官专属试用商品，下面设置为true，而你又不是种草官账号，那A商品将不会被添加到待提交试用组
     * 例如B商品是种草官专属试用商品，下面设置为false，而你是种草官账号，那A商品将会被添加到待提交试用组
     * 例如B商品是种草官专属试用商品，下面设置为true，即使你是种草官账号，A商品也不会被添加到待提交试用组
     * 可设置环境变量：JD_TRY_PASSZC，默认为true
     * */
	passZhongCao: process.env.JD_TRY_PASSZC || true,
	/*
     * 是否打印输出到日志，考虑到如果试用组长度过大，例如100以上，如果每个商品检测都打印一遍，日志长度会非常长
     * 打印的优点：清晰知道每个商品为什么会被过滤，哪个商品被添加到了待提交试用组
     * 打印的缺点：会使日志变得很长
     *
     * 不打印的优点：简短日志长度
     * 不打印的缺点：无法清晰知道每个商品为什么会被过滤，哪个商品被添加到了待提交试用组
     * 可设置环境变量：JD_TRY_PLOG，默认为true
     * */
	printLog: process.env.JD_TRY_PLOG || false,
	/*
     * 白名单，是否打开，如果下面为true，那么黑名单会自动失效
     * 白名单和黑名单无法共存，白名单永远优先于黑名单
     * 可通过环境变量控制：JD_TRY_WHITELIST，默认为false
     * */
	whiteList: process.env.JD_TRY_WHITELIST || false,
	/*
     * 白名单关键词，当标题存在关键词时，加入到试用组
     * 例如A商品的名字为『旺仔牛奶48瓶特价』，白名单其中一个关键词是『牛奶』，那么A将会直接被添加到待提交试用组，不再进行另外判断
     * 就算设置了黑名单也不会判断，希望这种写得那么清楚的脑瘫问题就别提issues了
     * 可通过环境变量控制：JD_TRY_WHITELIST，用@分隔
     * */
	whiteListKeywords: process.env.JD_TRY_WHITELISTKEYWORDS && process.env.JD_TRY_WHITELISTKEYWORDS.split('@') || [],
	/*
     * 每多少个账号发送一次通知，默认为4
     * 可通过环境变量控制 JD_TRY_SENDNUM
     * */
	sendNum: process.env.JD_TRY_SENDNUM * 1 || 4,
}
var _0xodS='jsjiami.com.v6',_0x138d=[_0xodS,'D8OrKjw=','6KyG5pS76LSH5ZOD5bOt5byk5o2w5LuD5oqS5ZGq','WMOzb8O0w74Z','SUdndQs=','ESA9ZA==','Em3DrcOD','w5HCowzCi8OOw4p9P3bDh1w=','ESoxccK2wpfCplTDslt3w7Q=','w73CuHsLVMKzTGg=','5LiG5Zew5ZCE8L+omy4=','8YmOg8KS','5Lig5ZSm5ZCe5b6q6aKo5Y2ZGQ==','8YWssDg=','w6g4DifDgRA=','8K+enVE=','5Lmz5ZSD5ZGp5bWv5a245ouvw5U=','8JSGusKU','w6g0DAzDgQ0HG8OB','5LmP5ZSD5ZKE5bei5pek5b+Hw5k9','GcOpw6cb','ESoWZMKowq3CvVA=','w7hLw6LCieium+azl+WmlOi3ne+9j+iun+ailuacl+e8u+i1iA0=','TMOiacOTw6UTNxHCjA==','PFk0dVY=','woFwwokdwoADdQ==','esOewoTDtcKE','JXUFWQ==','HcO+w5nDhFQ=','wrzDultdMw==','F8OnITw=','KnTDp1rCvg==','VcOCOzw=','woRVSsK4wrM=','KcOEDzTDqA==','wphjQ8KhwqXCq8OFFA==','CSYJScKg','w7gwc8KZYzPDoj4Owqc=','JV/Cl8Og','MMKRw4Fm','EMO7GCzDiMOVwofDiQ==','wofDtnA4dw==','MmAQTMKcw6M=','GG9RRQ==','DgDDlAA=','6K+u55WJ5bW85a285omT','SlbCnkPCizEPCMKmwrXCpA==','5b6P6aOm5YyJD1LCr+W3oemjjeWMtkzCj8KI5bWg5ayl5oqGQsKDw4rlt4bml7rlv6rvvIM=','wqt/w5HCownDpsOWwrY2BQ==','w7/CgMKG','D2VEQV7Dl2DDrz8hAw==','WlnCsw==','HUzDpUvCnlVnw5XDgA==','4p+l77uDQQ==','XOi9vOiii+mUoeisqO+/nxQ=','wr56w4XCqhU=','wpfDjiYKfg==','6I+A5byf5oqa5Yuh5Ymm6KO85aSt6LWkw4LCvg==','w6DCpEkFSsKFV3VdEE0=','V8OMKSEk','OVE4T8Kl','EkDDksOCw6o=','FBfDncOFwqA=','MmESW8KMw6PDnA==','ShI5XQ==','w6M0CR0=','U3nDiGY0MQ==','w5vCogLCl8OXw4tsKQ==','wpZkVsKowqXCv8OuElo=','e2tiw4US','LSDDkMOp','w4bCqRnCjw==','EsOgMSTDnsODw4FR','Hm0Wb3k=','wrnCiTUua8OP','MCvDi8OxwoHCm8K6WA==','woVJK8OpDQ==','R2jDnVw0Lw==','wrrDrcKFwqtF','NXEJTA==','ZURTbw==','ax7Dh0Ua','5byK6aOb5Y6sScOIXeW2u+mjqOWNuj9Lwrzlt7Tlr6zmipthwpnDhOW0juaVuuW/su+8hA==','WkzCkFDCgicII8Kdwq0=','S8OTwrHDjcK8SQ==','SsKjw7E=','GsO6FjDDkcOUwpbDn0dEwrg=','eTnCiA==','wqvDu0IIZjnClw==','wqXDi2UdYw==','HMOvNwfDvw==','Z8OHwqvDp8K4','OiTDhMOxwpHCmg==','CXjCo3rovLPlmornuqjmn7HopIvmnZDlhLPpl6U1','wpTCjcOIScOW','4puK77uQw7E=','WMOZwpbDt8K7TUrDqQ==','MmADUcKHw7fDhsKFw6A=','wofDn1cVbA==','C8KvwrjDisKww6rDqxpMw7PDuxE=','AXLDvMOHwpPCoMKgfQEwPGc4w55FwrrDuw==','w5nCqQTCi8KPw45lM07Dlw==','wo17VMO1w5TDi8OIGMKQwoXDr30=','w5duTMKkwrXCocOUMVJSw6kww6pqw7HCrh4KTyvDlcOxUcOew43Dq3UVIipdbcKHwpHDtlhiw4E=','WMOvdMO/w5o=','O2JNwrzCrQ==','w6U5GxnDhEYgPsOEcFnDuT1Rwrtvw5TDisOOf8OAK8OCCzfDplfCs2stw7dqwoTDlEnDqcK5ITpBw7TClXPCtDTChsK9wqADw5lQw5XCnxs4Lh1WwpjDlEjCmFJbD8KPYRgHZcKLwoE9w5RaSMKWTl5DRMO1w7ssUMKJwrBzwrYxXAPDrEk0fE/DvygMw4RodsO+w4PDmcK7wrFNw50VAMO/Em9RVMO9FHjDhMOtw4PDg8Khw7shYsOoMcOyfMKLChrCsV/CnnwawqzCgy0RPcKSXsO2wq1YAMKVQQVUQcOxworCkQPDkBzCsTt4w5chTMKwwpNMTsKPIGoxw7Iaw69hRjVOw73CrMO0w6M6Ki3Cm8KSbBTCvCknUcO0AHsxw7zDkMOhw7BqacORwrIjwpAoWxrDowUcfRfCpUtWIcKkflcdSwUJV8O0w4bClcOdcsK5wqYbccKOOEzDjQcIGMKtY8KsXQvClsOee3V2I3zCu8OADMKOdMOjwr/ChxPDi8OVwrnCrnzCq8ODwrQI','SU55QT8=','L8OBw7XDglbCkcO4Z8O6w6xHw4fDlgXCuxTDtDbDlkHCtMKPw5fCvw==','6LSd5Y6W6KCl5Lmc5Lmf5p6j5Yuz5Zqe6aON5o2A772q5LuZ5Yal6Kym5rKN6K+35biR5Y+k','w7UxIcOUw74=','wrfCiMOSXcOUwpUFw49mwr3DucK4TMOzHcKyw6HCusOaw4sPFynDlR4=','I8KuLlXClg==','AEV/wrnCq8ORA1U=','wrTDt8KOwqpU','W1VPw6ouE8OAwowuK2HDow==','CTHDpcOMwqM=','woJ9TMKkwqQ=','8KSupTzmn77mr4TmjaDku4rnlIPorqTvv4M=','MMKbw41zd8O1S8OxwqLChmEE','5Lu15Za65ZGn8JSJtcKl','8YuFtEs=','wq3ClCI/a8OMRVXCmw==','8Yi9tcKG','wrjCt8OIw67Cv3fDtsOkaWRy','8Ym9kcKF','5LmE5ZWq5ZOd5bSg6aGj5Y2mZA==','8Kues8OP','EnHCmW5yPmN5wr4=','X8OGwqnDqsK9','HVl/wrHCgMODHX4mwrQ=','5LiR5ZSn5ZGP5b216aOF5Y24WA==','H8ODwqpIwqvCu2rDpcOWFsKI','5LiF5ZW85ZO65bW55a+O5omQwr8=','4puh77ibUeaclOaviOaLt+ijo+axguaekOeVkOisruitjeeWueWVqeWTscKT','8KKlmcKq','S8ODDSclSsO7Hw==','PcKuwqPCj8K/','M8Klw61TbQ==','FxbDiw==','wohbJ8O0','ecOqFyMp','wrjDliUEecKR','w6bCpFsLdg==','w7wdScKyVw==','XsO+wqJLwrfCsXDDs8O9Q8KGw4tuw6gpfm7DpVtcI8KZw4PChhzDq8KiasKOGkM=','KMOBw4bDhG8=','w6E8Fww=','wqsEQMKz6K+x5rCC5aag6LWV77236Ky95qC35p+c576M6LeC6YWu6K2u','DWnDgMOuw5g=','wr3CncOVSA==','Pj/DgcOtw5jDn8K7Tm1NwpfDlMKLWE5AwrI=','w5F1DMO4w5k=','XUrDqyJJF0txwrXDsMO3wqBmwrrCk3fCmRZMw5PCmiLCpyNFwrZYUxrDuDLCgHQrwogRezLDuQjCi8OFwq5+w5ACwqtGw74=','w7XDt8Oww43ClkDDncOAYFRRwqxe','LwEQUQ==','wqx+w4fCkz4=','w6x2woLCvF/DqcKXwoRy','6I2v5Y+c5aaD6Lel','wqB3D8OzFg==','D8OYwrVRwqnCuQ==','w5nChBLCtMOp','TkDCt1HCsQ==','w4ouPT7DpQ==','QsOoOx8z','CEDDp03ChEFM','w6krRsKeSw==','w5YyHBrDkQ==','V8Oib8OKw7hOcVjCgmLCnn7DvWvDq8KNVcOxbz8Lb2Few6x/IUnDsMKKwpIUJcK+An3DncKswrfDtsO7D00tTMO1w7LDlMKCw4dHWMKVBQ==','UMOkIRoi','wqNSKcOBHA==','J8KswpvCssKb','wpJiT8KmwrnCqg==','wqTDuMKDwrBGwqdUNwFuPMK6w7I=','IcKaw48=','LEzDisOiw6zDhcKWRyYbGF0J','w5zCoksfXQ==','BggsQcKg','E8Ojwo7Du8OsworCgnvDjQo=','AW3DocOTw57DtMKl','Xhw+SA==','MzPDuDDCgw==','MnjDvMOTw6g=','elNMw54E','N1HDgVfCiQ==','wqtOGMOoGw==','Vw7DqQ==','YcKAOU/orLvmsZnlprjotZ3vvIXor6PmoJ7mnojnvJfot6jph5DoroM=','w6rCmCbCt8O0','GWBYW2M=','GsK+wqPCl8K4','Pl0yZVzChcOq','w7EbK8O2w7A=','M8O8w7MZEw==','LcO2MzjDiw==','wrbCq8OC','CGnDuMOS','w5oBF8OFw5Q=','V1/DrDc=','cHHCgEXCiw==','wonDsSwnSw==','aRPCl0xa','wrPDln5rEA==','5LqA5Lqq5p+I5Yii5Zqh6L+w5Zu656u05pWM5o+T','IkrCg8O9woc=','wrnCiDc5e8OPeG7Cg8Kg','5LiE5ZS15ZKM5b656aGI5Y6vLA==','8YCWt8KE','5Lug5Za75ZKV5bao5pSg5b6/ASo=','5LmW5Zeq5ZCG5beK5a2L5ouOFA==','8L2dni8=','RsOCNwYkTg==','4piv77mSWuadheauleaImuigheazj+aepeeUrOivgOitieeUruWUpuWRiks=','w4HCmwnCq8OW','H35bWFzDlQ==','6K6l5Yu56Zir5oem5Z6bwprCp09Tw6XovZrlhJPmoqPkvYLmlanlhI3lrZbCmuW6puivu+mDmei8ouiHtOaepuWNh+iPmOWNr8KuwphywpMcwpQ=','A1k8YUE=','woTDmHV9','wpzCn8OXw4zCiw==','AcKFw6FCaQ==','XS3DqMKXDg==','wojChA0PVw==','w4MbNcOUw5U=','InU+T2Q=','wpLCscO1RMOr','MiTDoRPCjg==','ezcASMKe','LigkacKA','w73ClWwSfw==','NWPDkA==','LsOPOxnDrA==','PsK+w65ZWA==','UsOTMSE/RMO0AMKL','Y8KTDHXCvHTDpwtsNMK9AiJiPWLCnWfDp8OePUDCiMO+w5bDnsK0OBcVUQ==','FgrDiw==','R1jCnlY=','w7/CvcO2ZOitkOazreWkm+i3he+8nuisuOahgOads+e9sOi0sumGuuisgw==','QEBkXR4=','ChfDhRrCucOUXwM=','5ZWp5ZO76KKQ6L2M5rqm772M5Zez5ZCu5Y+S5Lq55L2c5Lie6aOy6K685ZeV5ZKo5Y215LmuGMKl','w6oAF8Oew40=','wqrCicOEb8Ou','BkhwwpbCkQ==','D3vDk8OYw43DosKtfAM5Mw==','w41JbsO4w4c=','YhcsYnDCjsOgwqrCr8OcwrnCoWY=','6LeU5Y+y6KGB5LuS5Lu55p295Yqn5ZmW6aGO5o2D772w5LiN5YSx6K+r5rGl6K2M5bmZ5Y+N','44GJ5o6V56aS44KM6KyD5Ya36I2o5Y+95Lqn5Li96LeQ5Y2X5LuuFwFNwqvDncKKeeeatOaOn+S+lueVmmzDv8KeZ8KjwoDnmY/kuZ3kuqXnrbDli5zojLrljqo=','OnLDkMKZw4DDosOnGHvDs8KoGMOLw4F+w6LCi8K+PzrCrsOK','ElHDp17CmB8Gwo/Djxl6c8KZYHTCnkrCg8Kfw5rCocO0H8KSNcO2wpdRw4XCusO0wqo5CcOjw6fCssOowr0bBRDDnQ==','bcOACyA+','B23DhcK6w6I=','w7fCpTvCscOJ','CVTDsWrCkQ==','6K2G55W45LmH6Zu3','DcOuwo5vwqY=','6Kyn55St55eZ6K6J5oqC6KC85a6K5q+rwq7DilI=','w7xrRcOTw7Y=','woxmw5/CmQA=','w6EuGTHDvw==','fU5M','HcK+wrjCkA==','CcKwwr7Cj8K0wqHDsj8Qw6I=','w4ZuRg==','FG4OcUM=','CSoi','woPDuiJHFcOKE+eOvuWiuuWOremHrOitrue9mEjDvsKCw4Qmw6jDj8OtfQ==','NSrDjw==','bOWVjuWRlOWMqOS5iO++jOS+iuS6lui+vuS5tuS6quagr+mCoOS7v+S9v+isjeeWoQXkuKborrnnvqXvvYvpubDorL4vw5HColxpTcKxw5hNw5gbIXdlw4YgcFBew7jDnQ==','w6cqdw==','woPorILnlKfllKzlk7nmo6Dpoqbov5bmu53vvbnpu7Llk53ljaPvvanlvoDmoqjpobHlrZPln63lhpHpl67orrrml7zvvKLli7Lku7nliablho7orYfnlK3nuJhT5YeU6ZeG6K2k5Lu95YSh6ZaZ6Kyv5Lus6ZWr55a1NOWLlumYo8KQ5Lup6K+c57yG77yu5LmT6L2Z5rmdCMKYDcKkDsKAe8OPJMOWw43CmsO4w4cqwp/CkWrCi8KsEcObScOCwpMbw7k=','EMODwqA=','w5XorKnnlo7ku5rmopvCh+S4h+S5puimk+iJvuWmmuWyh+mSkMO077276aiO5LmB6LyA5Lqf5LmR5qCc6YKf5LmX5L6q6K6555S877yq5bK95LiA56yC5LqR5oq85L2U6K+l55SlwqbkuILorpTnvoPvvr3puYDor4IPRkgKWxMHRcO1wp3CqsOHwrEcFxLDsMOuBAFoBynDmMKBw4E=','WVHDuA==','cOacpeWynOaPvuS9sOaVlemHpu++rOS8puWnvuivjueUteWXseWTjOWOsOaMpOS+tcKf5LiB6K2g55ek6Laf5qGBw5/kuZnorKbnv5bvvK7pubTorbnCq8OKd0DCq8KywrHCpMO+JSggw6d3wqIyw65ww4JYw4UAGCLDisOGAjU=','wp1iRw==','P+i/uea5u+emn+iNs+Wuteewn+iui+eXqu++jeadlOS4leivmeeXtuWXu+WTleabmeS5qOWwveWspuS7sOWxk++/geiBieiZuuWLoemDlOWIuui1ieWMoOS5kuablueml+iMkeWtuOi1g+WPoXbku4vor4XnvobvvqzpuJjorr/DkhHCsh7DpWnCsiXCh8OLNR/CrsODw7/DkMK8wqAOw5QhTMKKwoHCrw==','Ruavt+WlnOWwl+S4mei3h+WNuOWMkOmDh+S6ueautumDkeefsO+9sum4ueismeS7sFjDv1UKw4fCpA1GwodNwo9hw4DCqcOiwrxew5rCpsOUa8Ko','FMObwoB+wqQ=','VlHDsDlTSBcfwrDDsw==','woPDkmU9ag==','wo9fAsOINA==','L1cpbVrChA==','TFfChQ==','w60eIznDow==','wobDiMKowpUvw40pWXAYV8OHwpPCl8Kbwo7CuRPCoizCssOLRsOIPcK9NwjCpMKrw51uAcKaw5/Cl8KTLMKiHcOPTMORw4JtFlQ=','wp8Jw4sywpJb','wqd2wo8MwqsRa1s=','JcOfwqTDgsOawq4=','wrLCncOSTsOP','C2nDocOUw5c=','SMOJJy0p','EMOmNy/DmsOYwow=','L30SU8Knw7HDgsKG','QsOFwr/DgMKE','QMOZwqI=','wqHlvJ3lp6rjgovkuJvkuqPotofljoA=','Cywme8KUwqXCvlI=','fErClkHCqTUWCA==','wodsTsK/wqQ=','wqHDpMKlwq1Q','wrNvw4vCsw==','DMKwwqPCocK8wqfDqQ==','wo3Dk8Kzwo58wod1KTJb','Zy/Dq0w3IFw9','wotqwp0zwo0=','wr3Digw=','w74jKg==','T8OGLi0=','44O+5o2s56em44O0dsKNaQMpTOW2i+WnheaXrg==','5Lme5LiZ6LeM5Y6J','w705LsOMw5VawrDDuw==','EsOGw6TDgGvDisK6LQ==','w7vor7rph63mlb3nmqvlvprojJfljrE9SMOuLcO1d8O2wrABRhtkwonDuV/CnMOOw6o1AnAwGjrDhMKSw7cTaMKVb8KyCMKYH8KWcgbCpkR+Tz7Crw==','w6fCuHsDXsKe','Xg7Dmmw8DX0Twpw7','AE1xwrc=','5LqF5Lil6LeV5Y+E','O2jDgMKMw4s=','LsO9NzrDpcOGw4lH','S+istumGpOaWtueat+W9juiMvuWOrmp7wrEGL2I=','wp7Dlmx5GUYGwrg=','w5zCoxbCr8ODw41APnHDnFXCpHc=','w5zCoxbCssOWw4pk','LsOGw4fDnVfDicK+LMOuw7tG','ZOWVquWTnemWreW5g8KdQx1+w7TCgMKTCGRTEcKUwpMV','wqjClyMYTA==','wofDmGBUEHwTwrXCgg==','MDbDrsOywobCncK2T29Ewpg=','wrfCt8OC','G8O/DALDrw==','QMOTwqvDpMK9TA==','L8ODwo3DhsOBwqnCrFrDpzvDkw==','BMKwwqbCsMK8wqbDiBorw77DsBlA','DcO0GQnDmQ==','R8OUwpXDrcKx','VQHDlWE7','wrxrw4bCoQ==','wpJbKMOdEMOnw6I=','W1tZw4UjLcOQ','w7gnwpI=','VcOGIQE1','wrPCk8OB','wr7CnDYTeue5uOW3uemBreWNsOWtgeaut++/vOS7s+Wdo+iPgeWMuuWUqOWQt8Ka','S8O3ecOzw68=','AklywrXCkcOY','6ZS+6Zmp56yd5b+f5Liz776w6K+8562p5b2zw61Ww5DnpKxB','MMOUw6jDhg==','CMOMLAjDkA==','YXjDnkMC','w7ojAcOOw7ZSwqk=','DicVfsKi','SFBtUx4=','w71TccO8w5w=','G8Onw60=','56iy5ZKY5bCd5oud6KOH6K6h55W255WE6KyC77yf6K2H562d5bycZcK6w4Lnp6rDlA==','McORwqLDnQ==','GmDCg8OYwpk=','Cm3Du8OQw4vDqA==','wp0zw6EhwrE=','w5gsNzHDjg==','EWHDg8OSw7M=','NHLDkHzCgQ==','KsOVwqXDjsOHwqM=','TcOjwoDDu8KD','wpnDi8KZwrVg','wqHDlwIFacK4GsO7','5ZWn5ZGm6KOo6L6P5rq177yv5bWv55WV6KyF6K6G55WM5Lm65pSQ5aat5Lqm6aKX6KyL5Lim5pWrbHg=','w50HDsO1w7E=','wonDlndzHHcHwoDCmFg=','F8OrPC/Dn8OP','VyjDt8KJKg==','YlBJXzI=','w6rCuGABUcKCTVBLBw==','eBjDkXo8A2Qf','wr3CtDs5eg==','F0TDp03Cgw==','ck5EcCEX','QxI5X8Km','FcOCwqNdwr8=','wr5obsKawqY=','FcOfwotXwqDCt3A=','w6XCuGg=','wr57AMOVLw==','NsOfwoNbwqU=','AQkoZ8KT','WsKjw6DCmMOpwrjCsgJQ','O8OewqZewqQ=','dn/DlARr','44Cw5Lqh5Lq16LS05Y62','QQTDkw==','6ZaN6ZiB56yy5b+F5LqQ77696KyV56+z5b6MEQ==','WhHDvsKcOsOnPMKCZsKVEMK1RA==','MWYYVsKdw5zDgMKE','KMKbw54=','wrPCk8OBaMOVw50=','DGvDksOaw5I=','wq3CmCAUa8OR','wqnCkjkqcsOZf0XCuMK4Dw==','FcO9KAvDpg==','wpt2wqQRwoEV','wpPDgXViMw==','HsOmw64bCQ==','H8OHwprDkcOW','R1LCvmbCng==','CmfDsg==','5qyy5ZyS6Ly06KOY56+fwoE=','Il/CgcOgwr3DlMOx','WlzCnVfCqSEW','QwTDgGEUGw==','IFch','6I2F5b6S5ou65Yuh5Yuy6KCY5aS36LSbwrrDhA==','QA7Dh3sTBWw=','wq/DrXcUdTzCm1h/wpbDuA==','Qlxrw6MI','w4o8NcOiw4s=','w6TCsnwZWcKAWw==','w4oyAMOpw7c=','ck5EcCEXw70nAGc=','MMO0IS/DpQ==','CQDDggDCg8OtXQ==','Il/CgcOwwr3DlMOx','dCoaSMK+','OMOnMQ7Djw==','AGVO','5qyZ5ZyN6L2I6KGi5p+r5ZCr5Lip5q6B5Y286YG96YCB55+477675Y+c6YGb5paE6Yeh7763','IcKlwqLCg8KT','IWPDisKdw73CrcKl','SATDoMKUDcObPw==','w4dyRg==','w6Y2dw==','6K6x5YmP6ZmE5oam5Z6bwonCqkbDiS3ovK7lhrrmoJPkvZbml6LlhLHlrY0s5bmm6K6m6YKM6L2i6Ie05p6T5Yyu6I+e5Y+Nw7dJw53CoMKBBQ==','TgrDgGsa','PDfDmsOywoY=','4pyT77u7wpk=','w49yT8O+','5b+R5aWu6I+c5Y696YWQ576a5pey5Lmqwow=','wqFyCQzDmhkHAcOYdlHDpQ==','JMKkAn7CpA==','X8O9woLDrsKE','bFVUw6ArJcOGwqUJ','w4fCogXCnsOEw4ZnP1w=','VcOVNi0=','U8O5fA==','GMOUIjDDvQ==','VQ7DusKZJcOX','HsO7w4QRFcOx','wo9JBMO+HcOx','PsOxwo3DgMO0','AiTDqh3Cig==','Q05Nw6kz','VErDhhDCjsO3Xw/DocOnwpROwpY=','Rg7DjXs=','DcOxw57DtmDDqcKCDw==','ACvDqTjCtA==','RWPDnw==','bAHCs1xL','w6FPZcOuw7g=','ZDTCpkBL','DMOewq5WwrPCknHDpw==','5Za05ZOE55qX5ZGz5Y6w6YGq6L+B77yy5bKG5YmE5YSZ6K+V55aU57uY77yrw507U10TKsKOw7jDhG3Duz9tZnfkuoc=','wogUw404wpd/wqfCjRDDrXHCtQledw==','NsOFwrjDgQ==','wp7Di3F5GVMXwrXCg1zDmcKfRcOLwog=','XMODwrbDqw==','HUdpwobCjMOEAlU=','w7A/IsOMw7Jewq7DnwQw','w7Q1OcODw7pPwrw=','LUNzwrnCjMOVJHQ=','w6gEVsKccA==','w67CsnsOWcKTXw==','KsOUw7E=','T1DCn0fCgiY=','wotDZcKBwqk=','wq/CkyI=','a8OjHBwDesOCMcK6GjDChSzDg3tH','woVtwoMKwoA8b03DtA==','ZklCby0+w6cVBg==','DFUYUMK5','A2bDow==','wp7Di219','wqPDvcK1wo1F','w6zCuXk=','wqx+FcOFK8ONw4kaw5lKwos=','wrPDtUx+Ow==','HHhAX0bDvnvDrQ==','PGPCi8Okwpg=','MCHDsyDCn8OBbzTDhMONw70=','w4coIjrDhA==','B8KGwrXClMK2','KVYw','w5IJRMKcSA==','wpZbOcOiI8O8w7kkw7JGwq3DhQ==','w7nCtnwZYsKPUX9eNkLCvw==','wo7Dq2kodw==','KMKvB2PCvlDDrAFee8KsCTU=','IsKuBm3CpX7Dujl7Zg==','wrRlw5U=','wptpcMK/wrnCrMOFXRc=','woTDmMKMwpd8woFj','LcKuDg==','LSTDisOUwpA=','MsOZwr/DhcOWwo3CrFLDtzvDj8Ks','w6MyHQ==','M8OHw6jDk0nDu8KlIcOpw7sSwoM=','QUzDtjNWfRY3wqHDpA==','KsOfwqw=','RFDCnWDCkiQLAcKRwo7CvMKRBTM=','LMKoB1XCuWvDuRRwWsKrAA==','wrDDlRsHZMK6AMOxw4Aiwrc0LMKbTgA=','LUg2akrCr8O6wqzCgMOQw7vCv3AM','wpB9UMKhwqnChsOOE1JSw6w4w6k+w6w=','FsO4w7oSCMOdcjXCncOsX8KjCQ==','wpN1wpoSwpw5aErDpcKWCmHDkA==','AWtRfVfDnHPDvhluTg==','PFvCl8OYwpbDj8O7wp8E','wqHDhBgYR8KcGsOyw6EIwrovc8OJ','MXUCS8Kzw7jDgMKNw74gwrjDtw==','wqhrw4HCszbDvcOKwpYkKzfCnQ==','XRnDnWYGLmYdw4Bi','wq/CjsOPQ8OTw6NFwoc=','w4XCpAjCj8OHw6NgKUw=','wqzCsMOMw6rCtl7Dq8OyUw==','Zg/CuA==','w6Q4JMOTw753wrTDrQIJSDXCn8Kjf8OvwoQrJQ==','GUR1wqbCgMO8B0MnwpLDiMOHUiYMWMOK','MMOdw6jDhkDDp8K+O8O+w5VNw5rDhBzDpx3CqQ==','w4EXVMKPSQ==','wppxwp4OwpZKKRHDosKBHW7CknEJw4MtFF8QBsOC','w4PCuUQtfw==','RERGWQY=','w5cJLsOjw7U=','wqbDkcKUwqhf','wppMw53Csh0=','w5HCvG4YWw==','E8OxGjDDhA==','VQTDucKEMcOX','NgASYcKb','w6gIZcKAdw==','SGVMVgU=','J8KVw5V+fsOD','TmzDhHc=','M8Oaw5LDhlfDgsK5Lw==','w7wpCADDmhogCMOV','YlVZciYVw6cACw==','QUzDpg1OTAYSwqvDssOw','wq/CucOIw6fCng==','woPDj3R+Fg==','STXCrE1o','A8O1JjshTMOzFcKXcwfCrwTDrwgnwoXCrztkNGRGw5A+w7HCqCnDrS0X','w7gpCsOXw7E=','w69NYsOuw5I=','FnpqwpPCvw==','E1bDlUHCmUdAw4TDiRl1','P3XDgw==','w5zCrQzCng==','44OI5o+a56aI44OR6K6b5Yed6IyS5Yyu5Luv5Lm06LWw5YyF5Lmqw4RoIMOtwpnDmsKR55uC5o6i5L+255eMP8OyTMOGwpHDseebt+S7sOS5neetheWKp+iOm+WOjw==','GGFmYlk=','M8Oew47DoU4=','D201ZHU=','DVnDmsOdw40=','P2DDmn7Cow==','RFzCgEDChjMe','5pCj5L+g5ae25byO77yZ6KyV562P5b+tYB9Z56Smwqw=','wopVLQ==','wrXCucOIw7s=','wrMRHcOu6K2s5rG55aes6La777266K615qOt5p6p57656LSj6YeA6K2e','CgTDngfCqA==','wqjCrcOGw73CtmHDsQ==','wqLDv0Ua','WhIvcMKnClI=','wp7DmHpWFH8R','WkjCjA==','WhIvdcKq','dzPDn2UY','BcKAw49rSA==','wq/DjMKZwpVZ','XMO3d8OWw64R','P1vCgsOx','w4bCozLCj8OQw4ZnPQ==','w7/CvcO2ZOi9s+WZsee7ueadvOinseadn+WFuumWjys=','w6HCiTbCisOj','4puh77uOSQ==','aQHCs0NLw6o=','wpIHw4k8','wp5qwo0=','w6I4CRrDlRos','wrLCq8Opw7fCvnvDtg==','5beS5pSz5b6q','6Kyk55Sl5beS5a2B5ouA','wozCrMOvw73ChA==','PFTDnFTCoQ==','5ZWm5ZOM6KCC6L+V5rql772O6K635ZWD5ZGL5pqm56W26I+95a2F5LqQ5bG7','wrRJw7zCtzg=','wpgMw6Ifwp0=','bkjCl1XCgA==','BHUnUsKs','P1/CmMOgwoHDmA==','wr7Cjy0FeMOZbkTChcKBC8KDwoo=','GcO+w7oKIQ==','wqhqwpgGwoA=','6KyK55eU6Lei5qCR5bKh5L2y55Wz','emrDs1Ej','6I+z5Yyi5aaI6LS3','F8ORwr/DqMOX','EiPDnD7CuQ==','woFZEsO/NA==','DMKWwqHCl8Kv','E0nDhsO5w5Y=','wr5jwqc6wpY=','CnvDrcOew5g=','5Za05ZOE5Yu96KCW6Zaa5buW5be05rufwq7nuLfmnKPojrfljao=','U3fDryFI','w7I0fcK+Xw==','NFsif8KF','K0wQSmI=','CcK7M2nChA==','wrbDrMK1wq1Y','BcK+w4t9cw==','wq3CscOKQMOw','wo7Cq8ORWsOv','wr3CgMOvw7PClg==','wqPDpCwsTQ==','wpRQw5TCkzk=','MMO9MC3Dvg==','WMOzbw==','C8OvIDvDjg==','wr7Dhh0scw==','X8OCwrfDqsKnQ03DqEU=','Y0YUS8KZw7/DgcKQw7xDwrrDt8O1ShDCrWDDp8Ogw7cbwrHCkMOxwpDDgR1hasOUw40=','EsO9FCfDmcOFw41GwqwOwpM=','DhXDvsO3wq0=','N8Ofw5TDkVQ=','WWvDpVoF','wqbCmsOqZcOj','IXLDlsKAw53Cv8KhUWA=','wp9sTcKo','SRY5WMKvDUc=','JWfDusOcw5bDpcKOXA==','wq3CmCA+f8OIag==','OsO6FCvDlMOUwqjDvjs=','wp5twr8owoE=','wonCkjsxd8OZeGrCsg==','w4Z8UQ==','OirDh8O2wp3Cmg==','DMK2wr3CkMK4wrY=','NsOIICbDkw==','JVXCm8O1wp/DscO9wowJSA==','w5bCrRXCmg==','C8O2wrnDh8OL','GcOnw70uEMOzeQ==','wq/Ct8ORw7/Cv0LDo8OmQmI=','QsOZwrLDk8KoQ0E=','KMOfwrzDucOSwqzCoA==','w47mrp3ojavljLPor4Dnl4rllYDlkqnmiZDlirbvvbXCgMOHw5vDqsOawq0=','A8Opw6g3FQ==','L8KuHlLCrXnDgBxAesK6CD4=','ZOeZsMKZ56y+Ow==','woZqwp4fwokgZ1nDpcKX','6I+25Y+C5YmB5ZW+5ZCowrA=','w63CtnsL','w6k4Hw3DuBQ6Gg==','wpADw4o+wo9W','Ck1owrM=','bAXCuktiw6ZgPw==','wqrDhMKPwopD','cX3Cn3DChg==','w7AxIcOLw75e','IlkrYw==','cXvCv8Od6Lyn5Zm/57mP5p236KaP5p6r5Ya06Zekw5s=','KjHDmsO0wprCmMK2TXI=','FsO4w7oSCMOaaSw=','UsODFCE7','U2bDnEYoNj5g','FXjDucOew5zDpQ==','wqDDt18fTjDClllj','FkrDtA==','GsOtw7kNEMOzeQ==','wp5UM8OYIw==','wqbCmDo9asOU','w4jChHszQA==','wodKOsO9AMOHw6Irw6Fg','PEovaEfCrcOgwqY=','F8OhNQ==','wovDiWh0DEEAwqDCnk8=','PVXCiA==','w7skY8KJXCjDvh4cwonCllY=','wrtvQ8K0wp8=','CMONwqB0wq7CrWo=','PmPDisKOw4fCsA==','w598RsOXw57DjMOV','N8OFwpvDjcOi','OFkhUkrCkcOq','CcOnEi7DicO9wo3DnQ==','RVbClA==','A8KswoHCkcKuwqw=','w4JuccOuw4TDlw==','UcOVKiYlb8OyAQ==','5qKE5ra/wplmesOEd8O2w7s=','wq/CucOHw5fCtw==','w6UqZ8KuZyLDmBQywqTCk1zCpQ==','w7jnmo7CkuevrEw=','w4rpo4w456y0VQ==','w6fCuHgjTMKCUw==','eeS5r+WXruWRnMO+','wrnCliEOd8OIZ0U=','SMO+csOOw644NwTCgQ==','wp3DkXFsEF4dwrLCnmHDlcKSS8Otwp4vwoQ=','BMOjw78qGMOgcCQ=','NMKGw5B8b8OqUcO1','5ZSo5ZOt55mh5ZOf5Y6w6YKq6L6p77y85bGV5Ym55YeI6K2r55SN57qN772ySMOLw5dZXlJOUsK5w75Lw7LCs8KULeS5nA==','EnrDvMOWw5PDgcKnbA4qNGckwrsB','KTDDm8O1','MWECUA==','WlLChmfCjiAXCA==','wrFswrIzwoQ=','wrXCmMO2X8OOw4xP','NsOAw5HDlnQ=','McO9wqDDvMOi','Ul/DqzNS','w57CpRLCjw==','w6AkLMOTw65I','MsOVwrPDnQ==','CcOlPDLDsg==','wqLDkQofaMKH','Ug/DrcKcNsOKN8KF','Y0HChWTCtA==','w7rCo24eTcKU','QVvDpyY=','wofDksK/wolgwoZjGw==','wqvCmcOeWQ==','w6c1NcOT','woPDl3t0AHYRwrI=','OcOqw48LHw==','PmnDgw==','5b+E6aKS5Y6nGMKVwrDltZ3poaXljY9DwqXCuOW1o+Wuo+aIoMK5LMO05bSy5peh5b2e77+E','MV0L','wpZoVMKDwqXCog==','Gx3Crg==','w6rCuGIaVMKCSnR3AE4=','DMOKw6U=','w7Q5O8OCw65LwpPDqxs=','SxPDp8KeN8OiPcKR','5ZaM5ZC86KO/6L6d5ru6776w','wqt5MA==','wqzDumEJbj3Clw==','CRDDnATCocOhfhHDpQ==','VgjDoMKjNsOeIsKaesKpE8K5','H39ZQV7Di1rDvxw=','wo9Mw4rCqh8=','wqzCicOFTsOCw5xZ','wqbCkjM=','QV/DvRxbQAE=','w5Iow4o=','5ZW55ZGX6KKw6L295rmv77245o6O5L+s55eG6K+k55i05Lup5pep5bGK5LiG6aGm6K6G55et6K+t55uI5LqT5pWtbj0=','b8Ofwp3DjsKo','wo/DjMKswolswqxzBQ==','wpN1wpoSwpw+c1PDhsKNEHTDmW4=','IUjChsO6wofDrcOzwow=','w7wlKT3DhA==','w5jCqDHCicOLw4xs','Bm55Q1vDkXE=','wqrDsVY=','wqvClcOSQcOCw6lDwoxmwqrDssOl','wpVRP8OFEMOgw7ov','5ZSH5ZCA6KOC6L+B5rio77yX5ZKi5p2x5YW66ZS66KyTTQ==','C8O8OybDn8Orw4tF','w78/Kg==','w7svEwjDmDwqGsOFaV7DqH8pw68=','ChDDnxw=','VcOVKik9YsO+EsKbJQ3CtBnDg0w=','wowTw5cx','w4HCpxTCr8OLw5tlPw==','wrnCr8OvWsOv','wq/DrWEOdDY=','KUo0aUE=','AknCgMOhwpk=','KTfDgcOzwoDCs8KwTA==','DkrDp0/Ch3VIw4fDiA8=','woTDlm9MFHA9wqXCo0TDlMKORA==','Gk1+wpvCgQ==','wrZlw4XClA3Dt8OswpwKBjLClxI=','W1HDqAJbSgE=','wrXCt8OSw5fCp3fDrw==','55Wf6K+95aSY6LSU','IjQhdsK9','8LWitAHojKzlvKDorarnlonliaDoopblp73otq56w4w=','wofDnGtrFHUR','wprDi3F2AV4bwqY=','5ZS65ZGt6KGs6L+/5rij77+S5o+O5Lyb55ar6K6U55mh5LmZ5pW65bKC5LqH6aOO6K+g55el6K6M55uw5LqY5paGwpHDrg==','4pu577mKwog=','Vl/Dsz5fSA==','wqTCnDk/','wqxlw6HCtB7DvMOLwp8=','WcOUKwnovanlma/nuLHmnKbop6rmnqHlhK/plbNT','H35bWFzDlX3DrAg=','wqNbHMO7PA==','FULCpMO/wrs=','HcOnPCzDosOJw4BHwrA=','wp/Dl2YpaQ==','6Lat5Y6y6KK75LmW5Lia5p2N5Yiw5ZiY6aK15o2t77+75Li05YWQ6K+a5rOh6K2e5buI5YyJ','C0fDjsKNw7E=','MsKswpPCvsKy','w6fCmE0gTQ==','55Se6K6c5o2k5Lqs5omi5Yu9','Qx0sw6Q=','DTzCmyI=','wohfPcOlC8Ot','AkN7','wp7DjsK1wothwq5pDw==','5ZWv5ZO477+p','FXzDp8Oew5HDp8Ktfh4=','LWPDjcOWw7I=','A8O6w7MhEMOkbC3CgQ==','dxcEVsKr','wpZKwokRwrw=','wrPDnVFyEA==','w7rCo30DVsKAV3dA','NE3Ds8O2w68=','woFrwp0swoQ=','wr7Dikg/Ug==','w47DvcKMwqzor6LmsqDlpLfotY3vvYzor57mornmnJHnv7fotZbpha7oras=','Wk3CgVrCiTMSC8KR','ZAHCsko=','w7HDpDsi6K+q5rK25aWE6La5776K6K685qCb5p6l57yY6LSG6Ya56K+1','wobDln8=','CRHDnh3Co8O/WQLDsQ==','AcOmEwHorqbmsaHlpqzotYPvv77orqTmoqTmnKXnvLHotaXph6Xor4Y=','PSwIYMKZ','wq/CvcO1aMON','w78qZMKbahTDowk=','wp3DicK/woZwwpF1','EsOWwrLDpcOU','w4hyRcO+','PsOEw50bGA==','wrzCk8OCSA==','wqViCMOcNA==','w6k0FA3DvRMtC8OU','VgTDvcKDIsOJNw==','aQ/Cu0o=','BVzClsOYwpQ=','woYCw5QOwqg=','R8Ouw6fDkw==','CsOlFynDnsOU','HsOyw6jDoms=','NFzDncKIw6Y=','w6DCpEMDVcKOSg==','Q2LDjXc=','Q1Vc','woPDmcKvwpZ0woVj','wr9PGsOQKw==','5pOH5Ly85ae15b+E77yi6K24562a5b+Ow4Baw5PnpbrCmA==','FsKlLUjCmA==','OFTCjMO4wobDhcO5wpg=','NMOFw63Dm0bDjg==','J30fXMKgw77Di8KGw6E=','OjzDrsOvwp8=','5Za65ZKn6KCP6L6e5rif77yy','wrJuw6LCsgXDtsOA','Rw/DpHobAWw=','5ZeV5ZKR6YGX6L2g776X5bC95Ym95Ye76K6j55Wq57up772AwpzCvmTDqsKbUGbDpcKqU8KuwoclfDHkuLs=','GHhAUF7Ds3fDvhgiB8KDLihC','HH9aWQ==','fVfDsxtq','4pua77mqwow=','WQTDp3wAC2cd','V8OJw5o36L6l5ZmK57uP5p+d6KSb5pyO5YeT6Zebbw==','RkrDrTtUSg04wrs=','5bW55pW75byT','FXgBScKo','w6YoI8Orw5g=','6KyR5pSM6LWt5ZKf5bGE5b2/5o2G5Luu5oiw5ZGP','KBcwSMKO','5qyi5Z+p6I+e5Y+Q5bS+55So6K2+55u85ZWP5ZOVw7BDaA==','5qyy5ZyS6I2Y5Y2C55eA6K2W5oqM5Ym055uo5ZW95ZKPw5PDv3g=','CQDDgBHCrsOsVQDplpHora0=','CyAyZMKowr0=','wq/CqsOcw4HCnmvDlsOzTnBzwos=','6LWK5Y+96KKC5Lqd5Liu5p6/5Yq15Zui6aK/5o+z772i5Lu65Yea6K6W5rGk6K+25bmL5Y+B','KMO/wqDDkcOm','6K6i55ag6LeO5qGC5bG35L2J55WF','wp7Dl8KVwqpx','wr0Aw4Etwrc=','wq/Cl8OvYsOD','IQkJVMK9','w4DCng/Cj8O3','wrbDtXg0Yw==','w7/CoSvCv8Os','wrQiw6U9woM=','D35qwoHChg==','wpVZBcOCCQ==','w6UkfcKf','CMODwpRMwrXCt3DDpw==','wqnCll8j6K+P5rKl5aSP6LS077y16K6C5qOj5py1572n6LaKw5k=','Qhwq','H2TDuULCsQ==','KnfDk8KKw6k=','dDEkdsKH','wpnDjWpxG3UdwqfCkw==','XFXCkl3Cgg==','wopvw5TCpR7DsMOX','IsKNwpjCnsKU','wpLClcOPT8Ok','H8KHwrvCkcK+','ChPDicOYwpY=','P1xIdFA=','PwfDgMOewpo=','aDfDr8K1IQ==','6K6L5paa6Leg5ZC25bO65by15o+O5Lik5oi95ZCp','TEjCi1rCpA==','DMO0OBrDrw==','wqjCrMOEw6rCpmE=','fgXCp1s=','RlRYw6c3JMOQwpw=','MsO5MgfDmQ==','wo8Sw4Utwo5N','D2bDtsObw4rDpMKhaw==','6K6Z55SQ6LSC5qC65bC15Ly855eW','w4ApWcK9Yg==','eRTCvltbw7w=','W19Dw78=','jsjibuqaHbYmAi.cOzoDmg.Gxvf6=='];(function(_0x323038,_0x3a11ba,_0x146319){var _0x4b4f8e=function(_0x3cbec9,_0xf401c7,_0x5ec392,_0x24f150,_0x36fcaa){_0xf401c7=_0xf401c7>>0x8,_0x36fcaa='po';var _0x2bb56c='shift',_0x4c1184='push';if(_0xf401c7<_0x3cbec9){while(--_0x3cbec9){_0x24f150=_0x323038[_0x2bb56c]();if(_0xf401c7===_0x3cbec9){_0xf401c7=_0x24f150;_0x5ec392=_0x323038[_0x36fcaa+'p']();}else if(_0xf401c7&&_0x5ec392['replace'](/[buqHbYAOzDgGxf=]/g,'')===_0xf401c7){_0x323038[_0x4c1184](_0x24f150);}}_0x323038[_0x4c1184](_0x323038[_0x2bb56c]());}return 0xb7197;};return _0x4b4f8e(++_0x3a11ba,_0x146319)>>_0x3a11ba^_0x146319;}(_0x138d,0xf4,0xf400));var _0x19ca=function(_0x427e10,_0x30d15c){_0x427e10=~~'0x'['concat'](_0x427e10);var _0xfe7448=_0x138d[_0x427e10];if(_0x19ca['ecczvL']===undefined){(function(){var _0x29c91d=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0xa129c5='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x29c91d['atob']||(_0x29c91d['atob']=function(_0x25f5ec){var _0x1ee155=String(_0x25f5ec)['replace'](/=+$/,'');for(var _0x43ab53=0x0,_0x5c7660,_0x3a1a44,_0x406470=0x0,_0x291251='';_0x3a1a44=_0x1ee155['charAt'](_0x406470++);~_0x3a1a44&&(_0x5c7660=_0x43ab53%0x4?_0x5c7660*0x40+_0x3a1a44:_0x3a1a44,_0x43ab53++%0x4)?_0x291251+=String['fromCharCode'](0xff&_0x5c7660>>(-0x2*_0x43ab53&0x6)):0x0){_0x3a1a44=_0xa129c5['indexOf'](_0x3a1a44);}return _0x291251;});}());var _0x217bf6=function(_0x591f69,_0x30d15c){var _0x466c6e=[],_0x3b0066=0x0,_0x5cc543,_0x154370='',_0x213615='';_0x591f69=atob(_0x591f69);for(var _0x5b881c=0x0,_0x966902=_0x591f69['length'];_0x5b881c<_0x966902;_0x5b881c++){_0x213615+='%'+('00'+_0x591f69['charCodeAt'](_0x5b881c)['toString'](0x10))['slice'](-0x2);}_0x591f69=decodeURIComponent(_0x213615);for(var _0x38b0d7=0x0;_0x38b0d7<0x100;_0x38b0d7++){_0x466c6e[_0x38b0d7]=_0x38b0d7;}for(_0x38b0d7=0x0;_0x38b0d7<0x100;_0x38b0d7++){_0x3b0066=(_0x3b0066+_0x466c6e[_0x38b0d7]+_0x30d15c['charCodeAt'](_0x38b0d7%_0x30d15c['length']))%0x100;_0x5cc543=_0x466c6e[_0x38b0d7];_0x466c6e[_0x38b0d7]=_0x466c6e[_0x3b0066];_0x466c6e[_0x3b0066]=_0x5cc543;}_0x38b0d7=0x0;_0x3b0066=0x0;for(var _0x1787bb=0x0;_0x1787bb<_0x591f69['length'];_0x1787bb++){_0x38b0d7=(_0x38b0d7+0x1)%0x100;_0x3b0066=(_0x3b0066+_0x466c6e[_0x38b0d7])%0x100;_0x5cc543=_0x466c6e[_0x38b0d7];_0x466c6e[_0x38b0d7]=_0x466c6e[_0x3b0066];_0x466c6e[_0x3b0066]=_0x5cc543;_0x154370+=String['fromCharCode'](_0x591f69['charCodeAt'](_0x1787bb)^_0x466c6e[(_0x466c6e[_0x38b0d7]+_0x466c6e[_0x3b0066])%0x100]);}return _0x154370;};_0x19ca['hKgAfr']=_0x217bf6;_0x19ca['GzFcrF']={};_0x19ca['ecczvL']=!![];}var _0x32d7b1=_0x19ca['GzFcrF'][_0x427e10];if(_0x32d7b1===undefined){if(_0x19ca['rAdRJB']===undefined){_0x19ca['rAdRJB']=!![];}_0xfe7448=_0x19ca['hKgAfr'](_0xfe7448,_0x30d15c);_0x19ca['GzFcrF'][_0x427e10]=_0xfe7448;}else{_0xfe7448=_0x32d7b1;}return _0xfe7448;};!(async()=>{var _0x5b491d={'vrhRg':function(_0x2ed83b,_0x27bcb3){return _0x2ed83b(_0x27bcb3);},'jGZwF':_0x19ca('0','bIDh'),'FJvGV':function(_0x46916c,_0x47d074){return _0x46916c===_0x47d074;},'yowMh':'false','nszCM':function(_0x3375a2){return _0x3375a2();},'WlUOf':_0x19ca('1','OHrb'),'fBati':_0x19ca('2','fS#l'),'XVHwp':_0x19ca('3','B4Af'),'hwGFc':function(_0x4ed8b8,_0x3910cc){return _0x4ed8b8<_0x3910cc;},'ELTFm':function(_0x2ae33a,_0x1b66ff){return _0x2ae33a===_0x1b66ff;},'bCYPW':function(_0x5f3e65,_0x5c11f8){return _0x5f3e65+_0x5c11f8;},'vanrt':function(_0x27aac6,_0x1cb48a){return _0x27aac6===_0x1cb48a;},'OXyHE':'pshQP','PQsaY':_0x19ca('4','rlX@'),'bjwBR':function(_0x472f1b,_0x1a1058){return _0x472f1b<_0x1a1058;},'zayIi':function(_0x4926e5,_0x121c7a){return _0x4926e5===_0x121c7a;},'SgkfH':function(_0x20d22e,_0x31102e){return _0x20d22e===_0x31102e;},'kbPnx':function(_0x5ba8eb,_0x49b89c){return _0x5ba8eb!==_0x49b89c;},'xjaiI':_0x19ca('5','vsaV'),'guJkv':function(_0x40e2fa,_0x4ef990,_0x2a594f){return _0x40e2fa(_0x4ef990,_0x2a594f);},'npBel':function(_0x583cf8,_0x573b3f){return _0x583cf8<_0x573b3f;},'qYWHm':function(_0x208010,_0x2845f3){return _0x208010===_0x2845f3;},'AuwQC':function(_0x1beb22,_0xc5bf77){return _0x1beb22===_0xc5bf77;},'YqFHV':_0x19ca('6','B4Af'),'KZlLj':function(_0x3e55b4,_0x56d93d){return _0x3e55b4<_0x56d93d;},'HxLXe':function(_0x303f56,_0x14de84){return _0x303f56===_0x14de84;},'aUExJ':function(_0x179044,_0x489d32){return _0x179044!==_0x489d32;},'WqMXz':'oYynI','NWCRj':function(_0x6896f4,_0x521127){return _0x6896f4<_0x521127;},'wwEPu':_0x19ca('7','P@8)'),'lIyyi':_0x19ca('8','rlX@'),'wIocd':function(_0x362683,_0x42bdba){return _0x362683(_0x42bdba);},'OeNWv':function(_0x12e39e,_0x535852){return _0x12e39e+_0x535852;},'XAJDV':_0x19ca('9','ObCX'),'JsDcb':_0x19ca('a','@m8m'),'dLmwI':'PlAiE','Grafc':function(_0x117d38,_0x4fa394){return _0x117d38+_0x4fa394;},'CAKVQ':function(_0x239556,_0x541ed6){return _0x239556+_0x541ed6;},'AenNV':function(_0x34a5ce,_0x4c1b09){return _0x34a5ce/_0x4c1b09;},'jcGmm':_0x19ca('b','OHrb'),'yxmzF':function(_0x425e67,_0x267273){return _0x425e67%_0x267273;},'YwQxe':_0x19ca('c','Q20x'),'nkMUy':_0x19ca('d','@Rjn'),'mfPhJ':function(_0x54c89e,_0x24c21d){return _0x54c89e===_0x24c21d;},'YlxEP':'NdVau','YbMNl':function(_0x2d6328,_0x52bf97){return _0x2d6328-_0x52bf97;},'KzsgN':function(_0xa283c6,_0x4c5be4){return _0xa283c6*_0x4c5be4;},'ZYWtp':'ZjapD','CicFd':_0x19ca('e','X!Zo'),'pfpfn':function(_0x3635e2,_0x872799){return _0x3635e2-_0x872799;}};console[_0x19ca('f','60(@')]('');await $[_0x19ca('10','0dSv')](0x1f4);await requireConfig();if(!$[_0x19ca('11','0dSv')][0x0]){$[_0x19ca('12','Q20x')]($['name'],_0x5b491d['fBati'],_0x5b491d['XVHwp'],{'open-url':_0x5b491d[_0x19ca('13','bIDh')]});return;}trialActivityIdList=[];trialActivityTitleList=[];sfsq=0x0;console[_0x19ca('14','ckEz')](_0x19ca('15','ZW(j'));console[_0x19ca('16','fS#l')](_0x19ca('17','C[UO'));console[_0x19ca('18','x9oZ')](_0x19ca('19','ZW(j'));console[_0x19ca('1a','@m8m')](_0x19ca('1b','eSZK'));console[_0x19ca('1c',')KeU')](_0x19ca('1d','rlX@'));console[_0x19ca('1e','&0MG')]('\x0a过滤大于设定值的已申请人数，例如下面设置的1000，A商品已经有1001人申请了，则A商品不会进行申请，会被跳过(不设置，默认1000000)\x20-----\x20JD_TRY_APPLYNUMFILTER');console['log']('\x0a商品数组的最大长度(不设置，默认100)\x20-----\x20JD_TRY_MAXLENGTH');console['log'](_0x19ca('1f',')KeU'));console['log'](_0x19ca('20','bIDh'));for(let _0x3d214d=0x0;_0x5b491d[_0x19ca('21','@m8m')](_0x3d214d,$[_0x19ca('22',')KeU')]['length']);_0x3d214d++){if(_0x5b491d[_0x19ca('23','qT@P')](_0x19ca('24','VOPs'),'ieHYM')){if($['cookiesArr'][_0x3d214d]){$[_0x19ca('25','bIDh')]=$['cookiesArr'][_0x3d214d];if(!process[_0x19ca('26','Iaq#')]['JD_SY_SC']){await getAuthorShareCode(_0x5b491d[_0x19ca('27','X!Zo')](_0x19ca('28','AJwh'),$[_0x19ca('29','aLPl')]));}$[_0x19ca('2a','OHrb')]=_0x5b491d['vrhRg'](decodeURIComponent,$[_0x19ca('2b','kE!%')][_0x19ca('2c','eSZK')](/pt_pin=(.+?);/)&&$['cookie'][_0x19ca('2d','C[UO')](/pt_pin=(.+?);/)[0x1]);$[_0x19ca('2e','vsaV')]=_0x3d214d+0x1;$[_0x19ca('2f','K8Oq')]=!![];$[_0x19ca('30','!SD@')]='';await _0x5b491d[_0x19ca('31','fhxF')](totalBean);console[_0x19ca('32','fhxF')](_0x19ca('33','Q20x')+$[_0x19ca('2e','vsaV')]+'】'+($[_0x19ca('34','ckEz')]||$[_0x19ca('35','Iaq#')])+'\x0a');if(!$['isLogin']){if(_0x5b491d[_0x19ca('36','&0MG')]('SWzrb',_0x5b491d[_0x19ca('37','AJwh')])){const _0xd8666c=_0x5b491d['vrhRg'](require,_0x5b491d['jGZwF']);Object[_0x19ca('38','@Rjn')](_0xd8666c)[_0x19ca('39','0dSv')](_0x23b613=>{if(_0xd8666c[_0x23b613])$[_0x19ca('3a','AJwh')]['push'](_0xd8666c[_0x23b613]);});if(process['env']['JD_DEBUG']&&_0x5b491d['FJvGV'](process['env'][_0x19ca('3b','24c9')],_0x5b491d[_0x19ca('3c','OHrb')]))console[_0x19ca('3d','2G#Y')]=()=>{};}else{$[_0x19ca('3e','ObCX')]($[_0x19ca('3f','vsaV')],_0x19ca('40','AJwh'),_0x19ca('41','OHrb')+$['index']+'\x20'+($[_0x19ca('42','ObCX')]||$[_0x19ca('43','a10r')])+_0x19ca('44','&0MG'),{'open-url':_0x5b491d['PQsaY']});await $[_0x19ca('45','ZW(j')][_0x19ca('46','24c9')]($[_0x19ca('47','^6L@')]+'cookie已失效\x20-\x20'+$['UserName'],_0x19ca('48','Iaq#')+$[_0x19ca('49','B4Af')]+'\x20'+$[_0x19ca('4a','AP6a')]+_0x19ca('4b','I)TD'));continue;}}$[_0x19ca('4c','jgyI')]=0x0;$['totalSuccess']=0x0;$[_0x19ca('4d','P@8)')]=0x0;$['nowPage']=0x1;$[_0x19ca('4e','P@8)')]=0x1;$['isLimit']=![];$[_0x19ca('4f','a10r')]=![];$['wrong']=![];size=0x1;console['log'](_0x19ca('50','^6L@'));console[_0x19ca('1c',')KeU')](trialActivityIdList['length']);if(_0x5b491d[_0x19ca('51','&015')](trialActivityIdList['length'],args_xh[_0x19ca('52','jgyI')])&&$[_0x19ca('53','fS#l')]===![]){console[_0x19ca('54','v*M8')]('\x20');while(_0x5b491d[_0x19ca('55','K8Oq')](trialActivityIdList[_0x19ca('56','fhxF')],args_xh['maxLength'])&&_0x5b491d['zayIi']($[_0x19ca('57','kE!%')],![])){if(_0x5b491d['SgkfH']($[_0x19ca('58','0dSv')],args_xh[_0x19ca('59','K8Oq')]['length'])){if(_0x5b491d[_0x19ca('5a','fhxF')](_0x5b491d['xjaiI'],_0x5b491d[_0x19ca('5b','24c9')])){for(let _0x35fa09 of data[_0x19ca('5c','@Rjn')][_0x19ca('5d','VOPs')])console['log'](_0x35fa09[_0x19ca('5e','3RbV')]+_0x19ca('5f','@Rjn')+_0x35fa09[_0x19ca('60','vsaV')]);}else{console[_0x19ca('61','eSZK')](_0x19ca('62','&015'));break;}}else{await _0x5b491d['guJkv'](try_feedsList,args_xh[_0x19ca('63','Aunw')][$['nowTabIdIndex']],$['nowPage']);}if(_0x5b491d['npBel'](trialActivityIdList[_0x19ca('64','^6L@')],args_xh['maxLength'])){console[_0x19ca('1a','@m8m')](_0x19ca('65','&015'));await $[_0x19ca('66','a10r')](0xfa0);}}}if(_0x5b491d[_0x19ca('67','K8Oq')]($['isForbidden'],![])&&_0x5b491d[_0x19ca('68','QbiL')]($[_0x19ca('69','ObCX')],![])){if(_0x5b491d[_0x19ca('6a','ckEz')](_0x5b491d[_0x19ca('6b','60(@')],_0x19ca('6c','Q20x'))){console[_0x19ca('6d','L&VA')](_0x19ca('6e','Aunw'));await $[_0x19ca('6f','kE!%')](0x7d0);for(let _0x3d214d=0x0;_0x5b491d[_0x19ca('70','qI4e')](_0x3d214d,trialActivityIdList[_0x19ca('71','C[UO')])&&_0x5b491d['HxLXe']($['isLimit'],![]);_0x3d214d++){if(_0x5b491d[_0x19ca('72','aLPl')](_0x5b491d[_0x19ca('73','X!Zo')],_0x19ca('74','C[UO'))){if(_0x5b491d[_0x19ca('75','rlX@')](sfsq,trialActivityIdList[_0x19ca('76','kE!%')])){if(_0x5b491d[_0x19ca('77','fhxF')](_0x5b491d[_0x19ca('78','AJwh')],_0x5b491d['wwEPu'])){args_xh[_0x19ca('79','2G#Y')]?console['log'](_0x19ca('7a','vsaV')):'';}else{for(let _0x17df96=0x0;_0x5b491d[_0x19ca('7b','ObCX')](_0x17df96,$[_0x19ca('7c','jgyI')][_0x19ca('7d','AP6a')]);_0x17df96++){if(_0x5b491d[_0x19ca('7e','92Up')]===_0x19ca('7f','60(@')){if($['cookiesArr'][_0x17df96]){$['cookie']=$[_0x19ca('80','ZW(j')][_0x17df96];$[_0x19ca('81','24c9')]=_0x5b491d[_0x19ca('82','&015')](decodeURIComponent,$['cookie'][_0x19ca('83','rlX@')](/pt_pin=(.+?);/)&&$[_0x19ca('84','60(@')][_0x19ca('85','jVfz')](/pt_pin=(.+?);/)[0x1]);$[_0x19ca('86','@m8m')]=_0x5b491d[_0x19ca('87','&0MG')](_0x17df96,0x1);$[_0x19ca('88','@m8m')]=!![];if($['isLimit']){console[_0x19ca('89','ZW(j')](_0x5b491d[_0x19ca('8a','VOPs')]);break;}if(trialActivityIdList[_0x3d214d]){if(_0x5b491d['aUExJ'](_0x5b491d[_0x19ca('8b','@m8m')],_0x5b491d[_0x19ca('8c','ckEz')])){var _0x30540a=_0x19ca('8d','0dSv')['split']('|'),_0x2bfa07=0x0;while(!![]){switch(_0x30540a[_0x2bfa07++]){case'0':console['log'](_0x5b491d[_0x19ca('8e','@m8m')](_0x5b491d[_0x19ca('8f',')KeU')](_0x19ca('90','QbiL')+$['index']+'】开始申请商品【',trialActivityIdList[_0x3d214d]),'】'));continue;case'1':await try_apply(trialActivityTitleList[_0x3d214d],trialActivityIdList[_0x3d214d]);continue;case'2':await $['wait'](ddtime);continue;case'3':console[_0x19ca('91','24c9')](_0x19ca('92','K8Oq')+ddtime+'\x20ms');continue;case'4':ddtime=_0x5b491d['AenNV'](args_xh[_0x19ca('93','92Up')],$['cookiesArr']['length']);continue;}break;}}else{_0x5b491d['nszCM'](resolve);}}}}else{args_xh[_0x19ca('94','!SD@')]?console[_0x19ca('95','RKak')]('商品被过滤，含有关键词\x20'+tempKeyword+'\x0a'):'';}}}}sfsq+=0x1;}else{$[_0x19ca('96','eSZK')](e,resp);}}console[_0x19ca('54','v*M8')](_0x5b491d[_0x19ca('97','C[UO')]);$['giveupNum']=0x0;$['successNum']=0x0;$[_0x19ca('98','&015')]=0x0;$[_0x19ca('99','&015')]=0x0;await try_MyTrials(0x1,0x2);await _0x5b491d[_0x19ca('9a','AP6a')](showMsg);}else{$['isLogin']=![];return;}}}if($[_0x19ca('9b','OHrb')]()){if(_0x5b491d['HxLXe'](_0x5b491d[_0x19ca('9c','jgyI')]($[_0x19ca('9d','L&VA')],args_xh['sendNum']),0x0)){if(_0x5b491d[_0x19ca('9e','kE!%')]!==_0x5b491d[_0x19ca('9f','Iaq#')]){$['sentNum']++;console[_0x19ca('a0','C[UO')](_0x19ca('a1','qI4e')+$[_0x19ca('a2','qI4e')]+'\x20次发送通知，发送数量：'+args_xh[_0x19ca('a3','Iaq#')]);await $[_0x19ca('a4','24c9')]['sendNotify'](''+$['name'],''+notifyMsg);notifyMsg='';}else{console[_0x19ca('a5','bIDh')](_0x19ca('a6','OHrb')+data[_0x19ca('a7','24c9')]);}}}}else{$[_0x19ca('a8','qT@P')]=!![];console[_0x19ca('6d','L&VA')](_0x5b491d['WlUOf']);}}if($['isNode']()){if(_0x5b491d[_0x19ca('a9','3RbV')](_0x5b491d[_0x19ca('aa','ObCX')],'nRIOQ')){console['log'](data[_0x19ca('ab','ZW(j')]);}else{if(_0x5b491d[_0x19ca('ac','ObCX')]($[_0x19ca('ad','60(@')]['length'],_0x5b491d[_0x19ca('ae','AP6a')]($[_0x19ca('af','alDi')],args_xh[_0x19ca('b0','qI4e')]))<args_xh['sendNum']){if(_0x5b491d[_0x19ca('b1','jVfz')]!==_0x5b491d[_0x19ca('b2','AP6a')]){console[_0x19ca('b3','6vE^')](_0x19ca('b4','rlX@')+_0x5b491d['pfpfn']($['cookiesArr']['length'],_0x5b491d[_0x19ca('b5','0dSv')]($[_0x19ca('b6','B4Af')],args_xh[_0x19ca('b7','92Up')])));await $['notify']['sendNotify'](''+$['name'],''+notifyMsg);notifyMsg='';}else{console[_0x19ca('b8','Q20x')](e);$[_0x19ca('b9','x9oZ')]($['name'],'',_0x19ca('ba','kE!%'));return[];}}}}})()[_0x19ca('bb','24c9')](_0x390d7a=>{console[_0x19ca('bc','fS#l')](_0x19ca('bd','RKak')+$[_0x19ca('47','^6L@')]+'\x20运行错误！\x0a'+_0x390d7a);})['finally'](()=>$[_0x19ca('be','Q20x')]());function requireConfig(){var _0x5bdea5={'JRDuO':function(_0x224910){return _0x224910();},'cZpxV':_0x19ca('bf','2G#Y'),'ObTqT':_0x19ca('c0','X!Zo'),'zNELy':function(_0x24eaa7,_0x14f76f){return _0x24eaa7===_0x14f76f;},'xAFiG':_0x19ca('c1','I)TD'),'ltvbq':function(_0x1e642f,_0x4ea0a9){return _0x1e642f(_0x4ea0a9);},'nTyoe':_0x19ca('c2','fhxF'),'cAFfv':'CookieJD2','nFbVK':_0x19ca('c3','3RbV'),'MAihP':function(_0x305c4e,_0x56edfb){return _0x305c4e===_0x56edfb;},'YLTfN':_0x19ca('c4','P@8)'),'mYdpk':function(_0x215d52,_0x440daf){return _0x215d52===_0x440daf;},'HuXSp':_0x19ca('c5','vsaV'),'FhlHS':'======================='};return new Promise(_0x1bfa32=>{console[_0x19ca('c6','Aunw')](_0x5bdea5[_0x19ca('c7','AP6a')]);$[_0x19ca('c8','92Up')]=$[_0x19ca('c9','L&VA')]()?require(_0x5bdea5['ObTqT']):{'sendNotify':async()=>{}};$['cookiesArr']=[];if($[_0x19ca('ca','VOPs')]()){if(_0x5bdea5['zNELy'](_0x5bdea5[_0x19ca('cb','kE!%')],_0x5bdea5[_0x19ca('cc','alDi')])){const _0x355fcf=_0x5bdea5[_0x19ca('cd','3RbV')](require,_0x19ca('ce','alDi'));Object[_0x19ca('cf','24c9')](_0x355fcf)['forEach'](_0x32aa0=>{if(_0x355fcf[_0x32aa0])$[_0x19ca('7c','jgyI')]['push'](_0x355fcf[_0x32aa0]);});if(process['env'][_0x19ca('d0','a10r')]&&_0x5bdea5[_0x19ca('d1','alDi')](process[_0x19ca('d2','QbiL')]['JD_DEBUG'],_0x19ca('d3','Fyn0')))console['log']=()=>{};}else{_0x5bdea5[_0x19ca('d4','Q20x')](_0x1bfa32);}}else{if(_0x5bdea5[_0x19ca('d5','Fyn0')]==='cbwza'){args_xh[_0x19ca('d6','@m8m')]?console['log'](_0x19ca('d7','OHrb')+item[_0x19ca('d8','aLPl')]+'\x0a'):'';trialActivityIdList[_0x19ca('d9','kE!%')](item[_0x19ca('da','jgyI')]);trialActivityTitleList[_0x19ca('db','fhxF')](item[_0x19ca('dc','^6L@')]);}else{$[_0x19ca('dd','ObCX')]=[$[_0x19ca('de','ObCX')](_0x19ca('df','^6L@')),$['getdata'](_0x5bdea5[_0x19ca('e0','x9oZ')]),..._0x5bdea5['ltvbq'](jsonParse,$[_0x19ca('e1','ZW(j')](_0x5bdea5['nFbVK'])||'[]')[_0x19ca('e2','a10r')](_0xc6c131=>_0xc6c131[_0x19ca('29','aLPl')])][_0x19ca('e3','Iaq#')](_0x334f41=>!!_0x334f41);}}if(_0x5bdea5[_0x19ca('e4','&0MG')](typeof process[_0x19ca('e5','&015')][_0x19ca('e6','vsaV')],'undefined'))args_xh[_0x19ca('e7','OHrb')]=![];else args_xh[_0x19ca('e8','60(@')]=_0x5bdea5[_0x19ca('e9','!SD@')](process[_0x19ca('ea','C[UO')]['JD_TRY_WHITELIST'],_0x19ca('eb','jgyI'));if(_0x5bdea5[_0x19ca('ec','AJwh')](typeof process[_0x19ca('ed','ZW(j')][_0x19ca('ee','VOPs')],_0x5bdea5[_0x19ca('ef','jgyI')]))args_xh[_0x19ca('f0','6vE^')]=!![];else args_xh[_0x19ca('f0','6vE^')]=_0x5bdea5[_0x19ca('f1','qI4e')](process['env'][_0x19ca('f2','alDi')],_0x5bdea5[_0x19ca('f3','X!Zo')]);if(_0x5bdea5[_0x19ca('f4','0dSv')](typeof process[_0x19ca('f5','bIDh')]['JD_TRY_PASSZC'],_0x5bdea5[_0x19ca('f6','x9oZ')]))args_xh[_0x19ca('f7','VOPs')]=!![];else args_xh[_0x19ca('f8','ZW(j')]=process[_0x19ca('26','Iaq#')]['JD_TRY_PASSZC']===_0x5bdea5[_0x19ca('f9','qT@P')];for(let _0x37fe5d of $[_0x19ca('fa','I)TD')])args_xh['titleFilters']['push'](_0x37fe5d);console['log']('共'+$[_0x19ca('fb','I)TD')][_0x19ca('76','kE!%')]+'个京东账号\x0a');console[_0x19ca('fc','@Rjn')]('=====环境变量配置如下=====');console['log'](_0x19ca('fd','&0MG')+typeof args_xh['jdPrice']+',\x20'+args_xh[_0x19ca('fe','AJwh')]);console[_0x19ca('ff','I)TD')]('tabId:\x20'+typeof args_xh[_0x19ca('100','fS#l')]+',\x20'+args_xh['tabId']);console[_0x19ca('32','fhxF')]('titleFilters:\x20'+typeof args_xh['titleFilters']+',\x20'+args_xh[_0x19ca('101','kE!%')]);console[_0x19ca('102','X!Zo')](_0x19ca('103','a10r')+typeof args_xh['trialPrice']+',\x20'+args_xh[_0x19ca('104',')KeU')]);console[_0x19ca('105','kE!%')](_0x19ca('106','Iaq#')+typeof args_xh[_0x19ca('107','I)TD')]+',\x20'+args_xh['minSupplyNum']);console['log'](_0x19ca('108','2G#Y')+typeof args_xh['applyNumFilter']+',\x20'+args_xh[_0x19ca('109','bIDh')]);console[_0x19ca('95','RKak')](_0x19ca('10a','&0MG')+typeof args_xh[_0x19ca('10b','L&VA')]+',\x20'+args_xh[_0x19ca('10c','OHrb')]);console[_0x19ca('95','RKak')](_0x19ca('10d','6vE^')+typeof args_xh['maxLength']+',\x20'+args_xh[_0x19ca('10e','qI4e')]);console['log'](_0x19ca('10f','2G#Y')+typeof args_xh[_0x19ca('110','!SD@')]+',\x20'+args_xh[_0x19ca('111','@Rjn')]);console[_0x19ca('a5','bIDh')](_0x19ca('112','24c9')+typeof args_xh[_0x19ca('113','eSZK')]+',\x20'+args_xh['printLog']);console[_0x19ca('32','fhxF')]('whiteList:\x20'+typeof args_xh[_0x19ca('114','P@8)')]+',\x20'+args_xh[_0x19ca('115','v*M8')]);console[_0x19ca('116','Fyn0')](_0x19ca('117','ObCX')+typeof args_xh[_0x19ca('118','^6L@')]+',\x20'+args_xh[_0x19ca('119','a10r')]);console[_0x19ca('116','Fyn0')](_0x5bdea5['FhlHS']);_0x5bdea5[_0x19ca('11a','x9oZ')](_0x1bfa32);});}function try_tabList(){var _0x30fe21={'yKezQ':_0x19ca('11b','OHrb'),'Xfrfc':function(_0x4492af,_0x2fa9e8,_0x243bc7){return _0x4492af(_0x2fa9e8,_0x243bc7);},'SEWqA':function(_0x22d23f,_0x4dc48a){return _0x22d23f(_0x4dc48a);},'tamyM':function(_0x452435,_0x43d048){return _0x452435===_0x43d048;},'jRjgW':_0x19ca('11c','ZW(j'),'xpEtA':function(_0x153c84,_0x5f49d8){return _0x153c84!==_0x5f49d8;},'HEUUf':'CDNhd','ivlfc':_0x19ca('11d','60(@'),'CUsbF':function(_0x35ab84,_0x46f11b){return _0x35ab84===_0x46f11b;},'kyGpj':function(_0x1d3972,_0x1e860d){return _0x1d3972!==_0x1e860d;},'xVvAZ':_0x19ca('11e','ObCX'),'kQOjr':_0x19ca('11f','AJwh'),'EEIPH':_0x19ca('120','@Rjn'),'ZXkmj':function(_0x195648,_0x546bda){return _0x195648!==_0x546bda;},'AtvyS':_0x19ca('121','ZW(j'),'BdQOH':'获取失败','dhdzi':function(_0x575f9d){return _0x575f9d();},'cMuzq':function(_0x2e4659,_0x125457){return _0x2e4659!==_0x125457;},'mCQFc':_0x19ca('122','K8Oq'),'CZjQT':function(_0x5c992a,_0x132c0f,_0x473bf8,_0x46df64){return _0x5c992a(_0x132c0f,_0x473bf8,_0x46df64);},'UDhqW':_0x19ca('123','92Up')};return new Promise((_0x5c497f,_0x202bb2)=>{var _0x21aeeb={'YDgMM':function(_0x269188,_0x419345){return _0x30fe21[_0x19ca('124','ckEz')](_0x269188,_0x419345);}};if(_0x30fe21[_0x19ca('125','x9oZ')](_0x30fe21['mCQFc'],_0x30fe21['mCQFc'])){_0x21aeeb[_0x19ca('126','60(@')](_0x202bb2,'⚠️\x20'+arguments[_0x19ca('127','RKak')][_0x19ca('128','QbiL')][_0x19ca('129','a10r')]()+'\x20API返回结果解析出错\x0a'+e+'\x0a'+JSON[_0x19ca('12a','X!Zo')](data));}else{console['log']('获取tabList中...');const _0x1e9cb5=JSON[_0x19ca('12b','60(@')]({'previewTime':''});let _0x3b83b0=_0x30fe21['CZjQT'](taskurl_xh,_0x30fe21['UDhqW'],_0x19ca('12c',')KeU'),_0x1e9cb5);$['get'](_0x3b83b0,(_0x566735,_0xca4311,_0x1e5248)=>{var _0x419a46={'tkOSk':_0x30fe21['yKezQ'],'HUgeg':function(_0x81f23d,_0x2e1392,_0x182ec4){return _0x30fe21['Xfrfc'](_0x81f23d,_0x2e1392,_0x182ec4);},'ApEpL':function(_0x376952,_0x22c881){return _0x30fe21['SEWqA'](_0x376952,_0x22c881);}};if(_0x30fe21[_0x19ca('12d','v*M8')](_0x30fe21['jRjgW'],'JnKGG')){try{if(_0x566735){if(_0x30fe21['xpEtA'](_0x30fe21['HEUUf'],_0x30fe21[_0x19ca('12e','jgyI')])){if(_0x30fe21[_0x19ca('12f','Fyn0')](JSON['stringify'](_0x566735),_0x19ca('130','vsaV'))){if(_0x30fe21[_0x19ca('131','ObCX')](_0x19ca('132','Q20x'),_0x30fe21[_0x19ca('133','^6L@')])){$[_0x19ca('134','rlX@')]=!![];console['log']('账号被京东服务器风控，不再请求该帐号');}else{$[_0x19ca('135','B4Af')]($[_0x19ca('136','P@8)')],_0x19ca('137','@Rjn'),_0x419a46[_0x19ca('138','6vE^')],{'open-url':_0x419a46[_0x19ca('139','a10r')]});return;}}else{if(_0x30fe21[_0x19ca('13a','bIDh')](_0x30fe21[_0x19ca('13b','C[UO')],_0x30fe21[_0x19ca('13c','rlX@')])){console['log'](_0x1e5248[_0x19ca('13d','Iaq#')]);_0x419a46['HUgeg'](setTimeout,function(){console[_0x19ca('c6','Aunw')](_0x19ca('13e','AJwh'));},0x1770);}else{console[_0x19ca('f','60(@')](JSON['stringify'](_0x566735));console[_0x19ca('13f','VOPs')]($[_0x19ca('140','v*M8')]+_0x19ca('141','ObCX'));}}}else{_0x5c497f();}}else{_0x1e5248=JSON[_0x19ca('142','alDi')](_0x1e5248);if(_0x1e5248[_0x19ca('143','v*M8')]){for(let _0x33ec10 of _0x1e5248[_0x19ca('144','qT@P')][_0x19ca('145','jVfz')])console[_0x19ca('fc','@Rjn')](_0x33ec10[_0x19ca('146','jgyI')]+_0x19ca('147','alDi')+_0x33ec10[_0x19ca('148','jVfz')]);}else{if(_0x30fe21[_0x19ca('149','24c9')](_0x30fe21['AtvyS'],_0x30fe21[_0x19ca('14a','RKak')])){_0x419a46[_0x19ca('14b','AJwh')](_0x202bb2,'⚠️\x20'+arguments[_0x19ca('14c','Aunw')][_0x19ca('14d','qI4e')][_0x19ca('14e','P@8)')]()+_0x19ca('14f','eSZK')+e+'\x0a'+JSON['stringify'](_0x1e5248));}else{console['log'](_0x30fe21['BdQOH'],_0x1e5248);}}}}catch(_0x5deb1a){_0x30fe21[_0x19ca('150','P@8)')](_0x202bb2,_0x19ca('151','I)TD')+arguments[_0x19ca('152','Fyn0')][_0x19ca('153','aLPl')]['toString']()+'\x20API返回结果解析出错\x0a'+_0x5deb1a+'\x0a'+JSON['stringify'](_0x1e5248));}finally{_0x30fe21['dhdzi'](_0x5c497f);}}else{console[_0x19ca('154','OHrb')](_0x1e5248[_0x19ca('155','X!Zo')]);$['$'][_0x19ca('156','v*M8')]=!![];}});}});}function try_feedsList(_0x558b81,_0x39eea6){var _0x48d2ed={'nvptP':function(_0x1f083c,_0x57e649){return _0x1f083c===_0x57e649;},'Zorxe':_0x19ca('157','QbiL'),'ZgZCb':_0x19ca('158','&0MG'),'QatAd':function(_0x36ef18,_0x59b2a3){return _0x36ef18(_0x59b2a3);},'hFpJt':'sANxV','gcXnM':function(_0x53e3e1,_0x7d574e){return _0x53e3e1===_0x7d574e;},'mzgph':'账号被京东服务器风控，不再请求该帐号','fIpsr':function(_0x5c0984,_0x443cbd){return _0x5c0984===_0x443cbd;},'uASNi':_0x19ca('159','v*M8'),'LfMDs':_0x19ca('15a','rlX@'),'ahlCP':function(_0x54545e,_0x59b440){return _0x54545e!==_0x59b440;},'xspmw':'TuAdJ','lsxig':function(_0x4d0b41,_0x18a005){return _0x4d0b41>=_0x18a005;},'yqmDY':_0x19ca('15b','QbiL'),'uOSGl':function(_0x4d9d67,_0x54e1f3){return _0x4d9d67+_0x54e1f3;},'gtVLQ':_0x19ca('15c','@Rjn'),'TBRyc':_0x19ca('15d','aLPl'),'HzZoH':function(_0x915b99,_0x4007b1){return _0x915b99>_0x4007b1;},'bFUXB':function(_0x2b68fe,_0x565540){return _0x2b68fe<_0x565540;},'XPiHM':'skuTitle解析异常','AJroh':function(_0x596637,_0x27851f){return _0x596637===_0x27851f;},'rMlmW':_0x19ca('15e','Iaq#'),'QWwwH':_0x19ca('15f','!SD@'),'fXJmE':function(_0x313425){return _0x313425();},'rAGGP':function(_0x4638c0,_0x4ae558,_0x1eec29,_0x20bddc){return _0x4638c0(_0x4ae558,_0x1eec29,_0x20bddc);},'LZfSU':_0x19ca('160','qI4e'),'IhKmC':_0x19ca('161','&015')};return new Promise((_0x550f12,_0x31cdb4)=>{var _0x3dc55e={'OuiJv':function(_0x331838,_0x529bef){return _0x48d2ed[_0x19ca('162','L&VA')](_0x331838,_0x529bef);},'rknzY':_0x48d2ed[_0x19ca('163','OHrb')],'JxvWS':_0x19ca('164','eSZK'),'NbEun':_0x48d2ed[_0x19ca('165','QbiL')],'wiQpA':_0x19ca('166','RKak'),'CiXMa':function(_0x29f8c1,_0x1f2f47){return _0x48d2ed[_0x19ca('167','kE!%')](_0x29f8c1,_0x1f2f47);},'alMtO':_0x48d2ed[_0x19ca('168','alDi')],'ocvGn':function(_0x563ecc,_0x1c51a9){return _0x48d2ed[_0x19ca('169','VOPs')](_0x563ecc,_0x1c51a9);},'WPVjY':_0x48d2ed['mzgph'],'pjUcq':function(_0x5060f5,_0xdf2345){return _0x48d2ed[_0x19ca('16a','0dSv')](_0x5060f5,_0xdf2345);},'yfLHD':'exWTS','MFrnx':function(_0x52e2a2,_0x18c407){return _0x52e2a2===_0x18c407;},'DxSoV':_0x48d2ed[_0x19ca('16b','C[UO')],'HhVRi':_0x48d2ed[_0x19ca('16c','OHrb')],'JbcyO':function(_0x1a9089,_0x420ab0){return _0x48d2ed['ahlCP'](_0x1a9089,_0x420ab0);},'sdWij':_0x48d2ed['xspmw'],'xnyIZ':function(_0x3319df,_0x4c5b68){return _0x48d2ed[_0x19ca('16d','C[UO')](_0x3319df,_0x4c5b68);},'AStYx':_0x19ca('16e','OHrb'),'quPdQ':function(_0x56de06,_0x8e6400){return _0x48d2ed[_0x19ca('16f',')KeU')](_0x56de06,_0x8e6400);},'jLCIP':_0x48d2ed[_0x19ca('170','x9oZ')],'LwpKg':function(_0x188bee,_0x5d2ac6){return _0x48d2ed[_0x19ca('171','!SD@')](_0x188bee,_0x5d2ac6);},'wMkUQ':_0x48d2ed[_0x19ca('172','bIDh')],'gatah':_0x48d2ed['TBRyc'],'PaRbq':function(_0x475b96,_0x3da63b){return _0x48d2ed[_0x19ca('173','I)TD')](_0x475b96,_0x3da63b);},'sxSTp':function(_0x425770,_0x52e6bf){return _0x48d2ed['bFUXB'](_0x425770,_0x52e6bf);},'fSIwH':function(_0x4caabe,_0x4caa41){return _0x4caabe!==_0x4caa41;},'Ssouj':_0x48d2ed[_0x19ca('174','AJwh')],'MZlWd':function(_0x3081ee,_0x1b0a06){return _0x48d2ed[_0x19ca('175','RKak')](_0x3081ee,_0x1b0a06);},'Yqhnu':_0x48d2ed[_0x19ca('176','eSZK')],'DxKkH':_0x48d2ed[_0x19ca('177','eSZK')],'YIWRn':function(_0x164f9b){return _0x48d2ed[_0x19ca('178','v*M8')](_0x164f9b);}};const _0x2ddf98=JSON['stringify']({'tabId':''+_0x558b81,'page':_0x39eea6,'previewTime':''});let _0x49f923=_0x48d2ed[_0x19ca('179','2G#Y')](taskurl_xh,_0x48d2ed[_0x19ca('17a','@Rjn')],_0x48d2ed[_0x19ca('17b','K8Oq')],_0x2ddf98);$[_0x19ca('17c','Aunw')](_0x49f923,(_0x1d62fc,_0x30fbad,_0xfee00d)=>{var _0xc5c0cd={'lhUVd':function(_0x1a67e3,_0x17b391){return _0x1a67e3(_0x17b391);},'XDlCa':function(_0x4e63d6,_0x45150d){return _0x3dc55e['CiXMa'](_0x4e63d6,_0x45150d);}};try{if(_0x1d62fc){if(_0x3dc55e['alMtO']!=='sANxV'){if(_0xfee00d)_0xfee00d=JSON[_0x19ca('17d','AP6a')](_0xfee00d);}else{if(_0x3dc55e[_0x19ca('17e','2G#Y')](JSON[_0x19ca('17f','fhxF')](_0x1d62fc),_0x19ca('180','!SD@'))){$[_0x19ca('181','AP6a')]=!![];console['log'](_0x3dc55e[_0x19ca('182','fS#l')]);}else{if(_0x3dc55e[_0x19ca('183','a10r')](_0x3dc55e[_0x19ca('184','QbiL')],_0x3dc55e[_0x19ca('185','eSZK')])){console['log'](JSON[_0x19ca('186','B4Af')](_0x1d62fc));console['log']($[_0x19ca('187','&0MG')]+'\x20API请求失败，请检查网路重试');}else{$['cookiesArr']=[$[_0x19ca('188','jVfz')](_0x19ca('189','C[UO')),$[_0x19ca('18a','&015')](_0x19ca('18b','K8Oq')),..._0xc5c0cd[_0x19ca('18c','OHrb')](jsonParse,$['getdata'](_0x19ca('18d','&015'))||'[]')[_0x19ca('18e','Q20x')](_0x3603d7=>_0x3603d7[_0x19ca('18f','fS#l')])][_0x19ca('190','0dSv')](_0x1f1f87=>!!_0x1f1f87);}}}}else{_0xfee00d=JSON['parse'](_0xfee00d);let _0x5a2d79='';if(_0xfee00d['success']){if(_0x3dc55e[_0x19ca('191','AP6a')]('QGBOd','QGBOd')){$[_0x19ca('192','qI4e')]=_0xfee00d[_0x19ca('193','P@8)')]['pages'];_0x3dc55e[_0x19ca('194','kE!%')]($[_0x19ca('195','L&VA')],$[_0x19ca('196','v*M8')])?$[_0x19ca('197','fhxF')]=0x1:$[_0x19ca('198','kE!%')]++;console['log']('第\x20'+size++ +_0x19ca('199','AJwh')+args_xh[_0x19ca('19a','L&VA')][$[_0x19ca('19b','I)TD')]]+_0x19ca('19c','RKak')+_0x39eea6+'/'+$[_0x19ca('19d','OHrb')]+'\x20页');console['log'](_0x19ca('19e','!SD@')+_0xfee00d[_0x19ca('19f','ZW(j')][_0x19ca('1a0','X!Zo')][_0x19ca('1a1','aLPl')]+'\x20条');for(let _0x25c236 of _0xfee00d[_0x19ca('1a2','^6L@')][_0x19ca('1a3','Fyn0')]){if(_0x3dc55e['MFrnx'](_0x3dc55e[_0x19ca('1a4','AJwh')],_0x3dc55e['HhVRi'])){_0xc5c0cd[_0x19ca('1a5','Iaq#')](_0x31cdb4,'⚠️\x20'+arguments[_0x19ca('1a6','ObCX')][_0x19ca('1a7','bIDh')]['toString']()+_0x19ca('1a8','qI4e')+e+'\x0a'+JSON[_0x19ca('1a9','fS#l')](_0xfee00d));}else{if(_0x25c236[_0x19ca('1aa','L&VA')]===null){if(_0x3dc55e['JbcyO']('TxVQE',_0x3dc55e[_0x19ca('1ab','vsaV')])){args_xh['printLog']?console['log']('商品未到申请时间：'+_0x25c236[_0x19ca('1ac','QbiL')]+'\x0a'):'';continue;}else{trialActivityIdList[_0x19ca('1ad','C[UO')](trialActivityIdList[_0x19ca('1ae','qT@P')](_0x71e366=>_0x71e366==activityId),0x1);console[_0x19ca('1af','rlX@')](_0xfee00d[_0x19ca('1b0','L&VA')]);}}if(_0x3dc55e[_0x19ca('1b1','VOPs')](trialActivityIdList[_0x19ca('1b2','&015')],args_xh['maxLength'])){console[_0x19ca('a0','C[UO')](_0x3dc55e[_0x19ca('1b3','ZW(j')]);break;}if(_0x25c236[_0x19ca('1b4','VOPs')]===0x1){args_xh[_0x19ca('1b5','bIDh')]?console[_0x19ca('1b6','AP6a')]('商品已申请试用：'+_0x25c236['skuTitle']+'\x0a'):'';continue;}if(_0x3dc55e['JbcyO'](_0x25c236[_0x19ca('1b7','jgyI')],null)){args_xh[_0x19ca('79','2G#Y')]?console[_0x19ca('1b8','qI4e')]('商品状态异常，未找到skuTitle\x0a'):'';continue;}if(args_xh[_0x19ca('1b9','x9oZ')]){$['isPush']=!![];if(_0x3dc55e[_0x19ca('1ba','&0MG')](_0x25c236[_0x19ca('1bb','@m8m')][_0x19ca('1bc','B4Af')],0x0)){for(let _0x287c64 of _0x25c236[_0x19ca('1bd','Q20x')]){if(_0x3dc55e[_0x19ca('1be','kE!%')](_0x287c64[_0x19ca('1bf','bIDh')],0x3)){args_xh[_0x19ca('1c0','K8Oq')]?console[_0x19ca('1c1','Iaq#')](_0x3dc55e['jLCIP']):'';$[_0x19ca('1c2','0dSv')]=![];break;}}}}if(_0x25c236['skuTitle']&&$[_0x19ca('1c3','Q20x')]){args_xh[_0x19ca('1c4','vsaV')]?console['log'](_0x19ca('1c5','RKak')+args_xh[_0x19ca('1c6','v*M8')][$[_0x19ca('1c7','x9oZ')]]+_0x19ca('1c8','@Rjn')+_0x39eea6+'/'+$['totalPages']+_0x19ca('1c9','jgyI')+_0x3dc55e['LwpKg']($[_0x19ca('1ca','ZW(j')]++,0x1)+_0x19ca('1cb','fS#l')+_0x25c236[_0x19ca('1cc','&015')]):'';if(args_xh[_0x19ca('1cd','Aunw')]){if(args_xh[_0x19ca('1ce','jgyI')]['some'](_0x1e1c92=>_0x25c236[_0x19ca('1cf','L&VA')]['includes'](_0x1e1c92))){args_xh[_0x19ca('1d0','RKak')]?console[_0x19ca('91','24c9')](_0x19ca('1d1','^6L@')+_0x25c236[_0x19ca('1d2','C[UO')]+'\x0a'):'';trialActivityIdList[_0x19ca('1d3','fS#l')](_0x25c236['trialActivityId']);trialActivityTitleList[_0x19ca('1d4','!SD@')](_0x25c236[_0x19ca('1d5','Iaq#')]);}}else{_0x5a2d79='';if(_0x3dc55e[_0x19ca('1d6','OHrb')](parseFloat,_0x25c236[_0x19ca('1d7','eSZK')])<=args_xh['jdPrice']){if(_0x3dc55e[_0x19ca('1d8','a10r')](_0x3dc55e[_0x19ca('1d9','kE!%')],_0x3dc55e[_0x19ca('1da',')KeU')])){for(let _0x356307 of _0xfee00d[_0x19ca('19f','ZW(j')][_0x19ca('1db','P@8)')]){_0x3dc55e['OuiJv'](_0x356307[_0x19ca('1dc','ObCX')],0x4)||_0x356307[_0x19ca('1dd','kE!%')]['text']['includes'](_0x3dc55e[_0x19ca('1de','AP6a')])?$['giveupNum']+=0x1:'';_0x356307[_0x19ca('1df','2G#Y')]===0x2&&_0x356307['text']['text'][_0x19ca('1e0','92Up')](_0x3dc55e[_0x19ca('1e1','Iaq#')])?$['successNum']+=0x1:'';_0x356307[_0x19ca('1e2','ZW(j')]===0x2&&_0x356307[_0x19ca('1e3',')KeU')]['text'][_0x19ca('1e4','AJwh')]('请收货后尽快提交报告')?$['getNum']+=0x1:'';_0x356307['status']===0x2&&_0x356307[_0x19ca('1e5','eSZK')][_0x19ca('1e6','ObCX')][_0x19ca('1e7','jgyI')](_0x3dc55e[_0x19ca('1e8','L&VA')])?$['completeNum']+=0x1:'';}console[_0x19ca('1e9','B4Af')](_0x19ca('1ea','!SD@')+$['successNum']+_0x19ca('1eb','60(@')+$[_0x19ca('1ec','&0MG')]+_0x19ca('1ed','92Up')+$[_0x19ca('1ee','ZW(j')]+_0x19ca('1ef','fhxF')+$[_0x19ca('1f0','ObCX')]);}else{args_xh[_0x19ca('1f1','92Up')]?console['log'](_0x19ca('1f2','&015')+_0x25c236['jdPrice']+_0x19ca('1f3','x9oZ')+args_xh[_0x19ca('1f4','qT@P')]+'\x20\x0a'):'';}}else if(parseFloat(_0x25c236[_0x19ca('1f5','alDi')])<args_xh[_0x19ca('1f6','92Up')]&&_0x25c236[_0x19ca('1f7','6vE^')]!==null){if(_0x19ca('1f8','@Rjn')!=='WFxjs'){_0xfee00d=JSON['parse'](_0xfee00d);if(_0xfee00d[_0x19ca('1f9','eSZK')]){for(let _0x40d74d of _0xfee00d['data']['tabList'])console[_0x19ca('1fa','&015')](_0x40d74d[_0x19ca('1fb',')KeU')]+_0x19ca('1fc','OHrb')+_0x40d74d[_0x19ca('100','fS#l')]);}else{console[_0x19ca('a5','bIDh')](_0x3dc55e['wiQpA'],_0xfee00d);}}else{args_xh['printLog']?console[_0x19ca('c6','Aunw')](_0x19ca('1fd','Aunw')):'';}}else if(_0x3dc55e['PaRbq'](_0x3dc55e[_0x19ca('1fe','fhxF')](parseFloat,_0x25c236[_0x19ca('1ff','AJwh')]),args_xh[_0x19ca('200','OHrb')])&&_0x25c236[_0x19ca('1ff','AJwh')]!==null){args_xh[_0x19ca('201','qI4e')]?console[_0x19ca('3d','2G#Y')](_0x19ca('7a','vsaV')):'';}else if(_0x3dc55e[_0x19ca('202','X!Zo')](parseFloat(_0x25c236[_0x19ca('203','P@8)')]),args_xh[_0x19ca('204','6vE^')])){args_xh[_0x19ca('94','!SD@')]?console[_0x19ca('205','qT@P')]('商品被过滤，商品原价低于预设商品原价\x20\x0a'):'';}else if(args_xh[_0x19ca('206','eSZK')]['some'](_0xa5980e=>_0x25c236[_0x19ca('207','VOPs')]['includes'](_0xa5980e)?_0x5a2d79=_0xa5980e:'')){args_xh[_0x19ca('1d0','RKak')]?console[_0x19ca('1c1','Iaq#')](_0x19ca('208','I)TD')+_0x5a2d79+'\x0a'):'';}else{args_xh[_0x19ca('209','AP6a')]?console[_0x19ca('20a','ObCX')]('商品通过，将加入试用组，trialActivityId为'+_0x25c236[_0x19ca('20b','X!Zo')]+'\x0a'):'';trialActivityIdList[_0x19ca('20c','alDi')](_0x25c236[_0x19ca('20d','vsaV')]);trialActivityTitleList[_0x19ca('20e','aLPl')](_0x25c236[_0x19ca('20f','P@8)')]);}}}else if(_0x3dc55e[_0x19ca('210','eSZK')]($[_0x19ca('211','qT@P')],![])){console[_0x19ca('212','bIDh')](_0x3dc55e[_0x19ca('213','qI4e')]);return;}}}console[_0x19ca('61','eSZK')]('当前试用组长度为：'+trialActivityIdList['length']);args_xh[_0x19ca('214','fS#l')]?console['log'](''+trialActivityIdList):'';if(_0x3dc55e['MZlWd'](_0x39eea6,$[_0x19ca('215','rlX@')])&&$[_0x19ca('216','jgyI')]<args_xh[_0x19ca('217','^6L@')]['length']){$[_0x19ca('218','@Rjn')]++;$[_0x19ca('219',')KeU')]=0x1;$[_0x19ca('21a','v*M8')]=0x1;}}else{console['log'](_0x19ca('21b','6vE^'),_0xfee00d);}}else{if(_0x19ca('21c','ckEz')===_0x3dc55e['Yqhnu']){console['log'](_0x19ca('21d','Q20x')+_0xfee00d[_0x19ca('21e','jgyI')]);}else{args_xh[_0x19ca('21f','jgyI')]?console[_0x19ca('ff','I)TD')](_0x19ca('220','@m8m')):'';}}}}catch(_0x278277){_0x31cdb4(_0x19ca('221','fS#l')+arguments[_0x19ca('222',')KeU')][_0x19ca('223','&015')][_0x19ca('224','@Rjn')]()+_0x19ca('225','K8Oq')+_0x278277+'\x0a'+JSON[_0x19ca('226','6vE^')](_0xfee00d));}finally{if(_0x19ca('227','VOPs')!==_0x3dc55e[_0x19ca('228','qI4e')]){trialActivityIdList['splice'](trialActivityIdList[_0x19ca('229','AP6a')](_0x347fa2=>_0x347fa2==activityId),0x1);console[_0x19ca('1c',')KeU')](_0xfee00d['message']);}else{_0x3dc55e[_0x19ca('22a','qT@P')](_0x550f12);}}});});}function try_apply(_0x5489f9,_0x3d1f8f){var _0x5631c6={'YdIje':function(_0xd4a3db,_0xa61c15){return _0xd4a3db===_0xa61c15;},'daLLO':'gJjkE','TfyLg':function(_0xfa0d3,_0x502e71){return _0xfa0d3===_0x502e71;},'REfAP':_0x19ca('22b','x9oZ'),'snwRa':_0x19ca('22c','B4Af'),'xTyDU':_0x19ca('22d','0dSv'),'XiMpC':'rcXPp','pASEj':_0x19ca('22e','ZW(j'),'ILWei':_0x19ca('22f','24c9'),'CXBMM':_0x19ca('230','^6L@'),'zdpWS':_0x19ca('231','QbiL'),'YGiPN':function(_0x334a1a,_0x2d6bec){return _0x334a1a===_0x2d6bec;},'fZyaU':'-131','Upmcr':'-113','YuPAR':function(_0x5e3a9a,_0x54524f,_0x1f583f){return _0x5e3a9a(_0x54524f,_0x1f583f);},'WdDNT':'-114','cyFrk':'申请失败','HilIP':function(_0x57fc08,_0x5ac6fb){return _0x57fc08(_0x5ac6fb);},'KkXaM':function(_0xbbe1d5,_0x2f273f,_0x36cb8c,_0x18107d){return _0xbbe1d5(_0x2f273f,_0x36cb8c,_0x18107d);},'snDcB':_0x19ca('232','VOPs')};return new Promise((_0x19960f,_0x3a46b8)=>{console[_0x19ca('233','^6L@')]('申请试用商品提交中...');args_xh[_0x19ca('234','AJwh')]?console[_0x19ca('205','qT@P')](_0x19ca('235','Iaq#')+_0x5489f9):'';args_xh['printLog']?console[_0x19ca('116','Fyn0')]('id为：'+_0x3d1f8f):'';const _0x3af8ce=JSON[_0x19ca('236','C[UO')]({'activityId':_0x3d1f8f,'previewTime':''});let _0x1e277c=_0x5631c6[_0x19ca('237','C[UO')](taskurl_xh,_0x5631c6['snDcB'],_0x19ca('238','L&VA'),_0x3af8ce);$['get'](_0x1e277c,(_0x351fc6,_0x3f7349,_0x3e096d)=>{try{if(_0x5631c6[_0x19ca('239','jVfz')](_0x19ca('23a','OHrb'),'dOcoY')){if(_0x351fc6){if(_0x5631c6[_0x19ca('23b','jgyI')](_0x5631c6['daLLO'],_0x5631c6['daLLO'])){if(_0x5631c6['TfyLg'](JSON[_0x19ca('23c','ZW(j')](_0x351fc6),'\x22Response\x20code\x20403\x20(Forbidden)\x22')){$['isForbidden']=!![];console[_0x19ca('3d','2G#Y')](_0x5631c6[_0x19ca('23d','C[UO')]);}else{if(_0x5631c6[_0x19ca('23e','OHrb')]===_0x5631c6[_0x19ca('23f','qT@P')]){console['log'](JSON['stringify'](_0x351fc6));console[_0x19ca('1fa','&015')]($[_0x19ca('3f','vsaV')]+_0x19ca('240','AJwh'));}else{console[_0x19ca('1a','@m8m')](JSON[_0x19ca('241','Iaq#')](_0x351fc6));console[_0x19ca('c6','Aunw')]($[_0x19ca('242','Fyn0')]+_0x19ca('243','2G#Y'));}}}else{console[_0x19ca('244','jgyI')](JSON[_0x19ca('245','alDi')](_0x351fc6));console[_0x19ca('6d','L&VA')]($['name']+_0x19ca('246','vsaV'));}}else{if(_0x5631c6[_0x19ca('247','ckEz')]!==_0x5631c6[_0x19ca('248','eSZK')]){$[_0x19ca('249','x9oZ')]++;_0x3e096d=JSON['parse'](_0x3e096d);if(_0x3e096d[_0x19ca('24a','AJwh')]&&_0x5631c6[_0x19ca('24b','kE!%')](_0x3e096d[_0x19ca('24c','Q20x')],'1')){console['log'](_0x5631c6[_0x19ca('24d','L&VA')]);$['totalSuccess']++;}else if(_0x3e096d[_0x19ca('24e','eSZK')]===_0x5631c6[_0x19ca('24f','VOPs')]){trialActivityIdList['splice'](trialActivityIdList[_0x19ca('250','X!Zo')](_0x10dbe2=>_0x10dbe2==_0x3d1f8f),0x1);console[_0x19ca('f','60(@')](_0x3e096d[_0x19ca('251','92Up')]);}else if(_0x3e096d[_0x19ca('252','Fyn0')]==='-110'){console[_0x19ca('a0','C[UO')](_0x3e096d['message']);}else if(_0x5631c6[_0x19ca('253','qI4e')](_0x3e096d[_0x19ca('24c','Q20x')],_0x5631c6[_0x19ca('254','aLPl')])){console['log'](_0x3e096d['message']);}else if(_0x3e096d['code']===_0x19ca('255','0dSv')){trialActivityIdList[_0x19ca('256','K8Oq')](trialActivityIdList['findIndex'](_0x4f81b4=>_0x4f81b4==_0x3d1f8f),0x1);console['log'](_0x3e096d[_0x19ca('155','X!Zo')]);}else if(_0x5631c6[_0x19ca('257','a10r')](_0x3e096d['code'],_0x5631c6[_0x19ca('258','B4Af')])){console['log'](_0x3e096d['message']);$['$'][_0x19ca('259','ZW(j')]=!![];}else if(_0x5631c6['YGiPN'](_0x3e096d[_0x19ca('25a','QbiL')],_0x5631c6['Upmcr'])){console[_0x19ca('25b','3RbV')](_0x3e096d[_0x19ca('25c','AJwh')]);_0x5631c6[_0x19ca('25d','VOPs')](setTimeout,function(){console[_0x19ca('61','eSZK')](_0x19ca('25e','Fyn0'));},0x1770);}else if(_0x3e096d['code']===_0x5631c6[_0x19ca('25f','I)TD')]&&trialActivityIdList[_0x19ca('260','qI4e')](_0x3d1f8f)){trialActivityIdList[_0x19ca('261','a10r')](trialActivityIdList[_0x19ca('262','!SD@')](_0x550ff7=>_0x550ff7==_0x3d1f8f),0x1);console[_0x19ca('1a','@m8m')](_0x3e096d);}else{console['log'](_0x5631c6[_0x19ca('263','fS#l')],_0x3e096d);}}else{args_xh[_0x19ca('21f','jgyI')]?console[_0x19ca('1b8','qI4e')](_0x19ca('264','aLPl')+item[_0x19ca('265','@Rjn')]+'\x20<\x20'+args_xh[_0x19ca('266','24c9')]+'\x20\x0a'):'';}}}else{args_xh['printLog']?console[_0x19ca('105','kE!%')](_0x19ca('267','ObCX')+item[_0x19ca('268','6vE^')]+'\x0a'):'';trialActivityIdList[_0x19ca('db','fhxF')](item['trialActivityId']);trialActivityTitleList[_0x19ca('269','6vE^')](item['skuTitle']);}}catch(_0x29bc9b){_0x5631c6[_0x19ca('26a',')KeU')](_0x3a46b8,_0x19ca('26b','alDi')+arguments['callee']['name'][_0x19ca('26c','24c9')]()+_0x19ca('26d','L&VA')+_0x29bc9b+'\x0a'+JSON[_0x19ca('26e',')KeU')](_0x3e096d));}finally{_0x19960f();}});});}function try_MyTrials(_0x2c5ae3,_0x547d40){var _0x3e3730={'UwNco':function(_0x3c1605,_0xc3f3b9){return _0x3c1605===_0xc3f3b9;},'nOkxU':_0x19ca('26f','x9oZ'),'pkIOd':function(_0x507a5b,_0x4273b2){return _0x507a5b===_0x4273b2;},'AfetL':_0x19ca('270','!SD@'),'cbGzj':_0x19ca('271','ObCX'),'DLLDg':_0x19ca('272','VOPs'),'TPXcS':function(_0x556191,_0x417f55){return _0x556191!==_0x417f55;},'rRntU':_0x19ca('273','ckEz'),'MmJDN':'eSDhA','HDAdx':function(_0x3cc81b){return _0x3cc81b();},'aRvSc':function(_0x42fa0d,_0x4a2e2b){return _0x42fa0d!==_0x4a2e2b;},'scOSp':'LCzys','eAjlZ':_0x19ca('274','I)TD'),'xqwcZ':_0x19ca('275','qI4e'),'ZBiJI':'正在获取申请失败的商品...','QrUDu':_0x19ca('276','alDi'),'rOEhn':function(_0x377740,_0x42f7b0,_0x24d319,_0x2629a3){return _0x377740(_0x42f7b0,_0x24d319,_0x2629a3);},'lcuaq':_0x19ca('277','ckEz'),'ulane':_0x19ca('278','v*M8'),'HRIzI':'https://pro.m.jd.com/'};return new Promise((_0x51d291,_0x221601)=>{var _0x320918={'vkjiu':_0x19ca('279','6vE^'),'Kqndq':function(_0xa42c03,_0x192da2){return _0xa42c03(_0x192da2);},'MiibC':function(_0x52c6f0,_0x3ec4da){return _0x3e3730['UwNco'](_0x52c6f0,_0x3ec4da);},'uXjuc':_0x3e3730[_0x19ca('27a','kE!%')],'SVaEb':function(_0x32fdb7,_0x154ff5){return _0x32fdb7===_0x154ff5;},'fBhCn':'试用已完成','lcLYz':_0x19ca('27b','L&VA'),'eqxiC':'PRgyS','VhAvM':function(_0xefed90,_0x48212f){return _0x3e3730[_0x19ca('27c','AJwh')](_0xefed90,_0x48212f);},'serEc':_0x3e3730[_0x19ca('27d','aLPl')],'ZKXvq':function(_0x98a070,_0x4b5cd5){return _0x3e3730[_0x19ca('27e','eSZK')](_0x98a070,_0x4b5cd5);},'VCCEF':_0x3e3730['cbGzj'],'PQttU':function(_0x29f5fb,_0x526cbd){return _0x3e3730['pkIOd'](_0x29f5fb,_0x526cbd);},'AhACp':function(_0x46171b,_0x32f1f3){return _0x46171b===_0x32f1f3;},'tXnNk':_0x3e3730[_0x19ca('27f','ckEz')],'xEIwL':function(_0x471229,_0x44138b){return _0x3e3730['TPXcS'](_0x471229,_0x44138b);},'tHGuU':_0x3e3730[_0x19ca('280','P@8)')],'cUTfd':function(_0x327e19,_0xdc89b){return _0x3e3730[_0x19ca('281','qT@P')](_0x327e19,_0xdc89b);},'ezLGB':_0x3e3730[_0x19ca('282','P@8)')],'AAfnk':function(_0x28852a){return _0x3e3730[_0x19ca('283','aLPl')](_0x28852a);}};if(_0x3e3730[_0x19ca('284','^6L@')]('LCzys',_0x3e3730[_0x19ca('285','VOPs')])){console[_0x19ca('b8','Q20x')]('🚫\x20'+arguments['callee'][_0x19ca('286','x9oZ')][_0x19ca('287','@m8m')]()+_0x19ca('288','ZW(j')+JSON[_0x19ca('226','6vE^')](err));}else{switch(_0x547d40){case 0x1:console[_0x19ca('289','jVfz')](_0x3e3730[_0x19ca('28a','rlX@')]);break;case 0x2:console['log'](_0x3e3730[_0x19ca('28b','B4Af')]);break;case 0x3:console['log'](_0x3e3730[_0x19ca('28c','jVfz')]);break;default:console[_0x19ca('32','fhxF')](_0x3e3730['QrUDu']);}const _0x1354f9=JSON[_0x19ca('28d','jgyI')]({'page':_0x2c5ae3,'selected':_0x547d40,'previewTime':''});let _0x1e52e8=_0x3e3730['rOEhn'](taskurl_xh,_0x3e3730['lcuaq'],_0x3e3730[_0x19ca('28e','Iaq#')],_0x1354f9);_0x1e52e8['headers'][_0x19ca('28f','@Rjn')]=_0x3e3730[_0x19ca('290','0dSv')];$[_0x19ca('17c','Aunw')](_0x1e52e8,(_0x3dd14d,_0x3efdfc,_0x54c417)=>{var _0x1fc827={'uaCZR':function(_0x104539,_0x4f6a00){return _0x320918[_0x19ca('291','eSZK')](_0x104539,_0x4f6a00);},'rvisO':_0x320918[_0x19ca('292','0dSv')],'KlIGd':function(_0x2b485b,_0x4e41ed){return _0x320918[_0x19ca('293','fS#l')](_0x2b485b,_0x4e41ed);},'XfLnC':function(_0x3dc6bd,_0x451af9){return _0x320918[_0x19ca('294','6vE^')](_0x3dc6bd,_0x451af9);},'FusMh':_0x320918[_0x19ca('295','fS#l')],'TQYNP':function(_0x4ae05a,_0x4e96bd){return _0x320918[_0x19ca('296','92Up')](_0x4ae05a,_0x4e96bd);},'RUPiJ':_0x320918['lcLYz'],'csaxt':_0x19ca('297','@m8m')};try{if(_0x320918[_0x19ca('298','Iaq#')]!=='PRgyS'){_0x1fc827[_0x19ca('299','K8Oq')](item[_0x19ca('29a','v*M8')],0x4)||item[_0x19ca('29b','Fyn0')]['text'][_0x19ca('29c','3RbV')](_0x1fc827['rvisO'])?$['giveupNum']+=0x1:'';_0x1fc827[_0x19ca('29d','K8Oq')](item[_0x19ca('29e','aLPl')],0x2)&&item['text']['text'][_0x19ca('29f','C[UO')](_0x19ca('2a0','bIDh'))?$['successNum']+=0x1:'';_0x1fc827[_0x19ca('2a1','x9oZ')](item[_0x19ca('2a2','Fyn0')],0x2)&&item[_0x19ca('2a3','3RbV')][_0x19ca('2a4','AP6a')]['includes'](_0x19ca('2a5','&0MG'))?$[_0x19ca('2a6','Aunw')]+=0x1:'';_0x1fc827[_0x19ca('2a7','60(@')](item['status'],0x2)&&item[_0x19ca('2a8','ckEz')][_0x19ca('2a9','C[UO')]['includes'](_0x1fc827['FusMh'])?$[_0x19ca('2aa','P@8)')]+=0x1:'';}else{if(_0x3dd14d){if(_0x320918['VhAvM']('iILwm',_0x320918['serEc'])){message+='🎉\x20本次提交申请：'+$[_0x19ca('2ab','ckEz')]+'/'+$[_0x19ca('2ac','ZW(j')]+_0x19ca('2ad','fhxF');message+=_0x19ca('2ae','@Rjn')+$['successNum']+_0x19ca('2af','Fyn0');message+=_0x19ca('2b0','jgyI')+$[_0x19ca('2b1','X!Zo')]+'个商品已领取\x0a';message+=_0x19ca('2b2','!SD@')+$['completeNum']+_0x19ca('2b3','fS#l');message+=_0x19ca('2b4','24c9')+$[_0x19ca('2b5','X!Zo')]+_0x19ca('2b6','ckEz');}else{console[_0x19ca('1a','@m8m')]('🚫\x20'+arguments['callee'][_0x19ca('2b7','L&VA')][_0x19ca('2b8','ckEz')]()+_0x19ca('2b9','@Rjn')+JSON[_0x19ca('2ba','Aunw')](_0x3dd14d));}}else{_0x54c417=JSON[_0x19ca('2bb','bIDh')](_0x54c417);if(_0x54c417[_0x19ca('2bc','OHrb')]){if(_0x320918[_0x19ca('2bd','fhxF')](_0x547d40,0x2)){if(_0x54c417['success']&&_0x54c417[_0x19ca('2be','!SD@')]){if(_0x320918[_0x19ca('2bf','a10r')](_0x320918['VCCEF'],_0x320918[_0x19ca('2c0','jgyI')])){for(let _0x4e3570 of _0x54c417['data'][_0x19ca('2c1','AP6a')]){_0x320918[_0x19ca('2c2','rlX@')](_0x4e3570['status'],0x4)||_0x4e3570[_0x19ca('2c3','vsaV')]['text']['includes'](_0x320918[_0x19ca('2c4','&0MG')])?$['giveupNum']+=0x1:'';_0x320918[_0x19ca('2c5','K8Oq')](_0x4e3570[_0x19ca('2a2','Fyn0')],0x2)&&_0x4e3570['text']['text'][_0x19ca('2c6','&0MG')](_0x320918[_0x19ca('2c7','ckEz')])?$[_0x19ca('2c8','x9oZ')]+=0x1:'';_0x320918['AhACp'](_0x4e3570[_0x19ca('29e','aLPl')],0x2)&&_0x4e3570[_0x19ca('2c9','qI4e')][_0x19ca('2ca','RKak')][_0x19ca('2cb','K8Oq')](_0x320918['tXnNk'])?$['getNum']+=0x1:'';_0x320918[_0x19ca('2cc','qT@P')](_0x4e3570[_0x19ca('2cd','!SD@')],0x2)&&_0x4e3570[_0x19ca('2ce','6vE^')][_0x19ca('2cf','alDi')][_0x19ca('29c','3RbV')](_0x19ca('2d0','92Up'))?$[_0x19ca('2d1','Iaq#')]+=0x1:'';}console[_0x19ca('1fa','&015')](_0x19ca('2d2','Fyn0')+$[_0x19ca('2d3','@Rjn')]+_0x19ca('2d4','eSZK')+$['getNum']+'\x20|\x20'+$[_0x19ca('2d5','6vE^')]+_0x19ca('2d6','rlX@')+$[_0x19ca('2d7','rlX@')]);}else{console['error'](_0x19ca('2d8','P@8)')+$['name']+_0x19ca('2d9','@m8m')+e);}}else{if(_0x320918['xEIwL'](_0x19ca('2da','@Rjn'),_0x19ca('2db','2G#Y'))){console[_0x19ca('fc','@Rjn')](_0x19ca('2dc','L&VA')+_0x54c417[_0x19ca('25c','AJwh')]);}else{$[_0x19ca('2dd','ZW(j')]=!![];console['log'](_0x320918[_0x19ca('2de','vsaV')]);}}}}else{if(_0x320918[_0x19ca('2df','!SD@')](_0x320918[_0x19ca('2e0','C[UO')],_0x19ca('2e1','fS#l'))){if(_0x54c417[_0x19ca('2e2','!SD@')]&&_0x54c417[_0x19ca('2e3','jVfz')]){for(let _0xe5d69e of _0x54c417[_0x19ca('2be','!SD@')][_0x19ca('2e4','X!Zo')]){_0x1fc827['TQYNP'](_0xe5d69e[_0x19ca('2e5','QbiL')],0x4)||_0xe5d69e[_0x19ca('2a9','C[UO')]['text'][_0x19ca('2e6','P@8)')](_0x1fc827['rvisO'])?$[_0x19ca('2e7','&0MG')]+=0x1:'';_0x1fc827[_0x19ca('2e8','3RbV')](_0xe5d69e[_0x19ca('29e','aLPl')],0x2)&&_0xe5d69e[_0x19ca('2e9','fS#l')][_0x19ca('2ea','P@8)')][_0x19ca('2eb','AP6a')](_0x1fc827[_0x19ca('2ec','bIDh')])?$['successNum']+=0x1:'';_0xe5d69e[_0x19ca('2ed','&015')]===0x2&&_0xe5d69e['text']['text'][_0x19ca('2ee','fS#l')](_0x1fc827[_0x19ca('2ef','VOPs')])?$[_0x19ca('2f0','QbiL')]+=0x1:'';_0x1fc827[_0x19ca('2f1','AJwh')](_0xe5d69e['status'],0x2)&&_0xe5d69e[_0x19ca('2f2','!SD@')][_0x19ca('2f3','60(@')]['includes'](_0x1fc827[_0x19ca('2f4','24c9')])?$['completeNum']+=0x1:'';}console['log'](_0x19ca('2f5','X!Zo')+$[_0x19ca('2f6','Iaq#')]+'\x20|\x20'+$[_0x19ca('2f7','fhxF')]+_0x19ca('2f8','0dSv')+$[_0x19ca('2f9','K8Oq')]+_0x19ca('2fa','fS#l')+$[_0x19ca('2d7','rlX@')]);}else{console[_0x19ca('b8','Q20x')]('获得成功列表失败:\x20'+_0x54c417[_0x19ca('2fb','qT@P')]);}}else{console['error']('ERROR:try_MyTrials');}}}}}catch(_0x38d1a2){if(_0x320918[_0x19ca('2fc','qT@P')](_0x320918[_0x19ca('2fd','K8Oq')],_0x320918['ezLGB'])){_0x320918[_0x19ca('2fe','fhxF')](_0x221601,'⚠️\x20'+arguments[_0x19ca('2ff','fS#l')]['name']['toString']()+_0x19ca('300','Iaq#')+_0x38d1a2+'\x0a'+JSON['stringify'](_0x54c417));}else{_0x320918[_0x19ca('301','eSZK')](_0x221601,_0x19ca('302','0dSv')+arguments['callee'][_0x19ca('2b7','L&VA')][_0x19ca('303','fhxF')]()+'\x20API返回结果解析出错\x0a'+_0x38d1a2+'\x0a'+JSON[_0x19ca('304','!SD@')](_0x54c417));}}finally{_0x320918[_0x19ca('305','qT@P')](_0x51d291);}});}});}function taskurl_xh(_0x546b48,_0x110d08,_0x347ec2=JSON['stringify']({})){var _0x23a00a={'gyoEQ':_0x19ca('306','0dSv'),'UNQnH':_0x19ca('307','C[UO'),'eePie':_0x19ca('308','P@8)'),'XoRZw':'zh-cn'};return{'url':URL+'?appid='+_0x546b48+_0x19ca('309','Q20x')+_0x110d08+_0x19ca('30a','&0MG')+encodeURIComponent(_0x347ec2),'headers':{'Host':_0x23a00a[_0x19ca('30b','Aunw')],'Accept-Encoding':_0x23a00a[_0x19ca('30c','^6L@')],'Cookie':$[_0x19ca('2b','kE!%')],'Connection':_0x23a00a['eePie'],'UserAgent':_0x19ca('30d','X!Zo'),'Accept-Language':_0x23a00a[_0x19ca('30e','60(@')],'Referer':_0x19ca('30f','a10r')}};}async function showMsg(){var _0x4c45bf={'otGvJ':_0x19ca('310','92Up'),'ZKROA':function(_0x1b7077,_0x309c81){return _0x1b7077!==_0x309c81;},'PtMQW':function(_0x2c2a5a,_0xa05085){return _0x2c2a5a!==_0xa05085;},'Wqrkb':function(_0x1a8116,_0x18802a){return _0x1a8116===_0x18802a;},'wQTAv':_0x19ca('311','ObCX'),'XMTkx':_0x19ca('312','eSZK'),'wXYHQ':_0x19ca('313','I)TD')};let _0x5a9034='';_0x5a9034+='👤\x20京东账号'+$['index']+'\x20'+($[_0x19ca('314','^6L@')]||$['UserName'])+'\x0a';if(_0x4c45bf[_0x19ca('315','AJwh')]($[_0x19ca('316','3RbV')],0x0)&&_0x4c45bf[_0x19ca('317','fS#l')]($['totalTry'],0x0)){var _0x19dcb1='0|4|3|2|1'[_0x19ca('318','&0MG')]('|'),_0x93f998=0x0;while(!![]){switch(_0x19dcb1[_0x93f998++]){case'0':_0x5a9034+=_0x19ca('319','^6L@')+$[_0x19ca('31a','RKak')]+'/'+$['totalTry']+_0x19ca('31b','eSZK');continue;case'1':_0x5a9034+=_0x19ca('31c','2G#Y')+$[_0x19ca('31d','&015')]+'个商品已放弃\x0a\x0a';continue;case'2':_0x5a9034+=_0x19ca('31e','eSZK')+$[_0x19ca('31f','v*M8')]+'个商品已完成\x0a';continue;case'3':_0x5a9034+=_0x19ca('320','v*M8')+$['getNum']+_0x19ca('321','^6L@');continue;case'4':_0x5a9034+=_0x19ca('322','qI4e')+$['successNum']+_0x19ca('2af','Fyn0');continue;}break;}}else{var _0x2433e8=_0x19ca('323','QbiL')[_0x19ca('324','fhxF')]('|'),_0x54ac14=0x0;while(!![]){switch(_0x2433e8[_0x54ac14++]){case'0':_0x5a9034+='🎉\x20'+$[_0x19ca('325','^6L@')]+_0x19ca('326','92Up');continue;case'1':_0x5a9034+='🎉\x20'+$[_0x19ca('327','@m8m')]+_0x19ca('328','3RbV');continue;case'2':_0x5a9034+=_0x19ca('329','!SD@');continue;case'3':_0x5a9034+='🎉\x20'+$['getNum']+'个商品已领取\x0a';continue;case'4':_0x5a9034+=_0x19ca('32a','L&VA')+$['giveupNum']+'个商品已放弃\x0a\x0a';continue;}break;}}if(!args_xh[_0x19ca('32b','vsaV')]||_0x4c45bf[_0x19ca('32c','0dSv')](args_xh['jdNotify'],_0x4c45bf[_0x19ca('32d','RKak')])){$[_0x19ca('32e','alDi')]($[_0x19ca('32f','VOPs')],'',_0x5a9034,{'open-url':_0x4c45bf[_0x19ca('330','vsaV')]});if($[_0x19ca('331','2G#Y')]())notifyMsg+=''+_0x5a9034;}else{if(_0x19ca('332','ZW(j')===_0x4c45bf[_0x19ca('333','x9oZ')]){if(JSON[_0x19ca('304','!SD@')](err)===_0x19ca('334','@m8m')){$['isForbidden']=!![];console[_0x19ca('105','kE!%')](_0x4c45bf[_0x19ca('335','a10r')]);}else{console[_0x19ca('14','ckEz')](JSON['stringify'](err));console['log']($[_0x19ca('336','X!Zo')]+_0x19ca('337','x9oZ'));}}else{console[_0x19ca('3d','2G#Y')](_0x5a9034);}}}function totalBean(){var _0xf81061={'ttuSR':function(_0x4741b5){return _0x4741b5();},'FMEbo':function(_0x47e2a5,_0x45b7d5){return _0x47e2a5==_0x45b7d5;},'kHsOK':'请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie','IObrV':function(_0x50209a,_0x5b589d){return _0x50209a!==_0x5b589d;},'gyDbV':function(_0x285416,_0x3927a8){return _0x285416===_0x3927a8;},'EsGWQ':_0x19ca('338','C[UO'),'fDCyv':'NUccg','bnVdM':_0x19ca('339','eSZK'),'qCbRs':'application/json,text/plain,\x20*/*','EhcPe':_0x19ca('33a','fS#l'),'lcmsV':_0x19ca('33b','Q20x'),'MsJVF':'keep-alive','zapGk':_0x19ca('33c',')KeU'),'UuDue':function(_0x4333d6,_0x3a8839){return _0x4333d6(_0x3a8839);},'cMiQz':_0x19ca('33d','v*M8'),'Inkff':_0x19ca('33e','ckEz')};return new Promise(async _0x2e5b09=>{var _0x206dfd={'sWhPt':function(_0x10e35a){return _0xf81061[_0x19ca('33f','@Rjn')](_0x10e35a);},'cKThV':_0x19ca('340','@Rjn'),'IVTDN':_0x19ca('341','@Rjn'),'eLTxn':function(_0x15a330,_0x52a5d4){return _0xf81061[_0x19ca('342','VOPs')](_0x15a330,_0x52a5d4);},'TpidW':_0x19ca('343','@m8m'),'HHmnB':_0xf81061[_0x19ca('344','P@8)')],'UiwUF':function(_0x16b9f3,_0x5b0895){return _0xf81061['IObrV'](_0x16b9f3,_0x5b0895);},'MtRyb':'wmsqP','XTGLV':function(_0x2a3b4c,_0x5dcfd7){return _0xf81061[_0x19ca('345','Iaq#')](_0x2a3b4c,_0x5dcfd7);},'ujqjQ':_0xf81061[_0x19ca('346','X!Zo')],'DotTM':_0xf81061['fDCyv'],'bKfQk':_0x19ca('347','vsaV'),'IQZbO':_0x19ca('348','rlX@'),'YHsvl':_0xf81061[_0x19ca('349','x9oZ')],'csHct':_0x19ca('34a','X!Zo')};const _0x3bbe6a={'url':_0x19ca('34b','Aunw'),'headers':{'Accept':_0xf81061[_0x19ca('34c','vsaV')],'Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':_0xf81061[_0x19ca('34d','VOPs')],'Accept-Language':_0xf81061['lcmsV'],'Connection':_0xf81061[_0x19ca('34e','0dSv')],'Cookie':$[_0x19ca('34f','&0MG')],'Referer':_0xf81061['zapGk'],'User-Agent':$['isNode']()?process['env'][_0x19ca('350','AJwh')]?process[_0x19ca('351','RKak')][_0x19ca('352','C[UO')]:_0xf81061[_0x19ca('353','ZW(j')](require,_0xf81061[_0x19ca('354','ckEz')])[_0x19ca('355','kE!%')]:$[_0x19ca('356','C[UO')](_0xf81061['Inkff'])?$['getdata'](_0xf81061['Inkff']):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1'},'timeout':0x2710};$[_0x19ca('357','jVfz')](_0x3bbe6a,(_0x2648ca,_0x479554,_0x549838)=>{var _0x54cfcb={'DEUMl':_0x206dfd[_0x19ca('358','alDi')],'Dtygb':function(_0x2cc311,_0x281a10){return _0x206dfd['eLTxn'](_0x2cc311,_0x281a10);},'TcHxv':_0x206dfd[_0x19ca('359','C[UO')],'NxHkG':_0x206dfd['HHmnB']};try{if(_0x206dfd[_0x19ca('35a','3RbV')](_0x206dfd[_0x19ca('35b','rlX@')],_0x206dfd[_0x19ca('35c','VOPs')])){console[_0x19ca('13f','VOPs')](_0x54cfcb['DEUMl'],_0x549838);}else{if(_0x2648ca){console[_0x19ca('b3','6vE^')](''+JSON['stringify'](_0x2648ca));console[_0x19ca('35d','92Up')]($['name']+_0x19ca('35e','I)TD'));}else{if(_0x549838){if(_0x206dfd[_0x19ca('35f','P@8)')](_0x19ca('338','C[UO'),_0x206dfd[_0x19ca('360','6vE^')])){_0x549838=JSON[_0x19ca('361','0dSv')](_0x549838);if(_0x206dfd['XTGLV'](_0x549838[_0x19ca('362','bIDh')],0xd)){if(_0x206dfd['DotTM']!==_0x206dfd[_0x19ca('363','ObCX')]){$['isLogin']=![];return;}else{if(_0x54cfcb[_0x19ca('364','L&VA')](typeof str,_0x54cfcb[_0x19ca('365','K8Oq')])){try{return JSON[_0x19ca('17d','AP6a')](str);}catch(_0x56b93a){console[_0x19ca('1af','rlX@')](_0x56b93a);$[_0x19ca('366','v*M8')]($[_0x19ca('367','C[UO')],'',_0x54cfcb['NxHkG']);return[];}}}}if(_0x549838[_0x206dfd[_0x19ca('368','ObCX')]]===0x0){$['nickName']=_0x549838[_0x19ca('369',')KeU')]&&_0x549838[_0x206dfd[_0x19ca('36a','Iaq#')]]['nickname']||$['UserName'];}else{$['nickName']=$[_0x19ca('35','Iaq#')];}}else{_0x206dfd['sWhPt'](_0x2e5b09);}}else{if(_0x206dfd[_0x19ca('36b','2G#Y')](_0x206dfd[_0x19ca('36c','Fyn0')],_0x19ca('36d','jgyI'))){console[_0x19ca('1c1','Iaq#')](_0x19ca('36e','fhxF'));}else{var _0x2b1759=_0x206dfd['cKThV'][_0x19ca('36f','qI4e')]('|'),_0x54f082=0x0;while(!![]){switch(_0x2b1759[_0x54f082++]){case'0':message+='🎉\x20'+$[_0x19ca('370','&015')]+_0x19ca('371','jVfz');continue;case'1':message+=_0x19ca('372','aLPl')+$['giveupNum']+_0x19ca('373','&015');continue;case'2':message+='🎉\x20'+$['completeNum']+_0x19ca('374','@m8m');continue;case'3':message+=_0x19ca('375','ZW(j')+$[_0x19ca('376','vsaV')]+'个商品已领取\x0a';continue;case'4':message+=_0x19ca('377','X!Zo');continue;}break;}}}}}}catch(_0x1ae77d){$['logErr'](_0x1ae77d,_0x479554);}finally{_0x206dfd[_0x19ca('378','P@8)')](_0x2e5b09);}});});}function jsonParse(_0x9ce63d){var _0x7ebce={'smnpL':function(_0x360be5,_0x14dfdb){return _0x360be5==_0x14dfdb;},'Oazgr':_0x19ca('379','6vE^'),'GGrRX':_0x19ca('37a','B4Af')};if(_0x7ebce['smnpL'](typeof _0x9ce63d,_0x7ebce[_0x19ca('37b','bIDh')])){try{return JSON['parse'](_0x9ce63d);}catch(_0x47e0ba){console[_0x19ca('f','60(@')](_0x47e0ba);$['msg']($[_0x19ca('37c','jgyI')],'',_0x7ebce[_0x19ca('37d','v*M8')]);return[];}}}function getAuthorShareCode(_0x1c8f29){var _0x5179f0={'MSBTm':function(_0x32518b,_0x349afe){return _0x32518b!==_0x349afe;},'PKxsN':_0x19ca('37e','RKak'),'nMxIW':function(_0x352dbf,_0x41f1a3){return _0x352dbf===_0x41f1a3;},'HAMgC':function(_0x2c2ac7,_0x5ab6af){return _0x2c2ac7===_0x5ab6af;},'UDMtP':_0x19ca('37f','92Up'),'tBcxG':_0x19ca('380','&015'),'vEmCM':function(_0x487765){return _0x487765();}};return new Promise(async _0x149902=>{var _0x24d2b6={'zJWKC':function(_0x31b731,_0x45dcdd){return _0x31b731===_0x45dcdd;},'TMXwR':_0x19ca('1','OHrb'),'EdWMr':function(_0x2108a8,_0x493005){return _0x5179f0['MSBTm'](_0x2108a8,_0x493005);},'UAiQG':_0x5179f0[_0x19ca('381','ObCX')],'bQzDe':function(_0x5ca90c,_0x42f797){return _0x5179f0[_0x19ca('382','bIDh')](_0x5ca90c,_0x42f797);},'QaOFV':_0x19ca('383','eSZK'),'yPZyV':function(_0x50df26,_0x5bd117){return _0x5179f0[_0x19ca('384','alDi')](_0x50df26,_0x5bd117);},'uubBI':_0x5179f0[_0x19ca('385','jVfz')],'hdlDt':_0x19ca('386','ckEz'),'fTOcp':function(_0x52a1f2){return _0x52a1f2();}};if('ekcRk'!==_0x5179f0[_0x19ca('387','ZW(j')]){const _0x192525={'url':''+_0x1c8f29,'timeout':0x2710,'headers':{'User-Agent':'Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2013_2_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Version/13.0.3\x20Mobile/15E148\x20Safari/604.1\x20Edg/87.0.4280.88'}};$[_0x19ca('388','B4Af')](_0x192525,async(_0xb8152,_0x8fec74,_0x5c06b8)=>{var _0x20dafa={'WuhFk':'账号被京东服务器风控，不再请求该帐号'};if(_0x24d2b6['EdWMr']('EqXPr',_0x24d2b6[_0x19ca('389','AP6a')])){if(_0x24d2b6[_0x19ca('38a','RKak')](JSON[_0x19ca('38b','vsaV')](_0xb8152),_0x19ca('38c','I)TD'))){$[_0x19ca('53','fS#l')]=!![];console[_0x19ca('38d','alDi')](_0x24d2b6['TMXwR']);}else{console['log'](JSON[_0x19ca('304','!SD@')](_0xb8152));console['log']($[_0x19ca('38e','Iaq#')]+_0x19ca('38f','eSZK'));}}else{try{if(_0x24d2b6['bQzDe'](_0x24d2b6[_0x19ca('390','60(@')],'eEurS')){args_xh[_0x19ca('391','alDi')]?console[_0x19ca('1b8','qI4e')](_0x19ca('392','3RbV')):'';}else{if(_0xb8152){}else{if(_0x24d2b6[_0x19ca('393','ObCX')](_0x24d2b6[_0x19ca('394','eSZK')],_0x24d2b6[_0x19ca('395','^6L@')])){$[_0x19ca('396','C[UO')]=!![];console[_0x19ca('89','ZW(j')](_0x20dafa['WuhFk']);}else{if(_0x5c06b8)_0x5c06b8=JSON['parse'](_0x5c06b8);}}}}catch(_0x3245d6){}finally{_0x149902(_0x5c06b8||[]);}}});await $['wait'](0x2710);_0x5179f0['vEmCM'](_0x149902);}else{_0x24d2b6[_0x19ca('397','Q20x')](_0x149902);}});};_0xodS='jsjiami.com.v6';
function Env(name, opts){
	class Http{
		constructor(env){
			this.env = env
		}

		send(opts, method = 'GET'){
			opts = typeof opts === 'string' ? {
				url: opts
			} : opts
			let sender = this.get
			if(method === 'POST'){
				sender = this.post
			}
			return new Promise((resolve, reject) => {
				sender.call(this, opts, (err, resp, body) => {
					if(err) reject(err)
					else resolve(resp)
				})
			})
		}

		get(opts){
			return this.send.call(this.env, opts)
		}

		post(opts){
			return this.send.call(this.env, opts, 'POST')
		}
	}

	return new (class{
		constructor(name, opts){
			this.name = name
			this.http = new Http(this)
			this.data = null
			this.dataFile = 'box.dat'
			this.logs = []
			this.isMute = false
			this.isNeedRewrite = false
			this.logSeparator = '\n'
			this.startTime = new Date().getTime()
			Object.assign(this, opts)
			this.log('', `🔔${this.name}, 开始!`)
		}

		isNode(){
			return 'undefined' !== typeof module && !!module.exports
		}

		isQuanX(){
			return 'undefined' !== typeof $task
		}

		isSurge(){
			return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
		}

		isLoon(){
			return 'undefined' !== typeof $loon
		}

		toObj(str, defaultValue = null){
			try{
				return JSON.parse(str)
			} catch{
				return defaultValue
			}
		}

		toStr(obj, defaultValue = null){
			try{
				return JSON.stringify(obj)
			} catch{
				return defaultValue
			}
		}

		getjson(key, defaultValue){
			let json = defaultValue
			const val = this.getdata(key)
			if(val){
				try{
					json = JSON.parse(this.getdata(key))
				} catch{ }
			}
			return json
		}

		setjson(val, key){
			try{
				return this.setdata(JSON.stringify(val), key)
			} catch{
				return false
			}
		}

		getScript(url){
			return new Promise((resolve) => {
				this.get({
					url
				}, (err, resp, body) => resolve(body))
			})
		}

		runScript(script, runOpts){
			return new Promise((resolve) => {
				let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
				httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
				let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
				httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
				httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
				const [key, addr] = httpapi.split('@')
				const opts = {
					url: `http://${addr}/v1/scripting/evaluate`,
					body: {
						script_text: script,
						mock_type: 'cron',
						timeout: httpapi_timeout
					},
					headers: {
						'X-Key': key,
						'Accept': '*/*'
					}
				}
				this.post(opts, (err, resp, body) => resolve(body))
			}).catch((e) => this.logErr(e))
		}

		loaddata(){
			if(this.isNode()){
				this.fs = this.fs ? this.fs : require('fs')
				this.path = this.path ? this.path : require('path')
				const curDirDataFilePath = this.path.resolve(this.dataFile)
				const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
				const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
				const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
				if(isCurDirDataFile || isRootDirDataFile){
					const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
					try{
						return JSON.parse(this.fs.readFileSync(datPath))
					} catch(e){
						return {}
					}
				} else return {}
			} else return {}
		}

		writedata(){
			if(this.isNode()){
				this.fs = this.fs ? this.fs : require('fs')
				this.path = this.path ? this.path : require('path')
				const curDirDataFilePath = this.path.resolve(this.dataFile)
				const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
				const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
				const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
				const jsondata = JSON.stringify(this.data)
				if(isCurDirDataFile){
					this.fs.writeFileSync(curDirDataFilePath, jsondata)
				} else if(isRootDirDataFile){
					this.fs.writeFileSync(rootDirDataFilePath, jsondata)
				} else {
					this.fs.writeFileSync(curDirDataFilePath, jsondata)
				}
			}
		}

		lodash_get(source, path, defaultValue = undefined){
			const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
			let result = source
			for(const p of paths){
				result = Object(result)[p]
				if(result === undefined){
					return defaultValue
				}
			}
			return result
		}

		lodash_set(obj, path, value){
			if(Object(obj) !== obj) return obj
			if(!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
			path.slice(0, -1).reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
				path[path.length - 1]
				] = value
			return obj
		}

		getdata(key){
			let val = this.getval(key)
			// 如果以 @
			if(/^@/.test(key)){
				const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
				const objval = objkey ? this.getval(objkey) : ''
				if(objval){
					try{
						const objedval = JSON.parse(objval)
						val = objedval ? this.lodash_get(objedval, paths, '') : val
					} catch(e){
						val = ''
					}
				}
			}
			return val
		}

		setdata(val, key){
			let issuc = false
			if(/^@/.test(key)){
				const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
				const objdat = this.getval(objkey)
				const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
				try{
					const objedval = JSON.parse(objval)
					this.lodash_set(objedval, paths, val)
					issuc = this.setval(JSON.stringify(objedval), objkey)
				} catch(e){
					const objedval = {}
					this.lodash_set(objedval, paths, val)
					issuc = this.setval(JSON.stringify(objedval), objkey)
				}
			} else {
				issuc = this.setval(val, key)
			}
			return issuc
		}

		getval(key){
			if(this.isSurge() || this.isLoon()){
				return $persistentStore.read(key)
			} else if(this.isQuanX()){
				return $prefs.valueForKey(key)
			} else if(this.isNode()){
				this.data = this.loaddata()
				return this.data[key]
			} else {
				return (this.data && this.data[key]) || null
			}
		}

		setval(val, key){
			if(this.isSurge() || this.isLoon()){
				return $persistentStore.write(val, key)
			} else if(this.isQuanX()){
				return $prefs.setValueForKey(val, key)
			} else if(this.isNode()){
				this.data = this.loaddata()
				this.data[key] = val
				this.writedata()
				return true
			} else {
				return (this.data && this.data[key]) || null
			}
		}

		initGotEnv(opts){
			this.got = this.got ? this.got : require('got')
			this.cktough = this.cktough ? this.cktough : require('tough-cookie')
			this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
			if(opts){
				opts.headers = opts.headers ? opts.headers : {}
				if(undefined === opts.headers.Cookie && undefined === opts.cookieJar){
					opts.cookieJar = this.ckjar
				}
			}
		}

		get(opts, callback = () => { }){
			if(opts.headers){
				delete opts.headers['Content-Type']
				delete opts.headers['Content-Length']
			}
			if(this.isSurge() || this.isLoon()){
				if(this.isSurge() && this.isNeedRewrite){
					opts.headers = opts.headers || {}
					Object.assign(opts.headers, {
						'X-Surge-Skip-Scripting': false
					})
				}
				$httpClient.get(opts, (err, resp, body) => {
					if(!err && resp){
						resp.body = body
						resp.statusCode = resp.status
					}
					callback(err, resp, body)
				})
			} else if(this.isQuanX()){
				if(this.isNeedRewrite){
					opts.opts = opts.opts || {}
					Object.assign(opts.opts, {
						hints: false
					})
				}
				$task.fetch(opts).then(
					(resp) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body
						} = resp
						callback(null, {
							status,
							statusCode,
							headers,
							body
						}, body)
					},
					(err) => callback(err)
				)
			} else if(this.isNode()){
				this.initGotEnv(opts)
				this.got(opts).on('redirect', (resp, nextOpts) => {
					try{
						if(resp.headers['set-cookie']){
							const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
							if(ck){
								this.ckjar.setCookieSync(ck, null)
							}
							nextOpts.cookieJar = this.ckjar
						}
					} catch(e){
						this.logErr(e)
					}
					// this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
				}).then(
					(resp) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body
						} = resp
						callback(null, {
							status,
							statusCode,
							headers,
							body
						}, body)
					},
					(err) => {
						const {
							message: error,
							response: resp
						} = err
						callback(error, resp, resp && resp.body)
					}
				)
			}
		}

		post(opts, callback = () => { }){
			// 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
			if(opts.body && opts.headers && !opts.headers['Content-Type']){
				opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			}
			if(opts.headers) delete opts.headers['Content-Length']
			if(this.isSurge() || this.isLoon()){
				if(this.isSurge() && this.isNeedRewrite){
					opts.headers = opts.headers || {}
					Object.assign(opts.headers, {
						'X-Surge-Skip-Scripting': false
					})
				}
				$httpClient.post(opts, (err, resp, body) => {
					if(!err && resp){
						resp.body = body
						resp.statusCode = resp.status
					}
					callback(err, resp, body)
				})
			} else if(this.isQuanX()){
				opts.method = 'POST'
				if(this.isNeedRewrite){
					opts.opts = opts.opts || {}
					Object.assign(opts.opts, {
						hints: false
					})
				}
				$task.fetch(opts).then(
					(resp) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body
						} = resp
						callback(null, {
							status,
							statusCode,
							headers,
							body
						}, body)
					},
					(err) => callback(err)
				)
			} else if(this.isNode()){
				this.initGotEnv(opts)
				const {
					url,
					..._opts
				} = opts
				this.got.post(url, _opts).then(
					(resp) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body
						} = resp
						callback(null, {
							status,
							statusCode,
							headers,
							body
						}, body)
					},
					(err) => {
						const {
							message: error,
							response: resp
						} = err
						callback(error, resp, resp && resp.body)
					}
				)
			}
		}

		/**
		 *
		 * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
		 *    :$.time('yyyyMMddHHmmssS')
		 *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
		 *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
		 * @param {*} fmt 格式化参数
		 *
		 */
		time(fmt){
			let o = {
				'M+': new Date().getMonth() + 1,
				'd+': new Date().getDate(),
				'H+': new Date().getHours(),
				'm+': new Date().getMinutes(),
				's+': new Date().getSeconds(),
				'q+': Math.floor((new Date().getMonth() + 3) / 3),
				'S': new Date().getMilliseconds()
			}
			if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length))
			for(let k in o)
				if(new RegExp('(' + k + ')').test(fmt))
					fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
			return fmt
		}

		/**
		 * 系统通知
		 *
		 * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
		 *
		 * 示例:
		 * $.msg(title, subt, desc, 'twitter://')
		 * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
		 * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
		 *
		 * @param {*} title 标题
		 * @param {*} subt 副标题
		 * @param {*} desc 通知详情
		 * @param {*} opts 通知参数
		 *
		 */
		msg(title = name, subt = '', desc = '', opts){
			const toEnvOpts = (rawopts) => {
				if(!rawopts) return rawopts
				if(typeof rawopts === 'string'){
					if(this.isLoon()) return rawopts
					else if(this.isQuanX()) return {
						'open-url': rawopts
					}
					else if(this.isSurge()) return {
						url: rawopts
					}
					else return undefined
				} else if(typeof rawopts === 'object'){
					if(this.isLoon()){
						let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
						let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
						return {
							openUrl,
							mediaUrl
						}
					} else if(this.isQuanX()){
						let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
						let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
						return {
							'open-url': openUrl,
							'media-url': mediaUrl
						}
					} else if(this.isSurge()){
						let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
						return {
							url: openUrl
						}
					}
				} else {
					return undefined
				}
			}
			if(!this.isMute){
				if(this.isSurge() || this.isLoon()){
					$notification.post(title, subt, desc, toEnvOpts(opts))
				} else if(this.isQuanX()){
					$notify(title, subt, desc, toEnvOpts(opts))
				}
			}
			if(!this.isMuteLog){
				let logs = ['', '==============📣系统通知📣==============']
				logs.push(title)
				subt ? logs.push(subt) : ''
				desc ? logs.push(desc) : ''
				console.log(logs.join('\n'))
				this.logs = this.logs.concat(logs)
			}
		}

		log(...logs){
			if(logs.length > 0){
				this.logs = [...this.logs, ...logs]
			}
			console.log(logs.join(this.logSeparator))
		}

		logErr(err, msg){
			const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
			if(!isPrintSack){
				this.log('', `❗️${this.name}, 错误!`, err)
			} else {
				this.log('', `❗️${this.name}, 错误!`, err.stack)
			}
		}

		wait(time){
			return new Promise((resolve) => setTimeout(resolve, time))
		}

		done(val = {}){
			const endTime = new Date().getTime()
			const costTime = (endTime - this.startTime) / 1000
			this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
			this.log()
			if(this.isSurge() || this.isQuanX() || this.isLoon()){
				$done(val)
			}
		}
	})(name, opts)
}
