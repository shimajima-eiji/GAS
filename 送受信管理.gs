/**
 * 非常に扱いが難しいが、今のうちに着手しておきたい
 * 受信についてはそれぞれのプロジェクトを立ててdoPostで受け取らせる。
 * なお、インターフェースに準拠させたい
 */
var ApiManager = function(debug) {
  this.debug = debug || false;
  const check = function(message, title, webhook, date) {
    const result = {
      message: is().str(message) ? message : '不正なメッセージです。',
      title: is().str(title) ? title : undefined,
      webhook: is().str(webhook) ? webhook : undefined,
      date: date || DateUtil().format('YYYY/MM/DD HH:MM:SS'),
    };

    // 不正な文字列などが入っていないか、ここでvalidateする
    if(!is().str(message)) {
      error('ApiManager', message);
      result.debug = true;
    }
    return result;
  }
  
  return {
    get: {
      slack: Slack().get,
    },
    send: {
      slack: Slack(this.debug).send,
      gmail: Gmail(this.debug).send,
      line: Line(this.debug).send,
    },
  };
}

function _ApiManager_test() {
  Logger.log(ApiManager().get.slack);
}
