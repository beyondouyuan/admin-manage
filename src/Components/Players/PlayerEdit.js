/*
* @Author: Irving
* @Date:   2017-08-13 22:49:38
* @Last Modified by:   Irving
* @Last Modified time: 2017-08-15 17:34:59
*/

import React from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import PlayerEditor from './PlayerEditor'

class PlayerEditPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			player: null
		};
	}
	componentWillMount() {
		const playerId = this.context.router.params.id;
		fetch('http://localhost:3000/player/' + player)
		.then(res => res.json())
		.then(res => {
			this.setState({
				player: res
			});
		});
	}

	render() {
		const { player } = this.state;
		return(
			<HomeLayout title="编辑球员">
				{
					player ? <PlayerEditor editTarget={player} /> : '加载中'
				}
			</HomeLayout>
		)
	}
}

PlayerEditPage.contextTypes = {
	router: React.PropTypes.object.isRequired
};


export default PlayerEditPage;

