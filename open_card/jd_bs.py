#/*
# 小米运动更新步数
#[task_local]
# 小米运动更新步数
#0 15 15 * *
#*/

import requests

import random

number2 = random.randint(50001,65000)

# '小米运行账号':'密码'
dict = [{'':''},{'':''}]
import os, re, sys
print("===========/QL/config/bs.text 里设置需要执行的小米运动的账号===========")
print("===========格式：[{'账号1':'密码1'},{'账号2':'密码2'}]===========")
if os.path.exists("/ql/config/bs.text"):
    with open("/ql/config/pin.text", "r", encoding="utf-8") as f:
        pins = f.read()
        f.close()
        print("===========读取到的配置文件里的内容===========" + pins)
        print("===========助力人===========")
        cash_zlzh = pins.split("&")
        print(cash_zlzh)

header={

    'User_Agent':'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; Tablet PC 2.0; .NET4.0E)',

}

for key in dict:

    number,password = (key,dict[key])

    lj = f"http://42.193.130.93:8080/mi?phoneNumber={number}&password={password}&steps={number2}"

    r = requests.get(url = lj,headers=header)

    r.encoding = r.apparent_encoding

    t = r.text.encode('gbk', 'ignore').decode('gbk')

    print(t)

    print("您今日运动步数结果为{}".format(number2))
