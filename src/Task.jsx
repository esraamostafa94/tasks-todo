import React from 'react';
import { List, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

// Task item
const Task = (props) => {
  let P = styled.p``;
  if (props.value.completed) {
    P = styled.p`
      text-decoration: line-through;
    `;
  }
  if (((props.hide && !props.value.completed) || !props.hide)
  && (props.collection === 0 || props.collection === props.value.collection)) {
    return (
      <List.Item>
        <List.Content floated="right">
          <Button.Group>
            <Button icon onClick={() => props.handleEdit(props.value.id, props.value.title)} >
              <Icon
                name="edit"
              />
            </Button>
            <Button icon onClick={() => props.deleteTask()} >
              <Icon name="delete" />
            </Button>
          </Button.Group>
        </List.Content>
        <List.Content onClick={() => props.onClick()} >
          <List.Header as="a"><P>{props.value.title}</P></List.Header>
          <List.Description as="a">{props.collectionName}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
  return (null);
};

export default Task;
