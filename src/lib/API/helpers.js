import decode from 'jwt-decode';
const ACCESS_TOKEN = 'access_token';

export default {
  setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN, token)
  },
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN)
  },
  isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
  }
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}


