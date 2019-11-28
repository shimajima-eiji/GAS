// [TODO] コピペで使っているものなので、READMEの通りに対応する
function auto_reply() {
    initialize();
    option
	//自動返信メールの件名
	var title = "【スケジュール調整依頼を受理しました（自動返信）】"; 

	//自動返信メールの本文1(\nは改行)
	var body
	= "「のむらやごろう」へのスケジュール調整依頼を受け付けました\n"
	+ "内容は次の通りです。\n"
	+ "------------------------------------------------------------\n\n"

	//自動返信メールの本文2(\nは改行)
	var body2
	= "------------------------------------------------------------\n\n"
	+ "内容を確認の上、あらためて返信させていただきます。\n";
 	+ "本メールに心当たりが無い場合は、その旨を記載の上ご返信下さいますようお願い申し上げます。\n\n";
 

 	//本文作成用の変数
	var sheet = SpreadsheetApp.getActiveSheet();
	var row = sheet.getLastRow(),
	    column = sheet.getLastColumn(),
	    range = sheet.getDataRange(),
	//メールアドレス保存用の変数(最後のメール送信時に使用。)
	    mail = "",
        header = "",
        value = "";

	for (var i = 1; i <= column; i++ ) {
		//スプレッドシートの入力項目名を取得
		header = range.getCell(1, i).getValue(); 
		//スプレッドシートの入力値を取得
		value = range.getCell(row, i).getValue();

		//本文1(body)にスプレッドシートの入力項目を追加
		body += "■"+header+"\n";
 
		//本文1(body)にフォームの入力内容を追加
		body += value + "\n\n";
 
		//スプレッドシートの入力項目が「お名前」の場合は、「様」を付け本文の前に追加
		if ( header === PROPERTIES.GFORM_NAME ) {
     		body = value+" 様\n\n"+body;
   		}
 
		//フォームの入力項目が「メールアドレス」の場合は、変数mailに代入
   		if ( header === PROPERTIES.GFORM_MAIL ) {
     		mail = value;
   		}
 	}
 	//本文1に本文2を追加
	body += body2;
 
	//宛名＝mail、件名＝title、本文=bodyで、メールを送る
	GmailApp.sendEmail(mail,title,body);
	//GmailApp.sendEmail(PROPERTIES.SLACK_MAIL,title,body);
}