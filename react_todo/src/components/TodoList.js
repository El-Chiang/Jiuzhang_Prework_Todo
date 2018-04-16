import React, { Component } from 'react';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
    render() {
        const tableStyle = {
            width: "100%",
            textAlign: "center",
        }
        return (
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th>Completed</th>
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Expire</th>
                    </tr>
                </thead>
                {
                    this.props.todos.map((todo, index) => {
                        return (
                            <TodoItem
                                taskId={todo.id}
                                key={todo.id}
                                name={todo.name}
                                expireDate={todo.expireDate}
                                isCompleted={todo.isCompleted}
                                removeTask={this.props.removeTask}
                                toggleComplete={this.props.toggleComplete}
                                rename={this.props.rename}
                                priority={this.props.priority}
                            />
                        );
                    })
                }
            </table>
        );
    }
}
export default TodoList;

