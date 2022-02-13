#!/bin/bash

# 启动 nginx 服务
/usr/local/services/nginx/sbin/nginx

# run the command given as arguments from CMD
exec "$@"
