
# 升级 nginx 1.29.8 版本

1、下载 examples/nginx-1.21.6-image/packages/nginx-1.29.8.tar.gz 包。

全局替换 `examples/nginx-1.21.6-image` 目录下面的 `1.24.0` 为 `1.29.8`。

```sh
cd nginx-1.21.6-image/packages
tar -zxvf nginx-1.29.8.tar.gz
```




2、执行指令

```sh
cd ./nginx-1.21.6-image

docker build -t nginx-demo .
```


