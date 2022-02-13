'use strict';
/**
 *  构建 hexo 个人博客网站镜像
 *    npm run docker:build
 */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const APP_NAME = 'hexo-blog';
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

const buildHexoDist = () => {
  const DIST_PATH = 'dist';
  // 清理 dist 目录内容
  execSync(`rm -rf ${resolveApp(DIST_PATH)}`, execOpts);

  // 构建编译
  let tmpShell = `cd ${resolveApp('src')} && npm install && npm run clean`;
  tmpShell += `&& npm run build`;
  execSync(`${tmpShell}`, execOpts);
}
buildHexoDist();

console.info('构建镜像:');
execSync(
  `docker build -t ${APP_NAME} .`,
  { stdio: 'inherit' },
);
