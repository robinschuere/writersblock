import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../generic/button';

test('Button', () => {
  const onHandleClick = (event) => {
    expect(event).toEqual('');
  };

  const component = renderer.create(
    <Button onClick={onHandleClick}>TEXT</Button>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
