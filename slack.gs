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
      var result = false;
      if(!value) return error(logging('slack', 'notfound'), 'Slack.send{value: ' + value);
      if (debug || !webhook) webhook = _debug().api('Slack');

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
      try {
        UrlFetchApp.fetch( webhook, options );
        result = true;
      } catch(e) {
        error('slack', 'webhook: ' + webhook);
      }
      return result;
    }
  };
}

function _slack_test(){
  Slack('debug').send('test', getProperties.slack_incomming_latest, 'title');
}
