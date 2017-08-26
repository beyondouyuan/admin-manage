/*
* @Author: Irving
* @Date:   2017-08-13 03:20:36
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-27 00:12:39
*/

import React from 'react';
import { message, Table, Button, Popconfirm } from 'antd';
import request, { get, del } from '../../utils/request'

class PlayerList extends React.Component {
	/**
	 * [constructor description]
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	constructor(props) {
		super(props);
		this.state = {
			PlayerList: []
		}
	}
	// 在组件挂载前请求数据，当然也可以在组件挂载完成后再请求数据
	componentWillMount() {
		/**
		 * [description]
		 * @param  {[type]} res [description]
		 * @return {[type]}     [description]
		 */
		get('http://localhost:3000/players')
			.then((res) => {
				if (res) {
					this.setState({
						PlayerList: res
					})
				}
			});
	}
	/**
	 * [fetchData description]
	 * @param  {[type]} url [description]
	 * @return {[type]}     [description]
	 */
	fetchData(url) {
		fetch(url)
			// 将返回数据json格式化
			.then(res => res.json())
			.then(res => {
				// 将获取到的数据储存在state中，在组件内部进行维护
				this.setState({
					PlayerList: res
				});
			});
	}
	/**
	 * [handleDelete description]
	 * @param  {[type]} player [description]
	 * @return {[type]}        [description]
	 */
	handleDelete(player) {
			del('http://localhost:3000/players/' + player.id)
			// .then(res => res.json())
			.then(res => {
				this.setState({
					PlayerList: this.state.PlayerList.filter(item => item.id !== player.id)
				});
				message.success('删除球员成功！');
			})
			.catch(err => {
				console.error(err);
				message.error('删除失败！')
			});
	}
	/**
	 * [handleEdit description]
	 * @param  {[type]} player [description]
	 * @return {[type]}        [description]
	 */
	handleEdit(player) {
		/**
		 * 路由跳转到编辑页面即可
		 */
		this.context.router.push('/player/edit/' + player.id);

	}

	render() {
		// 解构赋值提取数据
		const { PlayerList } = this.state;
		// 表头
		const columns = [
			{
				title: '球员ID',
				dataIndex: 'id'
			},
			{
				title: '球员名字',
				dataIndex: 'name'
			},
			{
				title: '球员年龄',
				dataIndex: 'age'
			},
			{
				title: '效力球队',
				dataIndex: 'team'
			},
			{
				title: '球员身高',
				dataIndex: 'size'
			},
			{
				title: '操作',
				render: (text, record) => (
					<Button.Group type="ghost">
						<Button type="primary" size="large" onClick={() => this.handleEdit(record)}>编辑</Button>
						<Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDelete(record)}>
              				<Button type="danger" size="large">删除</Button>
            			</Popconfirm>
					</Button.Group>
				)
			}
		]
		return (
			<div style={{padding: '16px'}}>
				<Table columns={columns} dataSource={PlayerList} rowKey={row => row.id}/>
			</div>
		)
	}
}

PlayerList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PlayerList;
