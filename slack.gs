/**
 * 備考：
 * フリープランでAppを使う場合、上限が少ないため同様の機能をこちらに実装したほうが良い。
 * https://○○○.slack.com/apps/manage 
 */
var Slack = function() {
  return {
    send: function(dateStr, titleStr, valueStr, webhook) {
      if(!dateStr || !titleStr || !valueStr || !channel || !webhook) return error('notfound', 'Slack.send');

      const payload = {
        "username": dateStr,
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
        ]
      };
      
      const options = {
        'method': 'post',
        'payload': JSON.stringify( payload ),
      };
      UrlFetchApp.fetch( webhook, options );
    }
  };
}

function test() {
  Slack().send();
}