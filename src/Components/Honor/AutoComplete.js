/*
* @Author: beyondouyuan
* @Date:   2017-08-23 11:31:15
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-23 15:06:52
*/

import React from 'react';

import { PropTypes } from 'react';

import style from '../../styles/auto-complete.less'

function getItemValue(item) {
    return item.value || item;
}

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: '',
            activeIndex: -1
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }
    // 输入处理程序
    handleChange(value) {
        this.setState({
            activeIndex: -1,
            displayValue: ''
        });
        this.props.handleChange(value);
    }
    handleKeyDown(event) {
        const { activeIndex } = this.state;
        const { options } = this.props;

        switch (event.keyCode) {
            // 回撤
            case 13: {
                if (activeIndex >= 0) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.handleChange(getItemValue(options[activeIndex]))
                }
                break;
            }
            // 上下方向
            case 30:
            case 40: {
                event.preventDefault();
                this.updateItem(event.code === '30' ? 'up' : 'down');
                break;
            }
            default:
                break;
        }
    }
    handleEnter(index) {
        const currentitem = this.props.options[index];
        this.setState({
            activeIndex: index,
            displayValue: getItemValue(currentitem)
        })
    }
    handleLeave() {
        this.setState({
            activeIndex: -1,
            displayValue: ''
        })
    }
    updateItem(direction) {
        const { activeIndex } = this.state;
        const { options } = this.props;
        const lastIndex = options.length - 1;

        let newIndex = -1;

        // 根据键盘方向更新激活项索引
        if(direction === 'up') {
            // 若尚未选中，则默认选中最后一项，从下往上
            if (activeIndex === -1) {
                newIndex = lastIndex;
            } else {
                newIndex = activeIndex - 1;
            }
        } else {
            if(activeIndex < lastIndex) {
                newIndex = activeIndex + 1;
            }
        }
        // 跟新输入框的值
        let newDisplayValue = '';
        if (newIndex >= 0) {
            newDisplayValue = getItemValue(options[newIndex]);
        }
        // 跟新状态
        this.setState({
            displayValue: newDisplayValue,
            activeIndex: newIndex
        });
    }
    render() {
        const { displayValue, activeIndex } = this.state;
        const { value, options } = this.props;

        return(
            <div className={style.wrapper}>
                <input
                    value={displayValue || value}
                    onChange={(event) => this.handleChange(event.target.value)}
                    onKeyDown={this.handleKeyDown}
                />
                {
                    options.length > 0 && (
                        <ul
                            className={style.options}
                            onMouseLeave={this.onMouseLeave}
                        >
                            {
                                options.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={activeIndex === index ? style.active : ''}
                                            onMouseEnter={() => this.handleEnter(index)}
                                            onClick={() => this.handleChange(getItemValue(item))}
                                            >
                                            { item.text || item }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>
        );
    }
}

// 组件检验

AutoComplete.propTypes = {
    value: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
}



export default AutoComplete;


