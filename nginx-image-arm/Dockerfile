# Nginx 服务镜像
# - https://hub.docker.com/_/centos?tab=tags&page=1
FROM centos:centos7.9.2009

WORKDIR /opt/app

LABEL maintainer="luqiangzeng@gmail.com"

# 定义环境变量
ENV NGINX_PACKAGE_PATH=/usr/local/services/nginx-1.29.8
ENV NGINX_PATH=/usr/local/services/nginx

COPY ./packages/nginx-1.29.8 ${NGINX_PACKAGE_PATH}

COPY ./scripts/ /opt/app/scripts/

ADD ./dist/index.html ./nginx/index.html

# CentOS 7 已于 2024-06-30 EOL，mirror.centos.org / mirrorlist.centos.org 已下线，
# 默认 yum 源全部失效。这里把源切到 CentOS Vault 归档（用阿里云镜像，国内速度稳定）。
# 同时移除 Debian 风格包名（libssl-dev / libpcre3 / libpcre3-dev），补上 nginx 编译
# 实际需要的 zlib-devel；--without-pcre2 强制使用 pcre 1.x，避免 nginx 1.29 探测不到
# CentOS 7 base 仓库里没有的 pcre2-devel。
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
        --with-http_stub_status_module \
        --with-http_ssl_module \
        --with-http_v2_module \
        --with-http_gzip_static_module \
        --with-ipv6 \
        --with-http_sub_module \
        --without-pcre2 \
    && make -j"$(nproc)" \
    && make install \
    && yum clean all \
    && rm -rf /var/cache/yum

COPY ./nginxConfig/nginx.conf ${NGINX_PATH}/conf/nginx.conf

ENTRYPOINT ["/opt/app/scripts/run.sh"]
