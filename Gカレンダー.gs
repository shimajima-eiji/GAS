var getCalendar = function(day, id) {
  if(!is().num(day) && !is().str(id)) return error('Gcalendar', day + id);

  function _format(date, format) {
    return DateUtil(date).format(is().str(format) ? format :'HH:MM');
  }
  var results = [];
  CalendarApp.getCalendarById(id).getEventsForDay(DateUtil().add(day, 'd').toDate()).forEach(function (event){
    result = {};
    result.day = DateUtil(event.getStartTime());
    result.week = parseInt(result.day.format('d'));
    result.start = _format(event.getStartTime());
    result.start_hour = parseInt(result.start.slice(0, 2));
    result.start_minute = parseInt(result.start.slice(-2));
    result.end = _format(event.getEndTime());
    end_hour = parseInt(result.end.slice(0, 2));
    result.end_hour = (end_hour) ? end_hour : 24;
    result.end_minute = parseInt(result.end.slice(-2));
    result.title = event.getTitle();
    result.location = event.getLocation();
    results.push(result);
  });
  return results;
}

function _test_getCalendar(){
  Logger.log(getCalendar(0, getProperties().gcalendar_id_onsite));
}

/**
 * カレンダー用の拡張モジュール
 */
var calendarUtil = {
  id: {
    onsite: getProperties().gcalendar_id_onsite,
    remote: getProperties().gcalendar_id_remote,
  },
  getEvents: function(startSunday, dayRange) {
    if(!is().num(startSunday)) startSunday = 0;
    if(!is().num(dayRange)) dayRange = 7;  // default: days weekend, 30: month

    function _getCalendar(calendar_id, targetday, viewdays) {
      var results = [];
      function _getDate(day, hour) {
        hour = (is().num(hour)) ? hour : 0;
        return DateUtil().add(day, 'd').hour(hour).minute(0).second(0).toDate();
      }
      var date;
      var result;
      range(viewdays).forEach(function (week) {
        date = targetday + week;
        getCalendar(date, calendar_id).forEach(function (event) {
          result = {};
          result.start = _getDate(date, event.start_hour);
          result.end = _getDate(date, event.end_hour);
          results.push(result);
        });
      });
      return results
    }

    var targetday = -parseInt(DateUtil().add(startSunday, 'd').format('d'));
    
    var results = {};
    results.remote = _getCalendar(calendarUtil.id.remote, targetday, dayRange);
    results.onsite = _getCalendar(calendarUtil.id.onsite, targetday, dayRange);
    return results;
  }
}

function _test_calendarUtil() {
  Logger.log(calendarUtil.getEvents());
}