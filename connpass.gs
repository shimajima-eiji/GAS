/**
 * トリガー
 */
function today ()
{
  Connpass().getEvents( 0 );
}

function tomorrow ()
{
  Connpass().getEvents( 1 );
}

function next ()
{
  Connpass().getNextEvent(0);
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
    if(param === undefined) return undefined;

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
    return '\n\n' + event.started_at
      + '\n' + event.title + '【'
      + '】\n' + event[ 'catch' ]
      + ':(' + event.place
      + ')\n' + event.address
      + '\n' + event.event_url;
  }

  function _send ( value, title, webhook )
  {
    snippets.Slack().send( value, webhook || PROPERTIES.slack_incomming_log, title );
  }

  /**
   * 実行部
   */
  function getEvents ( day )  // こっちは上限に当たってはいけない
  {
    day = snippets.DateUtil( day );
    const events = _callApi( {
      ymd: day.format('YYYYMMDD'),
      count: '100',
    } );

    const exclude_address = [ '中区', '大阪', '京都府', '沖縄', '名古屋', '福岡', '札幌', '岡山', '宮城', '島根', '鳥取' ]
    var message = '';
    var skip_flg;
    
    // TODO: 上限に当たるのでこのやり方はやめよう
    const body = events.reduce( function ( prev, event, index )
    {
      skip_flg = false;
      exclude_address.forEach( function ( exclude )
      {
        if( event.address ) 
          if ( event.address.indexOf( exclude ) > -1 ) skip_flg = true;
      } );
      if ( skip_flg ) return prev;
      return ( ( index == 1 ) ? '' : prev ) + _format( event );
    } );

    _send( body, '【' + day.format('M月D日') + '】 イベント配信分', PROPERTIES.slack_incomming_latest);
  }

  function getNextEvent(specify)  // こっちは上限に当たっていい
  {
    const events = _callApi({nickname: PROPERTIES.connpass_username_nomuraya})
    const now = snippets.DateUtil();
    const body = events.reduce( function ( prev, event, index )
    {
      if ( index == 1 ) prev = '';
      day = snippets.DateUtil(event.ended_at);
      if ( specify ) {
//        if (now.ymd != day) return prev;
      }
      return (day.diff(now, 'days') <= 0) ? prev : prev + _format( event );
    });

    const message = now.format('M月D日') + '以降のイベント参加状況\n' + body
    snippets.Line( message, PROPERTIES.line_bot_token );
    _send( message, PROPERTIES.slack_incomming_log );
  }

  /**
   * 返却
   */
  return {
    getEvents: getEvents,
    getNextEvent: getNextEvent,
  };
}
