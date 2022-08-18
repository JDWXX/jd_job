import json
import random
import re
import threading
import time
import requests
import datetime

'''
版本 v11.0.5
======================app Cookie 配置===========================
必须用appck 如  pin=xxxxx;wskey=xxxxxxxxx;
'''
mycookies = [
    '',
]
'''
======================app Cookie 配置===========================
'''

'''
======================sign接口配置===========================
忒星平台登陆账号 不是用户昵称
'''
name = ""
'''
忒星平台个人中心获取的token
teixing.com 个人中心 赞助0天的那个 就可以获得token
'''
token = ''
'''
======================sign接口配置===========================
'''


'''
======================请求参数配置===========================
警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告
app版本 v11.0.4 安卓
以下参数必须完全从抓包中获取
如不匹配 会抱歉
一机一码一号
不能多号 容易抱歉
多号请用多个设备抓包 多开py
警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告 警告
'''
'''
在抓包的请求url中获取 如  oaid=12345& 那么就是12345
'''
oaid = ""
'''
在抓包的请求url中获取  如 ep=中的uuid数据  如"uuid":"xxxxxxxxxxxxxxxxxxxxxxxxxxx=="
'''
uuid = ""
'''
在抓包的请求url中获取  如 eid=xxxxxx
'''
eid = ""
'''
在抓包的请求头中获取  如 whwswswws=JD01214xxxxxx
或 在cookie中获取
或 在请求参数里的shshshfpb字段获取 都一样
'''
whwswswws = ""

'''
======================请求参数配置===========================
'''

'''
抢卷时间10 14 18 22 24
范围 1 - 24
24是0点场
'''
actionTimes = [10, 14, 18, 22, 24]

range_n = 10  # 链接个数
range_sleep = 0.2  # 间隔时间
delay_time = 0.5    #循环判断时间间隔



def get_sign_api(functionId, body, cookie):
    sign_api = 'http://a1f56we1f2sad2f15f.mumian.xyz/getsign'

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = {
        'name': name,
        'token': token,
        'functionId': functionId,
        'body': json.dumps(body),
        'cookie': cookie,
        "uuid": uuid,
        "whwswswws": whwswswws,
        "oaid": oaid,
        "eid": eid,
    }
    res = requests.post(url=sign_api, headers=headers, data=data, timeout=30).json()
    if res['code'] == 0:
        return res
    else:
        printf(res['msg'])
        return -1


def randomString(e, flag=False):
    t = "0123456789abcdef"
    if flag: t = t.upper()
    n = [random.choice(t) for _ in range(e)]
    return ''.join(n)


def getCcFeedInfo(cookie, index):
    body = {
        "categoryId": 118,
        "childActivityUrl": "openapp.jdmobile://virtual?params={\"category\":\"jump\",\"des\":\"couponCenter\"}",
        "eid": eid,
        "globalLat": "",
        "globalLng": "",
        "lat": "",
        "lng": "",
        "monitorRefer": "appClient",
        "monitorSource": "ccfeed_android_index_feed",
        "pageClickKey": "Coupons_GetCenter",
        "pageNum": 1,
        "pageSize": 20,
        "shshshfpb": whwswswws
    }
    res = get_sign_api('getCcFeedInfo', body, cookie)
    if res == -1:
        return -1
    else:
        url = res['url']
        headers = json.loads(json.dumps(res['headers']))
        data = json.loads(json.dumps(res['data']))
        res = requests.post(url=url, headers=headers, data=data, timeout=30).json()
        # print(res)
        if res['code'] == '0':
            for coupon in res['result']['couponList']:
                if coupon['title'] != None and '每周可领一次' in coupon['title']:
                    receiveKey = coupon['receiveKey']
                    printf(f'账号{index + 1}：获取receiveKey成功')
                    return receiveKey
            printf(f'账号{index + 1}：没有找到59-20券的receiveKey')
            return -1
        else:
            printf(f'账号{index + 1}：获取59-20券的receiveKey失败')
            return -1


def get_receiveNecklaceCoupon_sign(receiveKey, cookie):
    body = {"channel": "领券中心",
            "childActivityUrl": "openapp.jdmobile://virtual?params={\"category\":\"jump\",\"des\":\"couponCenter\"}",
            "couponSource": "manual",
            "couponSourceDetail": None,
            "eid": eid,
            "extend": receiveKey,
            "lat": "",
            "lng": "",
            "pageClickKey": "Coupons_GetCenter",
            "rcType": "4",
            "riskFlag": 1,
            "shshshfpb": whwswswws,
            "source": "couponCenter_app",
            "subChannel": "feeds流"
            }
    res = get_sign_api('receiveNecklaceCoupon', body, cookie)
    if res == -1:
        return -1
    else:
        url = res['url']
        headers = json.loads(json.dumps(res['headers']))
        data = json.loads(json.dumps(res['data']))
        return [url, data, headers]


def receiveNecklaceCoupon(url, body, headers, index):
    res = requests.post(url=url, headers=headers, data=body, timeout=30).json()
    try:
        if res['code'] == '0' and res['msg'] == '响应成功':
            printf(f"账号{index + 1}：{res['result']['desc']}")
        else:
            printf(res)
    except Exception as e:
        printf(str(e))
        pass


def getLoactionHource():
    hources = datetime.datetime.now().strftime('%H')
    if hources[0] == '0':
        return hources[1:len(hources)]
    return hources

def getLocationMinute():
    return datetime.datetime.now().strftime('%M')

def getLocationSecond():
    return datetime.datetime.now().strftime('%S')


def use_thread(cookie, index):
    if receiveKeys[index] != -1:
        printf(f'账号{index + 1}：正在生成{range_n * 2}条抢券链接')
        tasks = list()
        s = 0
        while s < range_n:
            res = get_receiveNecklaceCoupon_sign(receiveKeys[index], cookie)
            if res != -1:
                url = res[0]
                body = res[1]
                headers = res[2]

                tasks.append(threading.Thread(target=receiveNecklaceCoupon, args=(url, body, headers, index)))
                tasks.append(threading.Thread(target=receiveNecklaceCoupon, args=(url, body, headers, index)))
                s = s + 1
        printf(f'账号{index + 1}：{range_n * 2}条抢券链接生成完毕，等待抢券')
        while True:
            hources = getLoactionHource()
            minute = getLocationMinute()
            second = getLocationSecond()
            time.sleep(delay_time)
            printf(f'等待抢卷中...')
            isTask = False
            for startItem in actionTimes:
                if str(startItem - 1) == hources and minute == '59' and second == '58':
                    for task in tasks:
                        task.start()
                        time.sleep(range_sleep)
                    for task in tasks:
                        task.join()
                    isTask = True
                    break
            if isTask:
                break

def use_threadByZero(cookie, index):
    if receiveKeys[index] != -1:
        printf(f'账号{index + 1}：正在生成{range_n * 2}条抢券链接')
        tasks = list()
        s = 0
        while s < range_n:
            res = get_receiveNecklaceCoupon_sign(receiveKeys[index], cookie)
            if res != -1:
                url = res[0]
                body = res[1]
                headers = res[2]

                tasks.append(threading.Thread(target=receiveNecklaceCoupon, args=(url, body, headers, index)))
                tasks.append(threading.Thread(target=receiveNecklaceCoupon, args=(url, body, headers, index)))
                s = s + 1
        printf(f'账号{index + 1}：{range_n * 2}条抢券链接生成完毕，等待抢券')
        for task in tasks:
            task.start()
            time.sleep(range_sleep)
        for task in tasks:
            task.join()


def getSmailHources(hources):
    tmp = {}
    for item in actionTimes:
        if item <= int(hources):
            continue
        tmp[str(item)] = (item - int(hources))

    tmpKey = 999999
    for key in tmp.keys():
        if tmp[key] < tmpKey:
            tmpKey = tmp[key]

    for key in tmp.keys():
        if tmp[key] == tmpKey:
            return key


def printf(content):
    hources = getLoactionHource()
    minute = getLocationMinute()
    second = getLocationSecond()
    print(f'{hources}:{minute}:{second} {content}')

'''
23点之前打开 0点场使用之前获取的key
23点之后打开 时时获取key 抢卷
'''
if __name__ == '__main__':

    printf(f'59-20准备...')
    printf(f'正在获取59-20券key')

    if getLoactionHource() == '23':
        while True:
            isExec = False
            hources = getLoactionHource()
            minute = getLocationMinute()
            second = getLocationSecond()
            printf(f'等待{getSmailHources(hources)}点场次开始...')
            for startItem in actionTimes:
                if str(startItem - 1) == hources and minute == '59' and second == '58':

                    range_n = 1
                    receiveKeys = []
                    for i in range(len(mycookies)):
                        while True:
                            receiveKey = getCcFeedInfo(mycookies[i], i)
                            if receiveKey != -1:
                                receiveKeys.append(receiveKey)
                                break

                    threads = []
                    for i in range(len(mycookies)):
                        threads.append(
                            threading.Thread(target=use_threadByZero, args=(mycookies[i], i))
                        )
                    for t in threads:
                        t.start()
                    for t in threads:
                        t.join()
                    isExec = True
                    break
            if isExec:
                break
            time.sleep(delay_time)

    receiveKeys = []
    for i in range(len(mycookies)):
        while True:
            receiveKey = getCcFeedInfo(mycookies[i], i)
            if receiveKey != -1:
                receiveKeys.append(receiveKey)
                break

    for i in range(len(mycookies)):
        printf(f'开始测试{i+1}个账号...')
        res = get_receiveNecklaceCoupon_sign(receiveKeys[i], mycookies[i])
        if res != -1:
            url = res[0]
            body = res[1]
            headers = res[2]
            receiveNecklaceCoupon(url, body, headers, i)
        else:
            printf(f"测试失败，生成链接异常")

    if len(receiveKeys) != 0:
        while True:
            hources = getLoactionHource()
            minute = getLocationMinute()
            second = getLocationSecond()
            printf(f'等待{getSmailHources(hources)}点场次开始...')
            for startItem in actionTimes:
                if str(startItem - 1) == hources and minute == '59' and second == '50':
                    threads = []
                    for i in range(len(mycookies)):
                        threads.append(
                            threading.Thread(target=use_thread, args=(mycookies[i], i))
                        )
                    for t in threads:
                        t.start()
                    for t in threads:
                        t.join()
            time.sleep(delay_time)
    else:
        printf(f"没有获取任何key，请检查账号")
