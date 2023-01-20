export default function authHeader() {
  let token = JSON.parse(localStorage.getItem('JWT'));

  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}
