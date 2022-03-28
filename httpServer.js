const http = require('http');
const express = require('express');
const app = express(); // 构建中间件
app.use(express.static('public')); // 将网页内容传入客户端

const httpServer = http.createServer(app); // 创建服务器并运行于端口号
httpServer.listen(9000, function () {
  console.log('运行于9000端口')
});
require('./socketServer.js')(httpServer); // .js后缀可写可不写
