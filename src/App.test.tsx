import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

// test('renders learn react link', () => {
//   render(<App />)
//   const linkElement = screen.getByText(/learn react/i)
//   expect(linkElement).toBeInTheDocument()
// })

// describe('my function or component', () => {
//   test('does the following', () => {
//     // add your testing output
//   })
// })

describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true)
  })

  test('false is falsy', () => {
    expect(false).toBe(false)
  })
})
