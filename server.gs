function doGet(request) {
  var template = 'index';
  return HtmlService.createTemplateFromFile(template).evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function getSheetData(){
  var spreadSheetID = "1gjk5stEVeQxTC2ZJNI5znPSybMwhL0BoqtOxI5lskOA";
  var sheetName = "シート1";
  var res = SpreadsheetApp.openById(spreadSheetID)
    .getSheetByName(sheetName).getDataRange().getDisplayValues();

  Logger.log(res);
  return res;
}