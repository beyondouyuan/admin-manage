/*
* @Author: Irving
* @Date:   2017-08-13 21:13:24
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-27 00:13:09
*/


import React from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';
import request, { get } from '../../utils/request';

const FormItem = Form.Item;

const FormLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    }
};

class PlayerEditor extends React.Component {

    componentDidMount() {
        const { editTarget, form } = this.props;
        if (editTarget) {
            form.setFieldsValue(editTarget);
        }
    }

    // 表单提交处理程序
    handleSubmit(event) {
        event.preventDefault();
        const { form, editTarget } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                let editType = "添加";
                let apiUrl = 'http://localhost:3000/players';
                let method = 'post';
                if (editTarget) {
                    editType = "编辑";
                    apiUrl += '/' + editTarget.id;
                    method = 'put';
                }
                request(method, apiUrl, values)
                    .then((res) => {
                        if(res.id) {
                            message.success(editType + '球员成功！');
                            this.context.router.push('/player/list');
                        } else {
                            message.error(editType + '失败');
                        }
                    })
                    .catch((err) => {
                        message.error(err);
                    });
            } else {
                message.warn(err);
            }
        });
    }
    render() {
        // 结构出所需要的值
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div style={{width: '600px', padding: '16px'}}>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormItem label="球员名字：" {...FormLayout}>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入球员名字'
                                },
                                {
                                    pattern: /^.{1,32}$/,
                                    message: '名字最多32位'
                                }
                            ]
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem label="球员年龄：" {...FormLayout}>
                        {getFieldDecorator('age', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入球员年龄',
                                    type: 'number'
                                },
                                {
                                    min: 19,
                                    max: 50,
                                    message: '请输入合法年龄',
                                    type: 'number'
                                }
                            ]
                        })(
                            <InputNumber style={{width: '100%'}} />
                        )}
                    </FormItem>
                    <FormItem label="效力球队：" {...FormLayout}>
                        {getFieldDecorator('team', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入效力青队'
                                },
                                {
                                    pattern: /^.{1,32}$/,
                                    message: '名字最多32位'
                                }
                            ]
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem label="球员身高：" {...FormLayout}>
                        {getFieldDecorator('size', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入球员年龄',
                                    type: 'number'
                                },
                                {
                                    min: 150,
                                    max: 300,
                                    message: '请输入合法身高',
                                    type: 'number'
                                }
                            ]
                        })(
                            <InputNumber style={{width: '100%'}} />
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{...FormLayout.wrapperCol, offset: FormLayout.labelCol.span}}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

// 必须给PlayerAdd义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
PlayerEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

PlayerEditor = Form.create()(PlayerEditor)

export default PlayerEditor;




























