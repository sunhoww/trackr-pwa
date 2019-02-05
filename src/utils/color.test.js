import { getIndex, getInitials } from './color';

describe('getIndex', () => {
  it('returns correct value', () => {
    expect(getIndex('A', 16)).toEqual(1);
    expect(getIndex('Az', 10)).toEqual(7);
  });
});

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
