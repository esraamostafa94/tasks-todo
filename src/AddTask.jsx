import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const AddTask = (props) => {
  let disabled = '';
  if (props.collection === 0) {
    disabled = 'disabled';
  }
  return (
    <Input
      fluid
      action={<Button onClick={() => props.onClick()} disabled={disabled} > Add Task </Button>}
      placeholder="Add New Task..."
      value={props.value}
      onChange={(event, data) => props.onChange(event, data)}
      disabled={disabled}
    />
  );
};

export default AddTask;
