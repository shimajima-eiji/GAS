function Gmail2Slack ()
{
  const PROPERTIES = snippets.getProperties();

  // slackにメールを転送するルールを設定。メールの条件はgmail側で管理する
  main( { from: PROPERTIES.gmail_label_connpass, webhook: PROPERTIES.slack_incomming_connpass } );
  main( { from: PROPERTIES.gmail_label_docs, webhook: PROPERTIES.slack_incomming_docs } );
}

var main = function ( target )
{
  // 【TODO】 Gメールで処理すべき内容が含まれているので、切り離しを考える
  if ( !target.from ) return snippets.error('Gmail', target.from);
  const threads = GmailApp.getUserLabelByName( target.from ).getThreads();

  const gsObjects = snippets.SpreadSheet();
  const sheetArray = gsObjects.getSheet();

  for ( var i = threads.length - sheetArray.table.body.length - 1; i > -1; i-- )
  {
    thread = threads[ i ].getMessages();
    thread.forEach( function ( messageObject )
    {
      snippets.Gmail().toSlack( messageObject, threads[ i ].getPermalink(), target.webhook );
    } );
  }
}
