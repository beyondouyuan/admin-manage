/*
* @Author: beyondouyuan
* @Date:   2017-08-25 21:08:41
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-25 21:10:43
*/

import React, { PropTypes } from 'react';
import { Input } from 'antd';
import style from '../../styles/auto-complete.less'

function getItemValue (item) {
  return item.value || item;
}

class AutoComplete extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      show: false,
      displayValue: '',
      activeIndex: -1
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleChange (value) {
    this.setState({activeIndex: -1, displayValue: ''});
    this.props.onChange(value);
  }

  handleKeyDown (e) {
    const {activeIndex} = this.state;
    const {options} = this.props;

    switch (e.keyCode) {
      case 13: {
        if (activeIndex >= 0) {
          e.preventDefault();
          e.stopPropagation();
          this.handleChange(getItemValue(options[activeIndex]));
        }
        break;
      }
      case 38:
      case 40: {
        e.preventDefault();
        this.moveItem(e.keyCode === 38 ? 'up' : 'down');
        break;
      }
    }
  }

  moveItem (direction) {
    const {activeIndex} = this.state;
    const {options} = this.props;
    const lastIndex = options.length - 1;
    let newIndex = -1;

    if (direction === 'up') {
      if (activeIndex === -1) {
        newIndex = lastIndex;
      } else {
        newIndex = activeIndex - 1;
      }
    } else {
      if (activeIndex < lastIndex) {
        newIndex = activeIndex + 1;
      }
    }

    let newDisplayValue = '';
    if (newIndex >= 0) {
      newDisplayValue = getItemValue(options[newIndex]);
    }

    this.setState({
      displayValue: newDisplayValue,
      activeIndex: newIndex
    });
  }

  handleEnter (index) {
    const currentItem = this.props.options[index];
    this.setState({activeIndex: index, displayValue: getItemValue(currentItem)});
  }

  handleLeave () {
    this.setState({activeIndex: -1, displayValue: ''});
  }

  render () {
    const {show, displayValue, activeIndex} = this.state;
    const {value, options} = this.props;
    return (
      <div className={style.wrapper}>
        <Input
          value={displayValue || value}
          onChange={e => this.handleChange(e.target.value)}
          onKeyDown={this.handleKeyDown}
          onFocus={() => this.setState({show: true})}
          onBlur={() => this.setState({show: false})}
        />
        {show && options.length > 0 && (
          <ul className={style.options} onMouseLeave={this.handleLeave}>
            {
              options.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={index === activeIndex ? style.active : ''}
                    onMouseEnter={() => this.handleEnter(index)}
                    onClick={() => this.handleChange(getItemValue(item))}
                  >
                    {item.text || item}
                  </li>
                );
              })
            }
          </ul>
        )}
      </div>
    );
  }
}

AutoComplete.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func
};

export default AutoComplete;

