import { getFormattedUserName } from './utility'

describe('utility', () => {
  test('getFormattedUserName は、すでに提供されている @ で始まる場合は @ を追加しません', () => {
    expect(getFormattedUserName('@hanako')).toBe('@hanako')
  })
})
