/*
* @Author: beyondouyuan
* @Date:   2017-08-23 12:01:29
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-23 12:03:50
*/

import React from 'react';

import HomeLayout from '../Layouts/HomeLayout';
import HonorEditor from './HonorEditor'

class HonorAdd extends React.Component {
    render() {
        return (
            <HomeLayout title="添加荣誉">
                <HonorEditor />
            </HomeLayout>
        );
    }
}
export default HonorAdd;
