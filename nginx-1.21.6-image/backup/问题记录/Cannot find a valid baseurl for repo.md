
# 报错

```sh
➜  nginx-1.21.6-image git:(feature/nginx-1.21.6-image_1.29.8) ✗ docker build -t nginx-demo .
[+] Building 1.9s (10/11)                                                                                                 docker:default
 => [internal] load build definition from Dockerfile                                                                                0.0s
 => => transferring dockerfile: 948B                                                                                                0.0s
 => [internal] load metadata for docker.io/library/centos:centos7.9.2009                                                            0.7s
 => [internal] load .dockerignore                                                                                                   0.0s
 => => transferring context: 2B                                                                                                     0.0s
 => [1/7] FROM docker.io/library/centos:centos7.9.2009@sha256:be65f488b7764ad3638f236b7b515b3678369a5124c47b8d32916d6487418ea4      0.0s
 => [internal] load build context                                                                                                   0.1s
 => => transferring context: 7.87MB                                                                                                 0.1s
 => CACHED [2/7] WORKDIR /opt/app                                                                                                   0.0s
 => CACHED [3/7] COPY ./packages/nginx-1.29.8 /usr/local/services/nginx-1.29.8                                                      0.0s
 => CACHED [4/7] COPY ./scripts/ /opt/app/scripts/                                                                                  0.0s
 => CACHED [5/7] ADD ./dist/index.html ./nginx/index.html                                                                           0.0s
 => ERROR [6/7] RUN useradd -M -s /sbin/nologin nginx &&   yum install -y gcc gcc-c++ openssl openssl-devel make libssl-dev libpcr  1.1s
------                                                                                                                                   
 > [6/7] RUN useradd -M -s /sbin/nologin nginx &&   yum install -y gcc gcc-c++ openssl openssl-devel make libssl-dev libpcre3 libpcre3-dev pcre-devel &&   cd /usr/local/services/nginx-1.29.8 &&   ./configure --prefix=/usr/local/services/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module --with-http_gzip_static_module --with-ipv6 --with-http_sub_module &&   make && make install:
0.345 Loaded plugins: fastestmirror, ovl
0.471 Determining fastest mirrors
0.981 Could not retrieve mirrorlist http://mirrorlist.centos.org/?release=7&arch=x86_64&repo=os&infra=container error was
0.981 14: curl#6 - "Could not resolve host: mirrorlist.centos.org; Unknown error"
0.983 
0.983 
0.983  One of the configured repositories failed (Unknown),
0.983  and yum doesn't have enough cached data to continue. At this point the only
0.983  safe thing yum can do is fail. There are a few ways to work "fix" this:
0.983 
0.983      1. Contact the upstream for the repository and get them to fix the problem.
0.983 
0.983      2. Reconfigure the baseurl/etc. for the repository, to point to a working
0.983         upstream. This is most often useful if you are using a newer
0.983         distribution release than is supported by the repository (and the
0.983         packages for the previous distribution release still work).
0.983 
0.983      3. Run the command with the repository temporarily disabled
0.983             yum --disablerepo=<repoid> ...
0.983 
0.983      4. Disable the repository permanently, so yum won't use it by default. Yum
0.983         will then just ignore the repository until you permanently enable it
0.983         again or use --enablerepo for temporary usage:
0.983 
0.983             yum-config-manager --disable <repoid>
0.983         or
0.983             subscription-manager repos --disable=<repoid>
0.983 
0.983      5. Configure the failing repository to be skipped, if it is unavailable.
0.983         Note that yum will try to contact the repo. when it runs most commands,
0.983         so will have to try and fail each time (and thus. yum will be be much
0.983         slower). If it is a very temporary problem though, this is often a nice
0.983         compromise:
0.983 
0.983             yum-config-manager --save --setopt=<repoid>.skip_if_unavailable=true
0.983 
0.983 Cannot find a valid baseurl for repo: base/7/x86_64
------

 2 warnings found (use docker --debug to expand):
 - LegacyKeyValueFormat: "ENV key=value" should be used instead of legacy "ENV key value" format (line 10)
 - LegacyKeyValueFormat: "ENV key=value" should be used instead of legacy "ENV key value" format (line 11)
Dockerfile:19
--------------------
  18 |     
  19 | >>> RUN useradd -M -s /sbin/nologin nginx && \
  20 | >>>   yum install -y gcc gcc-c++ openssl openssl-devel make libssl-dev libpcre3 libpcre3-dev pcre-devel && \
  21 | >>>   cd ${NGINX_PACKAGE_PATH} && \
  22 | >>>   ./configure --prefix=/usr/local/services/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module --with-http_gzip_static_module --with-ipv6 --with-http_sub_module && \
  23 | >>>   make && make install
  24 |     
--------------------
ERROR: failed to build: failed to solve: process "/bin/sh -c useradd -M -s /sbin/nologin nginx &&   yum install -y gcc gcc-c++ openssl openssl-devel make libssl-dev libpcre3 libpcre3-dev pcre-devel &&   cd ${NGINX_PACKAGE_PATH} &&   ./configure --prefix=/usr/local/services/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module --with-http_gzip_static_module --with-ipv6 --with-http_sub_module &&   make && make install" did not complete successfully: exit code: 1
```

# 修复

``````md
镜像构建并验证成功。

## 修复总结

| 项 | 结果 |
|---|---|
| 镜像 | `nginx-demo:latest` (374 MB) |
| nginx 版本 | `nginx/1.29.8` |
| 编译器 | `gcc 4.8.5 (CentOS 7)` |
| OpenSSL | `1.0.2k-fips` |
| 编译耗时 | ~60s |
| 启用模块 | stub_status / ssl / v2 / gzip_static / ipv6 / sub |

## 报错根因（CentOS 7 容器构建里很常见的两连击）

| # | 现象 | 根因 |
|---|---|---|
| 1 | `Could not resolve host: mirrorlist.centos.org` | **CentOS 7 已于 2024-06-30 EOL**，官方镜像源已停止 DNS 解析。所有基于 `centos:centos7.x.x` 的容器，凡是默认 yum 源走 mirrorlist 都会断网。|
| 2 | `libssl-dev / libpcre3 / libpcre3-dev` | 这是 **Debian/Ubuntu 包名**，CentOS 7 仓库里根本没有；就算源能联通也会报 `No package available`。|

## 关键改动（`nginx-1.21.6-image/Dockerfile`）

```22:32:nginx-1.21.6-image/Dockerfile
RUN set -eux \
    && sed -i.bak \
        -e 's|^mirrorlist=|#mirrorlist=|g' \
        -e 's|^#\s*baseurl=http://mirror.centos.org/centos/\$releasever|baseurl=https://mirrors.aliyun.com/centos-vault/7.9.2009|g' \
        /etc/yum.repos.d/CentOS-Base.repo \
    && yum clean all \
    && yum makecache \
    && useradd -M -s /sbin/nologin nginx \
    && yum install -y gcc gcc-c++ make pcre-devel openssl-devel zlib-devel \
    && cd ${NGINX_PACKAGE_PATH} \
    && ./configure --prefix=${NGINX_PATH} \
```

具体 5 处修改：

1. **yum 源切到 vault 归档**：用 `sed` 把 `mirrorlist=` 注释掉，把注释中的 `baseurl=` 启用并指向 `https://mirrors.aliyun.com/centos-vault/7.9.2009`（阿里云镜像，国内访问稳定）。`\$releasever` 这层 `\` 转义是必需的——不然 docker 的 shell 会把它展开成空，导致 sed 模式匹配不上原文里的 `$releasever`。
2. **包列表清理**：删除 `libssl-dev libpcre3 libpcre3-dev`，补上 `zlib-devel`（nginx 必需，原列表漏了）。
3. **`--without-pcre2`**：nginx 1.27+ 默认探测 pcre2，但 CentOS 7 base 仓库没有 `pcre2-devel`。显式禁用避免有人改 yum 包列表时踩坑。
4. **`ENV key=value`** 格式：消掉之前 `ENV NGINX_PACKAGE_PATH /usr/...` 的 deprecation 警告。
5. **`make -j$(nproc)` + `yum clean all + rm -rf /var/cache/yum`**：编译并行加速，同时清理减小镜像体积。

## 注意事项

- **阿里云 vault 镜像依赖**：build 机器需要能访问 `mirrors.aliyun.com`。如果在境外或受限网络，可换成 `mirror.tuna.tsinghua.edu.cn/centos-vault/7.9.2009` 或官方 `vault.centos.org/7.9.2009`，sed 那行替换 URL 即可。
- **CentOS 7 的长期路径**：CentOS 7 永远不会再有更新了，长远建议迁到 `rockylinux:8` 或更轻量的 `nginx:alpine`/多阶段编译。当前的修复是"让现有 CentOS 7 路线能跑通"，不是长期方案。
- 修复仅动了 `Dockerfile`，`packages/nginx-1.29.8/`、`scripts/`、`nginxConfig/` 都没碰；`docker run` 之前的所有外部约定保持不变。
``````


