import React from 'react';
import 'react-native';
import testRenderer from 'react-test-renderer';

import Header from '../components/Header';

test('renders correctly', () => {
  const tree = testRenderer.create(
    <Header />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('add', () => {
  const header = new Header();

  expect(header.add(5 , 10)).toBe(15);
  expect(header.add(-5 , 10)).toBe(5);
  expect(header.add(5 , -10)).toBe(-5);
  expect(header.add(-5 , -10)).toBe(-15);
});
