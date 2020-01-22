var Gmail = function (debug)
{
  return {
    toSlack: function ( messageObject, parmalink, webhook )
    {
      if ( !messageObject || !parmalink ) return error( 'notfound', 'Gmail.toSlack' );

      Slack().send(
        messageObject.getPlainBody(),
        webhook || _debug().api('Slack'),  // GmailのエラーだがSlackAPIを使う。
        messageObject.getDate(),
        messageObject.getSubject() + '： ' + parmalink
      );
    }
  }
};

function _gmail_test(){
  var messageObject = {
    getPlainBody: function() {return 'body'},
    getDate: function() {return 'date'},
    getSubject: function() {return 'subject'},
  };
  Gmail().toSlack(messageObject, 'https://google.com');
}
