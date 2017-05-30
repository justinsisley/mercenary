import logout from './index';

describe('client/utils/logout', () => {
  it('returns a function', () => {
    assert.isFunction(logout);
  });

  it('does not throw', () => {
    assert.doesNotThrow(logout);
  });
});
