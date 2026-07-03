const ACCESS_TOKEN_KEY = 'theoria_books_access_token'

export const tokenService = {
  getAccessToken() {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY)
  },
  setAccessToken(token: string) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
  },
  clearAccessToken() {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  },
}
