/*
* @Author: Irving
* @Date:   2017-08-11 17:10:20
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-23 22:36:00
*/

import React from 'react';
import ReactDOM from 'react-dom';
// use react-router
import { Router, Route, hashHistory } from 'react-router';

// use Components
import PlayerAddComponent from './Components/Players/PlayerAdd';
import HomeComponent from './Components/Players/Home';
import PlayerListComponent from './Components/Players/PlayerList';
import PlayerEdit from './Components/Players/PlayerEdit';

import HonorAddComponent from './Components/Honor/HonorAdd';
import HonorListComponent from './Components/Honor/HonorList';
import HonorEdit from './Components/Honor/HonorEdit';
import Login from './Components/Login/Login'

ReactDOM.render((
	<Router history={hashHistory}>
		<Route exact path="/" component={HomeComponent} />
		<Route path="/player/add" component={PlayerAddComponent} />
		<Route path="/player/list" component={PlayerListComponent} />
        <Route path="/player/edit/:id" component={PlayerEdit} />
        <Route path="/honor/add" component={HonorAddComponent} />
        <Route path="/honor/list" component={HonorListComponent} />
        <Route path="/honor/edit/:id" component={HonorEdit} />
		<Route exact path="/login" component={Login} />
	</Router>
), document.getElementById('root'));



















