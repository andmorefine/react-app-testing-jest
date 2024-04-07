import { getFormattedUserName } from './utility'

describe('utility', () => {
  test('getFormattedUserName はユーザー名の先頭に @ を追加します', () => {
    expect(getFormattedUserName('hanako')).toBe('@hanako')
  })
})
