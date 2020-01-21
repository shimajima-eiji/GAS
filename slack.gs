/**
 * 備考：
 * フリープランでAppを使う場合、上限が少ないため同様の機能をこちらに実装したほうが良い。
 * https://○○○.slack.com/apps/manage 
 *
 * incommingは圧縮できるが、チャンネル名を変えた時の手間が死ねるのでやらない。
 * もし上限を迎えたら考えよう。
 */
var Slack = function(debug) {
  
  return {
    send: function(value, webhook, username, title) {
      if(!value || !webhook) return error(Logging('slack', 'notfound'), 'Slack.send{value: ' + value + ' / webhook: ' + webhook);

      const payload = {
        "attachments": [
          {
            "color": "#36a64f",
            "fields": [
              {
                "value": value,
                "short": false
              }
            ],
          }
        ]
      };
      if(username) payload.username = username;
      if(title) payload.attachments.title = title;
      
      const options = {
        'method': 'post',
        'payload': JSON.stringify( payload ),
      };
      UrlFetchApp.fetch( (debug) ? getProperties('slack_incomming_debug').slack_incomming_debug : webhook, options );
    }
  };
}

function _test() {
  Slack().send('a', 'b', 'c', getProperties('slack_incomming_debug').slack_incomming_debug);
}