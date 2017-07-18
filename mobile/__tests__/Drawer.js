import React from 'react';
import 'react-native';
import testRenderer from 'react-test-renderer';

import Drawer from '../components/Drawer';

test('renders correctly', () => {
  const tree = testRenderer.create(
    <Drawer />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
