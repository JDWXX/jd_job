"use strict";
/**
 * 京喜app->领88元红包
 * 先内部，后助力HW.ts
 * cron: 0 0,6,10 * * *
 * TODO
 * 拆
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var axios_1 = require("axios");
var cookie = '', res = '', UserName, index, UA = '';
var shareCodesInternal = [];
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, i, strUserPin, i, j;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 8];
                cookie = cookiesArr[i];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                index = i + 1;
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7" + index + "\u3011" + UserName + "\n");
                return [4 /*yield*/, api('GetUserInfo', 'activeId,channel,phoneid,publishFlag,stepreward_jstoken,timestamp,userDraw', { userDraw: 1 })];
            case 3:
                res = _a.sent();
                console.log(JSON.stringify(res));
                strUserPin = res.Data.strUserPin;
                console.log('助力码：', strUserPin);
                shareCodesInternal.push(strUserPin);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 4:
                _a.sent();
                return [4 /*yield*/, api('JoinActive', 'activeId,channel,phoneid,publishFlag,stepreward_jstoken,timestamp')];
            case 5:
                res = _a.sent();
                if (res.iRet === 0) {
                    console.log('JoinActive: 成功');
                }
                else {
                    console.log(JSON.stringify(res));
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 2];
            case 8:
                console.log('内部助力码：', shareCodesInternal);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 9:
                _a.sent();
                return [4 /*yield*/, getCodes()];
            case 10:
                res = _a.sent();
                if (res.length !== 0) {
                    console.log('追加HW.ts助力码');
                    shareCodesInternal = __spreadArray(__spreadArray([], shareCodesInternal, true), res, true);
                    console.log('助力排队：', shareCodesInternal);
                }
                i = 0;
                _a.label = 11;
            case 11:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 17];
                cookie = cookiesArr[i];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                j = 0;
                _a.label = 12;
            case 12:
                if (!(j < shareCodesInternal.length)) return [3 /*break*/, 16];
                console.log("\u8D26\u53F7" + (i + 1) + " " + UserName + " \u53BB\u52A9\u529B " + shareCodesInternal[j]);
                return [4 /*yield*/, api('EnrollFriend', 'activeId,channel,joinDate,phoneid,publishFlag,stepreward_jstoken,strPin,timestamp', { joinDate: '20211004', strPin: shareCodesInternal[j] })];
            case 13:
                res = _a.sent();
                if (res.iRet === 0) {
                    console.log('成功');
                }
                else if (res.iRet === 2015) {
                    console.log('上限');
                    return [3 /*break*/, 16];
                }
                else if (res.iRet === 2016) {
                    console.log('火爆');
                    return [3 /*break*/, 16];
                }
                else {
                    console.log('其他错误:', res);
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(5000)];
            case 14:
                _a.sent();
                _a.label = 15;
            case 15:
                j++;
                return [3 /*break*/, 12];
            case 16:
                i++;
                return [3 /*break*/, 11];
            case 17: return [2 /*return*/];
        }
    });
}); })();
function api(fn, stk, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var url, phoneid, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://m.jingxi.com/cubeactive/steprewardv3/" + fn + "?activeId=489177&publishFlag=1&channel=7&_stk=" + encodeURIComponent(stk) + "&_ste=1&_=" + Date.now() + "&sceneval=2";
                    // &g_login_type=1&callback=jsonpCBKB&g_ty=ls
                    UA = "jdpingou;iPhone;4.13.0;14.4.2;" + randomString(40) + ";network/wifi;model/iPhone10,2;appBuild/100609;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/" + (Math.random() * 98 + 1) + ";pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";
                    phoneid = UA.split(';') && UA.split(';')[4] || '';
                    url += "&phoneid=" + phoneid;
                    url += "&stepreward_jstoken=" + (Math.random().toString(36).slice(2, 10) +
                        Math.random().toString(36).slice(2, 10) +
                        Math.random().toString(36).slice(2, 10) +
                        Math.random().toString(36).slice(2, 10));
                    url = (0, TS_USER_AGENTS_1.h5st)(url, stk, params, 10010);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get(url, {
                        headers: {
                            'User-Agent': UA,
                            'Referer': 'https://st.jingxi.com/pingou/jxmc/index.html',
                            'Host': 'm.jingxi.com',
                            'Cookie': cookie
                        }
                    })];
                case 2:
                    data = (_a.sent()).data;
                    if (typeof data === 'string')
                        return [2 /*return*/, JSON.parse(data.replace(/jsonpCBK.?\(/, '').split('\n')[0])];
                    return [2 /*return*/, data];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, {}];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getCodes() {
    return __awaiter(this, void 0, void 0, function () {
        var data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get('https://api.jdsharecode.xyz/api/HW_CODES', { timeout: 5000 })];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data['88hb']];
                case 2:
                    e_2 = _a.sent();
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function randomString(e) {
    e = e || 32;
    var t = "0123456789abcdef", a = t.length, n = "";
    for (var i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n;
}