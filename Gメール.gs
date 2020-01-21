var Gmail = function ()
{
  return {
    toSlack: function ( webhook, messageObject, parmalink )
    {
      if ( !webhook || !messageObject || !parmalink ) return error( 'notfound', 'Gmail.send' );

      Slack().send(
        messageObject.getPlainBody(),
        webhook,
        messageObject.getDate(),
        messageObject.getSubject() + '： ' + parmalink
      );
    }
  }
};
