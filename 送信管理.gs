/**
 * 非常に扱いが難しいが、今のうちに着手しておきたい
 */
function Sender(target, object) {
  const send = {
    slack: Slack.send(),
    gmail: Gmail.send(),
    line: '',
  };
  
  const interface = {
    
  }
  
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
