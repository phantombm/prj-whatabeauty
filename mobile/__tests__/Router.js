import React from 'react';
import 'react-native';
import testRenderer from 'react-test-renderer';

import Router from '../routers/Router';

test('renders correctly', () => {
  const tree = testRenderer.create(
    <Router />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
