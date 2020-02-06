/**
 * 備考：
 * フリープランでAppを使う場合、上限が少ないため同様の機能をこちらに実装したほうが良い。
 * https://○○○.slack.com/apps/manage 
 *
 * incommingは圧縮できるが、チャンネル名を変えた時の手間が死ねるのでやらない。
 * もし上限を迎えたら考えよう。
 */
var Slack = function(debug) {
  //slackのバリデーション
  function _validation(e, token) {
    var result = false;
    try {
      if (token == e.parameter.token) {
        result = true
      } else {
        error('Slack.get', '不正アクセスを検出');
      }
    } catch(e) {
      error('Slack.get', e);
    }
    return result;
  }

  return {
    get: function(e, token, webhook, title) {
      return _validation(e, token) ? ApiManager().format(e.parameter.text, e.parameter.user_name) : undefined;
    },
    send: function(value, webhook, username, title) {
      var result = false;
      if(!value) return error('Slack.send', 'Slack.send{value: ' + value);
      if (debug || !is().str(webhook)) webhook = _debug().api('Slack');

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
  const e = {
    parameter: {
      token: 'test',
      team_id: 'T0001',
      team_domain: '例',
      
      channel_id: 'test',
      channel_name: 'テスト',
      
      timestamp: '1355517523.000005',
      user_id: 'test',
      user_name: 'スティーブ',
      
      text: 'googlebot: 身軽なツバメの対気速度はどのくらい？',
      
      trigger_word: 'googlebot:'
    }
  };
  return e;  // for ApiManager

//  const object = Slack().get(e);
//  Logger.log(Slack().send(object.message, getProperties().slack_incomming_debug, object.title));
}
