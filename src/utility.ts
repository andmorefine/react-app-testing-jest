export const getFormattedUserName = (username: string) => {
  return !username.startsWith('@') ? `@${username}` : username
}
