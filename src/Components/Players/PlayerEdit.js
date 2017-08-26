/*
* @Author: Irving
* @Date:   2017-08-13 22:49:38
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-25 19:00:56
* @PlayerEditPage
*/

import React from 'react';
import PlayerEditor from './PlayerEditor';
import { get } from '../../utils/request'

class PlayerEditPage extends React.Component {
	/**
	 * [constructor description]
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	constructor(props) {
		super(props);
		this.state = {
			player: null
		};
	}
	componentWillMount() {
		const playerId = this.context.router.params.id;
		get('http://localhost:3000/players/' + playerId)
		// .then(res => res.json())
		.then(res => {
			this.setState({
				player: res
			});
		});
	}

	render() {
		const { player } = this.state;
		return(
			<div>
				{
					player ? <PlayerEditor editTarget={player} /> : '加载中'
				}
			</div>
		)
	}
}

PlayerEditPage.contextTypes = {
	router: React.PropTypes.object.isRequired
};


export default PlayerEditPage;

