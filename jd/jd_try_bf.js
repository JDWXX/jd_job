/*
入口 京东 京东试用

cron 0 0 7,14 * * * jd_try_bf.js

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
		"安全套", "龟头", "阴道", "阴部"
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
	tabId: process.env.JD_TRY_TABID && process.env.JD_TRY_TABID.split('@').map(Number) || [1,2,3,4,5,6,7,8,9,10],
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
	trialPrice: process.env.JD_TRY_TRIALPRICE * 1 || 0,
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
	applyInterval: process.env.JD_TRY_APPLYINTERVAL * 1 || 8000,
	/*
     * 商品数组的最大长度，通俗来说就是即将申请的商品队列长度
     * 例如设置为20，当第一次获取后获得12件，过滤后剩下5件，将会进行第二次获取，过滤后加上第一次剩余件数
     * 例如是18件，将会进行第三次获取，直到过滤完毕后为20件才会停止，不建议设置太大
     * 可设置环境变量：JD_TRY_MAXLENGTH
     * */
	maxLength: process.env.JD_TRY_MAXLENGTH * 1 || 10,
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
var _0xodH='jsjiami.com.v6',_0x3cfe=[_0xodH,'QMOLfgfDtw==','PsKsdCnCgg==','KMK3DMKF','ScOgRRA=','wqhWw7l1A8KHf0U=','w61zw5DCqEo=','w4PDrVLCosKfDw==','w7d4VcOX','dR0OIgY=','fVM2wpUMwozDuXHCncKt','w6dLbMKdcw==','w57DrsKsw6cgw7k=','Z0XDisKM','UcOsThA=','wpjCkAMwOsK2Sjs=','aUMhwrgcwpI=','fg8Mwo8k','Vz4rwrcawpk=','woDCrsK8bA==','D8OYesO6','wp3CpcKndAvCqQdB','6Kyz55el5ba/5ayK5oij','5b6Q6aOD5YyBw5xfw43ltLfpoqDljpE3Mybltqblrpzmi4MZw7wL5beZ5pe25by8776J','w457ScKyXcK/MMKUw4HCig==','w6QKcw==','dEXDhsK2AMKw','YcKYw6ZFM8KZb8KWJQvDqA==','wqDCkh0=','wp90TQ==','A8OFTHHDk8OxY8KD','wqjCqRcOwoM+w6vCk8KU','w5RmT8K7Qg==','HMOYdg==','wqvCuyYQBA==','QFA5w43Dmw==','HhnDtk5W','HcKZZg/CoA==','w7gxWXI/w63ClFTCoCMWw649wpAOEw1ME8OiPMOxCR/Dm8KcURjCiE7Dgw==','wozDqg3Dliw=','wqkXTmghw6XCk0HCvA==','w7Mnw6fDo+ismuaxheWmnei2r++8juish+ahruaet+e+vei1numEg+iulg==','PMK3CsKXwqs=','fVM2wpUMwozDuQ==','w5rDoMKMw6sc','w5PDtlfCsw==','w7nDoCXDhj0=','UcOmQgXDusKBw57CvzcTLzQ=','P8KmFMKNwq3CjQ==','w5R/wqoOw4TDqsOtR1M=','w63Ci043XMOZIA==','I8KfUwBV','WygQNQ==','w5EvwoAcGA==','wpLCkQQ5','YkIpw4vDvQ==','w6bDnWfDliQ=','HA/DicKOwqPCnQ==','DUAxFA==','wpfDojrDoui+heWZkee7s+adoeinmOadpeWHqemWp1c=','HxoFXcKxwrJrwozDkw==','w69yw6Q=','wpsew5DDvcKP','w7tkw4fDjQ==','FXZCZw==','RMK6w55cNw==','w5HDigTDjxjDoUTCmEM=','EgvDlsKRwqfCn3I=','IcKAeQ==','8JeTnCXojavlvaLorJjnl5fliYvooYrlpqzotZXCqB0=','wovCqD7DtVLCt3w=','NkXDums=','FDTDssKJwqA=','w53DvEDCpcKLGxU=','JMKcUhtMwptL','w6PCgVkh','XxImJyE=','RMKzw7pMOA==','wrbCuBYUwow+w6c=','PRvDlUZJbD/CpmA=','w5nDggfDjg==','BMKuH8Kzwqw=','wpXCmSnDkmc=','EsOTYcOiYsKow7TDkw==','ZjXCu8KVQMKI','K8KGcBZowpxbw7jCpQ==','wpjCpMKj','w5tPLDVj','w4pbLAtH','JgLDgsKLwoA=','wqLCpcOu','MsOPTVjDlA==','DxzDjMKMwrLCtHjChQ==','5ZeF5ZOc6KCo6Lyd5ru/77+G5o+/5LyE55S46K+q55qz5Lm65pWM5bOi5Luy6aK26K+m55W56Kyz55iM5Luw5pa0W8K8','W3wcw7TDsg==','wrfCjSYhwq8=','w4vCnlQoXA==','FsOOZQ==','wrs5T2Ur','VxFjwrHCng==','wrXCvAgC','ADRVwpXovKHlmJPnuKzmn4Dop4HmnI3lhorplos3','EFUuGBbDuMKOw4BG','QTg4wqwd','w6BcPjZow5ZvFOinj+acuOW/keW6mQ==','ZjJkwrbCnw==','P8K/WQXCnw==','A8KfO8KMwqw=','w5IQwpYxMw==','wqsTw5LDjcKc','5bSh5pa/5byW','6K2V55eG6LW55qG45bC75L2j55Sc','wqvChcOmSUE=','5q2H5Z2i6I+95YyV5bad55eZ6Ky+55uW5ZSy5ZOgMcOkIA==','wrJdw7Z8FcKXf1LplY/orqg=','D8OPe8ORWsK1w4XDkn88wqcs','KQzDhHhi','w4xJQsOJXw==','5q+y5Z6R6I625Y2t55W86K605aS26Lei55qO5ZaQ5ZGRCFdH','worCoio=','YFTDgMKRG8K6wqkUwpw=','fgEuNxA=','w57DvETCosKYBQ==','wpzCr8Ovwp7CncK9wrw=','wofCusOaXHbDtMKjesOHexJ6Dj3CtH5hG8Kgw5Ur','w7RSPw==','OCnDgGbDrQ==','w6DDvVTCpcK9','wqMHw4XDmcKI','8LO6vcOk','w7LDmG3Dlyom','w4PDu8Kgw7Y=','wqoCTnIq','NMKpQyDCjjF+','w5dBwpQLMA==','wrXCp8Kmeg0=','wqcZPHDDtV/Di1gsQA==','DxvDlsKK','JlHDg8KZwpDDu8OJ','GMORb33DtQ==','wpwFw7TDrsK3','WAM4d+itv+azvuWnpOi0pe+/iuivtOagjeadlOe8kei1hOmHjOisvw==','CA8DVQ==','AsKMWj1S','w4Zzwrwe','w7ZcHyNR','wqXClMOUQnM=','P8KiGcKQwrvCmw==','w4XCvU4uZA==','Y1IJw5jDnxI=','w7Flw4DDhFfCqcKjUA==','ScKFw6BMFg==','OMOqSWnCl8KN','w4lrUsKl','cMOLYy/Dhw==','wqcZPmvDsF/DjHwQRzI=','5b+p6aOo5Y6hFMKjw7Xlt7DpoazljbzDpsKvw4LltKblrZjmiopswrnCjeW0qeaUh+W8uO+8kQ==','a8OiCA==','wr0GSE86w68=','wrNLaw==','wp1yCg==','wrXDtXkrMg==','w5zDo8KGw7IT','w41ewpUIJA==','6Iy05b6K5oi95Yi85Yid6KOB5aaY6LeswoEc','b8KSw7hGPsKbfg==','6I6X5b+i5oiV5YmD5Yui6KKl5aeO6LW5GMK9','IwrDlFxGbDM=','CRwFW8Kt','wpbDk0cqJSdIMzXCrhVhw4TCicKdwrYPDQ==','w5tHwo8Pw6c=','4pix77q2IQ==','w6B8w6/Ctn7Crw==','wplIUsOjFw==','w57DrsK/w7o7w60ALDs=','K8KsEcKUw6LDiHc7TAlbwpjCl0EbHAs=','Pk/Du35gHcKcw4Rpw6g=','w5fDssOgw7A7','wptoX8K/W8K4KsK1w5rCrsKBVA==','asK1FMKNwqvChmcITxdJwoXCnQMGT0nCp8OiZsKoHMO8L2YzwpTCjsKFw7JGIcOhw5TDh0UnEA==','w71DBxRx','eFYewrsY','w7BYJAlow4c=','KD8DcMKS','w6jCmkk0TsKEasOKYmfDrsOfw4DDrwxEV3NfHQ1DRg4=','wrTCkg84DMOCdsKZIg==','w6jCmkk0TsKEasOKZmfDuMKVw4jCt0hNV3pUXkFZWETDsQ==','8LOxssOk5LuG5LqR6Lai5Y2+','BQATUcKn','YzvDocKow5NvwqbDlQ==','wrfCncOAwpDCrA==','IUvDlMKbwpnDnMOIwqA=','ZjXCu8KVVw==','5Lub5Za45ZKh5bau6aOJ5YyEJQ==','8Yu8iDU=','w47DtcKgw6M5w68dLwzDg1I=','5LmZ5Zex5ZOk5b6a6aCh5Y2rBg==','w4PDjB7Dij3Dm1LChA==','5Lur5ZW+5ZGb8JmKpMOp','8JqGlMO3','wpPCosKyfQvCvSxHwpc=','5Lmk5ZSp5ZGm5bed5pSZ5byIXMOK','FxfDnVHDoA==','AMOHSXbDkw==','8L+njA0=','d08ew4nDnxHCocKhwrU=','5Lik5ZWg5ZKU5bSE5pWX5b+8woA1','w5tCwqonF8O3','5Lq55ZWx5ZKK5baQ6aKH5Y20CQ==','8Y+escK6','5LqK5ZSn5ZCQ5b+d6aOW5Y68Ew==','8LOMkBM=','dirCusKMT8KIwrFDCWIi','w6l5Y8OMfsOAw4/CsA==','w5k2wpgzEw==','wrhLw6xXBA==','KsKvRw==','WMKSw6hbKQ==','fDbCmcKTR8KI','6Le15Y226KK+5LuJ5Lmr5pyQ5Yqd5Zip6aKC5o2W772U5LiV5YSd6KyM5rK26Kyy5bmz5Y6J','CSfDvMKqwok=','ZAXDsMKew4g=','w5DDmQPDm33Cr0TCmF3CmXLDijgIK8KBJw==','by3DusKfTQ==','wofCusOaXHbDtMKjesOAeA56CXfDsHkgFcOgw5V9OMKBK8OAw6LDj2jCtWgkwr3ChRAyNHluaMKzw6rCvmrCq8O2wpg3wpUc','GGfDkcKJw5hcwpTDscKew7fCq0cy','SMKzw550','wpUtRWI/','eQbDvcK5w60=','w7xfwoMlw6A=','woJKw6p7Hw==','wrXDp3kqAg==','XG7Di8KbBQ==','GW/DiMKcwpA=','NwwRXcO4','w4RZW8OIXg==','JxcNZMKY','w5rCgX8icw==','wqlMw65pBcOZNRkhNi1Ow6sFw63Ch2PDm2pUWMONIDpIwqXCnsKJQcKvwr7CvyrDoF/DvDvCscOcQsO2wqpUwrMwECTCksKRw6HDgcKOOMKa','wo7CvsOeQGzCrcOtIcOeZhN7Gz7CqW04VcKpw5d2esOGN8Ocw6nDjmnCoygtwqHDjw==','a8OCfBTDkA==','HSwe','wrYIw4E=','w6vDisK5w6cB','woLCiC7DolY=','w5XCvXgWYsO/AsKgXEE=','JGfDqGwr','BEQoFRnDq8KG','BgwfdcKJ','w4DDtkDCog==','BWILBAg=','w5vDlm7DlyU=','wpXCuT/Dr13Ct3BRWQ==','K8Ogb27DoA==','wqx6w51gGA==','U8OAbyzDmQ==','fkcnwoUM','FhLDk37Dow==','McOGX0vCjQ==','w5tlwogFw6rDrcOn','UTfCoMKUaA==','dyTCpMKZ','KMKqUjpA','WCHDp8Kxw7NvwqbDlQ==','w4PDs8Kuw7gbw6sELw==','BxPDgWTDpsKUw4F8','w5MVwqMxPg1wVxs=','w5FJT8OIBcKVWMK/woxcB24zw5Q9BFfDlcOSw43Cq8Otw7zCugPCv8KAZMKaw4HCkg==','wroVw7HDhcKfZcOFw65mwpXDgA==','wrzCpsO4wr7ClQ==','IRTDln/DhsKSw4V/wqs=','wo3Dm8Kdw5rorqLms4jlpZjota/vvY7orYHmo7/mnKrnv7/ot5/phpvorY4=','ZwLDqMKgw6c=','w6jDg8Kkw4Y4','5LiM5Lm95p+c5Yu55Zi46L6+5ZuH56mL5pSS5o+X','wqcXP3fDuV8=','w7oibEjovpvlmZznuKnmnrvopKbmnpPlho/plphT','w7rDtlzCusKA','wrcCIXLDsl3DkX8n','wrpZw4bDm1LCosKoUCjCoWJOwo/Cv8KQw5xZKMK6w4F6YUvCp1zCg8Kjw5nChMKUwok=','w5VUwpgGEMO4w4kvFcKEYQ==','w7FxXMOmcA==','Vz44wqoBwo3CoDQN','GcOQR3nDjw==','w5FQWcOnXw==','w4HDtcKqw5Ynw7g=','XAjCrsKFVw==','ZMK0w5xALw==','6I2z5Y6g5aWi6LS+','w4l6TMOtaA==','DsKPFMKhwpc=','w6LDnUfCksKJ','wqHCv8ObW18=','LMOYZ8OUcA==','wqxrw75VGA==','w6lUwrsbLMO7w40u','woXCuRXDsWo=','fVUP','HcOWSHo=','6K+i5Yq66ZmY5oez5ZyLwq/Cql4NZOi/nOWFo+agkuS/vuaXquWGvOWsuSHlu5HorabpgKXovZTohYrmn4fljoHojoXljo9/NMKqwqR7w4Y=','AQsER8K+wrJn','wo9Qw51gJA==','5pCM5L2k5aaw5b+y77266KyU562T5b6zdnEj56e2woU=','woTCqsK2axs=','w5TDuEfCtw==','UcOoVCjDv8Khw58=','VBRnwpLClMKgwpo=','bkLChw==','w4TDuFHCn8KO','wqvDtAU=','woPCisKUXQw=','wp/CmCghwps=','w6JPBCR3','w4pow6HDqXE=','GSPDt8KqwqA=','wqnCr8O9','VyZxwo7CmQ==','eXbDtcKgJA==','E0AuAh0=','8KC/p8KF5p+O5q+n5oyo5Lqz55eR6K6/77yE','8LCehwo=','w7PCm14nWMONNsKrZ3g=','5Lmh5ZeY5ZOp5b6Y6aGk5YyoAA==','FMOSUVHDksOQ','8JePvCU=','EMOYSG/Di8OYeMKBw6TCpMKv','5Lub5Za45ZKh5bau5a+D5ouCJQ==','8JGWllQ=','Mk3DlsKfwoDDuMO0wqwo','dsKvw59dHg==','QXTDlsK0OQ==','wonCiQErwqE=','wqzCvAwT','wrzCvwwPwoU=','w4XDhh7DiD7Dq0U=','woTCrD7Dow==','55WI6K2K5o+S5Liq5oiH5YmT','JhvDk19UMXnDr23CgcKtGGPCkcOswoLDui3DpMOjbRzDvn7DkQ==','wp/CsQoEwoQ=','w7VVw43CrVA=','w7tDPxJywpgsXk7DjcKyw4/Do8KqwokpwpjDvcO+wo3CiyjCrsKOw4TCjyobw77DqBPDrDTDmMKpwqnDrV48woXCnRNr','w5trf8OzYA==','ImbDlmsB','GSnDjEDDvg==','WGgHwr8B','fCwgFBA=','wrzCjS4dOw==','eSrCsA==','wqnCoMOHZkA=','wr3CvsOrwqnCiQ==','w5Nswrwdw7w=','w4J3wrYZw6g=','w6J6b8OpQA==','wpUQaG4k','wobCvcOiQ2LCp8Oi','w51AwpwjKA==','wqDCo8OqwpDCocK5wqPCuw==','w7xke8KdYQ==','FE7DscK2wqw=','w6h9T8KjdsKtLsK/','w610TsOIRMOIw4TCrA==','W1UwwoQnwp7Dp1o=','wpzCjQc=','O0vDs2s=','GQzDr8K1wq0=','worDgxBpEMKTaOeNiuWikeWPjemFjuishee/i8K0DwRUNBYeQyY=','D047','wqrllKflkJDlj4fkuqfvvabkvZfkur/ovrvkupPku53mo57pgJfkuprkvrHorZ/nl57CluS5neitj+e9vu+9kOm7mOiutMOLGcO3w6bDv8K7FnzDvcKow4wowpzCrMK4w4hXdjHDjF8=','w5zDtlQ=','w69ySg==','L+itnOeUnuS6k+aiqsO65LqG5Lma6KeV6IuH5aWG5bGW6ZC7wpLvvYDpqbLkuKHovK7kurfkuovmoLXpgbTku4/kvrvorKrnlZfvvaflsorku7nnr6rkuJTmiankvIXorr7nlrI95LmR6K+R57+z77y06bqe6KyRwrjClzJWwp/DssKzRMKPZMOyRsKfw7TChTVUKsK4UAsHTMOHa1A=','ScOmUQ==','w7nmnJvlsKXmjavkv67mlorph7nvv4DkvaLlp77orrHnlKnllJHlkbDlj7fmj6Dkv7zDlOS4j+issOeXhei3huaissOw5Lmn6K2l576K77yN6bis6K2MwoHCkMOFccO3woTCm1FZPcOENcOxW8ObwowBw6QieTbCmsOTwo3CvgZDw78=','w7nov5zmu47lppzku7vorYTlrqzlg7Dnma3lto7nlZfor7bku63ml4HvvJHkvrvlp6Xku63pnpDorZvnvoPnmIbCv8OoWsOr77+oQOWWsuWQqeW1gue5tuafrG3DqsKZwofku4bnlYroroDkuIbvvablirxI5ZeE5ZCS5LmB5L636L636KGm55WQ6Ky9776P5L+b6KGM6La76L+RwprkupDor6Tnv6vvv5/puojorq3ChcK4KMOOYX8sc0jClcOzIRLCv8O5w7Qyw7xXMsO7ccODwrbDsMOqwp3Dk8KwwrrCq8O7JFnCpMO8','wr8Jw5A=','w6zllovlkozml7bnu7fnmZTmnJnlpJDplZ/luLHCpeS6ueivgee+oe+/oem6oeitojkhw5bDrjHDgV3CscKWDifDoMO7wpTCmAxiw4IiwqVYC8KFfcOif8KM','VCgT','Tei8m+a7hOemjuiOouWvmuextuisqOeXlO+/kOafkOS6k+ituueUvOWUgeWRh+aau+S7lOWyteWttuS5r+Wzme++keiDueiZrOWIk+mApeWIuOi1pOWOluS7suaav+elr+iNp+Wuq+i0seWMmTjkuLPor4bnvr/vvZ7puq3orKBbN8KLw5HCrnjDvkkzMcOEwqkzwoXDoTzDncOOw7cQHwA3Y8KK','K8KzRw==','wpLmr4TlprnlsrnkuIjot6vljLHlj7LpgYzkuoHmrKDpgLvnnI7vv5bpuajorYzkuZMvwrrDhBEjFMOoFcKtwoPDo8K+w6/DssKEBh0nw4oMw77DgQ==','wrAJw5jDgcKEYsOfw4twwoI=','w5BCwrAOFsOy','wq3CpcOmwpDChsK9wr3Cny7CtQ==','Ig8DRsKV','w5Bkw6DCqms=','bsKYw6w=','DlI7','FiMFWw==','PDgOaMOr','RyUlwqgGwo8=','L8K5F8KPwqfCjWAfWBc=','wpTCiMOcwpnCmg==','Nm7Dr8KVwqM=','L8KoVDPDkW0iw4zDjMOtLjvCmjp/wrbCusO2w57DmEbCv8Ktw4IMDMKoTDJOwpjDtcOWTVB8w4FzURzCtG0Ww6tLIMOD','w59IwrECC8O/','b8KWw79WNw==','wofChcO+wrrCoA==','w57DsFDCvcKkHR3Dpw==','woHDtQvDtiQ=','IMK5Hw==','w43lvpvlpqnjgqzku43kuYvotq7lj7U=','w7jDl2XDnjc=','AgcUX8KRwrRvwo8=','w63CnVo=','5Lu55Li46LaG5YyN','H+iusumEmuaVjOeZmOW+uOiNsuWPsE1/O3IkY8OpFsKvSU7CqVHCvT3DhVBWd380wqjDoHDDhnrDqcO4w4oIDj4XKcOEbUjCksKIwrjDulV7wqw=','w57Dv8Kjw7cbw6UdIyTDjw==','PAHDiXM=','bUk6wp0AwprltbjlpI7mlqDDoF1Z','5LuT5Lmy6LaD5YyV','IsK5D8Kwwq/Cilo6YwtewonCig==','IsK5D8KtwrrCjX4=','w7jDik3DkiIqcw==','w7pEDQ1zw4BqFUjDjcK9','w6RFJAxm','COWWseWRiumViuW7ucORNsOeRlPCqAkRwqPCgcK8PMOWQg==','w4HDv8Kjw7Qhw6I=','w658w7vCln7CpEjDq2M=','wo/CvgvDqUHCsnBTRMOyw6M=','KsO5alfCqA==','wpzCmyHDtmc=','ezTCoMKFZw==','woHCocOZeGTCrMOFMcO+ZxkxGw==','w5nDjB3DuzDDqEU=','WCfDs8KTw6lrwqY=','D0QyFgzDtw==','w5BvUsKdXcKiJMKuw5w=','PVLDocKtwrs=','w6pua8OMeMOLw4DCrcOfWTw=','H8OwUEvDiQ==','ZU8sw4PDnA==','w6Rgwpwgw6A=','QinDpsKTw7k=','H8OSS3jDk8OV','AmvDikwL','wptiY8OOMA==','w5pvwo0fw4g=','6Lam5YyZ6KKW5Luo5Lih5p6z5Yuk5ZqN6aOc5o6y776N5Lq25YSo6K2u5rGg6K+M5bmp5Y+u','cnjDtsKCOw==','GA8VfcK7','SiU9wpMOwo3CrA==','wq1dw7R+AsKL','6ZWU6Zu1566Y5b+d5Lm9772m6K+u56245b+nwpkew4LnpLjCnQ==','wq0FFXTDrljDkX06VzE=','wqVOZ8OXBA==','wpjCjSw1IsK7Ww==','wrYMWw==','56mf5ZGu5bKi5omx6KOk6Kyg55aE55Sq6Kyl77656K+T562u5b6vWVN756aFBA==','w5fDqGTDuDg=','AAsZU8Krwr0=','ORYCdcKG','VmIfw5XDng==','8L++lA0=','wqkWX2Iqw7HCiWnCsG4=','CwsDesKqwrg=','5LmS5ZSE5ZKp5beM6aCO5Y2qw58=','8Kqeo8K+','w7LDlmzDiyMmc8KiRMKjw70=','5Lu55ZeH5ZOU5baX5a+75oiNNg==','BEgqFA3Dr8Kpw5NS','5Lio5Zax5ZGK5beH5pWh5b+/EcO5','IgrDiUhTYw==','w5drwoQCBg==','woXCoiLDrVrCtWp2UsOl','wqlZf8OZAA==','LQDDiERObg==','HsOWUXzDjw==','EMOYSnTDjsOY','wqPCq8O9wpjChw==','wp3CpcKgfQY=','eEQewqEa','w7jDik3DlCgqaQ==','w6nCnXEtUMOXMQ==','ZHDDn8KcJA==','LcKEQQrChw==','wo/CoynDo0s=','44CB5bym5aaj55af6K2d5ZSn5ZCu44OE','YXIXwqEj','wqbDqxLDkBgew6Z2bAnCvlBM','bUk6wp0AwprDuX7CmsKy','w694w63CvW/Cog==','6ZSb6Zma56+n5b6p5Lio77+C6K2756yc5byyKQ==','wrhmw5A=','woR6Q8OP','5Lu55Li45p6t5Ymb5Zqd6L2c5Zmk56qj5pS15o2u','FcOcb8Or','MxgxU8OS','w7jDik/DlCsm','Y1MLw4/DjxLCnMKawq0m','ciDCo8KyVsKA','wpB0R8OLGcKfQsKpwqcJCQ==','YiQjwokq','OxPDqnnDjMKQ','wqYEw53Dn8KD','GWAeHBk=','w57DjQ7Djik=','wqjCuAsDwqMsw68=','DAvDi8KWwojCjXo=','w5FhTQ==','5q2H5Z2i6L6R6KKP562Dw4o=','BOatq+WOm+mDgumBteecj++/heWOg+mBteaVkemHkO+/kA==','PQrDiUtpfjs=','SiU+wqoJwpM=','AMOSS3vDqcOSeMKNw4zCqA==','wojCrCDDow==','w6nCnXMrWcOb','w6nDgMKdw5gz','w6Byw6zCsXLCr1zDnnlv','5q6F5Z+l6L6W6KOK5pyz5ZOe5LiZ5qyW5Y+x6YKW6YKX552R772z5Yye6YOs5pSJ6YSJ77yS','w5F5wqsBw6TDocO6Y1nDjA==','OMO7RnnCrMKLZw==','w4FzwqoOw4PDq8O9S03Dhw==','AMOHSXbDhMOY','KAbDiUtuZTLCpWE=','wqkTIGjDvV3DnQ==','wqgZNA==','XTUGPxY=','IA7Diko=','w4bovJ3ooIHplp/or5zvv5ET','5b+B5aez6Iyt5Y+P6YS7576N5pad5LuAXA==','ZcKxW3jCjMKaRMOsfGV1WQ==','Ams3Ejk=','Cg8bR8K6','w61lw4fDjUTCpMKoRik=','NRXDjXLDmA==','w47DsQfDoAM=','wpTDkm8TGw==','w7BYJAlow4dwMF7Dmg==','wp3ClSshwqM=','Vm4mw6rDpA==','SCYGIwE=','w4NVIA5T','w7bDkD7DvAE=','w7VYOSdgw4Fr','woHCixM0','wpZ1XA==','wo3Dnz3DuCQVw51F','RMK7w6N6LQ==','dUge','fAzDm8Kew5hMwp7Dtw==','w59IwrECC8O/w5MKA8KT','QsOsQgDDt8Kmw4o=','ZyUlwqgGwo/CgxY=','wr0GSGUuw7bCmw==','d0Mcw4jDixXCjg==','w4nCm3sxbA==','w658XQ==','VSfDq8Kxw7Rr','w5R/wqgew6jDtg==','wpdzb8OvLw==','Fy7Dh0TDnA==','ZEjDm8KMEMKRwqkBwpE=','wrbDr2M=','wr7Cj8KbTCzClD1lwrJ3bFQrBMOAwpk=','w6hcw4rDjVE=','FsOZUw==','wqzCiRLDkmHCiUZnbMOYw4o=','woE4MEnDqA==','VcO7XwrDosKew4TCuw==','w7/DogPDiSI=','wr8NSg==','B8KrQSZzwqtgw43CkcOCOQ==','wq4RSWQ=','wpIiVWM8','w4lZw5zCjknCk3DDj0pOZMOdfw==','wrFZw6lqLMKLdVgxBGJL','wrvDg1YnEw==','B8KrQSZzwqtgw43CnMOeLcOvDg==','w4fDtAPDjiI=','w7Flw43DjVDChsKjWhrDrnNFwpg=','E1QvGQ==','KMOxR3bCi8KbecOCen4=','wpjCrsKqfwrCpQ==','5Lmm5Lm65Lmk6LeC5Yy5w6I=','w67CvChYSueOsuWiv+WOmemGg+mGvOe8tuWmmuS6m8OGw4nDql5D','w79YLA==','wqTCrsOZwonChsK7wqs=','wrkCw6fDmMKEZMOJ','w4HDtcKq','ZEcKw6XDjg==','w4wOwrY=','wodyXsOXEMK8X8Kgwp0ZFnI=','dsKFw6JUM8KsacKaCBvCvwQ=','GBweVcKzwoVwwoPDicKj','OUXDuQ==','wqPCo8OnwqjCmsKowr7CsiXCiXgqwrfDhQ==','FsOUbMOdYsK8w6HDjG8Twr4y','wp5yRMOoAMKKRsKgwpAyEWw=','H8OYQg==','GsONcsOibsKCw6TDjVA0wqcrB8OI','w7l7w5PDhFvCg8KzTgvDqG1Vwo7CqA==','GTIYUsOxw7XCu3TCo3HCu8OQLMKRIQ==','wq1Xw70=','woLCr8OWYGDCoMOrIcOf','fkHDisK0EMKzwqcGwo0=','J8OxTw==','HA8ER8KFwr1twoTDjcKFwrLCjcOuw7Q=','w4fDghnDmAvDp0/Ck1zCtnLDkQ==','PcKObQF7wppQw7PCusOOH8Oa','FC0P','N8KuSS3Cnw5iwpo=','IkzDicKOwpDDhMOTwqox','QSDDrcKuw7hCwqLDg8Ktw7nCgGoWwrvDlcKGShJ0','UsOhXxDDs8Kew4LCryA9OT7DvcOUPsOOw5w=','wq4Kdl88wp8+TBHClcOuwpzDsMO6wpp+w4HDrsKgw5/DmzrDsQ==','w7XDo8KHw6M5','6LWe5Y616KOD5LqS5LqU5p6x5Ym05Zmo6aCI5o6k77+B5Lq85YeN6K2c5rGD6KyP5bqZ5YyQ','wrTCq8OBwp7Cig==','cUMjw5nDrA==','woPCmxEdwqM=','6I2E5Y+N5aSb6Lae','w4bDrzvDriQ=','MyHDlFXDrQ==','HcOSUmvDlcOE','OcKdZy1VwpNdw5HCtMO+Cg==','wrtOeMO0AQ==','woPCqgQYBA==','w4PDrUHCv8KEGxnDpDM=','bD3DglxXZDjCs3zDk8K3WWrDmsKmw5LDpH3Cq8KmBAbDv3nDikTCngxyBsO3','SQZDwrPCh8KvwpY4RsO4Hg==','6I2s5YyLEQbCjxXDq8KGwpnku7t0LwA=','PsKbbBtPwpVWw7vCpA==','wofDuUQgLQ==','LUrDrMKAwqY=','woPCmcOATnE=','YTjDt8KYw6g=','czo5woEa','w5vDjA0=','8Y6osEI=','wq9Zw7d8','GAEkQMKtwrxswo0=','ADRVwpXorILmso/lp47otbnvvK7orarmorDmnbfnvazotJLDrg==','w7PCmk8tU8OZLMKDaw==','IDTDgFLDow==','cQrCmcKfcQ==','wq7DqCTDkxM1w6FmbR7Cpg==','w5LDphPDvjA=','woNpQ8OVAcK2WcKr','5ZS55ZKv6KCO6Lyl5rii77+0','aMKTw5tHNsKffg==','wrg3woM=','JAvDt11OaDM=','w5TDscKYw4AX','wpwSbHMe','AAEQ','ccKDw7lcMcKbcsKVEg==','w6fDmjLDteiuluawleWmuei0p++8heiujOagiOaflOe9sei1lemHkOiugw==','w53DqMKkw70hw4YGLQ==','5ZWE5ZC26KCg6L+y5rq777+w5bep55eA6K6c6K6r55at5Lqe5pWM5aap5Lii6aCV6K6v5LmB5pSfZ8KE','QinDpsKWw7R9wr8=','w67Dp8Kp','wpBAw69NEw==','ajBEwpPCrQ==','4puT77q4BQ==','wpLCnwwwKsK3','IsK3FcKB','YSrChMKIUcKEwqtB','wobDgF0QEQ==','6IyF5Y+A5ae16LWP','wpF6WcOe','w6h4SMOTJ8OIw4XCoMONWQ==','6KyG5peI6LWH5ZGS5bGy5by55o+/5Lus5ouk5ZOS','6K2G55Sf5ba55a+u5oiR','wovDikMhLg==','5ZSU5ZKh5Yqz6KG+6ZeX5bmT5bWe5ru4w7znuabmnbvojpDlj7w=','wp3CtxQ5GQ==','5ZSU5ZKh6KCP6L+R5rmM77+56K2J5ZWf5ZCT5pqa56ep6I2u5a6y5Lmq5bC/','SjIWIRE=','w7nDq3DDgz8=','w7B2w7bCjnLCvkPDuuinqOaejeW8teW6vw==','XWIPw7zDoQ==','Z8OlbzbDsg==','bMKSw7xBLcKF','MCAeWMOD','VcKSaMOqVMKjw77Di384w6U1EQ==','LmkrNg8=','w51vwpQYw6E=','w4cbwrgofEp9VATDlUvClsKPwrvCi8OowoQ=','woHCicO8woHCgQ==','wq/DrxbDjBJtwqcteQnCp1VFw4wzO8KLcWhMw4xGOyk=','5bS85pe05b6K','DRk1c8K2','dUQyw47Dqw==','woBTTsOhAQ==','aANQwo3CvA==','P8KscyzCpA==','VGwFwqAC','6La15Y+A6KOg5LuO5Lid5p6v5Yqi5ZiZ6aOi5oyP77+f5Lqs5YWA6Kyw5rOl6K6m5bus5Yyk','SXDDp8KJFA==','w41GwroDJQ==','w4Jbw7bDmUM=','wqACH2HDnw==','RxRTwrLCvA==','wqPCosKjbDw=','wrIJw6XDv8Km','w5UgwpMrFA==','w6JiwqgSw6M=','JsKFQxbCoA==','w450woswJg==','w4t5w5LDoUU=','wpnDhG0UIQ==','w7nCq2sTRQ==','VMKBw6xDMw==','w71+wrUjw5Q=','TBpi','wrzChAo+wrg=','w6TDqFrClcK+','FMOSUQ==','w5bDjmTDsyo=','cwsPwpoa','NCbDn2Vy','wqLCvFg3TcORK8KWdzXDosOUw4HDvAIdSSobGyhDWUPDqj5pJGjCm8KY','wrDDriXDvQA=','fEkP','DBrDl8KLwqjCn37ChDE=','CCMaTcOt','CzcLXcOtw4/Cpg==','w4Z5wrALw6HDlMOoRU7DjQ==','I8K9VCI=','wpXCvzYEFw==','w6XDlnXDmiMTZsKgb8Kl','KcKzVxPCiiVo','EQHDksKywqfCn3I=','wr/DrnI=','buatjuiMkOWPueivsueUo+WUkOWQgeaIieWJrO+/mEJvw53Dj8KCw64=','w7d8w6HCk38=','wr3DrmIxFn91JQXCnzx9w6g=','w6fnmJ9C566QQQ==','w7dyw7fCu3fCmk7DuG5u','6I615Yyh5Yq75ZWz5ZKew5w=','w5hGwqoI','w5pCwrsNLsOzw5M/','w7xqw5fDiQ==','LcO7TXnCrsKXecO3','w7fDn0TCpcKY','SBENPQg=','RkQGwoQi','VRrDksKew5A=','wph+U8OI','Hi0ae8Opw5/CvQ==','CQAB','BsKSJ8KgwovCqkYZ','wrlfdcO/MMK4Y8KL','wrPCjcKzaww=','w6/CoF8zUQ==','NQfDoMKTwpQ=','w4DDq1rCuMKeMB/DpQ==','5ZeX5ZG45pyr5YqL55W86K605pex6ZSz77yQ','YEvDh8KsHMKpwqwX','woPCq8OAS3HCpg==','wovCrDXDilbCvn5DSA==','w73DlmY=','OMKAdDdO','w63DpwnDkxQ=','RTo6wq8WwrnCvTMARA==','SDUdPhBKwrJo','Ux5wwojCnMK5wpM5','NDbDl17DjQ==','MxDDlHrDkcKmw5h4wqbDkA==','KDnDlGdC','w418Q8K/TMKALMK9','5ZSB5ZCd54qW5oGC5b+p5bm677yB5p+X5oqC5Yusc2PDmkAuw7LDuMKiw6E=','w75PQcKhUA==','wp3Cmw47O8K6','IUXDh8K2wpzDu8OO','Nl3DskML','wqbChcKOaTI=','D2DDg8KCwrA=','woXCnwcINsKiSg==','EwHDgg==','JsO6XXTCtA==','OsOJQMOsbg==','ExTDpnTDkQ==','O0PDvWUjHcKdw4g=','OR0SRsKRwrRvwo8=','Y00dw7jDgxXCg8Kx','wpjCjTApPMK6','Y1LDm8KWAcKRwq8V','M8K9QgrCjw==','w71YPDZgw4BKFWXDhsK3w4TCtQ==','BOebjmrnr69P','w5Tpor7DpOestF4=','bMKYw7x8K8KZdg==','PQTDkntOfzrCpQ==','cz0two44','DyoBSsOtw7DCvHPCskjCqMOIN8OEc8KOw7o=','w4F5wqkP','w5RgScK9TcKoJsKp','wqvCrwwJwpkVw63Ckg==','5ZS95ZG855m/5ZKD5Y2C6YOW6L2W776s5bCQ5Yu95Yau6K6K55WK57m+776PUsKXKUDCs8OZODdww4Imw6LCrUAo5LqQ','w5QTwrg5PCt6RQvDj0PClsKTw57Djw==','VD85wqs=','w6XDi2jDmiMCZMKzY8Kgw7lSACBt','ZTDCpMKU','w6LDknTDryY3a8Ki','IcKzC8KXwq/Cj3Y=','a8KEw4dcMsKVbw==','w7tNWMO1WA==','G3nDhl4e','wqbClyI/Kw==','w4fDvsKdw6E8w6kM','5ZeX5ZG46KKq6L285rqr772P','P0DDsMKIwpzDq8Of','dRjCgA==','OATDtGTDgcKWw4k=','fU8Gw7/DnxHCn8K4wqEFdcOo','w7BoXcOTZsOQw6fCvMOW','ZTfCvsKSV8KhwqpB','w5NmwrQGw7TDisO8Tw==','wp7DiWcMBw==','woDCgcOfS2o=','Pg/Dgw==','5ZWi5ZKL6KOh6LyE5rqL77+m5bS755Wh6K6D6K+055S35Lmw5pW+5aeN5Lm+6aGk6K6m5Li75peTEWg=','Ykky','w6BDOQtvw4VqF1U=','F8OSZQ==','W8O8UsOH6K+g5rKO5aag6LaF77ya6K6q5qCL5p6657yz6LWV6YWO6K+z','w6pnaMKyXA==','w5rDvWPCpMKDHxU=','EiY4TMOhw5/CsA==','VDgjwq0bwqbCpjU=','WifDow==','ccKYw6ZQ','wrcdJk/DtU7DlHw=','PETDvWI4GMKVw54=','IsO/ZlrDkw==','ZnbDvMKaAA==','wrFKw7N3AsKvdVE=','w6ZvX8OMeA==','4pyk77q4BQ==','w71WJgc=','wrHovanooY3plqLorqDvvYIN','wql5Z8O6Lw==','w7tlOhpx','w6zCgVo=','woDCucKteRLCjAFGwpNIUWUeBMO3','csKCw7hd','w7HCq8O5wovChsK8w7M=','wppEwrIAB8O0w5QdFMKTfMOWS8KdI8OiwqzDjnPClGfCucKQGcO0w7fCrsKnQsOywqkhdcKRw5/ColfDug==','wpvDo0YXPA==','WR1ywpnChw==','w5F5wqsBw6TDoQ==','w5rDvVLCpsKaRxnDkiJjwpzClxJMBwU1dcOif8Ohw7nCoijCmBTCnFPCs8KFEEdPw43Cq1x6worCrsKpFsKqw5XChHrCicOMw71Gw4J2wr02w4vCtsKZL8OWwrB+PsO0Y1oPw5rCij7Dk8O6w4ckXcOBFMKfwrkQw7cXZVTCnMOsdsKYd8Kjwo0rw50vFcKfcsOZw7zChsO8CMK6PF/CoyrDoHYhwo3CuUlXPRLDtcKUwrHDi8KpFgIgw5tjBcOmwpgTfx/Dg8KrPcKDwp3CshphCsKSwqZ9wqsLw6zDokozccOvw7gxBMOoSsOWwqTCu8KpScOUwrxsWTdKw6QTTEhPwo7Dgn7DqsO5bCnDgcKEw7hpw4fDi8KhwoTClMKnYcK+TD3DnBYMYsOSw4LCusK1w6rClCHDrsKdwqVhIF5OC8KLw7bDvDMtw7APw4puT0opGnDDtsONHcKwwqbDp8Kpw4ZSw7hlw6TCoMKKVzZfaMKJbsKYw4YzwrDDl8K3w6ItwoPDuxlAwph0cHjCg8KcaMOpSQFnwqjDqynCksOHOMK1IxzDpA==','PCPDkkxj','VSIHIwVhwrg=','LsKvcDbCmCo=','w5LDkRjDhCM=','wqISw4fDhsKF','5byf5Yqb6K6t55eM57iK6ZaX5bq15Lmk77yw','BTTDnkzDkA==','woDCpMKweRLCnQNVwp9N','PCsUe8Ko','w67CgUoQXMOcDMKBW3vDpcOew50=','w4hGwrwgBg==','w44OwqYIMQ18','wrcGT3Iuw6XCnw==','w4DDiwPDnzTDg0nCjk/CvnbDhypLecKHJg==','VyUnwqY=','CMOWd8OafsK4w73DhQ==','woHCjAkyO8KeQC8=','w7Rkw4Q=','5Zay5ZCK55q55ZCV5Yyr6YOX6L6l77y+5bO85Yqe5YWd6K+E55WP57qJ776fwrnCkcK0wp4swqXCiMOpPT1cw44ow4zCluS5sQ==','wq/CrwwGwoEYw6HCgcKEwqAzdVfCqWU=','JhLDjXfDhMK0w49twrvDg01TUzAF','HBsEXA==','IQvDkULDgcKBw4B8','KsKsFMKFwow=','w7V1IilL','4pur77qRCA==','wrjCvAkLwog8','WAM4d+i9nOWZoue4huaenOikpeaek+WEt+mWqEo=','IRXDh3XDjcKGw58=','HCMcXw==','UinDsMK7','FCsbSg==','RTzDpcKuw6h9','P8O7UGk=','w4TDtMKuw78gw64MOQ==','B8K/O8KOwqw=','w5DDihzDjiTDv27CiFY=','OsO0QMOGUw==','a8KZw6hZKsKYfsKA','wqvCssORwpDCvg==','OMOrS37Ch8KNecONfWE=','fVI0woIcwow=','w4hCwqYd','w5nDt1DCusKfGBXDsQ==','wqIVw4XDhMK3','w4cEwqUWJQc=','w4doa8KzUg==','w6xuw5vDnA==','w6fDsMKmw5I8','wrAJw5rDmsKBYsOYw69MwoXDgw==','f0/DlQ==','w49Swr0KB8Opw5MFBMKM','RxBxwpLCgMKg','XxLChQ==','KsKGaBdUwoJxw6jCsA==','SCUt','6Iym5byu5oiR5Yik5YmY6KCr5aS26LeiMMO2','w6fCiWoCVg==','6KyY5Yix6Zih5oSj5ZytwozDoy3DvXrov67lhLHmoKXkv73ml6flhp/lr7Zy5bi16KyW6YCe6L+Q6Iex5p2u5YyV6Iyy5Y29ZMKvKCLCrcOO','6LSk5YyA6KCg5LqZ5LmD5p+x5Yq65Zqb6aKl5o+Z776J5Lip5Yax6K255rOu6K205biB5YyM','TBU6JzU=','woc3IF3Dvw==','Y17ClB4=','FMKBKcKxwpo=','FXZFZA==','bAEEwpYr','wqE0G3jDvQ==','wp/CmxcoPcKr','eW3DqMKLPA==','6K+j55Wg6LeA5qOm5bKb5L+T55aS','RDPCtcKeUA==','QV8dw4bDjw==','wpVjYcOUJg==','HcOAd0rDsg==','FsOOalHDpQ==','KC0xR8K7','55Sg6K+X5o2i5Lmc5oml5YmC','wpUAMXnDrw==','DUQ0w6w=','QsOwXgjDtA==','NSUSYsKm','wo/CihQBwoE=','w4PDi1PDtQ4=','wrQnWFQt','wo7DkBTDrSY=','woMpw5jDhsKn','wq7CncOIf0E=','MzcsWsOc','AMOpb3nCkw==','w4dpw4DCgk0=','OMjSysjeiamqi.Etcowm.eGKFv6=='];(function(_0x98a520,_0x44454b,_0x38b85a){var _0x1657df=function(_0x35498f,_0x2745f9,_0x45e7a5,_0x47182,_0x4c8ea2){_0x2745f9=_0x2745f9>>0x8,_0x4c8ea2='po';var _0x2f427f='shift',_0x4e282f='push';if(_0x2745f9<_0x35498f){while(--_0x35498f){_0x47182=_0x98a520[_0x2f427f]();if(_0x2745f9===_0x35498f){_0x2745f9=_0x47182;_0x45e7a5=_0x98a520[_0x4c8ea2+'p']();}else if(_0x2745f9&&_0x45e7a5['replace'](/[OMSyeqEtweGKF=]/g,'')===_0x2745f9){_0x98a520[_0x4e282f](_0x47182);}}_0x98a520[_0x4e282f](_0x98a520[_0x2f427f]());}return 0xb7193;};return _0x1657df(++_0x44454b,_0x38b85a)>>_0x44454b^_0x38b85a;}(_0x3cfe,0x14d,0x14d00));var _0x6cea=function(_0x500868,_0x42d158){_0x500868=~~'0x'['concat'](_0x500868);var _0x2c62f6=_0x3cfe[_0x500868];if(_0x6cea['bQlyVs']===undefined){(function(){var _0x1b54ce=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x3c6350='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1b54ce['atob']||(_0x1b54ce['atob']=function(_0x477aba){var _0x3b5882=String(_0x477aba)['replace'](/=+$/,'');for(var _0x37a7ea=0x0,_0x44c2dc,_0x39f743,_0x1afb87=0x0,_0x40b3a8='';_0x39f743=_0x3b5882['charAt'](_0x1afb87++);~_0x39f743&&(_0x44c2dc=_0x37a7ea%0x4?_0x44c2dc*0x40+_0x39f743:_0x39f743,_0x37a7ea++%0x4)?_0x40b3a8+=String['fromCharCode'](0xff&_0x44c2dc>>(-0x2*_0x37a7ea&0x6)):0x0){_0x39f743=_0x3c6350['indexOf'](_0x39f743);}return _0x40b3a8;});}());var _0x4bb38=function(_0x4ef6b5,_0x42d158){var _0x333914=[],_0x5f2577=0x0,_0x17cf56,_0x2701e7='',_0x56fef1='';_0x4ef6b5=atob(_0x4ef6b5);for(var _0x290b14=0x0,_0x24b315=_0x4ef6b5['length'];_0x290b14<_0x24b315;_0x290b14++){_0x56fef1+='%'+('00'+_0x4ef6b5['charCodeAt'](_0x290b14)['toString'](0x10))['slice'](-0x2);}_0x4ef6b5=decodeURIComponent(_0x56fef1);for(var _0x2385fa=0x0;_0x2385fa<0x100;_0x2385fa++){_0x333914[_0x2385fa]=_0x2385fa;}for(_0x2385fa=0x0;_0x2385fa<0x100;_0x2385fa++){_0x5f2577=(_0x5f2577+_0x333914[_0x2385fa]+_0x42d158['charCodeAt'](_0x2385fa%_0x42d158['length']))%0x100;_0x17cf56=_0x333914[_0x2385fa];_0x333914[_0x2385fa]=_0x333914[_0x5f2577];_0x333914[_0x5f2577]=_0x17cf56;}_0x2385fa=0x0;_0x5f2577=0x0;for(var _0x43ea9c=0x0;_0x43ea9c<_0x4ef6b5['length'];_0x43ea9c++){_0x2385fa=(_0x2385fa+0x1)%0x100;_0x5f2577=(_0x5f2577+_0x333914[_0x2385fa])%0x100;_0x17cf56=_0x333914[_0x2385fa];_0x333914[_0x2385fa]=_0x333914[_0x5f2577];_0x333914[_0x5f2577]=_0x17cf56;_0x2701e7+=String['fromCharCode'](_0x4ef6b5['charCodeAt'](_0x43ea9c)^_0x333914[(_0x333914[_0x2385fa]+_0x333914[_0x5f2577])%0x100]);}return _0x2701e7;};_0x6cea['gwVhlN']=_0x4bb38;_0x6cea['ZNgnRv']={};_0x6cea['bQlyVs']=!![];}var _0x53e817=_0x6cea['ZNgnRv'][_0x500868];if(_0x53e817===undefined){if(_0x6cea['cuYsPp']===undefined){_0x6cea['cuYsPp']=!![];}_0x2c62f6=_0x6cea['gwVhlN'](_0x2c62f6,_0x42d158);_0x6cea['ZNgnRv'][_0x500868]=_0x2c62f6;}else{_0x2c62f6=_0x53e817;}return _0x2c62f6;};!(async()=>{var _0x260111={'agBJJ':function(_0x5503cc,_0x543e1b){return _0x5503cc===_0x543e1b;},'OsTok':_0x6cea('0','S[iR'),'AjQLY':_0x6cea('1','%nLc'),'DzfVc':'请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie','VvXJm':_0x6cea('2','3]u0'),'KZYmZ':_0x6cea('3','pvlM'),'FniJE':function(_0x43c692){return _0x43c692();},'stbRf':'ufaom','azxwq':_0x6cea('4','&Sh%'),'smOhS':'【提示】请先获取京东账号一cookie\x0a直接使用NobyDa的京东签到获取','fbJWk':'https://bean.m.jd.com/','QOndY':function(_0x557eef,_0x40e897){return _0x557eef<_0x40e897;},'NatrJ':'obUhL','Sycpp':_0x6cea('5','49FD'),'ZBUbu':function(_0x46da6f,_0x38cfc4){return _0x46da6f(_0x38cfc4);},'cJOoV':function(_0x5d08ea,_0x37a027){return _0x5d08ea+_0x37a027;},'IOwAO':function(_0x4f083e,_0x645d4d){return _0x4f083e+_0x645d4d;},'csRMr':_0x6cea('6','PPL3'),'nqwyD':_0x6cea('7','p]]0'),'EjVQb':function(_0x21c121,_0xd3d75c){return _0x21c121<_0xd3d75c;},'hvAWN':function(_0x370c13,_0x384670){return _0x370c13===_0x384670;},'lGuTn':'kJkzS','WATBF':function(_0x1bdb4d,_0x56cac5){return _0x1bdb4d!==_0x56cac5;},'hyIuE':_0x6cea('8','hmvB'),'aXDzN':function(_0x5a55b7,_0x3473e5,_0x221166){return _0x5a55b7(_0x3473e5,_0x221166);},'VUMlq':function(_0x3c9bd2,_0x52e1c7){return _0x3c9bd2===_0x52e1c7;},'FQeCw':function(_0x3cc4cd,_0x30569a){return _0x3cc4cd<_0x30569a;},'UxuAY':function(_0x336f8e,_0x29d661){return _0x336f8e===_0x29d661;},'FDwyt':'CNrpq','XhpuF':function(_0x1ede4f,_0x5c5b5e){return _0x1ede4f<_0x5c5b5e;},'kLZkd':_0x6cea('9','2apZ'),'vbKWs':function(_0x2f7496,_0x511504){return _0x2f7496+_0x511504;},'DoLFN':'试用上限','wPmdQ':_0x6cea('a','Zpj!'),'jXaIl':_0x6cea('b',']dW['),'lWEpf':function(_0x4d8d3e,_0x5a02ce){return _0x4d8d3e+_0x5a02ce;},'oTBWJ':function(_0x1e16a5,_0x4efd0b,_0x2d4d3c){return _0x1e16a5(_0x4efd0b,_0x2d4d3c);},'xQwNx':'试用申请执行完毕...','ubjun':function(_0x26ae95,_0x5045ea){return _0x26ae95===_0x5045ea;},'zABma':function(_0x37d4ba,_0x52049d){return _0x37d4ba%_0x52049d;},'VoGnA':function(_0x38b712,_0xfe77eb){return _0x38b712===_0xfe77eb;},'DZPKf':'vXhbq','zgRii':function(_0x59ef42,_0x4e422b){return _0x59ef42!==_0x4e422b;},'Kqidm':_0x6cea('c','ld2z'),'NORdG':'rbtib'};console[_0x6cea('d','W97h')]('');await $['wait'](0x1f4);await _0x260111[_0x6cea('e','[iJ7')](requireConfig);if(!$['cookiesArr'][0x0]){if(_0x260111['agBJJ'](_0x260111[_0x6cea('f','NM)3')],_0x260111[_0x6cea('10','9s9N')])){data=JSON[_0x6cea('11','9s9N')](data);if(_0x260111[_0x6cea('12','p]]0')](data[_0x260111[_0x6cea('13','FEB1')]],0xd)){$[_0x6cea('14','[iJ7')]=![];return;}if(_0x260111[_0x6cea('15','OrkO')](data[_0x260111['OsTok']],0x0)){$[_0x6cea('16','NM)3')]=data[_0x260111[_0x6cea('17','DPFq')]]&&data[_0x260111[_0x6cea('18','[w$J')]]['nickname']||$[_0x6cea('19','DPFq')];}else{$[_0x6cea('1a','p]]0')]=$[_0x6cea('1b','Zpj!')];}}else{$[_0x6cea('1c','ld2z')]($[_0x6cea('1d','hmvB')],_0x260111['smOhS'],_0x260111[_0x6cea('1e','N[dc')],{'open-url':_0x260111['fbJWk']});return;}}trialActivityIdList=[];trialActivityTitleList=[];sfsq=0x0;console['log'](_0x6cea('1f','E$%d'));console[_0x6cea('20','0ZUi')](_0x6cea('21','lfBZ'));console[_0x6cea('22','A!Ro')]('\x0a试用商品标题过滤，黑名单，当标题存在关键词时，则不加入试用组,关键词与关键词之间用@分隔(不设置，不过滤)\x20-----\x20JD_TRY_TITLEFILTERS');console[_0x6cea('23','p]]0')](_0x6cea('24','Rwdr'));console[_0x6cea('25','Rwdr')](_0x6cea('26','3XO5'));console['log'](_0x6cea('27','3XO5'));console[_0x6cea('28','BIkW')](_0x6cea('29','%nLc'));console[_0x6cea('2a',']dW[')](_0x6cea('2b','Tdb('));console[_0x6cea('2c','Tdb(')](_0x6cea('2d','PHc0'));for(let _0x39ee1b=0x0;_0x260111['QOndY'](_0x39ee1b,$[_0x6cea('2e','BIkW')][_0x6cea('2f','OrkO')]);_0x39ee1b++){if($[_0x6cea('30','NM)3')][_0x39ee1b]){if(_0x260111[_0x6cea('31','2CKC')]===_0x260111[_0x6cea('32','49FD')]){console[_0x6cea('33','h]*)')](e);$[_0x6cea('34','0ZUi')]($[_0x6cea('35','@AI7')],'',_0x260111[_0x6cea('36','@AI7')]);return[];}else{$[_0x6cea('37','Ad$r')]=$[_0x6cea('38','9Gvu')][_0x39ee1b];await _0x260111[_0x6cea('39','NM)3')](getAuthorShareCode,_0x260111[_0x6cea('3a','[w$J')](_0x6cea('3b','Tdb('),$[_0x6cea('3c','OrkO')]));$['UserName']=decodeURIComponent($['cookie']['match'](/pt_pin=(.+?);/)&&$['cookie'][_0x6cea('3d','h]*)')](/pt_pin=(.+?);/)[0x1]);$['index']=_0x260111[_0x6cea('3e','NM)3')](_0x39ee1b,0x1);$['isLogin']=!![];$[_0x6cea('3f','A!Ro')]='';await _0x260111[_0x6cea('40','8([C')](totalBean);console[_0x6cea('41','9Gvu')](_0x6cea('42','8([C')+$[_0x6cea('43','fWtc')]+'】'+($[_0x6cea('44','2CKC')]||$['UserName'])+'\x0a');if(!$['isLogin']){$[_0x6cea('45','E$%d')]($['name'],'【提示】cookie已失效',_0x6cea('46','[w$J')+$['index']+'\x20'+($['nickName']||$['UserName'])+_0x6cea('47','W97h'),{'open-url':_0x260111['csRMr']});await $['notify'][_0x6cea('48','1wtK')]($[_0x6cea('49','2apZ')]+_0x6cea('4a','Zpj!')+$['UserName'],_0x6cea('4b','N[dc')+$['index']+'\x20'+$['UserName']+'\x0a请重新登录获取cookie');continue;}$['totalTry']=0x0;$['totalSuccess']=0x0;$[_0x6cea('4c','9Gvu')]=0x0;$['nowPage']=0x1;$[_0x6cea('4d','9Gvu')]=0x1;$[_0x6cea('4e','fWtc')]=![];$[_0x6cea('4f','PPL3')]=![];$[_0x6cea('50','PPL3')]=![];size=0x1;console['log'](_0x6cea('51','h]*)'));console['log'](trialActivityIdList[_0x6cea('52','1wtK')]);if(trialActivityIdList['length']<args_xh[_0x6cea('53','49FD')]&&_0x260111['agBJJ']($[_0x6cea('54','%nLc')],![])){if(_0x260111[_0x6cea('55','chfO')](_0x6cea('56','%nLc'),_0x260111[_0x6cea('57','W97h')])){$[_0x6cea('58','[iJ7')]++;$[_0x6cea('59','S[iR')]=0x1;$[_0x6cea('5a','iNJq')]=0x1;}else{console['log']('\x20');while(_0x260111['EjVQb'](trialActivityIdList[_0x6cea('5b','0ZUi')],args_xh[_0x6cea('5c','DPFq')])&&_0x260111[_0x6cea('5d','[w$J')]($[_0x6cea('5e','p]]0')],![])){if(_0x260111['hvAWN'](_0x260111[_0x6cea('5f','a5^x')],_0x6cea('60','c)52'))){console['log'](_0x260111[_0x6cea('61','9s9N')]);$['totalSuccess']++;}else{if(_0x260111['hvAWN']($['nowTabIdIndex'],args_xh[_0x6cea('62','iNJq')][_0x6cea('63','a5^x')])){console[_0x6cea('41','9Gvu')]('tabId组已遍历完毕，不在获取商品\x0a');break;}else{if(_0x260111[_0x6cea('64','hmvB')](_0x260111[_0x6cea('65','3XO5')],_0x260111[_0x6cea('66','9s9N')])){$['isForbidden']=!![];console['log'](_0x6cea('67','E$%d'));}else{await _0x260111[_0x6cea('68','AFRv')](try_feedsList,args_xh[_0x6cea('69','2CKC')][$['nowTabIdIndex']],$[_0x6cea('6a','Ad$r')]);}}if(_0x260111['EjVQb'](trialActivityIdList[_0x6cea('6b','$Iki')],args_xh['maxLength'])){console['log'](_0x6cea('6c','lfBZ'));await $['wait'](0xfa0);}}}}}if($[_0x6cea('6d','9]wa')]===![]&&_0x260111[_0x6cea('6e','3XO5')]($[_0x6cea('6f','ld2z')],![])){console[_0x6cea('70','FEB1')](_0x6cea('71','2apZ'));await $['wait'](0x7d0);for(let _0x39ee1b=0x0;_0x260111[_0x6cea('72','fWtc')](_0x39ee1b,trialActivityIdList[_0x6cea('73','2CKC')])&&_0x260111[_0x6cea('74','2CKC')]($['isLimit'],![]);_0x39ee1b++){if(sfsq<trialActivityIdList['length']){if(_0x260111[_0x6cea('75','c)52')]!==_0x260111['FDwyt']){message+='⚠️\x20本次执行没有申请试用商品\x0a';message+=_0x6cea('76','p]]0')+$[_0x6cea('77','FEB1')]+'个商品待领取\x0a';message+='🎉\x20'+$[_0x6cea('78','2CKC')]+_0x6cea('79','@AI7');message+=_0x6cea('7a','hmvB')+$[_0x6cea('7b','fWtc')]+_0x6cea('7c','28Z]');message+='🗑\x20'+$[_0x6cea('7d','0ZUi')]+_0x6cea('7e','h]*)');}else{for(let _0x4bfd23=0x0;_0x260111['XhpuF'](_0x4bfd23,$['cookiesArr'][_0x6cea('7f','pvlM')]);_0x4bfd23++){if(_0x260111[_0x6cea('80','OrkO')]===_0x260111['kLZkd']){if($[_0x6cea('81','%nLc')][_0x4bfd23]){$['cookie']=$[_0x6cea('81','%nLc')][_0x4bfd23];$['UserName']=_0x260111[_0x6cea('82','3XO5')](decodeURIComponent,$[_0x6cea('83','pvlM')][_0x6cea('84','a5^x')](/pt_pin=(.+?);/)&&$[_0x6cea('85','a5^x')][_0x6cea('86','NM)3')](/pt_pin=(.+?);/)[0x1]);$[_0x6cea('87','x8bn')]=_0x260111[_0x6cea('88','Zpj!')](_0x4bfd23,0x1);$[_0x6cea('89','fWtc')]=!![];if($[_0x6cea('8a','E$%d')]){console['log'](_0x260111['DoLFN']);break;}if(trialActivityIdList[_0x39ee1b]){if(_0x260111[_0x6cea('8b','AFRv')]!==_0x260111[_0x6cea('8c','Tdb(')]){console['log'](_0x260111['lWEpf']('【京东账号'+$[_0x6cea('8d','%nLc')]+_0x6cea('8e','c)52'),trialActivityIdList[_0x39ee1b])+'】');await _0x260111[_0x6cea('8f','Zpj!')](try_apply,trialActivityTitleList[_0x39ee1b],trialActivityIdList[_0x39ee1b]);ddtime=args_xh[_0x6cea('90','8([C')]/$[_0x6cea('91','Zpj!')][_0x6cea('92','49FD')];console['log'](_0x6cea('93','[iJ7')+ddtime+_0x6cea('94','PHc0'));await $[_0x6cea('95','3XO5')](ddtime);}else{console['log'](_0x6cea('96','[w$J'));}}}}else{$['msg']($[_0x6cea('97','3]u0')],'',message,{'open-url':_0x260111[_0x6cea('98','@AI7')]});if($[_0x6cea('99','fWtc')]())notifyMsg+=''+message;}}}}sfsq+=0x1;}console[_0x6cea('70','FEB1')](_0x260111['xQwNx']);$['giveupNum']=0x0;$[_0x6cea('9a','c)52')]=0x0;$[_0x6cea('9b','W97h')]=0x0;$[_0x6cea('9c','3XO5')]=0x0;await try_MyTrials(0x1,0x2);await _0x260111[_0x6cea('9d','Ad$r')](showMsg);}}}if($[_0x6cea('9e','2apZ')]()){if(_0x260111[_0x6cea('9f','BIkW')](_0x260111[_0x6cea('a0','0ZUi')]($[_0x6cea('a1','S[iR')],args_xh[_0x6cea('a2','&Sh%')]),0x0)){$[_0x6cea('a3','N[dc')]++;console[_0x6cea('a4','DPFq')](_0x6cea('a5','Ad$r')+$['sentNum']+_0x6cea('a6','Ad$r')+args_xh[_0x6cea('a7','pvlM')]);await $[_0x6cea('a8','Ad$r')][_0x6cea('a9','a5^x')](''+$[_0x6cea('aa','%nLc')],''+notifyMsg);notifyMsg='';}}}if($[_0x6cea('ab','E$%d')]()){if(_0x260111['VoGnA'](_0x260111[_0x6cea('ac','1wtK')],_0x260111['DZPKf'])){if($[_0x6cea('ad','49FD')]['length']-$['sentNum']*args_xh['sendNum']<args_xh[_0x6cea('a2','&Sh%')]){if(_0x260111['zgRii'](_0x260111['Kqidm'],_0x260111['NORdG'])){console['log'](_0x6cea('ae','%nLc')+($[_0x6cea('af','9s9N')]['length']-$['sentNum']*args_xh[_0x6cea('b0','chfO')]));await $['notify'][_0x6cea('b1','9s9N')](''+$['name'],''+notifyMsg);notifyMsg='';}else{trialActivityIdList[_0x6cea('b2','a5^x')](trialActivityIdList[_0x6cea('b3','pvlM')](_0x20fb35=>_0x20fb35==activityId),0x1);console['log'](data[_0x6cea('b4','9]wa')]);}}}else{trialActivityIdList['splice'](trialActivityIdList['findIndex'](_0x465c3b=>_0x465c3b==activityId),0x1);console[_0x6cea('b5','9]wa')](data);}}})()['catch'](_0x551d3a=>{console[_0x6cea('b6',']dW[')]('❗️\x20'+$[_0x6cea('b7','pvlM')]+_0x6cea('b8','%nLc')+_0x551d3a);})['finally'](()=>$['done']());function requireConfig(){var _0x47a7be={'guidp':_0x6cea('b9','$Iki'),'yRmKR':function(_0x5eb4b4,_0x38bd44){return _0x5eb4b4(_0x38bd44);},'GSzvl':_0x6cea('ba','chfO'),'FHNFN':_0x6cea('bb','0ZUi'),'PbklR':function(_0x4fea2c,_0x19db42){return _0x4fea2c(_0x19db42);},'AsTWP':'./jdCookie.js','FLhOr':function(_0x1ee61c,_0x1cdbe5){return _0x1ee61c===_0x1cdbe5;},'tQEtk':_0x6cea('bc','2CKC'),'Ztsmr':function(_0x5afd7a,_0x33d47c){return _0x5afd7a(_0x33d47c);},'IuFuQ':'CookiesJD','dhETZ':function(_0x33a1e9,_0x4cae9a){return _0x33a1e9===_0x4cae9a;},'ENcRt':_0x6cea('bd','PHc0'),'pWies':'true','HAibs':function(_0x14c1b6,_0x418240){return _0x14c1b6===_0x418240;},'hBCBd':function(_0x1e7d08,_0xc1ad79){return _0x1e7d08===_0xc1ad79;},'XyJpl':function(_0x5b97d1){return _0x5b97d1();}};return new Promise(_0x54ab61=>{console['log'](_0x47a7be[_0x6cea('be','2apZ')]);$['notify']=$['isNode']()?_0x47a7be[_0x6cea('bf','S[iR')](require,_0x47a7be[_0x6cea('c0','28Z]')]):{'sendNotify':async()=>{}};$[_0x6cea('c1','PPL3')]=[];if($['isNode']()){if(_0x47a7be[_0x6cea('c2','&Sh%')]!==_0x47a7be[_0x6cea('c3','c)52')]){return JSON[_0x6cea('c4',']dW[')](str);}else{const _0x13ad2=_0x47a7be[_0x6cea('c5','PPL3')](require,_0x47a7be[_0x6cea('c6','S[iR')]);Object['keys'](_0x13ad2)[_0x6cea('c7','PPL3')](_0x3900a5=>{if(_0x13ad2[_0x3900a5])$['cookiesArr'][_0x6cea('c8','ld2z')](_0x13ad2[_0x3900a5]);});if(process[_0x6cea('c9','3XO5')][_0x6cea('ca','8([C')]&&_0x47a7be[_0x6cea('cb','h]*)')](process[_0x6cea('cc','c)52')][_0x6cea('cd','iNJq')],_0x47a7be['tQEtk']))console[_0x6cea('22','A!Ro')]=()=>{};}}else{$[_0x6cea('ce','OrkO')]=[$[_0x6cea('cf','Rwdr')](_0x6cea('d0','Ad$r')),$[_0x6cea('d1','FEB1')]('CookieJD2'),..._0x47a7be['Ztsmr'](jsonParse,$[_0x6cea('d2','c)52')](_0x47a7be[_0x6cea('d3','E$%d')])||'[]')[_0x6cea('d4','p]]0')](_0x2520dd=>_0x2520dd[_0x6cea('d5','iNJq')])][_0x6cea('d6','9s9N')](_0x61dc7c=>!!_0x61dc7c);}if(_0x47a7be[_0x6cea('d7','3XO5')](typeof process[_0x6cea('cc','c)52')]['JD_TRY_WHITELIST'],_0x47a7be[_0x6cea('d8','2apZ')]))args_xh['whiteList']=![];else args_xh[_0x6cea('d9','AFRv')]=process[_0x6cea('da','28Z]')][_0x6cea('db','x8bn')]===_0x47a7be[_0x6cea('dc','PHc0')];if(typeof process[_0x6cea('dd','a5^x')][_0x6cea('de','%nLc')]===_0x47a7be[_0x6cea('df','9]wa')])args_xh['printLog']=!![];else args_xh[_0x6cea('e0','Rwdr')]=_0x47a7be[_0x6cea('e1','S[iR')](process[_0x6cea('e2','FEB1')][_0x6cea('e3','qsBQ')],_0x6cea('e4','FEB1'));if(_0x47a7be[_0x6cea('e5','FEB1')](typeof process['env'][_0x6cea('e6','49FD')],_0x47a7be['ENcRt']))args_xh[_0x6cea('e7','$Iki')]=!![];else args_xh['passZhongCao']=_0x47a7be[_0x6cea('e8','28Z]')](process['env'][_0x6cea('e9','qsBQ')],_0x47a7be[_0x6cea('ea','S[iR')]);for(let _0x155f00 of $[_0x6cea('eb','PHc0')])args_xh['titleFilters'][_0x6cea('ec','0ZUi')](_0x155f00);console['log']('共'+$[_0x6cea('ed','chfO')][_0x6cea('ee','x8bn')]+_0x6cea('ef','9Gvu'));console['log'](_0x6cea('f0','28Z]'));console[_0x6cea('f1','PPL3')]('jdPrice:\x20'+typeof args_xh[_0x6cea('f2','NM)3')]+',\x20'+args_xh[_0x6cea('f3','BIkW')]);console[_0x6cea('f4','1wtK')]('tabId:\x20'+typeof args_xh[_0x6cea('f5','c)52')]+',\x20'+args_xh['tabId']);console[_0x6cea('f6','lfBZ')]('titleFilters:\x20'+typeof args_xh['titleFilters']+',\x20'+args_xh[_0x6cea('f7','3XO5')]);console['log'](_0x6cea('f8','h]*)')+typeof args_xh[_0x6cea('f9','2CKC')]+',\x20'+args_xh['trialPrice']);console[_0x6cea('fa','hmvB')](_0x6cea('fb','NM)3')+typeof args_xh[_0x6cea('fc','3]u0')]+',\x20'+args_xh[_0x6cea('fd','3XO5')]);console[_0x6cea('fe','a5^x')]('applyNumFilter:\x20'+typeof args_xh[_0x6cea('ff','3]u0')]+',\x20'+args_xh[_0x6cea('100','PHc0')]);console['log'](_0x6cea('101','@AI7')+typeof args_xh['applyInterval']+',\x20'+args_xh['applyInterval']);console[_0x6cea('102','$Iki')]('maxLength:\x20'+typeof args_xh[_0x6cea('103','[iJ7')]+',\x20'+args_xh[_0x6cea('104','AFRv')]);console[_0x6cea('105','chfO')](_0x6cea('106','2CKC')+typeof args_xh[_0x6cea('107','S[iR')]+',\x20'+args_xh[_0x6cea('108','qsBQ')]);console[_0x6cea('109','@AI7')]('printLog:\x20'+typeof args_xh[_0x6cea('10a','Tdb(')]+',\x20'+args_xh['printLog']);console['log']('whiteList:\x20'+typeof args_xh['whiteList']+',\x20'+args_xh[_0x6cea('10b','[w$J')]);console[_0x6cea('20','0ZUi')](_0x6cea('10c','iNJq')+typeof args_xh['whiteListKeywords']+',\x20'+args_xh[_0x6cea('10d','Rwdr')]);console[_0x6cea('33','h]*)')](_0x6cea('10e','PPL3'));_0x47a7be[_0x6cea('10f','1wtK')](_0x54ab61);});}function try_tabList(){var _0x2af185={'rTdDK':function(_0x62792c,_0x73630e){return _0x62792c===_0x73630e;},'eEyUa':_0x6cea('110','@AI7'),'WpsBu':_0x6cea('111','NM)3'),'sEGwD':function(_0x361b78,_0x2f121a){return _0x361b78===_0x2f121a;},'dONcR':_0x6cea('112','c)52'),'ykUSB':function(_0x559179,_0x334b37){return _0x559179!==_0x334b37;},'FqPrQ':_0x6cea('113','&Sh%'),'QxuTe':_0x6cea('114','3XO5'),'JEAOX':function(_0x413dc3,_0x53b02e){return _0x413dc3(_0x53b02e);},'UAHuf':function(_0x293a68){return _0x293a68();},'eUCnf':function(_0x460171,_0x1c45eb){return _0x460171===_0x1c45eb;},'HiCDE':_0x6cea('115','S[iR'),'HUROt':_0x6cea('116','2apZ'),'TxQEZ':function(_0x3d39a0,_0x4c5ab8,_0x4d7071,_0x127c92){return _0x3d39a0(_0x4c5ab8,_0x4d7071,_0x127c92);},'xnLzS':_0x6cea('117','a5^x'),'lWnbt':_0x6cea('118','qsBQ')};return new Promise((_0x175b03,_0x15ff1b)=>{if(_0x2af185['eUCnf'](_0x2af185['HiCDE'],_0x2af185[_0x6cea('119','3XO5')])){if(_0x2af185[_0x6cea('11a','ld2z')](JSON[_0x6cea('11b','A!Ro')](err),_0x6cea('11c','pvlM'))){$[_0x6cea('11d','*90a')]=!![];console['log'](_0x2af185['eEyUa']);}else{console[_0x6cea('2c','Tdb(')](JSON['stringify'](err));console['log']($[_0x6cea('35','@AI7')]+'\x20API请求失败，请检查网路重试');}}else{console['log'](_0x6cea('11e','&Sh%'));const _0x5d4908=JSON[_0x6cea('11f','qsBQ')]({'previewTime':''});let _0x26c2b0=_0x2af185[_0x6cea('120','28Z]')](taskurl_xh,_0x2af185[_0x6cea('121','[w$J')],_0x2af185[_0x6cea('122','[iJ7')],_0x5d4908);$['get'](_0x26c2b0,(_0x31afa8,_0x252da7,_0x375179)=>{if(_0x2af185[_0x6cea('123','iNJq')]!==_0x2af185[_0x6cea('124','Ad$r')]){console[_0x6cea('125','S[iR')](_0x6cea('126','8([C')+arguments['callee'][_0x6cea('127','$Iki')][_0x6cea('128','2CKC')]()+_0x6cea('129','*90a')+JSON[_0x6cea('12a','E$%d')](_0x31afa8));}else{try{if(_0x31afa8){if(_0x2af185[_0x6cea('12b','2apZ')](JSON['stringify'](_0x31afa8),'\x22Response\x20code\x20403\x20(Forbidden)\x22')){if(_0x2af185['sEGwD']('aeKuF',_0x2af185[_0x6cea('12c','W97h')])){$[_0x6cea('12d','8([C')]=!![];console[_0x6cea('2a',']dW[')](_0x2af185[_0x6cea('12e','S[iR')]);}else{args_xh[_0x6cea('12f','3XO5')]?console['log'](_0x6cea('130','N[dc')+item[_0x6cea('131','h]*)')]+_0x6cea('132','PHc0')+args_xh[_0x6cea('133','pvlM')]+'\x20\x0a'):'';}}else{if(_0x2af185[_0x6cea('134','1wtK')]('sNWug',_0x2af185[_0x6cea('135','FEB1')])){console[_0x6cea('136','2CKC')](JSON[_0x6cea('137','h]*)')](_0x31afa8));console['log']($['name']+_0x6cea('138','8([C'));}else{args_xh[_0x6cea('139','1wtK')]?console['log'](_0x6cea('13a','h]*)')):'';}}}else{_0x375179=JSON['parse'](_0x375179);if(_0x375179['success']){for(let _0x17f1b7 of _0x375179['data'][_0x6cea('13b','iNJq')])console['log'](_0x17f1b7['tabName']+_0x6cea('13c','NM)3')+_0x17f1b7['tabId']);}else{console['log'](_0x2af185[_0x6cea('13d','$Iki')],_0x375179);}}}catch(_0x2f43f9){_0x2af185[_0x6cea('13e','*90a')](_0x15ff1b,_0x6cea('13f','a5^x')+arguments[_0x6cea('140','ld2z')][_0x6cea('141','9Gvu')][_0x6cea('142','W97h')]()+'\x20API返回结果解析出错\x0a'+_0x2f43f9+'\x0a'+JSON['stringify'](_0x375179));}finally{_0x2af185[_0x6cea('143','28Z]')](_0x175b03);}}});}});}function try_feedsList(_0x39425f,_0x4ee203){var _0x2af132={'HbvfK':_0x6cea('144','9s9N'),'awBGi':function(_0x1f201a,_0x2e6194){return _0x1f201a===_0x2e6194;},'MHwGw':'false','oyPrl':_0x6cea('145','3XO5'),'OCuzn':_0x6cea('146','p]]0'),'ebZbA':'试用资格将保留','sHdZt':_0x6cea('147','ld2z'),'HvUQI':function(_0x5f2136,_0x568cc2){return _0x5f2136===_0x568cc2;},'xpSoO':_0x6cea('148','PPL3'),'KNvdh':'jRBzI','ZJPVk':'oiQMF','ZPUqa':function(_0x5ec585,_0x19f02a){return _0x5ec585!==_0x19f02a;},'pVUqn':_0x6cea('149','28Z]'),'rmSJC':'JiEqR','qadjG':_0x6cea('14a','2apZ'),'dtLzC':_0x6cea('14b','ld2z'),'WigtB':_0x6cea('14c','2apZ'),'aoRUK':'AMLNd','OpXci':function(_0x476128,_0x3413a3){return _0x476128===_0x3413a3;},'ippDb':function(_0x4975e2,_0x2b4395){return _0x4975e2(_0x2b4395);},'aYcUK':function(_0x10b750,_0x55de31){return _0x10b750<_0x55de31;},'rSUYD':_0x6cea('14d',']dW['),'qFomJ':_0x6cea('14e','fWtc'),'SrqIg':_0x6cea('14f','49FD'),'JExqV':function(_0x1fe76d,_0x59d03f){return _0x1fe76d<_0x59d03f;},'Iarah':'KzrNk','fpjKE':function(_0x38679f){return _0x38679f();},'yEVWx':function(_0x4e820d,_0x1a3eb4){return _0x4e820d===_0x1a3eb4;},'Vvgvl':_0x6cea('150','c)52'),'OhqIY':_0x6cea('151','Rwdr'),'TqiCT':_0x6cea('152','h]*)')};return new Promise((_0x1d4f30,_0x462735)=>{var _0x43c496={'gYoYU':_0x2af132[_0x6cea('153','@AI7')],'HbSrK':function(_0x489d9a,_0x5452c3){return _0x489d9a(_0x5452c3);},'cRVDM':_0x6cea('154','3]u0'),'aWJCC':function(_0x20defe,_0x376d33){return _0x2af132['awBGi'](_0x20defe,_0x376d33);},'ttxMe':_0x2af132[_0x6cea('155','0ZUi')],'AtBby':_0x2af132[_0x6cea('156','9s9N')],'yhwEr':_0x6cea('157','lfBZ'),'iPmAu':_0x2af132[_0x6cea('158','NM)3')],'rLucD':'zh-cn','XEjZj':_0x6cea('159','8([C'),'KiCjb':_0x6cea('15a','NM)3'),'AIBHD':function(_0x2e3cc0,_0x5b451){return _0x2af132[_0x6cea('15b','2CKC')](_0x2e3cc0,_0x5b451);},'exXkQ':_0x2af132[_0x6cea('15c','c)52')],'qsrnZ':_0x2af132[_0x6cea('15d','3XO5')],'zfAbj':function(_0x3c5d69,_0x809584){return _0x2af132[_0x6cea('15e','*90a')](_0x3c5d69,_0x809584);},'JjkAi':_0x2af132[_0x6cea('15f','Tdb(')],'GweHe':_0x2af132['KNvdh'],'WAEYu':_0x2af132[_0x6cea('160','Zpj!')],'zIxJU':function(_0x565cf7,_0x1c76bf){return _0x565cf7===_0x1c76bf;},'wuGAa':_0x6cea('161','PPL3'),'dAVXX':function(_0x1dc988,_0x425a89){return _0x1dc988===_0x425a89;},'GFwsr':function(_0x11f632,_0x4e8a73){return _0x2af132[_0x6cea('162','AFRv')](_0x11f632,_0x4e8a73);},'pVyml':_0x2af132['pVUqn'],'oNbwl':_0x2af132['rmSJC'],'uojEo':_0x2af132[_0x6cea('163','OrkO')],'ZDcxE':function(_0x31c953,_0xeab403){return _0x31c953===_0xeab403;},'fVsHe':function(_0x42d9f3,_0x161cde){return _0x2af132[_0x6cea('164','PHc0')](_0x42d9f3,_0x161cde);},'IpVqb':_0x2af132[_0x6cea('165','9]wa')],'CAkph':function(_0x4230d7,_0x474dd1){return _0x4230d7!==_0x474dd1;},'RNJqL':_0x6cea('166','*90a'),'mduiV':_0x2af132[_0x6cea('167','x8bn')],'WwgMW':_0x2af132[_0x6cea('168','BIkW')],'xPuVR':function(_0x255fae,_0x4282b0){return _0x2af132['OpXci'](_0x255fae,_0x4282b0);},'NSXPS':_0x6cea('169','lfBZ'),'WiBcd':function(_0x167dc1,_0x16e045){return _0x2af132['ippDb'](_0x167dc1,_0x16e045);},'xfAfr':function(_0x14ee6d,_0x7d8a76){return _0x2af132['ZPUqa'](_0x14ee6d,_0x7d8a76);},'MHrip':'LULye','oOqgo':_0x6cea('16a','9s9N'),'OXjJH':function(_0x2d5eef,_0x43a7dc){return _0x2af132[_0x6cea('16b','Tdb(')](_0x2d5eef,_0x43a7dc);},'QHCEt':function(_0x18a71e,_0x440f20){return _0x18a71e===_0x440f20;},'uVNbu':_0x2af132[_0x6cea('16c','OrkO')],'ZbMAZ':_0x2af132['qFomJ'],'qtplh':_0x2af132[_0x6cea('16d','PHc0')],'WTzZx':function(_0x3e5cd2,_0x3cbaac){return _0x2af132['OpXci'](_0x3e5cd2,_0x3cbaac);},'PEcOw':function(_0x19fc7d,_0xc8ee74){return _0x2af132[_0x6cea('16e','28Z]')](_0x19fc7d,_0xc8ee74);},'fzlaB':function(_0x3032d6,_0x4c2d44){return _0x2af132['OpXci'](_0x3032d6,_0x4c2d44);},'fBiKJ':_0x2af132['Iarah'],'ggWFk':function(_0x1c16c8){return _0x2af132['fpjKE'](_0x1c16c8);}};if(_0x2af132[_0x6cea('16f','E$%d')](_0x2af132[_0x6cea('170','h]*)')],_0x2af132[_0x6cea('171','9s9N')])){console[_0x6cea('172','*90a')](_0x43c496[_0x6cea('173','&Sh%')],data);}else{const _0x351a75=JSON['stringify']({'tabId':''+_0x39425f,'page':_0x4ee203,'previewTime':''});let _0x2e0774=taskurl_xh(_0x2af132[_0x6cea('174','A!Ro')],'try_feedsList',_0x351a75);$[_0x6cea('175','a5^x')](_0x2e0774,(_0x569056,_0x27ff55,_0x4e2dbd)=>{var _0x446180={'UdUbe':function(_0x4a3d5f,_0xe4191c){return _0x4a3d5f(_0xe4191c);}};try{if(_0x43c496[_0x6cea('176','fWtc')]!==_0x43c496[_0x6cea('177','Ad$r')]){if(_0x569056){if(_0x43c496[_0x6cea('178','pvlM')](JSON['stringify'](_0x569056),_0x6cea('179','E$%d'))){$[_0x6cea('11d','*90a')]=!![];console[_0x6cea('41','9Gvu')](_0x43c496[_0x6cea('17a','8([C')]);}else{console[_0x6cea('17b','c)52')](JSON[_0x6cea('17c','N[dc')](_0x569056));console[_0x6cea('fa','hmvB')]($[_0x6cea('141','9Gvu')]+_0x6cea('138','8([C'));}}else{_0x4e2dbd=JSON[_0x6cea('17d','@AI7')](_0x4e2dbd);let _0x598618='';if(_0x4e2dbd[_0x6cea('17e','@AI7')]){$[_0x6cea('17f','9s9N')]=_0x4e2dbd[_0x6cea('180','Tdb(')]['pages'];_0x43c496[_0x6cea('181','ld2z')]($['nowPage'],$[_0x6cea('182','fWtc')])?$[_0x6cea('183','Tdb(')]=0x1:$[_0x6cea('184','N[dc')]++;console[_0x6cea('185','28Z]')]('第\x20'+size++ +_0x6cea('186','pvlM')+args_xh[_0x6cea('187','49FD')][$[_0x6cea('188','28Z]')]]+_0x6cea('189','8([C')+_0x4ee203+'/'+$[_0x6cea('18a','49FD')]+'\x20页');console['log'](_0x6cea('18b','h]*)')+_0x4e2dbd[_0x6cea('18c','OrkO')][_0x6cea('18d','OrkO')]['length']+'\x20条');for(let _0x4c48d6 of _0x4e2dbd[_0x6cea('18e','PHc0')][_0x6cea('18f','chfO')]){if(_0x43c496[_0x6cea('190','A!Ro')](_0x43c496['pVyml'],_0x43c496[_0x6cea('191',']dW[')])){const _0x4f5a0f=_0x43c496[_0x6cea('192','Zpj!')](require,_0x43c496[_0x6cea('193','iNJq')]);Object[_0x6cea('194','3XO5')](_0x4f5a0f)[_0x6cea('195','@AI7')](_0x5c20bf=>{if(_0x4f5a0f[_0x5c20bf])$[_0x6cea('ce','OrkO')]['push'](_0x4f5a0f[_0x5c20bf]);});if(process[_0x6cea('196','2CKC')][_0x6cea('197','9Gvu')]&&_0x43c496['aWJCC'](process['env'][_0x6cea('198','3XO5')],_0x43c496['ttxMe']))console[_0x6cea('2a',']dW[')]=()=>{};}else{if(_0x4c48d6['applyNum']===null){if(_0x43c496[_0x6cea('199','x8bn')](_0x43c496[_0x6cea('19a','E$%d')],_0x6cea('19b','N[dc'))){_0x446180['UdUbe'](_0x1d4f30,_0x4e2dbd||[]);}else{args_xh[_0x6cea('19c','A!Ro')]?console['log'](_0x6cea('19d','fWtc')+_0x4c48d6[_0x6cea('19e','AFRv')]+'\x0a'):'';continue;}}if(trialActivityIdList[_0x6cea('19f','[iJ7')]>=args_xh[_0x6cea('1a0','%nLc')]){console[_0x6cea('1a1','fWtc')](_0x43c496[_0x6cea('1a2','qsBQ')]);break;}if(_0x43c496[_0x6cea('1a3','S[iR')](_0x4c48d6[_0x6cea('1a4','Ad$r')],0x1)){args_xh[_0x6cea('1a5',']dW[')]?console['log']('商品已申请试用：'+_0x4c48d6[_0x6cea('1a6','*90a')]+'\x0a'):'';continue;}if(_0x43c496[_0x6cea('1a7','2apZ')](_0x4c48d6[_0x6cea('1a8','2apZ')],null)){if(_0x43c496[_0x6cea('1a9','pvlM')]('PUZzH',_0x43c496['IpVqb'])){args_xh[_0x6cea('1aa','DPFq')]?console['log'](_0x6cea('1ab','Tdb(')):'';continue;}else{args_xh[_0x6cea('139','1wtK')]?console['log']('商品被过滤，含有关键词\x20'+_0x598618+'\x0a'):'';}}if(args_xh['passZhongCao']){$['isPush']=!![];if(_0x43c496[_0x6cea('1ac','DPFq')](_0x4c48d6['tagList'][_0x6cea('1ad','ld2z')],0x0)){for(let _0x5aeea0 of _0x4c48d6[_0x6cea('1ae','[w$J')]){if(_0x43c496['CAkph'](_0x6cea('1af','hmvB'),_0x43c496[_0x6cea('1b0','x8bn')])){if(_0x43c496[_0x6cea('1b1','[w$J')](_0x5aeea0[_0x6cea('1b2','ld2z')],0x3)){args_xh['printLog']?console[_0x6cea('1b3','N[dc')](_0x43c496[_0x6cea('1b4','chfO')]):'';$['isPush']=![];break;}}else{$['nickName']=_0x4e2dbd[_0x43c496[_0x6cea('1b5','3]u0')]]&&_0x4e2dbd[_0x43c496[_0x6cea('1b6','2apZ')]][_0x6cea('1b7','hmvB')]||$[_0x6cea('1b8','2CKC')];}}}}if(_0x4c48d6[_0x6cea('1b9','c)52')]&&$[_0x6cea('1ba','ld2z')]){args_xh[_0x6cea('1bb','AFRv')]?console['log']('检测\x20tabId:'+args_xh[_0x6cea('1bc','Tdb(')][$[_0x6cea('1bd','PPL3')]]+_0x6cea('1be','Ad$r')+_0x4ee203+'/'+$[_0x6cea('18a','49FD')]+_0x6cea('1bf','x8bn')+($[_0x6cea('1c0','h]*)')]++ +0x1)+'\x20个商品\x0a'+_0x4c48d6[_0x6cea('1c1','pvlM')]):'';if(args_xh['whiteList']){if(_0x43c496[_0x6cea('1c2','Ad$r')]!=='QjaEP'){if(args_xh[_0x6cea('1c3','@AI7')][_0x6cea('1c4','9s9N')](_0x11ceb0=>_0x4c48d6['skuTitle'][_0x6cea('1c5','DPFq')](_0x11ceb0))){args_xh[_0x6cea('1c6','&Sh%')]?console['log'](_0x6cea('1c7','3]u0')+_0x4c48d6[_0x6cea('1c8','lfBZ')]+'\x0a'):'';trialActivityIdList[_0x6cea('1c9','Ad$r')](_0x4c48d6[_0x6cea('1ca','fWtc')]);trialActivityTitleList[_0x6cea('1cb','W97h')](_0x4c48d6[_0x6cea('1cc','fWtc')]);}}else{console[_0x6cea('d','W97h')](_0x4e2dbd[_0x6cea('1cd','9Gvu')]);$['$'][_0x6cea('1ce','h]*)')]=!![];}}else{if(_0x43c496[_0x6cea('1cf','p]]0')](_0x43c496[_0x6cea('1d0','hmvB')],_0x43c496['NSXPS'])){_0x598618='';if(_0x43c496[_0x6cea('1d1','ld2z')](parseFloat,_0x4c48d6[_0x6cea('1d2','1wtK')])<=args_xh['jdPrice']){args_xh['printLog']?console[_0x6cea('105','chfO')](_0x6cea('1d3','fWtc')+_0x4c48d6[_0x6cea('1d4','[w$J')]+_0x6cea('1d5','[w$J')+args_xh[_0x6cea('1d6','2apZ')]+'\x20\x0a'):'';}else if(parseFloat(_0x4c48d6['supplyNum'])<args_xh[_0x6cea('1d7','c)52')]&&_0x43c496['xfAfr'](_0x4c48d6[_0x6cea('1d8','p]]0')],null)){args_xh[_0x6cea('1d9','W97h')]?console['log']('商品被过滤，提供申请的份数小于预设申请的份数\x20\x0a'):'';}else if(parseFloat(_0x4c48d6[_0x6cea('1da','9s9N')])>args_xh['applyNumFilter']&&_0x4c48d6['applyNum']!==null){if(_0x43c496[_0x6cea('1db','28Z]')]!==_0x43c496[_0x6cea('1dc','[iJ7')]){args_xh[_0x6cea('1d9','W97h')]?console[_0x6cea('1dd','2apZ')](_0x6cea('1de','Ad$r')):'';}else{console[_0x6cea('1df','Zpj!')](JSON[_0x6cea('1e0','PPL3')](_0x569056));console[_0x6cea('1e1','3]u0')]($['name']+_0x6cea('1e2','3]u0'));}}else if(_0x43c496['OXjJH'](_0x43c496[_0x6cea('1e3','DPFq')](parseFloat,_0x4c48d6[_0x6cea('1e4','A!Ro')]),args_xh[_0x6cea('1e5','@AI7')])){args_xh[_0x6cea('1e6','Ad$r')]?console[_0x6cea('1e7','iNJq')]('商品被过滤，商品原价低于预设商品原价\x20\x0a'):'';}else if(args_xh['titleFilters'][_0x6cea('1e8','h]*)')](_0x5e73c7=>_0x4c48d6[_0x6cea('1e9','9]wa')][_0x6cea('1ea','hmvB')](_0x5e73c7)?_0x598618=_0x5e73c7:'')){if(_0x43c496[_0x6cea('1eb','a5^x')](_0x43c496['uVNbu'],_0x43c496[_0x6cea('1ec','AFRv')])){args_xh[_0x6cea('1ed','$Iki')]?console['log']('商品被过滤，含有关键词\x20'+_0x598618+'\x0a'):'';}else{console[_0x6cea('1ee','p]]0')](_0x6cea('1ef','a5^x')+$[_0x6cea('1f0','PPL3')]+_0x6cea('1f1','fWtc')+e);}}else{if(_0x43c496[_0x6cea('1f2','3XO5')]===_0x6cea('1f3','PPL3')){args_xh['printLog']?console[_0x6cea('1f4','E$%d')]('商品通过，将加入试用组，trialActivityId为'+_0x4c48d6[_0x6cea('1f5','x8bn')]+'\x0a'):'';trialActivityIdList[_0x6cea('1f6','h]*)')](_0x4c48d6['trialActivityId']);trialActivityTitleList['push'](_0x4c48d6['skuTitle']);}else{return{'url':URL+_0x6cea('1f7','NM)3')+appid+'&functionId='+functionId+_0x6cea('1f8','OrkO')+_0x43c496[_0x6cea('1f9','28Z]')](encodeURIComponent,_0x351a75),'headers':{'Host':'api.m.jd.com','Accept-Encoding':_0x43c496[_0x6cea('1fa','*90a')],'Cookie':$[_0x6cea('1fb','9s9N')],'Connection':_0x43c496['iPmAu'],'UserAgent':_0x6cea('1fc','A!Ro'),'Accept-Language':_0x43c496[_0x6cea('1fd','pvlM')],'Referer':_0x43c496['XEjZj']}};}}}else{console['log'](_0x4e2dbd[_0x6cea('1fe',']dW[')]);}}}else if($[_0x6cea('1ff','Tdb(')]!==![]){console[_0x6cea('200','S[iR')](_0x43c496[_0x6cea('201','BIkW')]);return;}}}console[_0x6cea('fe','a5^x')](_0x6cea('202','9Gvu')+trialActivityIdList['length']);args_xh[_0x6cea('1e6','Ad$r')]?console[_0x6cea('70','FEB1')](''+trialActivityIdList):'';if(_0x43c496[_0x6cea('203','2apZ')](_0x4ee203,$[_0x6cea('204','x8bn')])&&_0x43c496[_0x6cea('205','2CKC')]($[_0x6cea('206','E$%d')],args_xh[_0x6cea('207','OrkO')]['length'])){$['nowTabIdIndex']++;$[_0x6cea('208','lfBZ')]=0x1;$['nowItem']=0x1;}}else{console['log']('💩\x20获得试用列表失败:\x20'+_0x4e2dbd[_0x6cea('209','FEB1')]);}}}else{if(args_xh[_0x6cea('20a','S[iR')][_0x6cea('20b','Ad$r')](_0x14ae2a=>item[_0x6cea('20c','3]u0')]['includes'](_0x14ae2a))){args_xh[_0x6cea('20d','ld2z')]?console[_0x6cea('20e','PHc0')](_0x6cea('20f','x8bn')+item[_0x6cea('210','&Sh%')]+'\x0a'):'';trialActivityIdList['push'](item[_0x6cea('211','2apZ')]);trialActivityTitleList[_0x6cea('212','2CKC')](item[_0x6cea('213','2apZ')]);}}}catch(_0x26172b){if(_0x43c496[_0x6cea('214','9Gvu')](_0x43c496['fBiKJ'],_0x43c496[_0x6cea('215','PPL3')])){_0x462735(_0x6cea('216','chfO')+arguments[_0x6cea('217','&Sh%')][_0x6cea('1f0','PPL3')]['toString']()+_0x6cea('218','@AI7')+_0x26172b+'\x0a'+JSON['stringify'](_0x4e2dbd));}else{if(_0x4e2dbd[_0x6cea('219','2apZ')]&&_0x4e2dbd[_0x6cea('21a','@AI7')]){for(let _0x378c76 of _0x4e2dbd[_0x6cea('21b','iNJq')][_0x6cea('21c','@AI7')]){_0x43c496['aWJCC'](_0x378c76[_0x6cea('21d','iNJq')],0x4)||_0x378c76[_0x6cea('21e','chfO')]['text'][_0x6cea('21f','1wtK')](_0x43c496[_0x6cea('220','9Gvu')])?$[_0x6cea('221','S[iR')]+=0x1:'';_0x43c496[_0x6cea('222','3]u0')](_0x378c76['status'],0x2)&&_0x378c76['text']['text'][_0x6cea('223','h]*)')](_0x43c496[_0x6cea('224','NM)3')])?$[_0x6cea('225','chfO')]+=0x1:'';_0x378c76[_0x6cea('226','Zpj!')]===0x2&&_0x378c76[_0x6cea('227','OrkO')]['text'][_0x6cea('228','A!Ro')](_0x43c496[_0x6cea('229','BIkW')])?$[_0x6cea('22a','lfBZ')]+=0x1:'';_0x43c496[_0x6cea('22b','DPFq')](_0x378c76['status'],0x2)&&_0x378c76['text'][_0x6cea('22c','PHc0')]['includes'](_0x43c496[_0x6cea('22d','1wtK')])?$[_0x6cea('22e','BIkW')]+=0x1:'';}console[_0x6cea('22f','AFRv')]('待领取\x20|\x20已领取\x20|\x20已完成\x20|\x20已放弃：'+$[_0x6cea('230','OrkO')]+'\x20|\x20'+$[_0x6cea('231','*90a')]+'\x20|\x20'+$['completeNum']+_0x6cea('232','N[dc')+$[_0x6cea('233','qsBQ')]);}else{console[_0x6cea('234','Ad$r')](_0x6cea('235','fWtc')+_0x4e2dbd['message']);}}}finally{_0x43c496[_0x6cea('236','E$%d')](_0x1d4f30);}});}});}function try_apply(_0x234839,_0x2d0880){var _0x23c165={'jMZsI':'已放弃','Qvbbs':function(_0x20674f,_0x3d5811){return _0x20674f===_0x3d5811;},'Qyuje':'请收货后尽快提交报告','MquTh':function(_0x1b2e06,_0x20d992){return _0x1b2e06(_0x20d992);},'fxKoS':'string','nwRUU':_0x6cea('237','[iJ7'),'DCFsd':_0x6cea('238','h]*)'),'gyhlb':_0x6cea('239',']dW['),'YKeVy':function(_0x3e620b,_0x479df0){return _0x3e620b!==_0x479df0;},'OSeWR':_0x6cea('23a','9]wa'),'RrRNA':_0x6cea('23b','pvlM'),'nDdUb':function(_0x59497f,_0x238e6a){return _0x59497f!==_0x238e6a;},'ZKIpc':_0x6cea('23c','9Gvu'),'IKvQG':function(_0x27a5f3,_0x1be9c9,_0x3653a6){return _0x27a5f3(_0x1be9c9,_0x3653a6);},'POolJ':_0x6cea('23d',']dW['),'ASfSD':'aEsjv','KuDdT':'申请失败','KwGdq':_0x6cea('23e','Ad$r'),'iuTYX':function(_0x135737,_0x112f78){return _0x135737!==_0x112f78;},'ypTji':_0x6cea('23f','9]wa'),'zkVGk':_0x6cea('240','ld2z'),'ihejz':'try_apply'};return new Promise((_0x468c44,_0x1e3c39)=>{var _0x4cb41b={'nnSrQ':_0x23c165[_0x6cea('241','AFRv')],'MZzrb':_0x6cea('242','iNJq'),'ZEFLK':function(_0x2746c4,_0x5f242a){return _0x23c165[_0x6cea('243','W97h')](_0x2746c4,_0x5f242a);},'yLAdv':_0x23c165[_0x6cea('244','c)52')],'wdfmk':function(_0x269208,_0x46da83){return _0x23c165['MquTh'](_0x269208,_0x46da83);},'Kpila':function(_0x431b6c,_0x533113){return _0x431b6c==_0x533113;},'EZjXE':_0x23c165[_0x6cea('245','3XO5')],'aZsdd':_0x23c165[_0x6cea('246','a5^x')],'PvQaq':_0x6cea('247','a5^x'),'KqojM':_0x23c165[_0x6cea('248','2CKC')],'wzAxI':function(_0x2ba85f,_0x29ca7c){return _0x23c165['Qvbbs'](_0x2ba85f,_0x29ca7c);},'NCOml':_0x6cea('249','AFRv'),'npMrt':function(_0x26ef52,_0x463835){return _0x23c165[_0x6cea('24a','9]wa')](_0x26ef52,_0x463835);},'qNQDH':_0x6cea('24b','*90a'),'OLGIK':function(_0x27f2f4,_0x4e2b16){return _0x27f2f4===_0x4e2b16;},'sADRd':_0x23c165[_0x6cea('24c','Rwdr')],'HxgWb':function(_0x15a74f,_0x1d5dd7){return _0x15a74f===_0x1d5dd7;},'FMUih':function(_0x597d38,_0x408e9b){return _0x23c165[_0x6cea('24d','2CKC')](_0x597d38,_0x408e9b);},'cARDO':_0x6cea('24e','&Sh%'),'mtESf':_0x23c165['OSeWR'],'kZWkf':_0x23c165[_0x6cea('24f','fWtc')],'gURwE':function(_0x1c3e8f,_0x7fae8c){return _0x23c165[_0x6cea('250','FEB1')](_0x1c3e8f,_0x7fae8c);},'FDqyg':_0x23c165['ZKIpc'],'YZrpV':'hSCdj','rquGr':function(_0x413eaa,_0x4ab47d,_0x2e7e08){return _0x23c165[_0x6cea('251','8([C')](_0x413eaa,_0x4ab47d,_0x2e7e08);},'sTdTT':_0x23c165[_0x6cea('252','BIkW')],'YlgiF':_0x23c165[_0x6cea('253','[iJ7')],'AxhGs':_0x23c165[_0x6cea('254','@AI7')],'KZtXX':_0x23c165[_0x6cea('255','chfO')],'lPCFB':_0x6cea('256','49FD'),'jZZMa':function(_0x405bc6){return _0x405bc6();}};if(_0x23c165['iuTYX'](_0x6cea('257','Rwdr'),_0x23c165[_0x6cea('258','Tdb(')])){for(let _0x4a9367 of data[_0x6cea('259','9Gvu')][_0x6cea('25a','Rwdr')]){_0x4a9367['status']===0x4||_0x4a9367['text'][_0x6cea('22c','PHc0')][_0x6cea('25b','$Iki')](_0x4cb41b[_0x6cea('25c','49FD')])?$['giveupNum']+=0x1:'';_0x4a9367[_0x6cea('25d','A!Ro')]===0x2&&_0x4a9367['text'][_0x6cea('25e','p]]0')]['includes'](_0x4cb41b[_0x6cea('25f',']dW[')])?$[_0x6cea('260','Zpj!')]+=0x1:'';_0x4cb41b[_0x6cea('261','DPFq')](_0x4a9367[_0x6cea('262','1wtK')],0x2)&&_0x4a9367[_0x6cea('263','AFRv')][_0x6cea('264','Rwdr')][_0x6cea('265','ld2z')](_0x4cb41b['yLAdv'])?$[_0x6cea('266','Zpj!')]+=0x1:'';_0x4cb41b[_0x6cea('267','Ad$r')](_0x4a9367[_0x6cea('268','Ad$r')],0x2)&&_0x4a9367[_0x6cea('269','x8bn')][_0x6cea('26a','3]u0')][_0x6cea('26b','x8bn')](_0x6cea('26c','%nLc'))?$['completeNum']+=0x1:'';}console['log'](_0x6cea('26d','W97h')+$[_0x6cea('26e','DPFq')]+_0x6cea('26f','9]wa')+$[_0x6cea('270','AFRv')]+'\x20|\x20'+$[_0x6cea('271','h]*)')]+_0x6cea('272','E$%d')+$['giveupNum']);}else{console[_0x6cea('273','3XO5')]('申请试用商品提交中...');args_xh[_0x6cea('19c','A!Ro')]?console[_0x6cea('22','A!Ro')]('商品：'+_0x234839):'';args_xh[_0x6cea('274','a5^x')]?console['log']('id为：'+_0x2d0880):'';const _0x47f697=JSON[_0x6cea('275','&Sh%')]({'activityId':_0x2d0880,'previewTime':''});let _0x50db70=taskurl_xh(_0x23c165['zkVGk'],_0x23c165[_0x6cea('276','DPFq')],_0x47f697);$[_0x6cea('277','3]u0')](_0x50db70,(_0x12b942,_0x1fcfc4,_0x35c548)=>{if(_0x4cb41b[_0x6cea('278','ld2z')](_0x4cb41b[_0x6cea('279','c)52')],_0x4cb41b[_0x6cea('27a','pvlM')])){try{if(_0x12b942){if(_0x4cb41b[_0x6cea('27b','Tdb(')](JSON['stringify'](_0x12b942),_0x6cea('27c','FEB1'))){$['isForbidden']=!![];console['log'](_0x4cb41b[_0x6cea('27d','8([C')]);}else{console[_0x6cea('185','28Z]')](JSON[_0x6cea('27e','FEB1')](_0x12b942));console['log']($['name']+_0x6cea('27f','BIkW'));}}else{$['totalTry']++;_0x35c548=JSON[_0x6cea('280','9Gvu')](_0x35c548);if(_0x35c548[_0x6cea('281','Zpj!')]&&_0x4cb41b[_0x6cea('282','1wtK')](_0x35c548[_0x6cea('283','A!Ro')],'1')){console[_0x6cea('1dd','2apZ')](_0x4cb41b[_0x6cea('284','S[iR')]);$[_0x6cea('285','Rwdr')]++;}else if(_0x35c548['code']==='-106'){trialActivityIdList[_0x6cea('286','9Gvu')](trialActivityIdList[_0x6cea('287','9s9N')](_0x4bf6d4=>_0x4bf6d4==_0x2d0880),0x1);console[_0x6cea('f6','lfBZ')](_0x35c548[_0x6cea('288','E$%d')]);}else if(_0x4cb41b[_0x6cea('289','qsBQ')](_0x35c548[_0x6cea('28a',']dW[')],_0x4cb41b[_0x6cea('28b','lfBZ')])){console['log'](_0x35c548['message']);}else if(_0x35c548[_0x6cea('28c','ld2z')]==='-120'){if(_0x4cb41b['OLGIK'](_0x6cea('28d','c)52'),_0x4cb41b['sADRd'])){_0x4cb41b[_0x6cea('28e','fWtc')](_0x1e3c39,_0x6cea('13f','a5^x')+arguments[_0x6cea('28f','N[dc')][_0x6cea('290','0ZUi')]['toString']()+_0x6cea('291','S[iR')+e+'\x0a'+JSON[_0x6cea('292','2CKC')](_0x35c548));}else{console[_0x6cea('293','49FD')](_0x35c548['message']);}}else if(_0x4cb41b[_0x6cea('294','BIkW')](_0x35c548[_0x6cea('295','PHc0')],_0x6cea('296',']dW['))){if(_0x4cb41b[_0x6cea('297','h]*)')](_0x4cb41b['cARDO'],_0x4cb41b['mtESf'])){trialActivityIdList['splice'](trialActivityIdList[_0x6cea('298','S[iR')](_0x2574b2=>_0x2574b2==_0x2d0880),0x1);console[_0x6cea('102','$Iki')](_0x35c548[_0x6cea('299','N[dc')]);}else{console[_0x6cea('29a','qsBQ')](_0x6cea('29b','*90a')+_0x35c548[_0x6cea('29c','%nLc')]);}}else if(_0x35c548[_0x6cea('29d','hmvB')]===_0x4cb41b[_0x6cea('29e','N[dc')]){console['log'](_0x35c548[_0x6cea('29f','A!Ro')]);$['$'][_0x6cea('2a0','qsBQ')]=!![];}else if(_0x35c548[_0x6cea('2a1','E$%d')]==='-113'){if(_0x4cb41b[_0x6cea('2a2',']dW[')](_0x4cb41b[_0x6cea('2a3','h]*)')],_0x4cb41b['YZrpV'])){console['log'](_0x35c548[_0x6cea('2a4','&Sh%')]);_0x4cb41b['rquGr'](setTimeout,function(){console[_0x6cea('fe','a5^x')]('操作太快，请等待\x206\x20秒\x0a');},0x1770);}else{console[_0x6cea('172','*90a')](JSON[_0x6cea('2a5','pvlM')](_0x12b942));console['log']($[_0x6cea('2a6','S[iR')]+'\x20API请求失败，请检查网路重试');}}else if(_0x4cb41b[_0x6cea('2a7','9Gvu')](_0x35c548[_0x6cea('283','A!Ro')],_0x4cb41b[_0x6cea('2a8','%nLc')])&&trialActivityIdList[_0x6cea('2a9','3]u0')](_0x2d0880)){trialActivityIdList[_0x6cea('2aa','W97h')](trialActivityIdList[_0x6cea('2ab','qsBQ')](_0x134687=>_0x134687==_0x2d0880),0x1);console[_0x6cea('2ac','x8bn')](_0x35c548);}else{if(_0x4cb41b[_0x6cea('2ad','PPL3')](_0x4cb41b[_0x6cea('2ae','PPL3')],_0x4cb41b[_0x6cea('2af','N[dc')])){console[_0x6cea('2b0','NM)3')](_0x4cb41b[_0x6cea('2b1','a5^x')],_0x35c548);}else{args_xh[_0x6cea('2b2','N[dc')]?console[_0x6cea('20e','PHc0')](_0x6cea('2b3','49FD')):'';}}}}catch(_0x16ed43){if(_0x4cb41b[_0x6cea('2b4','c)52')]===_0x4cb41b[_0x6cea('2b5','&Sh%')]){if(_0x4cb41b[_0x6cea('2b6','E$%d')](typeof str,_0x4cb41b['EZjXE'])){try{return JSON['parse'](str);}catch(_0x2ab65e){console[_0x6cea('22','A!Ro')](_0x2ab65e);$[_0x6cea('2b7','3]u0')]($['name'],'',_0x4cb41b[_0x6cea('2b8','FEB1')]);return[];}}}else{_0x4cb41b[_0x6cea('2b9','*90a')](_0x1e3c39,'⚠️\x20'+arguments['callee'][_0x6cea('2ba','&Sh%')]['toString']()+_0x6cea('2bb','*90a')+_0x16ed43+'\x0a'+JSON[_0x6cea('2bc','0ZUi')](_0x35c548));}}finally{_0x4cb41b['jZZMa'](_0x468c44);}}else{console[_0x6cea('2bd','Ad$r')](_0x6cea('2be','PPL3'));return;}});}});}function try_MyTrials(_0x14e74d,_0x440937){var _0x3039b5={'jIdpE':_0x6cea('2bf','*90a'),'vbwVQ':function(_0x477f02,_0x2b0d91){return _0x477f02===_0x2b0d91;},'kfJbR':function(_0x22d3b3,_0x14b0ea){return _0x22d3b3===_0x14b0ea;},'fZyfR':_0x6cea('2c0','Tdb('),'Albbs':_0x6cea('2c1','9Gvu'),'OcCDZ':_0x6cea('2c2','lfBZ'),'HfhJN':_0x6cea('2c3','BIkW'),'OcDOs':function(_0x57f71c,_0x86183f){return _0x57f71c===_0x86183f;},'ekTAP':_0x6cea('2c4','28Z]'),'JZznv':function(_0x12adb8,_0x10b8ef){return _0x12adb8===_0x10b8ef;},'ESsjY':_0x6cea('2c5','E$%d'),'KrkyI':'请收货后尽快提交报告','UBUKQ':'试用已完成','ftlNE':function(_0x589e3a,_0x15a416){return _0x589e3a!==_0x15a416;},'qyKaF':_0x6cea('2c6','[iJ7'),'iQKej':function(_0x364fb4,_0x21e73e){return _0x364fb4(_0x21e73e);},'jSxXb':function(_0x4285ef){return _0x4285ef();},'gccWE':_0x6cea('2c7','Ad$r'),'OTojU':'正在获取申请成功的商品...','meHMR':_0x6cea('2c8','$Iki'),'FFZgt':function(_0x1502dc,_0x35f941,_0x5d52fd,_0x2c8314){return _0x1502dc(_0x35f941,_0x5d52fd,_0x2c8314);},'AukrK':_0x6cea('2c9','3]u0')};return new Promise((_0x5a4e9d,_0x53bb3c)=>{switch(_0x440937){case 0x1:console['log'](_0x3039b5[_0x6cea('2ca','pvlM')]);break;case 0x2:console[_0x6cea('109','@AI7')](_0x3039b5[_0x6cea('2cb','p]]0')]);break;case 0x3:console[_0x6cea('23','p]]0')](_0x6cea('2cc','fWtc'));break;default:console[_0x6cea('2cd','%nLc')](_0x3039b5['meHMR']);}const _0x2cdc8a=JSON[_0x6cea('2ce','AFRv')]({'page':_0x14e74d,'selected':_0x440937,'previewTime':''});let _0x5a43ac=_0x3039b5[_0x6cea('2cf',']dW[')](taskurl_xh,_0x6cea('2d0','A!Ro'),_0x3039b5['AukrK'],_0x2cdc8a);_0x5a43ac['headers'][_0x6cea('2d1','NM)3')]=_0x6cea('2d2','[iJ7');$[_0x6cea('2d3','PPL3')](_0x5a43ac,(_0x4031e0,_0x531f5d,_0x2f3bba)=>{try{if(_0x4031e0){if(_0x3039b5[_0x6cea('2d4','2apZ')]===_0x6cea('2d5','A!Ro')){if(_0x4031e0){}else{if(_0x2f3bba)_0x2f3bba=JSON[_0x6cea('2d6','BIkW')](_0x2f3bba);}}else{console[_0x6cea('234','Ad$r')](_0x6cea('2d7','9s9N')+arguments[_0x6cea('2d8','fWtc')][_0x6cea('2d9','1wtK')]['toString']()+'\x20API请求失败，请检查网路\x0a'+JSON['stringify'](_0x4031e0));}}else{_0x2f3bba=JSON[_0x6cea('2da','FEB1')](_0x2f3bba);if(_0x2f3bba[_0x6cea('2db','Tdb(')]){if(_0x3039b5['vbwVQ'](_0x440937,0x2)){if(_0x3039b5[_0x6cea('2dc','OrkO')](_0x3039b5['fZyfR'],_0x3039b5[_0x6cea('2dd','x8bn')])){if(jdCookieNode[item])$[_0x6cea('2de','9]wa')][_0x6cea('2df','N[dc')](jdCookieNode[item]);}else{if(_0x2f3bba[_0x6cea('2e0','[w$J')]&&_0x2f3bba['data']){if(_0x3039b5[_0x6cea('2e1','a5^x')](_0x3039b5[_0x6cea('2e2','BIkW')],_0x3039b5['HfhJN'])){console[_0x6cea('1b3','N[dc')](JSON['stringify'](_0x4031e0));console[_0x6cea('273','3XO5')]($[_0x6cea('1f0','PPL3')]+_0x6cea('2e3','@AI7'));}else{for(let _0x156dee of _0x2f3bba[_0x6cea('2e4','2CKC')]['list']){_0x3039b5[_0x6cea('2e5','qsBQ')](_0x156dee['status'],0x4)||_0x156dee[_0x6cea('2e6','9s9N')]['text'][_0x6cea('2a9','3]u0')](_0x3039b5[_0x6cea('2e7','PPL3')])?$['giveupNum']+=0x1:'';_0x3039b5[_0x6cea('2e8','[iJ7')](_0x156dee[_0x6cea('2e9','9Gvu')],0x2)&&_0x156dee[_0x6cea('22c','PHc0')]['text'][_0x6cea('26b','x8bn')](_0x3039b5[_0x6cea('2ea','E$%d')])?$['successNum']+=0x1:'';_0x156dee[_0x6cea('2eb','c)52')]===0x2&&_0x156dee['text']['text'][_0x6cea('2ec','PHc0')](_0x3039b5[_0x6cea('2ed','h]*)')])?$[_0x6cea('270','AFRv')]+=0x1:'';_0x156dee[_0x6cea('2ee','chfO')]===0x2&&_0x156dee['text'][_0x6cea('2ef','DPFq')]['includes'](_0x3039b5[_0x6cea('2f0','Rwdr')])?$[_0x6cea('2f1','9]wa')]+=0x1:'';}console[_0x6cea('f1','PPL3')](_0x6cea('2f2','2CKC')+$['successNum']+_0x6cea('2f3','chfO')+$[_0x6cea('2f4','FEB1')]+_0x6cea('2f5','PPL3')+$[_0x6cea('271','h]*)')]+_0x6cea('2f6','DPFq')+$['giveupNum']);}}else{if(_0x3039b5[_0x6cea('2f7','28Z]')](_0x3039b5[_0x6cea('2f8','1wtK')],_0x3039b5[_0x6cea('2f9','OrkO')])){console['log'](_0x6cea('2fa','p]]0')+_0x2f3bba[_0x6cea('2fb','h]*)')]);}else{console[_0x6cea('f4','1wtK')](_0x6cea('2fc','*90a')+_0x2f3bba[_0x6cea('2fd','pvlM')]);}}}}}else{console[_0x6cea('2fe','2CKC')](_0x6cea('2ff','28Z]'));}}}catch(_0x5b1a1e){if(_0x3039b5['ftlNE']('oDezj','weuXw')){_0x3039b5[_0x6cea('300','9s9N')](_0x53bb3c,_0x6cea('301','fWtc')+arguments[_0x6cea('302','49FD')]['name']['toString']()+'\x20API返回结果解析出错\x0a'+_0x5b1a1e+'\x0a'+JSON[_0x6cea('11b','A!Ro')](_0x2f3bba));}else{_0x5a4e9d();}}finally{_0x3039b5[_0x6cea('303','3XO5')](_0x5a4e9d);}});});}function taskurl_xh(_0x5dd61e,_0x58c3e5,_0x4aef9e=JSON[_0x6cea('304','1wtK')]({})){var _0x28db38={'ntLvp':'api.m.jd.com','vpKMq':_0x6cea('305','9Gvu'),'XOCpd':_0x6cea('306','hmvB'),'DQtDM':'jdapp;iPhone;10.1.2;15.0;ff2caa92a8529e4788a34b3d8d4df66d9573f499;network/wifi;model/iPhone13,4;addressid/2074196292;appBuild/167802;jdSupportDarkMode/1;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2015_0\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1','pmsBX':_0x6cea('307','1wtK')};return{'url':URL+'?appid='+_0x5dd61e+_0x6cea('308','DPFq')+_0x58c3e5+_0x6cea('309','9Gvu')+encodeURIComponent(_0x4aef9e),'headers':{'Host':_0x28db38[_0x6cea('30a','PPL3')],'Accept-Encoding':_0x28db38[_0x6cea('30b','Zpj!')],'Cookie':$[_0x6cea('30c','PPL3')],'Connection':_0x28db38['XOCpd'],'UserAgent':_0x28db38[_0x6cea('30d','2CKC')],'Accept-Language':_0x28db38['pmsBX'],'Referer':_0x6cea('30e','E$%d')}};}async function showMsg(){var _0x2ba59e={'yWIkC':function(_0x4cc46e,_0x2019b2){return _0x4cc46e!==_0x2019b2;},'EwyGH':_0x6cea('30f','E$%d'),'aCZvg':function(_0x874544,_0x31c316){return _0x874544===_0x31c316;},'NPpXW':'false','ysvNr':'cjDca','Zecnv':_0x6cea('310','E$%d')};let _0x4b9af9='';_0x4b9af9+=_0x6cea('311','9s9N')+$[_0x6cea('312','2CKC')]+'\x20'+($['nickName']||$[_0x6cea('313','iNJq')])+'\x0a';if($['totalSuccess']!==0x0&&_0x2ba59e[_0x6cea('314','NM)3')]($[_0x6cea('315','[w$J')],0x0)){var _0xb39b7c='3|2|0|1|4'[_0x6cea('316','W97h')]('|'),_0x4abbdd=0x0;while(!![]){switch(_0xb39b7c[_0x4abbdd++]){case'0':_0x4b9af9+='🎉\x20'+$['getNum']+_0x6cea('317','ld2z');continue;case'1':_0x4b9af9+=_0x6cea('318','28Z]')+$[_0x6cea('319','1wtK')]+'个商品已完成\x0a';continue;case'2':_0x4b9af9+=_0x6cea('318','28Z]')+$['successNum']+_0x6cea('31a','a5^x');continue;case'3':_0x4b9af9+='🎉\x20本次提交申请：'+$['totalSuccess']+'/'+$[_0x6cea('31b','S[iR')]+_0x6cea('31c','$Iki');continue;case'4':_0x4b9af9+=_0x6cea('31d','W97h')+$[_0x6cea('31e','x8bn')]+_0x6cea('31f','pvlM');continue;}break;}}else{var _0x27e0f6=_0x2ba59e[_0x6cea('320','2apZ')][_0x6cea('321','a5^x')]('|'),_0x54ef87=0x0;while(!![]){switch(_0x27e0f6[_0x54ef87++]){case'0':_0x4b9af9+=_0x6cea('322','p]]0')+$[_0x6cea('323','c)52')]+_0x6cea('324','Zpj!');continue;case'1':_0x4b9af9+='🎉\x20'+$[_0x6cea('325','OrkO')]+_0x6cea('326','PPL3');continue;case'2':_0x4b9af9+=_0x6cea('327','$Iki')+$['successNum']+_0x6cea('328','lfBZ');continue;case'3':_0x4b9af9+=_0x6cea('329','A!Ro')+$[_0x6cea('32a','W97h')]+'个商品已完成\x0a';continue;case'4':_0x4b9af9+='⚠️\x20本次执行没有申请试用商品\x0a';continue;}break;}}if(!args_xh['jdNotify']||_0x2ba59e['aCZvg'](args_xh[_0x6cea('32b','p]]0')],_0x2ba59e['NPpXW'])){if(_0x2ba59e[_0x6cea('32c','lfBZ')]('cjDca',_0x2ba59e[_0x6cea('32d','$Iki')])){resolve();}else{$[_0x6cea('32e','Tdb(')]($['name'],'',_0x4b9af9,{'open-url':_0x2ba59e[_0x6cea('32f','h]*)')]});if($[_0x6cea('330','W97h')]())notifyMsg+=''+_0x4b9af9;}}else{console[_0x6cea('2cd','%nLc')](_0x4b9af9);}}function totalBean(){var _0x2051b4={'ONycp':function(_0x1fad47,_0x21279c){return _0x1fad47===_0x21279c;},'WLJYZ':_0x6cea('331','28Z]'),'fflOu':'Kdynn','mRLUH':_0x6cea('332','N[dc'),'LKhfe':'base','KyzPG':function(_0x374a17,_0x1eee3c){return _0x374a17===_0x1eee3c;},'ZoBfN':_0x6cea('333','iNJq'),'mGjJA':'application/json,text/plain,\x20*/*','NKJpF':_0x6cea('334','S[iR'),'LNuLt':_0x6cea('335','W97h'),'FHFQk':'keep-alive','jbNSe':_0x6cea('336','[iJ7'),'FPttT':function(_0x4a3b4b,_0x1ad7f9){return _0x4a3b4b(_0x1ad7f9);},'dEcde':_0x6cea('337','iNJq'),'qMvbf':_0x6cea('338','h]*)'),'jbhAV':'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1'};return new Promise(async _0x4eba1d=>{var _0x36c2f3={'iKzzc':function(_0x48e981,_0x28a390){return _0x2051b4[_0x6cea('339','FEB1')](_0x48e981,_0x28a390);},'rlqEz':_0x2051b4['WLJYZ'],'Joolj':function(_0xa46a53,_0x56f197){return _0x2051b4[_0x6cea('33a','iNJq')](_0xa46a53,_0x56f197);},'fCWup':function(_0x552ebe){return _0x552ebe();},'ijcPX':_0x6cea('33b','9s9N'),'XWJqG':_0x6cea('33c','$Iki'),'WYwfB':_0x2051b4[_0x6cea('33d','28Z]')],'mBGyn':function(_0x20e568,_0xaf90df){return _0x2051b4[_0x6cea('33e','AFRv')](_0x20e568,_0xaf90df);},'sWEzG':_0x2051b4['mRLUH'],'DrwhK':function(_0x55ce4d,_0x571ffa){return _0x2051b4['ONycp'](_0x55ce4d,_0x571ffa);},'zXwVo':'retcode','eELHa':_0x2051b4[_0x6cea('33f','[w$J')],'QJlzz':function(_0x498f59,_0x4024b4){return _0x2051b4[_0x6cea('340','@AI7')](_0x498f59,_0x4024b4);},'EYiUm':_0x6cea('341','p]]0'),'jgbfh':function(_0x1b6986,_0x283737){return _0x2051b4[_0x6cea('342','2CKC')](_0x1b6986,_0x283737);},'QufUc':_0x2051b4[_0x6cea('343','E$%d')]};const _0xdbb7e={'url':_0x6cea('344','$Iki'),'headers':{'Accept':_0x2051b4['mGjJA'],'Content-Type':_0x6cea('345','[iJ7'),'Accept-Encoding':_0x2051b4[_0x6cea('346','Rwdr')],'Accept-Language':_0x2051b4['LNuLt'],'Connection':_0x2051b4['FHFQk'],'Cookie':$[_0x6cea('30c','PPL3')],'Referer':_0x2051b4['jbNSe'],'User-Agent':$['isNode']()?process[_0x6cea('347','@AI7')]['JD_USER_AGENT']?process[_0x6cea('348','BIkW')]['JD_USER_AGENT']:_0x2051b4[_0x6cea('349','1wtK')](require,_0x2051b4[_0x6cea('34a','%nLc')])[_0x6cea('34b','E$%d')]:$['getdata'](_0x2051b4[_0x6cea('34c','hmvB')])?$[_0x6cea('34d','0ZUi')](_0x2051b4[_0x6cea('34c','hmvB')]):_0x2051b4[_0x6cea('34e','2CKC')]},'timeout':0x2710};$[_0x6cea('34f','A!Ro')](_0xdbb7e,(_0x4ae08b,_0x2eda94,_0x14e7a8)=>{var _0x244e37={'IMyyt':function(_0x370521){return _0x36c2f3[_0x6cea('350','0ZUi')](_0x370521);}};if(_0x36c2f3[_0x6cea('351','fWtc')](_0x36c2f3['ijcPX'],'tNQkp')){console[_0x6cea('102','$Iki')](''+JSON[_0x6cea('2a5','pvlM')](_0x4ae08b));console[_0x6cea('a4','DPFq')]($['name']+'\x20API请求失败，请检查网路重试');}else{try{if(_0x4ae08b){console[_0x6cea('1b3','N[dc')](''+JSON[_0x6cea('352','%nLc')](_0x4ae08b));console['log']($[_0x6cea('141','9Gvu')]+_0x6cea('27f','BIkW'));}else{if(_0x36c2f3[_0x6cea('353','a5^x')]!==_0x36c2f3['WYwfB']){if(_0x14e7a8){if(_0x36c2f3[_0x6cea('354','$Iki')](_0x6cea('355','Rwdr'),_0x36c2f3['sWEzG'])){_0x14e7a8=JSON[_0x6cea('356','Zpj!')](_0x14e7a8);if(_0x36c2f3[_0x6cea('357','2apZ')](_0x14e7a8[_0x36c2f3[_0x6cea('358','chfO')]],0xd)){$[_0x6cea('359','9s9N')]=![];return;}if(_0x36c2f3[_0x6cea('35a','W97h')](_0x14e7a8[_0x36c2f3['zXwVo']],0x0)){$['nickName']=_0x14e7a8[_0x6cea('35b','W97h')]&&_0x14e7a8[_0x36c2f3[_0x6cea('35c','qsBQ')]][_0x6cea('35d','iNJq')]||$['UserName'];}else{$[_0x6cea('35e','1wtK')]=$[_0x6cea('35f','2apZ')];}}else{if(_0x36c2f3['iKzzc'](JSON[_0x6cea('360','lfBZ')](_0x4ae08b),_0x6cea('361','3XO5'))){$[_0x6cea('362','BIkW')]=!![];console['log'](_0x36c2f3[_0x6cea('363','NM)3')]);}else{console[_0x6cea('20','0ZUi')](JSON[_0x6cea('364','2apZ')](_0x4ae08b));console['log']($['name']+_0x6cea('365','1wtK'));}}}else{if(_0x36c2f3[_0x6cea('366','iNJq')]('GDvkT',_0x36c2f3[_0x6cea('367','1wtK')])){console[_0x6cea('2ac','x8bn')](_0x6cea('368','lfBZ'));}else{reject('⚠️\x20'+arguments[_0x6cea('369','9]wa')]['name']['toString']()+_0x6cea('36a','FEB1')+e+'\x0a'+JSON['stringify'](_0x14e7a8));}}}else{if(_0x36c2f3[_0x6cea('36b','A!Ro')](JSON[_0x6cea('36c','9]wa')](_0x4ae08b),_0x6cea('36d','PHc0'))){$[_0x6cea('36e','OrkO')]=!![];console[_0x6cea('109','@AI7')](_0x36c2f3[_0x6cea('36f','p]]0')]);}else{console[_0x6cea('185','28Z]')](JSON[_0x6cea('370','Ad$r')](_0x4ae08b));console['log']($['name']+_0x6cea('2e3','@AI7'));}}}}catch(_0x481cd4){if(_0x36c2f3[_0x6cea('371','a5^x')](_0x36c2f3['QufUc'],_0x6cea('372','p]]0'))){$[_0x6cea('373','1wtK')](_0x481cd4,_0x2eda94);}else{_0x244e37[_0x6cea('374','W97h')](_0x4eba1d);}}finally{_0x36c2f3[_0x6cea('375','h]*)')](_0x4eba1d);}}});});}function jsonParse(_0x2b0fe7){var _0x3b4a57={'NhGyR':function(_0x10214b,_0x72893b,_0x585d25){return _0x10214b(_0x72893b,_0x585d25);},'tkvvz':_0x6cea('376','9]wa'),'mjipo':function(_0x5860a7,_0x4bc4bb){return _0x5860a7==_0x4bc4bb;},'NquwZ':'string','WeeZg':_0x6cea('377','p]]0'),'kuREX':function(_0x14193c,_0xeaec0c){return _0x14193c===_0xeaec0c;},'mSdLn':_0x6cea('378','9Gvu'),'KuRnw':function(_0x53eca9,_0x1d6796){return _0x53eca9===_0x1d6796;},'ctXwY':_0x6cea('379','A!Ro')};if(_0x3b4a57['mjipo'](typeof _0x2b0fe7,_0x3b4a57[_0x6cea('37a','[iJ7')])){if(_0x3b4a57['WeeZg']===_0x3b4a57[_0x6cea('37b','3]u0')]){try{if(_0x3b4a57['kuREX'](_0x3b4a57[_0x6cea('37c','$Iki')],'BYlEY')){return JSON[_0x6cea('c4',']dW[')](_0x2b0fe7);}else{$['nickName']=$[_0x6cea('37d','OrkO')];}}catch(_0x1b892c){if(_0x3b4a57['KuRnw'](_0x3b4a57['ctXwY'],_0x3b4a57[_0x6cea('37e','%nLc')])){console[_0x6cea('17b','c)52')](_0x1b892c);$[_0x6cea('37f','c)52')]($[_0x6cea('380','a5^x')],'',_0x6cea('381','W97h'));return[];}else{console['log'](data[_0x6cea('382','2CKC')]);_0x3b4a57[_0x6cea('383','$Iki')](setTimeout,function(){console[_0x6cea('33','h]*)')](_0x6cea('384','$Iki'));},0x1770);}}}else{data=JSON[_0x6cea('385','x8bn')](data);if(data['success']){for(let _0x3a70bd of data[_0x6cea('386','A!Ro')][_0x6cea('387','Rwdr')])console[_0x6cea('105','chfO')](_0x3a70bd[_0x6cea('388','*90a')]+_0x6cea('389','pvlM')+_0x3a70bd[_0x6cea('38a','A!Ro')]);}else{console[_0x6cea('38b','8([C')](_0x3b4a57['tkvvz'],data);}}}}function getAuthorShareCode(_0x18431a){var _0x4450a7={'wStRl':function(_0x2bb0a2,_0x1d81f2){return _0x2bb0a2!==_0x1d81f2;},'fIGDY':_0x6cea('38c','x8bn'),'OMHSQ':_0x6cea('38d','&Sh%'),'jVGXQ':_0x6cea('38e','PPL3'),'tXThA':function(_0x41bb68,_0x5ce4dd){return _0x41bb68===_0x5ce4dd;},'RTdLL':_0x6cea('38f','PHc0'),'fMRHf':'Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2013_2_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Version/13.0.3\x20Mobile/15E148\x20Safari/604.1\x20Edg/87.0.4280.88','gbihh':function(_0x3abe99){return _0x3abe99();}};return new Promise(async _0x1dde64=>{const _0x233e93={'url':''+_0x18431a,'timeout':0x2710,'headers':{'User-Agent':_0x4450a7[_0x6cea('390','N[dc')]}};$[_0x6cea('391','NM)3')](_0x233e93,async(_0x4aea2e,_0x2f8c1f,_0x2d6c09)=>{if(_0x4450a7['wStRl'](_0x4450a7['fIGDY'],_0x4450a7['fIGDY'])){console[_0x6cea('23','p]]0')](message);}else{try{if(_0x4aea2e){}else{if(_0x4450a7[_0x6cea('392','*90a')](_0x4450a7['OMHSQ'],_0x4450a7[_0x6cea('393','AFRv')])){if(_0x2d6c09)_0x2d6c09=JSON[_0x6cea('394','0ZUi')](_0x2d6c09);}else{message+=_0x6cea('395','N[dc')+$[_0x6cea('285','Rwdr')]+'/'+$['totalTry']+'个商品🛒\x0a';message+=_0x6cea('396','DPFq')+$[_0x6cea('397','E$%d')]+_0x6cea('398','chfO');message+='🎉\x20'+$[_0x6cea('399','a5^x')]+'个商品已领取\x0a';message+=_0x6cea('39a','*90a')+$[_0x6cea('39b','a5^x')]+_0x6cea('39c','ld2z');message+=_0x6cea('39d',']dW[')+$[_0x6cea('39e','[w$J')]+'个商品已放弃\x0a\x0a';}}}catch(_0x220398){}finally{if(_0x4450a7[_0x6cea('39f','h]*)')](_0x4450a7[_0x6cea('3a0','AFRv')],_0x4450a7[_0x6cea('3a1','&Sh%')])){_0x1dde64(_0x2d6c09||[]);}else{console['error']('ERROR:try_MyTrials');}}}});await $[_0x6cea('3a2','&Sh%')](0x2710);_0x4450a7[_0x6cea('3a3','&Sh%')](_0x1dde64);});};_0xodH='jsjiami.com.v6';
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
