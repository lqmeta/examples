# node-v16.14.0 镜像

## 构建镜像

```sh
npm run docker:build
```

## 启动镜像容器

```sh
docker run --name node-app-demo -p 9090:9090 -d node-v16.14.0:latest /usr/sbin/init
```


## 发布 Docker Hub

```sh
docker image tag node-v16.14.0:latest luqiangzeng/node-v16.14.0:1.0.0
docker image tag node-v16.14.0:latest luqiangzeng/node-v16.14.0:latest

docker push luqiangzeng/node-v16.14.0:1.0.0
docker push luqiangzeng/node-v16.14.0:latest
```


