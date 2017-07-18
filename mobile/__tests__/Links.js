import React from 'react';
import 'react-native';
import testRenderer from 'react-test-renderer';

import Links from '../scenes/Links';

test('renders correctly', () => {
  const tree = testRenderer.create(
    <Links />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
