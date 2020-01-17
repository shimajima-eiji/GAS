/**
 * 備考：
 * フリープランでAppを使う場合、上限が少ないため同様の機能をこちらに実装したほうが良い。
 * https://○○○.slack.com/apps/manage 
 */
var Slack = function() {
  return {
    send: function(dateStr, titleStr, valueStr, channel, webhook) {
      const payload = {
        "username": messageObject.getDate(),
        "attachments": [
          {
            "color": "#36a64f",
            "title": titleStr,
            "fields": [
              {
                "value": '\n' + valueStr,
                "short": false
              }
            ],
          }
        ],
        "channel": channel,
      };
      
      const options = {
        'method': 'post',
        'payload': JSON.stringify( payload ),
      };
      UrlFetchApp.fetch( webhook, options );
    }
  };
}
