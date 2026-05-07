- [升级 nginx 1.29.8 版本](#升级-nginx-1298-版本)
  - [问题](#问题)

# 升级 nginx 1.29.8 版本

1、下载 examples/nginx-image-arm/packages/nginx-1.29.8.tar.gz 包。

全局替换 `examples/nginx-image-arm` 目录下面的 `1.24.0` 为 `1.29.8`。

```sh
cd nginx-image-arm/packages
# 解压 xxx.tar.gz 包
tar -zxvf nginx-1.29.8.tar.gz
```




2、执行指令

```sh
cd ./nginx-image-arm

# 查看文档:
#   https://km.woa.com/articles/show/538799
#   https://km.woa.com/articles/show/538796
docker build -t nginx-demo .

docker images
docker ps -a

# 删除 nginx-demo 容器
docker rm -f nginx-demo
# 删除所有的容器
docker rm $(docker ps -aq)
# 删除所有的镜像
docker rmi $(docker images -q)

# 运行镜像
docker run --name nginx-demo -p 80:80 -d nginx-demo /usr/sbin/init
  # 进入容器镜像终端:
  docker exec -it nginx-demo /bin/sh
    curl localhost
    # 制作 nginx-1.29.8.tar.gz 免安装包
    cd /usr/local/services
    # 删除需要编译构建的安装包
    rm -rf nginx-1.29.8
    # 删除 nginx目录 的 temp 文件
    rm -rf nginx/client_body_temp nginx/fastcgi_temp nginx/proxy_temp nginx/scgi_temp nginx/uwsgi_temp

    # 拷贝构建好的nginx目录
    cp -TRf nginx nginx-1.29.8
    # 压缩免安装包
    tar -zcvf nginx-1.29.8.tar.gz ./nginx-1.29.8

# 【devcloud】将容器nginx-demo中的 nginx-1.29.8.tar.gz 包拷贝到主机目录中
docker cp nginx-demo:/usr/local/services/nginx-1.29.8.tar.gz /home/coder/nginx-demo

# 下载到本地 mac 电脑
rsync -a root@my_devcloud_root:/home/coder/nginx-demo/nginx-1.29.8.tar.gz ~/Downloads/tmp/
  # rm -rf ./client_body_temp ./fastcgi_temp ./proxy_temp ./scgi_temp ./uwsgi_temp
```


## 问题

CentOS 7 已经在 2024 年 6 月 30 日停止支持，官方的镜像源已经下线，所以容器镜像里的 yum 仓库配置全部失效了。

解决办法是把 yum 源切换到 CentOS Vault 存档仓库，这样就能继续获取 EOL 后的软件包。

--------

错误根因清楚：CentOS 7 已于 2024-06-30 EOL，官方源 mirrorlist.centos.org 已停止 DNS 解析，所以 yum 跑不动。同时 Dockerfile 里那串包名 libssl-dev libpcre3 libpcre3-dev 是 Debian/Ubuntu 命名习惯，CentOS 7 yum 里根本不存在，就算源能联通也会报"No package available"。

修复策略：

1、把 yum 源切到 CentOS Vault 归档（用阿里云镜像，国内访问稳定）
2、移除 Debian 风格包名，补上 nginx 编译实际需要的 zlib-devel
3、顺手修 ENV key value 的 deprecation warning，并用 make -j$(nproc) 加速、yum clean 减小镜像

