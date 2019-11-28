/**
 # 
 # How to Use
 _mergeはObject.assignの代わり
 ここだけ別APIで切り出して使うべきでは？と思わないでもない。
 
 コードからはMESSAGE.(キー名).(キー名)で呼び出したい。
 今は暫定対応として、プロパティにi18nが設定が必要
 */
var Message = function() {
  
  /**
   * 関数部
   */
  function _merge(obj) {
    // Object.assignはES6からなので使えない
    for(key in obj){
      return_messages[key] = obj[key];
    }
  }
  function _finish() {
    return return_messages;
  }
  /**
   * インターフェース部
   * i: interface
   * MESSAGEで呼び出されるプロパティを拡張する。
   * イケてない作りになっているのはObject.assignが使えないから仕方なくやってる。
   * だから_mergeを返り値に指定している。
   * [TODO]: もっとスマートにできる。絶対にできる
   */
  return_messages = {}
  function i_debug(obj) {
    return _merge(
      {
        "debug": {
          "message": obj,
          "success": "成功",
          "fail": "失敗",
          "skip": "スキップ",
        }
      });
  }

  /**
   * 定義部
   * 実際に表示させる内容はこれ。
   * インターフェースの引数の数だけ文字列を渡してやると、自動的にメッセージができる仕組み。
   * そもそもenumが使えればこんな事はしない
   */

  var ja = function() {
    i_debug("デバッグ中");
    return _finish();
  },
  en = function() {
    return _finish();
  }
  const i18n = {
    "ja": ja,
    "en": en,
  };
  /**
   * 実行部
   */
  function Message() {
    return (PROPERTIES.i18n in i18n) ? i18n[PROPERTIES.i18n] : i18n["ja"];
  }
  return Message()();  // 関数を返すので実行させて返す
}