var sendMail = function ( target, messageObject, parmalink )
{
  if(!target || !messageObject || !parmalink) return error('notfound', 'sendMail');
  if(!target.to || !target.webhook) return error('notfound', 'sendMail');
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
    "channel": target.to,
  };

  const options = {
    'method': 'post',
    'payload': JSON.Stringify( payload ),
  };
  UrlFetchApp.fetch( target.webhook, options );

};
