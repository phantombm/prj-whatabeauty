import React from 'react';
import 'react-native';
import testRenderer from 'react-test-renderer';

import DrawerContent from '../components/DrawerContent';

test('renders correctly', () => {
  const tree = testRenderer.create(
    <DrawerContent />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
