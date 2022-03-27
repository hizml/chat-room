const socketIo = require('socket.io');  //引入双工通讯
const library = require('./library.js');

module.exports = function (httpServer) {
  const socketServer = socketIo(httpServer);   //socket服务器监听httpServer服务器
  socketServer.on('connect', function (socket) { //连接客户端
    console.log(socket.id + ' 客户端连接');
    setTimeout(function () {
      welcome(socket);//欢迎信息
      main(socket);   //菜单
    }, 1000);
    socket.on('message', function (news) { //问题库
      setTimeout(function () {
        issue(socket, news)
      }, 1000);
    });
    socket.on('disconnect', function () {
      console.log(socket.id + ' 客户端离开')
    });
  });
};

function welcome(socket) {   //欢迎信息
  const welcomeText = {
    types: 'welcome',
    connect: library.welcome
  };
  socket.send(welcomeText);
}

function main(socket) {      //菜单
  const mainText = {
    types: 'main',
    connect: library.main
  };
  socket.send(mainText);
}

function issue(socket, news) {      //问题库
  const newCon = news.connect;
  let a = 0;
  if (news.types === 'you') {
    const issueText = {
      'types': 'issue',
      connect: library.issue[newCon]
    };
    const errR = {
      'types': 'err',
      connect: library.errR.con
    };
    for (const key in library.issue) {
      if (newCon === key) {
        socket.send(issueText);
        a = 1;
      }
    }
    if (a === 0) {
      socket.send(errR);
    }
  }
}

