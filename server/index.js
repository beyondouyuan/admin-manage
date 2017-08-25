/*
* @Author: beyondouyuan
* @Date:   2017-08-23 21:35:55
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-23 22:56:40
*/

const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// 注册json-server的api

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/login', function(req, res, next) {
    res.header('Access-Control-Expose-Headers', 'access-token');
    const { account, password } = req.body;
    if (account === 'admin' && password === '123456') {
        res.header('access-token', Date.now());
        res.json(true);
    } else {
        res.json(false);
    }
});

// 验证
server.use(require('./auth'));
server.use(router);

server.listen(3000, function() {
    console.log('服务器启动成功！浏览器访问http://localhost:3000/')
})

















