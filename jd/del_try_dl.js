/*
 * 如需运行脚本必须开启代理
 * 1.注册携趣代理：https://www.xiequ.cn/index.html?2f4ff690
 * 2.获取携趣代理所需参数：http://cxgc.top/archives/xiequdaili
 * 3.开启携趣代理 添加环境变量：xiequ，值填 True
 * 4.携趣用户名 添加环境变量：proxyU，值填 第二步骤里获取
 * 5.携趣密码 添加环境变量：proxyP，值填 第二步骤里获取
 * 6.携趣IP提取地址 添加环境变量：ipUrl，值填 第二步骤里获取
 * 安装下面二个所需依赖
 * docker exec -it QL bash -c "npm install superagent-proxy"
 * docker exec -it QL bash -c "yarn add superagent"
 *
 * 脚本兼容: Node.js
 * X1a0He留
 * 脚本是否耗时只看args_xh.maxLength的大小
 * 上一作者说了每天最多300个商店，总上限为500个，jd_unsubscribe.js我已更新为批量取关版
 * 请提前取关至少250个商店确保京东试用脚本正常运行
 *
 * @Address: https://github.com/JDWXX/jd_job/blob/master/jd/jd_try_dl.js
 * @LastEditors: JDWXX
 参考环境变量配置如下：
export JD_TRY="true"
export JD_TRY_PLOG="true" #是否打印输出到日志
export JD_TRY_PASSZC="true" #过滤种草官类试用
export JD_TRY_MAXLENGTH="50" #商品数组的最大长度
export JD_TRY_APPLYINTERVAL="5000" #商品试用之间和获取商品之间的间隔
export JD_TRY_APPLYNUMFILTER="100000" #过滤大于设定值的已申请人数
export JD_TRY_MINSUPPLYNUM="1" #最小提供数量
export JD_TRY_SENDNUM="10" #每隔多少账号发送一次通知，不需要可以不用设置
export JD_TRY_UNIFIED="false" 默认采用不同试用组
cron "4 2,14 * * *" jd_try_dl.js, tag:京东试用

 */
const $ = new Env('京东试用_携趣代理')
console.log('\n 使用前一定要先安装下面二个所需依赖 ')
console.log('\n docker exec -it QL bash -c "npm install superagent-proxy" ')
console.log('\n docker exec -it QL bash -c "yarn add superagent" ')
const URL = 'https://api.m.jd.com/client.action'
let trialActivityIdList = []
let trialActivityTitleList = []
let notifyMsg = ''
let size = 1;
$.isPush = true;
$.isLimit = false;
$.isForbidden = false;
$.wrong = false;
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
		"安全套", "龟头", "阴道", "阴部", "手机卡","话费",
		"流量卡", "和田玉", "钢化膜", "手机壳","习题","试卷","流量卡","大流量"
	]
//下面很重要，遇到问题请把下面注释看一遍再来问
let args_xh = {
	/*
     * 控制是否输出当前环境变量设置，默认为false
     * 环境变量名称：XH_TRY_ENV
     */
	env: process.env.XH_TRY_ENV === 'true' || false,
	/*
     * 跳过某个指定账号，默认为全部账号清空
     * 填写规则：例如当前Cookie1为pt_key=key; pt_pin=pin1;则环境变量填写pin1即可，此时pin1的购物车将不会被清空
     * 若有更多，则按照pin1@pin2@pin3进行填写
     * 环境变量名称：XH_TRY_EXCEPT
     */
	except: process.env.XH_TRY_EXCEPT && process.env.XH_TRY_EXCEPT.split('@') || [],
	//以上环境变量新增于2022.01.30
	/*
     * 每个Tab页要便遍历的申请页数，由于京东试用又改了，获取不到每一个Tab页的总页数了(显示null)，所以特定增加一个环境变了以控制申请页数
     * 例如设置 JD_TRY_PRICE 为 30，假如现在正在遍历tab1，那tab1就会被遍历到30页，到31页就会跳到tab2，或下一个预设的tab页继续遍历到30页
     * 默认为20
     */
	totalPages: process.env.JD_TRY_TOTALPAGES * 1 || 20,
	/*
     * 由于每个账号每次获取的试用产品都不一样，所以为了保证每个账号都能试用到不同的商品，之前的脚本都不支持采用统一试用组的
     * 以下环境变量是用于指定是否采用统一试用组的
     * 例如当 JD_TRY_UNIFIED 为 true时，有3个账号，第一个账号跑脚本的时候，试用组是空的
     * 而当第一个账号跑完试用组后，第二个，第三个账号所采用的试用组默认采用的第一个账号的试用组
     * 优点：减少除第一个账号外的所有账号遍历，以减少每个账号的遍历时间
     * 缺点：A账号能申请的东西，B账号不一定有
     * 提示：想每个账号独立不同的试用产品的，请设置为false，想减少脚本运行时间的，请设置为true
     * 默认为false
     */
	unified: process.env.JD_TRY_UNIFIED === 'true' || false,
	//以上环境变量新增于2022.01.25
	/*
     * 商品原价，低于这个价格都不会试用，意思是
     * A商品原价49元，试用价1元，如果下面设置为50，那么A商品不会被加入到待提交的试用组
     * B商品原价99元，试用价0元，如果下面设置为50，那么B商品将会被加入到待提交的试用组
     * C商品原价99元，试用价1元，如果下面设置为50，那么C商品将会被加入到待提交的试用组
     * 默认为0
     * */
	jdPrice: process.env.JD_TRY_PRICE * 1 || 50,
	/*
     * 获取试用商品类型，默认为1
     * 下面有一个function是可以获取所有tabId的，名为try_tabList
     * 可设置环境变量：JD_TRY_TABID，用@进行分隔
     * 默认为 1 到 10
     * */
	tabId: process.env.JD_TRY_TABID && process.env.JD_TRY_TABID.split('@').map(Number) || [15, 5, 3, 4, 6, 8, 7, 9, 2, 10, 11, 12, 103, 104, 5, 13, 14, 16],
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
	applyNumFilter: process.env.JD_TRY_APPLYNUMFILTER * 1 || 100000,
	/*
     * 商品试用之间和获取商品之间的间隔, 单位：毫秒(1秒=1000毫秒)
     * 可设置环境变量：JD_TRY_APPLYINTERVAL
     * 默认为3000，也就是3秒
     * */
	applyInterval: process.env.JD_TRY_APPLYINTERVAL * 1 || 5000,
	/*
     * 商品数组的最大长度，通俗来说就是即将申请的商品队列长度
     * 例如设置为20，当第一次获取后获得12件，过滤后剩下5件，将会进行第二次获取，过滤后加上第一次剩余件数
     * 例如是18件，将会进行第三次获取，直到过滤完毕后为20件才会停止，不建议设置太大
     * 可设置环境变量：JD_TRY_MAXLENGTH
     * */
	maxLength: process.env.JD_TRY_MAXLENGTH * 1 || 50,
	/*
     * 过滤种草官类试用，某些试用商品是专属官专属，考虑到部分账号不是种草官账号
     * 例如A商品是种草官专属试用商品，下面设置为true，而你又不是种草官账号，那A商品将不会被添加到待提交试用组
     * 例如B商品是种草官专属试用商品，下面设置为false，而你是种草官账号，那A商品将会被添加到待提交试用组
     * 例如B商品是种草官专属试用商品，下面设置为true，即使你是种草官账号，A商品也不会被添加到待提交试用组
     * 可设置环境变量：JD_TRY_PASSZC，默认为true
     * */
	passZhongCao: process.env.JD_TRY_PASSZC === 'true' || true,
	/*
     * 是否打印输出到日志，考虑到如果试用组长度过大，例如100以上，如果每个商品检测都打印一遍，日志长度会非常长
     * 打印的优点：清晰知道每个商品为什么会被过滤，哪个商品被添加到了待提交试用组
     * 打印的缺点：会使日志变得很长
     *
     * 不打印的优点：简短日志长度
     * 不打印的缺点：无法清晰知道每个商品为什么会被过滤，哪个商品被添加到了待提交试用组
     * 可设置环境变量：JD_TRY_PLOG，默认为true
     * */
	printLog: process.env.JD_TRY_PLOG === 'true' || true,
	/*
     * 白名单，是否打开，如果下面为true，那么黑名单会自动失效
     * 白名单和黑名单无法共存，白名单永远优先于黑名单
     * 可通过环境变量控制：JD_TRY_WHITELIST，默认为false
     * */
	whiteList: process.env.JD_TRY_WHITELIST === 'true' || false,
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

var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxe4b43=["\x6A\x73\x6A\x69\x61\x6D\x69\x2E\x63\x6F\x6D","\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C","\u811A\u672C\u4ED3\u5E93\u5730\u5740\uFF1A\x68\x74\x74\x70\x73\x3A\x2F\x2F\x67\x69\x74\x68\x75\x62\x2E\x63\x6F\x6D\x2F\x4A\x44\x57\x58\x58\x2F\x6A\x64\x5F\x6A\x6F\x62","\x6C\x6F\x67","\u4EE3\u7406\u4E0D\u80FD\u8DD1\x20\u8BD5\u8BD5\u5B89\u88C5\u4F9D\u8D56\x20\x20\x64\x6F\x63\x6B\x65\x72\x20\x65\x78\x65\x63\x20\x2D\x69\x74\x20\x51\x4C\x20\x62\x61\x73\x68\x20\x2D\x63\x20\x27\x79\x61\x72\x6E\x20\x61\x64\x64\x20\x73\x75\x70\x65\x72\x61\x67\x65\x6E\x74\x27","\x6E\x6F\x64\x65\x2D\x66\x65\x74\x63\x68","\x73\x75\x70\x65\x72\x61\x67\x65\x6E\x74","\x73\x75\x70\x65\x72\x61\x67\x65\x6E\x74\x2D\x70\x72\x6F\x78\x79","","\u643A\u8DA3\u4EE3\u7406\u7528\u6237\u540D","\u643A\u8DA3\u4EE3\u7406\u5BC6\u7801","\u4EE3\u7406\x49\x50","\u4EE3\u7406\u7AEF\u53E3","\x3A","\x69\x73\x4E\x6F\x64\x65","\x78\x69\x65\x71\x75","\x65\x6E\x76","\x46\x61\x6C\x73\x65","\x54\x72\x75\x65","\x70\x72\x6F\x78\x79\x55","\u672A\u8BFB\u53D6\u5230\u73AF\u5883\u53D8\u91CF\x20\x70\x72\x6F\x78\x79\x55\x2C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u7528\u6237\u540D\u3011\x70\x72\x6F\x78\x79\x55","\x20\u83B7\u53D6\u5230\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u7528\u6237\u540D\u3011\uFF1A\x20","\x70\x72\x6F\x78\x79\x50","\u672A\u8BFB\u53D6\u5230\u73AF\u5883\u53D8\u91CF\x20\x70\x72\x6F\x78\x79\x50\x2C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u5BC6\u7801\u3011\x70\x72\x6F\x78\x79\x50","\x20\u83B7\u53D6\u5230\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u5BC6\u7801\u3011\uFF1A\x20","\x69\x70\x55\x72\x6C","\u672A\u8BFB\u53D6\u5230\u73AF\u5883\u53D8\u91CF\x20\x69\x70\x55\x72\x6C\x2C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\x49\x50\u63D0\u53D6\u5730\u5740\u3011\x69\x70\x55\x72\x6C\x20","\x20\u8BBF\u95EE\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x78\x69\x65\x71\x75\x2E\x63\x6E\x2F\x72\x65\x64\x69\x72\x65\x63\x74\x2E\x61\x73\x70\x78\x20\x20\x3E\x3E\x20\u5DF2\u8D2D\u4EA7\u54C1\x20\x3E\x3E\x20\x41\x50\x49\u63D0\u53D6\x20\x3E\x3E\x20\u9009\u62E9\u63D0\u53D6\u6570\u91CF\x3A\x20\x31\u3001\u9009\u62E9\x49\x50\u534F\u8BAE\uFF1A\x48\x54\x54\x50\x2F\x48\x54\x54\x50\x53\u3001\u9009\u62E9\u8FD4\u56DE\u683C\u5F0F\uFF1A\x4A\x53\x4F\x4E\u3001\u5176\u4ED6\u968F\u610F\x20\x3E\x3E\x20\u751F\u6210\u94FE\u63A5","\x20\u83B7\u53D6\u5230\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\x49\x50\u63D0\u53D6\u5730\u5740\u3011\uFF1A\x20","\u643A\u8DA3\u4EE3\u7406\u6CE8\u518C\u5730\u5740\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x78\x69\x65\x71\x75\x2E\x63\x6E\x2F\x69\x6E\x64\x65\x78\x2E\x68\x74\x6D\x6C\x3F\x32\x66\x34\x66\x66\x36\x39\x30","\u5982\u9700\u5F00\u542F\u4EE3\u7406\uFF0C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\x20\x78\x69\x65\x71\x75\x20\u503C\x20\x54\x72\x75\x65","\x31\x2E\x30\x2E\x30\x2E\x31","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6A\x64\x77\x78\x78\x2E\x67\x69\x74\x68\x75\x62\x2E\x69\x6F\x2F\x6A\x64\x5F\x6A\x6F\x62\x2F\x77\x73\x6B\x65\x79\x2E\x74\x78\x74","\u6743\u9650\u67E5\u8BE2\u8BF7\u6C42\u5931\u8D25","\u5F53\u524D\u7248\u672C\u53F7\uFF1A","\x69\x6E\x66\x6F","\u6700\u65B0\u7248\u672C\u53F7\uFF1A","\u8BF7\u52A0\u7FA4\uFF1A\x32\x31\x32\x37\x39\x36\x36\x36\x38\u3001\x36\x38\x31\x30\x33\x30\x30\x39\x37\x20\u5BFB\u627E\u6700\u65B0\u7248\u672C\u3010\u4EE3\u7801\u4EC5\u4F9B\u5B66\u4E60\uFF0C\u5207\u52FF\u4E71\u4F20\u4EE3\u7801\u3011","\u7248\u672C\u8BA4\u8BC1\u901A\u8FC7\uFF0C\u5F53\u524D\u7248\u672C\uFF1A","\x6C\x6F\x67\x45\x72\x72","\x67\x65\x74","\x63\x6F\x64\x65","\u643A\u8DA3\u4EE3\u7406\uFF1A","\x6D\x73\x67","\x64\x61\x74\x61","\x49\x50","\x50\x6F\x72\x74","\x70\x72\x6F\x78\x79\x55\x72\x6C","\x68\x74\x74\x70\x3A\x2F\x2F","\x40","\x74\x68\x65\x6E","\x6A\x73\x6F\x6E","\x27\x4E\x6F\x74\x20\x41\x3B\x42\x72\x61\x6E\x64\x27\x3B\x76\x3D\x27\x39\x39\x27\x2C\x20\x27\x43\x68\x72\x6F\x6D\x69\x75\x6D\x27\x3B\x76\x3D\x27\x39\x38\x27\x2C\x27\x47\x6F\x6F\x67\x6C\x65\x20\x43\x68\x72\x6F\x6D\x65\x27\x3B\x76\x3D\x27\x39\x38\x27","\x3F\x30","\x27\x57\x69\x6E\x64\x6F\x77\x73\x27","\x31","\x73\x74\x72\x69\x63\x74\x2D\x6F\x72\x69\x67\x69\x6E\x2D\x77\x68\x65\x6E\x2D\x63\x72\x6F\x73\x73\x2D\x6F\x72\x69\x67\x69\x6E","\x47\x45\x54","\x77\x61\x69\x74","\x64\x6F\x6E\x65","\x66\x69\x6E\x61\x6C\x6C\x79","\u2757\uFE0F\x20","\x6E\x61\x6D\x65","\x20\u8FD0\u884C\u9519\u8BEF\uFF01\x0A","\x65\x72\x72\x6F\x72","\x63\x61\x74\x63\x68","\x4A\x44\x5F\x54\x52\x59","\x74\x72\x75\x65","\x63\x6F\x6F\x6B\x69\x65\x73\x41\x72\x72","\u3010\u63D0\u793A\u3011\u8BF7\u5148\u83B7\u53D6\u4EAC\u4E1C\u8D26\u53F7\u4E00\x63\x6F\x6F\x6B\x69\x65\u76F4\u63A5\u4F7F\u7528\x4E\x6F\x62\x79\x44\x61\u7684\u4EAC\u4E1C\u7B7E\u5230\u83B7\u53D6","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x62\x65\x61\x6E\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F","\x63\x6F\x6F\x6B\x69\x65","\x55\x73\x65\x72\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x69\x6E\x64\x65\x78","\x69\x73\x4C\x6F\x67\x69\x6E","\x6E\x69\x63\x6B\x4E\x61\x6D\x65","\x78\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\u5F00\u59CB\u83B7\u53D6\u5546\u54C1\u5217\u8868\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D","\x65\x78\x63\x65\x70\x74","\x69\x6E\x63\x6C\x75\x64\x65\x73","\u8DF3\u8FC7\u8D26\u53F7\uFF1A","\u3010\u63D0\u793A\u3011\x63\x6F\x6F\x6B\x69\x65\u5DF2\u5931\u6548","\u4EAC\u4E1C\u8D26\u53F7","\x20","\x0A\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6\x0A\x68\x74\x74\x70\x73\x3A\x2F\x2F\x62\x65\x61\x6E\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x62\x65\x61\x6E\x2F\x73\x69\x67\x6E\x49\x6E\x64\x65\x78\x2E\x61\x63\x74\x69\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x62\x65\x61\x6E\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x62\x65\x61\x6E\x2F\x73\x69\x67\x6E\x49\x6E\x64\x65\x78\x2E\x61\x63\x74\x69\x6F\x6E","\x63\x6F\x6F\x6B\x69\x65\u5DF2\u5931\u6548\x20\x2D\x20","\x0A\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6\x63\x6F\x6F\x6B\x69\x65","\x73\x65\x6E\x64\x4E\x6F\x74\x69\x66\x79","\x6E\x6F\x74\x69\x66\x79","\x74\x6F\x74\x61\x6C\x54\x72\x79","\x74\x6F\x74\x61\x6C\x53\x75\x63\x63\x65\x73\x73","\x6E\x6F\x77\x54\x61\x62\x49\x64\x49\x6E\x64\x65\x78","\x6E\x6F\x77\x50\x61\x67\x65","\x6E\x6F\x77\x49\x74\x65\x6D","\x75\x6E\x69\x66\x69\x65\x64","\x69\x73\x4C\x69\x6D\x69\x74","\x69\x73\x46\x6F\x72\x62\x69\x64\x64\x65\x6E","\x77\x72\x6F\x6E\x67","\x6C\x65\x6E\x67\x74\x68","\x74\x61\x62\x49\x64","\x74\x61\x62\x49\x64\u7EC4\u5DF2\u904D\u5386\u5B8C\u6BD5\uFF0C\u4E0D\u5728\u83B7\u53D6\u5546\u54C1\x0A","\x6D\x61\x78\x4C\x65\x6E\x67\x74\x68","\u95F4\u9694\u7B49\u5F85\u4E2D\uFF0C\u8BF7\u7B49\u5F85\x20\x33\x20\u79D2\x0A","\u8BD5\u7528\u4E0A\u9650","\u8BD5\u7528\u7533\u8BF7\u6267\u884C\u5B8C\u6BD5\x2E\x2E\x2E","\x67\x69\x76\x65\x75\x70\x4E\x75\x6D","\x73\x75\x63\x63\x65\x73\x73\x4E\x75\x6D","\x67\x65\x74\x4E\x75\x6D","\x63\x6F\x6D\x70\x6C\x65\x74\x65\x4E\x75\x6D","\x73\x65\x6E\x64\x4E\x75\x6D","\x73\x65\x6E\x74\x4E\x75\x6D","\u6B63\u5728\u8FDB\u884C\u7B2C\x20","\x20\u6B21\u53D1\u9001\u901A\u77E5\uFF0C\u53D1\u9001\u6570\u91CF\uFF1A","\u6B63\u5728\u8FDB\u884C\u6700\u540E\u4E00\u6B21\u53D1\u9001\u901A\u77E5\uFF0C\u53D1\u9001\u6570\u91CF\uFF1A","\x0A\u60A8\u672A\u8BBE\u7F6E\u8FD0\u884C\u3010\u4EAC\u4E1C\u8BD5\u7528\u3011\u811A\u672C\uFF0C\u7ED3\u675F\u8FD0\u884C\uFF01\x0A","\u5F00\u59CB\u83B7\u53D6\u914D\u7F6E\u6587\u4EF6","\x2E\x2F\x73\x65\x6E\x64\x4E\x6F\x74\x69\x66\x79","\x2E\x2F\x6A\x64\x43\x6F\x6F\x6B\x69\x65\x2E\x6A\x73","\x70\x75\x73\x68","\x66\x6F\x72\x45\x61\x63\x68","\x6B\x65\x79\x73","\x4A\x44\x5F\x44\x45\x42\x55\x47","\x66\x61\x6C\x73\x65","\x66\x69\x6C\x74\x65\x72","\x43\x6F\x6F\x6B\x69\x65\x4A\x44","\x67\x65\x74\x64\x61\x74\x61","\x43\x6F\x6F\x6B\x69\x65\x4A\x44\x32","\x6D\x61\x70","\x43\x6F\x6F\x6B\x69\x65\x73\x4A\x44","\x5B\x5D","\x69\x6E\x6E\x65\x72\x4B\x65\x79\x57\x6F\x72\x64\x73","\x74\x69\x74\x6C\x65\x46\x69\x6C\x74\x65\x72\x73","\u5171","\u4E2A\u4EAC\u4E1C\u8D26\u53F7\x0A","\x3D\x3D\x3D\x3D\x3D\u73AF\u5883\u53D8\u91CF\u914D\u7F6E\u5982\u4E0B\x3D\x3D\x3D\x3D\x3D","\x65\x6E\x76\x3A\x20","\x2C\x20","\x65\x78\x63\x65\x70\x74\x3A\x20","\x74\x6F\x74\x61\x6C\x50\x61\x67\x65\x73\x3A\x20","\x74\x6F\x74\x61\x6C\x50\x61\x67\x65\x73","\x75\x6E\x69\x66\x69\x65\x64\x3A\x20","\x6A\x64\x50\x72\x69\x63\x65\x3A\x20","\x6A\x64\x50\x72\x69\x63\x65","\x74\x61\x62\x49\x64\x3A\x20","\x74\x69\x74\x6C\x65\x46\x69\x6C\x74\x65\x72\x73\x3A\x20","\x74\x72\x69\x61\x6C\x50\x72\x69\x63\x65\x3A\x20","\x74\x72\x69\x61\x6C\x50\x72\x69\x63\x65","\x6D\x69\x6E\x53\x75\x70\x70\x6C\x79\x4E\x75\x6D\x3A\x20","\x6D\x69\x6E\x53\x75\x70\x70\x6C\x79\x4E\x75\x6D","\x61\x70\x70\x6C\x79\x4E\x75\x6D\x46\x69\x6C\x74\x65\x72\x3A\x20","\x61\x70\x70\x6C\x79\x4E\x75\x6D\x46\x69\x6C\x74\x65\x72","\x61\x70\x70\x6C\x79\x49\x6E\x74\x65\x72\x76\x61\x6C\x3A\x20","\x61\x70\x70\x6C\x79\x49\x6E\x74\x65\x72\x76\x61\x6C","\x6D\x61\x78\x4C\x65\x6E\x67\x74\x68\x3A\x20","\x70\x61\x73\x73\x5A\x68\x6F\x6E\x67\x43\x61\x6F\x3A\x20","\x70\x61\x73\x73\x5A\x68\x6F\x6E\x67\x43\x61\x6F","\x70\x72\x69\x6E\x74\x4C\x6F\x67\x3A\x20","\x70\x72\x69\x6E\x74\x4C\x6F\x67","\x77\x68\x69\x74\x65\x4C\x69\x73\x74\x3A\x20","\x77\x68\x69\x74\x65\x4C\x69\x73\x74","\x77\x68\x69\x74\x65\x4C\x69\x73\x74\x4B\x65\x79\x77\x6F\x72\x64\x73\x3A\x20","\x77\x68\x69\x74\x65\x4C\x69\x73\x74\x4B\x65\x79\x77\x6F\x72\x64\x73","\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D","\u83B7\u53D6\x74\x61\x62\x4C\x69\x73\x74\u4E2D\x2E\x2E\x2E","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x6E\x65\x77\x74\x72\x79","\x74\x72\x79\x5F\x74\x61\x62\x4C\x69\x73\x74","\x22\x52\x65\x73\x70\x6F\x6E\x73\x65\x20\x63\x6F\x64\x65\x20\x34\x30\x33\x20\x28\x46\x6F\x72\x62\x69\x64\x64\x65\x6E\x29\x22","\u8D26\u53F7\u88AB\u4EAC\u4E1C\u670D\u52A1\u5668\u98CE\u63A7\uFF0C\u4E0D\u518D\u8BF7\u6C42\u8BE5\u5E10\u53F7","\x20\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5","\x70\x61\x72\x73\x65","\x73\x75\x63\x63\x65\x73\x73","\x74\x61\x62\x4C\x69\x73\x74","\x74\x61\x62\x4E\x61\x6D\x65","\x20\x2D\x20","\u83B7\u53D6\u5931\u8D25","\u26A0\uFE0F\x20","\x63\x61\x6C\x6C\x65\x65","\x20\x41\x50\x49\u8FD4\u56DE\u7ED3\u679C\u89E3\u6790\u51FA\u9519\x0A","\x0A","\x64\x65\x66\x61\x75\x6C\x74","\x61\x70\x70","\x74\x72\x79\x5F\x66\x65\x65\x64\x73\x4C\x69\x73\x74","\u7B2C\x20","\x20\u6B21\u83B7\u53D6\u8BD5\u7528\u5546\u54C1\u6210\u529F\uFF0C\x74\x61\x62\x49\x64\x3A","\x20\u7684\x20\u7B2C\x20","\x2F","\x20\u9875","\u83B7\u53D6\u5230\u5546\u54C1\x20","\x66\x65\x65\x64\x4C\x69\x73\x74","\x20\u6761","\x61\x70\x70\x6C\x79\x4E\x75\x6D","\u5546\u54C1\u672A\u5230\u7533\u8BF7\u65F6\u95F4\uFF1A","\x73\x6B\x75\x54\x69\x74\x6C\x65","\u5546\u54C1\u5217\u8868\u957F\u5EA6\u5DF2\u6EE1\x2E\u7ED3\u675F\u83B7\u53D6","\x61\x70\x70\x6C\x79\x53\x74\x61\x74\x65","\u5546\u54C1\u5DF2\u7533\u8BF7\u8BD5\u7528\uFF1A","\u5546\u54C1\u72B6\u6001\u5F02\u5E38\uFF0C\u672A\u627E\u5230\x73\x6B\x75\x54\x69\x74\x6C\x65\x0A","\x69\x73\x50\x75\x73\x68","\x74\x61\x67\x4C\x69\x73\x74","\x74\x61\x67\x54\x79\x70\x65","\u5546\u54C1\u88AB\u8FC7\u6EE4\uFF0C\u8BE5\u5546\u54C1\u662F\u79CD\u8349\u5B98\u4E13\u5C5E","\u5546\u54C1\u88AB\u8DF3\u8FC7\uFF0C\u8BE5\u5546\u54C1\u662F\u4ED8\u8D39\u8BD5\u7528\uFF01","\u68C0\u6D4B\x20\x74\x61\x62\x49\x64\x3A","\x20\u9875\x20\u7B2C\x20","\x20\u4E2A\u5546\u54C1\x0A","\x73\x6F\x6D\x65","\u5546\u54C1\u767D\u540D\u5355\u901A\u8FC7\uFF0C\u5C06\u52A0\u5165\u8BD5\u7528\u7EC4\uFF0C\x74\x72\x69\x61\x6C\x41\x63\x74\x69\x76\x69\x74\x79\x49\x64\u4E3A","\x74\x72\x69\x61\x6C\x41\x63\x74\x69\x76\x69\x74\x79\x49\x64","\u5546\u54C1\u88AB\u8FC7\u6EE4\uFF0C","\x20\x3C\x20","\x20\x0A","\x73\x75\x70\x70\x6C\x79\x4E\x75\x6D","\u5546\u54C1\u88AB\u8FC7\u6EE4\uFF0C\u63D0\u4F9B\u7533\u8BF7\u7684\u4EFD\u6570\u5C0F\u4E8E\u9884\u8BBE\u7533\u8BF7\u7684\u4EFD\u6570\x20\x0A","\u5546\u54C1\u88AB\u8FC7\u6EE4\uFF0C\u5DF2\u7533\u8BF7\u8BD5\u7528\u4EBA\u6570\u5927\u4E8E\u9884\u8BBE\u4EBA\u6570\x20\x0A","\u5546\u54C1\u88AB\u8FC7\u6EE4\uFF0C\u5546\u54C1\u539F\u4EF7\u4F4E\u4E8E\u9884\u8BBE\u5546\u54C1\u539F\u4EF7\x20\x0A","\u5546\u54C1\u88AB\u8FC7\u6EE4\uFF0C\u542B\u6709\u5173\u952E\u8BCD\x20","\u5546\u54C1\u901A\u8FC7\uFF0C\u5C06\u52A0\u5165\u8BD5\u7528\u7EC4\uFF0C\x74\x72\x69\x61\x6C\x41\x63\x74\x69\x76\x69\x74\x79\x49\x64\u4E3A","\x73\x6B\x75\x54\x69\x74\x6C\x65\u89E3\u6790\u5F02\u5E38","\u5F53\u524D\u8BD5\u7528\u7EC4\u957F\u5EA6\u4E3A\uFF1A","\uD83D\uDCA9\x20\u83B7\u5F97\u8BD5\u7528\u5217\u8868\u5931\u8D25\x3A\x20","\x6D\x65\x73\x73\x61\x67\x65","\u3010\u4EAC\u4E1C\u8D26\u53F7","\u3011","\x20\x20\u7533\u8BF7\u8BD5\u7528\u5546\u54C1\u63D0\u4EA4\u4E2D\x2E\x2E\x2E","\u5546\u54C1\uFF1A","\x69\x64\u4E3A\uFF1A","\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D","\x2A\x2F\x2A","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x63\x61\x72\x72\x79\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D","\x67\x7A\x69\x70\x2C\x20\x64\x65\x66\x6C\x61\x74\x65\x2C\x20\x62\x72","\x4A\x44\x5F\x55\x53\x45\x52\x5F\x41\x47\x45\x4E\x54","\x55\x53\x45\x52\x5F\x41\x47\x45\x4E\x54","\x2E\x2F\x55\x53\x45\x52\x5F\x41\x47\x45\x4E\x54\x53","\x4A\x44\x55\x41","\x6A\x64\x61\x70\x70\x3B\x69\x50\x68\x6F\x6E\x65\x3B\x39\x2E\x34\x2E\x34\x3B\x31\x34\x2E\x33\x3B\x6E\x65\x74\x77\x6F\x72\x6B\x2F\x34\x67\x3B\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x34\x5F\x33\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38\x3B\x73\x75\x70\x70\x6F\x72\x74\x4A\x44\x53\x48\x57\x4B\x2F\x31","\x7A\x68\x2D\x43\x4E\x2C\x7A\x68\x2D\x48\x61\x6E\x73\x3B\x71\x3D\x30\x2E\x39","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x63\x61\x72\x72\x79\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F","\u7533\u8BF7\u63D0\u4EA4\u6210\u529F","\x2D\x31\x30\x36","\x2D\x31\x31\x30","\x2D\x31\x32\x30","\x2D\x31\x36\x37","\x2D\x31\x33\x31","\x2D\x31\x31\x33","\u7533\u8BF7\u5931\u8D25","\x74\x65\x78\x74","\x70\x72\x6F\x78\x79","\x73\x65\x74","\x3F\x61\x70\x70\x69\x64\x3D\x6E\x65\x77\x74\x72\x79\x26\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D\x74\x72\x79\x5F\x61\x70\x70\x6C\x79\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x31\x30\x2E\x33\x2E\x34\x26\x63\x6C\x69\x65\x6E\x74\x3D\x77\x68\x35\x26\x62\x6F\x64\x79\x3D","\u6B63\u5728\u83B7\u53D6\u5DF2\u7533\u8BF7\u7684\u5546\u54C1\x2E\x2E\x2E","\u6B63\u5728\u83B7\u53D6\u7533\u8BF7\u6210\u529F\u7684\u5546\u54C1\x2E\x2E\x2E","\u6B63\u5728\u83B7\u53D6\u7533\u8BF7\u5931\u8D25\u7684\u5546\u54C1\x2E\x2E\x2E","\x73\x65\x6C\x65\x63\x74\x65\x64\u9519\u8BEF","\x61\x70\x70\x69\x64\x3D\x6E\x65\x77\x74\x72\x79\x26\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D\x74\x72\x79\x5F\x4D\x79\x54\x72\x69\x61\x6C\x73\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x31\x30\x2E\x33\x2E\x34\x26\x63\x6C\x69\x65\x6E\x74\x3D\x77\x68\x35\x26\x62\x6F\x64\x79\x3D\x25\x37\x42\x25\x32\x32\x70\x61\x67\x65\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x73\x65\x6C\x65\x63\x74\x65\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x70\x72\x65\x76\x69\x65\x77\x54\x69\x6D\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x25\x32\x32\x25\x37\x44","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x72\x6F\x64\x65\x76\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D","\x6A\x64\x61\x70\x70\x3B\x69\x50\x68\x6F\x6E\x65\x3B\x31\x30\x2E\x33\x2E\x34\x3B\x3B\x3B\x4D\x2F\x35\x2E\x30\x3B\x61\x70\x70\x42\x75\x69\x6C\x64\x2F\x31\x36\x37\x39\x34\x35\x3B\x6A\x64\x53\x75\x70\x70\x6F\x72\x74\x44\x61\x72\x6B\x4D\x6F\x64\x65\x2F\x31\x3B\x3B\x3B\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x35\x5F\x32\x5F\x31\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38\x3B\x73\x75\x70\x70\x6F\x72\x74\x4A\x44\x53\x48\x57\x4B\x2F\x31\x3B","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x72\x6F\x64\x65\x76\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F","\uD83D\uDEAB\x20","\x20\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\x0A","\x6C\x69\x73\x74","\x73\x74\x61\x74\x75\x73","\u5DF2\u653E\u5F03","\u8BD5\u7528\u8D44\u683C\u5C06\u4FDD\u7559","\u8BF7\u6536\u8D27\u540E\u5C3D\u5FEB\u63D0\u4EA4\u62A5\u544A","\u8BD5\u7528\u5DF2\u5B8C\u6210","\u5F85\u9886\u53D6\x20\x7C\x20\u5DF2\u9886\u53D6\x20\x7C\x20\u5DF2\u5B8C\u6210\x20\x7C\x20\u5DF2\u653E\u5F03\uFF1A","\x20\x7C\x20","\u83B7\u5F97\u6210\u529F\u5217\u8868\u5931\u8D25\x3A\x20","\x45\x52\x52\x4F\x52\x3A\x74\x72\x79\x5F\x4D\x79\x54\x72\x69\x61\x6C\x73","\x70\x6F\x73\x74","\x3F\x61\x70\x70\x69\x64\x3D","\x26\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D","\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x31\x30\x2E\x33\x2E\x34\x26\x63\x6C\x69\x65\x6E\x74\x3D\x77\x68\x35\x26\x62\x6F\x64\x79\x3D","\x6A\x64\x61\x70\x70\x3B\x69\x50\x68\x6F\x6E\x65\x3B\x31\x30\x2E\x31\x2E\x32\x3B\x31\x35\x2E\x30\x3B\x66\x66\x32\x63\x61\x61\x39\x32\x61\x38\x35\x32\x39\x65\x34\x37\x38\x38\x61\x33\x34\x62\x33\x64\x38\x64\x34\x64\x66\x36\x36\x64\x39\x35\x37\x33\x66\x34\x39\x39\x3B\x6E\x65\x74\x77\x6F\x72\x6B\x2F\x77\x69\x66\x69\x3B\x6D\x6F\x64\x65\x6C\x2F\x69\x50\x68\x6F\x6E\x65\x31\x33\x2C\x34\x3B\x61\x64\x64\x72\x65\x73\x73\x69\x64\x2F\x32\x30\x37\x34\x31\x39\x36\x32\x39\x32\x3B\x61\x70\x70\x42\x75\x69\x6C\x64\x2F\x31\x36\x37\x38\x30\x32\x3B\x6A\x64\x53\x75\x70\x70\x6F\x72\x74\x44\x61\x72\x6B\x4D\x6F\x64\x65\x2F\x31\x3B\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x35\x5F\x30\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38\x3B\x73\x75\x70\x70\x6F\x72\x74\x4A\x44\x53\x48\x57\x4B\x2F\x31","\uD83D\uDC64\x20\u4EAC\u4E1C\u8D26\u53F7","\uD83C\uDF89\x20\u672C\u6B21\u63D0\u4EA4\u7533\u8BF7\uFF1A","\u4E2A\u5546\u54C1\uD83D\uDED2\x0A","\uD83C\uDF89\x20","\u4E2A\u5546\u54C1\u5F85\u9886\u53D6\x0A","\u4E2A\u5546\u54C1\u5DF2\u9886\u53D6\x0A","\u4E2A\u5546\u54C1\u5DF2\u5B8C\u6210\x0A","\uD83D\uDDD1\x20","\u4E2A\u5546\u54C1\u5DF2\u653E\u5F03\x0A\x0A","\u26A0\uFE0F\x20\u672C\u6B21\u6267\u884C\u6CA1\u6709\u7533\u8BF7\u8BD5\u7528\u5546\u54C1\x0A","\x6A\x64\x4E\x6F\x74\x69\x66\x79","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x74\x72\x79\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x75\x73\x65\x72","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x71\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x75\x73\x65\x72\x2F\x69\x6E\x66\x6F\x2F\x51\x75\x65\x72\x79\x4A\x44\x55\x73\x65\x72\x49\x6E\x66\x6F\x3F\x73\x63\x65\x6E\x65\x76\x61\x6C\x3D\x32","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E\x2C\x74\x65\x78\x74\x2F\x70\x6C\x61\x69\x6E\x2C\x20\x2A\x2F\x2A","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x7A\x68\x2D\x63\x6E","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x71\x73\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x6D\x79\x2F\x6A\x69\x6E\x67\x64\x6F\x75\x2F\x6D\x79\x2E\x73\x68\x74\x6D\x6C\x3F\x73\x63\x65\x6E\x65\x76\x61\x6C\x3D\x32","\x72\x65\x74\x63\x6F\x64\x65","\x62\x61\x73\x65","\x6E\x69\x63\x6B\x6E\x61\x6D\x65","\u4EAC\u4E1C\u670D\u52A1\u5668\u8FD4\u56DE\u7A7A\u6570\u636E","\x73\x74\x72\x69\x6E\x67","\u8BF7\u52FF\u968F\u610F\u5728\x42\x6F\x78\x4A\x73\u8F93\u5165\u6846\u4FEE\u6539\u5185\u5BB9\u5EFA\u8BAE\u901A\u8FC7\u811A\u672C\u53BB\u83B7\u53D6\x63\x6F\x6F\x6B\x69\x65","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D","\u95F4\u9694\u7B49\u5F85\u4E2D\uFF0C\u8BF7\u7B49\u5F85\x20\x36\x20\u79D2\x5C\x6E","\x20\x5F\x5F\x6A\x64\x61\x3D\x31\x32\x32\x32\x37\x30\x36\x37\x32\x2E\x31\x36\x35\x35\x34\x38\x35\x32\x31\x39\x30\x31\x39\x31\x36\x39\x34\x32\x30\x30\x35\x32\x38\x2E\x31\x36\x35\x35\x34\x38\x35\x32\x31\x39\x2E\x31\x36\x35\x36\x36\x37\x30\x33\x30\x31\x2E\x31\x36\x35\x36\x36\x37\x32\x34\x38\x38\x2E\x34\x31\x3B","\x34\x32\x32","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E\x2C\x20\x74\x65\x78\x74\x2F\x70\x6C\x61\x69\x6E\x2C\x20\x2A\x2F\x2A","\x63\x6F\x6D\x2E\x6A\x69\x6E\x67\x64\x6F\x6E\x67\x2E\x61\x70\x70\x2E\x6D\x61\x6C\x6C","\x73\x61\x6D\x65\x2D\x73\x69\x74\x65","\x63\x6F\x72\x73","\x65\x6D\x70\x74\x79","\x7A\x68\x2D\x43\x4E\x2C\x7A\x68\x3B\x71\x3D\x30\x2E\x39\x2C\x65\x6E\x2D\x55\x53\x3B\x71\x3D\x30\x2E\x38\x2C\x65\x6E\x3B\x71\x3D\x30\x2E\x37","\x3F\x65\x78\x74\x3D\x7B\x22\x70\x72\x73\x74\x61\x74\x65\x22\x3A\x22\x30\x22\x7D\x26\x61\x70\x70\x69\x64\x3D","\x26\x75\x75\x69\x64\x3D\x32\x33\x31\x36\x36\x33\x36\x36\x36\x36\x36\x33\x35\x33\x38\x33\x2D\x35\x33\x38\x33\x36\x36\x31\x36\x30\x33\x38\x33\x31\x36\x33\x33\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x31\x31\x2E\x31\x2E\x30\x26\x63\x6C\x69\x65\x6E\x74\x3D\x77\x68\x35\x26\x6F\x73\x56\x65\x72\x73\x69\x6F\x6E\x3D\x31\x32\x26\x61\x72\x65\x61\x3D\x31\x35\x5F\x31\x32\x31\x33\x5F\x33\x34\x31\x30\x5F\x37\x31\x37\x32\x30\x26\x6E\x65\x74\x77\x6F\x72\x6B\x54\x79\x70\x65\x3D\x77\x69\x66\x69\x26\x62\x6F\x64\x79\x3D"];var __encode=__Oxe4b43[0x0],_a={},_0xb483=[__Oxe4b43[0x1],__Oxe4b43[0x2]];(function(_0xffc1x4){_0xffc1x4[_0xb483[0x0]]= _0xb483[0x1]})(_a);var __Oxdabcd=[__Oxe4b43[0x1],__Oxe4b43[0x2]];(function(_0xffc1x4){_0xffc1x4[_0xb483[0x0]]= _0xb483[0x1]})(_a);var __Oxdabcd=[__Oxe4b43[0x3],__Oxe4b43[0x4],__Oxe4b43[0x5],__Oxe4b43[0x6],__Oxe4b43[0x7],__Oxe4b43[0x8],__Oxe4b43[0x9],__Oxe4b43[0xa],__Oxe4b43[0xb],__Oxe4b43[0xc],__Oxe4b43[0xd],__Oxe4b43[0xe],__Oxe4b43[0xf],__Oxe4b43[0x10],__Oxe4b43[0x11],__Oxe4b43[0x12],__Oxe4b43[0x13],__Oxe4b43[0x14],__Oxe4b43[0x15],__Oxe4b43[0x16],__Oxe4b43[0x17],__Oxe4b43[0x18],__Oxe4b43[0x19],__Oxe4b43[0x1a],__Oxe4b43[0x1b],__Oxe4b43[0x1c],__Oxe4b43[0x1d],__Oxe4b43[0x1e],__Oxe4b43[0x1f],__Oxe4b43[0x20],__Oxe4b43[0x21],__Oxe4b43[0x22],__Oxe4b43[0x23],__Oxe4b43[0x24],__Oxe4b43[0x25],__Oxe4b43[0x26],__Oxe4b43[0x27],__Oxe4b43[0x28],__Oxe4b43[0x29],__Oxe4b43[0x2a],__Oxe4b43[0x2b],__Oxe4b43[0x2c],__Oxe4b43[0x2d],__Oxe4b43[0x2e],__Oxe4b43[0x2f],__Oxe4b43[0x30],__Oxe4b43[0x31],__Oxe4b43[0x32],__Oxe4b43[0x33],__Oxe4b43[0x34],__Oxe4b43[0x35],__Oxe4b43[0x36],__Oxe4b43[0x37],__Oxe4b43[0x38],__Oxe4b43[0x39],__Oxe4b43[0x3a],__Oxe4b43[0x3b],__Oxe4b43[0x3c],__Oxe4b43[0x3d],__Oxe4b43[0x3e],__Oxe4b43[0x3f],__Oxe4b43[0x40],__Oxe4b43[0x41],__Oxe4b43[0x42],__Oxe4b43[0x43],__Oxe4b43[0x44],__Oxe4b43[0x45],__Oxe4b43[0x46],__Oxe4b43[0x47],__Oxe4b43[0x48],__Oxe4b43[0x49],__Oxe4b43[0x4a],__Oxe4b43[0x4b],__Oxe4b43[0x4c],__Oxe4b43[0x4d],__Oxe4b43[0x4e],__Oxe4b43[0x4f],__Oxe4b43[0x50],__Oxe4b43[0x51],__Oxe4b43[0x52],__Oxe4b43[0x53],__Oxe4b43[0x54],__Oxe4b43[0x55],__Oxe4b43[0x56],__Oxe4b43[0x57],__Oxe4b43[0x58],__Oxe4b43[0x59],__Oxe4b43[0x5a],__Oxe4b43[0x5b],__Oxe4b43[0x5c],__Oxe4b43[0x5d],__Oxe4b43[0x5e],__Oxe4b43[0x5f],__Oxe4b43[0x60],__Oxe4b43[0x61],__Oxe4b43[0x62],__Oxe4b43[0x63],__Oxe4b43[0x64],__Oxe4b43[0x65],__Oxe4b43[0x66],__Oxe4b43[0x67],__Oxe4b43[0x68],__Oxe4b43[0x69],__Oxe4b43[0x6a],__Oxe4b43[0x6b],__Oxe4b43[0x6c],__Oxe4b43[0x6d],__Oxe4b43[0x6e],__Oxe4b43[0x6f],__Oxe4b43[0x70],__Oxe4b43[0x71],__Oxe4b43[0x72],__Oxe4b43[0x73],__Oxe4b43[0x74],__Oxe4b43[0x75],__Oxe4b43[0x76],__Oxe4b43[0x77],__Oxe4b43[0x78],__Oxe4b43[0x79],__Oxe4b43[0x7a],__Oxe4b43[0x7b],__Oxe4b43[0x7c],__Oxe4b43[0x7d],__Oxe4b43[0x7e],__Oxe4b43[0x7f],__Oxe4b43[0x80],__Oxe4b43[0x81],__Oxe4b43[0x82],__Oxe4b43[0x83],__Oxe4b43[0x84],__Oxe4b43[0x85],__Oxe4b43[0x86],__Oxe4b43[0x87],__Oxe4b43[0x88],__Oxe4b43[0x89],__Oxe4b43[0x8a],__Oxe4b43[0x8b],__Oxe4b43[0x8c],__Oxe4b43[0x8d],__Oxe4b43[0x8e],__Oxe4b43[0x8f],__Oxe4b43[0x90],__Oxe4b43[0x91],__Oxe4b43[0x92],__Oxe4b43[0x93],__Oxe4b43[0x94],__Oxe4b43[0x95],__Oxe4b43[0x96],__Oxe4b43[0x97],__Oxe4b43[0x98],__Oxe4b43[0x99],__Oxe4b43[0x9a],__Oxe4b43[0x9b],__Oxe4b43[0x9c],__Oxe4b43[0x9d],__Oxe4b43[0x9e],__Oxe4b43[0x9f],__Oxe4b43[0xa0],__Oxe4b43[0xa1],__Oxe4b43[0xa2],__Oxe4b43[0xa3],__Oxe4b43[0xa4],__Oxe4b43[0xa5],__Oxe4b43[0xa6],__Oxe4b43[0xa7],__Oxe4b43[0xa8],__Oxe4b43[0xa9],__Oxe4b43[0xaa],__Oxe4b43[0xab],__Oxe4b43[0xac],__Oxe4b43[0xad],__Oxe4b43[0xae],__Oxe4b43[0xaf],__Oxe4b43[0xb0],__Oxe4b43[0xb1],__Oxe4b43[0xb2],__Oxe4b43[0xb3],__Oxe4b43[0xb4],__Oxe4b43[0xb5],__Oxe4b43[0xb6],__Oxe4b43[0xb7],__Oxe4b43[0xb8],__Oxe4b43[0xb9],__Oxe4b43[0xba],__Oxe4b43[0xbb],__Oxe4b43[0xbc],__Oxe4b43[0xbd],__Oxe4b43[0xbe],__Oxe4b43[0xbf],__Oxe4b43[0xc0],__Oxe4b43[0xc1],__Oxe4b43[0xc2],__Oxe4b43[0xc3],__Oxe4b43[0xc4],__Oxe4b43[0xc5],__Oxe4b43[0xc6],__Oxe4b43[0xc7],__Oxe4b43[0xc8],__Oxe4b43[0xc9],__Oxe4b43[0xca],__Oxe4b43[0xcb],__Oxe4b43[0xcc],__Oxe4b43[0xcd],__Oxe4b43[0xce],__Oxe4b43[0xcf],__Oxe4b43[0xd0],__Oxe4b43[0xd1],__Oxe4b43[0xd2],__Oxe4b43[0xd3],__Oxe4b43[0xd4],__Oxe4b43[0xd5],__Oxe4b43[0xd6],__Oxe4b43[0xd7],__Oxe4b43[0xd8],__Oxe4b43[0xd9],__Oxe4b43[0xda],__Oxe4b43[0xdb],__Oxe4b43[0xdc],__Oxe4b43[0xdd],__Oxe4b43[0xde],__Oxe4b43[0xdf],__Oxe4b43[0xe0],__Oxe4b43[0xe1],__Oxe4b43[0xe2],__Oxe4b43[0xe3],__Oxe4b43[0xe4],__Oxe4b43[0xe5],__Oxe4b43[0xe6],__Oxe4b43[0xe7],__Oxe4b43[0xe8],__Oxe4b43[0xe9],__Oxe4b43[0xea],__Oxe4b43[0xeb],__Oxe4b43[0xec],__Oxe4b43[0xed],__Oxe4b43[0xee],__Oxe4b43[0xef],__Oxe4b43[0xf0],__Oxe4b43[0xf1],__Oxe4b43[0xf2],__Oxe4b43[0xf3],__Oxe4b43[0xf4],__Oxe4b43[0xf5],__Oxe4b43[0xf6],__Oxe4b43[0xf7],__Oxe4b43[0xf8],__Oxe4b43[0xf9],__Oxe4b43[0xfa],__Oxe4b43[0xfb],__Oxe4b43[0xfc],__Oxe4b43[0xfd],__Oxe4b43[0xfe],__Oxe4b43[0xff],__Oxe4b43[0x100],__Oxe4b43[0x101],__Oxe4b43[0x102],__Oxe4b43[0x103],__Oxe4b43[0x104],__Oxe4b43[0x105],__Oxe4b43[0x106],__Oxe4b43[0x107],__Oxe4b43[0x108],__Oxe4b43[0x109],__Oxe4b43[0x10a],__Oxe4b43[0x10b],__Oxe4b43[0x10c],__Oxe4b43[0x10d],__Oxe4b43[0x10e],__Oxe4b43[0x10f],__Oxe4b43[0x110],__Oxe4b43[0x111],__Oxe4b43[0x112],__Oxe4b43[0x113],__Oxe4b43[0x114],__Oxe4b43[0x115],__Oxe4b43[0x116],__Oxe4b43[0x117],__Oxe4b43[0x118],__Oxe4b43[0x119],__Oxe4b43[0x11a],__Oxe4b43[0x11b],__Oxe4b43[0x11c],__Oxe4b43[0x11d],__Oxe4b43[0x11e],__Oxe4b43[0x11f],__Oxe4b43[0x120],__Oxe4b43[0x121],__Oxe4b43[0x122],__Oxe4b43[0x123],__Oxe4b43[0x124],__Oxe4b43[0x125],__Oxe4b43[0x126],__Oxe4b43[0x127],__Oxe4b43[0x128],__Oxe4b43[0x129],__Oxe4b43[0x12a],__Oxe4b43[0x12b],__Oxe4b43[0x12c],__Oxe4b43[0x12d],__Oxe4b43[0x12e],__Oxe4b43[0x12f],__Oxe4b43[0x130],__Oxe4b43[0x131],__Oxe4b43[0x132],__Oxe4b43[0x133],__Oxe4b43[0x134],__Oxe4b43[0x135]];console[__Oxdabcd[0x1]](__Oxdabcd[0x0]);console[__Oxdabcd[0x1]](__Oxdabcd[0x2]);const fetch=require(__Oxdabcd[0x3]);let requestSup=require(__Oxdabcd[0x4]);require(__Oxdabcd[0x5])(requestSup);let ipUrl=__Oxdabcd[0x6];let proxyU=__Oxdabcd[0x7];let proxyP=__Oxdabcd[0x8];let proxyHost=__Oxdabcd[0x9];let proxyPort=__Oxdabcd[0xa];let proxyServer=proxyHost+ __Oxdabcd[0xb]+ proxyPort;let xiequ=$[__Oxdabcd[0xc]]()?(process[__Oxdabcd[0xe]][__Oxdabcd[0xd]]?process[__Oxdabcd[0xe]][__Oxdabcd[0xd]]:__Oxdabcd[0xf]):__Oxdabcd[0xf];if(xiequ== __Oxdabcd[0x10]){proxyU= $[__Oxdabcd[0xc]]()?(process[__Oxdabcd[0xe]][__Oxdabcd[0x11]]?process[__Oxdabcd[0xe]][__Oxdabcd[0x11]]:__Oxdabcd[0x6]):__Oxdabcd[0x6];if(proxyU== __Oxdabcd[0x6]){console[__Oxdabcd[0x1]](__Oxdabcd[0x12]);return}else {console[__Oxdabcd[0x1]](__Oxdabcd[0x13]+ proxyU)};proxyP= $[__Oxdabcd[0xc]]()?(process[__Oxdabcd[0xe]][__Oxdabcd[0x14]]?process[__Oxdabcd[0xe]][__Oxdabcd[0x14]]:__Oxdabcd[0x6]):__Oxdabcd[0x6];if(proxyP== __Oxdabcd[0x6]){console[__Oxdabcd[0x1]](__Oxdabcd[0x15]);return}else {console[__Oxdabcd[0x1]](__Oxdabcd[0x16]+ proxyP)};ipUrl= $[__Oxdabcd[0xc]]()?(process[__Oxdabcd[0xe]][__Oxdabcd[0x17]]?process[__Oxdabcd[0xe]][__Oxdabcd[0x17]]:__Oxdabcd[0x6]):__Oxdabcd[0x6];if(ipUrl== __Oxdabcd[0x6]){console[__Oxdabcd[0x1]](__Oxdabcd[0x18]);console[__Oxdabcd[0x1]](__Oxdabcd[0x19]);return}else {console[__Oxdabcd[0x1]](__Oxdabcd[0x1a]+ ipUrl)}}else {console[__Oxdabcd[0x1]](__Oxdabcd[0x1b]);console[__Oxdabcd[0x1]](__Oxdabcd[0x1c]);return};let ver=__Oxdabcd[0x1d];let github=true;function gettext(){return {url:`${__Oxe4b43[0x9]}${__Oxdabcd[0x1e]}${__Oxe4b43[0x9]}`,timeout:3000}}async function getHub(){return  new Promise((_0xffc1x13)=>{setTimeout(()=>{$[__Oxdabcd[0x26]](gettext(),(_0xffc1x14,_0xffc1x15,_0xffc1x16)=>{try{if(_0xffc1x14){console[__Oxdabcd[0x1]](__Oxdabcd[0x1f])}else {if(_0xffc1x16!= ver){console[__Oxdabcd[0x21]](__Oxdabcd[0x20]+ ver);console[__Oxdabcd[0x21]](__Oxdabcd[0x22]+ _0xffc1x16);console[__Oxdabcd[0x21]](__Oxdabcd[0x23]);github= false}else {console[__Oxdabcd[0x21]](__Oxdabcd[0x24]+ _0xffc1x16)}}}catch(e){$[__Oxdabcd[0x25]](e,_0xffc1x15)}finally{_0xffc1x13(_0xffc1x16)}})})})}async function superagent(){ await fetch(ipUrl,{"\x68\x65\x61\x64\x65\x72\x73":{"\x73\x65\x63\x2D\x63\x68\x2D\x75\x61":__Oxdabcd[0x32],"\x73\x65\x63\x2D\x63\x68\x2D\x75\x61\x2D\x6D\x6F\x62\x69\x6C\x65":__Oxdabcd[0x33],"\x73\x65\x63\x2D\x63\x68\x2D\x75\x61\x2D\x70\x6C\x61\x74\x66\x6F\x72\x6D":__Oxdabcd[0x34],"\x75\x70\x67\x72\x61\x64\x65\x2D\x69\x6E\x73\x65\x63\x75\x72\x65\x2D\x72\x65\x71\x75\x65\x73\x74\x73":__Oxdabcd[0x35]},"\x72\x65\x66\x65\x72\x72\x65\x72\x50\x6F\x6C\x69\x63\x79":__Oxdabcd[0x36],"\x62\x6F\x64\x79":null,"\x6D\x65\x74\x68\x6F\x64":__Oxdabcd[0x37]})[__Oxdabcd[0x30]]((_0xffc1x1a)=>{return _0xffc1x1a[__Oxdabcd[0x31]]()})[__Oxdabcd[0x30]]((_0xffc1x18)=>{if(_0xffc1x18[__Oxdabcd[0x27]]!= 0){console[__Oxdabcd[0x1]](__Oxdabcd[0x28]+ _0xffc1x18[__Oxdabcd[0x29]])}else {let _0xffc1x19=_0xffc1x18[__Oxdabcd[0x2a]];proxyHost= _0xffc1x19[0x0][__Oxdabcd[0x2b]];proxyPort= _0xffc1x19[0x0][__Oxdabcd[0x2c]];proxyServer= proxyHost+ __Oxdabcd[0xb]+ proxyPort;$[__Oxdabcd[0x2d]]= __Oxdabcd[0x2e]+ proxyU+ __Oxdabcd[0xb]+ proxyP+ __Oxdabcd[0x2f]+ proxyServer}}); await $[__Oxdabcd[0x38]](200)}!(async ()=>{if(process[__Oxdabcd[0xe]][__Oxdabcd[0x40]]&& process[__Oxdabcd[0xe]][__Oxdabcd[0x40]]=== __Oxdabcd[0x41]){ await requireConfig();if(!$[__Oxdabcd[0x42]][0x0]){$[__Oxdabcd[0x29]]($[__Oxdabcd[0x3c]],__Oxdabcd[0x43],__Oxdabcd[0x44],{"\x6F\x70\x65\x6E\x2D\x75\x72\x6C":__Oxdabcd[0x44]});return};for(let _0xffc1x1c=0;_0xffc1x1c< 1;_0xffc1x1c++){if($[__Oxdabcd[0x42]][_0xffc1x1c]){$[__Oxdabcd[0x45]]= $[__Oxdabcd[0x42]][_0xffc1x1c];$[__Oxdabcd[0x46]]= decodeURIComponent($[__Oxdabcd[0x45]][__Oxdabcd[0x47]](/pt_pin=(.+?);/)&& $[__Oxdabcd[0x45]][__Oxdabcd[0x47]](/pt_pin=(.+?);/)[0x1]);$[__Oxdabcd[0x48]]= _0xffc1x1c+ 1;$[__Oxdabcd[0x49]]= true;$[__Oxdabcd[0x4a]]= __Oxdabcd[0x6]; await totalBean();console[__Oxdabcd[0x1]](__Oxdabcd[0x4b]);$[__Oxdabcd[0x4c]]= false;if(args_xh[__Oxdabcd[0x4c]][__Oxdabcd[0x4d]]($.UserName)){console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x4e]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x4a]]|| $[__Oxdabcd[0x46]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);$[__Oxdabcd[0x4c]]= true;continue};if(!$[__Oxdabcd[0x49]]){$[__Oxdabcd[0x29]]($[__Oxdabcd[0x3c]],`${__Oxe4b43[0x9]}${__Oxdabcd[0x4f]}${__Oxe4b43[0x9]}`,`${__Oxe4b43[0x9]}${__Oxdabcd[0x50]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x48]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x51]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x4a]]|| $[__Oxdabcd[0x46]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x52]}${__Oxe4b43[0x9]}`,{"\x6F\x70\x65\x6E\x2D\x75\x72\x6C":__Oxdabcd[0x53]}); await $[__Oxdabcd[0x57]][__Oxdabcd[0x56]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x3c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x54]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x46]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`,`${__Oxe4b43[0x9]}${__Oxdabcd[0x50]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x48]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x51]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x46]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x55]}${__Oxe4b43[0x9]}`);continue};$[__Oxdabcd[0x58]]= 0;$[__Oxdabcd[0x59]]= 0;$[__Oxdabcd[0x5a]]= 0;$[__Oxdabcd[0x5b]]= 1;$[__Oxdabcd[0x5c]]= 1;if(!args_xh[__Oxdabcd[0x5d]]){trialActivityIdList= [];trialActivityTitleList= []};$[__Oxdabcd[0x5e]]= false;$[__Oxdabcd[0x5f]]= false;$[__Oxdabcd[0x60]]= false;size= 1;while(trialActivityIdList[__Oxdabcd[0x61]]< args_xh[__Oxdabcd[0x64]]&& $[__Oxdabcd[0x5f]]=== false){if(args_xh[__Oxdabcd[0x5d]]&& trialActivityIdList[__Oxdabcd[0x61]]!== 0){break};if($[__Oxdabcd[0x5a]]=== args_xh[__Oxdabcd[0x62]][__Oxdabcd[0x61]]){console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x63]}${__Oxe4b43[0x9]}`);break}else { await superagent(); await try_feedsList(args_xh[__Oxdabcd[0x62]][$[__Oxdabcd[0x5a]]],$[__Oxdabcd[0x5b]])};if(trialActivityIdList[__Oxdabcd[0x61]]< args_xh[__Oxdabcd[0x64]]){console[__Oxe4b43[0x4]](`${__Oxe4b43[0x136]}`); await $[__Oxe4b43[0x3b]](6000)}};if($[__Oxdabcd[0x5f]]=== false&& $[__Oxdabcd[0x5e]]=== false){for(let _0xffc1x1c=0;_0xffc1x1c< trialActivityIdList[__Oxdabcd[0x61]]&& $[__Oxdabcd[0x5e]]=== false;_0xffc1x1c++){if($[__Oxdabcd[0x5e]]){console[__Oxdabcd[0x1]](__Oxdabcd[0x66]);break}; await superagent();for(let _0xffc1x1d=0;_0xffc1x1d< $[__Oxdabcd[0x42]][__Oxdabcd[0x61]];_0xffc1x1d++){if($[__Oxdabcd[0x42]][_0xffc1x1d]){$[__Oxdabcd[0x45]]= $[__Oxdabcd[0x42]][_0xffc1x1d];$[__Oxdabcd[0x46]]= decodeURIComponent($[__Oxdabcd[0x45]][__Oxdabcd[0x47]](/pt_pin=(.+?);/)&& $[__Oxdabcd[0x45]][__Oxdabcd[0x47]](/pt_pin=(.+?);/)[0x1]);$[__Oxdabcd[0x48]]= _0xffc1x1d+ 1;$[__Oxdabcd[0x49]]= true;$[__Oxdabcd[0x4a]]= __Oxdabcd[0x6]; await totalBean(); await try_apply(trialActivityTitleList[_0xffc1x1c],trialActivityIdList[_0xffc1x1c])}}};console[__Oxdabcd[0x1]](__Oxdabcd[0x67]);$[__Oxdabcd[0x68]]= 0;$[__Oxdabcd[0x69]]= 0;$[__Oxdabcd[0x6a]]= 0;$[__Oxdabcd[0x6b]]= 0; await try_MyTrials(1,2); await showMsg()}};if($[__Oxdabcd[0xc]]()){if($[__Oxdabcd[0x48]]% args_xh[__Oxdabcd[0x6c]]=== 0){$[__Oxdabcd[0x6d]]++;console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6e]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x6d]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6f]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x6c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`); await $[__Oxdabcd[0x57]][__Oxdabcd[0x56]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x3c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`,`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${notifyMsg}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);notifyMsg= __Oxdabcd[0x6]}}};if($[__Oxdabcd[0xc]]()&& $[__Oxdabcd[0x4c]]=== false){if(($[__Oxdabcd[0x42]][__Oxdabcd[0x61]]- ($[__Oxdabcd[0x6d]]* args_xh[__Oxdabcd[0x6c]]))< args_xh[__Oxdabcd[0x6c]]){console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x70]}${__Oxe4b43[0x9]}${($[__Oxdabcd[0x42]][__Oxdabcd[0x61]]- ($[__Oxdabcd[0x6d]]* args_xh[__Oxdabcd[0x6c]]))}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`); await $[__Oxdabcd[0x57]][__Oxdabcd[0x56]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x3c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`,`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${notifyMsg}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);notifyMsg= __Oxdabcd[0x6]}}}else {console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x71]}${__Oxe4b43[0x9]}`)}})()[__Oxdabcd[0x3f]]((_0xffc1x1b)=>{console[__Oxdabcd[0x3e]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x3b]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x3c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x3d]}${__Oxe4b43[0x9]}${_0xffc1x1b}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)})[__Oxdabcd[0x3a]](()=>{return $[__Oxdabcd[0x39]]()});function requireConfig(){return  new Promise((_0xffc1x13)=>{console[__Oxdabcd[0x1]](__Oxdabcd[0x72]);$[__Oxdabcd[0x57]]= $[__Oxdabcd[0xc]]()?require(__Oxdabcd[0x73]):{sendNotify:async ()=>{}};$[__Oxdabcd[0x42]]= [];if($[__Oxdabcd[0xc]]()){const _0xffc1x1f=require(__Oxdabcd[0x74]);Object[__Oxdabcd[0x77]](_0xffc1x1f)[__Oxdabcd[0x76]]((_0xffc1x20)=>{if(_0xffc1x1f[_0xffc1x20]){$[__Oxdabcd[0x42]][__Oxdabcd[0x75]](_0xffc1x1f[_0xffc1x20])}});if(process[__Oxdabcd[0xe]][__Oxdabcd[0x78]]&& process[__Oxdabcd[0xe]][__Oxdabcd[0x78]]=== __Oxdabcd[0x79]){console[__Oxdabcd[0x1]]= ()=>{}}}else {$[__Oxdabcd[0x42]]= [$[__Oxdabcd[0x7c]](__Oxdabcd[0x7b]),$[__Oxdabcd[0x7c]](__Oxdabcd[0x7d]),...jsonParse($[__Oxdabcd[0x7c]](__Oxdabcd[0x7f])|| __Oxdabcd[0x80])[__Oxdabcd[0x7e]]((_0xffc1x20)=>{return _0xffc1x20[__Oxdabcd[0x45]]})][__Oxdabcd[0x7a]]((_0xffc1x20)=>{return !!_0xffc1x20})};for(let _0xffc1x21 of $[__Oxdabcd[0x81]]){args_xh[__Oxdabcd[0x82]][__Oxdabcd[0x75]](_0xffc1x21)};console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x83]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x42]][__Oxdabcd[0x61]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x84]}${__Oxe4b43[0x9]}`);if(args_xh[__Oxdabcd[0xe]]){console[__Oxdabcd[0x1]](__Oxdabcd[0x85]);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x86]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0xe]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0xe]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x88]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x4c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x4c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x89]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x8a]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x8a]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x8b]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x5d]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x5d]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x8c]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x8d]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x8d]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x8e]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x62]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x62]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x8f]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x82]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x82]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x90]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x91]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x91]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x92]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x93]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x93]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x94]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x95]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x95]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x96]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x97]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x97]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x98]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x64]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x64]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x99]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x9a]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x9a]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x9b]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x9c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x9c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x9d]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0x9e]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x9e]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x9f]}${__Oxe4b43[0x9]}${ typeof args_xh[__Oxdabcd[0xa0]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x87]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0xa0]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](__Oxdabcd[0xa1])};_0xffc1x13()})}function try_tabList(){return  new Promise((_0xffc1x13,_0xffc1x23)=>{console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xa2]}${__Oxe4b43[0x9]}`);const _0xffc1x24=JSON[__Oxdabcd[0xa3]]({"\x76\x65\x72\x73\x69\x6F\x6E":2,"\x70\x72\x65\x76\x69\x65\x77\x54\x69\x6D\x65":__Oxdabcd[0x6]});let _0xffc1x25=taskurl_xh(__Oxdabcd[0xa4],__Oxdabcd[0xa5],_0xffc1x24);$[__Oxdabcd[0x26]](_0xffc1x25,(_0xffc1x14,_0xffc1x15,_0xffc1x16)=>{try{if(_0xffc1x14){if(JSON[__Oxdabcd[0xa3]](_0xffc1x14)=== `${__Oxe4b43[0x9]}${__Oxdabcd[0xa6]}${__Oxe4b43[0x9]}`){$[__Oxdabcd[0x5f]]= true;console[__Oxdabcd[0x1]](__Oxdabcd[0xa7])}else {console[__Oxdabcd[0x1]](JSON[__Oxdabcd[0xa3]](_0xffc1x14));console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x3c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xa8]}${__Oxe4b43[0x9]}`)}}else {_0xffc1x16= JSON[__Oxdabcd[0xa9]](_0xffc1x16);if(_0xffc1x16[__Oxdabcd[0xaa]]){for(let _0xffc1x26 of _0xffc1x16[__Oxdabcd[0x2a]][__Oxdabcd[0xab]]){console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${_0xffc1x26[__Oxdabcd[0xac]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xad]}${__Oxe4b43[0x9]}${_0xffc1x26[__Oxdabcd[0x62]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)}}else {console[__Oxdabcd[0x1]](__Oxdabcd[0xae],_0xffc1x16)}}}catch(e){_0xffc1x23(`${__Oxe4b43[0x9]}${__Oxdabcd[0xaf]}${__Oxe4b43[0x9]}${arguments[__Oxdabcd[0xb0]][__Oxdabcd[0x3c]].toString()}${__Oxe4b43[0x9]}${__Oxdabcd[0xb1]}${__Oxe4b43[0x9]}${e}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}${JSON[__Oxdabcd[0xa3]](_0xffc1x16)}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)}finally{_0xffc1x13()}})})}function try_feedsList(_0xffc1x26,_0xffc1x28){return  new Promise((_0xffc1x13,_0xffc1x23)=>{const _0xffc1x24=JSON[__Oxdabcd[0xa3]]({"\x74\x61\x62\x49\x64":`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${_0xffc1x26}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`,"\x70\x61\x67\x65":_0xffc1x28,"\x76\x65\x72\x73\x69\x6F\x6E":2,"\x73\x6F\x75\x72\x63\x65":__Oxdabcd[0xb3],"\x63\x6C\x69\x65\x6E\x74":__Oxdabcd[0xb4],"\x70\x72\x65\x76\x69\x65\x77\x54\x69\x6D\x65":__Oxdabcd[0x6]});let _0xffc1x25=taskurl_xh(__Oxdabcd[0xa4],__Oxdabcd[0xb5],_0xffc1x24);$[__Oxdabcd[0x26]](_0xffc1x25,(_0xffc1x14,_0xffc1x15,_0xffc1x16)=>{try{if(_0xffc1x14){if(JSON[__Oxdabcd[0xa3]](_0xffc1x14)=== `${__Oxe4b43[0x9]}${__Oxdabcd[0xa6]}${__Oxe4b43[0x9]}`){$[__Oxdabcd[0x5f]]= true;console[__Oxdabcd[0x1]](__Oxdabcd[0xa7])}else {console[__Oxdabcd[0x1]](JSON[__Oxdabcd[0xa3]](_0xffc1x14));console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x3c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xa8]}${__Oxe4b43[0x9]}`)}}else {_0xffc1x16= JSON[__Oxdabcd[0xa9]](_0xffc1x16);let _0xffc1x29=`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`;if(_0xffc1x16[__Oxdabcd[0xaa]]){$[__Oxdabcd[0x5b]]=== args_xh[__Oxdabcd[0x8a]]?$[__Oxdabcd[0x5b]]= 1:$[__Oxdabcd[0x5b]]++;console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xb6]}${__Oxe4b43[0x9]}${size++}${__Oxe4b43[0x9]}${__Oxdabcd[0xb7]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x62]][$[__Oxdabcd[0x5a]]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xb8]}${__Oxe4b43[0x9]}${_0xffc1x28}${__Oxe4b43[0x9]}${__Oxdabcd[0xb9]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x8a]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xba]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xbb]}${__Oxe4b43[0x9]}${_0xffc1x16[__Oxdabcd[0x2a]][__Oxdabcd[0xbc]][__Oxdabcd[0x61]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xbd]}${__Oxe4b43[0x9]}`);for(let _0xffc1x20 of _0xffc1x16[__Oxdabcd[0x2a]][__Oxdabcd[0xbc]]){if(_0xffc1x20[__Oxdabcd[0xbe]]=== null){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xbf]}${__Oxe4b43[0x9]}${_0xffc1x20[__Oxdabcd[0xc0]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6];continue};if(trialActivityIdList[__Oxdabcd[0x61]]>= args_xh[__Oxdabcd[0x64]]){console[__Oxdabcd[0x1]](__Oxdabcd[0xc1]);break};if(_0xffc1x20[__Oxdabcd[0xc2]]=== 1){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xc3]}${__Oxe4b43[0x9]}${_0xffc1x20[__Oxdabcd[0xc0]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6];continue};if(_0xffc1x20[__Oxdabcd[0xc2]]!== null){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xc4]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6];continue};if(args_xh[__Oxdabcd[0x9a]]){$[__Oxdabcd[0xc5]]= true;if(_0xffc1x20[__Oxdabcd[0xc6]][__Oxdabcd[0x61]]!== 0){for(let _0xffc1x2a of _0xffc1x20[__Oxdabcd[0xc6]]){if(_0xffc1x2a[__Oxdabcd[0xc7]]=== 3){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](__Oxdabcd[0xc8]):__Oxdabcd[0x6];$[__Oxdabcd[0xc5]]= false;break}else {if(_0xffc1x2a[__Oxdabcd[0xc7]]=== 5){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](__Oxdabcd[0xc9]):__Oxdabcd[0x6];$[__Oxdabcd[0xc5]]= false;break}}}}};if(_0xffc1x20[__Oxdabcd[0xc0]]&& $[__Oxdabcd[0xc5]]){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xca]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x62]][$[__Oxdabcd[0x5a]]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xb8]}${__Oxe4b43[0x9]}${_0xffc1x28}${__Oxe4b43[0x9]}${__Oxdabcd[0xb9]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x8a]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xcb]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x5c]]++ + 1}${__Oxe4b43[0x9]}${__Oxdabcd[0xcc]}${__Oxe4b43[0x9]}${_0xffc1x20[__Oxdabcd[0xc0]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6];if(args_xh[__Oxdabcd[0x9e]]){if(args_xh[__Oxdabcd[0xa0]][__Oxdabcd[0xcd]]((_0xffc1x2b)=>{return _0xffc1x20[__Oxdabcd[0xc0]][__Oxdabcd[0x4d]](_0xffc1x2b)})){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xce]}${__Oxe4b43[0x9]}${_0xffc1x20[__Oxdabcd[0xcf]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6];trialActivityIdList[__Oxdabcd[0x75]](_0xffc1x20[__Oxdabcd[0xcf]]);trialActivityTitleList[__Oxdabcd[0x75]](_0xffc1x20[__Oxdabcd[0xc0]])}}else {_0xffc1x29= `${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`;if(parseFloat(_0xffc1x20[__Oxdabcd[0x8d]])<= args_xh[__Oxdabcd[0x8d]]){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xd0]}${__Oxe4b43[0x9]}${_0xffc1x20[__Oxdabcd[0x8d]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xd1]}${__Oxe4b43[0x9]}${args_xh[__Oxdabcd[0x8d]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xd2]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6]}else {if(parseFloat(_0xffc1x20[__Oxdabcd[0xd3]])< args_xh[__Oxdabcd[0x93]]&& _0xffc1x20[__Oxdabcd[0xd3]]!== null){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xd4]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6]}else {if(parseFloat(_0xffc1x20[__Oxdabcd[0xbe]])> args_xh[__Oxdabcd[0x95]]&& _0xffc1x20[__Oxdabcd[0xbe]]!== null){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xd5]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6]}else {if(parseFloat(_0xffc1x20[__Oxdabcd[0x8d]])< args_xh[__Oxdabcd[0x8d]]){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xd6]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6]}else {if(args_xh[__Oxdabcd[0x82]][__Oxdabcd[0xcd]]((_0xffc1x2b)=>{return _0xffc1x20[__Oxdabcd[0xc0]][__Oxdabcd[0x4d]](_0xffc1x2b)?_0xffc1x29= _0xffc1x2b:__Oxdabcd[0x6]})){args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xd7]}${__Oxe4b43[0x9]}${_0xffc1x29}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6]}else {args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xd8]}${__Oxe4b43[0x9]}${_0xffc1x20[__Oxdabcd[0xcf]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6];trialActivityIdList[__Oxdabcd[0x75]](_0xffc1x20[__Oxdabcd[0xcf]]);trialActivityTitleList[__Oxdabcd[0x75]](_0xffc1x20[__Oxdabcd[0xc0]])}}}}}}}else {if($[__Oxdabcd[0xc5]]!== false){console[__Oxdabcd[0x3e]](__Oxdabcd[0xd9]);return}}};console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xda]}${__Oxe4b43[0x9]}${trialActivityIdList[__Oxdabcd[0x61]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${trialActivityIdList}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6];if(_0xffc1x28>= args_xh[__Oxdabcd[0x8a]]&& $[__Oxdabcd[0x5a]]< args_xh[__Oxdabcd[0x62]][__Oxdabcd[0x61]]){$[__Oxdabcd[0x5a]]++;$[__Oxdabcd[0x5b]]= 1;$[__Oxdabcd[0x5c]]= 1}}else {console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xdb]}${__Oxe4b43[0x9]}${_0xffc1x16[__Oxdabcd[0xdc]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)}}}catch(e){_0xffc1x23(`${__Oxe4b43[0x9]}${__Oxdabcd[0xaf]}${__Oxe4b43[0x9]}${arguments[__Oxdabcd[0xb0]][__Oxdabcd[0x3c]].toString()}${__Oxe4b43[0x9]}${__Oxdabcd[0xb1]}${__Oxe4b43[0x9]}${e}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}${JSON[__Oxdabcd[0xa3]](_0xffc1x16)}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)}finally{_0xffc1x13()}})})}function try_apply(_0xffc1x2d,_0xffc1x2e){return  new Promise((_0xffc1x13,_0xffc1x23)=>{console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xdd]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x48]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xde]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x4a]]|| $[__Oxdabcd[0x46]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xdf]}${__Oxe4b43[0x9]}`);args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xe0]}${__Oxe4b43[0x9]}${_0xffc1x2d}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6];args_xh[__Oxdabcd[0x9c]]?console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0xe1]}${__Oxe4b43[0x9]}${_0xffc1x2e}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`):__Oxdabcd[0x6];const _0xffc1x24=JSON[__Oxdabcd[0xa3]]({"\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64":_0xffc1x2e,"\x70\x72\x65\x76\x69\x65\x77\x54\x69\x6D\x65":__Oxdabcd[0x6]});let _0xffc1x2f={'\x43\x6F\x6F\x6B\x69\x65':$[__Oxdabcd[0x45]]+ `${__Oxe4b43[0x137]}`,'\x48\x6F\x73\x74':__Oxe4b43[0xe5],'\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E':__Oxe4b43[0x127],'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x4C\x65\x6E\x67\x74\x68':__Oxe4b43[0x138],'\x41\x63\x63\x65\x70\x74':__Oxe4b43[0x139],'\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74':$[__Oxe4b43[0xf]]()?(process[__Oxe4b43[0x11]][__Oxe4b43[0xe9]]?process[__Oxe4b43[0x11]][__Oxe4b43[0xe9]]:(require(__Oxe4b43[0xeb])[__Oxe4b43[0xea]])):($[__Oxe4b43[0x7f]](__Oxe4b43[0xec])?$[__Oxe4b43[0x7f]](__Oxe4b43[0xec]):__Oxe4b43[0xed]),'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65':__Oxe4b43[0x125],'\x4F\x72\x69\x67\x69\x6E':__Oxe4b43[0x103],'\x58\x2D\x52\x65\x71\x75\x65\x73\x74\x65\x64\x2D\x57\x69\x74\x68':__Oxe4b43[0x13a],'\x53\x65\x63\x2D\x46\x65\x74\x63\x68\x2D\x53\x69\x74\x65':__Oxe4b43[0x13b],'\x53\x65\x63\x2D\x46\x65\x74\x63\x68\x2D\x4D\x6F\x64\x65':__Oxe4b43[0x13c],'\x53\x65\x63\x2D\x46\x65\x74\x63\x68\x2D\x44\x65\x73\x74':__Oxe4b43[0x13d],'\x52\x65\x66\x65\x72\x65\x72':__Oxe4b43[0x105],'\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67':__Oxe4b43[0xe8],'\x41\x63\x63\x65\x70\x74\x2D\x4C\x61\x6E\x67\x75\x61\x67\x65':__Oxe4b43[0x13e]};try{requestSup[__Oxdabcd[0x26]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${URL}${__Oxe4b43[0x9]}${__Oxdabcd[0xf8]}${__Oxe4b43[0x9]}${encodeURIComponent(_0xffc1x24)}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)[__Oxdabcd[0xf7]](_0xffc1x2f)[__Oxdabcd[0xf6]]($[__Oxdabcd[0x2d]])[__Oxdabcd[0x30]]((_0xffc1x18)=>{return _0xffc1x18[__Oxdabcd[0xf5]]})[__Oxdabcd[0x30]]((_0xffc1x16)=>{$[__Oxdabcd[0x58]]++;_0xffc1x16= JSON[__Oxdabcd[0xa9]](_0xffc1x16);if(_0xffc1x16[__Oxdabcd[0xaa]]&& _0xffc1x16[__Oxdabcd[0x27]]=== __Oxdabcd[0x35]){console[__Oxdabcd[0x1]](__Oxdabcd[0xed]);$[__Oxdabcd[0x59]]++}else {if(_0xffc1x16[__Oxdabcd[0x27]]=== __Oxdabcd[0xee]){console[__Oxdabcd[0x1]](_0xffc1x16[__Oxdabcd[0xdc]])}else {if(_0xffc1x16[__Oxdabcd[0x27]]=== __Oxdabcd[0xef]){console[__Oxdabcd[0x1]](_0xffc1x16[__Oxdabcd[0xdc]])}else {if(_0xffc1x16[__Oxdabcd[0x27]]=== __Oxdabcd[0xf0]){console[__Oxdabcd[0x1]](_0xffc1x16[__Oxdabcd[0xdc]])}else {if(_0xffc1x16[__Oxdabcd[0x27]]=== __Oxdabcd[0xf1]){console[__Oxdabcd[0x1]](_0xffc1x16[__Oxdabcd[0xdc]])}else {if(_0xffc1x16[__Oxdabcd[0x27]]=== __Oxdabcd[0xf2]){console[__Oxdabcd[0x1]](_0xffc1x16[__Oxdabcd[0xdc]])}else {if(_0xffc1x16[__Oxdabcd[0x27]]=== __Oxdabcd[0xf3]){console[__Oxdabcd[0x1]](_0xffc1x16[__Oxdabcd[0xdc]])}else {console[__Oxdabcd[0x1]](__Oxdabcd[0xf4],_0xffc1x16)}}}}}}}})[__Oxdabcd[0x3f]]((_0xffc1x14)=>{if(JSON[__Oxdabcd[0xa3]](_0xffc1x14)=== `${__Oxe4b43[0x9]}${__Oxdabcd[0xa6]}${__Oxe4b43[0x9]}`){$[__Oxdabcd[0x5f]]= true;console[__Oxdabcd[0x1]](__Oxdabcd[0xa7])}else {console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x3c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xa8]}${__Oxe4b43[0x9]}`)};console[__Oxdabcd[0x1]](_0xffc1x14[__Oxdabcd[0xdc]])})}catch(e){_0xffc1x23(`${__Oxe4b43[0x9]}${__Oxdabcd[0xaf]}${__Oxe4b43[0x9]}${arguments[__Oxdabcd[0xb0]][__Oxdabcd[0x3c]].toString()}${__Oxe4b43[0x9]}${__Oxdabcd[0xb1]}${__Oxe4b43[0x9]}${e}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}${JSON[__Oxdabcd[0xa3]](data)}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)}finally{_0xffc1x13()}})}function try_MyTrials(_0xffc1x28,_0xffc1x31){return  new Promise((_0xffc1x13,_0xffc1x23)=>{switch(_0xffc1x31){case 1:console[__Oxdabcd[0x1]](__Oxdabcd[0xf9]);break;case 2:console[__Oxdabcd[0x1]](__Oxdabcd[0xfa]);break;case 3:console[__Oxdabcd[0x1]](__Oxdabcd[0xfb]);break;default:console[__Oxdabcd[0x1]](__Oxdabcd[0xfc])};let _0xffc1x32={url:URL,body:`${__Oxe4b43[0x9]}${__Oxdabcd[0xfd]}${__Oxe4b43[0x9]}${_0xffc1x28}${__Oxe4b43[0x9]}${__Oxdabcd[0xfe]}${__Oxe4b43[0x9]}${_0xffc1x31}${__Oxe4b43[0x9]}${__Oxdabcd[0xff]}${__Oxe4b43[0x9]}`,headers:{'\x6F\x72\x69\x67\x69\x6E':__Oxdabcd[0x100],'\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74':__Oxdabcd[0x101],'\x72\x65\x66\x65\x72\x65\x72':__Oxdabcd[0x102],'\x63\x6F\x6F\x6B\x69\x65':$[__Oxdabcd[0x45]]}};$[__Oxdabcd[0x10f]](_0xffc1x32,(_0xffc1x14,_0xffc1x15,_0xffc1x16)=>{try{if(_0xffc1x14){console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x103]}${__Oxe4b43[0x9]}${arguments[__Oxdabcd[0xb0]][__Oxdabcd[0x3c]].toString()}${__Oxe4b43[0x9]}${__Oxdabcd[0x104]}${__Oxe4b43[0x9]}${JSON[__Oxdabcd[0xa3]](_0xffc1x14)}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)}else {_0xffc1x16= JSON[__Oxdabcd[0xa9]](_0xffc1x16);if(_0xffc1x16[__Oxdabcd[0xaa]]){if(_0xffc1x31=== 2){if(_0xffc1x16[__Oxdabcd[0xaa]]&& _0xffc1x16[__Oxdabcd[0x2a]]){for(let _0xffc1x20 of _0xffc1x16[__Oxdabcd[0x2a]][__Oxdabcd[0x105]]){_0xffc1x20[__Oxdabcd[0x106]]=== 4|| _0xffc1x20[__Oxdabcd[0xf5]][__Oxdabcd[0xf5]][__Oxdabcd[0x4d]](__Oxdabcd[0x107])?$[__Oxdabcd[0x68]]+= 1:__Oxdabcd[0x6];_0xffc1x20[__Oxdabcd[0x106]]=== 2&& _0xffc1x20[__Oxdabcd[0xf5]][__Oxdabcd[0xf5]][__Oxdabcd[0x4d]](__Oxdabcd[0x108])?$[__Oxdabcd[0x69]]+= 1:__Oxdabcd[0x6];_0xffc1x20[__Oxdabcd[0x106]]=== 2&& _0xffc1x20[__Oxdabcd[0xf5]][__Oxdabcd[0xf5]][__Oxdabcd[0x4d]](__Oxdabcd[0x109])?$[__Oxdabcd[0x6a]]+= 1:__Oxdabcd[0x6];_0xffc1x20[__Oxdabcd[0x106]]=== 2&& _0xffc1x20[__Oxdabcd[0xf5]][__Oxdabcd[0xf5]][__Oxdabcd[0x4d]](__Oxdabcd[0x10a])?$[__Oxdabcd[0x6b]]+= 1:__Oxdabcd[0x6]};console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x10b]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x69]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x10c]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x6a]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x10c]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x6b]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x10c]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x68]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)}else {console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x10d]}${__Oxe4b43[0x9]}${_0xffc1x16[__Oxdabcd[0xdc]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)}}}else {console[__Oxdabcd[0x3e]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x10e]}${__Oxe4b43[0x9]}`)}}}catch(e){_0xffc1x23(`${__Oxe4b43[0x9]}${__Oxdabcd[0xaf]}${__Oxe4b43[0x9]}${arguments[__Oxdabcd[0xb0]][__Oxdabcd[0x3c]].toString()}${__Oxe4b43[0x9]}${__Oxdabcd[0xb1]}${__Oxe4b43[0x9]}${e}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}${JSON[__Oxdabcd[0xa3]](_0xffc1x16)}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`)}finally{_0xffc1x13()}})})}function taskurl_xh(_0xffc1x34,_0xffc1x35,_0xffc1x36= JSON[__Oxe4b43[0xa6]]({})){return {"\x75\x72\x6C":`${__Oxe4b43[0x9]}${URL}${__Oxe4b43[0x13f]}${_0xffc1x34}${__Oxe4b43[0x114]}${_0xffc1x35}${__Oxe4b43[0x140]}${encodeURIComponent(_0xffc1x36)}${__Oxe4b43[0x9]}`,'\x68\x65\x61\x64\x65\x72\x73':{'\x43\x6F\x6F\x6B\x69\x65':$[__Oxdabcd[0x45]]+ `${__Oxe4b43[0x137]}`,'\x48\x6F\x73\x74':__Oxe4b43[0xe5],'\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E':__Oxe4b43[0x127],'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x4C\x65\x6E\x67\x74\x68':__Oxe4b43[0x138],'\x41\x63\x63\x65\x70\x74':__Oxe4b43[0x139],'\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74':$[__Oxe4b43[0xf]]()?(process[__Oxe4b43[0x11]][__Oxe4b43[0xe9]]?process[__Oxe4b43[0x11]][__Oxe4b43[0xe9]]:(require(__Oxe4b43[0xeb])[__Oxe4b43[0xea]])):($[__Oxe4b43[0x7f]](__Oxe4b43[0xec])?$[__Oxe4b43[0x7f]](__Oxe4b43[0xec]):__Oxe4b43[0xed]),'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65':__Oxe4b43[0x125],'\x4F\x72\x69\x67\x69\x6E':__Oxe4b43[0x103],'\x58\x2D\x52\x65\x71\x75\x65\x73\x74\x65\x64\x2D\x57\x69\x74\x68':__Oxe4b43[0x13a],'\x53\x65\x63\x2D\x46\x65\x74\x63\x68\x2D\x53\x69\x74\x65':__Oxe4b43[0x13b],'\x53\x65\x63\x2D\x46\x65\x74\x63\x68\x2D\x4D\x6F\x64\x65':__Oxe4b43[0x13c],'\x53\x65\x63\x2D\x46\x65\x74\x63\x68\x2D\x44\x65\x73\x74':__Oxe4b43[0x13d],'\x52\x65\x66\x65\x72\x65\x72':__Oxe4b43[0x105],'\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67':__Oxe4b43[0xe8],'\x41\x63\x63\x65\x70\x74\x2D\x4C\x61\x6E\x67\x75\x61\x67\x65':__Oxe4b43[0x13e]}}}async function showMsg(){let _0xffc1x38=`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`;_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x114]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x48]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x51]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x4a]]|| $[__Oxdabcd[0x46]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xb2]}${__Oxe4b43[0x9]}`;if($[__Oxdabcd[0x59]]!== 0&& $[__Oxdabcd[0x58]]!== 0){_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x115]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x59]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xb9]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x58]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x116]}${__Oxe4b43[0x9]}`;_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x117]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x69]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x118]}${__Oxe4b43[0x9]}`;_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x117]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x6a]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x119]}${__Oxe4b43[0x9]}`;_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x117]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x6b]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x11a]}${__Oxe4b43[0x9]}`;_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x11b]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x68]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x11c]}${__Oxe4b43[0x9]}`}else {_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x11d]}${__Oxe4b43[0x9]}`;_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x117]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x69]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x118]}${__Oxe4b43[0x9]}`;_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x117]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x6a]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x119]}${__Oxe4b43[0x9]}`;_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x117]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x6b]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x11a]}${__Oxe4b43[0x9]}`;_0xffc1x38+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x11b]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x68]]}${__Oxe4b43[0x9]}${__Oxdabcd[0x11c]}${__Oxe4b43[0x9]}`};if(!args_xh[__Oxdabcd[0x11e]]|| args_xh[__Oxdabcd[0x11e]]=== __Oxdabcd[0x79]){$[__Oxdabcd[0x29]]($[__Oxdabcd[0x3c]],`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`,_0xffc1x38,{"\x6F\x70\x65\x6E\x2D\x75\x72\x6C":__Oxdabcd[0x11f]});if($[__Oxdabcd[0xc]]()){notifyMsg+= `${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${_0xffc1x38}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`}}else {console[__Oxdabcd[0x1]](_0xffc1x38)}}function totalBean(){return  new Promise(async (_0xffc1x13)=>{const _0xffc1x32={"\x75\x72\x6C":`${__Oxe4b43[0x9]}${__Oxdabcd[0x120]}${__Oxe4b43[0x9]}`,"\x68\x65\x61\x64\x65\x72\x73":{"\x41\x63\x63\x65\x70\x74":__Oxdabcd[0x121],"\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65":__Oxdabcd[0x122],"\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67":__Oxdabcd[0xe5],"\x41\x63\x63\x65\x70\x74\x2D\x4C\x61\x6E\x67\x75\x61\x67\x65":__Oxdabcd[0x123],"\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E":__Oxdabcd[0x124],"\x43\x6F\x6F\x6B\x69\x65":$[__Oxdabcd[0x45]],"\x52\x65\x66\x65\x72\x65\x72":__Oxdabcd[0x125],"\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74":$[__Oxdabcd[0xc]]()?(process[__Oxdabcd[0xe]][__Oxdabcd[0xe6]]?process[__Oxdabcd[0xe]][__Oxdabcd[0xe6]]:(require(__Oxdabcd[0xe8])[__Oxdabcd[0xe7]])):($[__Oxdabcd[0x7c]](__Oxdabcd[0xe9])?$[__Oxdabcd[0x7c]](__Oxdabcd[0xe9]):__Oxdabcd[0xea])},"\x74\x69\x6D\x65\x6F\x75\x74":2000};$[__Oxdabcd[0x10f]](_0xffc1x32,(_0xffc1x14,_0xffc1x15,_0xffc1x16)=>{try{if(_0xffc1x14){console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${JSON[__Oxdabcd[0xa3]](_0xffc1x14)}${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}`);console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x6]}${__Oxe4b43[0x9]}${$[__Oxdabcd[0x3c]]}${__Oxe4b43[0x9]}${__Oxdabcd[0xa8]}${__Oxe4b43[0x9]}`)}else {if(_0xffc1x16){_0xffc1x16= JSON[__Oxdabcd[0xa9]](_0xffc1x16);if(_0xffc1x16[__Oxdabcd[0x126]]=== 13){$[__Oxdabcd[0x49]]= false;return};if(_0xffc1x16[__Oxdabcd[0x126]]=== 0){$[__Oxdabcd[0x4a]]= (_0xffc1x16[__Oxdabcd[0x127]]&& _0xffc1x16[__Oxdabcd[0x127]][__Oxdabcd[0x128]])|| $[__Oxdabcd[0x46]]}else {$[__Oxdabcd[0x4a]]= $[__Oxdabcd[0x46]]}}else {console[__Oxdabcd[0x1]](`${__Oxe4b43[0x9]}${__Oxdabcd[0x129]}${__Oxe4b43[0x9]}`)}}}catch(e){$[__Oxdabcd[0x25]](e,_0xffc1x15)}finally{_0xffc1x13()}})})}function jsonParse(_0xffc1x3b){if( typeof _0xffc1x3b== __Oxdabcd[0x12a]){try{return JSON[__Oxdabcd[0xa9]](_0xffc1x3b)}catch(e){console[__Oxdabcd[0x1]](e);$[__Oxdabcd[0x29]]($[__Oxdabcd[0x3c]],__Oxdabcd[0x6],__Oxdabcd[0x12b]);return []}}}(function(_0xffc1x3c,_0xffc1x3d,_0xffc1x3e,_0xffc1x3f,_0xffc1x40,_0xffc1x1d){_0xffc1x1d= __Oxdabcd[0x12c];_0xffc1x3f= function(_0xffc1x41){if( typeof alert!== _0xffc1x1d){alert(_0xffc1x41)};if( typeof console!== _0xffc1x1d){console[__Oxdabcd[0x1]](_0xffc1x41)}};_0xffc1x3e= function(_0xffc1x42,_0xffc1x3c){return _0xffc1x42+ _0xffc1x3c};_0xffc1x40= _0xffc1x3e(__Oxdabcd[0x12d],_0xffc1x3e(_0xffc1x3e(__Oxdabcd[0x12e],__Oxdabcd[0x12f]),__Oxdabcd[0x130]));try{_0xffc1x3c= __encode;if(!( typeof _0xffc1x3c!== _0xffc1x1d&& _0xffc1x3c=== _0xffc1x3e(__Oxdabcd[0x131],__Oxdabcd[0x132]))){_0xffc1x3f(_0xffc1x40)}}catch(e){_0xffc1x3f(_0xffc1x40)}})({});(function(_0xffc1x43,_0xffc1x44,_0xffc1x45,_0xffc1x46,_0xffc1x47,_0xffc1x48){_0xffc1x48= __Oxe4b43[0x12f];_0xffc1x46= function(_0xffc1x49){if( typeof alert!== _0xffc1x48){alert(_0xffc1x49)};if( typeof console!== _0xffc1x48){console[__Oxe4b43[0x4]](_0xffc1x49)}};_0xffc1x45= function(_0xffc1x4a,_0xffc1x43){return _0xffc1x4a+ _0xffc1x43};_0xffc1x47= _0xffc1x45(__Oxe4b43[0x130],_0xffc1x45(_0xffc1x45(__Oxe4b43[0x131],__Oxe4b43[0x132]),__Oxe4b43[0x133]));try{_0xffc1x43= __encode;if(!( typeof _0xffc1x43!== _0xffc1x48&& _0xffc1x43=== _0xffc1x45(__Oxe4b43[0x134],__Oxe4b43[0x135]))){_0xffc1x46(_0xffc1x47)}}catch(e){_0xffc1x46(_0xffc1x47)}})({})

function Env(name, opts) {
	class Http {
		constructor(env) {
			this.env = env
		}

		send(opts, method = 'GET') {
			opts = typeof opts === 'string' ? {
				url: opts
			} : opts
			let sender = this.get
			if (method === 'POST') {
				sender = this.post
			}
			return new Promise((resolve, reject) => {
				sender.call(this, opts, (err, resp, body) => {
					if (err) reject(err)
					else resolve(resp)
				})
			})
		}

		get(opts) {
			return this.send.call(this.env, opts)
		}

		post(opts) {
			return this.send.call(this.env, opts, 'POST')
		}
	}

	return new (class {
		constructor(name, opts) {
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

		isNode() {
			return 'undefined' !== typeof module && !!module.exports
		}

		isQuanX() {
			return 'undefined' !== typeof $task
		}

		isSurge() {
			return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
		}

		isLoon() {
			return 'undefined' !== typeof $loon
		}

		toObj(str, defaultValue = null) {
			try {
				return JSON.parse(str)
			} catch {
				return defaultValue
			}
		}

		toStr(obj, defaultValue = null) {
			try {
				return JSON.stringify(obj)
			} catch {
				return defaultValue
			}
		}

		getjson(key, defaultValue) {
			let json = defaultValue
			const val = this.getdata(key)
			if (val) {
				try {
					json = JSON.parse(this.getdata(key))
				} catch { }
			}
			return json
		}

		setjson(val, key) {
			try {
				return this.setdata(JSON.stringify(val), key)
			} catch {
				return false
			}
		}

		getScript(url) {
			return new Promise((resolve) => {
				this.get({
					url
				}, (err, resp, body) => resolve(body))
			})
		}

		runScript(script, runOpts) {
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

		loaddata() {
			if (this.isNode()) {
				this.fs = this.fs ? this.fs : require('fs')
				this.path = this.path ? this.path : require('path')
				const curDirDataFilePath = this.path.resolve(this.dataFile)
				const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
				const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
				const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
				if (isCurDirDataFile || isRootDirDataFile) {
					const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
					try {
						return JSON.parse(this.fs.readFileSync(datPath))
					} catch (e) {
						return {}
					}
				} else return {}
			} else return {}
		}

		writedata() {
			if (this.isNode()) {
				this.fs = this.fs ? this.fs : require('fs')
				this.path = this.path ? this.path : require('path')
				const curDirDataFilePath = this.path.resolve(this.dataFile)
				const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
				const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
				const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
				const jsondata = JSON.stringify(this.data)
				if (isCurDirDataFile) {
					this.fs.writeFileSync(curDirDataFilePath, jsondata)
				} else if (isRootDirDataFile) {
					this.fs.writeFileSync(rootDirDataFilePath, jsondata)
				} else {
					this.fs.writeFileSync(curDirDataFilePath, jsondata)
				}
			}
		}

		lodash_get(source, path, defaultValue = undefined) {
			const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
			let result = source
			for (const p of paths) {
				result = Object(result)[p]
				if (result === undefined) {
					return defaultValue
				}
			}
			return result
		}

		lodash_set(obj, path, value) {
			if (Object(obj) !== obj) return obj
			if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
			path.slice(0, -1).reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
				path[path.length - 1]
				] = value
			return obj
		}

		getdata(key) {
			let val = this.getval(key)
			// 如果以 @
			if (/^@/.test(key)) {
				const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
				const objval = objkey ? this.getval(objkey) : ''
				if (objval) {
					try {
						const objedval = JSON.parse(objval)
						val = objedval ? this.lodash_get(objedval, paths, '') : val
					} catch (e) {
						val = ''
					}
				}
			}
			return val
		}

		setdata(val, key) {
			let issuc = false
			if (/^@/.test(key)) {
				const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
				const objdat = this.getval(objkey)
				const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
				try {
					const objedval = JSON.parse(objval)
					this.lodash_set(objedval, paths, val)
					issuc = this.setval(JSON.stringify(objedval), objkey)
				} catch (e) {
					const objedval = {}
					this.lodash_set(objedval, paths, val)
					issuc = this.setval(JSON.stringify(objedval), objkey)
				}
			} else {
				issuc = this.setval(val, key)
			}
			return issuc
		}

		getval(key) {
			if (this.isSurge() || this.isLoon()) {
				return $persistentStore.read(key)
			} else if (this.isQuanX()) {
				return $prefs.valueForKey(key)
			} else if (this.isNode()) {
				this.data = this.loaddata()
				return this.data[key]
			} else {
				return (this.data && this.data[key]) || null
			}
		}

		setval(val, key) {
			if (this.isSurge() || this.isLoon()) {
				return $persistentStore.write(val, key)
			} else if (this.isQuanX()) {
				return $prefs.setValueForKey(val, key)
			} else if (this.isNode()) {
				this.data = this.loaddata()
				this.data[key] = val
				this.writedata()
				return true
			} else {
				return (this.data && this.data[key]) || null
			}
		}

		initGotEnv(opts) {
			this.got = this.got ? this.got : require('got')
			this.cktough = this.cktough ? this.cktough : require('tough-cookie')
			this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
			if (opts) {
				opts.headers = opts.headers ? opts.headers : {}
				if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
					opts.cookieJar = this.ckjar
				}
			}
		}

		get(opts, callback = () => { }) {
			if (opts.headers) {
				delete opts.headers['Content-Type']
				delete opts.headers['Content-Length']
			}
			if (this.isSurge() || this.isLoon()) {
				if (this.isSurge() && this.isNeedRewrite) {
					opts.headers = opts.headers || {}
					Object.assign(opts.headers, {
						'X-Surge-Skip-Scripting': false
					})
				}
				$httpClient.get(opts, (err, resp, body) => {
					if (!err && resp) {
						resp.body = body
						resp.statusCode = resp.status
					}
					callback(err, resp, body)
				})
			} else if (this.isQuanX()) {
				if (this.isNeedRewrite) {
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
			} else if (this.isNode()) {
				this.initGotEnv(opts)
				this.got(opts).on('redirect', (resp, nextOpts) => {
					try {
						if (resp.headers['set-cookie']) {
							const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
							if (ck) {
								this.ckjar.setCookieSync(ck, null)
							}
							nextOpts.cookieJar = this.ckjar
						}
					} catch (e) {
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

		post(opts, callback = () => { }) {
			// 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
			if (opts.body && opts.headers && !opts.headers['Content-Type']) {
				opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			}
			if (opts.headers) delete opts.headers['Content-Length']
			if (this.isSurge() || this.isLoon()) {
				if (this.isSurge() && this.isNeedRewrite) {
					opts.headers = opts.headers || {}
					Object.assign(opts.headers, {
						'X-Surge-Skip-Scripting': false
					})
				}
				$httpClient.post(opts, (err, resp, body) => {
					if (!err && resp) {
						resp.body = body
						resp.statusCode = resp.status
					}
					callback(err, resp, body)
				})
			} else if (this.isQuanX()) {
				opts.method = 'POST'
				if (this.isNeedRewrite) {
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
			} else if (this.isNode()) {
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
		time(fmt) {
			let o = {
				'M+': new Date().getMonth() + 1,
				'd+': new Date().getDate(),
				'H+': new Date().getHours(),
				'm+': new Date().getMinutes(),
				's+': new Date().getSeconds(),
				'q+': Math.floor((new Date().getMonth() + 3) / 3),
				'S': new Date().getMilliseconds()
			}
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length))
			for (let k in o)
				if (new RegExp('(' + k + ')').test(fmt))
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
		msg(title = name, subt = '', desc = '', opts) {
			const toEnvOpts = (rawopts) => {
				if (!rawopts) return rawopts
				if (typeof rawopts === 'string') {
					if (this.isLoon()) return rawopts
					else if (this.isQuanX()) return {
						'open-url': rawopts
					}
					else if (this.isSurge()) return {
						url: rawopts
					}
					else return undefined
				} else if (typeof rawopts === 'object') {
					if (this.isLoon()) {
						let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
						let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
						return {
							openUrl,
							mediaUrl
						}
					} else if (this.isQuanX()) {
						let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
						let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
						return {
							'open-url': openUrl,
							'media-url': mediaUrl
						}
					} else if (this.isSurge()) {
						let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
						return {
							url: openUrl
						}
					}
				} else {
					return undefined
				}
			}
			if (!this.isMute) {
				if (this.isSurge() || this.isLoon()) {
					$notification.post(title, subt, desc, toEnvOpts(opts))
				} else if (this.isQuanX()) {
					$notify(title, subt, desc, toEnvOpts(opts))
				}
			}
			if (!this.isMuteLog) {
				let logs = ['', '==============📣系统通知📣==============']
				logs.push(title)
				subt ? logs.push(subt) : ''
				desc ? logs.push(desc) : ''
				console.log(logs.join('\n'))
				this.logs = this.logs.concat(logs)
			}
		}

		log(...logs) {
			if (logs.length > 0) {
				this.logs = [...this.logs, ...logs]
			}
			console.log(logs.join(this.logSeparator))
		}

		logErr(err, msg) {
			const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
			if (!isPrintSack) {
				this.log('', `❗️${this.name}, 错误!`, err)
			} else {
				this.log('', `❗️${this.name}, 错误!`, err.stack)
			}
		}

		wait(time) {
			return new Promise((resolve) => setTimeout(resolve, time))
		}

		done(val = {}) {
			const endTime = new Date().getTime()
			const costTime = (endTime - this.startTime) / 1000
			this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
			this.log()
			if (this.isSurge() || this.isQuanX() || this.isLoon()) {
				$done(val)
			}
		}
	})(name, opts)
}