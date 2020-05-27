import Welcome from 'components/Welcome';
import React from 'react';
import renderer from 'react-test-renderer';

test('Welcome renders', () => {
  const component = renderer.create(<Welcome />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
