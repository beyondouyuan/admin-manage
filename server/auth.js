/*
 * @Author: beyondouyuan
 * @Date:   2017-08-23 21:13:46
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2017-08-25 12:43:25
 */


// 到期时间
const expireTime = 1000 * 60;

module.exports = function(req, res, next) {
    // 登陆成功后的返回头中增加服务器已加密的token信息，以便在后续需要身份验证的接口请求中在请求头戴上这个token，发送到服务器进行判断请求是否合法
    res.header('Access-Control-Expose-Headers', 'access-token');

    // 当前时间
    const now = Date.now();
    // 默认为不合法你，即未认证
    let unAuthorized = true;

    // 获取请求头的信息，判断是否有access-token即请求是否合法
    const token = req.header('access-token');
    // 若请求头存在token，则为合法请求
    if (token) {
        // 是否有效期内
        const expired = now - token > expireTime;
        // 超时
        if (!expired) {
            unAuthorized = false;
            // 重新设置token有效时间起始点为当前时间点
            res.header('access-token', now);
        }
    }

    if (unAuthorized) {
        // 客户端请求出错
        res.sendStatus(401);
    } else {
        // 继续执行
        next();
    }
}
