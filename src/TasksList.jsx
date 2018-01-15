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
          editTask={() => props.saveEditTask(index)}
          cancelEditTask={() => props.cancelEditTask()}
          changeText={props.changeTaskEdit}
          editInput={props.editInput}
        />
      );
    }

    return (
      <Task
        key={item.id}
        value={item}
        hide={props.hide}
        onClick={() => props.taskdone(index)}
        collection={
          Number(props.match.params.collectionId) ? Number(props.match.params.collectionId) : 0
        }
        collectionName={colName}
        deleteTask={() => props.deletetask(index)}
        handleEdit={(id, title) => props.handleEdit(id, title)}
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
