var Line = function(debug) {
  return {
    send: function(message, token) {
      if(!message) return error('Line', 'message: ' + message);
      
      const properties = getProperties();
      const op = {
        "method" : "post",
        "payload": "message=" + message,
        "headers":{"Authorization" : "Bearer " + (token || properties.line_token_bot)}
      };
      try{
        UrlFetchApp.fetch(properties.line_incomming_notify, op);
      } catch(e) {
        error('Line', 'token: ' + token);
      }
    }
  }
}

function _line_test(){
  Line().send('test');
}
