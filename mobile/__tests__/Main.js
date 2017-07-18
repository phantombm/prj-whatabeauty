import React from 'react';
import 'react-native';
import testRenderer from 'react-test-renderer';

import Main from '../scenes/Main';

test('renders correctly', () => {
  const tree = testRenderer.create(
    <Main />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
