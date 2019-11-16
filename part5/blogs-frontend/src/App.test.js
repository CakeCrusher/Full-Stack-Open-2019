import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
    test('if no user logged, blogs are not rendered', async () => {
        const component = render(<App />)
        component.rerender(<App />)

        await waitForElement(
            component.getByText('Login')
        )

        const loginForm = component.container.querySelector('.loginForm')
        const blogs = component.container.querySelector('.blog')

        expect(loginForm).not.toBe(undefined)
        expect(blogs).toBe(undefined)
        
    })

    test('if user logged in, blogs are rendered', async () => {
        const component = render(<App />)
        component.rerender(<App />)

        await waitForElement(
            component.getByText('Blogs')
        )

        const loginForm = component.container.querySelector('.loginForm')
        const blogs = component.container.querySelector('.blog')

        expect(loginForm).toBe(undefined)
        expect(blogs).not.toBe(undefined)
        
    })
})