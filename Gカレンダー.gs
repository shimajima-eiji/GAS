var getCalendar = function(day, id) {
  if(!is().num(day) && !is().str(id)) return error('Gcalendar', day + id);

  function _format(date, format) {
    return DateUtil(date).format(is().str(format) ? format :'HH:MM');
  }
  var result = {};
  CalendarApp.getCalendarById(id).getEventsForDay(DateUtil().add(day, 'd').toDate()).forEach(function (event){
    result.day = DateUtil(event.getStartTime());
    result.week = result.day.format('dddd');
    result.start = _format(event.getStartTime());
    result.end = _format(event.getEndTime());
    result.title = event.getTitle();
    result.location = event.getLocation();
  });
  return (Object.keys(result).length) ? result : undefined;
}

function _test_getCalendar(){
  Logger.log(getCalendar(0, getProperties().gcalendar_id_connpass));
}