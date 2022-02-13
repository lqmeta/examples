const http = require('http');
const os = require('os');

const { logger } = require('./utils/log4js/index');
const PORT = 9090;

const handler = (request, response) => {
  const remoteAddressInfo = `Recei ved request from ${request.connection.remoteAddress}`;
  logger.info(remoteAddressInfo);

  response.writeHead(200);
  const resMsg = `You've hit ${os.hostname()}.\n`;
  logger.info(resMsg);
  response.end(resMsg);
}

var app = http.createServer(handler);
app.listen(PORT);

console.log(`
You can now view node-app in the browser.

  Local:            http://localhost:${PORT}
`);
