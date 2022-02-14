# ueditor-1.5.0 服务镜像
# - https://hub.docker.com/_/centos?tab=tags&page=1
FROM centos:centos7.9.2009

WORKDIR /opt/app

LABEL maintainer="luqiangzeng@gmail.com"

# 定义环境变量
ENV NGINX_PATH /usr/local/services/nginx

COPY ./packages/nginx-1.21.6 ${NGINX_PATH}

# 创建nginx用户
RUN useradd -M -s /sbin/nologin nginx

COPY ./scripts/pod-tools/ /opt/app/scripts/

ADD ./dist ./nginx


ENTRYPOINT ["/opt/app/scripts/run.sh"]
