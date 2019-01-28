import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from 'react-testing-library';
import withMockedProviders from '../withMockedProviders';

import SignInComponent from './SignIn';

describe('SignIn', () => {
  afterEach(cleanup);

  it('snapshot renders correctly', () => {
    const SignIn = withMockedProviders()(SignInComponent);
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('password field can be toggled', () => {
    const SignIn = withMockedProviders()(SignInComponent);
    const { queryByLabelText, getByLabelText } = render(<SignIn />);
    expect(queryByLabelText(/Password/i).type).toBe('password');
    fireEvent.click(getByLabelText(/Toggle password visibility/i));
    expect(queryByLabelText(/Password/i).type).toBe('text');
  });
});
