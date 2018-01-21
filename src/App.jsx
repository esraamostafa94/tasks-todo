import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import DB from './DataBase';
import './App.css';
import CollectionsTasks from './CollectionsTasks';

const DivApp = styled.div`
  margin: 0 auto;
  width: 50%;
`;

const DivHeader = styled.div`
  background-color: #0B4C5F;
  padding: 20px 20px;
  color: white;
  margin: 0 auto;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TODO_List: [],
      Collection_List: [],
      text: '',
      header: 'My TODO List',
      hide: false,
      collection: 0,
      collection_input: '',
      editTaskId: -1,
      editInput: '',
      users: [],
      enteredNewUser: '',
      enteredColor: 'teal',
    };

    // bind functions
    this.changeTaskEdit = this.changeTaskEdit.bind(this);
    this.viewCollection = this.viewCollection.bind(this);
    this.taskdone = this.taskdone.bind(this);
    this.handleText = this.handleText.bind(this);
    this.newCollection = this.newCollection.bind(this);
    this.addCollection = this.addCollection.bind(this);
    this.countDone = this.countDone.bind(this);
    this.taskCounter = this.taskCounter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deletetask = this.deletetask.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.cancelEditTask = this.cancelEditTask.bind(this);
    this.saveEditTask = this.saveEditTask.bind(this);
    this.hideDone = this.hideDone.bind(this);
    this.addUserTask = this.addUserTask.bind(this);
    this.writeNewUser = this.writeNewUser.bind(this);
    this.chooseUserColor = this.chooseUserColor.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.deleteUserTask = this.deleteUserTask.bind(this);
  }

  componentDidMount() {
    console.log('hide here ***');
    console.log(this.state.hide);
    DB.fetchTasks().then((response) => {
      console.log('"Fetch Tasks"');
      console.log(response.data);
      const tasksList = response.data;

      DB.fetchUsers().then((res) => {
        console.log('Fetch Users');
        console.log(res.data);

        const usersList = [];
        res.data.forEach((usr) => {
          usersList.push({
            text: usr.name,
            value: usr.id,
            label: { color: usr.color, empty: true, circular: true },
            // to: `/u/${usr.id}`,
            // as: Link,
          });
        });

        tasksList.forEach((task, index) => {
          if (task.userId) {
            res.data.forEach((usr) => {
              if (task.userId === usr.id) {
                const tsk = task;
                tsk.userName = usr.name;
                tsk.userColor = usr.color;
                tasksList[index] = tsk;
                // break;
              }
            });
          }
        });
        console.log('Tasks after push users ');
        console.log(tasksList);
        console.log(usersList);
        this.setState({
          users: usersList,
          TODO_List: tasksList,
        });
      });
    });

    // TODO fetch Collections
    DB.fetchCollections().then((response) => {
      console.log('"Fetch Collection"');
      console.log(response.data);

      const items = [
        {
          text: 'ALL',
          value: 0,
          to: '/',
          as: Link,
        },
      ];
      response.data.forEach((item) => {
        const collec = {
          text: item.name,
          value: item.id,
          to: `/c/${item.id}`,
          as: Link,
        };
        items.push(collec);
      });

      console.log('Collection_List');
      // console.log(this.state.Collection_List);
      console.log(items);
      console.log('Collection_List');
      this.setState({
        Collection_List: items,
      });
    });
  }

  // New task
  handleText(event) {
    console.log(event.target.value);
    this.setState({
      text: event.target.value,
    });
  }

  // select a collection
  viewCollection(event, data) {
    console.log('data');
    // console.log(data);
    console.log(data);
    // console.log("event.target.innerText");
    const collectionName = data.options[data.value].text;

    this.setState({
      collection: data.value,
      header: `My ${collectionName} TODO List`,
    });
  }

  newCollection(event) {
    console.log('"data"');
    // console.log(data);
    console.log(event.target.value);
    // console.log("event.target.innerText");
    // console.log(event.target.innerText);
    this.setState({
      collection_input: event.target.value,
    });
  }

  addCollection() {
    if (this.state.collection_input) {
      // save in db
      DB.AddNewCollection(this.state.collection_input).then((response) => {
        console.log('"I am Here***********"');
        console.log(response.data.id);
        console.log('"response.data.id"');
        const collec = {
          text: this.state.collection_input,
          value: response.data.id,
          to: `/c/${response.data.id}`,
          as: Link,
        };
        this.state.Collection_List.push(collec);

        this.setState({
          collection_input: '',
          Collection_List: this.state.Collection_List,
        });
      });
    }
  }

  countDone() {
    let count = 0;
    this.state.TODO_List.forEach((task) => {
      if (task.completed &&
        (task.collection === this.state.collection || this.state.collection === 0)) {
        count += 1;
      }
    });
    return count;
  }

  taskCounter() {
    let count = 0;
    if (this.state.collection === 0) {
      return this.state.TODO_List.length;
    }
    this.state.TODO_List.forEach((task) => {
      if (task.collection === this.state.collection) {
        count += 1;
      }
    });
    return count;
  }

  // Add button
  handleClick() {
    if (this.state.text) {
      DB.AddNewTask(this.state.text, false, this.state.collection).then((response) => {
        console.log('"I am Here***********"');
        console.log(response.data.id);
        console.log('"response.data.id"');
        const nItem = {
          id: response.data.id,
          title: this.state.text,
          completed: false,
          collection: this.state.collection,
        };
        this.state.TODO_List.push(nItem);

        this.setState({
          TODO_List: this.state.TODO_List,
          text: '',
        });
      });
      // console.log("Task id");
      // console.log("Task id : " + task_id);
    }
  }

  // click on a task
  taskdone(i) {
    const tasks = this.state.TODO_List;
    tasks[i].completed = !tasks[i].completed;
    DB.updatedone(tasks[i].id, tasks[i].completed);
    this.setState({
      TODO_List: tasks,
    });
  }

  deletetask(i) {
    // myArray.splice(0, 2)
    const tasks = this.state.TODO_List;
    DB.deleteTask(tasks[i].id);

    tasks.splice(i, 1);
    // tasks[i].completed = !tasks[i].completed;
    console.log('"tasks after delete"');
    console.log(tasks);
    this.setState({
      TODO_List: tasks,
    });
  }

  handleEdit(id, title) {
    console.log('"Edit task id = "');
    console.log(id);
    this.setState({
      editTaskId: id,
      editInput: title,
    });
  }

  hideDone() {
    console.log('hide : ');
    console.log(this.state.hide);
    const h = !this.state.hide;
    this.setState({
      hide: h,
    });
  }

  changeTaskEdit(event) {
    console.log('"Edit Task input"');
    // console.log(data);
    console.log(event.target.value);
    // console.log("event.target.innerText");
    // console.log(event.target.innerText);
    this.setState({
      editInput: event.target.value,
    });
  }

  cancelEditTask() {
    this.setState({
      editInput: '',
      editTaskId: -1,
    });
  }

  saveEditTask(index) {
    console.log('Save Edit Task');
    console.log(this.state.editInput);
    console.log(this.state.editTaskId);
    DB.UpdateTask(this.state.editTaskId, this.state.editInput);
    const tasks = this.state.TODO_List;
    tasks[index].title = this.state.editInput;

    this.setState({
      editInput: '',
      editTaskId: -1,
      TODO_List: tasks,
    });
  }

  addUserTask(event, data, taskId) {
    console.log('add User to Task');
    // console.log(event.target.innerText);
    console.log(data.text);
    console.log(data.label.color);
    DB.updateUserTask(data.value, taskId);
    const todoList = this.state.TODO_List;
    todoList.forEach((task, index) => {
      if (task.id === taskId) {
        const tsk = task;
        tsk.userId = data.value;
        tsk.userName = data.text;
        tsk.userColor = data.label.color;
        console.log(tsk);
        todoList[index] = tsk;
      }
    });
    console.log(todoList);

    this.setState({
      TODO_List: todoList,
    });
  }

  writeNewUser(event) {
    console.log('Enter New User name');
    console.log(event.target.value);
    this.setState({
      enteredNewUser: event.target.value,
    });
  }

  chooseUserColor(event, data) {
    console.log('Enter New User color');
    console.log(data.value);

    this.setState({
      enteredColor: data.value,
    });
  }

  addNewUser() {
    if (this.state.enteredNewUser) {
      // save in db
      DB.AddNewUser(this.state.enteredNewUser, this.state.enteredColor).then((response) => {
        const usrs = this.state.users;
        usrs.push({
          text: this.state.enteredNewUser,
          value: response.id,
          label: { color: this.state.enteredColor, empty: true, circular: true },
          // to: `/u/${response.id}`,
          // as: Link,
        });

        this.setState({
          enteredNewUser: '',
          users: usrs,
        });
      });
    }
  }

  deleteUserTask(taskId, taskIndex) {
    console.log('on delete task user function');
    console.log(taskId);
    console.log(taskIndex);
    DB.deleteUserTask(taskId);
    const tasks = this.state.TODO_List;
    tasks[taskIndex].userId = null;
    tasks[taskIndex].userName = null;
    tasks[taskIndex].userColor = null;

    this.setState({
      TODO_List: tasks,
    });
  }


  render() {
    const counter = this.taskCounter();
    const doneCounter = this.countDone();
    // <input type="text" className="NewTask" value={this.state.text}
    // onChange={(event) => this.handleText(event) }/>

    return (
      <Router>
        <DivApp>
          <DivHeader>
            <Header
              value={this.state.header}
              onClick={this.hideDone}
              hide={this.state.hide}
              done_counter={doneCounter}
              counter={counter}
              undone_counter={counter - doneCounter}

              newCollection={this.newCollection}
              addCollection={this.addCollection}
              collectionText={this.state.collection_input}

            />
          </DivHeader>
          <CollectionsTasks
            Collection_List={this.state.Collection_List}
            TODO_List={this.state.TODO_List}
            editTaskId={this.state.editTaskId}
            editInput={this.state.editInput}
            hide={this.state.hide}
            collection={this.state.collection}
            text={this.state.text}
            viewCollection={this.viewCollection}
            taskdone={this.taskdone}
            saveEditTask={this.saveEditTask}
            cancelEditTask={this.cancelEditTask}
            changeTaskEdit={this.changeTaskEdit}
            deletetask={this.deletetask}
            handleEdit={this.handleEdit}
            handleClick={this.handleClick}
            handleText={this.handleText}

            users={this.state.users}
            addUserTask={this.addUserTask}
            deleteUserTask={this.deleteUserTask}

            writeNewUser={this.writeNewUser}
            chooseUserColor={this.chooseUserColor}
            addNewUser={this.addNewUser}
          />
        </DivApp>
      </Router>
    );
  }
}

export default App;
