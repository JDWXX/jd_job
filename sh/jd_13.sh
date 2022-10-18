#!/bin/bash
# new Env('京东13红包');
# 

eval "rm -rf ./jd13"
_ftype=""
get_arch=`arch`
echo $get_arch
if [[ $get_arch =~ "x86_64" ]];then
	_ftype="amd64"
elif [[ $get_arch =~ "x86" ]];then
	_ftype="386"
elif [[ $get_arch =~ "i386" ]];then
	_ftype="386"
elif [[ $get_arch =~ "aarch64" ]];then
	_ftype="arm64"
elif [[ $get_arch =~ "arm" ]];then
	_ftype="arm"
else
	_ftype=""
fi

download_jd13(){
echo "开始下载jd13二进制文件到$PWD/jd13目录"
curl -sS -o $PWD/jd13/jd13-$_ftype --create-dirs https://ghproxy.com/https://raw.githubusercontent.com/chendianwu0828/jd_pinjia/main/jd13/jd13-$_ftype
echo "下载完成，如需重新下载或更新请先删除该文件"
if [ -f "$PWD/jd13/jd13-$_ftype" ]; then
    echo "$PWD/jd13/jd13-$_ftype"
    eval "chmod +x ./jd13/jd13-$_ftype"
    eval "./jd13/jd13-$_ftype -t jd13"
fi
}

if [ $_ftype == "" ]; then
	echo "不支持的架构$get_arch"
else
	echo "执行$_ftype"
    if [ -f "$PWD/jd13/jd13-$_ftype" ]; then
        echo "$PWD/jd13/jd13-$_ftype"
        eval "chmod +x ./jd13/jd13-$_ftype"
        eval "./jd13/jd13-$_ftype -t jd13"
    elif [ -f "$PWD/jd13-$_ftype" ]; then
        echo "$PWD/jd13-$_ftype"
        eval "chmod +x $PWD/jd13-$_ftype"
        eval "$PWD/jd13-$_ftype -t jd13"
    else
        echo "在$PWD/jd13目录、$PWD目录下均未找到文件jd13-$_ftype，尝试拉取远程仓库文件jd13-$_ftype"
        download_jd13
    fi
fi

echo "代理变量名：proxy_url ,代理返回格式位：ip:端口  推荐星空代理"
