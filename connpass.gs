/**
 * トリガー
 */
function today ()
{
  _run( 0 );
}

function night ()
{
  Connpass.getNextEvent( 1 );
}

function tomorrow ()
{
  _run( 1 );
}

function week ()
{
  Connpass.getWeek();
}
/**
 * モジュール
 */
var Connpass = function ()
{
  const property = {
    common: snippets.getProperties(),
    local: PropertiesService.getScriptProperties().getProperties(),
  };

  /**
   * 【関数部】
   */
  function _callApi ( param )
  {
    if ( param === undefined ) return undefined;

    var endpoint = property.local.endpoint;
    var pointer = '?';
    for ( key in param )
    {
      endpoint += pointer + key + '=' + param[ key ];
      pointer = '&';
    }

    const events = JSON.parse( UrlFetchApp.fetch( endpoint ) ).events;
    snippets.asc( events, 'started_at' );

    return events;
  }

  function _format ( event, format )
  {
    return '\n\n'
      + snippets.DateUtil( event.started_at ).format( ( format ) ? format : property.local.format_hm ) + ' ' + event.title + '\n'
      + ( ( event[ 'catch' ] ) ? ( event[ 'catch' ] ) + '\n' : '' )
      + event.address + ' ' + event.place + '\n'
      + snippets.shortUrl( event.event_url );
  }

  function _send ( value, webhook, title )
  {
    snippets.Slack().send( value, webhook || property.common.slack_incomming_log, title || undefined );
  }
  /**
   * 実行部
   */
  function getEvents ( specify )
  {
    const day = snippets.DateUtil();
    if ( snippets.is().num( specify ) ) day.add( specify, 'd' );
    const events = _callApi( {
      ymd: day.format( 'YYYYMMDD' ),
      count: '100',
    } );

    // TODO: おおよそ共通処理なので抜き出したい。forEach内のAPIでは制御できない除外条件をどうにか渡せれば可能
    const exclude_address = [ '中区', '大阪', '京都府', '沖縄', '名古屋', '福岡', '札幌', '岡山', '宮城', '島根', '鳥取' ];
    const title = '【' + day.format( property.local.format_md ) + '】 イベント配信分';
    var tmp;
    var counter = 0;
    events.forEach( function ( event )
    {
      // 住所がexclude_addressに含まれる場合は除外する
      var exclude_flg = false;
      exclude_address.forEach( function ( exclude )
      {
        if ( event.address )
          if ( event.address.indexOf( exclude ) > -1 ) exclude_flg = true;
      } );
      if ( exclude_flg ) return;

      tmp += _format( event );
      counter++;
      if ( counter % 10 == 0 )
      {
        _send( tmp, property.common.slack_incomming_latest, title );
        tmp = '';
      }
    } );
    if ( tmp ) _send( tmp, property.common.slack_incomming_latest, title );
  }

  function getWeek ()
  {
    const day = snippets.DateUtil();
    const week = 7;
    const weekobj = day.add( week, 'd' )
    const events = _callApi( {
      keyword: property.local.location,
      ym: day.format( property.local.format_ym ) + ',' + weekobj.format( property.local.format_ym ),
      count: '100',
    } );

    // TODO: おおよそ共通処理なので抜き出したい。forEach内のAPIでは制御できない除外条件をどうにか渡せれば可能
    const title = '【' + weekobj.format( property.local.format_md ) + '】 までの近辺の勉強会';
    const format = property.local.format_mdhm;
    var tmp;
    var counter = 0;
    events.forEach( function ( event )
    {
      // 7日以外で19時以降のイベントを除外する
      var target_day = snippets.DateUtil( event.started_at );
      var diff = target_day.diff( day, 'd' );
      if ( 1900 < target_day.format( property.local.format_hm ) ) return;
      if ( diff < 0 || week < diff ) return;

      tmp += _format( event, format );
      counter++;
      if ( counter % 10 == 0 )
      {
        _send( tmp, property.common.slack_incomming_latest, title );
        tmp = '';
      }
    } );
    if ( tmp ) _send( tmp, property.common.slack_incomming_latest, title );
  }

  function getNextEvent ( specify )
  {
    /**
     * for文中の処理を集約
     * day(number): var i
     */
    function _set ( day )
    {
      var calendar = snippets.getCalendar( day, id );
      return ( calendar )
        ? ( check() ? ( ( specify ) ? '明日' : '今日' ) : calendar.day.format( property.local.format_md ) ) + 'の予定 ' + calendar.start + '～' + calendar.end + ' ' + calendar.title + '\n（'
        + calendar.location + '）\n\n'
        : '';
    }

    /**
     * 入力を判定するロジックが随所にあるので集約
     * 可読性に問題を感じたのでバラしたところ、本関数が不要に近い状態になった
     * 必要であればなくしてしまおう
     */
    function check ()
    {
      return snippets.is().num( specify );
    }

    const id = property.common.gcalendar_id_connpass;
    const week = 7;
    const start = ( check() ) ? specify : 0;
    const end = ( check() ) ? start + 1 : week;

    var message = '';
    for ( var i = start; i < end; i++ )
    {
      message += _set( i );
    }
    if ( message )
    {
      if ( check() ) snippets.Line().send( property.local.title_line + message, property.common.line_bot_token );
      _send( message, property.common.slack_incomming_log, property.local.title_slack );
    }
  }

  /**
   * 返却
   */
  return {
    getEvents: getEvents,
    getNextEvent: getNextEvent,
    getWeek: getWeek,
  };
}();

function _run ( target )
{
  if ( snippets.is().num( target ) )
  {
    Connpass.getEvents( target );
    Connpass.getNextEvent( target );
  }
}
