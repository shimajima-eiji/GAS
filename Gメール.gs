var Gmail = function() {
  return {
    toSlack: function( target, messageObject, parmalink ) {
      if(!target || !messageObject || !parmalink) return error('notfound', 'Gmail.send');
      if(!target.to || !target.webhook) return error('notfound', 'Gmail.send');
      Logger.log( messageObject.getDate() );
      Logger.log( messageObject.getSubject() );
      Logger.log( messageObject.getPlainBody() );
      Logger.log( parmalink );
      
      Slack().send(messageObject.getDate(),
                 messageObject.getSubject(),
                 messageObject.getPlainBody(),
                 target.to,
                 target.webhook);
    }
  }
};
