import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const fakeBlog = {
    title: "Title",
    author:  "Test Tester",
    url: "http://test.com",
    likes: "3"
}
const fakeOnDelete = jest.fn()
const fakeOnLike = jest.fn()

let component

beforeEach(() => {
    component = render(
        <Blog blog={fakeBlog} username="FakeUsername" onDelete={fakeOnDelete} onLike={fakeOnLike} />
    )
})

test('blog start only with title and author', () => {
    const contractedDiv = component.container.querySelector('.contracted')
    const expandedDiv = component.container.querySelector('.expanded')
    
    expect(contractedDiv).not.toHaveStyle('display: none')
    expect(expandedDiv).toHaveStyle('display: none')

    expect(contractedDiv).toHaveTextContent('Test Tester')
    expect(contractedDiv).toHaveTextContent('Title')
    expect(contractedDiv).not.toHaveTextContent('http://test.com')
})

test('able to expand blog and show more content', () => {
    const contractedDiv = component.container.querySelector('.contracted')
    const expandedDiv = component.container.querySelector('.expanded')
    
    fireEvent.click(contractedDiv)

    expect(expandedDiv).not.toHaveStyle('display: none')
    expect(contractedDiv).toHaveStyle('display: none')

    expect(expandedDiv).toHaveTextContent('http://test.com')
})