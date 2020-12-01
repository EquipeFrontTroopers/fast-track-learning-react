function getToken() {
  const queryString = window.location.search;
  return queryString.substring(1);
}

export default getToken;
