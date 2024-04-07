import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import '@testing-library/jest-dom/extend-expect'
import fetchMock from 'jest-fetch-mock'

// Jestのグローバル設定にfetchMockを有効化
fetchMock.enableMocks()

beforeEach(() => {
  // 各テストの実行前にfetchのモックをリセット
  fetchMock.resetMocks()
})

test('renders user list correctly', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      { id: 1, name: 'Yamada Hanako', username: 'Yamada' },
      { id: 2, name: 'Tanaka Taro', username: 'Tanaka' },
    ]),
  )

  render(<App />)

  await waitFor(() => {
    expect(screen.getByText('Yamada Hanako -- (@Yamada)')).toBeInTheDocument()
    expect(screen.getByText('Tanaka Taro -- (@Tanaka)')).toBeInTheDocument()
  })
})

test('fetch and display user repos upon submitting a username', async () => {
  fetchMock.mockResponses([
    JSON.stringify([
      { id: 1, name: 'repo1' },
      { id: 2, name: 'repo2' },
    ]),
    { status: 200 },
  ])

  render(<App />)

  // ユーザー名を入力
  userEvent.type(screen.getByPlaceholderText('GitHub username'), 'test{enter}')

  // レポジトリが表示されるのを待つ
  await waitFor(() => {
    expect(
      screen.getByText((content) => content.startsWith('repo1')),
    ).toBeInTheDocument()
    expect(
      screen.getByText((content) => content.startsWith('repo2')),
    ).toBeInTheDocument()
  })
})
