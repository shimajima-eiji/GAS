function doGet() {
  return snippets.SpreadSheet().getSheet().array();
}