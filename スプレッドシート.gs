/**
 * 潜在バグの温床になるのでSnippetsプロジェクトはシートとの連携はしないこと
 */
var SpreadSheet = function ( id )
{
  /**
   * シートの内容を取得する
   * 更新のたびにAPIを叩きまくるのを回避するため、一度だけ呼ばれるようにする。
   */
  this.getSheet = function(sheet) {
    _target = undefined;
    try {
      if(is().str(sheet)) {
        _target = _book.getSheetByName(sheet);
        this.sheet = sheet;
      } else {
        _target = _book.getSheets()[0];
      }
    } catch(e) {
      error('SpreadSheet', 'getSheet');
    }

    _array = _target.getDataRange().getValues();
    this.upsert = _upsert;
    return _updateSheet('getSheet');
  }
  
  function _updatePointer() {
    const pointer = {};
    _array[0].forEach(function(value, index) {
      pointer[value] = index;
    });
    _pointer = pointer;
  }
  function _updateTable() {
    const table = {header: [], body: []};
    _array.forEach(function(object, index) {
      if(index == 0) {
        table['header'] = object
      } else {
        table['body'].push(object);
      }
    });
    _table = table;
  }
  function _updateDict() {
    const dict = {};
    _array.forEach(function(object) {
      dict[object[0]] = object[1];
    });
    _dict = dict;
  }
  function _updateJson() {
    const json = {length: _table.body.length, values: []};
    _table.body.forEach(function(columns) {
      columns.forEach(function(value, index) {
        tmp = {};
        tmp[_table.header[index]] = value;
        json.values.push(tmp);
      });
    });
    _json = json;
  }
  /**
   * シートを取得・更新した際、tableやdictなど各情報を更新する。
   */
  function _updateSheet(debug)
  {
    _updatePointer();
    _updateTable();
    _updateDict();
    _updateJson();
    return;
  }
  
  /**
   * シートを更新する。
   * 外から呼び出される。値が変更されたのでsaveを許可する
   * @params
   *   value(str or array): 必須。
   *   label(str): valueがstrなら必須。
   */
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
    return _updateSheet('upsert');
  }
  
  /**
   * シートをスプレッドシートに適用する。
   */
  function save()
  {
    _target.getRange(1, 1, _array.length, _array[0].length).setValues(_array);  // 行, 列の順
  }
  
  _book = is().str(id)
  ? SpreadsheetApp.openById( id )
  : SpreadsheetApp.getActive();
  
  _array = [];  // setterとか保護を考えたほうがいい
  _target = undefined;
  _table = {header: [], body: []};
  _dict = {};
  _pointer = {};
  _json = {};

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
  this.json = function(json) {
    var result = _json;
    if(json) {
      _json = json;
      result = this;
    }
    return result;
  }
  return this;
}

function _spreadsheet_test() {
  const s = SpreadSheet(getProperties().spreadsheet_id_connpass);
  s.getSheet();
  s.upsert([true, 'テスト', '日付']);
  Logger.log(s.json());
//  s.save();
}
