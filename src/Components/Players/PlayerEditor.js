/*
* @Author: Irving
* @Date:   2017-08-13 21:13:24
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-24 00:09:59
*/


import React from 'react';

import formProvider from '../../utils/formProvider';
import request, { get } from '../../utils/request';
import FormItem from '../FormItem/FormItem';
import HomeLayout from '../Layouts/HomeLayout';

class PlayerEditor extends React.Component {

	componentWillMount () {
    	const {editTarget, setFormData} = this.props;
    	if (editTarget) {
      		setFormData(editTarget);
    	}
  	}

	fetchData(url) {
		// 通过解构获取数据
		const {form: { name, age, team, size }, formValid, editTarget } = this.props;
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
		request(method, apiUrl, {
			name: name.value,
			age: age.value,
			team: team.value,
			size: size.value
		})
		// 回调函数
		// .then((res) => res.json())
		.then((res) => {
			// 当添加成功，返回的sjon对象中应包含一个有效的id字段
			// 因而可以使用res.id来判断是否添加成功
			if(res.id) {
				alert(editType + '球员成功！');
				this.context.router.push('/player/list');
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
		this.fetchData('http://localhost:3000/players');
	}
	render() {
		// 结构出所需要的值
		const {form: { name, age, team, size }, handleChange} = this.props;
		return (
			<form onSubmit={(event) => this.handleSubmit(event)}>
				<FormItem label="球员名字：" valid={name.valid} error={name.error}>
					<input type="text" placeholder="请输入球员名字..." value={name.value} onChange={(event) => handleChange('name', event.target.value)} />
				</FormItem>
				<FormItem label="球员年龄：" valid={age.valid} error={age.error}>
					<input type="number" placeholder="请输入球员年龄..." value={age.value || ''} onChange={(event) => handleChange('age', event.target.value, 'number')} />
				</FormItem>
				<FormItem label="效力球队：" valid={team.valid} error={team.error}>
					<input type="text" placeholder="请输入效力球队..." value={team.value}  onChange={(event) => handleChange('team', event.target.value)} />
				</FormItem>
				<FormItem label="球员身高：" valid={size.valid} error={size.error}>
					<input type="number" placeholder="请输入球员身高..." value={size.value || ''} onChange={(event) => handleChange('size', event.target.value, 'number')} />
				</FormItem>
				<input type="submit" value="提交" />
			</form>
		);
	}
}

// 必须给PlayerAdd义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
PlayerEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

PlayerEditor = formProvider({
	name: {
		defaultValue: '',
		rules: [
			{
				pattern: function(value) {
					return value.length > 0
				},
				error: '请输入球员名字'
			},
			{
        		pattern: /^.{1,32}$/,
        		error: '用户名最多32个字符'
      		}
		]
	},
	age: {
		defaultValue: 0,
		rules: [
			{
        		pattern: function (value) {
          		return value >= 1 && value <= 100;
        		},
        		error: '请输入1~100的年龄'
      		}
		]
	},
	team: {
		defaultValue: '',
		rules: [
			{
				pattern: function(value) {
					return value.length > 0
				},
				error: '请输入球队名字'
			},
			{
        		pattern: /^.{1,32}$/,
        		error: '球队名最多32个字符'
      		}
		]
	},
	size: {
		defaultValue: 0,
		rules: [
			{
        		pattern: function (value) {
          		return value >= 100 && value <= 300;
        		},
        		error: '请输入100~300的身高'
      		}
		]
	}
})(PlayerEditor);


export default PlayerEditor;




























