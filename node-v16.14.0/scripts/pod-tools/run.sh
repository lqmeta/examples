#!/bin/bash

# 启动 nodejs 服务
cd /opt/app/node
npm i
nohup node /opt/app/node/app.js &


# run the command given as arguments from CMD
exec "$@"
