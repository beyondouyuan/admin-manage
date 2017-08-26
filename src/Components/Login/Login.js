/*
* @Author: beyondouyuan
* @Date:   2017-08-23 22:09:25
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-25 16:56:14
*/

import React from 'react';
import { Icon, Form, Input, Button, message } from 'antd';

import { post } from '../../utils/request';

import style from './login.less'

const FormItem = Form.Item;

class Login extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                post('http://localhost:3000/login', values)
                    .then((res) => {
                        if(res) {
                            message.success('登陆成功')
                            this.context.router.push('/');
                        } else {
                            message.error('登陆失败，账号或者密码错误')
                        }
                    })
            }
        })
    }
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return(
            <div className={style.container}>
                <div className={style.login}>
                    <header className={style.header}>
                        球员管理系统
                    </header>
                    <section className={style.section}>
                        <form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('account', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入账号',
                                            type: 'string'
                                        }
                                    ]
                                })(
                                    <Input type="text" addonBefore={<Icon type="user"/>} />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码',
                                            type: 'string'
                                        }
                                    ]
                                })(
                                    <Input type="password" addonBefore={<Icon type="lock"/>} />
                                )}
                            </FormItem>
                            <div>
                                <Button className={style.btn} htmlType="submit" type="primary">登陆</Button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Login = Form.create()(Login);

export default Login;













