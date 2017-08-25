/*
* @Author: Irving
* @Date:   2017-08-11 19:40:33
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-23 13:10:17
* @Home.js
*/

import React from 'react';
import { Link } from 'react-router';
import HomeLayout from '../Layouts/HomeLayout';

class Home extends React.Component {
	render() {
		return (
			<HomeLayout title="欢迎来到球员管理系统">
				<div>
					<Link to="/player/add">新增球员</Link>
				</div>
				<div>
					<Link to="/player/list">球员信息</Link>
				</div>
				<div>
					<Link to="/honor/add">新增球员荣誉</Link>
				</div>
				<div>
					<Link to="/honor/list">球员荣誉信息</Link>
				</div>
			</HomeLayout>
		);
	}
}

export default Home;
