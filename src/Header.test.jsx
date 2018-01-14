import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Header from './Header';


test('renders without crashing', () => {
  const component = renderer.create(
    <Header header="TODO List"/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
