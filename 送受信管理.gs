/**
 * 非常に扱いが難しいが、今のうちに着手しておきたい
 * 受信についてはそれぞれのプロジェクトを立ててdoPostで受け取らせる。
 * なお、インターフェースに準拠させたい
 */
function apiManager(body) {
  const send = {
    slack: Slack().send(),
    gmail: Gmail().send(),
    line: Line().send(),
  };
  
  const required_keyName = ['body', 'webhook'];  // 必須キー
  
  /**
   * バリデーション
   */
  var func = undefined;
  for(key in send) {
    if(key == target) func = send[key];
  }
  if(func = undefined) return;

  func(object);  
}
