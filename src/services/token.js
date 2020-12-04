import jwtDecode from 'jwt-decode';

function getToken() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('token');
}

function getDecodedUser() {
  try {
    const decoded = jwtDecode(getToken());

    return decoded;
  } catch (error) {
    return null;
  }
}

export { getToken, getDecodedUser };
