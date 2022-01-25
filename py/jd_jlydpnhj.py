#!/usr/bin/env python3
# -*- coding: utf-8 -*
"""
建议cron: 40 0,1 * * *  python3 jd_xlzl.py
new Env('金龙鱼大牌年货节');
"""
try:
    import requests
except Exception as e:
    print(e, "\n缺少requests 模块，请执行命令安装：python3 -m pip install requests")
    exit(3)
from urllib.parse import unquote
import json
import time
import os
import re
import sys

cookies = ''
# 建议调整一下的参数
# UA 可自定义你的，注意格式
UserAgent = 'jdappiPhone10.0.413.7ca6eb91a888be488f194b9d9216cf711dd1b221anetwork/wifiADID/8679C062-A41A-4A25-88F1-50A7A3EEF34Amodel/iPhone8,1addressid/3723896896appBuild/167707jdSupportDarkMode/0Mozilla/5.0 (iPhone CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148supportJDSHWK/1'


requests.packages.urllib3.disable_warnings()

ss = requests.session()

pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
t = time.time()


class getJDCookie(object):
    # 适配各种平台环境ck
    def getckfile(self):
        if os.path.exists(pwd + 'JDCookies.txt'):
            return pwd + 'JDCookies.txt'
        elif os.path.exists('/ql/config/env.sh'):
            print("当前环境青龙面板新版")
            return '/ql/config/env.sh'
        elif os.path.exists('/ql/config/cookie.sh'):
            print("当前环境青龙面板旧版")
            return '/ql/config/env.sh'
        elif os.path.exists('/jd/config/config.sh'):
            print("当前环境V4")
            return '/jd/config/config.sh'
        elif os.path.exists(pwd + 'JDCookies.txt'):
            return pwd + 'JDCookies.txt'
        return pwd + 'JDCookies.txt'

    # 获取cookie
    def getCookie(self):
        global cookies
        ckfile = self.getckfile()
        try:
            if os.path.exists(ckfile):
                with open(ckfile, "r", encoding="utf-8") as f:
                    cks = f.read()
                    f.close()
                if 'pt_key=' in cks and 'pt_pin=' in cks:
                    r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
                    cks = r.findall(cks)
                    if len(cks) > 0:
                        if 'JDCookies.txt' in ckfile:
                            print("当前获取使用 JDCookies.txt 的cookie")
                        cookies = ''
                        for i in cks:
                            cookies += i
                        return
            else:
                with open(pwd + 'JDCookies.txt', "w", encoding="utf-8") as f:
                    cks = "#多账号换行，以下示例：（通过正则获取此文件的ck，理论上可以自定义名字标记ck，也可以随意摆放ck）\n账号1【Curtinlv】cookie1;\n账号2【TopStyle】cookie2;"
                    f.write(cks)
                    f.close()
            if "JD_COOKIE" in os.environ:
                if len(os.environ["JD_COOKIE"]) > 10:
                    cookies = os.environ["JD_COOKIE"]
                    print("已获取并使用Env环境 Cookie")
        except Exception as e:
            print(f"【getCookie Error】{e}")

    # 检测cookie格式是否正确
    def getUserInfo(self, ck, pinName, userNum):
        url = 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion?orgFlag=JD_PinGou_New&callSource=mainorder&channel=4&isHomewhite=0&sceneval=2&sceneval=2&callback=GetJDUserInfoUnion'
        headers = {
            'Cookie': ck,
            'Accept': '*/*',
            'Connection': 'close',
            'Referer': 'https://home.m.jd.com/myJd/home.action',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'me-api.jd.com',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1',
            'Accept-Language': 'zh-cn'
        }
        try:
            resp = requests.get(url=url, verify=False, headers=headers, timeout=60).text
            r = re.compile(r'GetJDUserInfoUnion.*?\((.*?)\)')
            result = r.findall(resp)
            userInfo = json.loads(result[0])
            nickname = userInfo['data']['userInfo']['baseInfo']['nickname']
            return ck, nickname
        except Exception:
            context = f"账号{userNum}【{pinName}】Cookie 已失效！请重新获取。"
            print(context)
            return ck, False

    def iscookie(self):
        """
        :return: cookiesList,userNameList,pinNameList
        """
        cookiesList = []
        userNameList = []
        pinNameList = []
        if 'pt_key=' in cookies and 'pt_pin=' in cookies:
            r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
            result = r.findall(cookies)
            if len(result) >= 1:
                print("您已配置{}个账号".format(len(result)))
                u = 1
                for i in result:
                    r = re.compile(r"pt_pin=(.*?);")
                    pinName = r.findall(i)
                    pinName = unquote(pinName[0])
                    # 获取账号名
                    ck, nickname = self.getUserInfo(i, pinName, u)
                    if nickname != False:
                        cookiesList.append(ck)
                        userNameList.append(nickname)
                        pinNameList.append(pinName)
                    else:
                        u += 1
                        continue
                    u += 1
                if len(cookiesList) > 0 and len(userNameList) > 0:
                    return cookiesList, userNameList, pinNameList
                else:
                    print("没有可用Cookie，已退出")
                    exit(3)
            else:
                print("cookie 格式错误！...本次操作已退出")
                exit(4)
        else:
            print("cookie 格式错误！...本次操作已退出")
            exit(4)


getCk = getJDCookie()
getCk.getCookie()

assistStartId = ''
# 获取助力码
if "assistStartId" in os.environ:
    if len(os.environ["assistStartId"]) > 1:
        assistStartId = os.environ["assistStartId"]
        print("已获取并环境变量中 assistStartId :" + assistStartId)
if(assistStartId == ''):
    print("未获取到环境变量中助力码 assistStartId ,多个助力码 @ 合并")
    sys.exit(1)

def start():
    print("### 金龙鱼大牌年货节 ###")
    print("### 本脚本只能跑助力，且需要自己获取助力码,获取助力码的接口有点问题，有技术的可以自行改下 ###")
    global cookiesList, userNameList, pinNameList
    cookiesList, userNameList, pinNameList = getCk.iscookie()
    inviteCodes = assistStartId.split('@')
    # print("### 金龙鱼大牌年货节-获取助力码 ###")
    # for ck in cookiesList:
    #     print(f"账号：{userNameList[cookiesList.index(ck)]}")
    #     url = 'https://api.m.jd.com/client.action/api?appid=vipMiddle&functionId=bridge_taskList&body=%7B%22sceneId%22:%223%22%7D'
    #     header = {
    #         "accept": "application/json",
    #         "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    #         "cache-control": "no-cache",
    #         "pragma": "no-cache",
    #         "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"97\", \"Chromium\";v=\"97\"",
    #         "sec-ch-ua-mobile": "?0",
    #         "sec-ch-ua-platform": "\"Windows\"",
    #         "sec-fetch-dest": "empty",
    #         "sec-fetch-mode": "cors",
    #         "sec-fetch-site": "same-site",
    #         "cookie": ck,
    #         "Referer": "https://zcjb-increase.jd.com/",
    #         "Referrer-Policy": "strict-origin-when-cross-origin"
    #     }
    #     try:
    #         resp = requests.get(url=url, headers=header,data=None,timeout=300).json()
    #         zl = resp['data']['taskInfoList']
    #         print("助力码》》》》》" + zl)
    #         zl = json.dumps(zl[0], ensure_ascii=False).split('"encryptStartFissionId"')[1].split('"')[1]
    #         zl = str(zl).split('"encryptStartFissionId"')[1].split('"')[1]
    #         print("助力码》》》》》" + zl)
    #         inviteCodes.append(zl)
    #         time.sleep(0.5)
    #     except Exception as e:
    #         print(e)
    #         continue

    a = 0
    b = 0
    print("### 金龙鱼大牌年货节开始助力 ###")
    for ck in cookiesList:
        assistStartIdEncrypted = str(inviteCodes[a])
        print(f"去助力>>>>>>：{assistStartIdEncrypted}")
        print(f"账号：{userNameList[cookiesList.index(ck)]}")
        url = 'https://api.m.jd.com/client.action/api?appid=vipMiddle&functionId=bridge_fissionTaskAssist&body=%7B%22activityIdEncrypted%22:%228nksiPz4HrY%3D%22,%22assistStartIdEncrypted%22:%22' + assistStartIdEncrypted + '%22,%22assistedPinEncrypted%22:%22_vjNJYYU8Jg%3D%22,%22channel%22:%22TASK_PLATFORM_CHANNEL_68%22%7D'
        header = {
            "accept": "application/json",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"97\", \"Chromium\";v=\"97\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "cookie": ck,
            "Referer": "https://zcjb-increase.jd.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }
        try:
            resp = requests.get(url=url, headers=header,data="",verify=False, timeout=300)
            # print(resp)
            b = b + 1
            if b == 4:
                b = 0
                a = a + 1
            # print(resp['data']['bizMsg'])
            time.sleep(0.5)
        except Exception as e:
            print(e)
            continue
    print("运行结束")


if __name__ == '__main__':
    start()
