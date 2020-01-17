function Gmail2Slack () {
  // 
  const PROPERTIES = snippets.getProperties('_connpass');

  // slackにメールを転送するルールを設定。メールの条件はgmail側で管理する
  main({from: PROPERTIES.gmail_label_connpass, to: PROPERTIES.slack_channel_connpass, webhook: PROPERTIES.slack_webhook_connpass});
}

var main = function(target)
{
  if(!target.from || !target.to || !target.webhook) return;
  const threads = GmailApp.getUserLabelByName( target.from ).getThreads();

  const gsObjects = snippets.spreadSheet();
  const sheetArray = gsObjects.getSheet();

  for ( var i = threads.length - sheetArray.table.body.length - 1; i > -1; i-- )
  {
    thread = threads[ i ].getMessages();
    thread.forEach( function ( messageObject )
    {
      snippets.sendMail( target, messageObject, threads[ i ].getPermalink() );
      // 【TODO:1】
    } );
  }
}
