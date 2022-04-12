import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import DummyBlog from './DummyBlog'

test('renders blogs title, author and likes', () => {
  const blog = {
    title: 'Uusi testiblogi',
    author: 'Testi Testinen',
    likes: 99
  }

  const component = render(
    <DummyBlog blog={blog} />
  )

  const blogInfo = component.container.querySelector('.blog')
  expect(blogInfo).toHaveTextContent(
    'Uusi testiblogi Testi Testinen'
  )

  const likes = component.container.querySelector('.like')
  expect(likes).toHaveTextContent('99')
  console.log(prettyDOM(blogInfo))
  console.log(prettyDOM(likes))
})


test('clicking the like-button twice calls event handler twice', () => {
  const blog = {
    title: 'Testiblogi part 3',
    author: 'Testaaja part 3',
    likes: 100
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <DummyBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})