# Nginx 服务镜像
# - https://hub.docker.com/_/centos?tab=tags&page=1
FROM rockylinux:8

WORKDIR /opt/app

LABEL maintainer="luqiangzeng@gmail.com"

ENV NGINX_VERSION=1.29.8
ENV NGINX_PACKAGE_PATH=/usr/local/services/nginx-${NGINX_VERSION}
ENV NGINX_PATH=/usr/local/services/nginx

# 拷贝源码和脚本
COPY ./packages/nginx-${NGINX_VERSION} ${NGINX_PACKAGE_PATH}
COPY ./scripts/ /opt/app/scripts/
COPY ./dist/index.html /opt/app/nginx/index.html

# 安装依赖 + 创建 nginx 用户 + 编译 nginx
RUN dnf update -y && \
    dnf install -y \
        gcc \
        gcc-c++ \
        make \
        openssl \
        openssl-devel \
        pcre \
        pcre-devel \
        zlib \
        zlib-devel \
        tar \
        which && \
    useradd -r -s /sbin/nologin nginx && \
    cd ${NGINX_PACKAGE_PATH} && \
    ./configure \
        --prefix=${NGINX_PATH} \
        --user=nginx \
        --group=nginx \
        --with-http_stub_status_module \
        --with-http_ssl_module \
        --with-http_v2_module \
        --with-http_gzip_static_module \
        --with-http_sub_module && \
    make -j$(nproc) && \
    make install && \
    dnf clean all

# nginx 配置
COPY ./nginxConfig/nginx.conf ${NGINX_PATH}/conf/nginx.conf

# 赋予脚本执行权限
RUN chmod +x /opt/app/scripts/run.sh

EXPOSE 80 443

ENTRYPOINT ["/opt/app/scripts/run.sh"]
