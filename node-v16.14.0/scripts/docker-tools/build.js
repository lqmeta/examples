'use strict';
/**
 *  构建 Nodejs 镜像
 *    npm run docker:build
 */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const APP_NAME = 'node-v16.14.0';
const execOpts = { stdio: 'inherit' };

const handleNodejsPackage = () => {
  const nodeBinPath = resolveApp('./packages/node-v16.14.0-linux-x64/bin/node');

  // 解压 node-v16.14.0-linux-x64.tar.xz
  if (!fs.existsSync(nodeBinPath)) {
    execSync('mkdir -p packages', execOpts);
    execSync(`tar -xvf ${resolveApp('./packages/node-v16.14.0-linux-x64.tar.xz')} -C ${resolveApp('packages')}`, execOpts);
  }
}
handleNodejsPackage();

console.info('构建镜像:');
execSync(
  `docker build -t ${APP_NAME} .`,
  { stdio: 'inherit' },
);
