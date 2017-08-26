/*
* @Author: beyondouyuan
* @Date:   2017-08-26 22:28:50
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-26 23:53:26
*/
import React from 'react';

import ReactEcharts from 'echarts-for-react';


const option = {
    title: {
        text: '2017最受新秀喜爱的球星',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#777'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'投票结果',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'德韦恩·韦德'},
                {value:310, name:'凯文·杜兰特'},
                {value:274, name:'斯蒂芬·库里'},
                {value:185, name:'詹姆斯·哈登'},
                {value:450, name:'勒布朗·詹姆斯'}
            ].sort(function (a, b) { return a.value - b.value}),
            roseType: 'angle',
            label: {
                normal: {
                    textStyle: {
                        color: '#777'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: '#777'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: '##EBE9ED'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};

const EchartsPie = () => (
    <ReactEcharts
        option={option}
        style={{height: '300px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsPie;
