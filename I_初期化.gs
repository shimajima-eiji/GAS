/**
 * 【注意】
 * 実行関数からここを呼び出さないと他の関数でundefinedになる
 * また、即時実行をすると外部ファイルの関数が見つからないためエラーになる。
 * 再設定をするためconstは使えない。
 */
var PROPERTIES;
var MESSAGES;
var initialize = function() {
  PROPERTIES = PropertiesService.getScriptProperties().getProperties();
  MESSAGES = new Message();
  MODULES = new Module();
}
