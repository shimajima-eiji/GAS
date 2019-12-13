// [TODO] コピペで使っているものなので、READMEの通りに対応する
function auto_reply ()
{
  initialize();

  var option = {
    name: PROPERTIES.MAIL_NAME
  }
    , sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getLastRow(),
    column = sheet.getLastColumn(),
    range = sheet.getDataRange(),
    // for内
    to = "",
    columns = "",
    value = "",
    dear = "",
    body = "";

  for ( var i = 1; i <= column; i++ )
  {
    columns = range.getCell( 1, i ).getValue();
    value = range.getCell( row, i ).getValue();
    body += "■" + columns + "\n";

    // フォームの入力項目により分岐
    // 「お名前」
    switch ( columns )
    {
      case PROPERTIES.GFORM_TIMESTAMP:
        value = MODULES.getDate( value ).YmdHMS;
        break;

      case PROPERTIES.GFORM_DATE:
        value = MODULES.getDate( value ).Ymd;
        break;

      case PROPERTIES.GFORM_START:
      case PROPERTIES.GFORM_END:
        value = MODULES.getDate( value ).HMS;
        break;

      case PROPERTIES.GFORM_NAME:
        dear = ( PROPERTIES.i18n == "ja" )
          ? value + MESSAGES.gform.dear
          : MESSAGES.gform.dear + value;
        break;

      case PROPERTIES.GFORM_MAIL:
        to = value;
        ( value )
          ? option.bcc = PROPERTIES.SLACK_MAIL
          : to = PROPERTIES.SLACK_MAIL;
        break;
    }
    body += value + "\n\n";
  }
  GmailApp.sendEmail( to, PROPERTIES.MAIL_TITLE, dear + MESSAGES.gform.header + body + MESSAGES.gform.footer, option );
}
