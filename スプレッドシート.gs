var spreadSheet = function ( id )
{
  const obj = ( id === undefined )
    ? SpreadsheetApp.getActive().getSheets()
    : SpreadsheetApp.openById( id ).getSheets();
  // return this.obj[0].getDataRange().getValues();

  return {
    "book": obj,
    "getSheet": function ( sheet, target )
    {
      target = ( target === undefined ) ? 0 : target;
      const header = 0;
      const array = obj[ target ].getDataRange().getValues();  // 二次配列で渡す
      const table = {  // pythonでいうdictで渡したい
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
      return {
        "array": array,
        "table": table,
      };
    },
  };
}
