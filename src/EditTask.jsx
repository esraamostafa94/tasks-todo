import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const EditTask = props => (
  <Input
    fluid
    action={
      <Button.Group>
        <Button onClick={() => props.editTask()} > Save </Button>
        <Button onClick={() => props.cancelEditTask()} > Cancel </Button>
      </Button.Group>
    }
    value={props.editInput}
    onChange={props.changeText}
  />
);

export default EditTask;
