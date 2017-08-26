/*
* @Author: beyondouyuan
* @Date:   2017-08-23 12:03:06
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-25 19:58:22
*/


import React from 'react';
import HonorEditor from './HonorEditor'
import { get } from '../../utils/request'

class HonorEditPage extends React.Component {
    /**
     * [constructor description]
     * @param  {[type]} props [description]
     * @return {[type]}       [description]
     */
    constructor(props) {
        super(props);
        this.state = {
            honor: null
        };
    }
    componentDidMount() {
        const honorId = this.context.router.params.id;
        get('http://localhost:3000/honor/' + honorId)
            .then(res => {
                this.setState({
                    honor: res
                });
            });
    }

    render() {
        const { honor } = this.state;
        return(
            <div>
                {
                    honor ? <HonorEditor editTarget={honor} /> : '加载中'
                }
            </div>
        )
    }
}

HonorEditPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default HonorEditPage;
