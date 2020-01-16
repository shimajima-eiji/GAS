var error = function(exception, message) {
  switch(exception) {
    case 'notfound':
    default:
      Logger.log(exception + ' / ' + message);
  }
}

function debug(mes) {
  Logger.log(mes);
}

// 本プロジェクト用のデバッガ
function _debug() {
  
}
