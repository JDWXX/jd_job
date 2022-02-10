#!/usr/bin/env python3
# -*- coding: utf-8 -*
"""
建议cron: 40 0,1 * * *  python3 jd_xlzl.py
new Env('小年助力');
"""

cookies = ''

# 建议调整一下的参数
# UA 可自定义你的，注意格式
UserAgent = 'jdappiPhone10.0.413.7ca6eb91a888be488f194b9d9216cf711dd1b221anetwork/wifiADID/8679C062-A41A-4A25-88F1-50A7A3EEF34Amodel/iPhone8,1addressid/3723896896appBuild/167707jdSupportDarkMode/0Mozilla/5.0 (iPhone CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148supportJDSHWK/1'

import os, re
try:
    import requests
except Exception as e:
    print(e, "\n缺少requests 模块，请执行命令安装：python3 -m pip install requests")
    exit(3)
from urllib.parse import unquote
import json
import time

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


def start():
    print("### 小年助力 ###")
    global cookiesList, userNameList, pinNameList
    cookiesList, userNameList, pinNameList = getCk.iscookie()
    print("### 小年助力-获取助力码 ###")
    inviteCodes = []
    for ck in cookiesList:
        datas='functionId=pa_iw_v1&body={"showAssistorsSwitch":true}&client=wh5&clientVersion=1.0.0&appid=spring_h5'
        print(f"账号：{userNameList[cookiesList.index(ck)]}")
        url = 'https://api-x.m.jd.com/'
        header = {
            'Host': 'api-x.m.jd.com',
            'Connection': 'keep-alive',
            'Content-Length': '460',
            'Accept': 'application/json',
            'User-Agent': UserAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://h5static.m.jd.com',
            'X-Requested-With': 'com.jingdong.app.mall',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://h5static.m.jd.com/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': ck,
        }
        try:
            resp = requests.post(url=url, headers=header,data=datas, verify=False, timeout=30).json()
            print("助力码" + resp['data']['result']['inviteCode'])
            inviteCodes.append(resp['data']['result']['inviteCode'])
            # time.sleep(0.5)
        except Exception as e:
            print(e)
            continue
    a = 1
    print("### 小年助力开始助力 ###")
    for ck in cookiesList:
        inviteCode = str(inviteCodes[a])
        print(f"去助力>>>>>>：{inviteCode}")
        datas='h5st=20220125144048488%3B7663186115694256%3B47ab8%3Btk01wd9481cec41lMSszMHhkVlc2v91gXzZjNayGlpOUkp2chlDiR%2BFMVmBVoyiwPmEyFA0JaMkphW%2BD6fRrs2EOx4y6%3Bf649470c178e6e13c458d5631378bd1102590f513905207c6ef6dd40da731a34%3B3.1%3B1643092848488&functionId=pa_a_v1&body={"inviteCode":"'+inviteCode+'","uuid":"hQXrWCrmSsxxinfk","sv":"1609f615cd07ba0bdddeb6c388799ad7e31ed17b22f6c41ee312b9b7ea075643"}&client=wh5&clientVersion=1.0.0&appid=spring_h5&t=1643092848139'
        print(f"账号：{userNameList[cookiesList.index(ck)]}")
        url = 'https://api-x.m.jd.com/'
        header = {
            'Host': 'api-x.m.jd.com',
            'Connection': 'keep-alive',
            'Content-Length': '460',
            'Accept': 'application/json',
            'User-Agent': UserAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://h5static.m.jd.com',
            'X-Requested-With': 'com.jingdong.app.mall',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://h5static.m.jd.com/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': ck,
        }
        try:
            resp = requests.post(url=url, headers=header,data=datas, verify=False, timeout=30).json()
            # print(resp)
            print(resp['data']['bizMsg'])
            if str(resp['data']['bizMsg']) == str("好友人气太高 不需要助力啦~"):
                a = a + 1
                inviteCode = str(inviteCodes[a])
                print(f"去助力>>>>>>：{inviteCode}")
                datas='h5st=20220125144048488%3B7663186115694256%3B47ab8%3Btk01wd9481cec41lMSszMHhkVlc2v91gXzZjNayGlpOUkp2chlDiR%2BFMVmBVoyiwPmEyFA0JaMkphW%2BD6fRrs2EOx4y6%3Bf649470c178e6e13c458d5631378bd1102590f513905207c6ef6dd40da731a34%3B3.1%3B1643092848488&functionId=pa_a_v1&body={"inviteCode":"'+inviteCode+'","uuid":"hQXrWCrmSsxxinfk","sv":"1609f615cd07ba0bdddeb6c388799ad7e31ed17b22f6c41ee312b9b7ea075643"}&client=wh5&clientVersion=1.0.0&appid=spring_h5&t=1643092848139'
                print(f"账号：{userNameList[cookiesList.index(ck)]}")
                url = 'https://api-x.m.jd.com/'
                header = {
                    'Host': 'api-x.m.jd.com',
                    'Connection': 'keep-alive',
                    'Content-Length': '460',
                    'Accept': 'application/json',
                    'User-Agent': UserAgent,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Origin': 'https://h5static.m.jd.com',
                    'X-Requested-With': 'com.jingdong.app.mall',
                    'Sec-Fetch-Site': 'same-site',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Dest': 'empty',
                    'Referer': 'https://h5static.m.jd.com/',
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                    'cookie': ck,
                }
                try:
                    resp = requests.post(url=url, headers=header,data=datas, verify=False, timeout=30).json()
                    # print(resp)
                    print(resp['data']['bizMsg'])
                except Exception as e:
                    print(e)
                    continue
            time.sleep(0.5)
        except Exception as e:
            print(e)
            continue
    print("运行结束")


if __name__ == '__main__':
    start()
