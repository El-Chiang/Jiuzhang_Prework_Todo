import React, { Component } from 'react';
import { Button, Checkbox, Input, Rate, Icon } from 'antd';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);  // 删除事项
        this.toggleComplete = this.toggleComplete.bind(this);  // 切换状态
        this.handleChange = this.handleChange.bind(this);  // 处理输入
        this.handleEdit = this.handleEdit.bind(this);  // 编辑事项
        this.handleSure = this.handleSure.bind(this);  // 确认修改
        this.handleCancel = this.handleCancel.bind(this);  // 取消修改
        this.handlePriority = this.handlePriority.bind(this);  // 设置优先级
        this.state = {
            isEditing: false,
            inputValue: this.props.name,
        };
    }

    // 切换事项状态
    toggleComplete() {
        this.props.toggleComplete(this.props.taskId);
    }

    // 处理输入框的输入
    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    // 编辑待办事项
    handleEdit() {
        this.setState({
            isEditing: true
        });
    }

    // 确认修改
    handleSure() {
        this.props.rename(this.props.taskId, this.state.inputValue);
        this.setState({
            isEditing: false
        });
    }

    // 取消修改
    handleCancel() {
        this.setState({
            isEditing: false,
            inputValue: this.props.name
        });
    }

    // 删除事项
    handleRemove() {
        this.props.removeTask(this.props.taskId);
    }

    // 设置优先级
    handlePriority(value) {
        this.props.priority(this.props.taskId, value);
    }

    render() {
        var { taskId, name, isCompleted } = this.props,
            operation = '';
        if (isCompleted) {
            operation = <s><i>{name}</i></s>
        } else {
            if (this.state.isEditing) {
                operation =
                    <span>
                        <Input value={this.state.inputValue} onChange={this.handleChange} />
                        &nbsp;&nbsp;
                        <Button onClick={this.handleSure}>
                            Sure
                        </Button>
                        &nbsp;&nbsp;
                        <Button onClick={this.handleCancel}>
                            Cancel
                        </Button>
                    </span>
            } else {
                operation =
                    <span>
                        <span>{name}</span>
                        &nbsp;&nbsp;
                        <Button icon="edit" onClick={this.handleEdit} style={{ border: "none" }} />
                    </span>
            }
        }
        return (
            <tr key={taskId}>
                <td>
                    <Checkbox checked={isCompleted} onChange={this.toggleComplete}></Checkbox>
                </td>
                <td>
                    {operation}
                    <Button icon="cross-circle" onClick={this.handleRemove} style={{ border: "none" }} />
                </td>
                <td>
                    <Rate onChange={this.handlePriority} character={<Icon type="flag" />} style={{ color: "red"}} />
                </td>
                <td>
                    {this.props.expireDate}
                </td>
            </tr>
        );
    }
}

export default TodoItem;
