import React from 'react'
import renderer, { act } from 'react-test-renderer'
import App from './App'

// ユニットテストで使用するダミーのユーザーデータ
const fakeUserData = [{ id: 1, name: 'Yamada Hanako', username: 'Yamada' }]

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve(
      new Response(JSON.stringify(fakeUserData), {
        status: 200,
        headers: { 'Content-type': 'application/json' },
      }),
    ),
  )
})

afterEach(() => {
  jest.restoreAllMocks()
})

test('check if it renders a correct snapshot', async () => {
  let tree = renderer.create(<App />)
  await act(async () => {
    tree.update(<App />)
  })
  expect(tree.toJSON()).toMatchSnapshot()
})
