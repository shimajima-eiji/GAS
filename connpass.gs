var Connpass = function ()
{
  function getEvents ( day )
  {
    const getRequest = 100;  // 1-100
    var events = JSON.parse( UrlFetchApp.fetch( 'https://connpass.com/api/v1/event/?count=' + getRequest + '&ymd=' + snippets.setDate( day ).ymd ) ).events;
    snippets.asc(events, 'started_at');  
    events.forEach( function ( event )
    {
      filter( event.title, event.started_at, event[ 'catch' ], event.place, event.address, event.event_url );
    } );
  }

  function filter ( title, started_at, public_relations, place, address, url )
  {
    const webhook = snippets.getProperties( '_latest' ).slack_webhook_latest;

    Logger.log(webhook);
    snippets.Slack().send( started_at,
      title + '【' + public_relations + '】',
      place + '：' + address + ' ' + url,
      webhook );
  }

  return {
    getEvents: getEvents,
    filter: filter
  };
}

function trigger ()
{
  Connpass().getEvents(0);
}
