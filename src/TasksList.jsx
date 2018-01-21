import React from 'react';
import { List, Dropdown, Label, Input, Select, Button, Icon } from 'semantic-ui-react';
import EditTask from './EditTask';
import Task from './Task';

// let open = false;
// const stayOpen = () => {
//   open = true;
//   console.log('"click on user list"');
// };

const TasksList = (props) => {
  const colors = ['teal', 'red', 'orange', 'yellow', 'olive', 'green',
    'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
  const options = [];
  colors.forEach((colour, index) => {
    options.push({
      key: index,
      text: <Label empty circular color={colour} key={colour} />,
      value: colour,
    });
  });
  const list = props.todoList.map((item, index) => {
    console.log('item.openUserList', item.openUserList);
    let colName = '';
    if (props.Collection_List[item.collection]) {
      // console.log('Colection name');
      // TODO Change it
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
        index={index}
        deleteUserTask={() => props.deleteUserTask(item.id, index)}
        value={item}
        hide={props.hide}
        onClick={() => props.taskdone(index)}
        collection={
          Number(props.match.params.collectionId) ? Number(props.match.params.collectionId) : 0
        }
        userId={Number(props.match.params.userId) ? Number(props.match.params.userId) : 0}
        collectionName={colName}
        deleteTask={() => props.deletetask(index)}
        handleEdit={(id, title) => props.handleEdit(id, title)}
        addUserTask={props.addUserTask}

        usersList={(
          <Dropdown
            button
            className="icon"
            trigger={(
              <Icon name="add user" onClick={() => props.stayUserListOpen(index)} />
            )}
            open={item.openUserList}
            onBlur={() => props.onBlurUserList(index)}
          >
            <Dropdown.Menu>
              <Input
                type="text"
                placeholder="Add New User..."
                action
                onChange={props.writeNewUser}
              >
                <Select
                  compact
                  options={options}
                  defaultValue="teal"
                  onChange={props.chooseUserColor}
                />
                <input />
                <Button type="submit" onClick={() => props.addNewUser(index)}>Add User</Button>
              </Input>
              <Dropdown.Divider />
              <Dropdown.Header content=" Choose The User " />
              <Dropdown.Menu scrolling>
                {props.users.map(option => (
                  <Dropdown.Item
                    onClick={(event, data) => props.addUserTask(event, data, item.id, index)}
                    key={option.value}
                    {...option}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Menu>
          </Dropdown>
        )}
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
