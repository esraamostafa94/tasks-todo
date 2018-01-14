import React from 'react';
import { List } from 'semantic-ui-react';

import EditTask from './EditTask';
import Task from './Task';

const TasksList = (props) => {
  const list = props.todoList.map((item, index) => {
    let colName = '';
    if (props.Collection_List[item.collection]) {
      // console.log('Colection name');
      // // TODO Change it
      colName = props.Collection_List[item.collection].text;
      // console.log(colName);
    }

    if (props.editTaskId === item.id) {
      return (
        <EditTask
          key={item.id}
          editTask={() => this.saveEditTask(index)}
          cancelEditTask={() => this.cancelEditTask()}
          changeText={this.changeTaskEdit}
          editInput={props.editInput}
        />
      );
    }

    return (
      <Task
        key={item.id}
        value={item}
        hide={props.hide}
        onClick={() => this.taskdone(index)}
        collection={Number(props.match.params.collectionId)}
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
