import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const SelectCollection = props =>
  (
    <div>
      <Dropdown
        placeholder="Select collections"
        fluid
        selection
        options={props.collectionList}
        onChange={props.viewCollection}
        defaultValue={0}
      />
    </div>
  );
export default SelectCollection;
