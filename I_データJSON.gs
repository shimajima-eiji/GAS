//in-outインターフェース。データを持たない
var doorway = function() {
  function input(obj) {
    return jsonFormat;
  }
  function output(target) {
    var services = {
      "line": Line,
    }
    return services[target];
  }
}

//TODO: JSONフォーマット。メソッドを持たない
//TODO: 呼び出し順が考慮されていない
/*
var json_format = function(obj) {
  Logger.log(Dict);
  this.name = (Dict.haskey(obj,"name") ? obj.name : Undefined)
  , this.from = obj.from
  , this.to = obj.to
  ;
  return this;
};
*/
