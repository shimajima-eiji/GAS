var Gmail = function (debug)
{
  return {
    toSlack: function ( messageObject, parmalink, webhook )
    {
      if ( !messageObject || !parmalink ) return error( 'notfound', 'Gmail.toSlack' );

      Slack().send(
        messageObject.getPlainBody(),
        webhook || _debug().api('Slack'),  // GmailのエラーだがSlackAPIを使う。
        DateUtil(messageObject.getDate()).format('YYYY年MM月DD日 HH:mm:ss'),
        messageObject.getSubject() + '： ' + parmalink
      );
    }
  }
};

function _gmail_test(){
  var messageObject = {
    getPlainBody: function() {return 'body'},
    getDate: function() {return '2020-01-22T06:19:14.000Z'},
    getSubject: function() {return 'subject'},
  };
  Gmail().toSlack(messageObject, 'https://google.com');
}
