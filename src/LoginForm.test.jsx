import { render } from '@testing-library/react';
import given from 'given2';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const form = {
    email: 'email',
    password: 'password',
  };

  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  function renderLoginForm() {
    return render(
      <LoginForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoggedIn={given.isLoggedIn}
      />,
    );
  }
  it('renders input controls', () => {
    const { getByRole } = renderLoginForm();

    expect(getByRole('textbox', { name: 'email' })).toHaveValue('email');
    expect(getByRole('textbox', { name: 'password' })).toHaveValue('password');
  });

  context('when logged in', () => {
    given('isLoggedIn', () => true);

    it('renders log out button', () => {
      const { getByRole } = renderLoginForm();

      expect(getByRole('button', { name: 'Log out' })).toBeInTheDocument();
    });
  });

  context('when not logged in', () => {
    given('isLoggedIn', () => false);

    it('renders log in button', () => {
      const { getByRole } = renderLoginForm();

      expect(getByRole('button', { name: 'Log In' })).toBeInTheDocument();
    });
  });
});
