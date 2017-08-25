/*
* @Author: beyondouyuan
* @Date:   2017-08-23 21:53:02
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-25 13:30:12
*/


import { hashHistory } from 'react-router'


export default function request(method, url, body) {
    method = method.toUpperCase();

    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中
        body = undefined;
    } else {
        // 序列化请求体
        body = body && JSON.stringify(body);
        // 以上相当于
        // if (body) {
        //     json.stringify(body);
        // }
    }

    return fetch(url, {
        // 请求方法
        method,
        // 公共头部信息
        // fetch如ajax一样，若是post方法，发送htttp请求时，根据协议则需要设置请求头报文信息
        // 请求头内部需要设置access_token字段
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
        },
        // 请求体
        body
    })
        .then((res) => {
            if(res.status === 401) {
                // 路由跳转至登陆页面
                hashHistory.push('/login');
                // 标记为未认证
                // return Promise.reject('Unauthorized.');
            } else {
                // 获取头部的access_token字段
                const token = res.headers.get('access-token');
                if (token) {
                    // 设置token存储到sessionStorage中
                    sessionStorage.setItem('access_token', token);
                }
                return res.json();
            }
        })
}

// 配置不同请求方法的fetch
export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);


