import React from 'react';
import { List, Button, Icon, Label, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

let P = styled.p``;

// Task item
const Task = (props) => {
  // let P = styled.p``;
  if (props.value.completed) {
    P = styled.p`
      text-decoration: line-through;
    `;
  }
  const user = props.value.userId ? (
    <Label color={props.value.userColor} key={props.value.userId} to={`/u/${props.value.userId}`} as={Link} >
      {props.value.userName}
      <Icon
        name="delete"
        onClick={props.deleteUserTask}
      />
    </Label>
  ) : null;

  if (((props.hide && !props.value.completed) || !props.hide)
  && (props.collection === 0 || props.collection === props.value.collection)
  && (props.userId === 0 || props.userId === props.value.userId)) {
    return (
      <List.Item>
        <List.Content floated="right">
          {user}
          <Button.Group>
            {props.usersList}
            <Button icon onClick={() => props.handleEdit(props.value.id, props.value.title)} >
              <Icon name="edit" />
            </Button>
            <Button icon onClick={() => props.deleteTask()} >
              <Icon name="delete" />
            </Button>
          </Button.Group>
        </List.Content>
        <List.Content onClick={() => props.onClick()} >
          <List.Header as="a" color="teal">
            <P><Header as="h4" color={props.value.userColor}>{props.value.title}</Header></P>
          </List.Header>
          <List.Description as="a">{props.collectionName}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
  console.log("didn't enter");
  return (null);
};

export default Task;
