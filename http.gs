function Fetch(endpoint, options, method) {
  return JSON.parse(UrlFetchApp.fetch( endpoint, {headers: options, method: (method) ? 'POST' : 'GET' }));
}

function _http_test() {
  Logger.log(getProperties());
  /*
  const endpoint = 'https://nomuraya.microcms.io/api/v1/daily';
  const result = Fetch(endpoint, {'X-API-KEY': 'ade31905-e097-435c-97d9-d10e58e0972d'});
  Logger.log(result);
  */
}
