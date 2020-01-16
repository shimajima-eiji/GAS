var PROPERTIES = PropertiesService.getScriptProperties().getProperties();

function sendEmailsToSlack ()
{
  const threads = GmailApp.getUserLabelByName( PROPERTIES.label ).getThreads();

  const gsObjects = spreadSheet();
  const sheetArray = gsObjects.getSheet();

  var pointer = 0;
  for ( var i = threads.length - sheetArray.table.body.length - 1; i > -1; i-- )
  {
    thread = threads[ i ].getMessages();
    thread.forEach( function ( messageObject )
    {
      sendMail( messageObject, threads[ i ].getPermalink() );
    } );
  }
}

var sendMail = function ( messageObject, parmalink )
{
  Logger.log( messageObject.getDate() );
  Logger.log( messageObject.getSubject() );
  Logger.log( messageObject.getPlainBody() );
  Logger.log( parmalink );

  const payload = {
    "username": messageObject.getDate(),
    "attachments": [
      {
        "color": "#36a64f",
        "title": messageObject.getSubject(),
        "fields": [
          {
            "value": '\n' + messageObject.getPlainBody(),
            "short": false
          }
        ],
      }
    ],
    "channel": PROPERTIES.slack_send,
  };

  const options = {
    'method': 'post',
    'payload': Utilities.jsonStringify( payload ),
  };
  UrlFetchApp.fetch( PROPERTIES.slack_webhook, options );

};

var spreadSheet = function ( id )
{
  var obj = ( id === undefined )
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
