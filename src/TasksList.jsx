import React from 'react';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';

const TasksList = (props) => {
  const list = props.todoList.map((item, index) => {
    let colName = '';
    if (this.state.Collection_List[item.collection]) {
      // console.log('Colection name');
      // // TODO Change it
      colName = this.state.Collection_List[item.collection].text;
      // console.log(colName);
    }

    if (this.state.editTaskId === item.id) {
      return (
        <EditTask
          key={item.id}
          editTask={() => this.saveEditTask(index)}
          cancelEditTask={() => this.cancelEditTask()}
          changeText={this.changeTaskEdit}
          editInput={this.state.editInput}
        />
      );
    }

    return (
      <Task
        key={item.id}
        value={item}
        hide={this.state.hide}
        onClick={() => this.taskdone(index)}
        collection={this.state.collection}
        collectionName={colName}
        deleteTask={() => this.deletetask(index)}
        handleEdit={(id, title) => this.handleEdit(id, title)}
      />
    );
  });

  return (
    <List divided relaxed>
      {list}
    </List>
  );
};

export default TasksList;
