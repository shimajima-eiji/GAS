/**
 * プロパティの命名ルール
 * （どこにある）_（何の？）_（名前）
 * 名前は固有名詞であること
 *
 * 数が多くなりすぎて煩雑なのでSpreadSheetに管理を移行する
 */
var getProperties = function ()
{
  return SpreadSheet(_Initialize().property.id).getSheet().dict;
}

var asc = function ( array, target )
{
  array.sort( function ( a, b )
  {
    if ( a[target] < b[target] ) return -1;
    if ( a[target] > b[target] ) return 1;
    return 0;
  } );
  return array;
}

var separator = function(sep, arr) {
  return arr.reduce(function( prev, value, index ) {
    return (index==0) ? value : prev + sep + value;
  });
}

var addString = function(target, string, closer) {
  if(!string) {
    string = '[';
    closer = ']';
  } else if(!closer) {
    closer = string;
  }
  return string + target + closer;
}

var zeroPadding = function(num, digit) {
  if(digit > -1) digit *= -1;
  return ('0' + num).slice(digit);
}
