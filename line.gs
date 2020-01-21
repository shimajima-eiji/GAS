var Line = function(message, token) {
  if(!message) return;
  
  const properties = getProperties('line_');
  const op = {
    "method" : "post",
    "payload": "message=" + message,
    "headers":{"Authorization" : "Bearer " + (token || properties.line_token)}
  };
  UrlFetchApp.fetch(properties.line_incomming, op);
}
