/*
* @Author: beyondouyuan
* @Date:   2017-08-23 12:03:24
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-27 00:14:10
*/

import React from 'react';
import { message, Table, Button, Popconfirm } from 'antd';
import request, { get, del } from '../../utils/request'


class HonorList extends React.Component {
    /**
     * [constructor description]
     * @param  {[type]} props [description]
     * @return {[type]}       [description]
     */
    constructor(props) {
        super(props);
        this.state = {
            HonorList: []
        }
    }
    // 在组件怪家前请求数据，当然也可以在组件挂载完成后再请求数据
    componentWillMount() {
        /**
         * [description]
         * @param  {[type]} res [description]
         * @return {[type]}     [description]
         */
        get('http://localhost:3000/honor')
            .then((res) => {
                if (res) {
                    this.setState({
                        HonorList: res
                    })
                }
            });
    }
    /**
     * [fetchData description]
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    fetchData(url) {
        fetch(url)
            // 将返回数据json格式化
            .then(res => res.json())
            .then(res => {
                // 将获取到的数据储存在state中，在组件内部进行维护
                this.setState({
                    HonorList: res
                });
            });
    }
    /**
     * [handleDelete description]
     * @param  {[type]} honor [description]
     * @return {[type]}        [description]
     */
    handleDelete(honor) {
        // 确认对话框
        const confirmed = confirm(`确定要删除荣誉 ${honor.id} 吗？`);
        if (confirmed) {
            del('http://localhost:3000/honor/' + honor.id, {
                method: 'delete'
            })
            .then(res => {
                this.setState({
                    HonorList: this.state.HonorList.filter(item => item.id !== honor.id)
                });
                message.success('删除成功！');
            })
            .catch(err => {
                console.error(err);
                message.error('删除失败！')
            });
        }
    }
    /**
     * [handleEdit description]
     * @param  {[type]} honor [description]
     * @return {[type]}        [description]
     */
    handleEdit(honor) {
        /**
         * 路由跳转到编辑页面即可
         */
        this.context.router.push('/honor/edit/' + honor.id);

    }

    render() {
        // 解构赋值提取数据
        const { HonorList } = this.state;
        // 表头
        const columns = [
            {
                title: '荣誉ID',
                dataIndex: 'id'
            },
            {
                title: 'MVP',
                dataIndex: 'mvp'
            },
            {
                title: '冠军',
                dataIndex: 'champion'
            },
            {
                title: '薪水',
                dataIndex: 'salary'
            },
            {
                title: '标签',
                dataIndex: 'owner_id'
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Button.Group type="ghost">
                        <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDelete(record)}>
                            <Button size="small">删除</Button>
                        </Popconfirm>
                    </Button.Group>
                )
            }
        ]
        return (
            <div style={{padding: '16px'}}>
                <Table columns={columns} dataSource={HonorList} rowKey={row => row.id}/>
            </div>
        )
    }
}

HonorList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default HonorList;
