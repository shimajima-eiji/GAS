function doGet(e) {
  const payload = JSON.stringify({key: PropertiesService.getScriptProperties().getProperties().apikey})
  ContentService.createTextOutput()
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(payload);
  return output;
}