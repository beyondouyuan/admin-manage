/*
* @Author: Irving
* @Date:   2017-08-11 18:30:44
* @Last Modified by:   Irving
* @Last Modified time: 2017-08-13 21:31:07
* @PlayerAdd.js
*/

import React from 'react';

import HomeLayout from '../Layouts/HomeLayout';
import PlayerEditor from './PlayerEditor'

class PlayerAdd extends React.Component {
	render() {
		return (
			<HomeLayout title="添加球员">
				<PlayerEditor />
			</HomeLayout>
		);
	}
}
export default PlayerAdd;
