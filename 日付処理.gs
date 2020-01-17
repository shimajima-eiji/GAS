function zeroPadding(num, digit) {
  if(digit > -1) digit *= -1;
  return ('0' + num).slice(digit);
}

function setDate(day) {
  const setWeek = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'Thursday',
    5: 'friday',
    6: 'saturday',
  }
  
  var object = new Date();
  object.setDate(object.getDate() + (day || 0));
  const result = {
    year: object.getFullYear(),
    month: zeroPadding(object.getMonth() + 1, 2),
    day: zeroPadding(object.getDate(), 2),
    weeknum: object.getDay(),
  };
  result.ym = '' + result.year + result.month;
  result.ymd = '' + result.ym + result.day;
  result.md = '' + result.month + result.day;
  result.week = i18n().getWeek()[setWeek[result.weeknum]];

  return result;
}