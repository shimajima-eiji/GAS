/**
 * プロパティの命名ルール
 * （どこにある）_（何の？）_（名前）
 * 名前は固有名詞であること
 *
 * 数が多くなりすぎて煩雑なのでSpreadSheetに管理を移行する
 */
var PROPERTIES = undefined;
function getProperties(label)
{
  if(!PROPERTIES) {
    const sheet = new SpreadSheet(_Initialize().property.id);
    sheet.getSheet();
    PROPERTIES = sheet.dict();
  }
  
  return (is().str(label)) ? searchObject(PROPERTIES, label) : PROPERTIES;
};

function searchObject(obj, str) {
  const keys = Object.keys(obj).filter(function(key, index){
    return (key.indexOf(str) > -1)
  });
  const result = {};
  keys.forEach(function (key){
    result[key] = obj[key];
  });
  return result;
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

var shortUrl = function(url) {
  var result = undefined;
  try {
    result = (is().str(url)) ? new Fetch().run( getProperties().api_service_shorturl + url).shorturl : url;
  } catch(e) {
    error('shortUrl', url);
  }
  return result;
}

var is = function(object) {
  /**
   * if比較が面倒くさいものを集約
   * valueを見るものはここでは扱わない
   */
  return {
    str: function(target) {return typeof(target) == 'string'},
    num: function(target) {return typeof(target) == 'number'},
    array: function(target) {return Array.isArray(target)},
    key: function(target) {return (object) ? (object[target] === undefined) ? false : true : false},
    has: function(target) {return (target) ? Object.keys(target).length > 0 : false},
  };
};
