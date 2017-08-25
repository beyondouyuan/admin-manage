/*
* @Author: beyondouyuan
* @Date:   2017-08-23 22:09:25
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-23 23:56:36
*/

import React from 'react';

import formProvider from '../../utils/formProvider';

import FormItem from '../FormItem/FormItem';
import HomeLayout from '../Layouts/HomeLayout';

import { post } from '../../utils/request';

class Login extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const { formValid, form: {account, password} } = this.props;
        if (!formValid) {
            alert('请输入账号或密码');
            return;
        }
        post('http://localhost:3000/login', {
            account: account.value,
            password: password.value
        })
            .then((res) => {
                if(res) {
                    alert('登陆成功')
                    this.context.router.push('/');
                } else {
                    alert('登陆失败，账号或者密码错误')
                }
            })
    }
    render() {
        const { form: { account, password }, handleChange } = this.props;

        return(
            <HomeLayout title="登陆">
                <form onSubmit={this.handleSubmit}>
                    <FormItem label="用户名：" valid={account.valid} error={account.error}>
                        <input type="text" value={account.value} onChange={event => handleChange('account', event.target.value)} />
                    </FormItem>
                    <FormItem label="密码：" valid={password.valid} error={password.error}>
                        <input type="text" value={password.value} onChange={event => handleChange('password', event.target.value)} />
                    </FormItem>
                    <div>
                        <input type="submit" value="提交" />
                    </div>
                </form>
            </HomeLayout>
        )
    }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};


Login = formProvider({
    account: {
        defaultValue: '',
        rules: [
            {
                pattern(value) {
                    return value.length > 0;
                },
                error: '请输入账号'
            }
        ]
    },
    password: {
        defaultValue: '',
        rules: [
            {
                pattern(value) {
                    return value.length > 0;
                },
                error: '请输入密码'
            }
        ]
    }
})(Login);

export default Login;













