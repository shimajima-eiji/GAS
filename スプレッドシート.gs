/**
 * 潜在バグの温床になるのでSnippetsプロジェクトはシートとの連携はしないこと
 */
var SpreadSheet = function ( id )
{
  this.getSheet = function(sheet) {
    _target = (sheet) ? _book.getSheetByName(sheet) : _book.getSheets()[0];
    _array = _target.getDataRange().getValues();
    this.find = _find;
    this.upsert = _upsert;
    return this.find();
  }
  function _find()
  {
    var pointer = _pointer;
    _array[0].forEach(function(value, index) {
      pointer[value] = index;
    });
    _pointer = pointer;
    
    var table_target = 'header';      
    var table = _table;
    var dict = _dict;
    _array.forEach(function(object, index) {
      _table[table_target] = object;
      _dict[object[0]] = object[1];
      
      table_target = 'body';        
    });
    _table = table;
    _dict = dict;
    return this;
  }
  function _upsert(value, label) {  // upsertなので列の追加を認めない
    if ( is().str(value) && is().str(label) && label in Object.keys(_pointer) ) {
      _array[_pointer[label]] = value;
    } else if (is().array(value) && _array[0].length == value.length) {
      _array.push([]);
      for(var i = 0; i < value.length; i++) {
        _array[_array.length-1][i] = value[i];
      }
    } else {
      return error('SpreadSheet', 'upsert error');
    }
    this.save = save;
    return this.find();
  }
  function save()
  {
    _target.getRange(1, 1, _array.length, _array[0].length).setValues(_array);  // 行, 列の順
  }
  
  _book = ( id )
  ? SpreadsheetApp.openById( id )
  : SpreadsheetApp.getActive();
  
  _array = [];  // setterとか保護を考えたほうがいい
  _target = undefined;
  _table = {};
  _dict = {};
  _pointer = {};

  this.array = function(array) {
    var result = _array;
    if(array) {
      _array = array;
      result = this;
    }
    return result;
  }
  this.table = function(table) {
    var result = _table;
    if(table) {
      _table = table;
      result = this;
    }
    return result;
  }
  this.dict = function(dict) {
    var result = _dict;
    if(dict) {
      _dict = dict;
      result = this;
    }
    return result;
  }

  return this;
}

function _spreadsheet_test() {
  const s = new SpreadSheet(getProperties().line_incomming_gas).getSheet();
  Logger.log(s.dict())
  s.upsert([true, 'テスト', '日付']);
  Logger.log(s.dict())
  Logger.log(s.array())
//  s.save();
}
