function doGet(e) {
  const s = new snippets.SpreadSheet();
  s.getSheet();
  return snippets.forDoGet(s.dict());
}

function _doGet_test() {
  Logger.log(doGet());
}