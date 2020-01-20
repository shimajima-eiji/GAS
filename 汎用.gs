/**
 * プロパティの命名ルール
 * （どこにある）_（何の？）_（名前）
 *
 *
 */
var getProperties = function ( target )
{
  const properties = PropertiesService.getScriptProperties().getProperties();
  if ( target === undefined ) return properties;

  const result = {};
  for ( key in properties )
  {
    if ( key.indexOf( target ) > -1 ) result[ key ] = properties[ key ];
  }
  return result;
}

var asc = function ( array, target )
{
  array.sort( function ( a, b )
  {
    if ( a[target] < b[target] ) return -1;
    if ( a[target] > b[target] ) return 1;
    return 0;
  } );
  return array;
}
