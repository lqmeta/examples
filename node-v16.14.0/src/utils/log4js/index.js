// https://log4js-node.github.io/log4js-node/
const log4js = require('log4js');

log4js.configure({
  appenders: {
    cheese: {
      // 100 MB: 100 * 1024 * 1024
      maxLogSize: (100 * 1024 * 10240),
      backups: 5, // 滚动 5 个文件
      type: "file",
      filename: "./logs/cheese.log",
      keepFileExt: true,
    }
  },
  categories: {
    default: {
      appenders: ["cheese"],
      level: "info"
    }
  },
});

module.exports = {
  logger: log4js.getLogger("cheese"),
}
