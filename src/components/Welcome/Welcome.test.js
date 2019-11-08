import React from 'react';
import renderer from 'react-test-renderer';

import Welcome from 'components/Welcome';

test('Welcome renders', () => {
  const component = renderer.create(<Welcome />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
