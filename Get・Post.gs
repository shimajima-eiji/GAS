function doGet() {
  property = _Initialize().property
  const data = SpreadSheet(property.id).getSheet(property.profile).dict;
  
  const payload = JSON.stringify(data);  
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(payload);
  return output;
}
