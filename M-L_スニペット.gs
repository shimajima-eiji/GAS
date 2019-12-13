var Module = function() {
  var Dict = function() {
    function Dict() {
      this.haskey = function(object, key) {
        return (
          object
          ? (
            object.hasOwnProperty(key)
            ? true
            : false
          )
          : false
        );
      };
    };
    return Dict;
  }();
  
  var getDate = function(str) {
    this.obj = new Date(str);
    function zfill(obj) {
      return ("0" + obj).slice(-2);
    }
    var ret = {
      "str": this.obj.toString(),
      "Year": this.obj.getFullYear(),
      "Month": this.obj.getMonth() + 1,
      "Day": this.obj.getDay(),
      "Hour": this.obj.getHours(),
      "Minute": this.obj.getMinutes(),
      "Second": this.obj.getSeconds(),
    };
    ret.Ymd = [ret.Year, zfill(ret.Month), zfill(ret.Day)].join("/");
    ret.HMS =[zfill(ret.Hour), zfill(ret.Minute), zfill(ret.Second)].join(":");
    ret.YmdHMS = ret.Ymd + ' ' + ret.HMS;
    ret.Full = this.obj.toLocaleString();
    return ret;
    
    /*
    function test() {
    Logger.log(getDate("2019-12-14T13:00:00"));
    }
    //*/
  }
  
  return {
    "Dict": Dict,
    "getDate": getDate,
  };
}
