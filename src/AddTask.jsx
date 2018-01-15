import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const AddTask = (props) => {
  let disabled = false;
  if (props.collection === 0) {
    disabled = true;
  }
  return (
    <Input
      fluid
      action={<Button onClick={props.onClick} disabled={disabled} > Add Task </Button>}
      placeholder="Add New Task..."
      value={props.value}
      onChange={props.onChange}
      disabled={disabled}
    />
  );
};

export default AddTask;
