# ueditor-1.5.0 镜像

## 构建镜像

```sh
npm run docker:build
```

## 启动镜像容器

http://localhost:4901/_examples/index.html
http://localhost:4901/_examples/completeDemo.html

```sh
docker run --name ueditor-1.5.0 -p 9090:9090 -d ueditor-1.5.0:latest /usr/sbin/init
```


## 发布 Docker Hub

```sh
docker image tag ueditor-1.5.0:latest luqiangzeng/ueditor-1.5.0:1.0.0
docker image tag ueditor-1.5.0:latest luqiangzeng/ueditor-1.5.0:latest

docker push luqiangzeng/ueditor-1.5.0:1.0.0
docker push luqiangzeng/ueditor-1.5.0:latest
```




