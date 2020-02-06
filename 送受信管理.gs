/**
 * 非常に扱いが難しいが、今のうちに着手しておきたい
 * 受信についてはそれぞれのプロジェクトを立ててdoPostで受け取らせる。
 * なお、インターフェースに準拠させたい
 */
var ApiManager = function(debug) {
  const _debug = debug || false;
  this.format = function(message, title, webhook, date) {
    const result = {
      message: is().str(message) ? message : '不正なメッセージです。',
      title: is().str(title) ? title : undefined,
      webhook: is().str(webhook) ? webhook : undefined,
      date: date || DateUtil().format('YYYY/MM/DD HH:MM:SS'),
    };

    // 不正な文字列などが入っていないか、ここでvalidateする
    if(!is().str(message)) {
      error('ApiManager', message);
      _debug = true;
    }
    return result;
  }
  
  const _functions = {
    slack: Slack(_debug),
    gmail: Gmail(_debug),
    line: Line(_debug),
  };

  this.get = function() {
    const result = {};
    Object.keys(_functions).forEach(function(func) {
      if(_functions[func].get != undefined) {
        result[func] = _functions[func].get;
      };
    });
    return result;
  }()
  return this;
}

function _ApiManager_test() {
  const e = _slack_test();
  Logger.log(ApiManager().get.slack(e));
}
