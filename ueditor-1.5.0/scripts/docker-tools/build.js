'use strict';
/**
 *  构建 Nginx 镜像
 *    npm run docker:build
 */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const APP_NAME = 'ueditor-1.5.0';
const execOpts = { stdio: 'inherit' };

const handleTnginxPackage = () => {
  const nginxConfigPath = resolveApp('./packages/nginx-1.21.6/conf/nginx.conf');

  // 解压 nginx-1.21.6.tar.gz
  if (!fs.existsSync(nginxConfigPath)) {
    execSync('mkdir -p packages', execOpts);
    execSync(`tar -zxvf ${resolveApp('./packages/nginx-1.21.6.tar.gz')} -C ${resolveApp('packages')}`, execOpts);
  }
  // 替换 nginx.conf 配置文件
  execSync(`cp -f ${resolveApp('./nginxConfig/nginx.conf')} ${nginxConfigPath}`);
}
handleTnginxPackage();

console.info('构建镜像:');
execSync(
  `docker build -t ${APP_NAME} .`,
  { stdio: 'inherit' },
);
