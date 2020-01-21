function doGet(e) {
  payload = JSON.stringify('{test: "hoge"}')
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(payload);
  return output;
}
