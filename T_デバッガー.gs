var Deb = function() {
  this.view = function(obj) {
    Logger.log(obj);
  },
  this.data = function(obj, str) {
    Logger.log(str);
    Logger.log(obj[str]);
  },
  this.method = function(obj, str) {
    Logger.log(str);
    Logger.log(obj(str));
  };
  return this;
}();
