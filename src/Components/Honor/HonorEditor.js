/*
* @Author: beyondouyuan
* @Date:   2017-08-23 12:02:49
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-23 18:48:54
*/

import React from 'react';

import formProvider from '../../utils/formProvider';

import FormItem from '../FormItem/FormItem';
import HomeLayout from '../Layouts/HomeLayout';

import AutoComplete from './AutoComplete';

class HonorEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PlayerOptions: []
        };
    }
    componentWillMount () {
        const {editTarget, setFormData} = this.props;
        if (editTarget) {
            setFormData(editTarget);
        }
    }
    getPlayerOptions(playerId) {
        fetch('http://localhost:3000/players?id_like' + playerId)
            .then((res) => res.json())
            .then((res) => {
                if (res.length === 1 && res[0].id === players) {
                    return;
                }
                this.setState({
                    PlayerOptions: res.map(item => {
                        return{
                            text: `${item.id} (${item.name})`,
                            value: item.id
                        }
                    })
                })
            })
    }
    timer = 0;
    handlePlayerOwnerIdChange(value) {
        this.props.handleChange('owner_id', value, 'number');
        this.setState({
            PlayerOptions: []
        });
        // 时间节流
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (value) {
            // setTimeout使用肩头函数自动绑定this指向当前组件对象
            this.timer = setTimeout(() => {
                this.getPlayerOptions(value);
                this.timer = 0;
            }, 800)
        }
    }
    fetchData(url) {
        // 通过解构获取数据
        const {form: { mvp, champion, salary, owner_id }, formValid, editTarget } = this.props;
        if (!formValid) {
            alert('请填写正确的信息后重试');
            return;
        }
        let editType = "添加";
        let apiUrl = url;
        let method = 'post';
        if (editTarget) {
            editType = "编辑";
            apiUrl += '/' + editTarget.id;
            method = 'put';
        }
        fetch(apiUrl, {
            method,
            // fetch方法提交的json需要使用JSON.stringify方法转换为字符串
            // 请求体
            body:JSON.stringify({
                mvp: mvp.value,
                champion: champion.value,
                salary: salary.value,
                owner_id: owner_id.value
            }),
            // 请求头
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // 回调函数
        .then((res) => res.json())
        .then((res) => {
            // 当添加成功，返回的sjon对象中应包含一个有效的id字段
            // 因而可以使用res.id来判断是否添加成功
            if(res.id) {
                alert(editType + '成功！');
                this.context.router.push('/honor/list');
            } else {
                alert(editType + '失败');
            }
        })
        // 捕捉错误
        .catch((err) => {
            console.error(err);
        });
    }
    // 表单提交处理程序
    handleSubmit(event) {
        event.preventDefault();
        this.fetchData('http://localhost:3000/honor');
    }
    render() {
        const { PlayerOptions } = this.state;
        // 结构出所需要的值
        const {form: { mvp, champion, salary, owner_id }, handleChange} = this.props;
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <FormItem label="MVP次数：" valid={mvp.valid} error={mvp.error}>
                    <input type="number" placeholder="请输入MVP次数..." value={mvp.value} onChange={(event) => handleChange('mvp', event.target.value, 'number')} />
                </FormItem>
                <FormItem label="冠军次数：" valid={champion.valid} error={champion.error}>
                    <input type="number" placeholder="请输入冠军此时..." value={champion.value} onChange={(event) => handleChange('champion', event.target.value, 'number')} />
                </FormItem>
                <FormItem label="球员薪水：" valid={salary.valid} error={salary.error}>
                    <input type="number" placeholder="请输入球员薪水..." value={salary.value}  onChange={(event) => handleChange('salary', event.target.value, 'number')} />
                </FormItem>
                <FormItem label="荣誉所属：" valid={owner_id.valid} error={owner_id.error}>
                    <AutoComplete
                        value={owner_id.value ? owner_id.value : 0}
                        options={PlayerOptions}
                        handleChange={value => this.handlePlayerOwnerIdChange(value)}
                    />
                </FormItem>
                <input type="submit" value="提交" />
            </form>
        );
    }
}


HonorEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

HonorEditor = formProvider({
    mvp: {
        defaultValue: 0,
        rules: [
            {
                pattern: function(value) {
                    return value >= 0 && value <= 20;
                },
                error: '请输入球员mvp个数'
            }
        ]
    },
    champion: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 0 && value <= 20;
                },
                error: '请输入总冠军次数'
            }
        ]
    },
    salary: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 2 && value <= 6000;
                },
                error: '请输入正确的数字'
            }
        ]
    },
    owner_id: {
        defaultValue: 0,
        rules: [
            {
                pattern: function(value) {
                    return value > 0
                },
                error: '请输入荣誉归属球员'
            }
        ]
    }
})(HonorEditor);


export default HonorEditor;
