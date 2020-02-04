function doGet(e) {
  const property = _Initialize().property
  const s = SpreadSheet(property.id)
  s.getSheet(property.profile)
  return forDoGet(s.dict());
}

var forDoGet = function(json) {
  ContentService.createTextOutput()
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent((is().str(json)) ? json : JSON.stringify(json));
  return output;
}

function _doGet_test() {
  Logger.log(doGet());
}