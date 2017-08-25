/*
* @Author: beyondouyuan
* @Date:   2017-08-23 12:03:06
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-23 12:06:33
*/


import React from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import HonorEditor from './HonorEditor'

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
    componentWillMount() {
        const honorId = this.context.router.params.id;
        fetch('http://localhost:3000/honor/' + honorId)
        .then(res => res.json())
        .then(res => {
            this.setState({
                honor: res
            });
        });
    }

    render() {
        const { honor } = this.state;
        return(
            <HomeLayout title="编辑荣誉">
                {
                    honor ? <HonorEditor editTarget={honor} /> : '加载中'
                }
            </HomeLayout>
        )
    }
}

HonorEditPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default HonorEditPage;
