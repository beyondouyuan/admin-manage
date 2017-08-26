/*
* @Author: Irving
* @Date:   2017-08-13 04:32:51
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-27 00:00:17
*/

import React from 'react';

import { Link } from 'react-router';

import { Menu, Icon } from 'antd';

import style from './home-layout.less'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class HomeLayout extends React.Component {
	render() {
		const { children } = this.props;
		return (
			<div>
				<header className={style.header}>
					<nav className={style.navigation}>
						<div className={style.navbar}>
							<Link to="/">ReactCMS</Link>
						</div>
						<div className={style.info}>
							<span className={style.span}>欢迎</span>
							<span className={style.span}>Admin</span>
							<Link to="/login">推出</Link>
						</div>
					</nav>
				</header>

				<main className={style.main}>
					<div className={style.menu}>
						<Menu mode="inline" theme="dark" style={{width: '240px'}}>
							<SubMenu key="player" title={<span><Icon type="user" /><span>球员管理</span></span>}>
								<MenuItem key="player-list">
									<Link to="/player/list">球员列表</Link>
								</MenuItem>
								<MenuItem key="player-add">
									<Link to="/player/add">添加球员</Link>
								</MenuItem>
							</SubMenu>
							<SubMenu key="honor" title={<span><Icon type="user" /><span>球员荣誉</span></span>}>
								<MenuItem key="honor-list">
									<Link to="/honor/list">荣誉列表</Link>
								</MenuItem>
								<MenuItem key="honor-add">
									<Link to="/honor/add">添加荣誉</Link>
								</MenuItem>
							</SubMenu>
						</Menu>
					</div>

					<div className={style.content}>
						{children}
					</div>
				</main>
			</div>
		)
	}
}

export default HomeLayout;
