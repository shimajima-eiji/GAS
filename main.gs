function Gmail2Slack () {
  const PROPERTIES = PropertiesService.getScriptProperties().getProperties();

  // slackにメールを転送するルールを設定。メールの条件はgmail側で管理する
  main({from: PROPERTIES.label1, to: PROPERTIES.target1, webhook: PROPERTIES.webhook1});
}

var main = function(target)
{
  if(!target.from || !target.to || !target.webhook) return;
  const threads = GmailApp.getUserLabelByName( target.from ).getThreads();

  const gsObjects = snippet.spreadSheet();
  const sheetArray = gsObjects.getSheet();

  for ( var i = threads.length - sheetArray.table.body.length - 1; i > -1; i-- )
  {
    thread = threads[ i ].getMessages();
    thread.forEach( function ( messageObject )
    {
      snippet.sendMail( target, messageObject, threads[ i ].getPermalink() );
      // 【TODO:1】
    } );
  }
}
