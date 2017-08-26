/*
* @Author: Irving
* @Date:   2017-08-11 19:40:33
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-26 23:52:22
* @Home.js
*/

import React from 'react';
import style from './hone-page.less'

import EchartsPie from '../Echarts/EchartsPie'
import EchartsForce from '../Echarts/EchartsForce'
import ReactBarChart from '../Echarts/EchartsBar'
import RechartsLineChart from '../Echarts/EchartsLine'
import EchartsEffectScatter from '../Echarts/EchartMap'

class Home extends React.Component {
	render() {
		return (
			<div className={style.welcomw}>
                 <div>
                     <EchartsPie />
                     <EchartsEffectScatter />
                     <RechartsLineChart />
                     <EchartsForce />
                     {/*<ReactBarChart />*/}
                 </div>
			</div>
		);
	}
}

export default Home;
