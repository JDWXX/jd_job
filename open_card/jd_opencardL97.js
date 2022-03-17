/*
3.17~3.25 大牌联合 好物焕新季
新增开卡脚本
一次性脚本
————————————————
入口：[ 3.17~3.25 大牌联合 好物焕新季]
请求太频繁会被黑ip
过10分钟再执行

cron:30 1,12 17-25 3 *
============Quantumultx===============
[task_local]
#3.17~3.25 大牌联合 好物焕新季
30 1,12 17-25 3 * jd_opencardL97.js, tag=3.17~3.25 大牌联合 好物焕新季, enabled=true
*/

const $ = new Env('3.17~3.25 大牌联合 好物焕新季');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
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

allMessage = ""
message = ""
let errorJoinShop = '0'
$.hotFlag = false
$.outFlag = false
$.activityEnd = false
let lz_jdpin_token_cookie =''
let activityCookie =''
var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxdb7b5=["\x6E\x6F\x64\x65\x2D\x66\x65\x74\x63\x68","\x73\x75\x70\x65\x72\x61\x67\x65\x6E\x74","\x73\x75\x70\x65\x72\x61\x67\x65\x6E\x74\x2D\x70\x72\x6F\x78\x79","","\u643A\u8DA3\u4EE3\u7406\u7528\u6237\u540D","\u643A\u8DA3\u4EE3\u7406\u5BC6\u7801","\u4EE3\u7406\x49\x50","\u4EE3\u7406\u7AEF\u53E3","\x3A","\x69\x73\x4E\x6F\x64\x65","\x78\x69\x65\x71\x75","\x65\x6E\x76","\x46\x61\x6C\x73\x65","\x54\x72\x75\x65","\x70\x72\x6F\x78\x79\x55","\u672A\u8BFB\u53D6\u5230\u73AF\u5883\u53D8\u91CF\x20\x70\x72\x6F\x78\x79\x55\x2C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u7528\u6237\u540D\u3011\x70\x72\x6F\x78\x79\x55","\x6C\x6F\x67","\x20\u83B7\u53D6\u5230\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u7528\u6237\u540D\u3011\uFF1A\x20","\x70\x72\x6F\x78\x79\x50","\u672A\u8BFB\u53D6\u5230\u73AF\u5883\u53D8\u91CF\x20\x70\x72\x6F\x78\x79\x50\x2C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u5BC6\u7801\u3011\x70\x72\x6F\x78\x79\x50","\x20\u83B7\u53D6\u5230\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\u5BC6\u7801\u3011\uFF1A\x20","\x69\x70\x55\x72\x6C","\u672A\u8BFB\u53D6\u5230\u73AF\u5883\u53D8\u91CF\x20\x69\x70\x55\x72\x6C\x2C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\x49\x50\u63D0\u53D6\u5730\u5740\u3011\x69\x70\x55\x72\x6C\x20","\x20\u8BBF\u95EE\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x78\x69\x65\x71\x75\x2E\x63\x6E\x2F\x72\x65\x64\x69\x72\x65\x63\x74\x2E\x61\x73\x70\x78\x20\x20\x3E\x3E\x20\u5DF2\u8D2D\u4EA7\u54C1\x20\x3E\x3E\x20\x41\x50\x49\u63D0\u53D6\x20\x3E\x3E\x20\u9009\u62E9\u63D0\u53D6\u6570\u91CF\x3A\x20\x31\u3001\u9009\u62E9\x49\x50\u534F\u8BAE\uFF1A\x48\x54\x54\x50\x2F\x48\x54\x54\x50\x53\u3001\u9009\u62E9\u8FD4\u56DE\u683C\u5F0F\uFF1A\x4A\x53\x4F\x4E\u3001\u5176\u4ED6\u968F\u610F\x20\x3E\x3E\x20\u751F\u6210\u94FE\u63A5","\x20\u83B7\u53D6\u5230\u4F60\u7684\u643A\u8DA3\u4EE3\u7406\u3010\x49\x50\u63D0\u53D6\u5730\u5740\u3011\uFF1A\x20","\u643A\u8DA3\u4EE3\u7406\u6CE8\u518C\u5730\u5740\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x78\x69\x65\x71\x75\x2E\x63\x6E\x2F\x69\x6E\x64\x65\x78\x2E\x68\x74\x6D\x6C\x3F\x32\x66\x34\x66\x66\x36\x39\x30","\u5982\u9700\u5F00\u542F\u4EE3\u7406\uFF0C\u8BF7\u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6DFB\u52A0\x20\x78\x69\x65\x71\x75\x20\u503C\x20\x54\x72\x75\x65","\x31\x2E\x30\x2E\x30\x2E\x31","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6A\x64\x77\x78\x78\x2E\x67\x69\x74\x68\x75\x62\x2E\x69\x6F\x2F\x6A\x64\x5F\x6A\x6F\x62\x2F\x77\x73\x6B\x65\x79\x2E\x74\x78\x74","\u8BA4\u8BC1\u5931\u8D25","\u5F53\u524D\u7248\u672C\u53F7\uFF1A","\x69\x6E\x66\x6F","\u6700\u65B0\u7248\u672C\u53F7\uFF1A","\u8BF7\u52A0\u7FA4\uFF1A\x32\x31\x32\x37\x39\x36\x36\x36\x38\u3001\x36\x38\x31\x30\x33\x30\x30\x39\x37\x20\u5BFB\u627E\u6700\u65B0\u7248\u672C\u3010\u4EE3\u7801\u4EC5\u4F9B\u5B66\u4E60\uFF0C\u5207\u52FF\u4E71\u4F20\u4EE3\u7801\u3011","\x6C\x6F\x67\x45\x72\x72","\x67\x65\x74","\x63\x6F\x64\x65","\u643A\u8DA3\u4EE3\u7406\uFF1A","\x6D\x73\x67","\x64\x61\x74\x61","\x49\x50","\x50\x6F\x72\x74","\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\u5207\u6362\u4EE3\u7406\x2D\x2D\x2D\x2D\x2D\x2D\x2D","\x70\x72\x6F\x78\x79\x55\x72\x6C","\x68\x74\x74\x70\x3A\x2F\x2F","\x40","\x74\x68\x65\x6E","\x6A\x73\x6F\x6E","\x22\x20\x4E\x6F\x74\x20\x41\x3B\x42\x72\x61\x6E\x64\x22\x3B\x76\x3D\x22\x39\x39\x22\x2C\x20\x22\x43\x68\x72\x6F\x6D\x69\x75\x6D\x22\x3B\x76\x3D\x22\x39\x38\x22\x2C\x20\x22\x47\x6F\x6F\x67\x6C\x65\x20\x43\x68\x72\x6F\x6D\x65\x22\x3B\x76\x3D\x22\x39\x38\x22","\x3F\x30","\x22\x57\x69\x6E\x64\x6F\x77\x73\x22","\x31","\x73\x74\x72\x69\x63\x74\x2D\x6F\x72\x69\x67\x69\x6E\x2D\x77\x68\x65\x6E\x2D\x63\x72\x6F\x73\x73\x2D\x6F\x72\x69\x67\x69\x6E","\x47\x45\x54","\x77\x61\x69\x74","\x6A\x6F\x69\x6E\x56\x65\x6E\x64\x65\x72\x49\x64","\x73\x68\x6F\x70\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64","\x2C\x22\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x22\x3A","\x74\x65\x78\x74\x2F\x70\x6C\x61\x69\x6E\x3B\x20\x43\x68\x61\x72\x73\x65\x74\x3D\x55\x54\x46\x2D\x38","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D","\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D","\x2A\x2F\x2A","\x55\x41","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\u6D3B\u52A8\u592A\u706B\u7206\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5","\x41\x50\x49\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5","\x63\x61\x74\x63\x68","\x74\x6F\x4F\x62\x6A","\x6F\x62\x6A\x65\x63\x74","\x73\x75\x63\x63\x65\x73\x73","\x6D\x65\x73\x73\x61\x67\x65","\x72\x65\x73\x75\x6C\x74","\x67\x69\x66\x74\x49\x6E\x66\x6F","\x67\x69\x66\x74\x4C\x69\x73\x74","\u5165\u4F1A\u83B7\u5F97\x3A","\x64\x69\x73\x63\x6F\x75\x6E\x74\x53\x74\x72\x69\x6E\x67","\x70\x72\x69\x7A\x65\x4E\x61\x6D\x65","\x73\x65\x63\x6F\x6E\x64\x4C\x69\x6E\x65\x44\x65\x73\x63","\x74\x65\x78\x74","\x70\x72\x6F\x78\x79","\x73\x65\x74","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x6D\x2E\x6A\x64\x2E\x63\x6F\x6D\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x61\x63\x74\x69\x6F\x6E\x3F\x61\x70\x70\x69\x64\x3D\x6A\x64\x5F\x73\x68\x6F\x70\x5F\x6D\x65\x6D\x62\x65\x72\x26\x66\x75\x6E\x63\x74\x69\x6F\x6E\x49\x64\x3D\x62\x69\x6E\x64\x57\x69\x74\x68\x56\x65\x6E\x64\x65\x72\x26\x62\x6F\x64\x79\x3D\x7B\x22\x76\x65\x6E\x64\x65\x72\x49\x64\x22\x3A\x22","\x22\x2C\x22\x73\x68\x6F\x70\x49\x64\x22\x3A\x22","\x22\x2C\x22\x62\x69\x6E\x64\x42\x79\x56\x65\x72\x69\x66\x79\x43\x6F\x64\x65\x46\x6C\x61\x67\x22\x3A\x31\x2C\x22\x72\x65\x67\x69\x73\x74\x65\x72\x45\x78\x74\x65\x6E\x64\x22\x3A\x7B\x7D\x2C\x22\x77\x72\x69\x74\x65\x43\x68\x69\x6C\x64\x46\x6C\x61\x67\x22\x3A\x30","\x2C\x22\x63\x68\x61\x6E\x6E\x65\x6C\x22\x3A\x34\x30\x31\x7D\x26\x63\x6C\x69\x65\x6E\x74\x3D\x48\x35\x26\x63\x6C\x69\x65\x6E\x74\x56\x65\x72\x73\x69\x6F\x6E\x3D\x39\x2E\x32\x2E\x30\x26\x75\x75\x69\x64\x3D\x38\x38\x38\x38\x38","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];const fetch=require(__Oxdb7b5[0x0]);let requestSup=require(__Oxdb7b5[0x1]);require(__Oxdb7b5[0x2])(requestSup);let ipUrl=__Oxdb7b5[0x3];let proxyU=__Oxdb7b5[0x4];let proxyP=__Oxdb7b5[0x5];let proxyHost=__Oxdb7b5[0x6];let proxyPort=__Oxdb7b5[0x7];let proxyServer=proxyHost+ __Oxdb7b5[0x8]+ proxyPort;let xiequ=$[__Oxdb7b5[0x9]]()?(process[__Oxdb7b5[0xb]][__Oxdb7b5[0xa]]?process[__Oxdb7b5[0xb]][__Oxdb7b5[0xa]]:__Oxdb7b5[0xc]):__Oxdb7b5[0xc];if(xiequ== __Oxdb7b5[0xd]){proxyU= $[__Oxdb7b5[0x9]]()?(process[__Oxdb7b5[0xb]][__Oxdb7b5[0xe]]?process[__Oxdb7b5[0xb]][__Oxdb7b5[0xe]]:__Oxdb7b5[0x3]):__Oxdb7b5[0x3];if(proxyU== __Oxdb7b5[0x3]){console[__Oxdb7b5[0x10]](__Oxdb7b5[0xf]);return}else {console[__Oxdb7b5[0x10]](__Oxdb7b5[0x11]+ proxyU)};proxyP= $[__Oxdb7b5[0x9]]()?(process[__Oxdb7b5[0xb]][__Oxdb7b5[0x12]]?process[__Oxdb7b5[0xb]][__Oxdb7b5[0x12]]:__Oxdb7b5[0x3]):__Oxdb7b5[0x3];if(proxyP== __Oxdb7b5[0x3]){console[__Oxdb7b5[0x10]](__Oxdb7b5[0x13]);return}else {console[__Oxdb7b5[0x10]](__Oxdb7b5[0x14]+ proxyP)};ipUrl= $[__Oxdb7b5[0x9]]()?(process[__Oxdb7b5[0xb]][__Oxdb7b5[0x15]]?process[__Oxdb7b5[0xb]][__Oxdb7b5[0x15]]:__Oxdb7b5[0x3]):__Oxdb7b5[0x3];if(ipUrl== __Oxdb7b5[0x3]){console[__Oxdb7b5[0x10]](__Oxdb7b5[0x16]);console[__Oxdb7b5[0x10]](__Oxdb7b5[0x17]);return}else {console[__Oxdb7b5[0x10]](__Oxdb7b5[0x18]+ ipUrl)}}else {console[__Oxdb7b5[0x10]](__Oxdb7b5[0x19]);console[__Oxdb7b5[0x10]](__Oxdb7b5[0x1a])};let ver=__Oxdb7b5[0x1b];let github=true;function gettext(){return {url:`${__Oxdb7b5[0x1c]}`,timeout:3000}}async function getHub(){return  new Promise((_0x43daxe)=>{setTimeout(()=>{$[__Oxdb7b5[0x23]](gettext(),(_0x43daxf,_0x43dax10,_0x43dax11)=>{try{if(_0x43daxf){console[__Oxdb7b5[0x10]](__Oxdb7b5[0x1d])}else {if(_0x43dax11!= ver){console[__Oxdb7b5[0x1f]](__Oxdb7b5[0x1e]+ ver);console[__Oxdb7b5[0x1f]](__Oxdb7b5[0x20]+ _0x43dax11);console[__Oxdb7b5[0x1f]](__Oxdb7b5[0x21]);github= false}else {}}}catch(e){$[__Oxdb7b5[0x22]](e,_0x43dax10)}finally{_0x43daxe(_0x43dax11)}})})})}async function superagent(){ await getHub(); await fetch(ipUrl,{"\x68\x65\x61\x64\x65\x72\x73":{"\x73\x65\x63\x2D\x63\x68\x2D\x75\x61":__Oxdb7b5[0x30],"\x73\x65\x63\x2D\x63\x68\x2D\x75\x61\x2D\x6D\x6F\x62\x69\x6C\x65":__Oxdb7b5[0x31],"\x73\x65\x63\x2D\x63\x68\x2D\x75\x61\x2D\x70\x6C\x61\x74\x66\x6F\x72\x6D":__Oxdb7b5[0x32],"\x75\x70\x67\x72\x61\x64\x65\x2D\x69\x6E\x73\x65\x63\x75\x72\x65\x2D\x72\x65\x71\x75\x65\x73\x74\x73":__Oxdb7b5[0x33]},"\x72\x65\x66\x65\x72\x72\x65\x72\x50\x6F\x6C\x69\x63\x79":__Oxdb7b5[0x34],"\x62\x6F\x64\x79":null,"\x6D\x65\x74\x68\x6F\x64":__Oxdb7b5[0x35]})[__Oxdb7b5[0x2e]]((_0x43dax15)=>{return _0x43dax15[__Oxdb7b5[0x2f]]()})[__Oxdb7b5[0x2e]]((_0x43dax13)=>{if(_0x43dax13[__Oxdb7b5[0x24]]!= 0){console[__Oxdb7b5[0x10]](__Oxdb7b5[0x25]+ _0x43dax13[__Oxdb7b5[0x26]])}else {let _0x43dax14=_0x43dax13[__Oxdb7b5[0x27]];proxyHost= _0x43dax14[0x0][__Oxdb7b5[0x28]];proxyPort= _0x43dax14[0x0][__Oxdb7b5[0x29]];proxyServer= proxyHost+ __Oxdb7b5[0x8]+ proxyPort;console[__Oxdb7b5[0x10]](__Oxdb7b5[0x2a]);$[__Oxdb7b5[0x2b]]= __Oxdb7b5[0x2c]+ proxyU+ __Oxdb7b5[0x8]+ proxyP+ __Oxdb7b5[0x2d]+ proxyServer}}); await $[__Oxdb7b5[0x36]](200)}function joinShop(){if(!$[__Oxdb7b5[0x37]]){return};if(xiequ== __Oxdb7b5[0xd]){return  new Promise(async (_0x43daxe)=>{$[__Oxdb7b5[0x38]]= __Oxdb7b5[0x3]; await $[__Oxdb7b5[0x36]](1000); await getshopactivityId();let _0x43dax17=`${__Oxdb7b5[0x3]}`;if($[__Oxdb7b5[0x38]]){_0x43dax17= `${__Oxdb7b5[0x39]}${$[__Oxdb7b5[0x38]]}${__Oxdb7b5[0x3]}`};let _0x43dax18={'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65':__Oxdb7b5[0x3a],'\x4F\x72\x69\x67\x69\x6E':__Oxdb7b5[0x3b],'\x48\x6F\x73\x74':__Oxdb7b5[0x3c],'\x61\x63\x63\x65\x70\x74':__Oxdb7b5[0x3d],'\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74':$[__Oxdb7b5[0x3e]],'\x63\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65':__Oxdb7b5[0x3f],'\x43\x6F\x6F\x6B\x69\x65':cookie};try{requestSup[__Oxdb7b5[0x23]](`${__Oxdb7b5[0x51]}${$[__Oxdb7b5[0x37]]}${__Oxdb7b5[0x52]}${$[__Oxdb7b5[0x37]]}${__Oxdb7b5[0x53]}${_0x43dax17}${__Oxdb7b5[0x54]}`)[__Oxdb7b5[0x50]](_0x43dax18)[__Oxdb7b5[0x4f]]($[__Oxdb7b5[0x2b]])[__Oxdb7b5[0x2e]]((_0x43dax13)=>{return _0x43dax13[__Oxdb7b5[0x4e]]})[__Oxdb7b5[0x2e]]((_0x43dax11)=>{let _0x43dax15=$[__Oxdb7b5[0x43]](_0x43dax11,_0x43dax11);if( typeof _0x43dax15== __Oxdb7b5[0x44]){if(_0x43dax15[__Oxdb7b5[0x45]]=== true){errorJoinShop= _0x43dax15[__Oxdb7b5[0x46]];console[__Oxdb7b5[0x10]](errorJoinShop);if(_0x43dax15[__Oxdb7b5[0x47]]&& _0x43dax15[__Oxdb7b5[0x47]][__Oxdb7b5[0x48]]){for(let _0x43dax19 of _0x43dax15[__Oxdb7b5[0x47]][__Oxdb7b5[0x48]][__Oxdb7b5[0x49]]){console[__Oxdb7b5[0x10]](`${__Oxdb7b5[0x4a]}${_0x43dax19[__Oxdb7b5[0x4b]]}${__Oxdb7b5[0x3]}${_0x43dax19[__Oxdb7b5[0x4c]]}${__Oxdb7b5[0x3]}${_0x43dax19[__Oxdb7b5[0x4d]]}${__Oxdb7b5[0x3]}`)}};console[__Oxdb7b5[0x10]](errorJoinShop)}else {if( typeof _0x43dax15== __Oxdb7b5[0x44]&& _0x43dax15[__Oxdb7b5[0x46]]){errorJoinShop= _0x43dax15[__Oxdb7b5[0x46]];console[__Oxdb7b5[0x10]](`${__Oxdb7b5[0x3]}${_0x43dax15[__Oxdb7b5[0x46]]|| __Oxdb7b5[0x3]}${__Oxdb7b5[0x3]}`)}else {errorJoinShop= __Oxdb7b5[0x40];console[__Oxdb7b5[0x10]](_0x43dax11)}}}else {errorJoinShop= __Oxdb7b5[0x40];console[__Oxdb7b5[0x10]](_0x43dax11)}})[__Oxdb7b5[0x42]]((_0x43daxf)=>{errorJoinShop= __Oxdb7b5[0x40];console[__Oxdb7b5[0x10]](`${__Oxdb7b5[0x41]}`)})}catch(e){errorJoinShop= __Oxdb7b5[0x40];console[__Oxdb7b5[0x10]](`${__Oxdb7b5[0x41]}`)}finally{console[__Oxdb7b5[0x10]](errorJoinShop);_0x43daxe()}})}else {return  new Promise(async (_0x43daxe)=>{$[__Oxdb7b5[0x38]]= __Oxdb7b5[0x3]; await $[__Oxdb7b5[0x36]](1000); await getshopactivityId();let _0x43dax17=`${__Oxdb7b5[0x3]}`;if($[__Oxdb7b5[0x38]]){_0x43dax17= `${__Oxdb7b5[0x39]}${$[__Oxdb7b5[0x38]]}${__Oxdb7b5[0x3]}`};const _0x43dax1a={url:`${__Oxdb7b5[0x51]}${$[__Oxdb7b5[0x37]]}${__Oxdb7b5[0x52]}${$[__Oxdb7b5[0x37]]}${__Oxdb7b5[0x53]}${_0x43dax17}${__Oxdb7b5[0x54]}`,headers:{'\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65':__Oxdb7b5[0x3a],'\x4F\x72\x69\x67\x69\x6E':__Oxdb7b5[0x3b],'\x48\x6F\x73\x74':__Oxdb7b5[0x3c],'\x61\x63\x63\x65\x70\x74':__Oxdb7b5[0x3d],'\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74':$[__Oxdb7b5[0x3e]],'\x63\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65':__Oxdb7b5[0x3f],'\x43\x6F\x6F\x6B\x69\x65':cookie}};$[__Oxdb7b5[0x23]](_0x43dax1a,async (_0x43daxf,_0x43dax10,_0x43dax11)=>{try{let _0x43dax15=$[__Oxdb7b5[0x43]](_0x43dax11,_0x43dax11);if( typeof _0x43dax15== __Oxdb7b5[0x44]){if(_0x43dax15[__Oxdb7b5[0x45]]=== true){console[__Oxdb7b5[0x10]](_0x43dax15[__Oxdb7b5[0x46]]);errorJoinShop= _0x43dax15[__Oxdb7b5[0x46]];if(_0x43dax15[__Oxdb7b5[0x47]]&& _0x43dax15[__Oxdb7b5[0x47]][__Oxdb7b5[0x48]]){for(let _0x43dax19 of _0x43dax15[__Oxdb7b5[0x47]][__Oxdb7b5[0x48]][__Oxdb7b5[0x49]]){console[__Oxdb7b5[0x10]](`${__Oxdb7b5[0x4a]}${_0x43dax19[__Oxdb7b5[0x4b]]}${__Oxdb7b5[0x3]}${_0x43dax19[__Oxdb7b5[0x4c]]}${__Oxdb7b5[0x3]}${_0x43dax19[__Oxdb7b5[0x4d]]}${__Oxdb7b5[0x3]}`)}}}else {if( typeof _0x43dax15== __Oxdb7b5[0x44]&& _0x43dax15[__Oxdb7b5[0x46]]){errorJoinShop= _0x43dax15[__Oxdb7b5[0x46]];console[__Oxdb7b5[0x10]](`${__Oxdb7b5[0x3]}${_0x43dax15[__Oxdb7b5[0x46]]|| __Oxdb7b5[0x3]}${__Oxdb7b5[0x3]}`)}else {console[__Oxdb7b5[0x10]](_0x43dax11)}}}else {console[__Oxdb7b5[0x10]](_0x43dax11)}}catch(e){$[__Oxdb7b5[0x22]](e,_0x43dax10)}finally{_0x43daxe()}})})}}(function(_0x43dax1b,_0x43dax1c,_0x43dax1d,_0x43dax1e,_0x43dax1f,_0x43dax20){_0x43dax20= __Oxdb7b5[0x55];_0x43dax1e= function(_0x43dax21){if( typeof alert!== _0x43dax20){alert(_0x43dax21)};if( typeof console!== _0x43dax20){console[__Oxdb7b5[0x10]](_0x43dax21)}};_0x43dax1d= function(_0x43dax22,_0x43dax1b){return _0x43dax22+ _0x43dax1b};_0x43dax1f= _0x43dax1d(__Oxdb7b5[0x56],_0x43dax1d(_0x43dax1d(__Oxdb7b5[0x57],__Oxdb7b5[0x58]),__Oxdb7b5[0x59]));try{_0x43dax1b= __encode;if(!( typeof _0x43dax1b!== _0x43dax20&& _0x43dax1b=== _0x43dax1d(__Oxdb7b5[0x5a],__Oxdb7b5[0x5b]))){_0x43dax1e(_0x43dax1f)}}catch(e){_0x43dax1e(_0x43dax1f)}})({})
!(async () => {
    console.log('火爆或开卡失败请重新运行脚本！！！')
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    $.activityId = "dzlhkk068d4d0ab8a6609723002f50"
    $.shareUuid = "66115085bdc74be8b9f0ffaccc8edc30"
    console.log(`入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity?activityId=${$.activityId}&shareUuid=${$.shareUuid}`)
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
    if(allMessage){
        $.msg($.name, ``, `${allMessage}`);
        // if ($.isNode()) await notify.sendNotify(`${$.name}`, `${allMessage}`);
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


async function run() {
    try {
        $.joinShopStatus = true
        $.hasEnd = true
        $.endTime = 0
        lz_jdpin_token_cookie = ''
        $.Token = ''
        $.Pin = ''
        let flag = false
        await takePostRequest('isvObfuscator');
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
        console.log($.actorUuid)
        // return
        if(xiequ == "True")
            await superagent()
        if($.allOpenCard == false){
            console.log('开卡任务')
            for(o of $.openList){
                $.openCard = false
                if(o.status == 0){
                    flag = true
                    $.joinVenderId = o.venderId
                    await joinShop()
                    for (let i = 0; i < 5; i++) {
                        if(errorJoinShop.indexOf('活动太火爆') > -1){
                            console.log('第【' + i + '】次 重新开卡')
                            await $.wait(200)
                            if(xiequ == "True")
                                await superagent()
                            await joinShop()
                        }else{
                            continue
                        }
                    }
                    await $.wait(parseInt(Math.random() * 2000 + 4000, 10))
                    await takePostRequest('activityContent');
                    await takePostRequest('drawContent');
                    await takePostRequest('checkOpenCard');
                    await $.wait(parseInt(Math.random() * 3000 + 2000, 10))
                }
            }
        errorJoinShop = '0'
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
        $.log("加购: " + $.addCart)
        if(!$.addCart && !$.outFlag){
            flag = true
            await takePostRequest('addCart');
            await $.wait(parseInt(Math.random() * 2000 + 4000, 10))
        }
        if(flag){
            await takePostRequest('activityContent');
        }
        console.log(`${$.score}值`)
        $.runFalag = true
        let count = parseInt($.score/100)
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
        if($.index % 3 == 0) console.log('休息一下，别被黑ip了\n可持续发展')
        if($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 30000, 10))
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
            body = `body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9bedc1528ce297b982ce8bb0a8785ae48c18500e&client=apple&clientVersion=10.1.4&st=1646363852923&sv=111&sign=24a34053625f61226d89fd9402c42f6a`;
            break;
        case 'getSimpleActInfoVo':
            url = `${domain}/dz/common/getSimpleActInfoVo`;
            body = `activityId=${$.activityId}`;
            break;
        case 'getMyPing':
            url = `${domain}/customer/getMyPing`;
            body = `userId=${$.shopId || $.venderId || ''}&token=${$.Token}&fromType=APP`;
            break;
        case 'accessLogWithAD':
            url = `${domain}/common/accessLogWithAD`;
            let pageurl = `${domain}/drawCenter/activity?activityId=${$.activityId}&shareUuid=${$.shareUuid}`
            body = `venderId=${$.shopId || $.venderId || ''}&code=99&pin=${encodeURIComponent($.Pin)}&activityId=${$.activityId}&pageUrl=${encodeURIComponent(pageurl)}&subType=app&adSource=`
            break;
        case 'getUserInfo':
            url = `${domain}/wxActionCommon/getUserInfo`;
            body = `pin=${encodeURIComponent($.Pin)}`;
            break;
        case 'activityContent':
            url = `${domain}/dingzhi/linkgame/activity/content`;
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&pinImg=${encodeURIComponent($.attrTouXiang)}&nick=${encodeURIComponent($.nickname)}&cjyxPin=&cjhyPin=&shareUuid=${$.shareUuid}`
            break;
        case 'drawContent':
            url = `${domain}/dingzhi/taskact/common/drawContent`;
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}`
            break;
        case 'checkOpenCard':
            url = `${domain}/dingzhi/linkgame/checkOpenCard`;
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&shareUuid=${$.shareUuid}`
            break;
        case 'info':
            url = `${domain}/dingzhi/linkgame/task/opencard/info`;
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}`
            break;
        case 'startDraw':
            url = `${domain}/joint/order/draw`;
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}&drawType=1`
            break;
        case 'followShop':
            url = `${domain}/dingzhi/opencard/follow/shop`;
            // url = `${domain}/dingzhi/dz/openCard/saveTask`;
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}`
            break;
        case 'sign':
        case 'addCart':
        case 'browseGoods':
            url = `${domain}/dingzhi/opencard/${type}`;
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}`
            if(type == 'browseGoods') body += `&value=${$.visitSkuValue}`
            break;
        case '邀请':
        case '助力':
            if(type == '助力'){
                url = `${domain}/dingzhi/linkgame/assist`;
            }else{
                url = `${domain}/dingzhi/linkgame/assist/status`;
            }
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&shareUuid=${$.shareUuid}`
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
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}&taskType=${taskType}&taskValue=${taskValue}`
            break;
        case 'getDrawRecordHasCoupon':
            url = `${domain}/dingzhi/linkgame/draw/record`;
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}`
            break;
        case 'getShareRecord':
            url = `${domain}/dingzhi/linkgame/help/list`;
            body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}`
            break;
        case '抽奖':
            url = `${domain}/dingzhi/opencard/draw`;
            body = `activityId=${$.activityId}&actorUuid=${$.actorUuid}&pin=${encodeURIComponent($.Pin)}`
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
                            if(item.infoName == '20京豆' && item.drawStatus == 0){
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
                        $.log(`=========== 你邀请了:${res.data.shareList.length}个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n`)
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
        headers["Referer"] = `https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity?activityId=${$.activityId}&shareUuid=${$.shareUuid}`
        headers["Cookie"] = `${lz_jdpin_token_cookie && lz_jdpin_token_cookie || ''}${$.Pin && "AUTH_C_USER=" + $.Pin + ";" || ""}${activityCookie}`
    }
    // console.log(headers)
    // console.log(headers.Cookie)
    return  {url: url, method: method, headers: headers, body: body, timeout:30000};
}

function getCk() {
    return new Promise(resolve => {
        let get = {
            url:`https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity?activityId=${$.activityId}&shareUuid=${$.shareUuid}`,
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
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}