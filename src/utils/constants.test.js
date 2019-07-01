import { foo } from 'utils/constants';

describe('Constants', () => {
  it('should be a constant', () => {
    expect(foo).toEqual(1);
  });
});
