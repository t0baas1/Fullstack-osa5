import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('when clicking container all info is shown', () => {
  const blog = {
    title: 'Testiympäristön toinen blogi',
    author: 'Testi testikäyttäjä',
    url: 'www.testi.com',
    likes: 666
  }

  const mockHandler = jest.fn()

  const { getByTestId } = render (
    <Blog blog={blog} onClick={mockHandler} />
  )
  const content = getByTestId('container')
  expect(content).toHaveTextContent('Testiympäristön toinen blogi')
  expect(content).not.toHaveTextContent('www.testi.com')
  expect(content).not.toHaveTextContent('likes 50')
  fireEvent.click(content)

  expect(content).toHaveTextContent('Testiympäristön toinen blogi')
  expect(content).toHaveTextContent('www.testi.com')
  expect(content).toHaveTextContent('likes 666')
})