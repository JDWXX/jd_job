# 安装青龙扫描
原来安装过青龙面板，后期由于强哥更新导致扫码失效

本文只给以前安装过青龙面板的人看，没安装的人自己找路径，由于涉及别人利润，那二篇文章我删了

## 开放5701端口（要开放二个地方）
阿里云开放5701端口
服务器开放5701端口

## 以前安装过的,或失效的
先在root目录下删除 public、JDC_arm64.zip、JDC_arm64、JDC 等文件,停止5701服务

## 停止5701服务
#### 查询到5701对应的PID
```
lsof -i:5701
```
#### 通过上面查询到的PID 例如 PID为 26540
```
kill -9 26540
```

## 开始安装
#### 服务器输入指令
```
yum install wget unzip -y
```
### 进入root目录

#### 服务器输入指令
```
cd ..
```

```
cd root/
```

服务器输入指令 
```
wget https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4a406456-63ac-413b-b1f6-27a6eed5945e/0b305d9d-1aae-478e-be74-d3a7fa9be80b.zip && unzip 0b305d9d-1aae-478e-be74-d3a7fa9be80b.zip
```

服务器输入指令
```
chmod 777 JDC
```

服务器输入指令
```
./JDC
```

服务器输入指令
```
nohup ./JDC &
```

键盘按 Ctrl 键+ C 键 (要一起按下)，回到输入

服务器输入指令

```
cd public
```

服务器输入指令

```
wget https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4a406456-63ac-413b-b1f6-27a6eed5945e/5ecc7bc2-b49c-4504-b822-20a89750c044.zip && unzip 5ecc7bc2-b49c-4504-b822-20a89750c044.zip
```

IP + 5701  即可直接访问,扫码登录京东账号