/**
 * 潜在バグの温床になるのでSnippetsプロジェクトはシートとの連携はしないこと
 */
var SpreadSheet = function ( id )
{
  function updateArray(label, value) {  // 改良の余地あり。表の列が異なる場合を想定していない。
    if (is().str(label)) array[pointer[label]] = value;
  }
  const book = ( id )
    ? SpreadsheetApp.openById( id )
    : SpreadsheetApp.getActive();
  
  var array;  // setterとか保護を考えたほうがいい
  var target;
  const table = {};
  const dict = {};
  const pointer = {};
  

  return {
    book: book.getSheets(),
    getSheet: function ( target )
    {
      target = ((target) ? book.getSheetByName(target) : book.getSheets()[0]).getDataRange()
      array = target.getValues();
      var table_target = 'header';
      array.forEach(function(object, index) {
        table[table_target] = object;
        dict[object[0]] = object[1];
        pointer[object[0]] = index;

        table_target = 'body';        
      });

      return {
        array: array,
        table: table,
        dict: dict,
        pointer: pointer,
        update: updateArray,
        save: function save() {
          target.setValues(array);
        },
      };
    },
  };
}
