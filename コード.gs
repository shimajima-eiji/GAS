function sendEmailsToSlack() {
  const PROPERTIES = PropertiesService.getScriptProperties().getProperties();

    // target_label
    var label = GmailApp.getUserLabelByName(PROPERTIES.label);
    var messages = [];
    var threads = label.getThreads();

    for (var i = 0; i < threads.length; i++) {
      messages = messages.concat(threads[i].getMessages())
    }

    var message = messages[messages.length - 1];
    Logger.log(message);

    var output = '\n' + message.getPlainBody();
    Logger.log(output);

    // payload is customizable if u need
    var today = new Date();
    var payload = {
        "username": "hogehoge",
        "attachments": [
          {
            "color": "#36a64f",
            "author_link": "https://author_link",
            "title": "Something like title",
            "title_link": "Something like title_link",
            "fields": [
              {
                "value": output,
                "short": false
              }
            ],
          }
        ],
        "channel" : PROPERTIES.slack_send,
        "icon_emoji": ":cart:"
    };

    var options = {
        'method' : 'post',
        'payload' : Utilities.jsonStringify(payload),
    };

    var webhookUrl = PROPERTIES.slack_webhook;
    UrlFetchApp.fetch(webhookUrl, options);
}