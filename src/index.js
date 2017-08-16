/*
* @Author: Irving
* @Date:   2017-08-11 17:10:20
* @Last Modified by:   Irving
* @Last Modified time: 2017-08-14 13:36:30
*/

import React from 'react';
import ReactDOM from 'react-dom';
// use react-router
import { Router, Route, hashHistory } from 'react-router';

// use Components
import PlayerAddComponent from './Components/Players/PlayerAdd';
import HomeComponent from './Components/Players/Home';
import PlayerListComponent from './Components/Players/PlayerList';
import PlayerEdit from './Components/Players/PlayerEdit'

ReactDOM.render((
	<Router history={hashHistory}>
		<Route exact path="/" component={HomeComponent} />
		<Route path="/player/add" component={PlayerAddComponent} />
		<Route path="/player/list" component={PlayerListComponent} />
		<Route path="/player/edit" component={PlayerEdit} />
	</Router>
), document.getElementById('root'));



















