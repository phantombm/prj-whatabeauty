import React from 'react';
import 'react-native';
import testRenderer from 'react-test-renderer';

import Splash from '../scenes/Splash';

test('renders correctly', () => {
  const tree = testRenderer.create(
    <Splash />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
