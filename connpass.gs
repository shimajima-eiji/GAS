function _test() {
  Connpass().getEvents();
}

var Connpass = function ()
{
  function _callApi(param) {
    param = param || {
      ymd: snippets.setDate().ymd
    };
    if(param.count === undefined) param.count = '100';

    var endpoint = 'https://connpass.com/api/v1/event/?count=' + param.count
    delete param.count;
    for(key in param) {
      endpoint += '&' + key + '=' + param[key];
    }
    const events = JSON.parse( UrlFetchApp.fetch( endpoint ) ).events;
    snippets.asc(events, 'started_at');  

    return events;    
  }
  
  function getEvents ( day )
  {
    day = snippets.setDate(day).ymd;
    const events = _callApi({
      ymd: day
    });

    const exclude_address = ['中区', '大阪', '京都府', '沖縄', '名古屋', '福岡', '札幌', '岡山', '宮城', '島根', '鳥取']
    var message = '';
    var skip_flg;
    const body = events.reduce( function ( prev, event, index )
    {
      skip_flg = false;
      exclude_address.forEach( function (exclude) {
        if(event.address.indexOf(exclude) > -1) skip_flg = true;
      });
      if(skip_flg) return prev;
      return ((index==1) ? '' : prev) + _format(event);
    } );
    
    _send(body, '【' + day + '】 イベント配信分');
  }
  
  function _format(event) {
    return '\n\n' + event.started_at 
    + '\n' + event.title + '【'
    + '】\n' + event['catch'] 
    + ':(' + event.place
    + ')\n' + event.address
    + '\n' + event.event_url;
  }

  function _send ( value, title )
  {
    snippets.Slack().send( value, snippets.getProperties( '_latest' ).slack_webhook_latest, title );
  }

  return {
    getEvents: getEvents,
  };
}

function today ()
{
  Connpass().getEvents(0);
}

function tomorrow ()
{
  Connpass().getEvents(1);
}
