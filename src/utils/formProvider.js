/*
 * @Author: Irving
 * @Date:   2017-08-12 17:01:43
 * @Last Modified by:   Irving
 * @Last Modified time: 2017-08-13 21:12:32
 */

import React from 'react';

function formProvider(fields) {
    /**
     * [description]
     * @param  {[type]} Component [description]
     * @return {[type]}           [description]
     */
    return function(Component) {
        const initFormState = {};
        for (const key in fields) {
            initFormState[key] = {
                value: fields[key].defaultValue,
                error: ''
            };
        }

        class FormComponent extends React.Component {
            // 在constructor中初始化数据以及绑定this
            constructor(props) {
                super(props);
                this.state = {
                    form: initFormState,
                    formValid: false
                };
                // 绑定this
                this.handleChange = this.handleChange.bind(this);
                this.setFormData = this.setFormData.bind(this);
            }
            setFormData(values) {
                if (!values) {
                    return;
                }
                const { form } = this.state;
                let newForm = {...form};
                for(const field in form) {
                    if (form.hasOwnProperty(field)) {
                        if (typeof values[field] !== 'undefined') {
                            newForm[field] = {...newForm[field], value: values[field]};
                        }
                        newForm[field].valid = true;
                    }
                }

                this.setState({
                    form: newForm
                });
            }
            handleChange(fieldName, value, type= "string") {
                if (type === 'number') {
                    value = +value;
                }
                const { form } = this.state;

                const newFieldState = { value, valid: true, error: '' };

                const fieldRules = fields[fieldName].rules;

                for (let i = 0; i < fieldRules.length; i++) {
                    const { pattern, error } = fieldRules[i];
                    let valid = false;
                    if (typeof pattern === 'function') {
                        valid = pattern(value);
                    } else {
                        valid = pattern.test(value);
                    }

                    if (!valid) {
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }

                const newForm = {...form, [fieldName]: newFieldState };
                // const formValid = Object.values(newForm).every(f => f.valid);
                // 遍历对象可枚举的属性
                // 低版本浏览器不支持Object.values方法
                const validArr = Object.keys(newForm).map((k) => newForm[k]);
                const formValid = validArr.every(f => f.valid);
                this.setState({
                    form: newForm,
                    formValid
                });
            }
            // 渲染存入的子组件
            render() {
                const { form, formValid } = this.state;
                return <Component
                    {...this.props }
                    form = { form }
                    formValid = { formValid }
                    handleChange = { this.handleChange }
                    setFormData = { this.setFormData }
                />
            }
        }
        // 返回父级组件
        return FormComponent;
    }
}

export default formProvider;
