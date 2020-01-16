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
  
  var spreadSheet = function(id) {
    var obj = (id === undefined)
    ? SpreadsheetApp.getActive().getSheets()
    : SpreadsheetApp.openById(id).getSheets();
    // return this.obj[0].getDataRange().getValues();

    return {
      "book": obj,
      "setSheet": function(sheet) {
        
        var array = obj[0].getDataRange().getValues();
        var table = {
          columns: array[0]
        };
        array.filter(function(rows, index) {
          return index === 0;
        });
        return {
          "array": array,
          "table": table,
        };
      },
    };
  }
  /*
  var data = {};
  for (var i = 0, l = values.length; i < l; i++) {
    var key = values[i].shift();
    if (key.length > 0) {
      data[key] = values[i];
    }
  }
  */
  
  return {
    "Dict": Dict,
    "getDate": getDate,
    "ss": spreadSheet,
  };
}

function test() {
  initialize();
  var ss = MODULES.ss(PROPERTIES.GFORM_ID);
  Logger.log(ss.setSheet(0).table);
}