function Fetch() {
  var _run = function(endpoint, options) {
    var result = undefined;
    try {
      result = JSON.parse(is().has(options) ? UrlFetchApp.fetch( endpoint, options) : UrlFetchApp.fetch( endpoint ));
    } catch(e) {
      error('http.Fetch', endpoint + ' / ' + options);
    }
    return result;
  }
  var _filter = function(label, target) {
    const property = getProperties(target);
    const endpoint_pattern =  ['incomming', 'outgoing'];
    const api_pattern =  ['token'];
    const result = {};
    var tmp;

    Object.keys(property).map(function(key) {
      if (key.indexOf(label) == -1) return;

      tmp = key.split('_')[1];
      if(endpoint_pattern.indexOf(tmp) > -1) {
        tmp = 'endpoint';
      }
      if(api_pattern.indexOf(tmp) > -1) {
        tmp = 'key';
      }
      result[tmp] = property[key];
    });

    return (is().has(result)) ? result : undefined;
  }

  var _microcms = function(target) {
    return _filter(target, 'microcms');
  }
  var _slack = function(target) {
    return _filter(target, 'slack');
  }
  var _line = function(target) {
    return _filter(target, 'line');
  }

  this.microcms = _microcms;
  this.slack = _slack;
  this.line = _line;
  this.run = _run;

  return this;  
}

function _http_test() {
  Logger.log(new Fetch().slack('latest'));
}
