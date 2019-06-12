import { getInitials, reduceToIndex } from './color';

describe('getInitials', () => {
  it('works for single word', () => {
    expect(getInitials('po')).toEqual('P');
  });
  it('works for multiple words', () => {
    expect(getInitials('po wang')).toEqual('PW');
    expect(getInitials('po qi wang')).toEqual('PW');
  });
  it('works for no word', () => {
    expect(getInitials()).toEqual('');
    expect(getInitials('')).toEqual('');
  });
});

describe('reduceToIndex', () => {
  it('returns correct value', () => {
    expect(reduceToIndex('A', 16)).toEqual(1);
    expect(reduceToIndex('Az', 10)).toEqual(7);
  });
});
