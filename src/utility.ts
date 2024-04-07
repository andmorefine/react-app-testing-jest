export function getFormattedUserName(username: string) {
  return !username.startsWith('@') ? `@${username}` : username
}
