import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const SelectCollection = props =>
  (
    <Dropdown
      placeholder="Select collections"
      fluid
      selection
      options={props.collectionList}
      onChange={props.viewCollection}
      defaultValue={0}
    />
  );
export default SelectCollection;
