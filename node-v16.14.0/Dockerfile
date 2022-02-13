# Nodejs 服务镜像
# - https://hub.docker.com/_/centos?tab=tags&page=1
FROM centos:centos7.9.2009

WORKDIR /opt/app

LABEL maintainer="luqiangzeng@gmail.com"

# 定义环境变量
ENV NODE_PATH /usr/local/services/node

COPY ./scripts/pod-tools/ /opt/app/scripts/

COPY ./packages/node-v16.14.0-linux-x64 ${NODE_PATH}

ADD ./src ./node

RUN ln -s ${NODE_PATH}/bin/node /usr/local/bin/node && \
  ln -s ${NODE_PATH}/bin/npm /usr/local/bin/npm


ENTRYPOINT ["/opt/app/scripts/run.sh"]
