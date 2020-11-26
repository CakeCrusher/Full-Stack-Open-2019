import React from 'react'
import {TestSignIn} from '../components/SignIn'
import {render, fireEvent, waitFor} from '@testing-library/react-native'


describe('SignIn', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        const onSubmit = jest.fn();
        const {getByTestId} = render(<TestSignIn onSubmit={onSubmit} />)

        fireEvent.changeText(getByTestId('username'), 'kalle')
        fireEvent.changeText(getByTestId('password'), 'password')
        fireEvent.press(getByTestId('submitButton'))

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1)
            expect(onSubmit.mock.calls[0][0]).toEqual({
                username: 'kalle',
                password: 'password'
            })
        });
      });
    });
  });