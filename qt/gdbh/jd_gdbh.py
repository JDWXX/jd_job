#20211020    汤师爷
#每天0.7元 ，新注册的用户好像可以零撸实物，软件出来好几年了只要号不黑基本上不会跑路
#ios与安卓加密方式不同，小弟买不起苹果，ios玩家请用模拟器获取ck
#
##软件：果冻宝盒
# 下载链接：http://sd.bhrax.com/inviter/i4557E?userid=M7930K
# 邀请码：M7930K 感谢支持
# 感谢TOM大佬的sign算法支持，新人第一次写毛，水平有限，日志输出还没优化，有时间在去优化一下，脚本有不足的地方望大佬指导
# 青龙使用方法，小黄鸟抓包搜索关键字coins
# 配置方式：抓取接口参数中的 token、userid")
# 添加环境变量: export gdbhck = token,userid
# 多个账号:export gdbhck = token1,userid1&token2,userid2
#脚本地址https://raw.githubusercontent.com/wx13069/JD/master/gdbh.py
# #以上需要添加的变量都可以在header里面找到，添加完之后，添加任务每天运行一次就行

"""
const $ = new Env("果冻宝盒-非京东活动");
愤怒的锦鲤-开红包

cron:
15 5,21 * * * jd_gdbh.py
"""
import requests
import time
import os
import hashlib

def start(data):
    ##时间戳
    timestamp = int(time.time())
    a = timestamp
    a = str(a)
    ##获取sign
    sign = 'member_id='+userid+'&platform=android&timestamp='+a+'&faf78c39388faeaa49c305804bbc1119'
    sign = hashlib.md5(sign.encode(encoding='UTF-8')).hexdigest()

    #签到
    r = requests.get(url='https://proxy.guodongbaohe.com/coins/checkin?member_id='+userid+'&platform=android&timestamp='+a+'&signature='+sign+'&',headers=data)
    dic = r.json()
    print('【果冻宝盒】任务中心')
    if dic.get('status')==0:

        print('尊贵的叼毛用户恭喜签到成功，获得'+dic.get('result')+'金币', flush=True)
    else:

        print(dic.get('result'), flush=True)

    time.sleep(2)
    ##视频任务

    timestamp = int(time.time())##获取时间戳
    a = timestamp
    a = str(a)

    ##获取sign
    sign = 'member_id='+userid+'&platform=android&timestamp=' + a + '&faf78c39388faeaa49c305804bbc1119'
    sign = hashlib.md5(sign.encode(encoding='UTF-8')).hexdigest()

    r = requests.get(
        url='https://proxy.guodongbaohe.com/coins/award?member_id='+userid+'&platform=android&timestamp=' + a + '&signature=' + sign + '&',
        headers=data)
    dic = r.json()
    if dic.get('status')!=0:
        print(dic.get('result'))
    else:
        b = 1
        i = 1
        while i <= 6:
            timestamp = int(time.time())
            a = timestamp
            a = str(a)
            ##获取sign
            sign = 'member_id='+userid+'&platform=android&timestamp=' + a + '&faf78c39388faeaa49c305804bbc1119'
            sign = hashlib.md5(sign.encode(encoding='UTF-8')).hexdigest()
            print(sign)
            r = requests.get(url='https://proxy.guodongbaohe.com/coins/award?member_id='+userid+'&platform=android&timestamp='+a+'&signature='+sign+'&',headers=data)
            dic = r.json()
            print(dic)
            print('看视频成功获得'+dic.get('result')+'金币',flush=True)
            if dic.get('status')==0:
                print('执行第%d次广告任务' % b, flush=True)
                print('执行第%d次广告任务' % b, flush=True)
                print('每个视频30秒，等待93秒', flush=True)
                time.sleep(93)
                b = b+1
            i = i+1
        else:

            print(dic.get('result'))

    ##提现
    timestamp = int(time.time())
    a = timestamp
    a = str(a)
    sign = 'member_id='+userid+'&platform=android&timestamp=' + a + '&faf78c39388faeaa49c305804bbc1119'
    sign = hashlib.md5(sign.encode(encoding='UTF-8')).hexdigest()

    r = requests.get(url='https://proxy.guodongbaohe.com/coins/info?member_id='+userid+'&platform=android&timestamp='+a+'&signature='+sign+'&',headers=data)
    info = r.json()
    info = info.get('result')
    day = info.get('checkin')
    day = day.get('total_day')
    credits = info.get('credits')
    print('已连续签到第'+day+'天',flush=True)
    print('可提现'+credits+'金币')
    print('需手动进app提现一下')
    #timestamp = int(time.time())
    #a = timestamp
    #a = str(a)
    #sign = 'member_id='+userid+'&platform=android&timestamp=' + a + '&faf78c39388faeaa49c305804bbc1119'
    #sign = hashlib.md5(sign.encode(encoding='UTF-8')).hexdigest()
    #
    #r = requests.get(url='https://proxy.guodongbaohe.com/coins/exchange_info?credits='+credits+'&member_id='+userid+'&platform=android&timestamp='+a+'&signature='+sign+'&',headers=data)
    #a = int(a)+3
    #a = str(a)
    #sign = 'member_id='+userid+'&platform=android&timestamp=' + a + '&faf78c39388faeaa49c305804bbc1119'
    #sign = hashlib.md5(sign.encode(encoding='UTF-8')).hexdigest()
    #r = requests.get(url='https://proxy.guodongbaohe.com/coins/exchange?credits='+credits+'&member_id='+userid+'&platform=android&timestamp='+a+'&signature='+sign+'&',headers=data)
    #
    #r = r.json()
    #r1 = r.get('status')
    #if r==0:
    #    print(''+credits+'金币提现成功',flush=True)
    #else:
    #    print(r,flush=True)

    ##收益统计
    r = requests.get(url='https://proxy.guodongbaohe.com/income/mymoney?member_id='+userid+'&platform=android&timestamp='+a+'&signature='+sign+'&',headers=data)
    zc = r.json()

    mx = zc.get('result')
    print('累计收入',mx.get('month'), flush=True)
    print('今日预估收入',mx.get('today'), flush=True)
    print('本月预估收入',mx.get('total'), flush=True)

print("配置方式：抓取接口参数中的 token、userid")
print("添加环境变量\nexport gdbhck = token,userid\n多个账号\nexport gdbhck = token1,userid1&token2,userid2\n")
gdbhck = ''
gdbhcks = []
if "gdbhck" in os.environ and len(os.environ["gdbhck"]) > 1:
    gdbhck = os.environ["gdbhck"]
    print("===========读取到果冻宝盒配置 gdbhck 内容===========\n" + gdbhck)
    gdbhcks = gdbhck.split("&")
else:
    print("===========未读取到果冻宝盒配置 gdbhck 内容===========")
    gdbhcks = []

devid = '358618956688241'
UA = 'Mozilla/5.0 (Linux; Android 6.0.1; BLA-AL00 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Mobile Safari/537.36'
appid = '2102202714'

if __name__ == '__main__':
    for ck in gdbhcks:
        cks = ck.split(",")
        gdbhtoken = cks[0]
        userid = cks[1]
        data = {'Host':'proxy.guodongbaohe.com','x-userid':userid,'x-appid':appid,'x-devid':devid,'x-nettype':'WIFI','x-agent':'JellyBox/3.8.4 (Android, Redmi K20 Pro, 11)','x-platform':'android','x-devtype':'no','x-token':gdbhtoken,'accept-encoding':'gzip','user-agent':'okhttp/3.14.9'}
        print("===========开始运行脚本===========")
        start(data)
        