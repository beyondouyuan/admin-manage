/*
* @Author: beyondouyuan
* @Date:   2017-08-26 22:51:01
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-26 23:56:05
*/


import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

const option = {
    title: {
        text: ''
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    label: {
        normal: {
            show: true,
            textStyle: {
                fontSize: 12
            },
        }
    },
    legend: {
        x: "center",
        show: false,
        data: ["队友", "朋友", '同学']
    },
    series: [

        {
            type: 'graph',
            layout: 'force',
            symbolSize: 75,
            focusNodeAdjacency: true,
            roam: true,
            categories: [{
                name: '朋友',
                itemStyle: {
                    normal: {
                        color: "#009800",
                    }
                }
            }, {
                name: '队友',
                itemStyle: {
                    normal: {
                        color: "#4592FF",
                    }
                }
            }, {
                name: '同学',
                itemStyle: {
                    normal: {
                        color: "#3592F",
                    }
                }
            }],
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    },
                }
            },
            force: {
                repulsion: 1000
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 10
                    },
                    formatter: "{c}"
                }
            },
            data: [{
                name: '勒布朗·詹姆斯',
                draggable: true,
            }, {
                name: '德韦恩·韦德',
                category: 1,
                draggable: true,
            }, {
                name: '凯里·欧文',
                category: 1,
                draggable: true,
            }, {
                name: '凯文·勒夫',
                category: 1,
                draggable: true,
            }, {
                name: '威斯布鲁克',
                category: 1,
                draggable: true,
            }, {
                name: '斯蒂芬·库里',
                category: 1,
                draggable: true,
            }, {
                name: '凯文·杜兰特',
                category: 1,
                draggable: true,
            }, {
                name: '詹姆斯·哈登',
                category: 1,
                draggable: true,
            }, {
                name: '克莱·汤普森',
                category: 1,
                draggable: true,
            }, {
                name: '扎克·拉文',
                category: 1,
                draggable: true,
            }, {
                name: '马努·吉诺比利',
                category: 1,
                draggable: true,
            }, {
                name: '可坏·伦纳德',
                category: 1,
                draggable: true,
            }, {
                name: '欧元',
                category: 1,
                draggable: true,
            }],
            links: [{
                source: 0,
                target: 1,
                category: 0,
                value: '朋友'
            }, {
                source: 0,
                target: 2,
                value: '队友'
            }, {
                source: 0,
                target: 3,
                value: '同学'
            }, {
                source: 0,
                target: 4,
                value: '朋友'
            }, {
                source: 1,
                target: 2,
                value: '同学'
            }, {
                source: 0,
                target: 5,
                value: '队友'
            }, {
                source: 4,
                target: 5,
                value: '队友'
            }, {
                source: 2,
                target: 8,
                value: '兄弟'
            }, {
                source: 0,
                target: 12,
                value: '朋友'
            }, {
                source: 6,
                target: 11,
                value: '教父'
            }, {
                source: 6,
                target: 3,
                value: '朋友'
            }, {
                source: 7,
                target: 5,
                value: '朋友'
            }, {
                source: 9,
                target: 10,
                value: '朋友'
            }, {
                source: 3,
                target: 10,
                value: '朋友'
            }, {
                source: 2,
                target: 11,
                value: '同学'
            }],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1,
                    curveness: 0
                }
            }
        }
    ]
};
class EchartsForce extends Component {
    render() {
        return (
            <ReactEcharts
                option={option}
                style={{height: '600px', width: '100%',margin: '20px 0'}}
            />
        )
    }
}

export default EchartsForce;
