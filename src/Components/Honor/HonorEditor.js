/*
* @Author: beyondouyuan
* @Date:   2017-08-25 21:06:55
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-27 00:14:37
*/



import React from 'react';
import { Input, InputNumber, Form, Button, message } from 'antd';
import AutoComplete from './AutoComplete';
import request, { get } from '../../utils/request';

const Option = AutoComplete.Option;
const FormItem = Form.Item;

const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};

class HonorEditor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      PlayerOptions: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this);
  }

  componentDidMount () {
    const {editTarget, form} = this.props;
    if (editTarget) {
      form.setFieldsValue(editTarget);
    }
  }

  handleSubmit (e) {
    e.preventDefault();

    const {form, editTarget} = this.props;

    form.validateFields((err, values) => {
      if (err) {
        message.warn(err);
        return;
      }

      let editType = '添加';
      let apiUrl = 'http://localhost:3000/honor';
      let method = 'post';
      if (editTarget) {
        editType = '编辑';
        apiUrl += '/' + editTarget.id;
        method = 'put';
      }

      request(method, apiUrl, values)
        .then((res) => {
          if (res.id) {
            message.success(editType + '书本成功');
            this.context.router.push('/honor/list');
          } else {
            message.error(editType + '失败');
          }
        })
        .catch((err) => console.error(err));
    });
  }

  getPlayerOptions (playerId) {
    get('http://localhost:3000/players?id_like=' + playerId)
      .then((res) => {
        if (res.length === 1 && res[0].id === playerId) {
          return;
        }

        this.setState({
          PlayerOptions: res.map((palyers) => {
            return {
              text: `${palyers.id}（${palyers.name}）`,
              value: palyers.id
            };
          })
        });
      });
  }

  timer = 0;

  handleOwnerIdChange (value) {
    this.setState({PlayerOptions: []});

    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (value) {
      this.timer = setTimeout(() => {
        this.getPlayerOptions(value);
        this.timer = 0;
      }, 200);
    }
  }

  render () {
    const {PlayerOptions} = this.state;
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form onSubmit={this.handleSubmit} style={{width: '600px', padding: '16px'}}>
        <FormItem label="MVP次数：" {...formLayout}>
          {getFieldDecorator('mvp', {
            rules: [
              {
                required: true,
                message: '请输入MVP次数'
              }
            ]
          })(<Input type="text"/>)}
        </FormItem>

        <FormItem label="冠军次数：" {...formLayout}>
          {getFieldDecorator('champion', {
            rules: [
              {
                required: true,
                message: '请输入冠军次数',
                type: 'number'
              },
              {
                min: 1,
                max: 99999,
                type: 'number',
                message: '请输入1~99999的数字'
              }
            ]
          })(<InputNumber style={{width: '100%'}}/>)}
        </FormItem>
        <FormItem label="薪水：" {...formLayout}>
          {getFieldDecorator('salary', {
            rules: [
              {
                required: true,
                message: '请输入价格',
                type: 'number'
              },
              {
                min: 1,
                max: 99999,
                type: 'number',
                message: '请输入1~99999的数字'
              }
            ]
          })(<InputNumber style={{width: '100%'}}/>)}
        </FormItem>
        <FormItem label="标签：" {...formLayout}>
          {getFieldDecorator('owner_id', {
            rules: [
              {
                required: true,
                message: '请输入所有者ID'
              },
              {
                pattern: /^\d*$/,
                message: '请输入正确的ID'
              }
            ]
          })(
            <AutoComplete
              options={PlayerOptions}
              onChange={this.handleOwnerIdChange}
            />
          )}
        </FormItem>
        <FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

HonorEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

HonorEditor = Form.create()(HonorEditor);

export default HonorEditor;
