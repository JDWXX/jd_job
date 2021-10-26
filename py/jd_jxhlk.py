# -*- coding: utf8 -*-
"""
cron: 10 1,10,14,20 * * *
new Env('jxhlk');
活动入口:https://st.jingxi.com/sns/202103/20/jxhlk/list.html
"""
import requests,os,json
def env(key):
    return os.environ.get(key)

# Cookie
cookies = []
if env("JD_COOKIE"):
    cookies.extend(env("JD_COOKIE").split('&'))
    
# launchid=os.environ['launchid']
# print ("环境变量:export launchi=\"\"")

print ("活动入口:https://st.jingxi.com/sns/202103/20/jxhlk/list.html")

headers={
    "Host":"m.jingxi.com",
    "Connection":"keep-alive",
    "Sec-Fetch-Mode":"no-cors",
    "User-Agent":"jdpingou;android;5.8.0;11;58f90d6af88fe89f;network/wifi;model/Mi 10;appBuild/19037;partner/xiaomi;;session/199;aid/58f90d6653589f;oaid/60446b553564e;pap/JA2019_3111789;brand/;eu/53836346635;35636fv/6563656853666;Mozilla/5.0 (Linux; Android 11; Mi 10 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.85 Mobile Safari/537.36",
    "Accept":"*/*",
    "X-Requested-With":"com.jd.pingou",
    "Sec-Fetch-Site":"same-site",
    "Referer":"https://st.jingxi.com/sns/202103/20/jxhlk/record.html?newwebview=1",
    "Accept-Encoding":"gzip, deflate, br",
    "Accept-Language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cookie":cookies[0]
    }

print("如需指定账号，请在环境变量中添加邀请码，参数名：jxkj ")
if "jxkj" in os.environ and len(os.environ["jxkj"]) > 1:
    launchid = os.environ["jxkj"]
    print("读取的配置文件中的邀请码为："+launchid)
else:
    res=requests.get("https://m.jingxi.com/kjactive/jxhlk/jxhlk_myonline?t=1634969716452&_=1634969716452&sceneval=2&g_login_type=1&callback=jsonpCBKA&g_ty=ls",headers=headers).text
    launchid=""
x = slice(10, -1)
res=requests.get("https://m.jingxi.com/kjactive/jxhlk/jxhlk_myonline?t=1634969716452&_=1634969716452&sceneval=2&g_login_type=1&callback=jsonpCBKA&g_ty=ls",headers=headers).text
data=json.loads(res[x])
if data["data"]["onling"] != []:
    print("你当前商品邀请码："+data["data"]["onling"][0]["launchid"])
else:
    print("账号1未选择商品！")
if launchid != "":
    for i in cookies:
        headers={
        "Host":"m.jingxi.com",
        "Connection":"keep-alive",
        "Sec-Fetch-Mode":"no-cors",
        "User-Agent":"jdpingou;android;5.8.0;11;58f90d6af88fe89f;network/wifi;model/Mi 10;appBuild/19037;partner/xiaomi;;session/186;aid/58f90d6af88fe14f;oaid/60446b582895464e;pap/JA2019_3111789;brand/;eu/5383669303466316;fv/6683836656839366;Mozilla/5.0 (Linux; Android 11; Mi 10 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.85 Mobile Safari/537.36",
        "Accept":"*/*",
        "X-Requested-With":"com.jd.pingou",
        "Sec-Fetch-Site":"same-site",
        "Referer":"https://st.jingxi.com/sns/202103/20/jxhlk/list.html?launchid="+launchid+"=139022.1.2&srv=jx_cxyw_https%3A%2F%2Fwq.jd.com%2Fcube%2Ffront%2FactivePublish%2Fjxhlkv2%2F486449.html_jing",
        "Accept-Encoding":"gzip, deflate, br",
        "Accept-Language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie":i
        }
        try:
            res=requests.get("https://m.jingxi.com/kjactive/jxhlk/jxhlk_queryhelp?launchid="+launchid+"&clicktype=0&nomoving=1&_stk=clicktype%2Claunchid%2Cnomoving&_ste=1&h5st=20211022212829803%3B0265027467319163%3B10029%3Btk01wc6341d3830nxrLb%2FUIVQp4wf3n7VRx5NUooArjZTUCs3pdnDbigVtSczYSc%2B3fu2%2BtrlWLO9CuLwzUOU6zStqPq%3Bfb2561fe9086095abb45032f148c54fbaa3cc308307e6f52716969b32bab452c&t=1634909309853&_=1634909309853&sceneval=2&g_login_type=1&callback=jsonpCBKC&g_ty=ls",headers=headers).text
            x = slice(10, -1)
            data=json.loads(res[x])
            msg=data["data"]["guestinfo"]["contenttips"]
            print(msg)
        except:
            print("错误")