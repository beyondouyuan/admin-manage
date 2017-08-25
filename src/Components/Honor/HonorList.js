/*
* @Author: beyondouyuan
* @Date:   2017-08-23 12:03:24
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-23 13:28:50
*/

import React from 'react';
import HomeLayout from '../Layouts/HomeLayout';

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
        this.fetchData('http://localhost:3000/honor');
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
            fetch('http://localhost:3000/honor/' + honor.id, {
                method: 'delete'
            })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    HonorList: this.state.HonorList.filter(item => item.id !== honor.id)
                });
                alert('删除成功！');
            })
            .catch(err => {
                console.error(err);
                alert('删除失败！')
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
        // 使用map方法将球员信息数据遍历并渲染到表格中
        return (
            <HomeLayout title="球员信息列表">
                <table>
                    <thead>
                        <tr>
                            <th>荣誉ID</th>
                            <th>mvp</th>
                            <th>冠军</th>
                            <th>薪水</th>
                            <th>标签</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*jsx中的JavaScript表单时使用花括号括住*/}
                        {
                            HonorList.map((honor) => {
                                return(
                                    <tr key={honor.id}>
                                        <td>{honor.id}</td>
                                        <td>{honor.mvp}</td>
                                        <td>{honor.champion}</td>
                                        <td>{honor.salary}</td>
                                        <td>{honor.owner_id}</td>
                                        <td>
                                            <a href="javascript:;" onClick={() => this.handleEdit(honor)}>编辑</a>
                                            <span>|</span>
                                            <a href="javascript:;" onClick={() => this.handleDelete(honor)}>删除</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </HomeLayout>
        )
    }
}

HonorList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default HonorList;
