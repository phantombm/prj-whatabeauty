import React from 'react';
import 'react-native';
import testRenderer from 'react-test-renderer';

import Tutorial from '../scenes/Tutorial';

test('renders correctly', () => {
  const tree = testRenderer.create(
    <Tutorial />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
