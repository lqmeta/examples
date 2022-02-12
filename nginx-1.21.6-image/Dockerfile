# Nginx 服务镜像
# - https://hub.docker.com/_/centos?tab=tags&page=1
FROM centos:centos7.9.2009

WORKDIR /opt/app

LABEL maintainer="luqiangzeng@gmail.com"

# 定义环境变量
ENV NGINX_PACKAGE_PATH /usr/local/services/nginx-1.21.6

COPY ./packages/nginx-1.21.6 ${NGINX_PACKAGE_PATH}

COPY ./scripts/ /opt/app/scripts/

ADD ./dist/index.html ./nginx/index.html


RUN useradd -M -s /sbin/nologin nginx && \
  yum install -y gcc gcc-c++ openssl openssl-devel make libssl-dev libpcre3 libpcre3-dev pcre-devel && \
  cd ${NGINX_PACKAGE_PATH} && \
  ./configure --prefix=/usr/local/services/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module --with-http_gzip_static_module --with-ipv6 --with-http_sub_module && \
  make && make install


ENTRYPOINT ["/opt/app/scripts/run.sh"]
