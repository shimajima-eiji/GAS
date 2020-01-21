var error = function(exception, message) {
  switch(exception) {
    case 'notfound':
    default:
      Logger.log(exception + ' / ' + message);
  }
}

// 他プロジェクト用のデバッガ
function debug(mes) {
  Logger.log(mes);
  Slack().send(mes, getProperties().slack_incomming_debug);
}

// 本プロジェクト用のデバッガ
function _debug() {
  Logger.log('debug');
}
