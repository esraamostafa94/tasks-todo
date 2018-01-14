import React from 'react';
import styled from 'styled-components';
import { Input, Button, Checkbox } from 'semantic-ui-react';

import Task from './Task';
import EditTask from './EditTask';



const Topic = styled.h1`
text-align: center;
`;

const HeaderSwitch = styled.div`
  text-align: right;
`;

const Header = (props) => {
  return (
    <div>
      <Topic>{props.value}</Topic>

      <HeaderSwitch>
        <Checkbox toggle onClick={() => props.onClick()} checked={props.hide} />
      </HeaderSwitch>

      <p className="counter"><sub>{props.counter} Tasks </sub></p>
      <p className="counter"><sub>{props.done_counter} Done </sub></p>
      <p className="counter"><sub>{props.undone_counter} Uncompleted </sub></p>
      <div>
        <Input
          action={<Button onClick={() => props.addCollection()}> Add Collection </Button>}
          placeholder="Add New Collection..."
          value={props.collectionText}
          onChange={(event, data) => props.newCollection(event, data)}
        />
      </div>
    </div>
  );
};

export default Header;