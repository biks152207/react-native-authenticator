import 'react-native';
import React from 'react';
import { Login } from './login';
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

it('renders correctly', () => {
  const component = shallow(
    <Login />
  );
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot();
});