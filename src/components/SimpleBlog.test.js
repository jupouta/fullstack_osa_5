import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


test('renders content', () => {
  const blog = {
    title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    author: 'Kirjoittaja',
    likes: 0
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  component.debug()

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Komponenttitestaus tapahtuu react-testing-library:llä'
  )
  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent('blog has 0 likes')
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Komponenttitestauksen alkeet',
    author: 'Toinen Kirjoittaja',
    likes: 2
  }

  const mockHandler = jest.fn()
  console.log(blog)

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})