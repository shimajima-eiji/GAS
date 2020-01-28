var Gmail = function ( debug )
{
  var threads = undefined;
  var target = undefined;
  var sheet = undefined;
  var update = undefined;

  /**
   * 関数部
   */
  var search = function ( label )
  {
    if ( !is().str(label) ) return snippets.error( 'Gmail', label )
    
    target = label;
    threads = GmailApp.getUserLabelByName( target ).getThreads();
    var result = [];
    threads.forEach(function (object) {
      object.getMessages().forEach(function (messageObject){
        result.push(messageObject);
      });
    });
    return result;
  }
  
  var filter = function() {
    sheet = new SpreadSheet(getProperties().spreadsheet_id_gmail).getSheet();

    var result = [];
    for ( var i = threads.length - sheet.dict[label] - 1; i > -1; i-- )
    {
      thread = threads[ i ].getMessages();
      thread.forEach( function ( messageObject )
      {
        result.push(messageObject);
      } );
    }
    update = result;
    return result;
  }
  
  var toSlack = function(webhook) { 
    if ( debug || !webhook ) webhook = catchWebhook('Slack');
    
    
    
//        toSlack( messageObject, threads[ i ].getPermalink(), target.webhook );
//    sheet.update(label, [label, count]);
//    sheet.save();
  }
  return {
    search: search,
    filter: filter,    
    toSlack: function ( messageObject, parmalink, webhook )
    {
      if ( !messageObject || !parmalink ) return error( 'notfound', 'Gmail.toSlack' );
      Slack().send(
        messageObject.getPlainBody(),
        webhook || _debug().api( 'Slack' ),  // GmailのエラーだがSlackAPIを使う。
        DateUtil( messageObject.getDate() ).format( 'YYYY年MM月DD日 HH:mm:ss' ),
        messageObject.getSubject() + '： ' + parmalink
      );
    }
  }
}('debug');

function _gmail_test ()
{
  Gmail.search( getProperties().gmail_label_connpass ).forEach(function (mo) {
    Logger.log(mo.getDate() + mo.getSubject());
  });
  //, getProperties().slack_incomming_connpass
}
