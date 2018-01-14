import React, { Component } from 'react';
import { Dropdown, List } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import {browserHistory} from 'react-router';

import axios from 'axios';
import styled from 'styled-components';
import Header from './Header';
import AddTask from './AddTask';
import SelectCollection from './SelectCollection'
import DataBase from './DataBase'
import './App.css';

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

const DB = new DataBase();

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
    };

    // bind functions
    this.changeTaskEdit = this.changeTaskEdit.bind(this);
    this.viewCollection = this.viewCollection.bind(this);
  }

  componentDidMount() {
    DB.fetchTasks().then((response) => {
      console.log("I'm Here***********");
      console.log(response.data);
      this.setState({
        TODO_List: response.data,
      });
    });

    // TODO fetch Collections
    DB.fetchCollections().then((response) => {
      console.log("I'm Here***********");
      console.log(response.data);

      const items = [
        {
          text: 'ALL',
          value: 0,
        },
      ];
      response.data.forEach((item) => {
        const collec = {
          text: item.name,
          value: item.id,
          to: item.name,
        };
        items.push(collec);
      });Input, Button, Checkbox
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

    console.log(event.target.value);
    this.setState({
      collection: data.value,
      header: `My ${collectionName} TODO List`,
    });

    // browserHistory.push({
    //    pathname: collectionName
    // });
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
          to: this.state.collection_input,
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
    const h = !this.state.hide;
    this.setState({
      hide: h,
    });
  }
  // done_task = (event) => {
  //   console.log(event.target.value);
  //   this.setState({
  //     text: event.target.value,
  //  });
  // }

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

  // onChange={(event) => this.done_task(event,itm.task)}
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
              onClick={() => this.hideDone()}
              hide={this.state.hide}
              done_counter={doneCounter}
              counter={counter}
              undone_counter={counter - doneCounter}

              newCollection={(event, data) => this.newCollection(event, data)}
              addCollection={() => this.addCollection()}
              collectionText={this.state.collection_input}
            />
          </DivHeader>
          <SelectCollection
            collectionList={this.state.Collection_List}
            viewCollection={this.viewCollection}
          />
          <List divided relaxed>
            {list}
          </List>
          <AddTask
            collection={this.state.collection}
            onClick={() => this.handleClick()}
            value={this.state.text}
            onChange={this.handleText}
          />
        </DivApp>
      </Router>
    );
  }
}

export default App;
