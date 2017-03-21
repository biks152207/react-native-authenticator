import React from 'react';
import { Login } from './login';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Link changes the class when hovered', () => {

  const login = shallow(
    <Login />
  );

  const tree = shallowToJson(login);
  expect(tree).toMatchSnapshot();

});