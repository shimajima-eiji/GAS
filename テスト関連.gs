var error = function(exception, message) {
  switch(exception) {
    case 'notfound':
    case 'line':
    case 'slack':
    default:
      Logger.log(exception + ' / ' + message);
  }
}

// 他プロジェクト用のデバッガ
function debug(mes) {
  Logger.log(mes);
  Slack().send(mes);
}

// 本プロジェクト用のデバッガ
var _debug = function(message) {
  message = addString('debug') + message;
  return {
    api: function(funcName) {  // 大体はWebhookのエラーなのでそれ用に特化
      message += addString(funcName, '|');
      Logger.log(message);

      var result = getProperties();
      switch(funcName){
        case 'Slack':
          result = result.slack_incomming_debug;
          break;
        case 'Line':
          result = result.line_token_bot;
          break;
      }
      return result;
    }
  };
}
