import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../generic/icon';

test('Button', () => {
  const component = renderer.create(
    <Icon name="icon" />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
