/*
* @Author: Irving
* @Date:   2017-08-13 03:20:36
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-24 00:20:21
*/

import React from 'react';
import HomeLayout from '../Layouts/HomeLayout';
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
		// 确认对话框
		const confirmed = confirm(`确定要删除球员 ${player.name} 吗？`);
		if (confirmed) {
			del('http://localhost:3000/players' + player.id)
			// .then(res => res.json())
			.then(res => {
				this.setState({
					PlayerList: this.state.PlayerList.filter(item => item.id !== player.id)
				});
				alert('删除球员成功！');
			})
			.catch(err => {
				console.error(err);
				alert('删除失败！')
			});
		}
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
		// 使用map方法将球员信息数据遍历并渲染到表格中
		return (
			<HomeLayout title="球员信息列表">
				<table>
					<thead>
						<tr>
							<th>球员ID</th>
							<th>球员名字</th>
							<th>球员年龄</th>
							<th>效力球队</th>
							<th>球员身高</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{/*jsx中的JavaScript表单时使用花括号括住*/}
						{
							PlayerList.map((player) => {
								return(
									<tr key={player.id}>
										<td>{player.id}</td>
										<td>{player.name}</td>
										<td>{player.age}</td>
										<td>{player.team}</td>
										<td>{player.size}</td>
										<td>
											<a href="javascript:;" onClick={() => this.handleEdit(player)}>编辑</a>
											<span>|</span>
											<a href="javascript:;" onClick={() => this.handleDelete(player)}>删除</a>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</HomeLayout>
		)
	}
}

PlayerList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PlayerList;
