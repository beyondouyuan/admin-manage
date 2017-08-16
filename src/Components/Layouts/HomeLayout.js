/*
* @Author: Irving
* @Date:   2017-08-13 04:32:51
* @Last Modified by:   Irving
* @Last Modified time: 2017-08-13 04:44:59
*/

import React from 'react';

class HomeLayout extends React.Component {
	render() {
		const { title, children } = this.props;
		return (
			<div>
				<header>
					<h1>{title}</h1>
				</header>
				<main>
					{children}
				</main>
			</div>
		)
	}
}


export default HomeLayout;
