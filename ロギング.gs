/**
* エラーメッセージ集
* どうせならi18nに対応する
* 
* 【作り方】
* 構造は「メッセージリスト.言語.対象」とし、対象は必ずkeyを持つ。
* 対象はkeyにないものを追加することはできない
*/  
var logging = function(target, key, lang) {
  const ini = _Initialize();
  // TODO: どうやってSpreadSheetで管理しようか
  const message = {
    gmail: {
      ja: {
        notfound: '【Gメールの転送に失敗】',
        illegal: '【存在しない変数／キーを取得】'
      },
      en: {
        notfound: 'Transfer failed',
      }
    },
    slack: {
      ja: {
        notfound: '【slackへの送信に失敗】',
      }
    }
  };

  if(!target in message) return debug('notfound');
  lang = (lang in message[target]) ? lang : ini.lang;

  return (key in message[target][lang])
    ? message[target][lang][key]
    : (key in message[target][ini.lang])
      ? message[target][ini.lang][key]
      : error(message[target][ini.lang].illegal, key);
}
