# node-v16.14.0 镜像

## 构建镜像

```sh
npm run docker:build
```

## 启动镜像容器

```sh
docker run --name node-app-demo -p 9090:9090 -d node-v16.14.0:latest /usr/sbin/init
```



