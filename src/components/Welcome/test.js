import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';
import Welcome from 'components/Welcome';
import React from 'react';

test('Button click should increment count', function () {
  render(<Welcome />);

  expect(screen.getByRole('button')).toHaveTextContent('Or click me for fun! (0)');
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('button')).toHaveTextContent('Or click me for fun! (1)');
});
