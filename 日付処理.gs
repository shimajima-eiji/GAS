var zeroPadding = function(num, digit) {
  if(digit > -1) digit *= -1;
  return ('0' + num).slice(digit);
}

var setDate = function(day) {
  // TODO:   Moment.moment();
  const setWeek = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'Thursday',
    5: 'friday',
    6: 'saturday',
  }

  var object;
  if(day === undefined) {
    object = new Date();
  } else if(typeof(day) === 'number') {
    object = new Date();
    object.setDate(object.getDate() + (day || 0));
  } else {
    object = new Date(day);
  }
  const result = {
    base: object,
    year: object.getFullYear(),
    month: zeroPadding(object.getMonth() + 1, 2),
    day: zeroPadding(object.getDate(), 2),
    hour: object.getHours(),
    minute: object.getMinutes(),
    second: object.getSeconds(),
    weeknum: object.getDay(),
    unixfull: object.getTime()
  };
  result.ym = '' + result.year + result.month;
  result.ymd = '' + result.ym + result.day;
  result.ymd_format = separator('/', [result.year, result.month, result.day]);
  result.ymd_format_jp = separator(result.year + '年' + result.month + '月' + result.day + '日');
  result['ymd-format'] = separator('-', [result.year, result.month, result.day]);
  result.md = '' + result.month + result.day;

  result.hm = '' + result.hour + result.minute;
  result.hms = '' + result.hm + result.second;
  result.hms_format = separator(':', [result.hour, result.minute, result.second]);
  result.hms_format_jp = separator(result.hour + '時' + result.minute + '分' + result.second + '秒');
  result.ms = '' + result.minute + result.second;

  result.ymdhm = '' + result.ymd + result.hm;
  result.ymdhms = '' + result.ymd + result.hms;
  result.ymdhms_format = result.ymd_format + ' ' + result.hms_format;
  result.ymdhms_format_jp = result.ymd_format_jp + ' ' + result.hms_format_jp;

  result.week = i18n().getWeek()[setWeek[result.weeknum]];
  result.unix = Math.floor( result.unixfull / 1000 );
  return result;
}
