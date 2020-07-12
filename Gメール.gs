var Gmail = function ( debug )
{
  /**
   * 関数部
   */
  var _target = undefined;
  var _mailObjects = [];
  this.mailObjects = function(mailObjects) {
    var result = _mailObjects;
    if(mailObjects) {
      _mailObjects = mailObjects;
      result = this;
    }
    return result;
  }
  this.labelSearch = function( label )
  {
    if ( !is().str(label) ) return snippets.error( 'Gmail', label )
    
    Logger.log("デバッグ")

    /*
    _target = label;
    GmailApp.getUserLabelByName( label ).getThreads().forEach(function (object) {
      object.getMessages().forEach(function (messageObject){
        _mailObjects.push(messageObject);
      });
    });
    */
    return this;
  }
  
  /**
   * 転送したメールをスプレッドシートで管理しているため、
   */
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
  
  return this;
  /*
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
  */
};

function _gmail_test ()
{
  Logger.log(getProperties().gmail_label_connpass);
  Logger.log(new Gmail().labelSearch(getProperties().gmail_label_connpass));
//  .Gmail().toSlack( PROPERTIES.gmail_label_connpass, PROPERTIES.slack_incomming_connpass )
//  Gmail.search( getProperties().gmail_label_connpass ).forEach(function (mo) {
//    Logger.log(mo.getDate() + mo.getSubject());
//  });
  //, getProperties().slack_incomming_connpass
}
