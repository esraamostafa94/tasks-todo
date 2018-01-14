import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const SelectCollection = (props) => {

  return (
    <Dropdown
      placeholder="Select collections"
      fluid
      selection
      options={props.collectionList}
      onChange={props.viewCollection}
    />
  );
};

export default SelectCollection;
