/*
* @Author: Irving
* @Date:   2017-08-12 20:52:49
* @Last Modified by:   Irving
* @Last Modified time: 2017-08-12 21:06:23
*/

import React from 'react';

class FormItem extends React.Component {
	render() {
		return(
			<div className="input-group">
				<label>{this.props.label}</label>
				{this.props.children}
				{!this.props.valid && <span>{this.props.error}</span>}
			</div>
		)
	}
}


export default FormItem;



















