import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Row, Col, Input, Button, DatePicker, Select } from 'antd';
import TodoList from './components/TodoList.js';
import './App.css';

const { Header, Content } = Layout;
const InputGroup = Input.Group;
const Option = Select.Option;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);  // 添加
    this.handleRemove = this.handleRemove.bind(this);  // 删除
    this.handleToggleComplete = this.handleToggleComplete.bind(this)  // 切换状态
    this.handleRename = this.handleRename.bind(this);  // 重命名
    this.handlePriority = this.handlePriority.bind(this);  // 优先级
    this.handleExpireDate = this.handleExpireDate.bind(this);  // 日期
    this.handleSort = this.handleSort.bind(this);

    this.state = {
      todos: [],
    };
  }

  // 生成taskId
  generateId() {
    return Math.floor(Math.random() * 90900) + 10000;
  }

  // 切换待办事项完成状态
  handleToggleComplete(taskId) {
    var todos = this.state.todos;
    for (var i in todos) {
      if (todos[i].id === taskId) {
        todos[i].isCompleted = !todos[i].isCompleted;
        break;
      }
    }
    this.setState({ todos: todos });
  }

  // 添加待办事项
  handleAdd() {
    var taskName = ReactDOM.findDOMNode(this.refs.taskname).value.trim();
    ReactDOM.findDOMNode(this.refs.taskname).value = '';
    var expireDate = ReactDOM.findDOMNode(this.refs.taskdate).value;
    if (!taskName) {
      return '';
    }
    if (!expireDate) {
      var seperator = "-";
      var dateOb = new Date();
      var year = dateOb.getFullYear();
      var month = dateOb.getMonth() + 1;
      var date = dateOb.getDate();
      expireDate = year + seperator + ((month <= 9) ? "0" + month : month) + seperator + (date <= 9 ? "0" + date : date);
    }
    var taskId = this.generateId();  // 初始化taskId
    var todos = this.state.todos;
    todos.push({
      id: taskId,
      name: taskName,
      isCompleted: false,
      expireDate: expireDate
    });
    this.setState({ todos: todos });
  }

  // 删除待办事项
  handleRemove(taskId) {
    var todos = this.state.todos;
    todos = todos.filter((task) => {
      return task.id !== taskId;
    });
    this.setState({ todos: todos })
  }

  // 重命名
  handleRename(taskId, name) {
    // 规定：已完成的任务只能被删除不能被重命名
    var todos = this.state.todos;
    for (var i in todos) {
      if (todos[i].id === taskId) {
        todos[i].name = name;
        break;
      }
    }
    this.setState({ todos: todos })
  }

  // 设置优先级
  handlePriority(taskId, priority) {
    var todos = this.state.todos;
    for (var i in todos) {
      if (todos[i].id === taskId) {
        todos[i].priority = priority;
        break;
      }
    }
    this.setState({ todos: todos })
  }

  // 设置expire date
  handleExpireDate(date, dateString) {
    ReactDOM.findDOMNode(this.refs.taskdate).value = dateString;
    return dateString;
  }

  // 按优先级降序
  sortByPriorityUp() {
    var todos = this.state.todos;
    var length = todos.length;
    var swap = function(i1, i2) {
      var aux = todos[i1];
      todos[i1] = todos[i2];
      todos[i2] = aux;
    }
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length - 1 - i; j++) {
        if (todos[j].priority > todos[j + 1].priority) {
          swap(j, j + 1);
        }
      }
    }
    this.setState({ todos: todos });
    return todos;
  }

  // 按优先级升序
  sortByPriorityDown() {
    var todos = this.sortByPriorityUp().reverse();
    this.setState({ todos: todos });
  }

  // 时间降序
  sortByDateUp() {
    var todos = this.state.todos;
    var length = todos.length;
    var swap = function(i1, i2) {
      var aux = todos[i1];
      todos[i1] = todos[i2];
      todos[i2] = aux;
    }
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length - 1 - i; j++) {
        if (parseInt(todos[j].expireDate.replace(/-/g, '')) > parseFloat(todos[j + 1].expireDate.replace(/-/g, ''))) {
          swap(j, j + 1);
        }
      }
    }
    this.setState({ todos: todos });
    return todos;
  }

  // 时间升序
  sortByDateDown() {
    var todos = this.sortByDateUp().reverse();
    this.setState({ todos: todos });
  }

  // 设置排序方式
  handleSort(value, label) {
    if (value === "sbp_up") {
      this.sortByPriorityUp();
    }
    if (value === "sbp_down") {
      this.sortByPriorityDown()
    }
    if (value === "sbd_up") {
      this.sortByDateUp();
    }
    if (value === "sbd_down") {
      this.sortByDateDown();
    }
  }

  render() {
    return (
      <div className="App">
        <Layout style={{ background: "white" }}>
          <Header style={{ background: "rgb(24,144, 255)" }}>
            <h1 style={{ color: "white" }}>Todo List</h1>
          </Header>

          <Content style={{ marginTop: 20 }}>
            <div style={{ background: 'white', minHeight: 580 }}>
              <Row style={{ textAlign: "center, margin: 10" }}>
                
                <Col span={8} style={{ textAlign: "right" }} >
                  <Button type="primary" icon="plus" onClick={this.handleAdd} />
                  <Select onChange={this.handleSort} placeholder="Sort" style={{ width: 120 }}>
                    <Option value="sbp_down">Sort by priority ↓</Option>
                    <Option value="sbp_up">Sort by priority ↑</Option>
                    <Option value="sbd_down">Sort by date ↓</Option>
                    <Option value="sbd_up">Sort by date ↑</Option>
                  </Select>
                </Col>
                <Col span={16} style={{ textAlign: "left" }}>
                  <InputGroup compact>
                    <Input style={{ width: '50%' }} placeholder="Add Todo" ref="taskname" />
                    <DatePicker  onChange={this.handleExpireDate} placeholder="Select Date" ref="taskdate" showToday={true} />
                  </InputGroup>
                </Col>
                
              </Row>
              <div style={{ marginLeft: 50, marginRight: 50, marginTop: 20, marginBottom: 20, height: 530 }}>
                <TodoList
                  todos={this.state.todos}
                  removeTask={this.handleRemove}
                  toggleComplete={this.handleToggleComplete}
                  rename={this.handleRename}
                  priority={this.handlePriority}
                  current={this.state.current}
                />
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
