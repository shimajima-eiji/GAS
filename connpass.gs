/**
 * トリガー
 */
function today ()
{
  specify( 0 );
}

function tomorrow ()
{
  specify( 1 );
}

function next ()
{
  Connpass.getNextEvent( 1 );
}

/**
 * モジュール
 */
var Connpass = function ()
{
  var PROPERTIES = snippets.getProperties();
  /**
   * 【関数部】
   */
  function _callApi ( param )
  {
    if ( param === undefined ) return undefined;

    var endpoint = 'https://connpass.com/api/v1/event/';
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

  function _format ( event )
  {
    return '\n\n'
      + snippets.DateUtil( event.started_at ).format( 'HH:MM' ) + ' ' + event.title + '\n'
      + ( ( event[ 'catch' ] ) ? ( event[ 'catch' ] ) + '\n' : '' )
      + event.address + ' ' + event.place + '\n'
      + snippets.shortUrl( event.event_url );
  }

  function _send ( value, webhook, title )
  {
    snippets.Slack().send( value, webhook || PROPERTIES.slack_incomming_log, title || undefined );
  }

  /**
   * 実行部
   */
  function getEvents ( specify )
  {
    day = snippets.DateUtil();
    if ( snippets.is.num( specify ) ) day.add( specify, 'd' );
    const events = _callApi( {
      ymd: day.format( 'YYYYMMDD' ),
      count: '100',
    } );

    // spreadsheetで管理
    const exclude_address = [ '中区', '大阪', '京都府', '沖縄', '名古屋', '福岡', '札幌', '岡山', '宮城', '島根', '鳥取' ]
    var skip_flg;

    const title = '【' + day.format( 'M月D日' ) + '】 イベント配信分';
    var counter = 0;
    const send_point = 15;
    const message = events.reduce( function ( prev, event, index )
    {
      if ( index == 1 ) prev = '';
      skip_flg = false;
      exclude_address.forEach( function ( exclude )
      {
        if ( event.address )
          if ( event.address.indexOf( exclude ) > -1 ) skip_flg = true;
      } );
      if ( skip_flg ) return prev;

      // 詰め込みすぎると入り切らないので適宜処理
      counter += 1;
      if ( counter % 10 == 0 )
      {
        _send( prev, PROPERTIES.slack_incomming_latest, title );
        prev = '';
      }
      return prev + _format( event );
    } );
    _send( message, PROPERTIES.slack_incomming_latest, title );
  }

  function getNextEvent ( specify ) // 廃止予定。今後はGカレンダーAPIで取る
  {
    const events = _callApi( { nickname: PROPERTIES.connpass_username_nomuraya } )
    const now = snippets.DateUtil();
    const body = events.reduce( function ( prev, event, index )
    {
      if ( index == 1 ) prev = '';
      day = snippets.DateUtil( event.ended_at ).diff( now, 'd', true );
      return ( snippets.is().num( specify ) )
        ? ( specify - 1 <= day && day <= specify ) ? prev + _format( event ) : prev
        : ( day >= 0 ) ? prev + _format( event ) : prev;
    } );

    const message = now.format( 'M月D日' ) + '以降のイベント参加状況\n' + body
    // 取得値が異常であるため、送信を止める
    // snippets.Line( message, PROPERTIES.line_bot_token );
    // _send( message );
  }

  /**
   * 返却
   */
  return {
    getEvents: getEvents,
    getNextEvent: getNextEvent,
  };
}();

function specify ( target )
{
  if ( snippets.is.num( target ) ) Connpass.getEvents( target );
}
