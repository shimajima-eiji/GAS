/**
 * 潜在バグの温床になるのでSnippetsプロジェクトはシートとの連携はしないこと
 */
var SpreadSheet = function ( id )
{
  const book = ( id )
    ? SpreadsheetApp.openById( id )
    : SpreadsheetApp.getActive();

  return {
    "book": book.getSheets(),
    "getSheet": function ( target )
    {
      target = (target) ? book.getSheetByName(target) : book.getSheets()[0]
      const header = 0;
      const array = target.getDataRange().getValues();
      const table = {
        header: array[ header ],
        body: []
      };
      var row = 0;
      array.filter( function ( rows, index )
      {
        if ( row > 0 ) table.body[ row - 1 ] = rows;
        row++;
        return index === 0;
      } );
      const dict = table.body.reduce(function(prev, object, index) {
        if(index == 1) prev = {};
        prev[object[0]] = object[1];
        return prev;
      });

      return {
        array: array,
        table: table,
        dict: dict
      };
    },
  };
}
