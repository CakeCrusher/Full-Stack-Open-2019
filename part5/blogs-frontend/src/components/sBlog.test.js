import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
    title: 'Its the title',
    author: 'Mr. Author',
    likes: 5
}
let component
const fakeHandler = jest.fn()
beforeEach(() => {
    const blog = {
        title: 'Its the title',
        author: 'Mr. Author',
        likes: 5
    }
    
    component = render(
        <SimpleBlog blog={blog} onClick={fakeHandler} />
    )
})

test('component renders title', () => {
    const gen_info = component.container.querySelector('.general-info')
    expect(gen_info).toHaveTextContent('Its the title')
})
test('component contains author', () => {
    const gen_info = component.container.querySelector('.general-info')
    expect(gen_info).toHaveTextContent('Mr. Author')
})
test('component renders likes', () => {
    const like_info = component.container.querySelector('.likes-info')
    expect(like_info).toHaveTextContent('5')
})

test('if like button is pressed twice the event handler is used twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(fakeHandler.mock.calls.length).toBe(2)
})