import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Tester tester'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library Tester tester')
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Tester tester'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} />
  )

  const button = screen.getByText('view')
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})