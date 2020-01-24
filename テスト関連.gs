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

// webhookを入れる処理すべてに適用する。送信エラーによる情報紛失を防ぐ
function catchWebhook(url) {
  function _get(target) {
    return (is().str(url)) ? url : getProperties()[target];
  }
  return {
    Slack: _get('slack_incomming_debug'),
    Line: _get('line_token_bot'),
  };
}

// 本プロジェクト用のデバッガ
var _debug = function(message) {
  message = addString('debug') + message || 'デバッグモード';
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
