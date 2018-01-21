import React from 'react';
import { Route } from 'react-router-dom';
import SelectCollection from './SelectCollection';
import TasksList from './TasksList';
import AddTask from './AddTask';

const CollectionsTasks = props =>
  (
    <div>
      <SelectCollection
        collectionList={props.Collection_List}
        viewCollection={props.viewCollection}
      />
      <Route
        exact
        path="/"
        render={routeProps => (
          <TasksList
            {...routeProps}
            todoList={props.TODO_List}
            Collection_List={props.Collection_List}
            editTaskId={props.editTaskId}
            editInput={props.editInput}
            hide={props.hide}
            collection={props.collection}
            taskdone={props.taskdone}
            saveEditTask={props.saveEditTask}
            cancelEditTask={props.cancelEditTask}
            changeTaskEdit={props.changeTaskEdit}
            deletetask={props.deletetask}
            handleEdit={props.handleEdit}

            users={props.users}
            addUserTask={props.addUserTask}
            deleteUserTask={props.deleteUserTask}

            writeNewUser={props.writeNewUser}
            chooseUserColor={props.chooseUserColor}
            addNewUser={props.addNewUser}

            stayUserListOpen={props.stayUserListOpen}
            onBlurUserList={props.onBlurUserList}

          />
        )}
      />
      <Route
        path="/u/:userId"
        render={routeProps => (
          <TasksList
            {...routeProps}
            todoList={props.TODO_List}
            Collection_List={props.Collection_List}
            editTaskId={props.editTaskId}
            editInput={props.editInput}
            hide={props.hide}
            collection={props.collection}
            taskdone={props.taskdone}
            saveEditTask={props.saveEditTask}
            cancelEditTask={props.cancelEditTask}
            changeTaskEdit={props.changeTaskEdit}
            deletetask={props.deletetask}
            handleEdit={props.handleEdit}

            users={props.users}
            addUserTask={props.addUserTask}
            deleteUserTask={props.deleteUserTask}

            writeNewUser={props.writeNewUser}
            chooseUserColor={props.chooseUserColor}
            addNewUser={props.addNewUser}
          />
        )}
      />
      <Route
        path="/c/:collectionId"
        render={routeProps => (
          <TasksList
            {...routeProps}
            todoList={props.TODO_List}
            Collection_List={props.Collection_List}
            editTaskId={props.editTaskId}
            editInput={props.editInput}
            hide={props.hide}
            collection={props.collection}
            taskdone={props.taskdone}
            saveEditTask={props.saveEditTask}
            cancelEditTask={props.cancelEditTask}
            changeTaskEdit={props.changeTaskEdit}
            deletetask={props.deletetask}
            handleEdit={props.handleEdit}

            users={props.users}
            addUserTask={props.addUserTask}
            deleteUserTask={props.deleteUserTask}

            writeNewUser={props.writeNewUser}
            chooseUserColor={props.chooseUserColor}
            addNewUser={props.addNewUser}

          />
        )}
      />
      <AddTask
        collection={props.collection}
        onClick={() => props.handleClick()}
        value={props.text}
        onChange={props.handleText}
      />
    </div>
  );

export default CollectionsTasks;
