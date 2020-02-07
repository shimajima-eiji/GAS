function doGet() {
  var app = HtmlService.createTemplateFromFile("index.html");
  return app.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);;
}
