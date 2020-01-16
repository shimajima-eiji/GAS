// [TODO] コピペで使っているものなので、READMEの通りに対応する
function auto_reply ()
{
  initialize();

  var option = {
    name: PROPERTIES.MAIL_NAME
  },
  sheet = SpreadsheetApp.getActiveSheet(),
  // for内
  to = "",
  body = "",
  dear = "",
  forTmp = {
    "columns": "",
    "value": "",
  };
  forTmp.row = sheet.getLastRow(),
    forTmp.column = sheet.getLastColumn(),
    forTmp.range = sheet.getDataRange();

  for ( var i = 1; i <= forTmp.column; i++ )
  {
    forTmp.columns = forTmp.range.getCell( 1, i ).getValue();
    forTmp.value = forTmp.range.getCell( forTmp.row, i ).getValue();
    body += "■" + forTmp.columns + "\n";

    switch ( forTmp.columns )
    {
      case PROPERTIES.GFORM_TIMESTAMP:
        forTmp.value = MODULES.getDate( forTmp.value ).YmdHMS;
        break;

      case PROPERTIES.GFORM_DATE:
        forTmp.value = MODULES.getDate( forTmp.value ).Ymd;
        break;

      case PROPERTIES.GFORM_START:
      case PROPERTIES.GFORM_END:
        forTmp.value = MODULES.getDate( forTmp.value ).HMS;
        break;

      case PROPERTIES.GFORM_NAME:
        dear = ( PROPERTIES.i18n == "ja" )
          ? forTmp.value + MESSAGES.gform.dear
          : MESSAGES.gform.dear + forTmp.value;
        break;

      case PROPERTIES.GFORM_MAIL:
        to = forTmp.value;
        ( forTmp.value )
          ? option.bcc = PROPERTIES.SLACK_MAIL
          : to = PROPERTIES.SLACK_MAIL;
        break;
    }
    body += forTmp.value + "\n\n";
  }
  GmailApp.sendEmail( to, PROPERTIES.MAIL_TITLE, dear + MESSAGES.gform.header + body + MESSAGES.gform.footer, option );
}
